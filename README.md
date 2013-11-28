# meteor-ui-bug-transform

## Meteor UI bug with transform functions of collections

When using a transform function returning Custom Class instances for every collection item, you loose this transformed state when the collections is manipulated.
- When the collection's sorting is changed, every item is updated and they all loose their transformed state.
- When the filtering criteria of the collection result set is changed, only the newly added items have a transformed state. All previously rendered items, loose their transformed state but keep their rendered state in DOM.
- When a new item is inserted, this item has a transformed state and all other items are unaffected.

This meteor app demonstrates all this cases.
