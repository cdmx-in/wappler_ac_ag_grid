#### Developed and Maintained by: Roney Dsilva

**Major Update:** This release upgrades from AG Grid v32.3.7 to v34.1.0, bringing significant performance improvements and exciting new features.

## 🚀 What's New in v2.0.3

1. **🔥 AG Grid v34.1.0** - Latest version with all community features
2. **⚡ Performance Boost** - Up to 40% bundle size reduction potential
3. **🎨 HTML Tooltips** - Rich HTML tooltip support with JavaScript functions
4. **🔧 Enhanced Tooltip System** - Custom tooltip components with automatic HTML detection

- **Breaking Changes:** Some configurations may require updates due to AG Grid v33/v34 changes

## 🚀 What's New in AG Grid v34.1.0

### New Features Available in This Release:

1. **✅ Cell Editor Validation** - Built-in validation for all cell editors:
   - Automatic constraint checking based on column configuration
   - Override defaults with custom validation rules
   - Handle invalid values by reverting or blocking changes

2. **🎯 Bulk Cell Editing** - Edit multiple cells in a single action:
   - Select cells, enter new value, commit with Tab key
   - Ideal for updating status of multiple items or overriding null values

3. **⚡ Performance Improvements** - Up to 40% bundle size reduction through:
   - Modular architecture improvements
   - Better tree-shaking capabilities
   - Optimized loading times

4. **🎨 Enhanced Theming** - New Theming API for:
   - Dynamic theme manipulation at runtime
   - Better integration with Theme Builder
   - Easy customization via theme parameters

## 🔄 Migration from v1.x to v2.0

### Compatibility Notes:
- **Good News:** This upgrade is largely **non-breaking** for existing implementations
- Your existing grids should continue to work without changes
- AG Grid v34 is non-breaking from v33, so most configurations remain the same

### Recommended Steps:
1. **Update Package:** Simply update to v2.0.2 - no code changes required for basic functionality
2. **Test Your Grids:** Verify existing grids work as expected
3. **Explore New Features:** Gradually enable new v34 features as needed:
   - Enable Cell Editor Validation for better data quality
   - Try Batch/Bulk editing for improved user experience
   - Use the new Filters Tool Panel for better UX
   - Implement Tree Data Drag & Drop for hierarchical data

### Performance Benefits:
- **Bundle Size:** Potential 20-40% reduction in bundle size
- **Loading Speed:** Faster grid initialization
- **Memory Usage:** Improved memory efficiency

### Breaking Changes (Minimal):
- Some very old deprecated APIs (from v31 and earlier) have been removed
- If you customized AG Grid CSS extensively, test your styling
- The new Theming API is now default (but legacy CSS themes still work)

# AG Grid Module Documentation

The AG Grid module allows you to create a flexible and customizable data grid with various options and properties. Below, you'll find the list of properties and options available for configuring the AG Grid module:

## AG Grid Properties

1. **ID**: Unique ID for the grid. (Required)
2. **Data Source**: Data source for the grid. Enter the data source to populate the grid. (Required)
3. **No Auto Load**: Set to true to disable auto-load of the grid. (Default: false)
4. **Theme**: Select a theme for the grid.
   - "Alpine" (Default)
   - "Balham"
   - "Material"
   - "Quartz"
   - "Custom"
5. **Dark Mode** (Default: false)
6. **Locale**: Select the locale for the grid. Currently supported locales: English (EN), Russian (RU), Hebrew (HE) and Portuguese (PT). (Default: EN)

**Note for Custom Theme:**
When you select the "Custom" theme option, you have the flexibility to define your own unique styling for the ag-Grid components.
This option allows you to customize the look and feel of the grid to match the design requirements of you pages and layouts.
You can override the default styles provided by ag-Grid with your own CSS rules by targeting the specific CSS variables and classes used by the grid.
The overrides for the "Custom" theme can be applied in the ag-theme-custom.css file located in the public/css folder. This file serves as a centralized place for customizing the grid's appearance.

To use the "Custom" theme, copy "ag-theme-custom.css" to public/css/ag-theme-custom.css and include it in your layout file.


