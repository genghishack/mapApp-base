# MapApp FrontEnd

This is a template frontend for map-based projects.

Written in Typescript and React, This template encompasses the functionality for login/logout, signup, forgot password,
etc., using AWS Cognito.  It expects three Cognito groups to be present: Admin, Editor and User.

A public-facing map is displayed on the main page, showing geospatial points that have been entered into the system by
Admins and Editors.  Map points may also be browsed from a list, and information about each point is displayed
alongside the map when selected.

Admins have the capability to create and manage users, change permissions, activate/deactivate users, and view user
status.

This frontend is meant to be used with the mapapp-api and mapapp-db templates, and hosted on AWS.

This is a work in progress.
