#### Developed and Maintained by: Roney Dsilva
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
5. **Locale**: Select the locale for the grid. Currently supported locales: English (EN) and Hebrew (HE). (Default: EN)

## AG Grid Options
1. **Minimum Width**: The minimum width of the column. (Default: 150)
2. **Resizable**: Specifies if the column can be resized. (Default: true)
3. **Sortable**: Specifies if the columns are sortable. (Default: true)
4. **Filter**: Specifies if the column has a filter. (Default: true)
5. **Floating Filter**: Specifies if the column has a floating filter. (Default: true)
6. **CSV Export**: Specifies if Export to CSV is enabled. (Default: true)
7. **Enable RTL**: Enabled Right to Left, used for Hebrew and Arabic. (Default: false)
8. **Column Hover Highlight**: Specifies column hover highlighting. (Default: true)
9. **Suppress Row Deselection**: Specifies if rows can be deselected. (Default: false)
10. **Pagination**: Enables pagination. (Default: true)
11. **Pagination Page Size**: Number of rows to show per page. (Default: 20)
12. **Row Selection**: Row Selection (single or multiple).
   - "Single"
   - "Multiple" (Default)
13. **Timezone**: Timezone for Date Fields. Select the appropriate timezone from the dropdown list. (Default: Local)
14. **Date Format**: Date Format for displaying date values. (Default: "dd/MM/yyyy hh:mm A")
15. **Sticky Header and Horizontal Scrollbar**:  Optionally specify the header offset and topbar class.
   - Fixed Header: Enables sticky header. (Default: false)
   - Header Offset: Specifies offset from the top of the viewport area (Optional). (Default: 100)
   - Topbar Class: Specify class, e.g., "topbar", to measure the offset from (Optional). (Default: "topbar")
   - Topbar Offset: Specify topbar offset (Default: 80)
   - Fixed Horizontal Scroll: Enables Hovering horizontal scrollbar which stays at the bottom all the time. (Default: false)
   - Fixed Horizontal Scroll Width: Fixed horizontal scroll width percentage. (Default: 80%)
16. **Row Height**: Height of each row in pixels. (Default: 25)
17. **Header Height**: Height of the header row in pixels. (Default: 30)
18. **Suppress Row Click Selection**: Disables row selection on row click. (Default: false)
19. **Suppress Menu Hide**: Prevents hiding the column menu. (Default: false)
20. **Suppress Movable Columns**: Disables moving columns. (Default: false)
21. **Enable Cell Expressions**: Enables expressions in cell values. (Default: false)
22. **Animate Rows**: Enables row animation on data changes. (Default: false)
23. **Suppress Aggregation Function in Header**: Hides the aggregation function in column headers. (Default: false)
24. **Suppress Aggregation at Root Level**: Disables aggregation at the root level. (Default: false)
25. **Suppress Clipboard Paste**: Disables pasting data from the clipboard. (Default: false)
26. **Suppress Scroll on New Data**: Prevents scrolling to newly added data. (Default: false)
27. **Suppress Property Names Check**: Disables checking for duplicate property names. (Default: false)
28. **Hide ID Field**: Hides the ID Field in the Grid. (Default: false)
29. **Row Click Events**: Enables row click events. This can be used in Dynamic events => Grid Events => Row Clicked. (Default: false)
30. **Enable Row Selection**: Enables row selection. This can be used in Dynamic events => Grid Events => Checkbox Checked || Checkbox Unchecked. (Default: false)
31. **Enable Row Status Toggle**: Enables row status toggle events. This can be used in Dynamic events => Grid Events => Checkbox Checked || Checkbox Unchecked. (Default: false)

# Data Type Overrides

The Data Type Overrides feature allows you to configure type overrides for specific attributes in the data. This allows you to override the auto-detected data types.
This grid allows you to define custom type overrides for specific fields in the data. The grid has the following columns:

1. **Field**: The field name for which you want to override the data type. 
2. **Type**: The new data type you want to assign to the field. Choose from "number," "text," or "date." 