## AG Grid Options
1. **Minimum Width**: The minimum width of the column. (Default: 150)
2. **Resizable**: Specifies if the column can be resized. (Default: true)
3. **Sortable**: Specifies if the columns are sortable. (Default: true)
4. **Case-Insensitive Sort**: Specifies if the columns are sorted in case-insensitive manner. (Default: false)
5. **Filter**: Specifies if the column has a filter. (Default: true)
6. **Floating Filter**: Specifies if the column has a floating filter. (Default: true)
7. **Trim Export Data**: Specifies if data trimming is to be applied for exported data. (Default: false)
8. **Exclude Hidden Fields**: Specifies if Hidden fields are to be excluded in CSV export. (Default: false)
9. **CSV Export**: Specifies if Export to CSV is enabled. (Default: true).
10. **PDF Export**: Specifies if Export to PDF is enabled. (Default: false).
11. **Exclude Fields CSV**: Specifies fields to be excluded in CSV export. (Default: null)
12. **Enable RTL**: Enabled Right to Left, used for Hebrew and Arabic. (Default: false)
13. **Column Hover Highlight**: Specifies column hover highlighting. (Default: true)
14. **Pagination**: Enables pagination. (Default: true)
15. **Auto Pagination**: Enables automatic pagination. (Default: false)
16. **Page Limit Selectors**: Allowed selectors for for page size. Set to false to hide the page size selector. (Default: [20,50,100] ).
17. **Page Limit**: Number of rows to show per page. (Default: 20)
18. **Row Selection**: Row Selection (single or multiple).
   - "Single"
   - "Multiple" (Default)
19. **Timezone**: Timezone for Date Fields. Select the appropriate timezone from the dropdown list. (Default: Local)
20. **Date Format**: Date Format for displaying date values. (Default: "dd/MM/yyyy hh:mm A")
21. **Filter Field ID**: Specifies the field ID of the search field when using grid quick filter. Applicable when using Quick Filter feature of AG Grid, called from Dynamic Events on change event on the field. (Default: search_field)
22. **Loading Overlay**: This enables loading overlay. (Default: false)
23. **Loading Overlay Duration**: This sets loading overlay duration in ms. (Default: 500)
24. **Sticky Header and Horizontal Scrollbar**:  Optionally specify the header offset and topbar class.
   - Fixed Header: Enables sticky header. (Default: false)
   - Header Offset: Specifies offset from the top of the viewport area (Optional). (Default: 100)
   - Topbar Class: Specify class, e.g., "topbar", to measure the offset from (Optional). (Default: "topbar")
   - Topbar Offset: Specify topbar offset (Default: 80)
   - Fixed Horizontal Scroll: Enables Hovering horizontal scrollbar which stays at the bottom all the time. (Default: false)
   - Fixed Horizontal Scroll Width: Fixed horizontal scroll width percentage. (Default: 80%)
25. **Row Height**: Height of each row in pixels. (Default: Auto)
26. **Header Height**: Height of the header row in pixels. (Default: Auto)
27. **Wrap Header Text**: This will cause long headers to wrap. (Default: true)
28. **Auto Header Height**: The header height is automatically set based on the content of the header. (Default: true)
29. **Auto Height**: The height is automatically set based on the content of the cells. (Default: false)
30. **Wrap Text**: This will cause long texts to wrap in the cells. (Default: false)
31. **Center Align (V)**: Specifies if the cell data should be vertically centered. (Default: false)
32. **Suppress Row Click Selection**: Disables row selection on row click. (Default: false)
33. **Suppress Menu Hide**: Prevents hiding the column menu. (Default: false)
34. **Suppress Movable Columns**: Disables moving columns. (Default: false)
35. **Enable Cell Expressions**: Enables expressions in cell values. (Default: false)
36. **Animate Rows**: Enables row animation on data changes. (Default: false)
37. **Suppress Aggregation Function in Header**: Hides the aggregation function in column headers. (Default: false)
38. **Suppress Clipboard Paste**: Disables pasting data from the clipboard. (Default: false)
39. **Suppress Scroll on New Data**: Prevents scrolling to newly added data. (Default: false)
40. **Suppress Property Names Check**: Disables checking for duplicate property names. (Default: false)
41. **Hide ID Field**: Hides the ID Field in the Grid. (Default: false)
42. **Numeric Column Align**: Align numeric columns to the right. (Default: false)
43. **Row Click Events**: Enables row click events. This can be used in Dynamic events => Grid Events => Row Clicked. (Default: false)
44. **Row Double Click Events**: Enables row double click events. This can be used in Dynamic events => Grid Events => Row Double Clicked. (Default: false)
45. **Enable Row Selection**: Enables row selection. This can be used in Dynamic events => Grid Events => Checkbox Checked || Checkbox Unchecked. (Default: false)
46. **Enable Row Status Toggle**: Enables row status toggle events. This can be used in Dynamic events => Grid Events => Checkbox Checked || Checkbox Unchecked. (Default: false)

