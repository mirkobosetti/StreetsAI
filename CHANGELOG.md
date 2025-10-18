# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.10.0] - 2025-10-18

### Added

- **OpenStreetMap (OSM) Integration**: Real-world map data import system
  - `Osm` class for parsing OSM road network data
  - Support for Overpass API JSON format
  - Geographic coordinate conversion (latitude/longitude to canvas coordinates)
  - Automatic aspect ratio preservation based on geographic bounds
  - Scale calculation using Earth's curvature (111km per degree latitude)
  - Cosine latitude correction for accurate longitude scaling
- **OSM Query System**: Customizable road filtering
  - Overpass QL query template for road extraction
  - Comprehensive highway type filtering (excludes pedestrian, footway, cycleway, etc.)
  - Access restriction filtering (excludes private and restricted roads)
  - Support for bounding box queries
  - Configurable road type selection for urban planning
- **OSM UI Panel**: Interactive map import interface
  - Dedicated OSM panel with textarea for data input
  - Open panel button (🗺️) in main controls
  - Parse button (✔️) to process OSM data
  - Close button (❌) to dismiss panel
  - Textarea placeholder for user guidance
  - Modal-style panel overlay
- **One-Way Road Support**: Directional road system
  - One-way property added to `Segment` class
  - Automatic one-way detection from OSM data
  - Visual indication with dashed line pattern for one-way roads
  - Lane count consideration for one-way classification
- **Enhanced Point System**: ID-based point tracking
  - Optional `id` parameter in `Point` constructor
  - OSM node ID preservation for road network reconstruction
  - Support for point matching by ID in graph operations
- **Geographic Utilities**: Coordinate transformation functions
  - `invLerp` for inverse linear interpolation
  - `degToRad` for degree to radian conversion
  - Geographic bounds calculation (min/max lat/lon)
  - Coordinate normalization for canvas mapping
- **Dual-Mode Application**: Separate world and car interfaces
  - `index_car.html` for car AI simulation mode
  - Main `index.html` for world editing mode
  - Independent HTML entry points for different workflows
  - Clear separation of concerns between editing and simulation
- **World Save System**: Pre-saved world examples
  - `sclemo.world` example world file
  - World saves directory for organizing saved maps
  - Reference implementations for world structure

### Enhanced

- **UI Controls**: Extended control panel
  - OSM panel toggle button added to right controls
  - Reorganized button layout with OSM integration
  - Consistent icon-based interface across all features
  - Modal panel system for complex operations
- **Segment Rendering**: Visual distinction for road types
  - Automatic dashed line rendering for one-way segments
  - Override default dash pattern when one-way is true
  - Visual feedback for directional road networks
  - Improved road type identification
- **World Editing Workflow**: Streamlined map creation
  - Import real-world road networks from OSM
  - Edit and enhance imported maps
  - Add markings to real-world road layouts
  - Export customized worlds for car simulation

### Changed

- **HTML Structure**: Reorganized entry points
  - Moved car simulation to `index_car.html`
  - Main `index.html` now dedicated to world editing
  - Removed world editing HTML from `src/world/` directory
  - Cleaner project organization with distinct modes
- **Point Constructor**: Extended with optional ID
  - ID parameter now optional for backward compatibility
  - Enables OSM node tracking without breaking existing code
- **Segment Constructor**: Added one-way parameter
  - One-way parameter defaults to false
  - Maintains backward compatibility with existing segments
  - Enables directional road network modeling

### Technical Improvements

- **Geographic Projection**: Accurate coordinate transformation
  - Mercator-like projection for mid-latitude accuracy
  - Earth radius constant (111,000m per degree) for scaling
  - Latitude-dependent longitude scaling for proper aspect ratio
  - Minimal distortion for city-scale maps
- **OSM Data Parsing**: Robust data extraction
  - Node and way element filtering from OSM JSON
  - ID-based point and segment reconstruction
  - Proper handling of node references in ways
  - One-way road detection from tags (oneway, lanes)
