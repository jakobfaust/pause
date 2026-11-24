import AppKit

final class AppDelegate: NSObject, NSApplicationDelegate {
    private var statusItem: NSStatusItem!
    private let panel = FigurePanel()

    func applicationDidFinishLaunching(_ notification: Notification) {
        statusItem = NSStatusBar.system.statusItem(withLength: NSStatusItem.squareLength)
        if let button = statusItem.button {
            button.image = Self.templateIcon()
            button.setAccessibilityLabel("Pause")
            button.target = self
            button.action = #selector(togglePanel)
        }
    }

    @objc private func togglePanel() {
        if panel.isVisible {
            panel.orderOut(nil)
        } else {
            panel.show(below: statusItem.button)
        }
    }

    /// Monokromt skabelon-ikon (vandråbe). Macen farver det selv efter lys/mørk menulinje.
    private static func templateIcon() -> NSImage {
        let size = NSSize(width: 18, height: 18)
        let image = NSImage(size: size, flipped: false) { rect in
            let p = NSBezierPath()
            p.move(to: NSPoint(x: 9, y: 16))
            p.curve(to: NSPoint(x: 3.5, y: 6.5),
                    controlPoint1: NSPoint(x: 8, y: 13), controlPoint2: NSPoint(x: 3.5, y: 10))
            p.curve(to: NSPoint(x: 14.5, y: 6.5),
                    controlPoint1: NSPoint(x: 3.5, y: 0.5), controlPoint2: NSPoint(x: 14.5, y: 0.5))
            p.curve(to: NSPoint(x: 9, y: 16),
                    controlPoint1: NSPoint(x: 14.5, y: 10), controlPoint2: NSPoint(x: 10, y: 13))
            p.close()
            NSColor.black.setFill()
            p.fill()
            return true
        }
        image.isTemplate = true
        return image
    }
}
