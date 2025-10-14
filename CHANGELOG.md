# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.4.0] - 2025-10-14

### Added

- **World System**: Complete road generation and visualization framework
  - World class for managing road networks and visual representation
  - Configurable road width and roundness parameters
  - Real-time road generation from graph segments
  - Advanced road border calculation with polygon union operations
- **Polygon Geometry**: Comprehensive polygon system for road shapes
  - Polygon class with points and segments management
  - Advanced polygon intersection and union algorithms
  - Point containment detection using ray casting
  - Polygon breaking and multi-polygon operations
  - Segment containment validation for complex shapes
- **Envelope System**: Road envelope generation for realistic width
  - Envelope class wrapping segments in polygonal boundaries
  - Configurable width and roundness for smooth road appearance
  - Geometric angle calculation for proper road orientation
  - Multi-point polygon generation for rounded road edges
- **Advanced Mathematical Utils**: Extended geometric calculation library
  - Line intersection detection with offset calculation
  - Point translation with angle and distance
  - Angle calculation from point vectors
  - Average point calculation for midpoint operations
  - Linear interpolation (`lerp`) for smooth transitions
  - Random color generation for visual variety
- **TypeScript Type System**: Comprehensive type definitions
  - `Intersection` type for geometric intersection data
  - `drawOptions` interface for standardized drawing parameters
  - Enhanced type safety across all drawing operations
  - Centralized type definitions in dedicated module

### Enhanced

- **Drawing System**: Unified drawing interface across all primitives
  - Standardized `drawOptions` interface for all drawing methods
  - Consistent color, width, dash, and styling options
  - Enhanced Point drawing with configurable outline and fill options
  - Improved Segment drawing with transparent default colors
  - Advanced polygon rendering with fill and stroke capabilities
- **Project Structure**: Reorganized codebase architecture
  - Moved utilities from `graph/utils.ts` to `utils/utils.ts`
  - Centralized type definitions in `types/` directory
  - Graph moved from `graph/graph.ts` to root `graph.ts`
  - Enhanced documentation with road rendering concepts
  - Updated TypeScript configuration for new structure
- **Visual Rendering**: Sophisticated road visualization
  - Multi-layered rendering with roads, borders, and graph overlay
  - Transparent graph editor overlay (20% opacity) for editing
  - Realistic road appearance with proper borders and intersections
  - Dashed center lines for road lane indicators
  - Color-coded visual elements for different road components

### Changed

- **Main Application**: Integrated world system with graph editor
  - World generation in animation loop for real-time updates
  - Layered rendering pipeline with world and editor separation
  - Updated import paths for reorganized module structure
- **File Organization**: Improved project structure
  - Documentation moved to `docs/` directory with specialized sections
  - Utils consolidated in dedicated directory structure
  - Types centralized for better maintainability

### Technical Improvements

- **Geometric Algorithms**: Advanced computational geometry
  - Efficient polygon union operations for road networks
  - Robust intersection detection with floating-point precision
  - Optimized polygon breaking for complex road intersections
  - Performance-aware segment containment checking
- **Rendering Pipeline**: Optimized drawing performance
  - Context state management for consistent rendering
  - Efficient path construction for complex polygons
  - Smart redraw cycles with minimal canvas operations
- **Code Architecture**: Enhanced modularity and type safety
  - Clear separation between geometric primitives and world logic
  - Standardized interfaces for consistent API design
  - Improved error handling and type checking

## [0.3.0] - 2025-10-14

### Added

- **Viewport System**: Advanced viewport management for canvas navigation
  - Zoom functionality with mouse wheel (1x to 5x zoom range)
  - Pan functionality with middle mouse button drag
  - Coordinate transformation for proper interaction scaling
  - Canvas reset and transformation management
- **Graph Persistence**: Save and load functionality for graph data
  - Graph serialization to JSON format
  - LocalStorage integration for data persistence
  - Static `Graph.load()` method for deserialization
  - Automatic graph restoration on page load
- **Enhanced Graph Utilities**: Extended mathematical operations
  - Vector addition (`add`)
  - Vector subtraction (`subtract`)
  - Vector scaling (`scale`)
  - Improved geometric calculations for viewport transformations
- **UI Controls**: New control interface
  - Save button (💾) for persisting graph data
  - Dispose button (🗑️) for clearing the graph
  - Minimalist icon-based interface design

### Enhanced

- **GraphEditor Integration**: Viewport-aware interaction system
  - Mouse position calculation relative to viewport transformations
  - Zoom-aware hover detection with scaled thresholds
  - Proper coordinate handling for panning and zooming
  - Updated mouse event handling for viewport compatibility
- **Canvas Management**: Improved rendering pipeline
  - Viewport-controlled canvas transformations
  - Proper context save/restore cycle
  - Optimized coordinate system handling
- **Graph Loading**: Robust deserialization system
  - Point reconstruction from coordinate data
  - Segment reconstruction with point reference matching
  - Error-safe loading with fallback to empty graph

### Changed

- **Main Application**: Simplified initialization with viewport integration
- **GraphEditor Constructor**: Now requires viewport parameter
- **Mouse Event Handling**: Updated to work with viewport transformations
- **Drawing Pipeline**: Integrated with viewport transformation system

### Technical Improvements

- **Performance**: Efficient viewport transformation calculations
- **User Experience**: Smooth zoom and pan interactions
- **Data Persistence**: Reliable save/load functionality
- **Code Architecture**: Clean separation between viewport and editor logic
- **Coordinate Systems**: Proper handling of world vs screen coordinates

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