- **Code Organization**: Enhanced modularity
  - Dedicated `osm/` directory for OSM functionality
  - Separation of query templates from parsing logic
  - Clear import structure for OSM integration
  - Reusable OSM utilities for future enhancements
- **User Experience**: Intuitive map import workflow
  - Simple paste-and-parse interface
  - Clear visual feedback for OSM panel state
  - Non-intrusive modal design
  - Easy access to OSM features from main controls

## [0.9.0] - 2025-10-18

### Added

- **Self-Driving Car AI System**: Complete neural network-based autonomous driving implementation
  - Neural network (`Network` class) with configurable layers and neurons
  - Forward propagation through network levels
  - Sensor-based input system feeding neural network
  - AI-controlled steering and acceleration
  - Genetic algorithm for evolving car behavior
- **Car Simulation Engine**: Realistic vehicle physics and control
  - `Car` class with physics simulation (acceleration, friction, max speed)
  - Polygon-based collision detection
  - Fitness tracking for car performance evaluation
  - Damage detection and disabled state handling
  - Support for AI-controlled and manual "dummy" cars
- **Advanced Sensor System**: Ray-casting sensor simulation
  - `Sensor` class with configurable ray count and range
  - Real-time obstacle detection using ray casting
  - Visual sensor rendering with dynamic reading display
  - Border and traffic detection capabilities
  - Sensor readings normalized for neural network input
- **Vehicle Control System**: Dual control mode support
  - `Controls` class for keyboard and AI control modes
  - Keyboard controls (arrow keys) for manual driving
  - AI control integration with neural network output
  - Forward/reverse/left/right movement handling
- **Neural Network Visualizer**: Real-time network visualization
  - `Visualizer` class for neural network state display
  - Visual representation of network layers and connections
  - Dynamic weight visualization with color coding
  - Real-time activation state display
  - Neuron and connection rendering with labels
- **Level System**: Neural network layer management
  - `Level` class representing network layers
  - Input-output neuron connections with weights and biases
  - Feedforward computation for layer activation
  - Random weight and bias initialization
- **Car AI Utilities**: Mathematical helpers for neural network
  - Linear interpolation (`lerp`) for smooth value transitions
  - Network serialization and mutation functions
  - Utility functions for AI training support
- **Car Persistence System**: Save and load AI brain functionality
  - Save best-performing car brain to localStorage
  - Load saved brain for continued training
  - Reset functionality to clear saved progress
  - UI buttons for save (💾) and reset (🗑️) operations
- **World Integration**: Cars running on procedurally generated roads
  - Integration of car simulation with existing world system
  - Cars use world road borders for collision detection
  - Realistic driving on generated road networks
  - Removed standalone road visualization in favor of world roads

### Enhanced

- **Project Structure**: Major architectural reorganization
  - New `car/` directory for all autonomous driving components
  - Existing world system moved to `world/` directory
  - Clear separation between world generation and car AI
  - Modular architecture for car simulation components
- **World Class**: Extended for car simulation support
  - Added `getBestCar()` method for fitness-based selection
  - Car array management within world
  - Integrated car rendering in world draw pipeline
  - Road borders accessible for car collision detection
- **HTML Layout**: Enhanced UI for car AI controls
  - Added car AI control section with save and reset buttons
  - Updated button styling for car-specific controls
  - Improved layout organization for dual functionality
  - Visual consistency between world and car controls
- **Main Application**: Dual-mode operation
  - Separate main files for world editing and car simulation
  - Car main (`src/car/main.ts`) for AI training mode
  - World main for procedural generation and editing
  - Independent styling for each mode

### Changed

- **File Organization**: Restructured for feature separation
  - World files consolidated in `src/world/` directory
  - Car AI files in dedicated `src/car/` directory
  - Clear module boundaries between systems
  - Improved maintainability and scalability

### Technical Improvements

- **Neural Network Architecture**: Efficient AI implementation
  - Multi-layer perceptron with configurable depth
  - Bias neurons for improved learning capacity
  - Weighted connections between all layers
  - Fast forward propagation for real-time control
