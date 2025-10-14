# Road Rendering

## Basic Road Representation

We can view a road as a simple line segment:

![Basic Road Line](./road-basic-line.png)

## Problem with Basic Approach

However, this is not what we want, as we need each road border to have the same thickness everywhere for a realistic appearance.

## Solution: Geometric Envelopes

We need to use geometry to wrap segments in **envelopes** (polygonal boundaries):

![Road Segment Envelopes](./road-segment-envelopes.png)

## Polygon Smoothing

These envelopes are essentially polygons with additional points to create smoother, more rounded appearances:

![Rounded Road Polygons](./road-rounded-polygons.png)

## Union Operation

Finally, we compute the **union** of these polygons to keep only the outer segments, creating a seamless road network:

![Road Union Result](./road-union-result.png)

This approach ensures consistent road width and creates realistic-looking intersections and curves.
