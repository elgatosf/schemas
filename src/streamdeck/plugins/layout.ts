/**
 * Defines the structure of a custom layout file.
 */
export type Layout = {
	/**
	 * JSON schema responsible for describing the manifest's data format and validation.
	 */
	$schema?: string;

	/**
	 * Unique identifier associated with the layout.
	 */
	id: string;

	/**
	 * Items within the layout.
	 */
	items: LayoutItem[];
};

/**
 * A layout item.
 * @discriminator type
 */
type LayoutItem = Bar | GBar | Pixmap | Text;

/**
 * Extended information used to define a layout item within a layout's JSON file.
 */
type LayoutItemBase<T extends string> = {
	/**
	 * Background color represented as a named color, hexadecimal value, or gradient. Gradients can be defined by specifying multiple color-stops separated by commas, in the following
	 * format `[{offset}:{color}[,]]`.
	 *
	 * **Examples:**
	 * - "pink"
	 * - "#204cfe" (Elgato blue)
	 * - "0:#ff0000,0.5:yellow,1:#00ff00" (Gradient)
	 */
	background?: string;

	/**
	 * Determines whether the item is enabled (i.e. visible); default is `true`.
	 */
	enabled?: boolean;

	/**
	 * Unique name used to identify the layout item. When calling `setFeedback` this value should be used as the key as part of the object that represents the feedback.
	 *
	 * Note: The `key` of the layout item cannot be changed at runtime.
	 * @pattern
	 * ^[A-Za-z0-9\-_]+$
	 * @errorMessage
	 * String must only contain alphanumeric characters (A-z, 0-9), hyphens (-), and underscores (_)
	 */
	key: string;

	/**
	 * Defines the opacity of the item being shown based on a single-decimal value ranging from `0..1`, e.g. `0.1`, `0.2`, etc. with `0` being invisible and `1` being fully visible.
	 * Default is `1`.
	 */
	opacity?: Opacity;

	/**
	 * Array defining the items coordinates in the format `[x, y, width, height]`; coordinates must be within canvas size of 200 x 100, e.g. [0, 0, 200, 100]. Items with the same `zOrder`
	 * must **not** have an overlapping `rect`.
	 *
	 * Note: The `rect` of the layout item cannot be changed at runtime.
	 */
	rect: Rect;

	/**
	 * Type of layout item this instance represents, e.g. "pixmap", "bar", etc.
	 *
	 * Note: The `type` of the layout item cannot be changed at runtime.
	 */
	type: T;

	/**
	 * Z-order of the item, used to layer items within a layout; must be between 0-700. Items with the same `zOrder` must **not** have an overlapping `rect`. Default is `0`.
	 */
	zOrder?: ZOrder;
};

/**
 * Bar layout item used to render a horizontal bar with a filler, e.g. a progress bar. The amount to fill the bar by can be specified by setting the `value`.
 */
export type Bar<T extends string = "bar"> = LayoutItemBase<T> & {
	/**
	 * Bar background color represented as a named color, hexadecimal value, or gradient. Default is `darkGray`. Gradients can be defined by specifying multiple color-stops separated
	 * by commas, in the following format `[{offset}:{color}[,]]`.
	 *
	 * **Examples:**
	 * - "pink"
	 * - "#204cfe" (Elgato blue)
	 * - "0:#ff0000,0.5:yellow,1:#00ff00" (Gradient)
	 * @example
	 * "darkGray"
	 */
	bar_bg_c?: string;

	/**
	 * Border color represented as a named color, or hexadecimal value. Default is `white`.
	 *
	 * **Examples:**
	 * - "pink"
	 * - "#204cfe" (Elgato blue)
	 * @example
	 * "white"
	 */
	bar_border_c?: string;

	/**
	 * Fill color of the bar represented as a named color, hexadecimal value, or gradient. Default is `white`. Gradients can be defined by specifying multiple color-stops separated
	 * by commas, in the following format `[{offset}:{color}[,]]`.
	 *
	 * **Examples:**
	 * - "pink"
	 * - "#204cfe" (Elgato blue)
	 * - "0:#ff0000,0.5:yellow,1:#00ff00" (Gradient)
	 * @example
	 * "white"
	 */
	bar_fill_c?: string;

	/**
	 * Width of the border around the bar, as a whole number. Default is `2`.
	 * @example
	 * 2
	 */
	border_w?: number;

	/**
	 * Defines the range of the value the bar represents, e.g. 0-20, 0-100, etc.
	 */
	range?: Range;

	/**
	 * Sub-type used to determine the type of bar to render. Default is {@link BarSubType.Groove} (4).
	 *
	 * **Options**
	 * - Rectangle (0)
	 * - DoubleRectangle (1)
	 * - Trapezoid (2)
	 * - DoubleTrapezoid (3)
	 * - Groove (4)
	 */
	subtype?: (typeof BarSubType)[keyof typeof BarSubType];

	/**
	 * Value used to determine how much of the bar is filled. Correlates with the item's `range` if specified in the layout's JSON definition; default range is `0..100`.
	 */
	value: number;
};

/**
 * Defines the range of the value the bar represents, e.g. 0-20, 0-100, etc.
 */
export type Range = {
	/**
	 * Minimum value of the bar.
	 */
	min: number;

	/**
	 * Maximum value of the bar.
	 */
	max: number;
};