- **Genetic Algorithm**: Evolutionary AI training
  - Fitness-based car selection for breeding
  - Brain mutation for genetic variation
  - Population-based learning approach
  - Automatic best brain preservation
- **Physics Simulation**: Realistic vehicle dynamics
  - Friction and acceleration modeling
  - Maximum speed constraints
  - Realistic turning mechanics
  - Polygon-based collision geometry
- **Performance Optimization**: Efficient simulation
  - Ray casting optimization for sensor readings
  - Efficient collision detection algorithms
  - Canvas rendering optimized for multiple cars
  - Minimal computational overhead per frame
- **Code Architecture**: Clean separation of concerns
  - Modular class design for each component
  - Clear interfaces between systems
  - Reusable utility functions
  - Type-safe TypeScript implementation

## [0.8.0] - 2025-10-15

### Added

- **Load World System**: Complete world import and restoration functionality
  - File input button (📁) for loading saved world files
  - World file parsing and deserialization
  - Automatic localStorage update after file load
  - Page reload for clean world state restoration
  - Support for `.world` file format
- **World Save Enhancement**: Improved world export functionality
  - Zoom level preservation in saved worlds
  - Viewport offset preservation for exact camera position
  - File download with `.world` extension
  - Both file export and localStorage persistence
- **Asynchronous World Loading**: Robust async initialization
  - Async `World.load()` method for proper marking deserialization
  - Promise-based marking reconstruction
  - Dynamic marking class imports for code splitting
  - Main application async initialization with IIFE pattern
- **UI File Management**: Complete file I/O interface
  - Hidden file input element for clean UI
  - File selection dialog triggered programmatically
  - File reader integration for world import
  - User feedback for file selection errors

### Enhanced

- **Marking System**: Advanced marking deserialization
  - Dynamic import system for marking classes
  - Type-safe marking reconstruction
  - Switch-case marking factory pattern
  - Support for all 8 marking types (crossing, light, parking, start, stop, target, yield, base)
  - Async marking creation pipeline
- **World Persistence**: Complete world state management
  - Comprehensive serialization including envelopes, road borders, buildings, trees, lane guides, markings
  - Zoom and offset state preservation
  - Full world reconstruction from JSON
  - Configuration options persistence (road, building, tree)
- **Type Safety**: Enhanced TypeScript types
  - Proper async/await patterns in world loading
  - Type-safe file reading and parsing
  - Safe JSON deserialization with proper typing
- **UI Integration**: Seamless load/save workflow
  - Load button triggers file input automatically
  - Save updates both file and localStorage
  - Automatic page reload after load for clean state

### Changed

- **Main Application**: Async initialization pattern
  - IIFE for top-level async/await support
  - World loaded before viewport and UI initialization
  - Proper async error handling
- **Load Button**: File input trigger instead of localStorage only
  - Load button now opens file dialog
  - File input change event handler added
  - User can import world files from disk
- **World Class**: Async static load method
  - `World.load()` now returns Promise<World>
  - Marking deserialization awaited properly
  - All world properties restored asynchronously

### Technical Improvements

- **Code Splitting**: Dynamic imports for marking classes
  - Reduced initial bundle size
  - Lazy loading of marking implementations
  - Better tree-shaking opportunities
  - Improved first-load performance
- **State Management**: Robust world state handling
  - Complete world state serialization
  - Reliable state restoration
  - Version-compatible world file format
  - Safe fallback to empty world
- **Error Handling**: User-friendly error messages
  - Alert for missing file selection
  - Safe JSON parsing with error handling
  - Graceful fallback on load errors
- **Memory Management**: Efficient file handling
  - FileReader for safe file parsing
  - Proper event cleanup after file read
  - No memory leaks from file operations
- **User Experience**: Smooth import/export workflow
  - Seamless file selection process
  - Visual feedback with file input
  - Automatic state updates after load
  - Clean world restoration with page reload

## [0.7.0] - 2025-10-15

### Added