## 🚀 AG Grid v34 New Features

47. **Cell Editor Validation**: Enable built-in validation for all cell editors with automatic constraint checking based on column configuration. You can also override defaults with custom validation rules specific to your application. Validation is performed when editing ends, and you can configure the grid to handle invalid values by either reverting or blocking the change. (Default: false)

48. **Batch Cell Editing**: Allow users to edit multiple cells in the grid before committing the changes. This is useful for scenarios where you want to make several edits before updating the data source, perfect for complex data entry workflows. (Default: false)

49. **Bulk Cell Editing**: Enable users to edit multiple cells in a single action by selecting the cells to update, entering a new value, and committing the change with the Tab key. This is ideal when you need to update multiple cells with the same value, such as updating status of row items or overriding null values. (Default: false)

50. **New Filters Tool Panel**: Enable the completely redesigned filters tool panel which allows users to access the grid's filters without opening the column menu. Features include: selecting columns for filtering, choosing between Simple/Selection/Combo filters, and configuring global Apply/Clear/Reset/Cancel buttons - particularly useful for server-side filtering with single requests. (Default: false)

51. **Tree Data Drag & Drop**: Enable managed row dragging for Tree Data, meaning the grid will automatically handle the dragging of rows and updating of the data structure. Supports reordering, moving parents and children, and converting leaf nodes into groups. (Default: false)

52. **🎨 HTML Tooltips**: Create rich, interactive tooltips with full HTML support using JavaScript functions. Features include:
   - Custom HTML content with styling and images
   - Dynamic content generation based on row data
   - Automatic HTML detection and rendering
   - Professional tooltip styling with shadows and borders
   - Integration with existing tooltip configurations
   - Performance optimized with on-demand generation

# Data Type Overrides

The Data Type Overrides feature allows you to configure type overrides for specific attributes in the data. This allows you to override the auto-detected data types.
This grid allows you to define custom type overrides for specific fields in the data. The grid has the following columns:

1. **Field**: The field name for which you want to override the data type. 
2. **Type**: The new data type you want to assign to the field. Choose from "number," "text," or "date." 

---

# Style Formatting

## Text and Cell Colors

The Style Formatting feature allows you to configure custom colors and fonts for column data based on certain conditions.
This grid allows you to define custom color and font settings based on specific conditions. The grid has the following columns:

1. **Field**: The field name for which you want to apply the custom color and font settings. (eg. first_name or status)
2. **Condition**: The condition to check for applying the custom color and font settings. (eg. status==false or name==K den).
   You can also supply a function here to return true or false based on the input.
   eg: input jsTest() in the condition field and define it as below:
   ```javascript
   <script>
     function jsTest(data) {
       return (data.status == 'success');
     }
   </script>
3. **Color**: The custom color to apply when the condition is met. Enter the color in HEX format (e.g., "#FF0000") or use named colors (e.g., "red"). 
4. **Area**: Choose where to apply the color: "text" (cell text) or "cell" (cell background).
5. **Font**: Choose the font style: "normal," "italic," or "bold."
---

## Configure Row Colors

1. **Condition**: The condition to check for applying the custom color to rows. (eg. status==false or name==K den).
 You can also supply a function here to return true or false based on the input. 
 eg: input jsTest() in the condition field and define it as below:
 ```javascript
   <script>
     function jsTest(data) {
       return (data.status == 'success');
     }
   </script>
   ```
2. **Color**: The custom color to apply to row when the condition is met. Enter the color in HEX format (e.g., "#FF0000") or use named colors (e.g., "red"). 

# Tooltip Settings

The Tooltip Settings feature allows you to configure custom tooltips for specific fields in the data, including support for HTML content and JavaScript functions.

## Basic Tooltip Configuration

To set basic tooltips, enter the desired text for the tooltip in the field.
This grid allows you to configure custom tooltips for specific fields. The grid has the following columns:

1. **Field**: The field name for which you want to set a custom tooltip.
2. **Tooltip**: Choose whether to enable ("yes") or disable ("no") the tooltip for the field.

## Custom Tooltip Text

**Custom Tooltip Text** (Type: textbox)
- Set a global custom tooltip text that will be applied to all fields that don't have specific tooltip configurations.

## Advanced Tooltips with JavaScript Functions

The **Using JS Function** feature allows you to create rich HTML tooltips using JavaScript functions. This provides full control over tooltip content and styling.

### Configuration

1. **Field**: The field name for which you want to apply the custom tooltip function.
2. **Function**: The name of your JavaScript function that generates the tooltip content.

### JavaScript Function Example

```javascript
<script>
  // Basic HTML tooltip
  function generateTooltip(data) {
    return `
      <div style="max-width: 250px; font-family: Arial, sans-serif;">
        <h4 style="margin: 0 0 8px 0; color: #333; font-size: 14px;">
          ${data.title}
        </h4>
        <p style="margin: 0 0 8px 0; font-size: 12px; color: #666;">
          ${data.description}
        </p>
        <hr style="margin: 8px 0; border: none; border-top: 1px solid #eee;">
        <div style="font-size: 11px; color: #888;">
          ID: ${data.id} | Status: ${data.status}
        </div>
      </div>
    `;
  }

  // Rich tooltip with images and styling
  function generateStatusTooltip(data) {
    const statusColor = data.status === 'active' ? '#28a745' : '#dc3545';
    const statusIcon = data.status === 'active' ? '✓' : '✗';

    return `
      <div style="max-width: 300px; padding: 12px; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
        <div style="display: flex; align-items: center; margin-bottom: 12px;">
          <div style="width: 32px; height: 32px; border-radius: 50%; background: ${statusColor}; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; margin-right: 12px;">
            ${statusIcon}
          </div>
          <div>
            <div style="font-weight: bold; font-size: 16px; color: #333;">${data.name}</div>
            <div style="font-size: 12px; color: ${statusColor}; font-weight: 500;">${data.status.toUpperCase()}</div>
          </div>
        </div>
        <div style="border-top: 1px solid #eee; padding-top: 8px;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 11px;">
            <div><strong>ID:</strong> ${data.id}</div>
            <div><strong>Type:</strong> ${data.type}</div>
            <div><strong>Created:</strong> ${new Date(data.created_at).toLocaleDateString()}</div>
            <div><strong>Updated:</strong> ${new Date(data.updated_at).toLocaleDateString()}</div>
          </div>
        </div>
      </div>
    `;
  }
</script>
```

# Advanced Data Manipulation

The Advanced Data Manipulation feature allows you to add custom values to the field data based on specific conditions.
This grid allows you to define custom data changes for specific fields. The grid has the following settings:

1. **Field**: The field name for which you want to apply the custom data changes. (field name)
2. **Data**: The new data source or value to be used for the field. (Eg. SC data source array or JSON Data source)
3. **Property**: The property within the data source to use as the new value for the field. (Input parameter array)
4. **Output**: The output value for the field. (Output parameter, similar to where clause)
5. **Area**: Choose where to apply the data changes: "cell" (cell text) or "tooltip" (tooltip text).


---

# Data Manipulation

The Data Manipulation feature allows you to add custom values to the field data based on specific conditions.
This grid allows you to define custom data changes for specific fields. The grid has the following settings:

1. **Field**: The field name for which you want to apply the custom data changes. 
2. **Value**: The value to be replaced in the field data. 
3. **New Value**: The new value to replace the original value in the field data. 
4. **Area**: Choose where to apply the data changes: "cell" (cell text) or "tooltip" (tooltip text). 

**Amount Fields** (Type: textbox, Default: null)
- Define the fields where the comma-separation and float parsing need to be applied.
**Amount Field Precision** (Type: number, Default: 2)
- Define the precision to be used for currency fields.

---

# Display Data Manipulation

The Display Data Manipulation feature allows you to add custom text, Combine fields data.
The grid has the following settings:

**Using Field Data**

1. **Field**: The field name for which you want to apply the custom data changes. 
2. **Data**: The value to be replaced in the field data ex: %first_name% %last_name%. 

**Using JS Function**

1. **Field**: The field name for which you want to apply the custom data changes. 
2. **Function**: Create a JavaScript function that defines the custom rendering logic. In your HTML or script section, define the JS function. 
ex: jsChanges. 
 ```javascript
