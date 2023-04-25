// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).

// This shows the HTML page in "ui.html".
figma.showUI(__html__);

figma.ui.resize(320, 400)

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  if (msg.type === 'set_radius') {
    const selection = figma.currentPage.selection;
    for (let i = 0; i < selection.length; i++) {
      if (selection[i].type === "RECTANGLE" || selection[i].type === "FRAME" || selection[i].type === "COMPONENT" || selection[i].type === "COMPONENT_SET" || selection[i].type === "INSTANCE") {
        selection[i].topLeftRadius = +msg.radius_top_left;
        selection[i].topRightRadius = +msg.radius_top_right;
        selection[i].bottomRightRadius = +msg.radius_bottom_right;
        selection[i].bottomLeftRadius = +msg.radius_bottom_left;
      }

    }
  }

  if (msg.type === 'set_padding') {
    const selection = figma.currentPage.selection;
    for (let i = 0; i < selection.length; i++) {
      if (selection[i].type === "COMPONENT" || selection[i].type === "COMPONENT_SET" || selection[i].type === "FRAME" || selection[i].type === "INSTANCE") {
        selection[i].paddingTop = +msg.padding_top;
        selection[i].paddingBottom = +msg.padding_bottom;
        selection[i].paddingRight = +msg.padding_right;
        selection[i].paddingLeft = +msg.padding_left;
      }
    }
  }


  if (msg.type === 'set_opacity') {
    const selection = figma.currentPage.selection;
    for (let i = 0; i < selection.length; i++) {
      if (selection[i].type === "RECTANGLE" || selection[i].type === "POLYGON" || selection[i].type === "FRAME" || selection[i].type === "COMPONENT" || selection[i].type === "COMPONENT_SET" || selection[i].type === "INSTANCE" || selection[i].type === "GROUP" || selection[i].type === "ELLIPSE" || selection[i].type === "INSTANCE" || selection[i].type === "LINE" || selection[i].type === "STAR" || selection[i].type === "TEXT") {
        selection[i].opacity = +msg.opacity;
      }
    }
  }

  if (msg.type === 'set_spacing') {
    const selection = figma.currentPage.selection;
    for (let i = 0; i < selection.length; i++) {
      if (selection[i].type === "COMPONENT" || selection[i].type === "COMPONENT_SET" || selection[i].type === "FRAME" || selection[i].type === "INSTANCE") {
        selection[i].itemSpacing = +msg.spacing;
      }
    }
  }


  if (msg.type === 'set_font') {
    const selection = figma.currentPage.selection;
    for (let i = 0; i < selection.length; i++) {
      if (selection[i].type === "TEXT") {

        let font_weight = '';
        if (+msg.font_weight === 400) {
          font_weight = 'Regular'
        }
        if (+msg.font_weight === 600) {
          font_weight = 'SemiBold'
        }
        if (+msg.font_weight === 700) {
          font_weight = 'Bold'
        }

        const myFontLoadingFunction = async () => {
          await figma.loadFontAsync({
            family: 'Poppins',
            style: 'Regular'
          })
          await figma.loadFontAsync({
            family: 'Poppins',
            style: 'SemiBold'
          })

          await figma.loadFontAsync({
            family: 'Poppins',
            style: 'Bold'
          })
          await figma.loadFontAsync({
            family: 'Open Sans',
            style: 'Regular'
          })
          await figma.loadFontAsync({
            family: 'Open Sans',
            style: 'SemiBold'
          })

          await figma.loadFontAsync({
            family: 'Open Sans',
            style: 'Bold'
          })

          console.log('Loading fonts')

        }

        const fontFunction = () => {
          console.log('Fonts loaded')

          selection[i].fontName = {
            family: msg.font_family,
            style: font_weight
          }

          selection[i].fontSize = +msg.font_size;
          selection[i].lineHeight = {
            value: + msg.font_line_height,
            unit: "PIXELS"
          }

        }
        myFontLoadingFunction().then(() => {
          fontFunction()
        })
      }
    }
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
};