- **Road Markings System**: Complete traffic control and navigation marking system
  - Base Marking class for all road markings with support segments
  - Stop marking with "STOP" text and border detection
  - Yield marking with "YIELD" text and border detection
  - Crossing marking with dashed white lines
  - Light/Traffic light marking with tri-color lights (red, yellow, green)
  - Parking marking with "P" symbol and dual borders
  - Start marking with car icon for simulation starting points
  - Target marking with bullseye design for destinations
- **Marking Editor System**: Interactive marking placement and management
  - Base MarkingEditor class with segment projection
  - Dedicated editors for each marking type
  - Real-time intent preview while hovering over roads
  - Smart snapping to lane guides and road segments
  - Right-click marking removal functionality
  - Enable/disable mechanism for editor switching
- **UI System**: Complete user interface management
  - UI class for centralized control management
  - Mode switching between graph editing and marking placement
  - Visual button state feedback (green for active mode)
  - Grayscale filter for inactive tools
  - Organized control layout with left, center, and right sections
- **Lane Guide Generation**: Automatic lane centerline generation
  - Lane guides based on road width calculations
  - Separate envelope generation for lane positioning
  - Polygon union for clean lane guide segments
  - Integration with marking editors for placement
- **Editor Pattern**: Standardized editor interface
  - `Editor` interface for consistent behavior
  - Enable/disable lifecycle methods
  - Display method for rendering editor state
  - Event listener management with proper cleanup
  - Bound event handlers for memory efficiency
- **Enhanced Building Rendering**: Improved 3D building visualization
  - Roof polygons with red tile appearance
  - Depth-sorted roof sides for proper occlusion
  - Building height parameter increased to 200 units
  - Enhanced building structure with base, walls, ceiling, and roof
  - Stroke outlines for better definition
- **Utility Functions**: Extended geometric utilities
  - `getNearestSegment` for finding closest road segment
  - `perpendicular` for calculating perpendicular vectors
  - `getFake3dPoint` for pseudo-3D coordinate transformation

### Enhanced

- **Project Structure**: Major architectural reorganization
  - `editors/` directory for all editor classes
  - `markings/` directory for all marking types
  - `utils/` consolidated to single `utils/index.ts`
  - Clear separation between primitives, items, markings, and editors
- **Type System**: Comprehensive type definitions
  - `MODES` constant for mode management
  - `Modes` type for type-safe mode switching
  - `MOUSE` constant for mouse button codes
  - `MouseButtons` type for button identification
  - `Editor` interface for editor implementation
  - `Tool` interface for tool-editor-button binding
  - `Tools` interface for complete tool collection
  - Enhanced `drawOptions` with `join` and `cap` properties
- **Event Handling**: Improved event management
  - Bound event handlers for proper cleanup
  - Enable/disable pattern for all editors
  - Context menu prevention in all editors
  - Proper event listener removal on disable
- **Drawing Options**: Extended canvas drawing capabilities
  - Line join style configuration (`join`)
  - Line cap style configuration (`cap`)
  - Enhanced polygon rendering with join options
  - Segment rendering with cap styles
- **World Integration**: Markings integrated into world system
  - `markings` array in World class
  - Markings rendered in draw pipeline
  - Lane guides generation for marking placement
  - Frame counter for potential animation timing

### Changed

- **Main Application**: Simplified with UI system
  - UI instance manages all tools and editors
  - Mode-based editor activation
  - Reduced main.ts complexity
  - All tools displayed via UI.tools iteration
- **Controls Layout**: Redesigned control interface
  - Three-section layout (left, center, right)
  - Title in left section
  - Marking tools in center section
  - Save/dispose in right section
  - Emoji-based intuitive buttons
- **Import Paths**: Updated for new structure
  - Utils imported from `./utils` (index file)
  - Editors imported from `./editors/`
  - Markings imported from `./markings/`
  - Cleaner import organization
- **Segment Drawing**: Default color changed from transparent to black
  - Better visibility for road segments
  - Consistent default behavior

### Technical Improvements

