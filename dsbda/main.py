from flask import Flask, request, jsonify
from flask_cors import CORS

import yfinance as yf
import pandas as pd

from ta.momentum import RSIIndicator
from ta.trend import MACD

from sklearn.ensemble import RandomForestClassifier

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        stock = request.json['stock']

        data = yf.download(stock, start="2020-01-01", end="2024-01-01")

        close = data['Close'].squeeze()

        data['MA10'] = close.rolling(10).mean()
        data['MA50'] = close.rolling(50).mean()

        rsi = RSIIndicator(close=close)
        data['RSI'] = rsi.rsi()

        macd = MACD(close=close)
        data['MACD'] = macd.macd()
        data['MACD_signal'] = macd.macd_signal()

        data['Return'] = close.pct_change()

        data['Target'] = (close.shift(-1) > close).astype(int)

        data.dropna(inplace=True)

        features = ['MA10', 'MA50', 'RSI', 'MACD', 'MACD_signal', 'Return']
        X = data[features]
        y = data['Target']

        model = RandomForestClassifier()
        model.fit(X, y)

        latest = X.iloc[-1:].values
        prediction = model.predict(latest)[0]

        return jsonify({"prediction": int(prediction)})

    except Exception as e:
        return jsonify({"error": str(e)})


if __name__ == "__main__":
    app.run(debug=True)