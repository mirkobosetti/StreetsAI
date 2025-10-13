# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