- **Editor Architecture**: Robust editor system
  - Consistent lifecycle management
  - Memory leak prevention with proper cleanup
  - Type-safe editor implementations
  - Reusable base classes for common functionality
- **Marking System**: Flexible marking framework
  - Envelope-based support segments
  - Automatic polygon generation for collision
  - Border segments for traffic control detection
  - Customizable rendering per marking type
- **Code Organization**: Improved maintainability
  - Clear directory structure by functionality
  - Consistent naming conventions
  - Proper separation of concerns
  - Scalable architecture for new features
- **Performance**: Optimized rendering
  - Conditional editor display based on active tool
  - Efficient event listener management
  - Smart redraw cycles
  - Reduced memory footprint with proper cleanup

## [0.6.0] - 2025-10-14

### Added

- **3D Building Rendering**: Pseudo-3D building visualization system
  - Building class with configurable height parameter
  - Dynamic ceiling generation based on viewpoint
  - Side wall generation with proper polygon construction
  - Depth-based sorting for realistic occlusion
  - Perspective effect based on viewer position
- **3D Tree Rendering**: Multi-level tree visualization
  - Tree class with procedural canopy generation
  - 7-level rendering for smooth gradation
  - Height coefficient for perspective depth
  - Noise-based radius variation for natural appearance
  - Color gradient from dark green at base to light green at top
  - Viewpoint-aware rendering for proper depth
- **Enhanced Interpolation Utilities**: Extended interpolation functions
  - 2D linear interpolation (`lerp2D`) for smooth point transitions
  - Combined with existing 1D lerp for complete interpolation toolkit
- **Items Architecture**: New organizational structure
  - Dedicated `items/` directory for world objects
  - Building class in `items/building.ts`
  - Tree class in `items/tree.ts`
  - Clear separation between primitives and world items
- **ViewPoint System**: Dynamic perspective rendering
  - ViewPoint calculation from viewport offset
  - Real-time viewpoint updates based on camera position
  - Perspective-based object rendering for 3D effect
  - Integration with world drawing system

### Enhanced

- **World Rendering Pipeline**: Sophisticated 3D visualization
  - Depth-sorted rendering of buildings and trees
  - Combined items array for unified depth sorting
  - Proper z-order management for realistic overlapping
  - ViewPoint-aware drawing for all 3D objects
- **Building Generation**: Improved building system
  - Buildings now instances of Building class instead of raw polygons
  - Configurable building heights through constructor
  - Enhanced collision detection with proper base handling
  - White fill for buildings for better contrast
- **Tree Generation**: Advanced tree placement and rendering
  - Trees now instances of Tree class with full 3D rendering
  - Base polygon for proper collision detection
  - Procedural level generation with noise for variety
  - Natural color gradients for realistic appearance
- **Canvas Size**: Increased canvas dimensions
  - Canvas size updated from 600x600 to 900x900
  - Better viewport for larger city visualizations
  - More room for procedural generation
  - Improved visual experience

### Changed

- **World Draw Method**: Updated signature with viewPoint parameter
  - Now accepts viewPoint for perspective calculations
  - All 3D objects rendered with proper perspective
  - Consistent depth sorting across all world items
- **Main Animation Loop**: ViewPoint integration
  - ViewPoint calculated from viewport offset
  - Passed to world draw method for 3D rendering
  - Smooth camera-relative perspective updates

### Technical Improvements

- **3D Rendering Algorithm**: Pseudo-3D perspective system
  - Efficient depth calculation using distance to viewpoint
  - Dynamic polygon generation for building sides and ceilings
  - Painter's algorithm for proper occlusion
  - Optimized sorting for real-time performance
- **Procedural Generation**: Enhanced natural variation
  - Noise-based tree shape generation for organic appearance
  - Deterministic randomization based on position
  - Smooth level transitions in tree rendering
  - Natural color gradients and size variations
- **Performance Optimization**: Smart rendering order
  - Single depth sort for all items (buildings + trees)
  - Efficient distance calculations
  - Reduced overdraw through proper sorting
  - Optimized polygon generation
