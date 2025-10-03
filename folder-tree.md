src
├── app
│   ├── excalidraw
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── test-common
│   │   └── page.tsx
│   ├── test-element
│   │   └── page.tsx
│   ├── test-interactive
│   │   └── page.tsx
│   └── test-math
│       └── page.tsx
├── components
│   ├── Actions.scss
│   ├── Actions.tsx
│   ├── ActiveConfirmDialog.tsx
│   ├── App.tsx
│   ├── Avatar.scss
│   ├── Avatar.tsx
│   ├── BraveMeasureTextError.tsx
│   ├── ButtonIconCycle.tsx
│   ├── ButtonIcon.scss
│   ├── ButtonIcon.tsx
│   ├── Button.scss
│   ├── ButtonSeparator.tsx
│   ├── Button.tsx
│   ├── canvases
│   │   ├── index.tsx
│   │   ├── InteractiveCanvas.tsx
│   │   ├── NewElementCanvas.tsx
│   │   └── StaticCanvas.tsx
│   ├── Card.scss
│   ├── Card.tsx
│   ├── CheckboxItem.scss
│   ├── CheckboxItem.tsx
│   ├── ColorPicker
│   │   ├── ColorInput.tsx
│   │   ├── ColorPicker.scss
│   │   ├── ColorPicker.tsx
│   │   ├── colorPickerUtils.ts
│   │   ├── CustomColorList.tsx
│   │   ├── HotkeyLabel.tsx
│   │   ├── keyboardNavHandlers.ts
│   │   ├── PickerColorList.tsx
│   │   ├── PickerHeading.tsx
│   │   ├── Picker.tsx
│   │   ├── ShadeList.tsx
│   │   └── TopPicks.tsx
│   ├── CommandPalette
│   │   ├── CommandPalette.scss
│   │   ├── CommandPalette.tsx
│   │   ├── defaultCommandPaletteItems.ts
│   │   └── types.ts
│   ├── ConfirmDialog.scss
│   ├── ConfirmDialog.tsx
│   ├── ContextMenu.scss
│   ├── ContextMenu.tsx
│   ├── ConvertElementTypePopup.scss
│   ├── ConvertElementTypePopup.tsx
│   ├── DarkModeToggle.tsx
│   ├── DefaultSidebar.test.tsx
│   ├── DefaultSidebar.tsx
│   ├── DiagramToCodePlugin
│   │   └── DiagramToCodePlugin.tsx
│   ├── DialogActionButton.scss
│   ├── DialogActionButton.tsx
│   ├── Dialog.scss
│   ├── Dialog.tsx
│   ├── dropdownMenu
│   │   ├── common.ts
│   │   ├── DropdownMenuContent.tsx
│   │   ├── DropdownMenuGroup.tsx
│   │   ├── DropdownMenuItemContentRadio.tsx
│   │   ├── DropdownMenuItemContent.tsx
│   │   ├── DropdownMenuItemCustom.tsx
│   │   ├── DropdownMenuItemLink.tsx
│   │   ├── DropdownMenuItem.tsx
│   │   ├── DropdownMenu.scss
│   │   ├── DropdownMenuSeparator.tsx
│   │   ├── DropdownMenu.test.tsx
│   │   ├── DropdownMenuTrigger.tsx
│   │   ├── DropdownMenu.tsx
│   │   └── dropdownMenuUtils.ts
│   ├── ElementCanvasButtons.scss
│   ├── ElementCanvasButtons.tsx
│   ├── ElementLinkDialog.scss
│   ├── ElementLinkDialog.tsx
│   ├── Ellipsify.tsx
│   ├── ErrorDialog.tsx
│   ├── ExcalidrawLogo.scss
│   ├── ExcalidrawLogo.tsx
│   ├── ExportDialog.scss
│   ├── EyeDropper.scss
│   ├── EyeDropper.tsx
│   ├── FilledButton.scss
│   ├── FilledButton.tsx
│   ├── FixedSideContainer.scss
│   ├── FixedSideContainer.tsx
│   ├── FollowMode
│   │   ├── FollowMode.scss
│   │   └── FollowMode.tsx
│   ├── FontPicker
│   │   ├── FontPickerList.tsx
│   │   ├── FontPicker.scss
│   │   ├── FontPickerTrigger.tsx
│   │   ├── FontPicker.tsx
│   │   └── keyboardNavHandlers.ts
│   ├── footer
│   │   ├── FooterCenter.scss
│   │   ├── FooterCenter.tsx
│   │   └── Footer.tsx
│   ├── HandButton.tsx
│   ├── HelpButton.tsx
│   ├── HelpDialog.scss
│   ├── HelpDialog.tsx
│   ├── HintViewer.scss
│   ├── HintViewer.tsx
│   ├── hoc
│   │   ├── withInternalFallback.test.tsx
│   │   └── withInternalFallback.tsx
│   ├── hyperlink
│   │   ├── helpers.ts
│   │   ├── Hyperlink.scss
│   │   └── Hyperlink.tsx
│   ├── IconPicker.scss
│   ├── IconPicker.tsx
│   ├── icons.tsx
│   ├── ImageExportDialog.scss
│   ├── ImageExportDialog.tsx
│   ├── InitializeApp.tsx
│   ├── InlineIcon.tsx
│   ├── Island.scss
│   ├── Island.tsx
│   ├── JSONExportDialog.tsx
│   ├── LaserPointerButton.tsx
│   ├── LayerUI.scss
│   ├── LayerUI.tsx
│   ├── LibraryMenuBrowseButton.tsx
│   ├── LibraryMenuControlButtons.tsx
│   ├── LibraryMenuHeaderContent.tsx
│   ├── LibraryMenuItems.scss
│   ├── LibraryMenuItems.tsx
│   ├── LibraryMenu.scss
│   ├── LibraryMenuSection.tsx
│   ├── LibraryMenu.tsx
│   ├── LibraryUnit.scss
│   ├── LibraryUnit.tsx
│   ├── live-collaboration
│   │   ├── LiveCollaborationTrigger.scss
│   │   └── LiveCollaborationTrigger.tsx
│   ├── LoadingMessage.tsx
│   ├── LockButton.tsx
│   ├── MagicButton.tsx
│   ├── main-menu
│   │   ├── DefaultItems.scss
│   │   ├── DefaultItems.tsx
│   │   └── MainMenu.tsx
│   ├── MobileMenu.tsx
│   ├── Modal.scss
│   ├── Modal.tsx
│   ├── OverwriteConfirm
│   │   ├── OverwriteConfirmActions.tsx
│   │   ├── OverwriteConfirm.scss
│   │   ├── OverwriteConfirmState.ts
│   │   └── OverwriteConfirm.tsx
│   ├── Paragraph.tsx
│   ├── PasteChartDialog.scss
│   ├── PasteChartDialog.tsx
│   ├── PenModeButton.tsx
│   ├── Popover.scss
│   ├── Popover.tsx
│   ├── ProjectName.scss
│   ├── ProjectName.tsx
│   ├── PropertiesPopover.tsx
│   ├── PublishLibrary.scss
│   ├── PublishLibrary.tsx
│   ├── QuickSearch.scss
│   ├── QuickSearch.tsx
│   ├── RadioGroup.scss
│   ├── RadioGroup.tsx
│   ├── RadioSelection.tsx
│   ├── Range.scss
│   ├── Range.tsx
│   ├── ScrollableList.scss
│   ├── ScrollableList.tsx
│   ├── SearchMenu.scss
│   ├── SearchMenu.tsx
│   ├── Section.tsx
│   ├── shapes.tsx
│   ├── ShareableLinkDialog.scss
│   ├── ShareableLinkDialog.tsx
│   ├── Sidebar
│   │   ├── common.ts
│   │   ├── SidebarHeader.tsx
│   │   ├── Sidebar.scss
│   │   ├── SidebarTabs.tsx
│   │   ├── SidebarTabTriggers.tsx
│   │   ├── SidebarTabTrigger.tsx
│   │   ├── SidebarTab.tsx
│   │   ├── Sidebar.test.tsx
│   │   ├── SidebarTrigger.scss
│   │   ├── SidebarTrigger.tsx
│   │   ├── Sidebar.tsx
│   │   └── siderbar.test.helpers.tsx
│   ├── __snapshots__
│   │   └── App.test.tsx.snap
│   ├── Spinner.scss
│   ├── Spinner.tsx
│   ├── Stack.scss
│   ├── Stack.tsx
│   ├── Stats
│   │   ├── Angle.tsx
│   │   ├── CanvasGrid.tsx
│   │   ├── Collapsible.tsx
│   │   ├── Dimension.tsx
│   │   ├── DragInput.scss
│   │   ├── DragInput.tsx
│   │   ├── FontSize.tsx
│   │   ├── index.tsx
│   │   ├── MultiAngle.tsx
│   │   ├── MultiDimension.tsx
│   │   ├── MultiFontSize.tsx
│   │   ├── MultiPosition.tsx
│   │   ├── Position.tsx
│   │   ├── Stats.scss
│   │   ├── stats.test.tsx
│   │   └── utils.ts
│   ├── SVGLayer.scss
│   ├── SVGLayer.tsx
│   ├── Switch.scss
│   ├── Switch.tsx
│   ├── TextField.scss
│   ├── TextField.tsx
│   ├── TextInput.scss
│   ├── Toast.scss
│   ├── Toast.tsx
│   ├── Toolbar.scss
│   ├── ToolButton.tsx
│   ├── ToolIcon.scss
│   ├── Tooltip.scss
│   ├── Tooltip.tsx
│   ├── Trans.test.tsx
│   ├── Trans.tsx
│   ├── TTDDialog
│   │   ├── common.ts
│   │   ├── MermaidToExcalidraw.scss
│   │   ├── MermaidToExcalidraw.tsx
│   │   ├── TTDDialogInput.tsx
│   │   ├── TTDDialogOutput.tsx
│   │   ├── TTDDialogPanels.tsx
│   │   ├── TTDDialogPanel.tsx
│   │   ├── TTDDialog.scss
│   │   ├── TTDDialogSubmitShortcut.tsx
│   │   ├── TTDDialogTabs.tsx
│   │   ├── TTDDialogTabTriggers.tsx
│   │   ├── TTDDialogTabTrigger.tsx
│   │   ├── TTDDialogTab.tsx
│   │   ├── TTDDialogTrigger.tsx
│   │   └── TTDDialog.tsx
│   ├── UnlockPopup.scss
│   ├── UnlockPopup.tsx
│   ├── UserList.scss
│   ├── UserList.tsx
│   └── welcome-screen
│       ├── WelcomeScreen.Center.tsx
│       ├── WelcomeScreen.Hints.tsx
│       ├── WelcomeScreen.scss
│       └── WelcomeScreen.tsx
├── hooks
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── lib
│   ├── actions
│   │   ├── actionAddToLibrary.ts
│   │   ├── actionAlign.tsx
│   │   ├── actionBoundText.tsx
│   │   ├── actionCanvas.tsx
│   │   ├── actionClipboard.tsx
│   │   ├── actionCropEditor.tsx
│   │   ├── actionDeleteSelected.tsx
│   │   ├── actionDistribute.tsx
│   │   ├── actionDuplicateSelection.tsx
│   │   ├── actionElementLink.ts
│   │   ├── actionElementLock.ts
│   │   ├── actionEmbeddable.ts
│   │   ├── actionExport.tsx
│   │   ├── actionFinalize.tsx
│   │   ├── actionFlip.ts
│   │   ├── actionFrame.ts
│   │   ├── actionGroup.tsx
│   │   ├── actionHistory.tsx
│   │   ├── actionLinearEditor.tsx
│   │   ├── actionLink.tsx
│   │   ├── actionMenu.tsx
│   │   ├── actionNavigate.tsx
│   │   ├── actionProperties.tsx
│   │   ├── actionSelectAll.ts
│   │   ├── actionStyles.ts
│   │   ├── actionTextAutoResize.ts
│   │   ├── actionToggleGridMode.tsx
│   │   ├── actionToggleObjectsSnapMode.tsx
│   │   ├── actionToggleSearchMenu.ts
│   │   ├── actionToggleShapeSwitch.tsx
│   │   ├── actionToggleStats.tsx
│   │   ├── actionToggleViewMode.tsx
│   │   ├── actionToggleZenMode.tsx
│   │   ├── actionZindex.tsx
│   │   ├── index.ts
│   │   ├── manager.tsx
│   │   ├── register.ts
│   │   ├── shortcuts.ts
│   │   └── types.ts
│   ├── analytics.ts
│   ├── animated-trail.ts
│   ├── animation-frame-handler.ts
│   ├── appState.ts
│   ├── charts.ts
│   ├── clients.ts
│   ├── clipboard.ts
│   ├── common
│   │   ├── binary-heap.ts
│   │   ├── colors.ts
│   │   ├── constants.ts
│   │   ├── emitter.ts
│   │   ├── font-metadata.ts
│   │   ├── index.ts
│   │   ├── keys.ts
│   │   ├── points.ts
│   │   ├── promise-pool.ts
│   │   ├── queue.ts
│   │   ├── random.ts
│   │   ├── url.ts
│   │   ├── utility-types.ts
│   │   └── utils.ts
│   ├── context
│   │   ├── tunnels.ts
│   │   └── ui-appState.ts
│   ├── cursor.ts
│   ├── data
│   │   ├── ai
│   │   │   └── types.ts
│   │   ├── blob.ts
│   │   ├── EditorLocalStorage.ts
│   │   ├── encode.ts
│   │   ├── encryption.ts
│   │   ├── filesystem.ts
│   │   ├── image.ts
│   │   ├── index.ts
│   │   ├── json.ts
│   │   ├── library.test.ts
│   │   ├── library.ts
│   │   ├── reconcile.ts
│   │   ├── resave.ts
│   │   ├── restore.ts
│   │   ├── __snapshots__
│   │   │   └── transform.test.ts.snap
│   │   ├── transform.test.ts
│   │   ├── transform.ts
│   │   └── types.ts
│   ├── deburr.ts
│   ├── editor-jotai.ts
│   ├── element
│   │   ├── align.ts
│   │   ├── binding.ts
│   │   ├── bounds.ts
│   │   ├── collision.ts
│   │   ├── comparisons.ts
│   │   ├── containerCache.ts
│   │   ├── cropElement.ts
│   │   ├── delta.ts
│   │   ├── distance.ts
│   │   ├── distribute.ts
│   │   ├── dragElements.ts
│   │   ├── duplicate.ts
│   │   ├── elbowArrow.ts
│   │   ├── elementLink.ts
│   │   ├── embeddable.ts
│   │   ├── flowchart.ts
│   │   ├── fractionalIndex.ts
│   │   ├── frame.ts
│   │   ├── groups.ts
│   │   ├── heading.ts
│   │   ├── image.ts
│   │   ├── index.ts
│   │   ├── linearElementEditor.ts
│   │   ├── mutateElement.ts
│   │   ├── newElement.ts
│   │   ├── positionElementsOnGrid.ts
│   │   ├── renderElement.ts
│   │   ├── resizeElements.ts
│   │   ├── resizeTest.ts
│   │   ├── Scene.ts
│   │   ├── selection.ts
│   │   ├── shape.ts
│   │   ├── showSelectedShapeActions.ts
│   │   ├── sizeHelpers.ts
│   │   ├── sortElements.ts
│   │   ├── store.ts
│   │   ├── textElement.ts
│   │   ├── textMeasurements.ts
│   │   ├── textWrapping.ts
│   │   ├── transformHandles.ts
│   │   ├── typeChecks.ts
│   │   ├── types.ts
│   │   ├── utils.ts
│   │   └── zindex.ts
│   ├── eraser
│   │   └── index.ts
│   ├── errors.ts
│   ├── gesture.ts
│   ├── global.d.ts
│   ├── history.ts
│   ├── hooks
│   │   ├── useCallbackRefState.ts
│   │   ├── useCopiedIndicator.ts
│   │   ├── useCreatePortalContainer.ts
│   │   ├── useEmitter.ts
│   │   ├── useLibraryItemSvg.ts
│   │   ├── useOutsideClick.ts
│   │   ├── useScrollPosition.ts
│   │   ├── useStableCallback.ts
│   │   ├── useStable.ts
│   │   ├── useTextEditorFocus.ts
│   │   └── useTransition.ts
│   ├── i18n.ts
│   ├── laser-trails.ts
│   ├── lasso
│   │   ├── index.ts
│   │   └── utils.ts
│   ├── math
│   │   ├── angle.ts
│   │   ├── constants.ts
│   │   ├── curve.ts
│   │   ├── ellipse.ts
│   │   ├── index.ts
│   │   ├── line.ts
│   │   ├── point.ts
│   │   ├── polygon.ts
│   │   ├── range.ts
│   │   ├── rectangle.ts
│   │   ├── segment.ts
│   │   ├── triangle.ts
│   │   ├── types.ts
│   │   ├── utils.ts
│   │   └── vector.ts
│   ├── mermaid.ts
│   ├── placeholder-images.json
│   ├── placeholder-images.ts
│   ├── polyfill.ts
│   ├── reactUtils.ts
│   ├── renderer
│   │   ├── helpers.ts
│   │   ├── interactiveScene.ts
│   │   ├── renderNewElementScene.ts
│   │   ├── renderSnaps.ts
│   │   ├── roundRect.ts
│   │   ├── staticScene.ts
│   │   └── staticSvgScene.ts
│   ├── scene
│   │   ├── export.ts
│   │   ├── index.ts
│   │   ├── normalize.ts
│   │   ├── Renderer.ts
│   │   ├── scrollbars.ts
│   │   ├── scroll.ts
│   │   ├── types.ts
│   │   └── zoom.ts
│   ├── snapping.ts
│   ├── subset
│   │   ├── harfbuzz
│   │   │   ├── harfbuzz-bindings.ts
│   │   │   ├── harfbuzz-loader.ts
│   │   │   └── harfbuzz-wasm.ts
│   │   ├── subset-main.ts
│   │   ├── subset-shared.chunk.ts
│   │   ├── subset-worker.chunk.ts
│   │   └── woff2
│   │       ├── woff2-bindings.ts
│   │       ├── woff2-loader.ts
│   │       └── woff2-wasm.ts
│   ├── types.ts
│   ├── utils
│   │   ├── bbox.ts
│   │   ├── export.ts
│   │   ├── index.ts
│   │   ├── shape.ts
│   │   ├── test-utils.ts
│   │   ├── visualdebug.ts
│   │   └── withinBounds.ts
│   ├── utils.ts
│   ├── workers.ts
│   └── wysiwyg
│       ├── textWysiwyg.test.tsx
│       └── textWysiwyg.tsx
├── locales
│   ├── ar-SA.json
│   ├── az-AZ.json
│   ├── bg-BG.json
│   ├── bn-BD.json
│   ├── ca-ES.json
│   ├── cs-CZ.json
│   ├── da-DK.json
│   ├── de-DE.json
│   ├── el-GR.json
│   ├── en.json
│   ├── es-ES.json
│   ├── eu-ES.json
│   ├── fa-IR.json
│   ├── fi-FI.json
│   ├── fr-FR.json
│   ├── gl-ES.json
│   ├── he-IL.json
│   ├── hi-IN.json
│   ├── hu-HU.json
│   ├── id-ID.json
│   ├── it-IT.json
│   ├── ja-JP.json
│   ├── kaa.json
│   ├── kab-KAB.json
│   ├── kk-KZ.json
│   ├── km-KH.json
│   ├── ko-KR.json
│   ├── ku-TR.json
│   ├── lt-LT.json
│   ├── lv-LV.json
│   ├── mr-IN.json
│   ├── my-MM.json
│   ├── nb-NO.json
│   ├── nl-NL.json
│   ├── nn-NO.json
│   ├── oc-FR.json
│   ├── pa-IN.json
│   ├── percentages.json
│   ├── pl-PL.json
│   ├── pt-BR.json
│   ├── pt-PT.json
│   ├── README.md
│   ├── ro-RO.json
│   ├── ru-RU.json
│   ├── si-LK.json
│   ├── sk-SK.json
│   ├── sl-SI.json
│   ├── sv-SE.json
│   ├── ta-IN.json
│   ├── th-TH.json
│   ├── tr-TR.json
│   ├── uk-UA.json
│   ├── vi-VN.json
│   ├── zh-CN.json
│   ├── zh-HK.json
│   └── zh-TW.json
├── public
│   └── fonts
└── styles
    ├── excalidraw
    │   ├── app.scss
    │   ├── styles.scss
    │   ├── theme.scss
    │   └── variables.module.scss
    └── globals.scss