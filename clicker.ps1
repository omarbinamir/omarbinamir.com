Add-Type @'
using System;
using System.Runtime.InteropServices;

public static class MouseClicker {
    [DllImport("user32.dll", CallingConvention = CallingConvention.StdCall)]
    public static extern void mouse_event(int dwFlags, int dx, int dy, int cButtons, int dwExtraInfo);
}
'@

$MOUSEEVENTF_LEFTDOWN = 0x0002
$MOUSEEVENTF_LEFTUP   = 0x0004

$running = $false
$delayMs = 10  # 10ms ~= 100 clicks/sec. Increase for slower clicking.

Write-Host "---------------------------------------"
Write-Host "COMMAND PROMPT AUTO-CLICKER (PowerShell)"
Write-Host "F6  = toggle clicking"
Write-Host "Esc = quit"
Write-Host "---------------------------------------"

while ($true) {
    if ($Host.UI.RawUI.KeyAvailable) {
        $key = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

        # Esc key (quit)
        if ($key.VirtualKeyCode -eq 27) {
            Write-Host "Exiting..."
            break
        }

        # F6 key (toggle clicking) – virtual key code 117
        if ($key.VirtualKeyCode -eq 117) {
            $running = -not $running
            if ($running) {
                Write-Host "Auto-clicker: ON (F6 to stop, Esc to quit)"
            } else {
                Write-Host "Auto-clicker: OFF (F6 to start, Esc to quit)"
            }
        }
    }

    if ($running) {
        [MouseClicker]::mouse_event($MOUSEEVENTF_LEFTDOWN, 0, 0, 0, 0)
        [MouseClicker]::mouse_event($MOUSEEVENTF_LEFTUP,   0, 0, 0, 0)
        Start-Sleep -Milliseconds $delayMs
    } else {
        Start-Sleep -Milliseconds 50
    }
}

