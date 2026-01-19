// Preload script runs in renderer context but has access to Node.js APIs
// Use this to safely expose specific APIs to the renderer if needed

// For now, we don't need to expose anything special
// The existing UI code should work as-is since Electron doesn't have
// the same audio restrictions as browsers

console.log("Claude Code UI Desktop - preload loaded");
