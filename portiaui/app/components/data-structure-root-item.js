import Ember from 'ember';

export default Ember.Component.extend({
    dataStructure: Ember.inject.service(),
    dispatcher: Ember.inject.service(),
    uiState: Ember.inject.service(),

    tagName: '',

    extractedItems: Ember.computed.filter('dataStructure.structure', function(structureItem) {
        const item = this.get('item.content');
        return structureItem.item === item;
    }),
    numItems: Ember.computed.readOnly('extractedItems.length'),

    actions: {
        addSchema(closeAction) {
            const project = this.get('uiState.models.project');
            const item = this.get('item.content');
            const schema = this.get('dispatcher').addSchema(project, /* redirect = */false);
            this.get('dispatcher').changeItemSchema(item, schema);
            closeAction();
        },

        changeSchema(schema, closeAction) {
            const item = this.get('item.content');
            this.get('dispatcher').changeItemSchema(item, schema);
            closeAction();
        },

        removeItem() {
            const item = this.get('item.content');
            this.get('dispatcher').removeItem(item);
        },

        saveSchema() {
            const schema = this.get('item.schema.content');
            schema.save();
        }
    }
});