- **Code Organization**: Improved project structure
  - Clear separation of world items from primitives
  - Building and Tree classes in dedicated directory
  - Better maintainability and extensibility
  - Cleaner import structure

## [0.5.0] - 2025-10-14

### Added

- **Procedural Building Generation**: Complete building placement and generation system
  - Automatic building placement along road networks
  - Configurable building width, minimum length, and spacing
  - Smart building subdivision for optimal placement
  - Collision detection to prevent overlapping buildings
  - Intelligent spacing between adjacent structures
- **Tree Generation System**: Natural tree placement algorithm
  - Procedural tree distribution across the map
  - Configurable tree size and density
  - Smart placement avoiding roads and buildings
  - Natural clustering near infrastructure
  - Minimum distance constraints between trees
- **Advanced Segment Operations**: Enhanced segment geometry utilities
  - Point-to-segment distance calculation
  - Point projection onto segments with offset calculation
  - Direction vector computation for segments
  - Segment length calculation
- **Enhanced Polygon Capabilities**: Extended polygon geometric operations
  - Polygon-to-polygon intersection detection
  - Point-to-polygon distance calculation
  - Polygon-to-polygon distance calculation
  - Improved containment and collision algorithms
- **Configuration System**: Comprehensive options for world elements
  - `RoadOptions` type for road appearance parameters
  - `BuildingOptions` type for building generation settings
  - `TreeOptions` type for tree placement configuration
  - Centralized configuration management in World constructor
- **Advanced Math Utilities**: Extended mathematical operations
  - Dot product calculation for vector operations
  - Vector normalization for unit vectors
  - Vector magnitude calculation
  - Enhanced intersection detection with epsilon tolerance
  - Improved numerical stability for floating-point operations

### Enhanced

- **World Generation Pipeline**: Sophisticated procedural generation
  - Multi-stage building generation with guide segments
  - Segment filtering based on minimum length requirements
  - Building support subdivision for long road segments
  - Intelligent building base generation with collision avoidance
  - Optimized tree placement with multiple constraint checks
- **Graph Hash System**: Efficient change detection
  - Graph hashing for detecting modifications
  - Conditional world regeneration based on graph changes
  - Performance optimization by avoiding unnecessary regeneration
  - Smart caching of generated world elements
- **Rendering System**: Enhanced visual representation
  - Color-coded buildings with transparency (red)
  - Natural green trees with semi-transparent rendering
  - Improved visual hierarchy with proper layering
  - Enhanced drawing options for all world elements
- **Geometric Algorithms**: Improved computational accuracy
  - Epsilon tolerance for floating-point comparisons
  - More robust intersection detection
  - Better handling of edge cases in geometry operations
  - Optimized polygon operations for performance

### Changed

- **Main Animation Loop**: Conditional world generation
  - World regeneration only when graph changes
  - Hash-based change detection for optimization
  - Reduced computational overhead in animation cycle
- **Building Documentation**: Comprehensive building generation guide
  - Step-by-step procedural generation documentation
  - Visual examples of each generation stage
  - Detailed explanation of algorithms and techniques
  - Added `BUILDINGS.md` in docs directory

### Technical Improvements

- **Performance Optimization**: Smart regeneration and caching
  - Conditional world generation based on graph state
  - Reduced redundant calculations in animation loop
  - Efficient collision detection algorithms
  - Optimized distance calculations for placement
- **Procedural Algorithms**: Advanced generation techniques
  - Multi-constraint satisfaction for tree placement
  - Iterative building placement with collision avoidance
  - Smart segment subdivision for optimal building distribution
  - Natural randomization for realistic appearances
- **Code Quality**: Enhanced type safety and organization
  - Comprehensive type definitions for options
  - Better separation of concerns in World class
  - Improved method documentation and JSDoc comments
  - More maintainable and extensible codebase
- **Geometric Precision**: Improved numerical stability
  - Epsilon tolerance for floating-point comparisons
  - Better handling of degenerate cases
  - More robust intersection algorithms
  - Enhanced precision in distance calculations

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
