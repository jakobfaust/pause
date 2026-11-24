import AppKit
import SwiftUI

/// Rammeløst, gennemsigtigt panel der aldrig tager tastaturfokus fra den app, du arbejder i.
final class FigurePanel: NSPanel {
    init() {
        super.init(
            contentRect: NSRect(x: 0, y: 0, width: 220, height: 260),
            styleMask: [.borderless, .nonactivatingPanel],
            backing: .buffered,
            defer: false
        )
        isOpaque = false
        backgroundColor = .clear
        hasShadow = true
        level = .floating
        isMovableByWindowBackground = true
        hidesOnDeactivate = false
        isReleasedWhenClosed = false
        contentView = NSHostingView(rootView: PlaceholderView())
    }

    // Aldrig nøgle- eller hovedvindue: så bliver fokus i den app, du arbejder i.
    override var canBecomeKey: Bool { false }
    override var canBecomeMain: Bool { false }

    /// Placerer panelet lige under menulinjeikonet og viser det uden at aktivere appen.
    func show(below button: NSStatusBarButton?) {
        if let button, let window = button.window {
            let iconFrame = window.convertToScreen(button.convert(button.bounds, to: nil))
            var origin = NSPoint(x: iconFrame.midX - frame.width / 2,
                                 y: iconFrame.minY - frame.height - 6)
            if let screen = window.screen ?? NSScreen.main {
                let vis = screen.visibleFrame
                origin.x = min(max(origin.x, vis.minX + 8), vis.maxX - frame.width - 8)
            }
            setFrameOrigin(origin)
        }
        orderFrontRegardless()
    }
}

private struct PlaceholderView: View {
    var body: some View {
        RoundedRectangle(cornerRadius: 24, style: .continuous)
            .fill(.regularMaterial)
            .overlay(Text("Pause").font(.system(size: 20, weight: .medium, design: .serif)))
            .padding(4)
    }
}
