# Globe Interaction Logic Update

## Objective
Update the globe component to:
1. Stop auto-rotation when a user clicks on a city.
2. Resume auto-rotation when the user subsequently interacts with the globe (drag, zoom, or keyboard).

## Changes Implemented
- **State Management**:
  - Added `lastSelectionTimeRef` to track the timestamp of the last city selection.
  - Added `isInteractingRef` to track if the user is currently interacting with the controls (drag/zoom).

- **Interaction Logic**:
  - **Stop on Click**: In `handleSelectPlace`, we set `autoRotateEnabled(false)` and record the timestamp.
  - **Resume on Interaction**:
    - In `handleEnd` (controls interaction end), we check if the interaction was just a click on a city (by comparing time with `lastSelectionTimeRef`). If it was a city click (< 200ms), we keep rotation stopped. If it was a longer interaction (drag), we resume rotation.
    - In `onZoom`, we check `isInteractingRef`. We only resume rotation if the zoom is user-initiated (not programmatic fly-to animation).
    - In `onGlobeClick`, we check `lastSelectionTimeRef` to ignore clicks that were part of the city selection event.
    - In `handleKeyUp`, we explicitly resume rotation when navigation keys are released.

## Verification
- Verified manually and via browser subagent that clicking a city stops rotation, and dragging the globe resumes it.
- Verified that the fly-to animation does not accidentally resume rotation.