---

# Style Formatting

The Style Formatting feature allows you to configure custom colors and fonts for column data based on certain conditions.
This grid allows you to define custom color and font settings based on specific conditions. The grid has the following columns:

1. **Field**: The field name for which you want to apply the custom color and font settings. (eg. first_name or status)
2. **Condition**: The condition to check for applying the custom color and font settings. (eg. status=false or name=K den)
3. **Color**: The custom color to apply when the condition is met. Enter the color in HEX format (e.g., "#FF0000") or use named colors (e.g., "red"). 
4. **Area**: Choose where to apply the color: "text" (cell text) or "cell" (cell background).
5. **Font**: Choose the font style: "normal," "italic," or "bold."
---

# Tooltip Settings

The Tooltip Settings feature allows you to configure custom tooltips for specific fields in the data.

To set a custom tooltip text, enter the desired text for the tooltip in the field.
This grid allows you to configure custom tooltips for specific fields. The grid has the following columns:

1. **Field**: The field name for which you want to set a custom tooltip. 
2. **Tooltip**: Choose whether to enable ("yes") or disable ("no") the tooltip for the field. 
---

# Advanced Data Manipulation

The Advanced Data Manipulation feature allows you to add custom values to the field data based on specific conditions.
This grid allows you to define custom data changes for specific fields. The grid has the following columns:

1. **Field**: The field name for which you want to apply the custom data changes. (field name)
2. **Data**: The new data source or value to be used for the field. (Eg. SC data source array or JSON Data source)
3. **Property**: The property within the data source to use as the new value for the field. (Input parameter array)
4. **Output**: The output value for the field. (Output parameter, similar to where clause)
5. **Area**: Choose where to apply the data changes: "cell" (cell text) or "tooltip" (tooltip text).


---

# Data Manipulation

The Data Manipulation feature allows you to add custom values to the field data based on specific conditions.
This grid allows you to define custom data changes for specific fields. The grid has the following columns:

1. **Field**: The field name for which you want to apply the custom data changes. 
2. **Value**: The value to be replaced in the field data. 
3. **New Value**: The new value to replace the original value in the field data. 
4. **Area**: Choose where to apply the data changes: "cell" (cell text) or "tooltip" (tooltip text). 

**Amount Fields** (Type: textbox, Default: null)
- Define the fields where the comma-separation and float parsing need to be applied.
  
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

# Configure Actions Column
The Configure Actions Column feature allows you to configure actions for the buttons in the Actions Column.

**Enable Actions**
This will display the "Configure Actions" options for the buttons in the Actions Column.

**Pin Actions Column**
This will keep the Actions Column fixed when scrolling horizontally.

**Edit Action Button**
This will display the "Edit Action Button" options.

**Edit Action Button Title**
Specify the title for the Edit Action button.

**Edit Action Button Tooltip**
Specify the tooltip text for the Edit Action button.

**Edit Action Button Class**
Specify the CSS class for styling the Edit Action button.

**Edit Action Icon Class**
Specify the CSS class for styling the icon of the Edit Action button.

**View Action Button**
This will display the "View Action Button" options.

**View Action Button Title**
Specify the title for the View Action button.

**View Action Button Tooltip**
Specify the tooltip text for the View Action button.

**View Action Button Class**
Specify the CSS class for styling the View Action button.

**View Action Icon Class**
Specify the CSS class for styling the icon of the View Action button.

**Delete Action Button**
**Delete Action Button Title**
Specify the title for the Delete Action button.

**Delete Action Button Tooltip**
Specify the tooltip text for the Delete Action button.

**Delete Action Button Class**
Specify the CSS class for styling the Delete Action button.
Specify the CSS class for styling the icon of the Delete Action button.

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
- Trigger this action to call Export Data to CSV download action.

## License

The AG Grid module is licensed under the MIT License. Please refer to the license file for more details.

For any issues or further assistance, please contact our support team.
