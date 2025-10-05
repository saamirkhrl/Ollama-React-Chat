from flask import Flask, request, jsonify
from flask_cors import CORS
from ollama import chat, ChatResponse

app = Flask(__name__)
CORS(app)

@app.route("/ai")
def ai():
    if request.method == "POST":
        request_text = request.get_json()
        if request_text and "text" in request_text:
            response: ChatResponse = chat(model='llama3', messages=[
                {
                    'role': 'user',
                    'content': request_text
                }
            ])

        if response:
            return jsonify(response.message.content)
        

if __name__ == "__main__":
    app.run(debug=True)