<script>
  function jsChanges(data) {
    const html = `
      <div style="color: red; line-height: 2;">${data.code}</div>
      <div style="color: green; line-height: 2;">This is a new line in green.</div>`;
    return html;
  }
</script>
  ```
---
# Custom Headers

**Configure Header Names**
This grid allows you to define custom header names for specific columns. The grid has the following columns:

1. **Field**: The field name for which you want to set a custom header name. 
2. **Name**: The custom header name to be displayed for the column.

---

# Custom Widths

The Custom Widths feature allows you to configure custom column widths for columns.

**Configure Custom Widths**
This grid allows you to define custom column widths for specific columns. The grid has the following columns:

1. **Field**: The field name for which you want to set a custom column width. 
2. **Min Width**: The minimum width for the column. 
3. **Max Width**: The maximum width for the column. 

# Inline Editing 

**Editable Fields**
Makes specific cells editable. Values should be comma-separated fields.

**Editable Cells**
Makes All cells editable. (Default: false)

**Editable Rows**
Makes Entire rows editable. (Default: false)

**Configure Selector Editors**
This enables Static and Dynamic Field selector options.

**Static Selectors**
1. **Field**: The field name for which you want to apply selector/dropdown for. 
2. **Options**: JSON input of options for the select dropdown. e.g. {"1": "Angie", "2": "Radar"}

**Dynamic Selectors**
1. **Field**: The field name for which you want to apply selector/dropdown for. 
2. **Options Field**: The field name which contains the options for the field data. e.g. {"1": "Angie", "2": "Radar"} supplied in a seperate field. This allows different options for every field.

# Hide Fields and Filters

The Hide Fields and Filters feature allows you to hide components such as filters and fields.

**Hide Components**
This will display the "Hide Fields," "Hide Filters," and "Hide Sort Filters" fields with options to specify which components to hide.

**Hide Fields**
Enter the names of fields you want to hide separated by commas. The specified fields will be hidden from the view.

**Hide Filters**
Enter the names of filters you want to hide separated by commas. The specified filters will be hidden from the view.

**Hide Sort Filters**
Enter the names of the sort filters you want to hide separated by commas. The specified sort filters will be hidden from the view.

---

# Compact View
The compact view configuration consists of the following parameters:

- **Compact View** (Type: checkbox, Default: false)
  - Enable or disable the compact view for the grid.

- **Grid Size** (Type: number, Default: 3)
  - Specify the grid size for the compact view. This determines the number of columns in each row.

- **Grid Item Height** (Type: number, Default: 20)
  - Set the height of each item in the compact view.
---
# Column Groups

This feature allows you to organize and group columns for a more structured presentation of data. Instead of using the built-in top left corner button, you can opt for a separate Export button that triggers the action to download data as a CSV file.

## Group Configuration
This option enables column grouping functionality.

### Group Configurations

This option allows you separate fields into different groups. 
Each configuration includes:
- **Group Name**: Assign a name to the group for easy identification.
- **Start Field**: Specify the starting field of the group.
- **End Field**: Define the ending field of the group.

These configurations help you create organized and logical groupings of columns for your data presentation needs.

---

### Total Row Footer

The "Total Row Footer" feature allows you to define and display a footer row in a grid or table that shows the totals and counts of specified columns. This can be helpful for summarizing data in your grid and providing users with a quick overview of important statistics.

Configuration includes:
- **Columns To Count**: Specify the columns you want to count in the footer row. Separate column names with commas. Note: Counts only Unique values by default.
- **Count Non-Unique**: Enable to count non-unique values.
- **Columns To Sum**: Specify the columns you want to calculate the sum of in the footer row. Separate column names with commas.
- **Fixed Footer**: Enables fixed footer totals row. (Default: false)

---

# Set Filters and Sort Orders

The "Set Filters" feature allows you to enable the setting of filters for columns in a user interface. This feature allows to preset filters when the grid is rendered.

Configuration includes:
### Set Filters
Toggle to enable or disable the feature. When enabled, users can set filters for columns. (Default: false)

  **Custom Filters**: A grid that allows you to define custom filters.
  - **Field**: The column name to filter.
  - **Filter Type**: The type of filter to apply, options available are: "Starts With," "Less Than," "Date From," "Greater Than," "Equals," and "Contains."
  - **Filter Value**: The Value/Filter to be applied.

### Set Sort Orders
Toggle to enable or disable the feature. When enabled, users can set sort orders for columns. (Default: false)

  **Custom Sort Orders**: A grid that allows you to define custom sort orders.
  - **Field**: The column name to sort.
  - **Sort Order**: Select Ascending or Descending Order for the Field."

---

# Configure Actions Column
The Configure Actions Column feature allows you to configure actions for the buttons in the Actions Column.

**Enable Actions**
This will display the "Configure Actions" options for the buttons in the Actions Column.

Note: Button Tooltip Supports Calling a function, just define a function and add the function name in the Tooltip e.g. getEditTooltip().
In the function the variable for the row data will be available as the first attribute e.g. getEditTooltip(data), then data holds the values of the row.

**Pin Actions Column**
This will keep the Actions Column fixed when scrolling horizontally.

**Actions Column Position**
This will set the position of the Actions Column.(Default: Right)

**Actions Column Min Width**
This will set the minimum width (px) for the Actions Column.(Default: 80)

**Actions Column Max Width**
This will set the maximum width (px) for the Actions Column.(Default: null)


**Edit Action Button**
This will display the "Edit Action Button" options.

**Edit Action Button Title**
Specify the title for the Edit Action button.

**Edit Action Button Tooltip**
Specify the tooltip text for the Edit Action button.

**Edit Action Button Class**
Specify the CSS class for styling the Edit Action button.

**Edit Action Button Icon Class**
Specify the CSS class for styling the icon of the Edit Action button.

**Edit Action Button Condition**
Specify the condition to Show the Edit Action button, eg: code==TEST, or status==COMPLETED||status==FINISHED or status==COMPLETED&&user_status==true

**View Action Button**
This will display the "View Action Button" options.

**View Action Button Title**
Specify the title for the View Action button.

**View Action Button Tooltip**
Specify the tooltip text for the View Action button.

**View Action Button Class**
Specify the CSS class for styling the View Action button.

**View Action Button Icon Class**
Specify the CSS class for styling the icon of the View Action button.

**View Action Button Condition**
Specify the condition to Show the View Action button, eg: code==TEST, or status==COMPLETED||status==FINISHED or status==COMPLETED&&user_status==true

**Delete Action Button**
This will display the "Delete Action Button" options.

**Delete Action Button Title**
Specify the title for the Delete Action button.

**Delete Action Button Tooltip**
Specify the tooltip text for the Delete Action button.

**Delete Action Button Class**
Specify the CSS class for styling the Delete Action button.

**Delete Action Button Icon Class**
Specify the CSS class for styling the icon of the Delete Action button.

**Delete Action Button Condition**
Specify the condition to Show the Delete Action button, eg: code==TEST, or status==COMPLETED||status==FINISHED or status==COMPLETED&&user_status==true

# Custom Action Buttons

**Buttons 1-20**

**Button[i] Action Button**
This will display the "Button[i] Action Button" options.

**Button[i] Action Button Title**
Specify the title for the Button[i] Action button.

**Button[i] Action Button Tooltip**
Specify the tooltip text for the Button[i] Action button.

**Button[i] Action Button Class**
Specify the CSS class for styling the Button[i] Action button.

**Button[i] Action Button Icon Class**
Specify the CSS class for styling the icon of the Button[i] Action button.

**Button[i] Action Button Condition**
Specify the condition to Show the Button[i] Action button, eg: code==TEST, or status==COMPLETED||status==FINISHED or status==COMPLETED&&user_status==true

# Button Class Toggles
The Button Class Toggles feature provides a way to define and manage classes for action buttons within a grid, based on certain data conditions. This can be useful for dynamically updating button styles based on the state of the row data.
Specify the condition to apply the defined class on the Action button, 
eg: code==TEST, or status==COMPLETED||status==FINISHED or status==COMPLETED&&user_status==true
You can also specify left-only conditions, where only the field name is provided. The field is then evaluated for its truthiness ie if value present/true(bool) eg: status

# Button Icon Class Toggles
The Icon Class Toggles feature works similarly to Button Class Toggles but is used to apply classes to icons in the action buttons based on conditions in the row data. This allows you to dynamically update the icons
eg: code==TEST, or status==COMPLETED||status==FINISHED or status==COMPLETED&&user_status==true
You can also specify left-only conditions, where only the field name is provided. The field is then evaluated for its truthiness ie if value present/true(bool) eg: status

# Action Attributes

**Load**
- Mainly to be used in conjunction with "No Auto Load" enabled so that you can load only when certain conditions are met.
- Use Case: Used when you're awaiting the population of specific elements or data before loading the grid. It's also useful for refreshing the grid intentionally.

**Reload** (Beta)
- To be used in conjunction with "No Auto Load" enabled
- This performs a transactional update of the client-side data in the grid after comparing the existing and updated datasets
- To use this: Enable "No Auto Load", On Edit or update actions, perform an SC load, On Success of SC load perform the AG Grid Module Reload Action.

**Export**
- To be used if you wish to use a separate Export button instead of using the inbuilt top left-cornered Export button.
- Trigger this action to call Export Data to CSV/PDF download action based on selected file Type.

**Save Column State**
- This action allows you to save the current state of the grid's columns, including their visibility and order, to the browser's local storage.
- It is useful when you want to remember and restore a specific column configuration for the grid.

**Reset Column State**
- This action enables you to reset the grid's column state to default state.
- It is useful when you want to revert the column configuration to a default configuration.

**Pin Columns to Left**
- This action allows you to pin one or more columns to the left side of the grid.
- It is useful when you want to freeze specific columns in place for easy reference, even as you scroll horizontally.

**Hide Columns**
- The "Hide Columns" feature allows you to selectively hide one or more columns.

**Import File Data**
- The "Import File Data" action allows to import data from CSV and XLSX files into the AG Grid. This action simplifies the process of populating the grid with external data sources.
- Key Features:
  - File Type Support: Currently, this feature supports two common file types - CSV (Comma-Separated Values) and XLSX (Microsoft Excel).
  - File Field ID: Users must specify the "File Field ID," 

**Get Selected Rows**
- The "Get Selected Rows" feature is designed to retrieve selected rows.
- This variable named "selectedRows", holds the selected data for access from other modules.

**Quick Filter**
- The "Quick Filter" feature is designed to filter the results based on the value in the Filter Field defined in above settings.
- Quick Filter is used to filter rows by comparing against the data in all columns. This can be used in addition to column-specific filtering.

## 💡 Implementation Examples for v34 Features

### Cell Editor Validation Example
```javascript
// Enable validation in your grid properties
enable_cell_editor_validation: true

