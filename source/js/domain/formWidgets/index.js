import tinymceWidget from './tinymceWidget';
import dateWidget from './dateWidget';
import CustomSchemaField from './CustomSchemaField';
import AceWidget from './AceWidget';

const formWidgets = {
  SchemaField: CustomSchemaField,
  tinymceWidget: tinymceWidget,
  dateWidget: dateWidget,
  AceWidget: AceWidget,
};

export default formWidgets;
