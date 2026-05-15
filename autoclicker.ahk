; AutoHotkey v2 auto-clicker
; F6 = toggle clicking
; Esc = quit

#Requires AutoHotkey v2.0

global isClicking := false
global delayMs := 10 ; 10ms ~= 100 clicks/sec. Increase for slower clicking.

F6:: {
    global isClicking
    isClicking := !isClicking
    if (isClicking) {
        SetTimer(DoClick, delayMs)
        ToolTip("Auto-clicker: ON (F6 to stop, Esc to quit)")
    } else {
        SetTimer(DoClick, 0)
        ToolTip("Auto-clicker: OFF (F6 to start, Esc to quit)")
        SetTimer(() => ToolTip(), -800)
    }
}

Esc:: {
    SetTimer(DoClick, 0)
    ExitApp
}

DoClick() {
    Click "Left"
}
