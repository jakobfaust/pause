import AppKit

// Menulinjeapp uden Dock-ikon og uden hovedvindue.
let app = NSApplication.shared
let delegate = AppDelegate()
app.delegate = delegate
app.setActivationPolicy(.accessory)
app.run()