/**
 * Bar layout item used to render a horizontal bar with an indicator represented as a triangle beneath the bar. The location of the indicator can be specified by setting the `value`.
 */
export type GBar = Bar<"gbar"> & {
	/**
	 * Height of the bar's indicator. Default is `10`.
	 * @example
	 * 10
	 */
	bar_h?: number;
};

/**
 * Image layout item used to render an image sourced from either a local file located under the plugin's folder, or base64 encoded `string`. The `value` defines the image.
 */
export type Pixmap = LayoutItemBase<"pixmap"> & {
	/**
	 * Image to render; this can be either a path to a local file within the plugin's folder, a base64 encoded `string` with the mime type declared (e.g. PNG, JPEG, etc.), or an SVG
	 * `string`.
	 *
	 * **Examples:**
	 * - "imgs/Logo.png"
	 * - "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MHB0IiBoZWlnaHQ9…"
	 */
	value?: string;
};

/**
 * Text layout item used to render text within a layout. **Note**, when adding a text item to the layout's JSON definition, setting the `key` to the `"title"` keyword will enable the
 * user to specify the font's
 * settings via the property inspector, and will cause `setTitle` to update this item.
 */
export type Text = LayoutItemBase<"text"> & {
	/**
	 * Alignment of the text. Default is `"center"`. **Note**, when the `key` of this layout item is set to `"title"` within the layout's JSON definition, these values will be ignored
	 * in favour of the user's preferred title settings, as set in property inspector.
	 */
	alignment?: "center" | "left" | "right";

	/**
	 * Color of the font represented as a named color, or hexadecimal value. Default is `white`. **Note**, when the `key` of this layout item is set to `"title"` within the layout's
	 * JSON definition, these values will be ignored in favour of the user's preferred title settings, as set in property inspector.
	 *
	 * **Examples:**
	 * - "pink"
	 * - "#204cfe" (Elgato blue)
	 */
	color?: string;

	/**
	 * Defines how the font should be rendered. **Note**, when the `key` of this layout item is set to `"title"` within the layout's JSON definition, these values will be ignored in
	 * favour of the user's preferred title settings, as set in property inspector.
	 */
	font?: {
		/**
		 * Size of the font, in pixels, represented as a whole number.
		 *
		 * **Note**, when the `key` of this layout item is set to `"title"` within the layout's JSON definition, this value will be ignored in favour of the user's preferred title settings, as set in property inspector.
		 */
		size?: number;

		/**
		 * Weight of the font; value must be a whole `number` in the range of `100..1000`. **Note**, when the `key` of this layout item is set to `"title"` within the layout's JSON
		 * definition, this value will be ignored in favour of the user's preferred title settings, as set in property inspector.
		 * @minimum 100
		 * @maximum 1000
		 */
		weight?: number;
	};

	/**
	 * Defines how overflowing text should be rendered on the layout.
	 * - clip, truncates the text at the boundary of the element (default).
	 * - ellipsis, truncates the text prior to the boundary of the element, and adds an ellipsis (…) to the end.
	 * - fade, applies a fade-gradient over the end of the text.
	 * @default ellipsis
	 */
	"text-overflow"?: "clip" | "ellipsis" | "fade";

	/**
	 * Text to be displayed.
	 */
	value?: string;
};

/**
 * List of available types that can be applied to {@link Bar} and {@link GBar} to determine their style.
 */
export enum BarSubType {
	/**
	 * Rectangle bar; the bar fills from left to right, determined by the {@link Bar.value}, similar to a standard progress bar.
	 */
	Rectangle = 0,

	/**
	 * Rectangle bar; the bar fills outwards from the centre of the bar, determined by the {@link Bar.value}.
	 * @example
	 * // Value is 2, range is 1-10.
	 * // [  ███     ]
	 * @example
	 * // Value is 10, range is 1-10.
	 * // [     █████]
	 */
	DoubleRectangle = 1,

	/**
	 * Trapezoid bar, represented as a right-angle triangle; the bar fills from left to right, determined by the {@link Bar.value}, similar to a volume meter.
	 */
	Trapezoid = 2,

	/**
	 * Trapezoid bar, represented by two right-angle triangles; the bar fills outwards from the centre of the bar, determined by the {@link Bar.value}. See {@link BarSubType.DoubleRectangle}.
	 */
	DoubleTrapezoid = 3,

	/**
	 * Rounded rectangle bar; the bar fills from left to right, determined by the {@link Bar.value}, similar to a standard progress bar.
	 */
	Groove = 4
}

/**
 * Array defining the items coordinates and size.
 */
type Rect = [x: X, y: Y, width: Width, height: Height];

/**
 * X coordinate of the rectangle.
 * @minimum 0
 * @maximum 200
 */
type X = number;

/**
 * Y coordinate of the rectangle.
 * @minimum 0
 * @maximum 100
 */
type Y = number;

/**
 * Width of the rectangle.
 * @minimum 0
 * @maximum 200
 */
type Width = number;

/**
 * Height of the rectangle.
 * @minimum 0
 * @maximum 100
 */
type Height = number;

/**
 * Numerical value used to specify the opacity of an item within a layout.
 */
type Opacity = 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1;

/**
 * Numerical value used to specify the z-order of an item, allowing for items to be layered within a layout.
 * @minimum 0
 * @maximum 700
 */
type ZOrder = number;
