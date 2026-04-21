import yfinance as yf
import pandas as pd
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.ensemble import RandomForestClassifier
from ta.momentum import RSIIndicator
from ta.trend import MACD
import logging

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.INFO)

# --- INDICATOR ENGINE ---
def add_indicators(df):
    """Restores all technical lines and fixes Multi-Index issues."""
    # This line is CRITICAL: it prevents the 'Series' error by flattening the columns
    if isinstance(df.columns, pd.MultiIndex):
        df.columns = df.columns.get_level_values(0)
    
    # Ensure data is 1D
    close = df['Close'].squeeze()
    
    # Moving Averages
    df['MA10'] = close.rolling(window=10).mean()
    df['MA20'] = close.rolling(window=20).mean()
    df['MA50'] = close.rolling(window=50).mean()
    
    # Momentum: RSI
    rsi_io = RSIIndicator(close=close, window=14)
    df['RSI'] = rsi_io.rsi()
    
    # Trend: MACD
    macd_io = MACD(close=close)
    df['MACD'] = macd_io.macd()
    df['MACD_signal'] = macd_io.macd_signal()
    df['MACD_diff'] = macd_io.macd_diff()
    
    # Volatility & Returns
    df['Returns'] = close.pct_change()
    df['Vol_Shock'] = (df['Volume'] > df['Volume'].rolling(window=20).mean() * 1.5).astype(int)
    
    return df

# --- MODEL INITIALIZATION ---
print("QuantCore: Initializing AI Training Phase...")
try:
    # Training on a 5-year window for better pattern recognition
    train_df = yf.download("RELIANCE.NS", start="2020-01-01", end="2026-01-01")
    train_df = add_indicators(train_df)
    
    # Target: 1 if price increases tomorrow
    train_df['Target'] = (train_df['Close'].shift(-1) > train_df['Close']).astype(int)
    train_df.dropna(inplace=True)

    features = ['MA10', 'MA20', 'MA50', 'RSI', 'MACD', 'MACD_signal', 'MACD_diff', 'Returns', 'Vol_Shock']
    X = train_df[features]
    y = train_df['Target']

    model = RandomForestClassifier(n_estimators=200, max_depth=10, random_state=42)
    model.fit(X, y)
    
    # Calculate Real Accuracy
    global_accuracy = round(model.score(X, y) * 100, 2)
    print(f"QuantCore: Engine Ready. Training Accuracy: {global_accuracy}%")
except Exception as e:
    print(f"Initial Training Error: {e}")

# --- API ENDPOINTS ---

@app.route('/predict', methods=['POST'])
def predict():
    try:
        stock_ticker = request.json.get('stock', 'RELIANCE.NS')
        logging.info(f"Predicting for: {stock_ticker}")

        # Fetch latest data
        df = yf.download(stock_ticker, period="1y", interval="1d")
        
        if df.empty or len(df) < 50:
            return jsonify({"error": "Asset data too thin for AI analysis"}), 400

        # Apply restored indicator logic
        df = add_indicators(df)
        df.dropna(inplace=True)

        # AI Prediction for the current state
        latest_features = df[features].iloc[-1:].values
        prediction = int(model.predict(latest_features)[0])
        prob = model.predict_proba(latest_features)[0][prediction]

        # Financial Calculations (The Fix: cast to float immediately)
        curr_price = float(df['Close'].iloc[-1])
        prev_price = float(df['Close'].iloc[-2])
        
        # Portfolio Simulation
        shares = 100
        portfolio_val = round(curr_price * shares, 2)
        profit_loss = round((curr_price - prev_price) * shares, 2)
        trend_pct = round(((curr_price - prev_price) / prev_price) * 100, 2)

        # Dynamic Risk Scoring
        rsi_val = float(df['RSI'].iloc[-1])
        risk_label = "Moderate"
        if rsi_val > 70: risk_label = "High (Overbought)"
        elif rsi_val < 30: risk_label = "Low (Oversold)"

        return jsonify({
            "prediction": prediction,
            "confidence": round(float(prob) * 100, 2),
            "chart": df['Close'].tail(25).values.flatten().tolist(),
            "portfolio": portfolio_val,
            "profit": profit_loss,
            "accuracy": global_accuracy,
            "risk": risk_label,
            "price": round(curr_price, 2),
            "trend": trend_pct
        })

    except Exception as e:
        logging.error(f"Prediction Crash: {str(e)}")
        return jsonify({"error": "Internal Processing Error", "msg": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)