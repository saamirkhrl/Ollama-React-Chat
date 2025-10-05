from flask import Flask, request, jsonify
from flask_cors import cross_origin
from ollama import chat, ChatResponse

app = Flask(__name__)

@app.route("/ai", methods=["POST"])
@cross_origin(origins=["http://localhost:5173"])
def ai():
    try:
        request_json = request.get_json()
        if request_json and "message" in request_json:
            response: ChatResponse = chat(model='llama3', messages=[
                {
                    'role': 'user',
                    'content': request_json["message"]
                }
            ])
            return jsonify({"reply": response.message.content})
        return jsonify({"reply": "No message provided."}), 400
    except Exception as e:
        print(f"Error: {e}")  # This will help us debug
        return jsonify({"reply": f"Error: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5001)

