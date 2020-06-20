# datastorage
A simple javascript library for managing the state

# design and inspiration
Managing application state can sometime become a complex problem, especially when there is a requirement to perform an action when data changes overtime. An action can be as simple as updating a UI component when it happens.


There have been frameworks which performs an action when data changes i.e when instance of that data changes, however many times there might not be a need to create copy to avoid mutation, sometimes you would like to mutate the complex object, For example updating a property value in an array of complex objects which might be rendered as table in UI.

Sometimes to support the principle of not mutating objects one might end up structuring an app in a particular way which might make code more complex, For example, A ui app might be broken into tens of components to support this principle.

So this library is for the devs who wants to mutate a particular object and at the same time enable the app to perform some action when it happens, however notifying the app about the action is sole responsibility of the developer. By this way a dev gets more fine grained control.

This can be easily achieved by directly using rxjs, however one of the important design requirement is to have a data structure which helps managing data and subscriptions centrally and IDataStore does that.


# How it works
Uses rxjs for managing subscriptions and data centrally. Data can be an application state