// The grid will automatically validate based on column types
// For custom validation, you can override in column definitions
```

### Batch Editing Example
```javascript
// Enable batch editing
enable_batch_editing: true

// Users can now:
// 1. Edit multiple cells
// 2. Press Enter to commit all changes at once
// 3. Press Escape to cancel all pending changes
```

### Bulk Editing Example
```javascript
// Enable bulk editing with range selection
enable_bulk_editing: true

// Users can now:
// 1. Select multiple cells (Ctrl+click or drag)
// 2. Type a new value
// 3. Press Tab to apply to all selected cells
```

### New Filters Tool Panel Example
```javascript
// Enable the new filters tool panel
enable_new_filters_tool_panel: true

// Benefits:
// - Access filters without opening column menus
// - Global filter controls (Apply/Clear/Reset)
// - Better for server-side filtering
```

### Tree Data Drag & Drop Example
```javascript
// Enable tree data drag and drop
tree_data_drag_drop: true

// Your data should have hierarchical structure:
// [
//   { id: 1, name: "Parent", orgHierarchy: ['Dept'] },
//   { id: 2, name: "Child", orgHierarchy: ['Dept', 'Team'] }
// ]
```

## 🔧 Best Practices for v34

1. **Performance:** Start with basic features and gradually enable v34 enhancements
2. **Testing:** Test new features in development before production deployment
3. **Bundle Size:** Monitor bundle size improvements with the new architecture
4. **User Experience:** Combine multiple v34 features for enhanced workflows:
   - Use Batch Editing + Validation for better data entry
   - Combine New Filters Tool Panel with server-side data
   - Use Tree Data + Drag & Drop for hierarchical management

## License

The AG Grid module is licensed under the MIT License. Please refer to the license file for more details.

For any issues or further assistance, please contact our support team.
