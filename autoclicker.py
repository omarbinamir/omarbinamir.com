import time
import threading
from pynput.mouse import Button, Controller
from pynput.keyboard import Listener, KeyCode

# --- SETTINGS ---
TOGGLE_KEY = KeyCode(char='s')  # Press 's' to start/stop clicking
CLICK_DELAY = 0.01              # Time between clicks (0.01 = very fast)
MOUSE_BUTTON = Button.left      # Button to click (left or right)

# --- GLOBAL VARIABLES ---
clicking = False
mouse = Controller()

def clicker():
    """The function that performs the clicking in a separate thread."""
    while True:
        if clicking:
            mouse.click(MOUSE_BUTTON)
            time.sleep(CLICK_DELAY)
        else:
            # Short sleep when not clicking to save CPU resources
            time.sleep(0.1)

def toggle_event(key):
    """Function to listen for the key press."""
    global clicking
    if key == TOGGLE_KEY:
        clicking = not clicking
        if clicking:
            print(f"Auto-clicker STARTED. (Press '{TOGGLE_KEY.char}' to stop)")
        else:
            print(f"Auto-clicker PAUSED. (Press '{TOGGLE_KEY.char}' to start)")

# --- MAIN EXECUTION ---
if __name__ == "__main__":
    print("---------------------------------------")
    print(f"Program Running. Press '{TOGGLE_KEY.char}' to toggle clicking.")
    print("Press CTRL+C in this terminal to close the program.")
    print("---------------------------------------")

    # Start the clicking thread
    click_thread = threading.Thread(target=clicker)
    click_thread.daemon = True # Ends the thread when the program closes
    click_thread.start()

    # Start the keyboard listener
    with Listener(on_press=toggle_event) as listener:
        listener.join()