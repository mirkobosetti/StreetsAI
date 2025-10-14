# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] - 2025-10-14

### Added

- **Interactive Graph Editor**: Complete mouse-driven graph editing system
  - Mouse-based point creation and selection
  - Drag and drop functionality for moving points
  - Smart point hovering with visual feedback
  - Segment creation by connecting selected points
  - Right-click context menu for point removal
- **Advanced Point Rendering**: Enhanced point drawing with multiple visual states
  - Outline mode for selected points (yellow outline)
  - Fill mode for hovered points (yellow center)
  - Configurable size, color, and visual options
- **Enhanced Segment Drawing**: Improved segment rendering capabilities
  - Dashed line support for preview segments
  - Configurable line width, color, and dash patterns
  - Real-time segment preview when connecting points
- **Utility Functions**: Mathematical and geometric helper functions
  - Distance calculation between points using `Math.hypot`
  - Nearest point detection with configurable threshold
  - Modular utility system in dedicated `utils.ts`
- **Animation Loop**: Smooth real-time rendering system
  - `requestAnimationFrame` for optimal performance
  - Continuous canvas clearing and redrawing
  - Responsive interactive feedback

### Enhanced

- **Interactive UI**: Replaced button-based controls with direct mouse interaction
  - Left-click to create points or select existing ones
  - Left-click and drag to move points
  - Right-click to remove points or deselect
  - Hover effects for better user feedback
- **Point Management**: Improved point interaction system
  - Smart selection logic with nearest point detection
  - Visual feedback for selected and hovered states
  - Automatic segment creation when connecting points
- **Code Architecture**: Better separation of concerns
  - Dedicated `GraphEditor` class for interaction logic
  - Utility functions separated into `graph/utils.ts`
  - Enhanced drawing methods with configuration options

### Changed

- **User Interface**: Removed HTML control buttons in favor of mouse interaction
- **Main Application**: Simplified main.ts with focus on editor and animation
- **Drawing System**: Updated drawing methods to accept configuration objects

### Technical Improvements

- **Performance**: Efficient animation loop with canvas clearing
- **User Experience**: Intuitive mouse-based graph editing
- **Code Quality**: Improved modularity and type safety
- **Visual Feedback**: Real-time interactive visual cues

## [0.1.0] - 2025-10-13

### Added

- **Core Graph Data Structure**: Implemented spatial graph system with Points and Segments
- **Point Class**: Basic point primitive with coordinates and canvas drawing functionality
- **Segment Class**: Line segment primitive connecting two points with drawing capabilities
- **Graph Class**: Main graph structure managing points and segments with operations:
  - Add/remove points and segments
  - Check containment and equality
  - Safe addition methods to prevent duplicates
  - Point disposal and cleanup
- **Interactive Canvas Interface**: HTML5 canvas with TypeScript integration
- **Control Buttons**: Interactive buttons for graph manipulation:
  - Add random points
  - Remove random points
  - Add random segments between existing points
  - Remove random segments
  - Clear entire graph
- **TypeScript Configuration**: Strict TypeScript setup with modern ES2022 target
- **Development Environment**: Vite-based development with hot module replacement
- **Project Structure**: Organized codebase with primitives and graph modules
- **Code Quality Tools**: Prettier formatting and EditorConfig standards

### Technical Details

- **Language**: TypeScript with strict type checking
- **Build Tool**: Vite with Rolldown for fast development and builds
- **Module System**: ES modules with modern import/export syntax
- **Canvas Rendering**: Direct 2D context manipulation for drawing operations
- **Architecture**: Modular design separating primitives from graph logic

### Development

- Initial project setup following tutorial series by Radu Mariescu
- Complete TypeScript port from original implementation
- Modern development workflow with Vite
- Extensible architecture for future AI features
