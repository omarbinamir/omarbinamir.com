import time
import threading
from pynput.mouse import Button, Controller
from pynput.keyboard import Listener, KeyCode, Key

# --- SETTINGS ---
TOGGLE_KEY = Key.f6             # Press F6 to start/stop clicking
QUIT_KEY = Key.esc              # Press ESC to quit
CLICK_DELAY = 0.01              # Time between clicks (0.01 = very fast)
MOUSE_BUTTON = Button.left      # Button to click (left or right)

# --- GLOBAL VARIABLES ---
clicking = False
running = True
mouse = Controller()

def clicker():
    """The function that performs the clicking in a separate thread."""
    while running:
        if clicking:
            mouse.click(MOUSE_BUTTON)
            time.sleep(CLICK_DELAY)
        else:
            # Short sleep when not clicking to save CPU resources
            time.sleep(0.1)

def toggle_event(key):
    """Function to listen for the key press."""
    global clicking, running
    if key == QUIT_KEY:
        running = False
        return False
    if key == TOGGLE_KEY:
        clicking = not clicking
        if clicking:
            print("Auto-clicker STARTED. (Press F6 to stop)")
        else:
            print("Auto-clicker PAUSED. (Press F6 to start)")

# --- MAIN EXECUTION ---
if __name__ == "__main__":
    print("---------------------------------------")
    print("Program Running.")
    print("F6 = toggle clicking")
    print("ESC = quit")
    print("---------------------------------------")

    # Start the clicking thread
    click_thread = threading.Thread(target=clicker)
    click_thread.daemon = True # Ends the thread when the program closes
    click_thread.start()

    # Start the keyboard listener
    with Listener(on_press=toggle_event) as listener:
        listener.join()