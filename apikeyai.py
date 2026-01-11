# -------------------------
# Working AI Chatbot (OpenAI >=1.0.0)
# -------------------------

import subprocess
import sys

# 1️⃣ Ensure openai library is installed
try:
    import openai
except ModuleNotFoundError:
    print("Installing openai library...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "openai"])
    import openai

# 2️⃣ Set your API key
openai.api_key = "YOUR_NEW_OPENAI_API_KEY"  # <-- replace with your key

# 3️⃣ Function to chat with AI using the new API
def chat_with_ai(prompt: str) -> str:
    response = openai.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful AI assistant."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.7,
        max_tokens=150
    )
    # Access the message content using the new syntax
    return response.choices[0].message["content"]

# 4️⃣ Chat loop
print("🤖 AI Chatbot is ready! Type 'quit' to exit.")
while True:
    user_input = input("You: ")
    if user_input.lower() == "quit":
        print("🤖 Goodbye!")
        break
    try:
        ai_response = chat_with_ai(user_input)
        print("AI: " + ai_response)
    except Exception as e:
        print("❌ Error:", e)
