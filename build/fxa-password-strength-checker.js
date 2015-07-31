/*!
 * jQuery JavaScript Library v2.1.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-04-28T16:01Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//

var arr = [];

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	version = "2.1.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isPlainObject: function( obj ) {
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.constructor &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		// Support: Android<4.0, iOS<6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {
			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf("use strict") === 1 ) {
				script = document.createElement("script");
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {
			// Otherwise, avoid the DOM node creation, insertion
			// and removal by using an indirect global eval
				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if ( elem && elem.parentNode ) {
						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter(function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.unique( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// Add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// If we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed, false );
	window.removeEventListener( "load", completed, false );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// We once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[0], key ) : emptyGet;
};


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( owner ) {
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};


function Data() {
	// Support: Android<4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = {}, 0, {
		get: function() {
			return {};
		}
	});

	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;
Data.accepts = jQuery.acceptData;

Data.prototype = {
	key: function( owner ) {
		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return the key for a frozen object.
		if ( !Data.accepts( owner ) ) {
			return 0;
		}

		var descriptor = {},
			// Check if the owner object already has a cache key
			unlock = owner[ this.expando ];

		// If not, create one
		if ( !unlock ) {
			unlock = Data.uid++;

			// Secure it in a non-enumerable, non-writable property
			try {
				descriptor[ this.expando ] = { value: unlock };
				Object.defineProperties( owner, descriptor );

			// Support: Android<4
			// Fallback to a less secure definition
			} catch ( e ) {
				descriptor[ this.expando ] = unlock;
				jQuery.extend( owner, descriptor );
			}
		}

		// Ensure the cache object
		if ( !this.cache[ unlock ] ) {
			this.cache[ unlock ] = {};
		}

		return unlock;
	},
	set: function( owner, data, value ) {
		var prop,
			// There may be an unlock assigned to this node,
			// if there is no entry for this "owner", create one inline
			// and set the unlock as though an owner entry had always existed
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {
			// Fresh assignments by object are shallow copied
			if ( jQuery.isEmptyObject( cache ) ) {
				jQuery.extend( this.cache[ unlock ], data );
			// Otherwise, copy the properties one-by-one to the cache object
			} else {
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		// Either a valid cache is found, or will be created.
		// New caches will be created and the unlock returned,
		// allowing direct access to the newly created
		// empty data object. A valid owner object must be provided.
		var cache = this.cache[ this.key( owner ) ];

		return key === undefined ?
			cache : cache[ key ];
	},
	access: function( owner, key, value ) {
		var stored;
		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				((key && typeof key === "string") && value === undefined) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase(key) );
		}

		// [*]When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		if ( key === undefined ) {
			this.cache[ unlock ] = {};

		} else {
			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );
				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;
			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}
	},
	hasData: function( owner ) {
		return !jQuery.isEmptyObject(
			this.cache[ owner[ this.expando ] ] || {}
		);
	},
	discard: function( owner ) {
		if ( owner[ this.expando ] ) {
			delete this.cache[ owner[ this.expando ] ];
		}
	}
};
var data_priv = new Data();

var data_user = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			data_user.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend({
	hasData: function( elem ) {
		return data_user.hasData( elem ) || data_priv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return data_user.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		data_user.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to data_priv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return data_priv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		data_priv.remove( elem, name );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = data_user.get( elem );

				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					data_priv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				data_user.set( this, key );
			});
		}

		return access( this, function( value ) {
			var data,
				camelKey = jQuery.camelCase( key );

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {
				// Attempt to get data from the cache
				// with the key as-is
				data = data_user.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to get data from the cache
				// with the key camelized
				data = data_user.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each(function() {
				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = data_user.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				data_user.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf("-") !== -1 && data !== undefined ) {
					data_user.set( this, key, value );
				}
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			data_user.remove( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = data_priv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = data_priv.access( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return data_priv.get( elem, key ) || data_priv.access( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				data_priv.remove( elem, [ type + "queue", key ] );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = data_priv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};

var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Safari<=5.1
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari<=5.1, Android<4.2
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<=11+
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
})();
var strundefined = typeof undefined;



support.focusinBubbles = "onfocusin" in window;


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.hasData( elem ) && data_priv.get( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;
			data_priv.remove( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome<28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle, false );
	}
};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: Android<4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && e.preventDefault ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && e.stopPropagation ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// Support: Firefox, Chrome, Safari
// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					data_priv.remove( doc, fix );

				} else {
					data_priv.access( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {

		// Support: IE9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

// Support: IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute("type");
	}

	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		data_priv.set(
			elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
		);
	}
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( data_priv.hasData( src ) ) {
		pdataOld = data_priv.access( src );
		pdataCur = data_priv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( data_user.hasData( src ) ) {
		udataOld = data_user.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		data_user.set( dest, udataCur );
	}
}

function getAll( context, tag ) {
	var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	},

	cleanData: function( elems ) {
		var data, elem, type, key,
			special = jQuery.event.special,
			i = 0;

		for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
			if ( jQuery.acceptData( elem ) ) {
				key = elem[ data_priv.expando ];

				if ( key && (data = data_priv.cache[ key ]) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}
					if ( data_priv.cache[ key ] ) {
						// Discard any remaining `private` data
						delete data_priv.cache[ key ];
					}
				}
			}
			// Discard any remaining `user` data
			delete data_user.cache[ elem[ data_user.expando ] ];
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each(function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				});
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							// Support: QtWebKit
							// jQuery.merge because push.apply(_, arraylike) throws
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optimization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};



function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];
	}

	if ( computed ) {

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: iOS < 6
		// A tribute to the "awesome hack by Dean Edwards"
		// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
		// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
		if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?
		// Support: IE
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {
				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	var pixelPositionVal, boxSizingReliableVal,
		docElem = document.documentElement,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	if ( !div.style ) {
		return;
	}

	// Support: IE9-11+
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
		"position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computePixelPositionAndBoxSizingReliable() {
		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";
		div.innerHTML = "";
		docElem.appendChild( container );

		var divStyle = window.getComputedStyle( div, null );
		pixelPositionVal = divStyle.top !== "1%";
		boxSizingReliableVal = divStyle.width === "4px";

		docElem.removeChild( container );
	}

	// Support: node.js jsdom
	// Don't assume that getComputedStyle is a property of the global object
	if ( window.getComputedStyle ) {
		jQuery.extend( support, {
			pixelPosition: function() {

				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computePixelPositionAndBoxSizingReliable();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computePixelPositionAndBoxSizingReliable();
				}
				return boxSizingReliableVal;
			},
			reliableMarginRight: function() {

				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =
					// Support: Firefox<29, Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
					"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				docElem.appendChild( container );

				ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );

				docElem.removeChild( container );
				div.removeChild( marginDiv );

				return ret;
			}
		});
	}
})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
	// Swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[0].toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = data_priv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend({

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Support: IE9-11+
			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				style[ name ] = value;
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*.
					// Use string for doubling so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur(),
				// break the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = data_priv.get( elem, "fxshow" );

	// Handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// Ensure the complete handler is called before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// Height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			data_priv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always(function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		});
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = data_priv.access( elem, "fxshow", {} );
		}

		// Store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;

			data_priv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// Don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || data_priv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = data_priv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = data_priv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS<=5.1, Android<=4.2+
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE<=11+
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: Android<=2.3
	// Options inside disabled selects are incorrectly marked as disabled
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<=11+
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
})();


var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {
			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
});




var rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each(function() {
			delete this[ jQuery.propFix[ name ] || name ];
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
					elem.tabIndex :
					-1;
			}
		}
	}
});

if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = arguments.length === 0 || typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// Toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					data_priv.set( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// Handle most common string cases
					ret.replace(rreturn, "") :
					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE6-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) {
						optionSet = true;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		tmp = new DOMParser();
		xml = tmp.parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = window.location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapAll( html.call(this, i) );
			});
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
};
jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


jQuery.ajaxSettings.xhr = function() {
	try {
		return new XMLHttpRequest();
	} catch( e ) {}
};

var xhrId = 0,
	xhrCallbacks = {},
	xhrSuccessStatus = {
		// file protocol always yields status code 0, assume 200
		0: 200,
		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE9
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]();
		}
	});
}

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function( options ) {
	var callback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr(),
					id = ++xhrId;

				xhr.open( options.type, options.url, options.async, options.username, options.password );

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers["X-Requested-With"] ) {
					headers["X-Requested-With"] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							delete xhrCallbacks[ id ];
							callback = xhr.onload = xhr.onerror = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {
								complete(
									// file: protocol always yields status 0; see #8605, #14207
									xhr.status,
									xhr.statusText
								);
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,
									// Support: IE9
									// Accessing binary-data responseText throws an exception
									// (#11426)
									typeof xhr.responseText === "string" ? {
										text: xhr.responseText
									} : undefined,
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				xhr.onerror = callback("error");

				// Create the abort callback
				callback = xhrCallbacks[ id ] = callback("abort");

				try {
					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {
					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {
	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery("<script>").prop({
					async: true,
					charset: s.scriptCharset,
					src: s.url
				}).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};




var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// Support: BlackBerry 5, iOS 3 (original iPhone)
		// If we don't have gBCR, just use 0,0 rather than error
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : window.pageXOffset,
					top ? val : window.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Support: Safari<7+, Chrome<37+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));

var BloomFilter = (function() { //eslint-disable-line no-unused-vars
  'use strict';
  var typedArrays = typeof ArrayBuffer !== 'undefined';

  // Creates a new bloom filter.  If *m* is an array-like object, with a length
  // property, then the bloom filter is loaded with data from the array, where
  // each element is a 32-bit integer.  Otherwise, *m* should specify the
  // number of bits.  Note that *m* is rounded up to the nearest multiple of
  // 32.  *k* specifies the number of hashing functions.
  function BloomFilter(m, k) {
    /* eslint complexity:[2, 10] */
    var a;
    if (typeof m !== 'number') {
      a = m, m = a.length * 32; //eslint-disable-line
    }

    var n = Math.ceil(m / 32),
        i = -1;
    this.m = m = n * 32;
    this.k = k;

    if (typedArrays) {
      // if typed arrays are supported
      var kbytes = 1 << Math.ceil(Math.log(Math.ceil(Math.log(m) / Math.LN2 / 8)) / Math.LN2),
          array = (kbytes === 1) ?
                                  (Uint8Array) :
                                  (kbytes === 2 ?
                                                Uint16Array : Uint32Array),
          kbuffer = new ArrayBuffer(kbytes * k),
          buckets = this.buckets = new Int32Array(n);
      if (a) {
        i = i + 1;
        while (i < n) {
          buckets[i] = a[i];
          i++;
        }
      }

      this._locations = new array(kbuffer);
    } else {
      // typed arrays not supported
      buckets = this.buckets = [];
      if (a) {
        i = i + 1;
        while (i < n) {
          buckets[i] = a[i];
          i++;
        }
      }
      else {
        i = i + 1;
        while (i < n) {
          //initialize bucket with zeroes
          buckets[i] = 0;
          i++;
        }
      }
      this._locations = [];
    }
  }

  // See http://willwhim.wpengine.com/2011/09/03/producing-n-hash-functions-by-hashing-only-once/
  BloomFilter.prototype.locations = function(v) {
    var k = this.k,
        m = this.m,
        r = this._locations,
        a = fnv_1a(v),
        b = fnv_1a_b(a),
        x = a % m;
    for (var i = 0; i < k; i++) {
      r[i] = x < 0 ? (x + m) : x;
      x = (x + b) % m;
    }
    return r;
  };

  BloomFilter.prototype.add = function(v) {
    var l = this.locations(v + ''),
        k = this.k,
        buckets = this.buckets;
    for (var i = 0; i < k; i++) {
      buckets[Math.floor(l[i] / 32)] |= 1 << (l[i] % 32);
    }
  };

  BloomFilter.prototype.test = function(v) {
    var l = this.locations(v + ''),
        k = this.k,
        buckets = this.buckets;
    for (var i = 0; i < k; i++) {
      var b = l[i];
      if ((buckets[Math.floor(b / 32)] & (1 << (b % 32))) === 0) {
        return false;
      }
    }
    return true;
  };

  // Estimated cardinality.
  BloomFilter.prototype.size = function() {
    var buckets = this.buckets,
        bits = 0;
    for (var i = 0, n = buckets.length; i < n; i++) {
      bits += popcnt(buckets[i]);
    }
    return -this.m * Math.log(1 - bits / this.m) / this.k;
  };

  // http://graphics.stanford.edu/~seander/bithacks.html#CountBitsSetParallel
  function popcnt(v) {
    v -= (v >> 1) & 0x55555555;
    v = (v & 0x33333333) + ((v >> 2) & 0x33333333);
    return ((v + (v >> 4) & 0xf0f0f0f) * 0x1010101) >> 24;
  }

  // Fowler/Noll/Vo hashing.
  function fnv_1a(v) {
    var a = 2166136261;
    for (var i = 0, n = v.length; i < n; i++) {
      var c = v.charCodeAt(i),
          d = c & 0xff00;
      if (d) {
        a = fnv_multiply(a ^ d >> 8);
      }
      a = fnv_multiply(a ^ c & 0xff);
    }
    return fnv_mix(a);
  }

  // a * 16777619 mod 2**32
  function fnv_multiply(a) {
    return a + (a << 1) + (a << 4) + (a << 7) + (a << 8) + (a << 24);
  }

  // One additional iteration of FNV, given a hash.
  function fnv_1a_b(a) {
    return fnv_mix(fnv_multiply(a));
  }

  // See https://web.archive.org/web/20131019013225/http://home.comcast.net/~bretm/hash/6.html
  function fnv_mix(a) {
    a += a << 13;
    a ^= a >>> 7;
    a += a << 3;
    a ^= a >>> 17;
    a += a << 5;
    return a & 0xffffffff;
  }
  return BloomFilter;
})();

define("bloomfilter", function(){});

var BLOOM = [2117690338,  -1100493132,  -1077818045, -1489076460, -954451461, 142050335, -151034418, -1383220258, 1846258828, 981539749, 45997730, 697092096, 1270310455, 871555150, -1094529134, -693528642, -1090646166, -1813167449, -555349966, -771883033, 1162259428, 313750779, -72877552, -1108376425, 1726013027, -202962456, 364093076, 695788141, -1692177120, -1518923495, -643546653, 1417486732, -488517776, -1228218885, 437701997, 1849638609, 494449407, -155829378, 905883540, 58194998, 55014685, -1933838162, -222762329, -547385022, 2096461041, 773274976, 99839742, -1208967375, 276376753, -234097235, 1361954728, 642211395, -1174492689, 1646265523, -925368487, -1479239723, 1139572985, 1969200966, -998536632, 1775644715, -613464223, -2032554139, -350816950, -348392675, 969108157, 476962619, -1040573379, -1860469769, 581939832, 872083325, 1694013813, 1669961547, 2075085796, 1385494516, -282362176, -1957426483, 1432848792, -1147945089, 955356031, 2135913798, 1051630955, 1682652917, 1153138511, 2130565967, 1290099060, -1443992005, -1439442441, -1328614662, -2032348192, -1112147202, -1907315373, 1564765743, 412239164, -2026940206, -1020085602, 673844403, -99252994, -688025090, -1110154533, 1050637242, 1603833511, 997629829, -678229806, 1891800627, 1064240819, -1983451554, -845136193, 491590118, 427272758, -1581124934, 498641820, 1276549667, -744635127, -1642102755, -544728565, 1064548082, -1836182325, 54641549, 348366071, 1050332957, 1011955646, 497872923, -1141710672, -1393031458, -1106610439, 1902995178, 1765243102, -114143891, -1549517641, -861859849, 1955588067, -148308840, -1284301769, 986847907, 1587373287, -851841705, 318538110, 554281140, -1393743692, -112337793, 1213563437, 1964946104, -373025256, -785335852, 1060396411, -926899036, 2037361835, -1464608865, -157803285, 1782930864, 838364588, -742737002, -1563725649, -1415517479, 670806130, -98728310, 25474717, 1295640735, 1215025514, -229120826, 1761371864, -305687187, -910529079, -1503424196, -1234089732, -2004927540, 1061751933, 405269808, -1185006896, 1449050298, 1571997565, 1327887751, 2125319559, -252550390, -291678641, -1713824979, 610136722, -1350574679, 1743947021, 1845324434, 2004187382, -98144019, 606976988, -386741316, -1012599979, 1399773678, -1159739832, -898505356, -1084263847, -793445302, 510337017, 2020801141, -1086596866, 1386200361, -611066154, -1370731501, -213633642, 1227599576, 1534561140, -1669964700, -356854191, 2016475310, 377160087, -1090190069, -433398652, 32442836, -1046833231, -1533206774, -1175777795, 1238619912, -1178152993, -224821562, 588949930, -721393406, -151121072, -546219066, 1757127209, -671877244, -764722969, -1096248750, -88090425, -805507681, -1212432849, -2129700377, 1048943740, -650006755, -236347332, 1849316284, -939890694, -329269287, 1987640863, -1869438272, -1063335170, -1653385686, 1505221882, 1571301876, -1367308116, -243815970, 389134430, -1170896915, 648657612, -918895469, -788382282, -1790953184, -289223264, 637138817, 991735643, -522139360, -339345537, 2062266141, -72475942, 622739372, -72090675, -1786063619, -1358291954, 530684827, 1534583010, -273601878, -1604417283, 1955678824, -180529324, -286054807, -1319996358, 1467149077, -1834163615, -1458579913, 662695751, -798017213, -2006142823, -1507411495, 1559590163, 1648125438, 317256391, 1803454102, 732937442, 1618813853, -1818975758, 922199791, 1863836773, -1711999540, 926778370, -384566817, 1895539336, 733167252, 1895798558, -1350521764, 817645437, -179609732, -926761859, -10248311, 787796173, -614459814, -1905547714, -61314379, -1548692592, -572282382, -1737395797, 1593424334, -562574006, 65816778, 890753975, -1043112293, -687399315, 391108038, 955725238, 1877858770, 522841902, -1476597073, -120577056, -998478903, 1013496748, -1613514106, -1926203407, 530457164, 350989891, -34611221, 1791260473, -397326980, -1410161671, 1387162558, -1160376335, 1551219745, -2122800426, -206919157, 495545934, 90374129, -1246217497, 136827726, 1384761964, -2091673544, -627790086, 1668779786, -1649363110, 1856133431, 2131868603, -729229604, 1005128435, 1503960219, 852917723, -162448071, -1733821120, 401120916, 1986720623, -186748302, -601091542, 2056690890, 1205788395, 1542515680, 1123055838, -67955872, -2081391907, 1809939693, 1505338199, -143678498, -1576463388, 1144780708, -285480195, -1516574855, -689833633, 1387547981, 2127736537, -1550415830, -1161703429, 1797537527, -1207969237, -170731890, -446536665, -570847758, -1554897009, -1902391619, -1030437125, 981036767, -2100758790, 1832340025, -1355108433, 1684495328, 2137569165, -273222945, 733462383, -847260993, 1139458036, 743611401, 1350794829, -1539227094, -271147955, -1719155857, 1817302283, -1131122552, 822123225, 259739495, -329290383, -1492315531, -1789466894, -46311913, -764743809, -1754172101, -1808181397, 454670999, 1685630967, -1987581259, 1845491913, -1441397185, 53198235, -2047022888, -683806162, 60549462, -85500211, -2093398354, -566395200, 1871695263, 452938009, -1376543242, 898875261, 453570823, -306835188, -1929247627, -129631821, -366424848, -174461564, -475357464, 1523400874, 135512018, 2139543847, -2082961642, -1434593537, 84682591, -369254595, -563317314, 1865230192, 1174787969, -681875983, 1811361997, -205434344, -138511117, -600846049, 1983796484, -1666729522, 644287247, 1131981675, 1446761068, 1562017832, -1278976167, -1914717745, -576899549, 1776205815, -898094019, 1538429715, 356371151, -675852547, -444981521, -1491501314, -829706706, 2056626218, 227409393, -1837787605, -501367438, 819023717, 1782230376, -1983969168, 2004746035, 2056115697, 560959229, -1650902044, 1016226562, -767421523, -572867847, 1634113731, -848484568, 227009913, -1008915974, 2093504839, -591905795, 1438237984, -356816648, -1991739223, -1376721972, 2142798540, 1480384883, -491950962, -1925432497, -1838654005, -566510888, 217339594, -610320459, 16658960, -681677141, 335107379, -1869091348, 1069022262, 590836896, -1876957881, -1871053367, 1593775318, 1721219810, 1153411235, 217768924, 728974133, -39308183, 873037339, -813361122, 1802802615, -207805737, -283286858, -1846391177, -280879923, -711302037, -577789636, 2049680637, -1604437787, 1119667661, -2067785882, 275402500, -1245464851, 1039916212, 123392726, 661467050, -301121419, -940942076, -308634766, 1357142771, -70858345, -17708167, -1413703451, -177890568, 300771249, 1506263505, -812460495, 1914162919, 1805471225, -1119041778, -990164864, -766631186, 1671246627, -498173502, -954323170, -1324113513, -1020144152, -1497712514, 1316663018, 688541513, -1068510745, 1488975870, -1468665702, -279165178, 1844907824, -1354961812, -125807170, 829156426, 242855064, 1426472074, -1425271870, 1547526324, 1429778799, 676789846, 2132510722, -1200441785, -620919229, 880269305, 2074761296, -1292500073, 458832762, -114102118, -1767120572, -1613139688, -1217213409, 559609377, -157574195, 1314184870, 865197563, -1982326326, 908720625, -1143169063, -2038480394, 1005082998, 1869028400, -612375363, 1266667490, 1055906756, 1680505607, 311865840, -1896494746, 1472683278, 420529105, -1548512350, -900209443, -1091624674, 348371873, -1790228239, -1008309333, -605389521, 797506382, -171743568, -1210389275, -818383009, -1135310885, 415892241, -801266629, -294387501, 51574128, 1472096436, -113035605, -1125564712, 1050783580, 1521872269, -899517572, -504257833, 1257313497, 783677935, -41992731, -1871354392, 525945027, 258426619, 1388598755, 1840242579, 80314737, 2001659134, 2000090117, 764072685, -270339322, -1211711684, 880359766, -1141179576, 396287288, -1804643463, -43155718, -426003401, 1806965280, -171069457, -1564886521, 720966403, 1491190167, 1145800675, 89251467, -6049531, -64632810, -838962633, -423699784, -2029257341, 1776248119, 1363934118, -1400181031, -1533220326, -1703310055, -1188077917, -1924710867, -845662339, 1563848045, -1580432686, -1259351349, -1117052332, 203382450, 386718805, 432208677, 817421461, -1271668145, -1100465293, 943050317, 1363192219, 1919744637, -140190201, 1237624470, -613105311, 983430477, 2067276512, -336664099, -999357117, -141896006, -1587858847, 1125435131, -1596615177, -1047916805, 230670279, -1469420192, -1324847533, -2129492644, -1309230090, 2020144564, -990820381, -495930573, -1824852135, -53520171, 1571855691, 336993171, -460518537, 2029482578, -325926974, 1274520813, 1718483954, -1461386436, 2020804982, -106649647, -541431716, -10577285, -526980776, -895198591, 595421779, -11944794, -584732716, 310045462, 546033650, -722890019, 16482278, -2113627902, -1763839791, 1838895289, 256628271, 155442813, -236553049, 1071022167, 712468123, 1534848181, 2005729964, -1258258744, -1181341765, -1516133858, 709344057, 1522628088, 1862260060, 1318751982, -305172775, -671522429, -1469732399, -1030390795, -1407294534, -546271956, -1916567323, -919311283, 1549943116, -1252661570, -227025010, -624214721, -842018002, -434401451, -1085929602, -2077994440, -1116067859, -131443067, -1613690889, -424792190, -1912732274, 895932477, 1182999516, 1026178377, -124540183, -1904911565, -1059592233, -1277545374, 1047886519, 385042262, -71619327, 1776642460, 2146181726, -595315212, -1973439223, -766448164, 763148115, -1941377805, 1918434550, 366386470, -906036300, -537057926, -1836614268, 1455458522, 405054618, -1912301091, -90630570, -580724876, -49698636, 2137805331, -204876963, 2049934862, -1107481835, 684779955, -974871070, 971826729, 2085919435, 885320009, -1114532013, 1813492805, -748052133, -202573601, -527795566, -222892125, -1502889496, 1553148940, -820618382, 448541563, -568193937, -362443725, 2090558360, -1750170963, -524400902, 984170973, 29088886, -269488116, -782006317, -294036856, 1385040814, 840445053, 2041708531, -352383142, 2136311973, -580066264, 1282768189, 1666596323, 994913138, 322680433, -2028440145, 1983246279, -1144553140, 1597957095, -371747191, -1800810301, -1853025910, -35529647, -838970231, -345956387, -576603178, -1126494707, -555178998, 1738188069, 1170802235, -339815234, -25707638, 2128132783, 1743414414, 1102254266, -1456566291, -1755739153, -669729929, 1594943482, 1983215944, 1336985263, -586606281, 1409285808, 716506206, 1644779948, 1564073843, 1570149359, -1271673981, -1621171450, 522984232, -39174297, -71611022, 1231251674, -1353929489, 339831177, 360054449, 2124901817, 867742869, -2107169013, -1249477956, -8637700, 1806223576, -2104056058, -1907738097, -976927064, -1716066974, -708658062, -245514757, 241170739, -228356453, -154673786, 1337711603, 2018757951, -706775408, -1791070077, 760454913, 534298788, -346891077, 1535668516, -1881096257, -1040679993, -1025841804, -1321039237, -1318244468, -201930986, 1578952969, -562214339, 1917451269, -297930848, -1583042577, -1184792971, -1621422178, -1976570120, -13157576, -1951280384, -1598713396, -1083154049, -2004918411, 1580951794, -1715675058, 2094786853, -310591041, 921233339, -1276755587, -333309334, 1849511886, -284317777, -577038643, 932178817, -149542931, -2092700974, -1061169932, 1740246891, -167544630, 326947732, 1120644229, -1389933894, -602019238, -1959413514, -308711620, -406849514, -335975001, -1760633266, 1265038868, -149997103, -1346966106, -723760815, -1217248524, 1804294022, 1489911314, 1798048719, -302528636, 1614457167, -109590017, -607109960, -1308900676, 1553968559, -1624517178, -1544171908, 1618968630, 841691063, -1618889091, -1967999386, -581534627, -340860250, -2121480760, -647707210, -2003423895, 1506666956, -86538977, -1242090149, -1777660379, 1061146622, 325271065, -1814287660, -1829786192, 720223639, 1497656701, 132582374, -967839412, -654544499, -489420503, -89537695, -2031397499, -623598891, 151201652, -896280613, -42233408, 1997776131, -679684151, 1457987690, -406432491, 1431834406, -1253492057, -2049903950, 784113533, -1422487626, -126681352, 1113526965, -633871327, 1205852646, 800582727, 2132180270, 1160093547, -27705898, -160487046, -277574454, -1443740995, 520060723, -550737192, 1915916916, 549480236, 1729407128, -1477945568, 768314766, -228847451, -137282606, 1383143414, -16091912, -1648134285, 750108217, -78377917, 1068789683, 1516889808, -954226819, 1725747133, -1956366467, -490112434, 498046425, -635651745, -1190299767, -768198595, -1706420748, 1007179752, 68542177, -1089252570, -1553483909, 424469797, 1412321054, 423557431, 1020097263, -1946635229, 890238097, 2108540339, -2050043442, 1860680737, 1241610834, -1223475970, 727801118, 1459354305, 1867732437, -700615271, 1174311150, 1465014043, -102088076, 1040894701, -690463712, 1661155380, -1860681733, -90468697, -1009033182, 1808121780, -413408382, 1576661662, -168067724, -1459589240, 1425476843, 1952199510, 2044642905, 794842297, -1729909249, -194622164, 2048140900, 1464411439, -1122095086, 1916234202, -1722354306, -780222601, -248910544, 2050082323, -402892881, -1997049078, -2145436194, 835428964, 368019204, 477022963, -1649580825, 615474073, -1103450113, 1276110606, 404524726, -136450425, 1943662418, 92437088, -1152474349, -285637209, 1562151766, -628894101, -2054170183, 664771221, 1597721664, 1715005175, -1390163861, 1088954864, -1916100060, -1051578556, -319206741, -2054700546, 1413887583, -1421436941, -606101717, 926054367, 1807742450, 1184816991, 661125106, -375278094, 2064374899, -832769426, -1344809043, 793179779, -173489317, -541753666, -1679136486, 486146554, 507559135, 1730529588, 357127782, 1002036919, -1856856344, -470836578, -1116092978, -399762522, 1340871628, 926505339, 764401546, 2074863094, -2090518131, 434889247, 1742844644, -1713036595, 500525875, -847798277, 1857287391, -1410724600, -175201490, 1508590849, 900650385, 214934378, -814001892, 1139277161, 1177502980, 569376652, -886015591, 302635423, 1657498677, 1328816082, -1916312857, -770688215, -973223768, 673946709, 760609356, 1261894088, -915831334, -1887326572, -801379392, -2055783026, 1105073934, -198360550, 528535656, 1298837235, -128647339, -832232759, 1910597525, -668814413, 1758794628, 468775061, -1104138053, -1706539447, -1670601293, 902886743, -541599638, -1451127272, -1080292135, 840915314, 2133474501, -2033410845, -1682973404, 373022046, 425691766, -187374657, 2141100915, -621680460, -402522592, -171640421, -288773946, -1584316999, 1692104311, -1535824210, 95456491, -455122954, 1066432455, -949608987, 721025406, 819753957, -1004902993, -1563366441, -1113187475, -1664540824, 1892317384, -1739399853, 1962950102, 1279791869, -1812899673, -1203571764, 1002034473, 2039436876, 1826941297, 1737453167, -1816494259, 2071146732, -1900663298, -979812933, 1585339181, -150516563, -1303790155, -1495281083, 1366415957, -494993573, 1048195001, -1431151639, -1105496971, 1145265321, 339925954, -914540545, -813594378, -551653841, -1965274091, -613516547, -608594375, 643028120, 1854030295, 708956292, -1271566329, -1142988092, -15402569, -1866795260, -1687907203, -184156670, 791644231, -165688177, -1446861383, -1478717491, -1717481977, -814249050, -362250893, -555235602, -405697881, 1892601205, -281395986, -1665638919, -525060797, 1475253245, -168999513, 2053460641, -1253085946, -737692929, -2096645891, 2134783287, 1047040987, -1028024321, 747138297, 1672721604, 1797930571, -570058201, 1612540562, 2079272641, -578872177, 1145403551, 609176743, -2122210534, -277635590, -832539163, 1985886642, 1744613702, 1188338654, 432811789, -297786022, -35266085, -1087006882, -980851230, -92643187, -976558022, -101631049, -1049829960, 2007910091, 1918379664, 1509143279, 1521858220, 799853822, -577235133, 1573451604, 699485982, 14565179, -1953296226, 1721466790, 116859471, 1567651330, -173839370, -1371714347, -1526548051, 1818884322, -1786795024, -1719079781, -1302414465, 1265177214, 152913875, -583223178, 985810447, -1886899294, 749025077, 1437720315, -767579632, -465612309, 1487075679, 1901609100, 2051628061, -642518118, -1194842801, -360834325, -946787833, 1595234310, 996943133, 846975492, -196904135, -1899179677, 2060186731, -2037605909, 1191017900, -1460150619, 924010809, 1759417280, 1629602807, -1052289434, 1526451284, 1309090714, -1671613567, -722929766, 2126537868, -1191541319, 834275942, -1230620657, 90725278, 987954026, 1582287320, -54989835, -332291604, -314333455, -638236706, -36434326, -91660383, -600733280, -1101816881, 1806392943, -634144359, -1171292968, 295139862, 1842311996, -1839220391, -726077057, 2099014022, -1397369628, -1720266651, -1152708674, 1923728648, -1889065110, -849240687, -1866558328, -1525584998, -1449809569, 552005001, -634549497, -1970788051, 356728065, -445690547, -485578678, 1526124264, -1630955773, -1962602863, 215707638, -1126919047, -1433536477, 1132227979, -1800606812, 1964096954, 1040278089, -93598339, -578170666, 323661730, -1757169083, -629881310, -226723375, -1631024213, -1368535987, 1768880186, -615021363, -2069551020, 959986217, -942091528, -153410449, -344080588, -617643670, -1897775563, 196493617, -4196620, 650901151, 1347575773, 698616713, -893641290, 402605370, -1731137741, 294776747, 2091640946, 1569716022, -462764193, 1405884939, -1736639253, -1454040523, 768638249, -273072846, -174261008, -1360742646, -23596670, 1555410716, -1271435929, -2042359265, -449092051, -2050711270, 823573789, -2023920687, 962541755, 1468242029, -676866430, 764153567, 778737592, -1078601750, -205643891, -1501366888, 1706523462, 727335413, -747490927, -425866246, -1136942463, -790954457, 785418996, 1616892882, -1010989608, -365462281, 397377064, 1826297926, 1151771626, 64156543, -2031949721, 1049611340, -392641805, -1927984353, -318870126, 915144051, 1388979338, -1957810822, 428636862, -849641517, 1787175919, -796034811, -1833981855, 392688709, -1306883673, 1656591467, -982516807, 801874389, -302013554, 830286416, 1437782783, -528675897, 720938770, -1181823073, -924479386, -1992445957, -793332876, 1205765664, 1878655152, 1942879930, 1568542443, -37587371, -144331019, 1860693886, 1680823086, 518994999, 1568902532, 1299178772, 2000527758, -207662914, -1301305113, -1077642127, -138463915, -981392360, -1812815190, 445616564, -225891453, -1396812035, -1832984713, 1029237926, -2324541, -1890255712, -1670066148, -1195947657, 311912394, 1696249600, -1128670218, -393299515, -1901437064, 348552896, 1049074152, -151585292, 1570634516, 1059482391, -512872690, 147676854, -117102865, -1640505605, 987063217, -264549865, -1017369189, -1613338922, -1083770899, 2140754970, 664570873, -64457559, -1694322701, -149643482, 1409093466, 1121351474, -348837906, 374926697, 1990436523, -1835122662, 2026896245, 379465144, -697428497, 1668546174, -2063126666, -1810678151, -1478318449, -1545964074, -853075248, 330306671, 269924641, 1268115570, -1018368511, -132704789, -792270890, 1613224911, 1977041039, 456233681, -1040795411, 1986520774, 809719525, -515946673, 1601707399, 1520400095, -2147042817, 689356096, -1683724122, -15381762, -702039885, 1438043487, 1159507334, 1078015820, 1357878473, -1364727160, 977949180, 2070132094, -1724494261, 1936785151, -1068931961, -84475907, -429163866, -426244944, 2146276448, -382221472, 1918768629, -273091921, 167604987, -248483256, -1147685959, -1034644945, -917026768, -631072556, 1986669395, 2064824942, 1156130802, -20919869, -1280061186, 259999023, -1660150991, -557530341, 3336347, -136317577, 653952983, -2043299986, -1616450006, 1217698626, -1912512982, 978770927, -333066265, 2129214146, -1153145402, 1351046654, 1860568290, -1213235716, 1970113029, 150695667, 2070182268, 696379615, 1354290567, -397869909, -1944132549, -43747152, 2138402627, 1246089240, -506039335, -627525380, 2125705555, -1882472973, -1570534108, 1007758915, -1628069065, -591122984, -51195521, 1311068416, -1696198974, 1838569423, -687608962, 828808427, 1973336500, 735175766, -313228795, 196484967, 991839593, -713494035, -634137593, 803871212, -1252027815, -238240142, 256620323, -765290577, -1297837402, 1526825423, 1747108275, 842239775, 323874764, 1744159970, -84091565, -1694844493, 1001939195, 1448174654, -1313233617, 398641101, 1206672146, -1629233549, -3902409, 1035649246, -981221299, 1366112758, 1662720452, -50557663, -455971236, -1255042595, 1237261776, 726642431, 2123351998, -641819437, -1851894672, -597954105, -1839667095, -112695534, -806373428, -111354769, -1981037803, 2141352998, -887206175, -84430835, -1349547408, 2048262879, 502815213, 1062816578, 803762895, -309612225, 1576958925, 986630322, 1019651577, 886454120, -1235917517, 1866242924, -1005013185, 945413461, 1902090587, -545932544, 1434889507, -179753533, -1596527124, 983496070, -640442786, 1535942467, 2040789310, 114910399, 196217301, -1628966648, -1042852114, -254118435, 2139634344, 930789262, 781126203, 598168408, -1149084, -570833503, 1067328179, 39191655, 2141714301, -51732275, 932577054, -779133971, -1492148569, 1656673868, -1140854800, 1511048823, -2088989705, 669345303, -114282126, -420619126, -334727174, -1788019434, 289319786, -1539383266, 2004250837, -1765442097, -1514845483, -1077368341, -476758946, 1006319553, -145419277, 676814288, 1109509827, -1402011925, 1450616286, 1278762485, 1165988337, 183934311, 8829457, 2067171499, 1929321515, 249777696, -1823519879, 440744056, -948632035, 1874847462, 399612707, -1959283298, -561567590, -605068599, -1733990842, 1056613170, 2131168486, 1867173524, -1822704178, 1641806860, -202114684, -1235699619, 1606910439, -226839782, 745725545, -1241608763, 860089239, 115335572, -462603012, 778524886, -1918894374, 1469439667, -1217426330, -1535988286, -410627009, 526228211, -1762697513, 1382544066, -362258657, -164106553, 1513691711, 1970906296, -1574702166, 1714051390, -1567501358, 514496290, 950745111, 1856345071, 2071617010, -922996221, 924304453, 1670739927, -533009656, 449462028, -862522702, -1022763291, 1222539899, -343946287, -241321452, -1819421750, 1503485637, -571522795, 669440500, -1327654559, -641983018, 891709363, -168108425, 2143608330, 1187565467, -865488069, -636633336, 870809631, -1424636367, -2110437789, -101189658, -1247049774, -812223617, -1759628401, 2100083283, 396981262, -36470879, 959735309, -363061098, -207282013, -1010359978, 883837557, -1143067072, -245654299, -246955159, -143527575, 1523012063, 1571105318, -1939345642, 1780176636, -53519184, -1545663175, 412151137, -1414220159, -334895221, -1758189203, -681156271, 787603392, -1683825577, 1757549446, 1967295927, -1800165616, -12288081, -623050865, 1456992023, 2111500765, -1012336749, 225320667, -1318189402, 1837553933, -813132941, 368771324, -189318445, 903823129, -1378977235, -1593916050, -1191753571, 2118100939, 1985478459, 967210054, 1958083246, -296117106, 1889008037, -1967657057, -348226887, 940276013, 729025607, 1138642732, 1361146443, -558507550, -1968573127, 1025727365, 1714853489, 1855697422, 241425335, -1869540916, 940466040, -1762746884, 878603005, -1018554492, 599629440, 1502577277, -96806822, 1507240047, -318540235, -1107042306, 1895161641, -107742080, 134818793, -864477362, 1056563611, 1899933299, 1158878578, 1476591526, 1909670378, -181803187, 1816038305, -1797737426, -434684731, 914800499, -170006782, 1770297142, -1584439871, 936337160, -143922721, 1232897789, -713901795, 2012415431, -1812355501, -1711584985, 1732579237, -1910104513, -1678988097, -1208111471, 144506649, -1522627334, 1204283926, 850552271, -483959332, 203733706, -168031034, -1504816866, -10748840, -1127724117, -990128615, -14119461, 346103686, 518665376, 86716857, -1238829796, 769099963, 1134013974, -448296514, -1965591297, -1361154474, 1019215738, -1184211707, -1161843137, -235780117, 1847895335, 1287624383, -350418376, 1519889343, -1577719529, 1955887356, -1594706344, -65735739, -893873697, 1896196723, 158449005, 977972777, -1606675287, -1476725088, -1549601624, -1436738839, 1053270812, 557833601, -1041667509, 462314002, 1136630523, -846559071, -1131554034, 1453639666, -1663492832, 1867333398, -92297732, -637799700, -289749956, -527887021, -2117525939, 1616821909, -890869187, 81980177, -1203937333, 803495398, 1543976123, -1520547010, -449791156, -1570377156, 1439577150, -26607687, -956833836, 1922866689, -1125391299, -1860207618, 542105492, -1837112524, 2003416229, -1244285617, 2013232714, -1857116451, 1466120695, 656010259, 1594909443, 1760879414, 364270709, 730452952, -714104370, -719807201, -1463301399, -639636298, 1823995859, 2060447584, 2123884611, 542891659, -1380950702, 1807441646, -871658075, -672883858, 1464997015, 1314087218, 2027664817, -10303697, 1926686229, -1077229752, -1417873327, 1441148943, 1427540685, 1078913743, -1428527493, -561984576, -751210828, -199801315, -1919057364, -236320969, -1212178518, 1299187039, -155312740, -476015282, -64849058, 1848631973, -2031506368, -1969275882, -600948970, -80055023, -76378375, -1300797858, -981540988, -1805357548, -664579380, -52898362, 1780943313, -406743606, -225016235, -50539061, 831343485, -1772037024, 242388316, -1809012048, -442580951, -606295194, -1686434918, -1189465923, 923090380, -623401769, 1022443306, 627798521, 1400036749, 1130916876, 1273026122, 1944836457, 1454041521, -805765220, -1098212163, -1154691035, -596682794, 405582541, 399570567, -2084746852, -1414330408, 432510911, 1811131653, -1084370198, -1225269384, -1425990369, 1303173209, -1074941041, 505251274, -1758738831, 1576579343, -37341575, -554571239, 1062161583, -141566067, 1299266029, -86385195, -606965067, 1793670822, -434371, -128580965, -611692503, 1654355699, -7873483, 1991959501, 1290738918, 1800409897, -955540721, 1791844457, 1730465058, -1243498567, -167091199, 1863334412, -107680262, 330797394, 711886334, 992274407, -1144617603, -942550218, 956449621, 458058410, 705539927, 1874945717, -630658102, -627804943, 1000037116, 1554750261, -1236890740, -1884201759, 1603163942, 1326527780, 1819634509, -488449323, -2064678038, 725086737, -1136768313, 1947596752, 625605453, -1304205356, 1255617624, -1695580416, -558524653, -1970866628, -42070054, -426844801, -1341463794, -1211625833, 1129237491, -1999776453, -1090925897, -122588698, -765526107, -1170492939, -1344453930, -1236841526, -1440694172, 1600896921, 1900558154, -1544588290, -332235041, -325392991, -2039202669, -1879157683, 1811127415, -1194471769, 2053919287, -497536025, 1502145249, 518929609, 815686957, -217802469, -626152643, 1997003432, 308672939, -1590846524, 519481275, 853781047, 452975507, -168955899, -985255778, -1879795391, 1268040639, -1655221425, -382909548, -1617405088, 2105305845, -1150425744, 1707565713, -2117374601, -210538932, -585515196, -1322454880, 1861457461, 1449018699, 913371983, -71733107, 765193383, -1538097658, -483913515, -1292688803, -90242731, -1267832137, 1878784425, -1617595608, 882215135, 971619599, 1174655237, -684722276, -1222015019, -1482625431, 1306811893, 1416438899, -853741116, 1993734762, -1582264099, 662126775, -1778941335, 1528691343, 1442438346, -238095468, -902226620, -1730953355, 1489443387, -1835276588, 1820997992, 1645805371, 1873621367, 1552229635, -66306681, 1577715230, 474131661, 1049099886, 1775385708, 988329654, -238636014, -1823346299, -1872914555, 654187658, -1379041359, -1721305910, -1279820593, 932638159, -422089457, 2125146923, -171545610, 1026478319, 528194017, -90843482, -234635434, -680404113, -216638197, 1868195426, -1222798155, -1892019306, 1958210719, -1619803250, -609760873, -1778681093, 1871333657, 532247227, -44902033, -1142958001, -592824625, 543351632, 2031700912, -793445941, -457476616, -1661153769, 2103264191, 891188694, -248513688, -132188007, 1310161841, 1158496874, 2113038918, -808934029, 2044355672, 1232483966, 531411260, -222337861, -1759923912, 148813940, -1417808573, -612262625, -1177951119, -1321666364, -787158597, 1871959184, 404550210, 2106751670, -35191208, -411981087, -1295574570, 1113554604, 834985833, 376373198, 1075034708, -1797554193, 179667381, -539389192, 641462771, -15590982, -995658413, -1502038946, 1192703898, 668073979, 1868027829, 1278593738, 468691435, 274279252, -1593228394, -267425410, 1112149923, 1613377247, -875230598, -153440059, -1282276067, 1587509158, -318868245, -1067130886, -1663062513, 1403573901, 1627881397, 1061418042, 1231453499, -1737594448, -1254705380, 1872568205, 1074851582, -98076226, -1344786136, 804732587, -1196633392, 1237942982, 971554527, -387063009, 1254197865, 161846731, 1844967324, 1643620326, -537867924, -611998814, 449597612, -1643721498, -1691105804, 714421483, -2002855789, 597775283, -1635531234, -751176634, -1814138994, 467849387, -1638427780, 1926626080, -1376389589, -2017724371, -556680232, -640767367, -93329649, 716085423, 1068095757, -1887860549, -1210496276, 2047857888, 1417696495, 1586758596, -432617819, -710883181, -1562538162, -1623794515, -878479417, 1828378165, -6329357, -470405991, -262015770, -1628791385, -1313363658, 529354165, 464314041, 200874284, 1611646175, -805577768, -1004445724, -563520179, 1368687319, -754630595, -638240046, 274266357, 1304372986, 1988531463, 803334843, -183760927, 1889949805, 1507715866, 302017622, -1172797789, 163906059, 1289271271, 251942165, -1474693973, -981004388, -1370790105, 92752763, 2111534161, 1725552473, -1996817528, 1090191220, -1570276429, -1660427662, -1485673539, -505874655, -319220642, -1243232647, -616796181, 615492115, -82071925, 1167916462, -254838483, 325644005, 687656029, 783338653, -301457076, 261318393, 1846168811, -707944876, -1314227230, -1879270898, -1501460909, -655000690, -1431503938, -760746515, 1212943916, 1818483194, -1457293435, 392676044, -1602134745, 1369504702, 526105575, 1061771821, 2004989910, 1530910241, -55351583, 1962013910, -1766537978, -1830311091, -1209354361, 1465800611, 916637361, -1352865440, -307608102, 1911144162, -1015744287, -1331480641, 517398266, -2043683880, -1893016487, -27137363, -1896235272, -1925534769, -1550914349, 244642143, 199142974, -548898887, -1717482539, -965825823, -1594504748, 1386900789, -1335420631, 418806547, 1364326207, 1800934417, 916053705, 1821117657, -697145410, 1488837473, -552932696, -1048712552, 1024965181, -785881865, -697494404, -886800622, -1687434377, 1274287820, -994704467, -329092178, -178291330, -1348114569, 170184315, 74264440, -1055616355, 20691640, 313046735, -808934905, -381217554, 390824107, 2062116122, 997822113, -1241555008, 1714035439, -306554281, 682140151, -1342493701, -360268929, -1627435065, 814732969, 1783379314, -1483102604, -1245871435, 1375399405, -1265492393, -1096337796, 180529574, -311252389, -1813627870, -1830693205, -485395843, -1770983448, -2085208671, 348068813, -868944907, -576265717, 67636730, 2144858323, 1226930568, 1968840473, 696358463, 1470261688, 1333805863, -113827664, 2142023557, 1819017561, -1062496018, -942230980, 500703, 1475882043, 480079720, 1069272828, -1679234055, 31620592, -1681131009, -798247046, -1339706883, -431236080, -2045817859, 997301678, 1515809748, 1489261865, -2013960878, -835168073, -1829318684, -1865092175, 1054635907, -1533018450, 1005607473, -2133882156, 502799339, 1372694743, 195327471, 818649991, 850093341, -1395693662, 388215934, -1326657612, 413978238, -1310218082, -22156236, -1824399469, 75052148, -2015511634, -680678439, -165403489, -609403145, 1256286874, 958829491, -699605066, -1913724828, -1389729939, -1491908759, 1624727421, 1976831295, -33902733, 574224398, 138956669, 769160118, 1280888949, -1360441425, 1062053550, -580315974, -1513242668, 618592616, -12622432, 186898413, -1932283302, -1597138585, 1533599635, -1803896528, -1096991798, -450013861, -889961180, -2115205431, -2048552714, -1721295324, -1461212981, -500550508, 321239404, -1770795587, 845787976, -170803804, 1439624506, 993596139, 770553697, -306397329, 1040097541, -265782492, -830781628, -448836915, 277771509, -30850640, 1045378620, -2089676359, -649134837, 1496932323, -509158969, -553702497, 265633020, -1689322861, 1210711579, -805454898, -1420843240, -2089016950, -101041979, 624520103, -14107870, -760028740, -1698460592, -1022460945, 532274714, -76220537, 2071572983, 195538288, 1776781453, -1779609071, 767470000, -40485414, -1522932029, 319969782, -742181447, 686582657, -1047024402, -214894143, -1575266926, 429648595, -173522928, 1783998901, -903466217, 792572566, -2019770385, 602218351, -819044840, -820944000, 1095964634, -1582298260, 1130996970, -1223555173, 1497947790, -1226481353, 401271716, -1621803158, -500975792, -1005154881, -1862247655, 1623327440, 1597759996, -281469637, 6880672, -187704512, 2126180762, 1460314311, 1514551930, -1750268066, -1069857908, -2091038498, -666225846, -1782655685, -1283089285, -1417381445, -294336110, 134725906, -327454817, 99300766, -1473785475, -1199878726, -1513972518, 1891887643, 737038276, -1321284953, 445602521, -2072496235, -581439541, 1864219928, 1279197887, 1468380653, -1748681066, 2105764975, 223711658, 1770887157, -413204166, 1318896826, 930696871, -158754173, -1402675151, -473420820, -678658208, -508394229, 921985331, -1071526920, -1826348979, 1271535612, -1054012659, 2046517680, 288437052, -1430727678, -1934285239, 1364830505, 996721876, -11625127, -181418275, 2100806754, 1830696857, -2107198098, 621785357, 1406040404, 1421443039, -1742509789, 1659891032, 872165777, -1621528865, -247892555, 2103866430, -2046212104, 326205776, 1438994846, -765771826, -50118231, -760194843, 1463266170, 1134417486, -1848190451, -1130875178, 2104834921, 1277078252, 1361546028, 595872702, 255059229, -1091720803, -211354644, 200279649, 821795360, -2025953567, -214180610, -1201589322, -975657840, -1941942303, 1358363378, -562521094, 655346091, -1443741462, -1451384732, -796951410, -1248731106, -1092562011, -1973030145, -33900211, -1118095505, -517782857, -344346170, 703264304, 988059263, -1533106450, -1384270114, -1185400911, 1819512648, 1553457398, 1813472464, 1580061264, 1022480850, 322155626, -1061180601, -335585825, 1199184507, -464405783, -1378689715, -1390068045, -1783881190, 24283408, 156432206, 1969349493, 1484923374, -1765186465, 1824276119, 768911240, 2083577679, 914029605, -1380431641, -575543363, 560411580, 1768501747, -157620579, 1739971567, -1934498822, 873118139, -583289826, 1270273194, 2121234615, 838193893, 2114430949, 1603773065, 1400840815, -34417886, 1808533437, 1299810189, 1459477725, 1797168054, -656038387, -389841157, 2002485213, 935233513, -1186411275, -434155178, 588065214, 2123826645, -365350013, -1259803011, 1042955839, 450042526, 202840485, -743707321, 881265266, 1517661911, -1292823937, 1044669887, 805756277, -1477057964, 1845229271, 1453305128, 559787599, 1259387310, 2016845819, 1241819869, -169930294, 1744082059, -1652822889, 780558763, 1078208369, 2080410364, 1866243348, -119826548, -2027226487, 1321021914, -1094160199, -1412728439, -1063693225, 1549047566, -456530641, -1345028816, -2023015722, 477240390, -1364075087, 1125765807, 887757230, 711043103, -1486403971, -673858110, -1227183524, 1460355628, -413198304, -406721949, 1659412454, 935391375, -1749852313, -1253278773, 1652544792, 1536086678, -95948226, 1244188451, 900713295, -573096593, -1555354080, 588867507, 834205590, 1643983547, -659033050, 1256049167, -511897707, 852172547, -1633181998, 980626876, 842493033, 1430672251, -1116222978, -655794117, -374404417, 198650361, -2131912906, -1661731313, -1482277939, -2103181793, -279577390, -1162166631, -165012914, -271823798, 1864187151, -2051118489, 767873054, -1691114198, 1322624438, -778162111, 335336883, 267896098, -301997992, -1788361964, -847622660, -461159392, -673659796, 980804241, -479442648, -1481598622, -2071379887, 1685012834, -1629772457, -1691667365, -875607256, -1398071444, -411162144, -659755545, -907870124, -948569701, 1815710531, -100706120, 1353613289, -109750420, 371943310, -1792058121, -990300050, 1114332999, -139305776, 1956486891, -1605325821, 1773088571, -927935758, -2013485170, -1946276759, 1697135839, -966402565, 880588057, 171143430, -1838173864, -228593417, 1574605606, -838611105, -1666383890, -749555085, 1501890830, 776806260, 937062190, -1807952199, -463237633, 2980057, 1571461020, 817492949, 1199894344, -565225093, 796581819, 1920068615, -1670870045, -1229466291, -781126752, 533626874, -1667390442, 1590033964, -318195200, -1770262800, 1624088539, -576960647, 412084471, 1466350093, 2083143671, -191524969, -7479316, -448365610, -1424036276, -356917511, -2098213327, -178540342, -1261345093, -1304676008, -2021523786, 2056887122, -1604969858, 1492587611, 1194378136, -604524646, -741106914, -86866837, 2105838202, 1334869210, -18272552, -719665047, -119419746, -1626990629, 1485392637, -1434587675, 1742538981, 1316747174, -235093393, -1544035746, -399070632, -858012005, 2135332637, 74280809, 1547555825, -1999101986, -1385894011, -422860073, 1540479732, -1689830002, 285810054, -547294793, -199269529, 712821813, 2073937968, -48486145, 116207665, -1193521066, 589359277, 1699990107, -1224647578, -661933126, 1841658242, 1591500285, 448693090, 1995340896, 113511205, -2121322613, -1068070971, -674835092, -840354309, 1084806789, -957809386, -1285594163, -2030108762, 317168627, 1056362321, -1966882405, 691270323, -716514531, -907149561, 2070193215, -782579824, -309072308, -1584037568, -75839871, -1598684102, 1872363119, 595086276, 982334942, -693998925, -1355102105, -627277192, -1227630196, 1875005146, 1449338909, -1645249123, 1225211594, -109341837, -967219226, 799119876, 16295423, -1438632690, 1045605574, -882382757, 1658297981, 1376942661, 1176223220, 1037839531, 1723430485, -1287312696, -1002101640, -1227572273, 473575236, -1285770319, 1241025465, 1297242972, 2136647799, 441935971, 238274805, 310363409, -579414401, 933028574, 1118005513, 905183858, 376596875, 448759047, -19372085, -542758743, -867205988, 1570467527, 565891827, -9249760, -27997076, -1955251719, 861457559, -1116685058, -50908879, -1893060964, -1712311811, 1162882167, -424231384, 500800831, -556985098, 1373687237, -777108014, 1525641547, 1291572846, 1374433406, 364505929, -1534146794, -1284249480, 844046671, -720685680, -76323561, -1290699917, -86575858, 478013660, -707370720, 240962417, -842334214, 1355431880, 1861633627, -675984734, -1482220056, 1429873738, -2080643933, 2083016414, -19179932, -1104715414, 1007626827, 2140006786, -871617857, -1627877211, -1617789212, 422628237, 1532598367, -318062072, -1208287816, -508108889, 2130556194, -1838762954, -1758464449, -1217410601, 1725504983, 2143090605, -1966368115, -1126082631, -978991270, 1621001671, -1637805137, -793321809, 1987403738, 424663736, 222008531, -145215574, 2034201850, -1176448477, -579092594, -1265258964, 1216032777, -1255628733, 502225578, 314344034, 1717893629, -278932756, 1068072366, 1486216506, 759275429, -580250045, 1052892087, 376860512, 1919713067, 559121730, -1858457788, 984217513, -1111494918, -1497469198, -178263813, 1441920255, -596197904, -1512317131, -941631019, -1655506909, 1339126527, -1912880463, -1302771091, -1289257580, -124152003, 1601686823, -1079205462, 565966246, -1860127193, -1152822223, 1014091255, -1481925457, 904210833, -1034187929, 553076638, 1318114138, -1972245754, -1297404107, -1885818156, 2080359411, 1958007814, -1279034294, -1636049968, -134513583, 981878397, -2001221473, 588889536, -151250081, 1511608034, 511103469, 29305577, -1679073189, -710294758, 2072529826, 1451048100, 2019892302, -1025933370, 684329863, 1386266317, 2005895905, -471070387, 1840574327, 710179810, -537140041, 129986600, 1295085485, -1952444573, -906244198, 1180642341, 1616253731, -1751594897, -818768773, 1273340662, -1837373936, -896020184, 1587007192, -515237207, 1069480254, 1606162571, -333312277, -2013600922, 400409453, 258276867, 103419537, 1136957166, 1323639656, 702885122, 1463705936, 1752342492, 656896370, -756934024, -538189999, -694290685, -271765794, -658110935, 1279323496, 576375883, 1678887623, 719286978, -607273188, -1187804719, -1004837437, -544595729, -290325334, 1654193326, -224022964, 165593538, 1730338174, -874620347, -1605593763, -1812345033, -730838945, -1741616834, -1381569797, 1297604543, 207720317, -1721766859, 1900620214, 334264368, 1602917287, -285747194, -397786206, -742486106, -318920610, -1622432480, 1558158117, -282081581, 576542898, -1976324113, -1120149654, -1078316888, 1219206551, -564344097, 393762946, 55469418, -1601438022, -1078167592, 57783517, 2080217549, 221303818, 1740478237, -1412859435, -1493623869, -1722777792, -1394235035, -960378877, 1405432917, -1889912534, -799622549, 188627887, -1372788846, 1087742967, 1761013906, -1781894279, -1060576354, -189220264, 1112031431, -1109966019, -1863024542, 1719196860, 2140829311, -328651185, -642251066, -22176097, -1256984600, 2060722014, -724574511, -1513147291, -1140272931, 1404947709, -301029035, 1975698021, -1338330042, -1519059618, -89144407, -711404393, 560361087, -114670492, 789783935, 797436564, 1816762503, 1662662862, -120290052, 2008534373, 1935978220, -247928338, -1704183041, -108713008, -301348144, -357216999, -897189191, 707809776, 711350655, -910730643, 1530551425, 1833163881, 380565774, -174113813, -1442928955, -1153341497, 1469037384, -1525130670, -386657200, -804088537, -420807113, -1708436169, 996226551, 376328560, 2105467313, -1118678846, -4879859, -219235372, -237897111, 292222595, -1451416111, 891256344, -350602380, -235918426, -357246277, 1834874878, -2049311070, 977714285, -49550389, -1655819097, -1245748398, -1508803553, 1021219258, 1875205787, -217347657, -1949692753, -173491391, -1696870886, 1803320945, -1149664082, 2087662661, 999218393, -1917065755, -1274621662, 747481890, -1015652387, -142784790, 1597501515, -929766923, 1256963544, -442619473, -1487275402, -1204882790, -893407028, 1532362646, 551348895, -70509478, 188992459, -423754803, 667479255, 1700270578, 1062510498, -1090909622, -549745154, -429442060, 1109005310, 2078238969, -451681624, 887791755, -509830922, -2080639152, -1568075352, 51477171, 800173910, 2078682450, 1760057292, 1139470596, -667577013, -1288639117, -616068546, -1469017554, 1770752085, -442501072, -1484093219, 758549456, 1777825859, -289920061, 1963316155, -499771165, -2075205933, 1346082719, -877061426, 1503161239, 227765529, -434890405, -1825176165, 319672107, 1589755026, -137370547, 705693684, -719547015, -395057647, 1284714491, -1424022792, -278251696, -13168330, -2029287493, -1780503684, 258652734, 553515656, 1558931634, -999779879, 1306524958, -615916998, -1144961175, -1306437716, 1836116941, -1822247538, 1918195029, -1611136267, -1406626055, -148741416, -2088489021, -624341915, -1748266177, 631849652, 939629417, -1623325187, -1923696003, 661589119, 1961552514, 875996337, -600678777, -416488723, -1693281979, 1689388549, 117401493, 837710302, -63063526, -1390462207, -1174973327, 327298911, 661845375, -517051169, 2006142319, -156721323, 624390169, -287837284, -541577259, -2030194813, -1617981195, -604375592, 2057661159, -620765313, -1010117537, 898229607, 1441001957, 1449975166, 196878010, -1011880774, -86246421, 1325352136, 1284576713, -2094477793, -1308262550, 1033010901, 1461106911, -776337942, -614746892, 2046731642, 98104543, -216141168, -722022235, -310353983, 1973246931, -319152206, -1704829609, -1093036239, -1288420543, -1884407687, 452774580, 652491591, 844186980, -1503648071, 803588917, 1350170940, -1948065079, 1696780255, -845198149, 1850694526, 2050371186, -1276875360, -1871394018, -110143687, -1948259697, 1529082559, -170265384, 82213102, 1732170730, 2079464915, -1049252643, -915932327, 2123583393, -172326554, -367545997, -16838148, -1661878854, -775998984, -125131624, 1744242927, 144049720, 1915371999, -1273930567, -1954582456, 2075084617, 2094327729, 479001151, -366025333, -1846456970, -1684086730, -630156726, 1583345469, 379631522, 55293644, -1337753837, -1442910220, -24701837, 2113278294, 2007217023, -706167619, 1521257751, 603966138, 6652897, -384935151, -1447956257, -1641145620, -329941550, 1539024524, -1102139532, 1471348062, 2026219952, 2144259646, -196357003, -1878984772, 1322364221, -1950626950, -577427123, 1402870799, -696110833, 1655392588, -1597857320, -899429791, -762676122, 643986731, -876565478, -580589711, -1244229075, 629098113, -321790027, -1904476638, -961692050, -403509664, -805360004, -397716974, -936311684, -96995948, -556790533, 1490545630, -1560874016, -567058993, -1445161541, 1316257551, -1279036121, -1258988763, 1954328993, -1555468918, -521970451, -1336870828, 731357480, -1211796153, -738635210, -1127033013, -2065302068, 1182984042, -5486637, -677524834, 2062331273, 952201217, -1923189537, -1212304147, -1052821423, -1710787268, -1116251624, 1964502311, -1871043343, 1877916839, 44490158, 1138925044, 668112322, 449247781, -637701107, 231670721, -37630236, -983859194, -365795917, -1039154877, -325984406, -1346506054, -2051692899, 1592535548, 376671922, -1412171808, -1516995033, 197862524, 926510317, -1926428787, 2124594879, -1367642638, 1555655207, -670190667, 2043563295, -1022654611, -2036452139, -1122255973, -1322822145, -1443922844, 678063784, 2043673512, 339689021, -1463211288, 1024934806, 1096809686, 264037219, 2032573183, 640135637, -1612460330, -1608410325, -998949357, 1863928952, -493908092, -572381472, -1629729140, 357070065, -1406270337, 2079720553, -714319378, -1499196217, -1346598129, 1605728169, 794974954, -325477834, 773160775, 1551959303, -2112586667, -1198047620, 1303054926, -1709458642, 1549214294, 1342096122, 1672132286, -2093176994, -361564472, 838786237, -499467186, 1866326047, -1272380450, -1110325344, -774739565, -216465413, -1612145219, -336136001, -579692001, -136202244, -832341301, 438079162, 894921919, -3962666, 1727090578, 977950550, 292211399, -857622902, 1264752254, 1933191113, -1076265205, 536651629, 1946067527, 1706761703, 257259728, 256671468, 1329054401, 1222091279, 2039210399, -285278482, 2121064399, -173788105, -2014974025, -1647848129, -262871883, -622994412, -382923378, 1904113348, -281363865, -1086799755, -126994681, -1210270958, -1618580325, 1048569276, 1933930797, -1650999941, -135117537, 386692601, 1006458115, -89788694, 417560017, 1979506465, 1394498010, -1295267218, 1201216881, 1509383015, -466782613, 1838210727, 376757091, -1281843770, 1725577460, -210706529, 2141885726, 1058225625, -996574850, 2110088055, 1452492194, 630820251, -1511720027, 1052702194, 1333179822, -666916612, -554894612, -1383436436, 590862043, -120292941, -373321734, 1816606674, -2264263, 2005568123, -1648613381, 265196347, -453305326, -1927981057, -2055345743, 1612142989, -126240307, -518340561, 432988984, 428688766, 1509801879, 1787804666, 1936876525, -614668014, -1812126693, -549087957, -934177822, -12539542, -575487237, 1517725436, -778078829, -251924948, 493916484, -288122861, -1029824659, 251046322, -747013330, -265866715, 868697766, 1724648746, 190388586, 1380638251, -604087767, 709387079, 1809702745, -1757711911, -275213155, 1409677914, 1856731316, -1101106054, 836927756, -1548699945, -1822017064, 1027163391, 1705191446, 1100117696, -609094063, -1575790426, 1571120803, -477254248, 1052304044, -636047897, 1857268267, 1115905699, -1894544000, 1494353495, -289267243, 1572066683, -953583942, -809108121, 1356731833, 1283812194, 824179681, 1192235857, 286883500, 2077137664, -1129178069, -1671401208, 1499292382, -1255129560, 2070110294, -1237599067, -1925323563, -161227418, -1162583046, -445200005, 967638649, -1178448094, -359213341, 1858430642, -1969260172, 649637775, -1309453459, -593038794, 1302064884, -1224840579, 47902941, -1952335153, -2009468814, -1862285525, -1228361386, -774478184, 841570427, -797705168, 1169017511, -1112059974, -2104502287, -1187057610, -213926140, -2032207121, -1214837120, -1378705067, 1522393908, -1449045007, -1679937889, 2092392347, -1471111788, 1836883459, 99801570, 972383724, -89172694, -1373668118, -603996843, -596242677, 1246428101, -823601272, 186536232, -612524255, -27139281, 546308042, 202861411, -2057889875, -1348098884, -374655596, -1339101881, 1742021990, 1875205788, 911665589, -1253165780, -1148979778, -11356044, 1677104481, -1328201496, 1100234224, 2045727825, -327315321, -144838264, -124737593, -1212442447, 128764669, -1774718933, 2147383157, -458267361, -1455489155, -1687381591, 2052775719, 2144467167, -1049889159, -173290307, 1365799431, 751528054, 1479514621, 1278987117, -283976333, -9103782, 345424202, -1707356425, 1388960738, -256012901, -767194110, -882413153, -1485376568, 1689886379, 794982782, 1516659539, -1433959178, -1104362389, -182494047, 2127858917, 1414486093, -1835822804, 130530896, -1035552883, -1293198566, -1038030941, 1940848503, -1753477851, -302041675, -550151834, -1653214568, -1008877341, 711813758, -868645994, -542779709, 1546105234, 1552762922, -864709729, 1062424057, -68898601, -126032859, -1770470455, 369060282, -821800789, -1251510954, -541371769, -76552915, 1384936653, -95855761, -293481174, -293797983, -799250746, 1031027931, -1081072507, 1699333644, 224759454, 22974414, -1159162993, 619936044, 1368293749, 2141909689, -1549064665, 1097026060, 1649503227, 1315991334, 909062829, -551986752, 2131994853, 2035279278, -765999138, 2009655565, 614201327, 1690107654, -1277522860, -689534301, -158833335, -1339649342, 358880989, 972955865, -520034243, 1601551903, 1663527304, 121520328, 1459098335, -1158166003, -604270812, -2031385525, 1818934388, -1452678871, -187185954, -457272719, -1502154540, -517359212, 2125849937, 137849052, -1753339925, -1380082438, -156382982, 2003824660, -1223453102, -1921751705, -1732804314, -685290289, -1139114687, -479255174, -860228393, 112770861, -377681984, -76548753, 643451255, -103157942, -424985506, -1111514521, -364124146, -394962102, 1208942047, -1660923999, 1456180993, -444070851, 2020155769, -570672899, -678161643, 1509784491, -909175615, -1921288070, -916193418, -1803367488, -1692721030, -1790981721, 1835400649, -1256494609, -130108761, 2061823701, -1004565985, 395040551, -780232708, 1286006913, -556815598, -450244396, -396474301, 1794026750, -908106386, 1831072340, -263787521, -1074094466, 315993024, -965570506, 1160703835, -62565553, 1834513200, -419908235, -312772598, -309223147, -500844413, -691015598, 1419667464, -671890185, 777505061, -683671853, -524830064, -226002770, 1389726355, -1142589795, -363876143, 1673430558, -1615303469, 796770701, -1298947577, 47458363, 1347550188, 938033955, -487549154, -1850372495, -310569348, -185480474, -1106093940, -22403862, -1106598930, -1635885667, -1424134648, -183889875, 225881850, -1891286800, 1640185187, -989644196, 450735655, 1294283362, -87571059, -1478502598, 121920721, -84532245, 631069531, 2061920731, -706773895, -1475518241, 1871929422, -1363557453, -1292978593, -1624154503, -611396877, 1819424939, 1101967285, 1560045651, -714153082, -1837818705, 1352471131, 795740015, 418562691, 14462013, 1199876565, -977734096, 1176273147, -1485114994, -748381005, -1625537682, 1754080627, -518447581, -336282185, 1475460413, -486548643, -8751403, -1897056930, 780303076, 528043054, -1937911509, 1795230171, -622836802, 851965719, -1317329081, -671353870, 2048870522, 1463841247, 1479728002, -1862484007, -306897605, 628576175, -1135080891, 1806989434, 1507928176, 1418729319, 1884063673, 1049223542, 1609695290, -16518716, 2037216134, -1447431638, 1631477557, -264833165, -609914682, 911646254, 340312778, 1027469032, -355548955, 1316317282, -1378530833, 452263103, -2038897489, -158131547, -1535289783, -291649635, -1094857878, -2053804236, -1242523366, -1343313792, -261383797, 1291156476, 2004868160, 1978723338, -566116037, -1934097489, -415598754, -291564066, 1426371150, -462455603, -1693551776, -1217104637, 285351253, 1443747547, 1520565176, 642305327, 2088188543, 1931329300, 2105566131, 875259432, 878485403, -1622244662, -293791974, -1721317122, -1118973511, -1411260780, -188546502, 844619155, -1663207640, -1815157210, -592556038, 1697714778, -1168423986, 137549659, 1451748700, -1041806505, -1612801946, 283040892, -1941355715, 779971284, -18130278, 1596418273, -992215988, 822563930, -1075620762, 910608217, 1289843212, -1536271250, 660064217, -1138606931, 1482036158, -183676367, -1148791001, 1439976742, 362758052, -225556167, -1889960756, -718627271, -802145366, -833902758, 981485519, -1344314289, 1638805732, 704883445, 2042032069, -1006648610, 1688205285, -1888452553, -1832831595, -105669430, -811129426, 867663267, 638144511, -676545295, -1113888231, -1013997691, 1890065949, -1258561106, 1656430071, -592660803, 1001526479, -1342017365, 1451874169, 796038782, -807324014, -772777525, -1173668645, 985254138, 989396084, 1129160949, -1479493728, 1760222531, -306221092, -26962230, -442742617, 1860464685, -5301712, 1802763770, -1108891445, 2044459647, -1181660206, 239620831, -557087102, -1904387235, 896890611, 1112398877, 1810907332, -26048622, 1427902573, 1929903420, -541138771, -2005404544, 2047567359, 1876729777, 15990000, 1725097868, 772523036, 473184871, -2009224349, 465849816, 2104930275, 1035385619, 1298568780, -180421028, 1961603783, 1674577213, -1623979807, -216676611, -685900872, -581970270, -425820907, -367980232, -42730497, 1597880575, 539206586, -586332465, 1376880055, 1831518461, -621455423, 2018478692, 257996153, -1588224095, 279847001, 197173968, -313751011, -138974234, -112095639, -771908429, -159273154, 668535788, 1610332477, -172228181, -1526327113, -1954628951, -2009893755, -1420813009, 2048409108, 1581370982, 1813977045, -605429558, 1650686879, -1145140894, -229660212, -710960215, 760852942, -406741645, -488929030, 2098482879, 198623143, 1688711771, -835753285, -911019735, -1630669561, 468808064, -1554843750, -755415173, -676739358, -1755913320, -475970168, -124742617, 1957498085, -83917032, 19665486, -867213885, -1304433177, -1378059013, 1978907327, -696115614, 1021206418, -1209453894, -1778093266, -1621316709, 1734867850, 471438178, -100703818, 1856366221, -681766019, -1183095583, 500625337, -1253265601, -270534010, 342704368, -1603864885, 186887684, -978186182, -126635272, -879204518, -1510289450, -751574825, -190217800, 1828351449, -241128965, 310817840, -1889004995, -1703505837, 1958493949, -1359227178, -1474209478, -940069105, -2019046171, 1928940662, 1204606974, -1454002922, 25039871, 2034233119, -1393637850, -689892969, -1438232358, -1347300492, -1612310428, -1388320759, -694568910, -940662315, 1109648829, -1982258071, -285886500, 1921449804, -1909543699, 2039028556, -427696614, -1573962052, -1870793101, -1953288075, 1805860188, -1255306883, 2063851062, -512058898, 1064632113, 1316771183, -1290610248, 68557291, 510838520, 367204789, 536465783, -492866904, 1062323290, 1304498031, 1967116952, 1828542910, 2007431166, -33749457, -220168179, -602292804, 348802927, 384117738, -49975400, -1419913123, 1791974534, -1399787017, 445439405, -90575020, -843781951, -384184343, -1683513407, 1609201995, -49039107, 182793590, 193361711, -92617186, 112590177, 1663460190, 1908893511, 1943671194, 795111162, -29358891, 1319806841, -1579229467, 469504634, 2128953075, -516166807, -463947934, 1295305577, -23631141, 406159255, 1036647035, 1057389467, 1769448878, 1724598002, -304297114, -922880007, -1842701057, 1324675014, -365082281, -1132171969, -1747177114, 1134638847, 2054276186, -25698536, -6001689, 430301604, 732200583, 1638065941, 1551028847, 1473118087, 2029690520, 339312235, 1486061446, 986526556, 1898864039, 311741160, 926340261, -1748346778, 501105270, -185212264, -2042622243, -1366437778, 808548693, -42266705, -550839053, -1118923041, 772455258, 333695528, 2085735071, -1348627206, 123140966, -1588355164, -958745246, 1339698061, -555063097, 1383490965, 1964243164, 734734789, 1973884886, 802423034, -969614287, 828071980, -1241813017, -150149812, -1244928866, -1087113341, 866020374, -821102358, -456583069, 633253465, 1325362793, -1159738261, 1546701365, 588142463, -2060897846, 2111372272, -1746137187, -2107362820, -716018899, 1058532206, 694319759, -569985398, 775809078, 1371995377, -882635777, 302626279, 1601257407, -1122400971, 1637382136, -786923178, -1623121281, 1877300109, -1382860874, 121174482, -1140401426, -2010382475, -1874161718, -1402288663, 304993275, 1836130111, -869943592, -1423120854, -949552727, 68721689, -872462400, 1002615139, -1422967165, -79765458, 1972914381, -1619533507, 1988250895, -308490899, -1149733233, -1612918529, 1498341266, 1610491688, -628202468, -146112625, -114018014, 942855731, -556556751, 2096061924, -1414192774, -977430433, 1476241694, 25643985, -1287799751, -1832797344, -1491395701, 422127217, -1354713157, 519637529, -493501761, -37112989, -1112773346, 1341249371, -1889442109, 1615953518, 944955393, 1878841171, 1455942893, -2101766213, 1427043833, 1574672241, 169978238, 849898356, 2111764444, -834366606, -261829209, -1037253768, 783055617, 1741527434, 479691886, -1990869099, -458460382, 1441466528, 1990247904, 398427943, -1189130767, -609314464, 1680827196, -85753978, 1815586265, -1992451272, -672055571, -116175392, -116467045, 2122491613, 810820283, 994863056, -814780443, -1535504633, -953484466, -624347848, 1958594063, 1304397527, 2069002134, -936636562, 2029050883, 809133535, -1981274247, -758333474, 1023582131, 1542063026, -359878979, 1713607325, -1830362634, -78009763, 2054622720, -979656285, -969123316, -944679466, 405777311, 1587430121, 2043340802, -864248624, 245409019, -755776658, -1339347239, -1349308512, 703077051, 1727112873, -977909599, 937358734, -985302351, 324106074, -581369695, 31314851, -1015537760, 1890221206, -1089953038, 1708785875, -1669463941, -1016211618, -1637968431, 754597746, -1120654088, -1556417057, -1512039538, -703707345, -360928892, 1484201217, 951540832, 391156727, 104827829, -1361146026, 604789013, -1348642505, -103671401, -273245967, -1013898594, -67638125, 2130567822, 2121738987, -120917305, -969707527, -1424212637, -548284409, -1253581525, -1979759218, 26516969, 192660515, -892448310, 1835351977, 275673380, 307108836, -1536445686, -1931832034, -730963329, -1360848275, 1021140613, 2084150984, -1575919201, -20342637, -728469417, -70779903, -167929524, 1062507113, -193721899, 1542056571, -1302788553, -884730717, -1880475654, -593632455, 1998319351, -753776334, -412718913, -1213833289, -1390778502, 2099278764, -1881343501, -2042461809, -793543825, 1317689553, -1724115599, -235623074, 368741017, 1985516532, 2041846709, 625809854, -273716605, -1617500515, -740420354, -951184557, -775009547, -2026731472, 2045457857, 1212225297, 713457581, -1745282877, 395078491, -253414534, 113786126, -49580604, -525165585, -1134303843, 756539380, -1286696698, 1867635340, -42197916, -1288266775, -1096231820, 1121214981, 636377034, 1398912503, 1035276182, 714045347, -1683490882, 1911429390, -1455561109, -1375885126, 1524647684, -1752954129, -1488898085, -17471141, 1117093336, -1174191717, 1590324986, -149709162, 331284910, -1375457826, 2118818686, 1209694306, -1565484038, 781951328, 1475328071, -470360126, 1326562778, -1108539911, -845176625, -68740732, -1912796953, -301623, -1180985632, -641014531, -1513503156, 1357235605, 1128431974, 425120236, -240135607, -391694989, 602671479, 1110550738, -1153777527, 1497141676, -35467115, -218220269, -303450161, -1746734915, -142969097, 968135021, -1043747083, 1580119778, -1650269576, -347629683, -648207717, 1325293125, -194927057, 315724954, -542852489, 805866410, -1355816328, 772663770, 1818817665, 1721086786, -1150499030, 1714675612, -516255247, -1734394392, -598028873, -1460309141, -517891308, 2125911240, -1725470470, -1468361793, -322716797, -421308336, 40812143, 609251765, 1056254439, -446108471, -251793102, -758867820, 1607395005, 828786949, 1708584116, -1764580557, -636693762, -2124340852, -1457722441, -120168345, -820384579, 1206016771, -187789761, 956774635, -1991640322, -1887760123, 1608941251, -1247136820, 1295153663, -503123023, -348169222, -147164498, -2135476091, 1761842271, 827564764, -926553357, -1665992497, -1294798981, -2064719227, -373001930, 91757663, 752953547, -105261619, -1779285457, -590312006, 1472331383, 2093727170, 1776453404, -1382438240, -848721681, -1326388374, -1087472741, 25629954, -44682776, -831097045, -1649092732, 1572296393, 1688275716, 1296952300, 322106763, -980759254, 883207133, -1683510551, -176254143, 216643315, 2078283838, -562385240, -2038027704, -516072699, -1065908217, 1858554798, 2069886438, 1396407215, 48037727, 2067280891, -186199182, -923173932, -230609161, -1744838570, 1452598595, -1352418013, 395688101, -1376280805, -710074179, 1188058705, -555619746, -1922884737, 918267168, -1782224152, -1483948103, -1665714461, -1745970505, -1225659563, -1119585093, -609354190, -40609468, -570614050, 1798287228, -1021664856, 1121506403, 832967421, 1221158351, -1970862129, 1296962926, 1710506989, 955557988, 1325901229, 995425197, -1112657542, -1245286918, 1668634549, -978388414, 103192069, 238819769, -1048343524, 1963740634, 2147098299, -2040393829, 1403667547, -160932563, -86714541, 1846473445, -1258296523, -1661613369, -1084259490, 379735023, -1568242886, -568868509, -781639742, -503793859, 1738252294, 1824641309, 1459198859, -1619368144, 266944809, -1411393145, 1372463242, -594121893, 1178823844, 188605232, -9348394, 58473597, -169556600, -1074736137, -290734637, -1238320654, -471711795, -126908984, -1743603506, -829577540, 1603190956, -1130438919, -1303414805, -1041395910, 1674565361, -180945949, 1766040344, 847140288, -1730912668, 1923720151, -1615734131, -777134154, 599122567, 1732698183, 1394541567, 1788317836, -906959373, -833228401, -1237022770, -538776699, -618810015, 350493751, 745303308, -2021923840, -890344725, -1998114368, 905264195, -1322493112, 488052924, -289375905, -273720634, 877915430, 484272177, 999887712, -630087134, -89057862, -283065115, -71845355, -1784985148, 2060432984, 804462683, -185391296, 2126459086, -1061749609, -1434737349, -853371056, -1210368841, -1649813901, -1234702305, 1624712699, -850064675, 1004078050, -1296829700, -188211966, 1003719331, 640493210, 1517442943, 2058532095, -22471925, 2088368630, -1477632749, 2092494531, -458682578, -1266856010, -339174560, -76817113, -426542163, -818964835, -98602626, 143761612, 187787489, -1030489301, -210637412, -2006055111, -1614972163, 1596877511, 1979707559, 1281284734, 1648515739, -119709763, 348519935, -682370262, -1781342441, -1193563690, -136531038, 1754231749, -38869054, -450965072, -295231483, 1590456059, 1461474526, 1092018073, -511800582, -1248500895, 935157470, 701742404, -640992896, -1476748085, 1711688433, -135205921, 127280756, -1208881369, 373670379, 776088154, -767149558, -1173634500, 1833098949, -184044695, 1982711468, 1479962967, -1798239259, -1388592745, -260238235, -18744851, -362242279, -44333365, -1548969100, -1963795020, -1322757754, 586893487, 775334424, -84132522, 1959667369, 1109482964, -1697149368, -1768004554, -876970883, 1264265127, -905999637, -1713775164, -1882887342, 1273722710, -217992328, -46167609, -770726833, -2011898882, -85045590, -1706791758, 769651812, -705454082, 947702344, -15862063, -956697363, 1006811644, -16837654, 1668785503, -785300139, 607907351, 1411785961, 1095685885, -898631944, 1699589709, -784599819, 419287613, 537467777, 1957352795, -74338829, -1644630487, -2089241466, -2140826249, -144900530, -802597748, -873713514, -165024391, -927427812, 915020007, -975313558, -1420010444, -112056695, -484642122, 1056892234, 1113687965, -1780471826, 64363, -988204899, -496638473, -1285299389, 34636098, 786817742, 229121589, -218904067, 403096047, -1107532114, -1341346695, -790856136, 542902171, 1741930441, -2033689696, 245287395, 1098205730, -1163156962, 103814015, 1401924781, -1747419038, 1807906291, 514517579, 1018533462, -892748133, 116973621, 1469575342, -1945806657, 1244918645, -1732224198, 1714019881, -831654619, 703758167, -1497120519, 158099385, -2039205848, -1308636848, -486581845, 1761774760, -643965397, -602084423, 165867247, -1154909955, -1812392276, -1596472576, 1894739631, 1112403237, 89397990, 1530044207, -2073904474, -976491849, 831415179, -314520411, -1853871038, 1598508743, -1390154327, -1759369327, 1962785328, -1436626062, 879539913, -983001118, -1569017384, -1614340946, 192435378, -616349799, 1871231142, -201923580, -1075841949, 1046442821, -1341371671, 1718845213, -1839914004, -1297770666, -2118158052, -1936470834, -1496421623, 1609372472, 911649930, -1457742518, -77136782, -1518392994, -170319653, -1855149202, -2080936431, 984198426, -1893139282, 1896600326, 840078962, -471913500, -369232705, 267509662, 1439042775, 1875792244, -979110278, 1271591750, 1099790494, -1255757314, 165278589, -102460269, -1644434455, -1908575814, 486814766, 1076038909, 968820287, 1432031828, 1940508334, 1910847801, -616942172, 988249182, -2086029112, -705780359, 1139648055, 1803013077, -253214115, 792695253, 1567173350, -318130751, 1975693300, -983669471, -235689232, 1557171233, -1146194679, 2046746801, 2043973863, -2060401278, -1311808060, 1684966597, -975963441, -1037391332, 307288503, -1777846802, 1291545987, -290197936, -478168225, -2078479377, 23186296, 316875967, 1805714782, 845917455, -953792781, 1512376811, 426436831, -540722177, 442353087, 59492803, 10838248, 2077253, 931963759, 191052477, 564119236, 273814380, -1030917138, 768280425, -713962920, 2137763181, -1323055047, -1646475993, 357429160, 795297613, -439377761, -412205405, -102190947, -1831376898, -844562708, -700194772, -1543818265, -106273041, -1043056002, -1298534043, 1517799805, -115757735, -944357843, -1270891097, -737792165, 1785470740, -1352767534, -1058619637, -1711683548, 1377336217, -1731840676, -1617141638, -499709466, -1953581897, -1352207595, -1318849737, 788257785, -31497571, -1636863118, 1850824636, -1335199782, -1801165026, -350709510, -774972601, -1176130409, -313007, 1249594391, -1627395901, 2099194320, -168385654, 1432455363, 934876599, 1906078635, 1021681342, -141695937, 1005243418, -1984320687, 2011681151, -1247213358, -87909678, 2078216623, -452949501, -250548915, -1830945059, -211906641, 901205599, 263881476, -1883720516, 872409468, 708258764, 321552059, -1729478982, -1196030215, -562393225, -693830670, -1157976157, 275163794, 1842838800, -1380899044, 2134352447, -1332618500, 1949333687, -2058564909, -1691451926, -865105943, 815590624, 2077336187, -228225119, -568311254, 17007173, 1981211603, 1109601254, 904132838, -1529290963, -1110718675, 1452984637, -753271084, -252051917, 249749173, 1078598118, 857529502, -2030341067, -929541898, 607089299, 1269449201, -746547758, 2116571677, -1122222332, -1376219399, -212809267, -1189281817, 1769799903, -602523542, 992543580, -133457410, 298567284, 1871172924, 1953422016, 1195582918, -87431177, 701189899, 1319761868, -538559782, -81842386, -149725789, -348289505, 510885394, 710235950, 213855702, -366974510, -2076393986, 1597607685, -1783874861, -56750596, -671717929, 961443935, -969647336, 1169514060, 196703468, -1872794926, -846413840, -408442390, -621330975, 699059407, 1278913179, -302798259, 786098295, 1817118340, 692839313, -182904557, 2034094648, 800334222, 1646090226, 1651103466, -1940064305, 1808532555, 49421232, -1678790639, 1050241469, -1578022436, 1249626553, -1770624186, -1896158797, -792641855, -682654757, 1978301653, 1064978939, -1684574969, -780903406, 729717713, 1148432757, -778503443, -969175601, -1522819777, -419369299, 1328415958, 1964098911, -73285070, -430603170, -1340700546, -1790059686, 1143352949, 267414252, -1267370846, -1118006356, 993207998, -622928211, 998458745, 1219107060, 1743514320, -994064002, 1527061303, -213188764, -1914241990, 1291051897, 2121163751, 2111101683, 2147079999, -1176634131, -796308381, -793590819, 1853453853, 1049597910, -1838315951, -759234587, 1961344221, 2101194960, -1781752451, -1550525190, 933061992, -396382463, -1581941668, 968181250, 1528437846, 1830551365, -166928555, -632323494, -1936704532, 2081763859, -730476013, -415822941, -183607365, -776262250, 512540492, -1573720838, 1604458682, 1964694499, -1393931916, 603398105, -373461928, 2005657054, -2082711282, 2012740803, -1292128451, -1584381435, -1579297306, -565914666, 235785952, 2079127642, 1364948359, 902214770, 835234798, -39938275, -1582889027, -570663461, -1076313844, -1565815915, -1103138980, -2122259063, -24764008, 636207460, 1306723070, 1291648332, 1289960287, 1536118459, 1000537965, -685007363, 2138985220, 934673734, -330050415, -534195407, 256298591, 278329187, -288766030, 41938168, -1701321543, 1415035045, -1129489703, -923891377, 862839333, 304902526, -118347461, 1771831730, 386849968, -675762689, -1280296103, 1144672355, -1803651816, -1590271854, 1514561836, 1035955962, -986130909, -1055044028, -1599477118, -1443798156, 438084445, 565959456, 1534590496, -1115870856, 1804120050, -1991397535, 484147760, 1450599261, 1432938788, -1181156150, 586761067, -1764939078, -763773084, 830085960, 1096956197, 709223127, 879612920, -780227878, -190105450, 2057550867, 2009966459, -1885059180, 80953843, -664826990, -268694437, 1157303020, -1685604567, -713175030, -676405018, 1413949366, 1835858928, 2074028860, 356095503, -1295881729, -356690000, -814694179, -510443409, -1095130134, -1241766105, 988464614, -405022517, -802232201, -178043337, -185078315, -67260806, 501741459, 1067879329, -409840012, -231878769, -2074896390, -1027447865, -1671993506, -1238316379, -570989715, 1621387515, -728357603, 2110682971, -1035272485, -982688270, -738809295, -909939933, -17322506, 438827920, 991419778, 1198343670, -846484554, -213009326, 1777421797, -1115832261, 2116528952, 2106193739, 570327415, -816366830, -687147473, -1623250094, -21334796, 2008656639, -655001850, -283109949, -1629880143, -950186408, 299803487, -886682149, 1975890671, -1730731024, -170426536, -474315727, 1706340498, -35060989, -1733376375, 1855704674, -1627140101, 1314433889, 848972700, -817388353, -2098827849, 390172900, -718864675, 49197306, 441813407, -294071350, -436101800, 1182710865, 1744912356, -78291771, -947101810, -2117829441, 980337097, -790852628, -1483409841, 1388625867, -694751997, 182768798, -314637003, 2021561823, -1460445277, 1886388092, 2029117028, -1980788311, -146057921, 288987999, 914593762, 1908081106, -1271664811, 1582101847, 342301390, 2040385468, 637193662, -1351154285, 1047440255, -644165425, -1959276591, 1031765435, -855679138, 1237574247, 156225473, -1922344521, -1632148636, -680070637, -1354009692, -1274252439, 1554214801, -1679845064, 983880037, 1965295305, -854911541, 732119417, -69716894, -1061470563, -1805251288, -1866612363, -1275193360, 1655205426, -1081248486, -1479144827, 307263817, -1613054569, -2065833612, -912881114, -1351109900, 1805014672, 1409244282, -246026312, 1263327979, -1599964316, -1634832666, 1004400728, 757717855, -1953382660, 645201686, 1040107501, -226886751, -243553091, -442429735, -260716445, -336296512, -1406695910, 606059902, 668819416, 563602288, 1059627987, -745856450, -892418259, -1230562583, -846859980, -2067026464, 936204725, -1554387108, -1733810589, -751456329, -1485211935, 1470733636, 531639030, 196864089, -139285253, 368975294, -198549591, -400829742, 276347477, -1955382600, 551615908, 835883492, -829767545, 241883898, 1307704676, -492167638, -1864512881, 615738399, -346718425, 1282597658, 1512030198, 699932127, -568342277, 819371503, -685938832, 1834214463, 1914628807, 1576986546, -746782368, -617472900, -1241993128, 1703400661, 1510971675, -1578210442, 334988020, 585329004, 1164145766, -1427544073, -1569448599, -605749958, -1050874480, 229349284, -213888745, -1695466096, -10230816, 1454467281, 1051314366, 1475212195, 799941341, -313262247, 603281731, 1396193094, -1851397440, -1980816364, 1317289900, 952218142, -68157951, 1400309487, 1626072693, -92021959, -840340995, 1056204959, 1717680979, 842865235, 2117555113, -1847824551, 164405031, -581885655, 1964617683, -840678477, -1229396876, 2041942037, 456088207, 94668985, 129149539, -1368022621, -1613264522, 1874481645, -40714533, -1762367473, 312632834, 916195201, -490669888, -304685475, 359910150, -6142161, -97719356, -1948817124, -554430753, 839630803, 1986091277, -1896600361, -947606027, 909609116, 1645595700, -2058438370, -656091963, 716557529, -1482380121, 262020861, 1042012726, -536969617, -1662520559, 645733170, -497025899, 1602699344, -756957448, -1290491574, -1558186053, 1797717489, 1316224542, -1724660883, -106961877, 370755357, 2083435643, -315648011, 1834840252, -1914471545, -146627409, 1250241882, 1337557840, -21772361, 1651422916, 611167556, -841830677, -1120156211, 1044307711, -780620620, 150983558, -411098124, -1679886625, -644594807, -712753894, -1157567201, -84375542, -1452786180, 1030121135, -998998182, 1447720911, 1331166574, 1882091623, -32788607, 314050495, 2077954901, -1175291675, -570770959, 393066658, 646665674, 1953429192, -421830653, 1238301733, 946986492, -1940144317, 2116708839, 175866693, 102701313, 1711195860, 234327898, 636746795, -663761055, -265117728, -356726698, 2082630319, -136587567, 999022414, 2062917161, 2100427321, 964540700, -145738306, -771887327, 773026033, 1232443664, -607529587, 67993375, 912551226, -440099400, 1852675119, 172617806, -1082476573, 2063516709, -818096323, -1912352095, -1418508617, -1230067723, -1561355926, 91224673, 2044449608, -506332229, 1944419737, -828290689, -847649308, -1387592381, -66126110, -437140074, -1085181412, 928494657, -279843096, -1322795355, 1415406530, 1306651956, 552891095, -597553573, -952184976, 870039148, 1259901591, -42037524, 1059192047, -1111093546, 1618684988, -76155182, -2038525375, 922999411, -287089725, -237728091, 407891908, -1345237751, -2022354602, 1594471419, 619294632, 2098196593, -558709148, 1808130013, -101318701, 1711113839, -18716441, 968623979, 1329749905, 2032094033, -410931785, -1421206423, 506711663, 1390946185, -692238041, 1325617402, -32913405, 1590179995, -33679370, 2002472586, -1893754931, 1714150375, 668297439, -823539668, -1278331118, -226376799, -1699852415, -870069943, -1708313660, 622784255, -192417805, 2046819421, -501036873, 1103355486, 2113983562, 1945010191, -1575502824, 2142433795, -330179870, -1603946781, -274488484, -1453374663, 476688363, 1590128420, 1350457481, -638866182, -793395777, 1093215451, 2119021227, 1455513180, 851106429, -1473115408, -1923829401, -1118881788, -1428621666, 919239283, 421788762, -734007813, -1063542840, -299644539, -1932628961, 969128811, -160115164, 1494163074, 956121726, -587537442, -539642025, 2118073949, 1151005139, 1960705961, -662042180, 643854216, 2083389054, -1294443539, -1220168803, 1488245362, -1461172812, 165768600, -2031420259, -2036585888, 887952332, -1494568773, 174284747, -965650958, -212417904, 997310637, 2093707889, -426458178, -1275730635, -145756322, -917998617, 149796276, -1370939771, -121978964, -1380510155, 608299513, 625971246, -218132263, -267340266, 1984881382, -1038410154, 1641084024, -1960973127, 1411716490, -1051753090, 889215787, -714807404, 1531329582, -1545743916, 1899449456, -582062308, -2090871634, -666728638, -714287562, -1161373139, 694906589, -1946668118, -1211588752, -1258613173, -1016166670, -412848796, -1352507434, -1419953928, 1735362381, -1826588677, -1397499148, -1217016430, 271313132, 1907834811, 1212560276, -566266182, -715764297, 992416302, -811215302, 1469192534, -1020453681, -1381339388, 1934840479, 2066733350, -1313608792, 214605947, -1519483588, 235025526, -1233580641, -131753033, 1332971693, 772763669, 888998592, -312281429, -1019189841, -1717073353, -1380398654, -1707952515, -1697665433, -849421943, -90850166, -196267361, -182337938, -1710339468, 913063101, 845889155, -1734904434, -537729617, 1557926051, 1421236311, -1964314509, 1448962708, -1441716781, -982384691, -1150934226, 1281220101, 125267758, 1197054438, -1323636892, -1481198093, -1602410109, 1777660071, -107106095, -946701101, 1364739154, 2143956978, -441004432, -988547019, -938534109, 1138470950, 862086815, 975263197, 183381623, 578413460, -335712961, 816382307, 175721772, 2010726815, -1101320057, -1692032759, -1081804662, -1804666444, -537136093, 454391280, -5592485, -1846730343, 1006005969, -321105135, -175216962, 921879721, -102937687, 1295833022, -233322150, 1829715068, 1384636680, 621674469, -695900982, -1124112217, 360500074, -1288016467, 767708770, 424109081, 2019550929, 1987939305, -1138869139, 189496378, 1885111842, 990160255, 1106214895, -886661926, -1490120724, -550924776, -1057008945, -1761739179, 1742557450, -2051193921, -83513957, -256553528, 403470296, -281216430, -228299518, -188568612, 609794783, -1601516436, -664068358, -2122842728, -1527242628, -1686075711, 483046582, 996996974, -541899088, -2080160321, -1000702492, 87777018, 2135662200, -1594157999, 972928620, -1033400743, -537838197, 2049789357, 665316051, -1465638957, -1284431514, 1886518139, -25435009, 1652464086, 1979637987, 1292678701, -204472539, -2105369510, -904238643, 937347368, 1536809846, 2048781790, 718572866, 1318276519, 1700353654, 1390749157, -1626161506, -508740929, -335714104, 1854421546, 2128469727, -1673220369, -1877893690, 848965492, -553569686, 1297477208, 1220452301, -1540608181, 1143059299, -2054062196, 325056039, -1735296609, -343946472, 1191198372, -1713196306, 1007363760, -1630763800, 938296697, -254368239, 978939145, 897173607, -33657872, 553344761, -1615440226, -1098040067, 215568220, 1828833892, -1172152277, -551781660, 75104161, -1103270906, -1280772465, -1041557281, 1831299245, 1320415855, -19571505, -428586162, -450126832, 263037887, -873758113, -347875224, -307820324, -50631463, -968607002, -1623356243, 1493348824, 1023340854, -761528742, -411079140, 1620466605, -780344907, -558707271, 103642044, -1395247241, -1497906323, -219428548, 1616568505, 536032082, -334726271, 624062160, -55078257, 490890173, -953710481, -1088983428, 2035433935, -1203064803, -106434566, 1381661440, 2069765492, -50206785, 1617649622, 586300918, -2114820142, 648094164, -442554370, 2129271861, 1615510397, 738824801, 1735058517, 1224342340, 937229061, -67114933, -1916182647, -1830387826, 1872576267, -299597425, -1791431913, -337557532, 820524317, -600918141, -1367923025, 1637418941, -1120969066, 1689220644, -549659848, -1219132866, 720632974, 2096085441, 1370837730, 1637583737, 30309290, 1182786335, -1417241182, -821914509, -314764388, -873044086, -769165743, -1217979373, -649144321, -1190267761, -249561927, -712263101, -493944008, -630667088, -590711340, -64483633, 327347433, -701272977, 392343413, 740469876, 1476224178, -1512187475, -57721686, -955948133, 302239671, -461706266, 1306499549, -971524323, -1667039938, -1073614857, 67378580, 1262989605, -1617965322, -976259624, -1150012048, 163756159, 1430953128, -1233143682, -1674373766, -2140186215, 121295284, 1619419592, 1576217323, -1460449697, 651073405, -172130307, 640066936, 1882676199, 52600317, 1271606079, -1295100972, -1333969718, -1420527691, -1631707274, -2089727018, -948611969, -1123856735, 235814658, -998293934, 1033770219, -102976772, 1824094198, 1181702411, -166539702, -747772519, -1959526831, 1011681633, 1671407700, 1480449225, -1166216582, -417729821, 2103258813, 1734892405, 1807289428, -146584303, 90175992, -183421250, -1346582599, -2033095087, -50551589, 2020642756, 2146948793, 918144919, -583974403, -84493706, 750432767, 1993871833, -509715590, -456414313, -17370999, -1731815163, -104554268, -206472253, 1591202350, -822125970, 255196882, 1369112302, 1413599733, -299140606, -1193893961, -297545293, -468163141, 763153625, 138408330, -1438720163, 1914317176, 532379228, -500859475, 780022520, -1644455780, -772539962, 402431748, -1540262467, 889747717, 68712191, -640679952, 798154083, -793025045, 865473482, -1418630156, -1124040844, -331389712, -192185666, 417457572, 114866482, 1547621133, -1838369459, -874281328, -919304105, -888516665, 988596894, 1906719721, 1665993877, -954352913, -401256737, -178085502, -1770223592, -1097600291, 1993240015, 637395194, 871881415, -828769964, -1719613469, 480786327, -2048983449, 2142441121, -760647833, 886046420, -1766904934, 1354923119, -271586145, 1073070156, 1669064252, -803819855, -119082287, -1302876854, -2002161640, 175448861, -319887009, 913184601, -258715459, 2032374684, -315591330, -665716949, 961002563, -1660760271, 509355739, 1207681793, -1490533873, 539774367, 383248766, -640088728, -1660374007, -1952235923, 1684463151, -1181333496, 1178250921, -263363339, -1767973459, -1108520777, -958487648, -1149927429, 1600829919, 1494563609, -1923730252, -844830875, 27745477, -367571057, -545040469, 1534210247, 1841265473, -1201061375, -841697396, 312836047, -1702142298, -1939129363, -1250578790, -848044992, 1101295641, -605066366, 345845559, -1221197062, -172597737, 783018991, -1151548460, 994866866, 631718002, -137937843, 1827382803, -11111714, -1370268836, 1572861135, 2053030460, -1040352265, -1873506009, -1210114207, 1196635230, -1381434244, -704001201, 690210630, 728398827, -747709387, 1626224313, 758620266, -753025410, -736372611, 1924625206, -1367841366, 1701981937, 349920040, -1413492820, -1711172356, 1164149879, -1442895508, 512214438, 1331810578, -986226241, 2001844022, -1529742291, -1143501622, 1544498015, 1867095623, 962310465, -85989482, 412917714, -493742282, -1892964392, 399255429, -403978917, -59774772, -1143250046, -1933608, 1023659213, -1705085273, 1002928369, -1997015136, -136506469, 146680943, -471152135, 1147393729, -1194007477, 982278030, -647969080, -1155164437, 968232287, 374743293, -57251894, -909682107, -604924881, -201747870, -543095866, 1690032515, 306941405, -1499812448, -1129021520, 81112096, -1717065409, 1721651474, -505333393, 935674291, -875568222, 1473912865, 1150423011, -1402475409, 215074701, 2006570562, 1563594372, -408386090, -134894055, -959689256, -1303005214, -1358873324, 1404057990, 1547220005, -788262029, -947851539, 2076842440, -937672492, -302205192, -1417956966, 1225649276, -1987379410, -171726280, -936015457, 1385559920, -1952641646, 1067442772, -747671398, 1782898556, 235449310, -1165363694, -1208066477, -1712130246, 2120374156, -36176655, -239702343, -372585849, -1538112784, 854287883, 442069924, 1732909586, -1114321669, 1219211871, -1284838274, 726127419, 451915138, -1340507986, 1607500844, -2053460908, 1125002445, -1841742543, 401065395, 1491071425, 1919648491, -321868537, 2098920161, 1536097935, -1211474420, 720696785, -1155724463, -924192880, -1222873559, 1775667555, -688405030, -372860427, 385060190, -1149581459, 1188540926, -47760854, -34900843, -286896817, 1980480404, 1340595914, 1085901239, -835127874, -302952258, 1485616740, 1203983079, -485809346, 1065347378, -1908029910, -1361405339, 702167117, -740850342, -1988213678, 1122220407, -133457802, -986001769, -595652902, 1379276444, 2146536423, 2136834121, -1883844630, 20151731, -544687604, -1701735041, 1697971501, 1595735961, -1158720587, 212847817, 1619846241, 632396700, -2022040631, -448981533, -1818030992, 764436022, 1874823551, 718899945, 300952263, -1686445193, -1058938467, -1335965890, -687103719, 1160012231, 1220364752, 1855469539, -60567723, -858424197, -856170399, 1354579058, 1836517900, -550195569, -976102533, -338681762, 1637626716, -341095763, -604123196, 22998407, 566172390, 635927679, 141358709, -951392964, -2060453193, -20875357, -487833053, 818178201, -215098464, 1269572405, -1448496348, -625254210, 1845393377, 696601692, 1019181364, -597297825, 1674563850, -1234050343, 773923698, -1495446315, -2064009809, 1033603965, 210668095, -1160354961, -578382701, -1704648608, 889646918, -679161209, 2028915907, 1281263080, -47615336, 1061654940, 1301621031, -1565299751, -2009418146, 1827142901, -19297169, -1980060397, 1128391412, 2128866217, -96372468, 250700182, -1940936135, 496586875, 265088284, -940802521, 125403615, -53089202, -116848673, -1952866903, -968231080, -264097795, 2116771742, 1446752432, 1792116463, 1047879822, -1043084315, 1051802526, 399844729, -411550490, -99750034, 1347842046, 912083795, 1012337270, -698387718, -585614579, -474855813, -1192623987, 698930257, -1967695438, -2113144335, 45055847, -1725674121, -1897596711, -600118751, -1680738351, 1054322229, -335821730, -1932616992, -2116325620, -1257048961, -142763731, -1182167442, 1877961577, 1226460597, -1120495992, 926990043, 1819099108, 400056773, -858236442, 326620111, 245347295, -1124892226, -1130902677, -183913435, -1683548770, -1368737302, 1741244794, -809093273, 1433041355, -214454906, 436523739, 606951231, -147519489, 1359328421, -1047557673, -935469297, -381827655, 1135689317, -11722981, 1050345403, -244741798, 921742976, -481715215, 1065554517, 1235302360, -164346131, -488599688, -959470793, 2004023891, 788319478, 1967515583, 868911949, -1540409650, -1228414591, 108109395, 1271031643, 1892475366, -1890426922, -2082563644, 2131816120, 2051665841, -1396194977, -54483863, -1177431618, -1283128617, -632457454, 54106588, -1658159705, -1958760560, -928028994, 1202243523, -830771053, 1270994729, -277906284, 1428114565, 874171750, -1659316774, 836607946, 2104473046, 1829555374, 32046644, -244007592, 1584544989, 1404791894, 1877911879, -59759091, 1480510298, -264282390, -949663605, -1353473381, -1455229079, 208995898, -571108406, -1489854557, -287657360, -1206669709, 1903204989, -407532366, 1334196391, 399426494, -963395905, 1677092269, -1964037506, 729153165, -571568211, 525436270, 871356265, -146787102, -295044057, -957373050, -1755443290, -132269745, 630281659, -1332101406, 1652915269, 2137478652, -2032601116, -444241721, 1293909615, -220460486, -1834392219, 1682596396, -439728572, -258533024, -300512044, -167527361, 1592024960, -1223497988, -1418804332, 912300505, 1625891400, -1186075762, -867570074, -1317882373, 1607890000, 1681243226, 558472642, 598867317, -1069389887, -691079813, 2112433755, -1113806847, 1463399117, -1694029308, 358660126, 1883154923, -839009421, -1182884701, 781679716, 292614905, 235512311, 1134789989, -1720647182, -1485685273, 1596776311, -1352098820, 783050474, 706862658, -1635409153, -461831937, 345653109, 1844097096, -508191752, -1399591522, -1342910053, -507405418, -1094496506, -25355097, 1631891452, -1508407551, 887028128, 1879805358, -1253960115, -1252513038, -890682466, -1698174835, 547053109, -1282231839, 826712408, -676279466, 642717859, -1053145697, -1188202140, -270205699, 1746838957, -1146286931, -983653786, 427214404, 2011757433, -302090343, -2060754123, -1888092814, 620058222, -1093058563, -1959703969, -612645731, 121724693, -396297240, 1878025896, 644737657, -276112410, -1381371907, -688443761, 2104999807, -788955445, -962115970, 1247397563, 1987952812, 1298035298, 1340506614, -1833084673, 1111529186, -1919663472, 1266816177, -319132774, -696340259, 1767502552, -165576724, 1862349494, 1851402926, -1742375143, 1431702087, 1047027551, 488007387, -335692952, 1292945390, -368937503, -621946024, 1802024637, -426939033, -1244973318, -396796404, -1918131389, -1856751686, 1433191929, 983522023, 1008848819, 1175154560, -1277981475, -1279066694, -580505559, -1242194562, -661908551, -1795672054, -1695801634, -462331538, -1383161002, -55664283, -1133721034, -1239420946, 374959624, -1033339964, 1066556987, -321246808, -1333094455, 632184050, -856306627, 1728232851, -2014719989, -1061032323, 1027854618, 1892601594, 731737019, 916174543, -253993741, -1342942472, -963362858, 1343959726, -331105700, -68746818, -1670496872, -19199753, 2096667123, 388851765, -638793719, -74062361, -1962316107, -1011562834, 2051561351, 786805656, -653500526, -1342181282, -123001425, 625702751, 418717246, -815227235, -2099024332, 1576765156, -386420440, -2105627056, -1924868457, -1169331979, 221276037, -952536422, 534334461, -816462037, -145764391, -1308858794, 1586060956, -744116266, -254968917, -110580423, -967102212, -231312466, -1795505387, -1572365413, -1913459858, 1846277675, -2011994616, -842496353, -1916953540, -1733465673, 580410106, 2026872443, 1920838621, -182274090, -495096213, 101022466, -1937437603, -1293127941, -1973115315, -1324015622, -732482617, -512338754, -1314816372, 1111078259, 2144627949, -725358472, -1944801417, -583949640, 1365228562, -1141144545, -1052520472, -318202939, -1759232611, -2146912870, 1481446623, 718002825, -396210240, -1333014681, 493564078, -629421009, -284759613, 1783275421, 681476086, 1601557077, 979649779, 1012895821, 1606920836, 984778434, 1251229519, 67174715, -475093898, 198444430, 1999890129, 528044890, -264247954, 971561718, -1115059996, -1879049779, 1784955355, 1765624079, -1275580726, 124426877, -1546180964, -113758427, -210129026, -583384338, 1822498082, 871179194, 433110191, -1191848469, -1491057357, 1064237191, 1075337165, -114366043, -1197720826, 1420289311, 832760079, 2103241948, -592810377, -1182767771, 720916057, 516812572, 1832512349, -469667778, -780708138, 1775235471, -121136429, -588474021, 1449159791, 1038438598, 2036263735, -1091700754, -1430199694, -1226056366, 775437203, -130637472, 1866685660, 1515562744, 1848201647, -212786496, 473996223, 2041632764, -953020860, 1357745769, 1155638645, -244591188, -1539806866, -105716948, -1268455081, -1255606437, -519514599, -1727373853, -1044082050, 277736947, -1183838355, -1452511286, -1161823043, -1621630210, 818352358, 728558580, 2141131554, 786222845, 898522835, -368614384, 622635451, -723684097, -1145464016, -1317537519, 703898272, 1225602116, -575293212, -1978098126, -241080861, 99964211, -1682194760, -1111543698, -397914067, 1314114107, -1779268440, -787625243, 1837375576, 1244413771, -581149448, -375085321, 965186999, 1682200180, 1549913079, 954938347, -1169690034, -335067396, 1448098831, 845108389, -961073493, 210741931, -1496158968, -2126148563, 515773690, -1248905673, -165290261, 941743334, -647639067, -1360004196, -1571597832, 1694150864, 679721333, -64078305, 759118719, 634713999, -365047553, -1367285129, 1137466788, -1398397563, 2147441422, -573636362, -386074382, -1825464527, -180684805, 277793570, -1299061693, 1473185785, -1528202254, -608223314, -1671964066, 1030447726, 1565598460, 1786607851, -14734942, 1096486564, -991073913, 647875632, -1742677825, -1475421857, -625086493, -1343816614, -112769310, -879008087, 540382426, -1566847754, -1051289000, -529548400, -1214430993, -1495403347, -1015093867, 754511313, -1625630101, 626450351, -384848211, -841952358, 1805340030, 1039039506, -102855440, 423068142, 1294117341, -177367465, -1156026404, 2069656191, 882546329, 1184086729, 232704705, -2047158527, 1614757766, 576696235, -2084702991, -1980238853, 1465761586, -2128774995, 1894892637, 1300130779, 1023064479, 1827853498, 1831532811, -777791141, 1945371098, -1950360422, -1946173634, 2025661911, -219680707, -316462652, 1047485158, 301966119, 301903948, -1284666411, -1452353207, 2008622031, -422807461, -291942841, 1599877854, -634471302, 1283158351, -371912323, 160091455, 1872866545, -67701600, 1760775726, -1577893437, 1878601522, 258569565, 1063812616, -28087850, -1571935802, -776420981, 1309147036, 265584813, -488999627, 685303471, 718203038, 93837, -48161506, 1615153465, -1365540158, -1224082422, 465824176, 741478905, -1560302778, -958944232, 1459520332, -260576661, 1841292183, -1302674311, 2009758372, -1913250457, 1378120039, -1952304426, -1622038331, -376470146, 2107629327, -1989953573, 1046652254, 2004268732, -1804743888, -437664038, -923731590, -1036756522, -328380264, -770177767, -44851791, 1114021309, -48714808, -328486991, -920828974, 324816302, 131907524, 1016249404, -1643593799, -683678005, 2122821141, 1610289914, 1831265556, 883683821, -586088459, 1180845293, -2003331903, -220122228, 1790487494, -1680038051, 1752140869, -935872954, -1556974437, 1810691021, 1439927855, -439673674, -176999596, -1884099899, 1673277439, -1223527859, -458496702, -655768609, -639312287, 2066542583, -951328587, -466209175, -996124522, 1432846303, -1963722500, -697805230, -1076785461, 1524263682, -1748354569, 955622257, 1323478771, 1234619215, -775195393, 1565655015, -586211181, -200463965, 1831165175, -1213598502, -97962321, 1911125507, -1939233402, -463016840, -261262042, -698352387, -30302508, -787925215, -1928528048, -807773201, 1606417093, -174686329, 737031729, -1464088616, -633642300, 1789439470, -1808968521, -1153188172, 342211779, 1998842610, -85710724, -1718059594, -490504699, -1371714740, -1397642201, 1305958413, 1874183189, -1914963961, -8645045, -1506543940, 1347957590, 1450069727, -1189999361, 1569335441, -1103137505, 1064901461, 1520301075, -530443598, -903526059, 906082641, 1502093265, -590092097, -1510188571, -1187711723, -1837162055, -316089227, -1243667201, -1725444218, 1442540123, 1912467393, -1049822539, -1635068020, 1688587025, -971092884, -1143470887, -1857209385, 1999081803, -67614597, -867418368, -186434702, 2099960794, 1457729906, -1667559431, 1652649750, -532752047, -299738691, -1869127753, 1822811275, 393612810, 804310943, -229926434, 1649780377, -2018687537, -472640792, -206639215, -1038929434, 495179527, 2093363822, -1142129307, 1871389394, -961336171, -721096963, 2011553797, -1772774140, -1583236428, -585036421, 1222119875, -1235657243, 1909920492, 581565004, -1499753685, 1876781697, -658908953, 1014134438, -7640563, 1202548003, -2104846964, -1532402293, -217398450, -1640840650, -1710985535, -1204074568, -446759997, 1843044758, 930676180, -626101208, 2118097970, -675253004, -329978498, -1875249933, 1971117931, 194925291, -215784874, -18358538, 1203284261, 188713179, 1916692227, -497382193, -415815870, 1375581695, 1967428879, -103069999, 2032233515, 1499159549, -1560851340, -562760360, 1466907916, -1154647242, 2060430838, 235255326, 1517983763, -865599935, 524545649, -1243153055, -715288655, -1125975857, -1677406996, -2004535723, 1396096313, 1782853131, 355708276, -266388905, -1678921217, 1969209941, 1854046104, 1367390141, -884286722, 1974268322, 2017441737, -1716871525, 179009273, 1392423158, -1866465812, -227283969, 1145019611, 2109477355, -599905162, -1832928931, 658505523, 316698465, 1802173434, -1719653123, 550795508, 2002749502, 1652355963, 1726063596, -1766862983, -544761475, 1056175700, -617383274, 1425779519, -898134590, 1791458297, 943119324, -324560454, -546553404, 1924537328, 1712529093, 171277284, -1271267746, 96215502, -1043577918, 1746398475, 287009624, 1050590703, -759572751, 874424235, -1171269905, -1250721826, 1400369718, -1616206267, -1351652869, -1176392240, 2005603319, 192763287, 630712829, -43314982, 1453123727, 1245913826, -1167891903, -1552203536, 2127577263, -442944652, -1824334692, 1314743559, -513343891, 952070225, -547966150, -1717834417, -801910561, 1409361201, -1141337935, -1088274863, -269085297, 7910421, -806543459, 1752164442, -2073774397, -375794114, -1000243567, 1569519838, 665825944, 637152899, -843120812, 1779816170, -1158747417, 948406814, -11350598, -1432539626, -117099369, -1190091446, 1338505271, -760058677, 334757743, -1583612118, -1553460511, 2132946946, -1897231168, -1903311042, 852367532, -34199469, 905810233, 1798579848, -397334043, -466137359, -1329870899, -1337418048, 536159082, 1744712409, -2066152421, -1619785246, 1740172391, 134923535, -1719786704, -648840068, -1471500694, 1726924408, -1120762677, -1780613717, -1367477885, -1576919925, -1200989547, 2071224071, 1812889005, -459832388, 246664026, 1704959476, 1071582451, 1050357479, 75494450, -893311190, -1303431127, -923943610, 589460891, 2092711950, 2146426079, 1333654921, 422894049, -439606909, -95072322, -1628213328, -63988338, 1361434304, -850468976, 485966607, 657961433, -1543046839, 517415291, 87412047, -939885570, -1442920176, -757142922, -1365881290, 89978441, 1458772814, -1380188719, 373142671, -880965333, 1196498601, -1355925844, -1432691457, 1141159590, -433671206, -20060912, -300015606, -86787083, 525256613, 1060768145, 623205308, -1374884494, 1768749444, 984364556, 987496010, -1883895791, 998492194, -1386672369, -711397536, 1268324343, 2142744943, 963250424, 979578703, -719236990, 1324825356, 1790417482, -542295846, -813463310, 1870155355, 728812725, 995393247, -2038380907, 2108125962, 1158203885, -1430109026, 1453091111, 771146783, 1763534546, 1536922160, -1341023201, 155751986, -569183019, -31388304, 557075701, 1662047442, -54900873, -1386368523, 1559211235, 251381541, -369641004, -2079294350, -674436254, 516303174, -1176924038, 1434972861, 1347407284, 1737758716, -1320628390, 221421916, -1366703531, -190008902, 188417529, -1522323593, 376035331, 520318254, -1649438850, -1954943387, -1078608209, 737634226, -298916018, 1549688292, 966778803, 360953969, -367314910, -39932440, -950277710, 1459811139, 1315330427, 934786017, 530847850, 1504251417, -806793712, 1687749850, -981652767, -41993091, -1182830492, 794800464, -639633812, 2124641946, -996267293, -1499513101, 1319918293, -577197873, -436780922, 518063560, 2118085882, -1678318473, 161939843, -1056805643, 1621227455, -429170277, -978323688, -1875641423, -1337876442, 956971860, 1315230436, 1769270668, -1217062644, 2086053940, 163682619, 610702234, -107205558, 1608226774, -531579926, 438373988, 41389663, 112949927, -1132804369, -883708929, 518646517, -612672690, 1929370207, 528055920, 1659221905, 654696302, 414715391, -942378637, 1337449137, -269346352, -43363927, -1824090140, 1575384305, 485214477, -450079145, -719869955, -193041625, 1062605308, 1118868077, 924545937, -1302753559, 1366785999, 958656210, 1658825200, -2013596355, 1374831024, -295918829, -1179333018, -321441263, 2079821801, -81661107, -1171638568, 1860793673, -1468869491, 1362173660, 57226803, 1634349056, -1090042253, 457547956, 630110709, -303336552, -243172849, 806140445, -1744900585, 1750028471, 324465313, 368762735, 1669552790, -144921906, 1082914865, -673248035, 1039490225, -1167305540, 1519074539, 620486372, 154516507, -1634034209, 1768595395, -469027078, -1993968422, 936780547, -1455437442, -1356992457, -1681671577, 994133761, -1133061404, -428498782, 1389554573, -650092570, 960493047, 123954474, -1157958876, -1014224941, 982433649, -1316300844, 2024102864, -18991249, -1701938514, 382591889, 1111713782, 846352345, 526458494, -1899191905, -1097113229, -1570526599, 1329952437, 1362523119, -1152892690, -1472422166, -887185980, -993708196, 788382094, -1738743517, 671076164, 556450701, 333083107, -544008964, 366707229, -720299993, 1712220083, 116969040, 450449191, -957956271, 182073839, -45908055, -454429169, 1731014875, -616261166, 1172192172, 369081769, 1393974233, -1570899740, -476390820, 114291261, 1558310566, 697071208, 1859748467, -1291052334, 1524561752, 791774669, 1243594102, -369215967, 1620474617, 2062597127, 1790608580, -281219916, -1511737393, 1861346861, 919572917, -777734907, 190258145, -368094548, 201081689, -837566482, -184193696, 1096506290, 2041588711, -1127491077, -56928552, -1245961787, -1278264387, -1490763641, -823399779, 1921383583, 1154119086, 341143837, 592206124, 1930884884, -1659411505, 1855272679, -438308040, -389702204, -1061596621, 1903221378, -1839526211, -2066859653, -289982649, -613190069, 1741516965, 2008402749, -894913911, 546514333, -1133366827, 1671822988, -213311805, 1431737196, 1701469607, -367966899, -1301116081, 1932249367, 2045240546, -501182733, -788929889, -1149087586, -88917035, -530630246, -42759937, 1260490020, 873162405, -1013056166, -1378361492, 1656032099, 883673318, -631689462, -1434261257, -171145100, -176310706, -2136048616, -1420346059, -1148029185, 1431671987, -946844927, -1997734854, 1870388549, -2056005987, -1210740763, 2108865101, -1502761018, -1279417484, 1019753004, 936277819, 1337355773, 1963062465, -1386748160, -39372241, 1928418143, 900523334, 2113836660, -74993729, 1341831252, -1112142483, 239481514, 790448790, 1607228652, -2111617034, -1351164021, 237218828, 981316959, 690662179, -2124515456, 1489928468, -1331967810, 44540878, -37815366, -646979649, -1121170185, -944216911, -2032127701, -833071860, 1726343799, -565793601, -59330621, 862916711, 2075067424, -139754266, -719902588, -1110507664, 1870334743, -64984458, -1081106381, -1628897300, 1305365903, -1469363501, -521941033, -1862804099, 506839566, -122605317, 1285281083, 1461604797, 1695528421, 266254651, -1251647914, 2136019125, -2052856744, 1626908874, 1877572272, 946486526, 1637716854, -1798386625, -1371995009, -551309827, -207953570, -726784572, 877589245, 660874478, 452910230, -7291939, 1010121708, -1376065292, -348444179, -1219824973, -231504470, -361612748, 268282125, 1518213285, 1030613101, 2099312430, -2110890021, 1805312544, -486652046, 1057583638, -588123533, 2056255736, -915152601, 1929083303, -1348725056, -1057609073, -91889863, -1148533569, -291514482, 1167095408, 1776936725, 925053050, 2089926062, 2060995525, -1706777628, -680483646, -713131010, 1156531965, 492043968, -123714149, 1166989885, 295051807, 884780835, 914323619, 1183504670, -1611683209, -366537446, -872489214, 886215940, 756877984, 502730441, -1120209195, 1761251166, -1579342485, 487232689, -1350931714, -1333869310, 1273132096, -652289974, -267518780, 1429226102, 428510925, 2129696742, 1060076925, -1225968770, -1285453582, 1739354161, 401306990, -129357375, 1420729525, 844244384, -451694557, 932841694, 1355665842, 1170500951, 2071945080, -1603943460, 1568304948, 2076320219, 281055945, 2095167099, 1656520084, -1515619564, -2029772416, 760805664, -1752230887, -1391083063, 2112131423, -1282822264, -616770118, -1392798007, 9360056, 1086079462, -1032903213, -1986209197, 244798193, 574441652, -1789652655, -1156671857, -328336972, -1134334206, -1882000628, -503569497, -1402804769, -1745178535, 1241039549, 568685055, -1342755577, -1935038929, 746461927, -1477668421, -1859791965, 1488564299, -539922013, -972769848, 607360986, -199509214, -675782737, 1024482019, -947065650, 1558852360, -316970999, -1351898871, 2106759463, -923133968, 1003640718, -1992218071, 1504536214, 1462599242, -224169408, 711146414, 2079187920, -2046101906, -179248090, -338005512, -1409139059, -1467580988, 14305231, -1133974753, -463831818, 1986255670, 1777023930, -1073888811, -1170085978, 1016979223, -823238342, 767002837, 1921563921, -579674589, 368683889, 997265517, -1821600325, -137135069, -995100730, -1100940748, -1241035121, -1195586049, -689014020, -131096966, -1180209468, -717836645, -1094798074, 1234869750, 2051333607, 583360415, 1958122893, 844089617, -768943014, -261568021, 2130185042, -1109990805, -1141500077, -799362354, 1601268209, 1297223517, -588469112, -825253697, 1760967222, -231657342, 1577057820, -946860547, 599839763, -2060237121, -1136201860, -614315453, -743843935, 31332049, 569365672, -1508158931, -1942910565, 1062537861, -32818898, 1389913677, 2074054529, -529332708, -1863191664, -1823872054, 1338084383, -1023487576, 1580202935, -466319006, 1173537850, -576130220, -973460946, 1861438325, -1229149527, -1704139800, 829656956, 1786695824, -1865145799, 318905541, 1269063284, -1362318124, -1160393786, -491534151, -395471594, -1154222226, 981354217, 1181081066, -1647116947, 293073912, -256524331, -36271515, -253891106, -965073646, -1328026362, -957350484, -408426428, -2102676113, -722058052, -87874625, 1240576956, 853382371, -1876933027, -172384530, 1999288066, 1177919101, -1578277359, 2097869413, -482347095, -982868955, -1713336242, 654081446, 648882164, -344681986, -1590817878, 845326430, -618145013, 1709165811, -313743470, 326002397, -1944006049, -26055715, -258063885, 466346291, 1963054827, -907907387, -143903078, 971506589, -688134664, -1151930529, 1118087941, -1897709460, -1650698770, 108532194, 255185012, -631931554, 1592718483, 1866674918, -562975617, -939593177, -1290817877, 626289721, 1840443765, 1690515889, 620723472, -436852491, 325761717, -1697035323, 423444316, -365594881, -1892746789, -1679343916, -824635912, 1496294193, 1544948417, -770255640, -651737149, 1247775193, -160557169, -1743443203, -1245465425, 2027519162, -209731972, 1516461517, -106120788, -1466729918, -1550138438, 1842510455, -1900347459, -263058543, 1684130203, 1568386338, 1768670806, -1489066919, -1772906750, 446955194, -67127797, -1399690608, -681470135, -1389815829, 486960220, -1426157068, 1662387263, 378007410, -1641587254, 31166879, 2063481564, -39204059, -1763969157, 988107470, -330630845, 1540334775, -259345575, 187694809, 528175616, 297165778, -784165091, -1252970627, -890150424, -764696445, -139552883, 1305878436, 218990575, 1478803431, -482975856, 1971039404, -1075439040, 1731139555, -2086781869, -104196317, 605471701, -606242440, -1107904455, 2067670911, 1704430683, 1502156703, 519433268, 1468843559, 978581277, -2030734459, 1971109282, 1100686672, -1919202166, -948224546, 1347570591, -367663873, 1154056540, -2014086256, 95585718, -1102113918, -1730271383, 1411249622, 1249332996, -218201735, 698284029, -749136274, 1701875005, -1678970905, -375935623, 943533426, 268365364, 1796990389, -1124271578, 41267935, -1673426890, -1536336364, -1802035699, 739040695, 1894737105, -728582084, -144893329, 204340223, 1984336190, 289517489, -1653115166, 1944989012, 1071302479, -706250183, 320078989, 651782462, 645394500, 1590558474, -1659112089, 2008958640, -162554819, 1852412901, -474910935, 1894051521, -744609031, 603057013, 1305054846, 96480666, 411645392, 719904694, -25900642, -551084824, -577829017, 1249017301, -736537090, 598439797, -504544295, -311384355, 1610923927, 681710141, -33169578, 624375048, 1969216902, 2129457355, 1484069305, -1948926883, -1446610029, 1343090780, -963229125, -822931778, -461631516, 1197996767, -1360453606, 1654188320, -1624069108, 829530110, -1644374402, -743347722, -112947309, -1171827826, 1470338351, -1644152090, -694468072, -1396453025, 1569247847, -151757340, -1908592305, 2132136230, -158293793, -574566112, 165849008, 767616422, 1940491575, -1626559604, -1765874554, 1844764403, -1498032516, 928774724, -1006731118, 250961001, -541471003, 429244852, 900901976, -1921590541, -1393931847, 1836254140, 441652722, -1631626433, -1250066120, -624537039, 115197790, -924801010, 272930157, 2080242236, -1628054025, -1769683318, -382050015, -1246531595, 13297591, 1113987611, 1274008185, 1084840881, -1623206526, 1195010855, 1965882917, 1957838554, 520855533, 1390004093, -1509494347, -493983852, -1437417621, 246125404, -903826453, 1978202649, -552684332, -543189017, -487614340, 363741608, -1888764237, -693361749, 971487054, 131237703, -1649001556, -1295655345, 1059059985, -645079169, -622347286, 922868459, -2047404045, -215670948, -440275098, -1176775582, -1275116657, 1175885147, 1574507092, 1427147264, -42753469, 1596871451, 2058873633, -449086099, 1729318313, -981057591, -711968661, -643024870, -135287581, -948262338, -846914978, 910462109, 194836301, 1802502656, 1056480725, 86460679, 2029118350, 750816748, 1687329061, -1094740677, 360077488, -1116550666, 660955896, -218858689, -2026980680, -561891641, -1485203965, -85569743, 845117414, 526748209, 1705826139, 2081875780, 903691980, -471199150, -1922090235, -575616601, -807059846, 1789104299, -1157643534, 395786093, -57025058, -1489057227, 970571495, 91559391, 781579540, -594993981, -2040050777, -842926698, 2093386814, -285311995, -316164300, -50130419, -1161701465, -1083511199, 865452639, 1173429632, 864269550, 1567340282, 1789460221, 1570359838, -1812079946, 663112651, 644421304, 795196742, 535883559, -21000289, 1937430206, -570862496, 521910253, -19033433, -456615825, 1397873034, -2112900487, 34199522, 668174305, 1671852654, -46969234, 1105131001, 1508013260, -1087201350, 112165211, -1614092371, -1847706641, 1125895615, -2049584267, -1983661620, 1980688404, -913285331, -1963126310, -1652495256, -1456294853, 2081735736, 510560841, 949488795, 2119911331, 1937110103, 1576142719, -1191343071, -368016170, -1462091992, -100514157, -1344474949, 81616850, 1996987683, -1689333972, -1131881273, -1891718948, -712441603, 663033146, 953699883, -169893285, -1149039655, -1762453819, -402243939, -337789078, -180707415, -1430359264, 1763360317, -219056424, -1440387729, -1912274575, -408360656, -101356383, 1216263796, 819713853, -178547944, 362805465, -1251468962, -1311267961, 1192185120, -1215413684, -496089566, -1379004323, -682772410, -852500114, 890889053, -915105036, 868296516, 347028372, -1198768543, -1077351331, 793487808, 1561312287, -962889812, 50841772, -1927814031, 1961690073, 1798967101, 165031103, -865236422, -805621531, -1389059078, -249493259, 1596410430, 1324809578, -1117945154, -1094826105, -1145295850, -270270719, -1422169373, -2014695114, 2066740263, -1012642123, 1762254132, -528802216, -1305251318, 1004246009, 722912869, 704470396, 1537092640, -1848529265, -1365844425, -747404105, 94942175, -931533841, -358133106, 1040292627, -1789787925, -306339064, 1059941313, -338584965, 1061654400, -1644563050, -79274578, 815675159, 1535879030, -464348786, -1708929301, 2041554867, 1689637982, 2031782381, 776636316, 463316734, 843518007, -440568520, -1036566923, 2139536452, 1283282045, 1776411132, 2029399307, -35022514, 1000607169, 610186812, 870496083, -1075174769, -1252792129, -956219630, -1025399003, -2086676726, 1536201614, 654874859, -1385501784, 1997143870, -89850340, -101632527, -1917197458, 343873922, 1201304229, -1614868814, 513992012, -109069786, -412532750, -719780805, -1113278898, 1016987231, -70368264, 515197443, 1846272443, -1051213629, 1423812533, -302026821, 578534797, -357601613, 2566971, 1365439220, 518984693, 1722599565, 684432054, 2021628413, 343649731, 1712061988, -387637385, -1251663553, -513918229, 1330063107, -1098569651, -407784839, -634379704, 1944434402, 45059823, 1073689924, -1087919788, 368636855, -43976169, 681635576, -723608756, -611811660, -1546677042, 1545567716, -1544918753, -1943610002, -691789226, -41970386, 782196412, 1478218716, -953221172, -74325694, -1568709125, 372235923, -1770495627, -1408321148, 1831122003, -20040765, -537648585, -167838481, 356471215, 464242867, 1549330450, -201626173, -1445242675, -1318626117, -1666897986, -1091728290, 317673957, -167694003, -1535553083, 1707566057, 1014142108, 428288460, -269763853, -1563038895, 1698385515, -1921877609, 1772025408, 1051966413, 2097091558, -1976338378, 1341390442, 1001036989, 60748467, 1860057607, 1201334460, -392719344, -208136482, -258628361, -563623239, 1409042665, -1125338633, -365353120, -1389900424, 1329265467, 144256304, -1312367083, -910488878, -352629762, -31211698, -1501972676, -1090986978, 1250336919, -221848790, 2134507329, -1494250322, -282429276, -1357657138, 1524210499, -561252895, -1489117873, -73453744, 1284580781, -1645496726, -1259622606, 1098664925, 730572206, 1865416166, -1745918220, -1144449249, -1956775238, 446594728, -500373163, -656892601, 841836454, 1503628723, 999846172, 1575732340, -1588606995, 1485066739, -1713430288, 645080545, 2114856817, 1814710936, -1117913195, -1191848187, 314011515, -766231161, -1634656582, -549075497, -1176929056, -1095510926, -371772691, -980937210, -1913677137, 1418618832, 584348683, -126863498, 1557069352, -1401294073, 1690135925, -10337878, -56111485, 1294172624, -1864147357, 1943710592, -1841892676, 2095210986, -798106898, -634375492, 1822932742, -1849442009, -1001542421, -1097575670, 104303376, 57795160, 1646982716, 154730031, 138260174, -19520587, 1976977184, 2068968420, -1883662093, -1900610425, -1255346058, -112542719, -1117561677, -442020892, -887708428, -1187612050, 526035331, 1745089230, -667493224, -460069148, 263339150, -1605343587, 2101181167, -570140618, -1052914227, -564714946, 991289764, -1419819426, -1451433150, -372177484, -301236241, -1082166546, 2119915257, -84542735, -1234744241, -1350116061, -1979565785, -1782887701, 602336325, 1762524577, 1689535926, -2124575264, 785605520, 1937724221, 545167040, -1154839295, -820500692, -1878949194, -16012893, 930231294, -1217553545, 858743439, 150504101, 981288244, -401535474, -886514543, -617933099, -760416448, -39991981, 1194908474, -3224092, 1066793266, 1962630764, -678099845, 1432809812, 474117113, -497686744, -99629380, -2009098399, 245304783, -1546923051, -450763820, -467409292, 196080772, 906248330, 959093246, 1963693807, -634609794, 1974523527, -1202015270, 1276083156, -1099176577, -297690564, -1805685361, 1176823665, -2020751685, 1839921625, 1982585158, -400584943, 1240234450, 1964525118, -212144573, -325067286, 248986893, 546594834, -1283817665, -1133539150, -405051499, -1384765799, -236998116, 1273036775, -400233725, -445549468, 889489251, 234006103, -829806822, -63674196, -450556708, -886588147, -1383565, 1741681228, -362970663, 769717661, 1582656509, -147962595, -226853755, -780282888, -484732488, 219657817, -1848936610, -13243873, -793985730, -286908679, 256635551, -1892728084, -2050509399, -1408696455, 2107387054, -26671175, -612958856, -1342804067, 1704953417, 1072467360, 718515567, -708244994, -224654739, 1070296671, 1308025595, -1182926783, 1054074717, -1622606257, -1671481803, -380099458, -12865576, 1526579770, -1457104331, -472123659, -1605945527, -344389707, -257525230, -457501638, -797973251, 2100346998, 1727240925, -566997324, 1050912748, 838787038, 926748130, -1349481377, -588048585, 1263432266, -2087391559, 762158603, 90823585, -278467012, 1897563029, -230733669, -632429587, 1925377604, -977229402, -1923246111, -32770395, -514713050, 708591545, -1743245819, 1445032695, 1367342074, 2141806515, 636206075, -1818948777, -1701593040, -988119774, -1959821109, -121188720, -1779519874, -534641937, -598016155, 270726629, 1350511842, 824895741, -2034013104, -1381934788, 1608250294, 1063829190, -805674024, -1119731586, -2001649521, -8557231, -1846709564, 182413053, -1109612147, -480268050, -487064823, 1734041869, -1244297654, -7129173, -1832881557, -1386559426, -569698236, -155123654, 684423875, -341885551, 1210111014, 1095647048, 857632501, 160220206, 1056823584, -1009077052, -1892290899, 1919536915, -114060846, -1194840405, 1021810832, 861356698, 329118489, 775483004, -1352672970, -2080535425, -360713583, 542037577, -1504205216, -872557102, 1544776346, 1259292533, -127477901, -46184778, -280518851, 1920644029, -235544422, -625843861, -711020711, 1364024127, 375665126, -676193955, 2077008895, 1403704819, -2022351781, -1542462876, -1380091346, 212451918, 2047107059, -1888510227, -1464315201, -1480349426, 1590279768, -1375834421, -1584994338, 1975822831, 1755577143, -1647333130, 1725703971, 1802258301, -1293212044, 1250109546, -1476464514, -685599297, -89302354, 150305329, 1593221501, 482339231, 118473021, -667945919, -155155530, -976700238, 1261738205, -1324524592, 2085083123, -1294045468, -1714899745, -1456747423, -1757949972, 1849919853, -467207468, -354771457, -11995821, -1586748467, -893464609, -324475538, -560366442, -220681969, -1641765777, -1720700998, -1347503679, -1100299362, 1121448619, 1143892508, -294767917, -1444246857, 356379054, -997488411, 1579521623, 527818438, 1000763325, 260340087, 242512999, -1508318545, -495739993, -772014605, 386240329, 1923154757, -1972183589, -219350407, 399214446, 307764618, -400183369, 1470406461, -1998102210, 1181888054, 1159528346, -1381389348, -1118887873, 170295047, -1094318084, -1883429748, -1188592909, 1798560960, 1414946655, -965498308, 2051635122, 1858860288, -404545546, 1202864365, 536345409, -138745632, -1359206278, -1244996275, 889555498, -977307164, 1645780878, 315595675, -1050411151, -33735545, -1379233927, -1930898057, 849919532, 835327030, -1091872300, 766298019, -471633943, -25379816, 710965385, 953926730, -1869607049, -36538122, 1223666306, 376859989, 2012703339, -503919101, 1371028474, -1654097317, 1861730247, 311086872, -2060836066, 1942748652, -2003467716, -1504010976, 1690937941, 1953344629, -970127767, -1053356558, -142541955, -1464997126, 2122264533, -72810395, 519857199, -938252663, 1938459823, 984034606, 1971251602, 1161568538, 2139166365, 543335318, -1982292549, 1853698155, 1810972262, 2003297708, 515211100, -1048797686, -570756420, 1388962714, 668963270, 2010115557, -1372596241, 2117106599, 1540922234, 510517806, -9118226, -148256336, -1106846852, -429229201, 1508015929, 2111066043, -262466957, -2085814629, 1974135651, -1771400279, 1582310893, 1837791767, -1683508837, 864742976, 36035411, -1749567168, 1308160973, -884099628, 2060178159, -42038089, 665976831, 925786027, 1958241772, -1390470128, -1119031740, -374511633, 1776800473, -1569492575, 1156564855, -916042173, 2144278898, 1070308173, -51469783, -765696425, -45295985, -507808542, 1900510324, -1083186852, 1991002105, -2132810444, -192447143, -566985807, -252489208, -1812102768, -1765298877, -1118133712, -1903786652, 379264455, -663004177, -160822583, -2010134195, -1993099683, 1288529359, 2098428854, 1999230843, -1791919644, -382269569, -1218328361, -124208098, -1607606498, -2139835460, 83442330, -1330774508, -1398837761, -2124661233, -867209383, -87114693, 1538753583, -55385834, 189928319, -2019558722, 252895145, -189039658, -1294005842, -873302186, 1794835253, 989324913, -585142129, 194115386, -998459088, 124914017, -306404466, 872861618, 827875136, 934758257, -1802502613, -1174470725, 1255856515, -328706669, 1016175837, 641217920, 1284661083, -1276812390, -53167432, 1592138478, -1156392129, -1917045433, -805456810, 1970064076, -1699935994, 988550449, 1070215740, 1865791113, -1091293961, 2113450651, 285538410, -1752728578, -1158455878, 1337696020, -2108513310, -262345394, 1090085759, 2101246824, -1381498885, 1646291003, 1610595391, 1113716735, -556594219, 2069450101, 332689088, -638294072, 1580300181, 1532444685, -774001009, -1862343378, -2048303676, -1095064128, 2060249491, -281359653, -1837172952, 1971224522, -229000453, -1158269589, 1818338717, 521231924, -1739166011, 385177073, -273545363, -178699929, -612387892, 928145896, -408305587, 360364082, -1084177331, -305410146, 1356511827, 964651751, -211972005, 242482398, 1215714548, -1822655895, 2059002536, -1335597438, 1454478281, 68009442, 494572026, -553863960, 1520494271, -382734337, 429178360, -724570663, -499527747, 815745618, 583937990, 1201219223, -620829766, 1140759066, 587032988, 2098835971, -1441251889, 789761833, 2061665822, -1128892690, 295486846, 1512980193, -325143778, 83393300, -1396459942, 1999972155, -1054583945, 1082802027, -1220599091, -1418260605, -358494045, -1277547702, -1686932725, -1138276367, 1166567403, 1543363459, -956631468, 480764141, -337683219, -1913561840, 1210251581, -654942620, -2068812628, 1706683098, 1502404592, 1940484837, -1625964704, -1324922621, 2063953012, -1219924087, 100778853, 1351602166, -1184606546, -1708673558, 64792482, -1239459493, 544327228, 2101063628, -180204023, 1384372806, 1402574617, 1296373994, -593678577, 1305027179, -18938264, 1473189645, 1872004322, 992976037, -576005180, 1219687667, -336809030, -1369771621, -538991144, -13805968, -929290593, 1604215839, -170717730, -293606264, 1050427285, 1948004307, 784600435, -1548342816, -1325878735, -726257714, -1402652773, 1790726605, -1883311094, 1858754557, -822282385, 554661297, 1043738121, -643229842, -1812737208, 1056963847, 2120002004, -463011158, -395806544, -306591390, 1490234135, 81748723, -1884056790, 1926402775, -1044612302, -1391742077, -1963493912, -1775371657, 205018287, 2112946421, 527547360, -1518404597, -1462864069, -236338650, -1289474074, -106988295, -1989650200, -706197710, -1107781647, -274428496, -1087043893, -1302336349, 1139219869, 916633787, -80392213, -600486669, -415570062, 1704531910, -1658669869, -212744994, -1124484765, 107154993, 1933163104, -840499394, -1023972742, -510044948, -1756429184, 485582841, 1975162822, 951138050, 1098904570, 1866436254, 466192945, 451723238, -1541976134, 1393792055, 1475012973, -2115886642, -1654018085, -2027831809, -1303511224, 1752374246, -1703281521, 276414601, 1457080813, 393298090, 1089896431, -1309821353, -8753132, -419641924, -157286682, 802500230, -1407437957, 323686656, 1626087396, 217850492, -1221635864, -646149029, 519188850, 565533689, -1101396075, -429842129, 165572160, 758805513, 628945403, -451244884, 1047663448, -684883779, -1370795532, 1858065155, -1906475761, -1320519646, -1620568264, 1163911214, -1544093187, -1014947695, 1266498183, -1372935206, -181712452, 183980445, -1025660001, -2132531787, 486147371, -111617397, -671223403, 1334958424, -1404737740, 445461898, -1952592274, 1974452543, -671210721, -627544903, 2087466641, -2044908671, -735316703, 541087969, -1948686828, 1607860199, -1704288354, -28510141, -1252197019, 770182268, -1881332804, -2144301849, -281067820, -454312265, -87082031, 718813495, 1960213410, -273083336, 1853685179, 1291340215, -1415632930, 1876745975, 1027581346, -1926153019, 1053449462, 1762198700, -1058342129, -1070180829, 1683246966, -1750315413, -847274026, 918803738, 1062851260, 602876902, -171115308, -509621337, 499595357, -1960992333, 1582270449, 1318101930, 1016425587, -1207998729, -569278997, 2002792138, -34361717, -146956393, -940450955, 1779413667, -429297617, -781647934, 942874303, 1056063119, -2024032773, -606474547, -1656017159, -1606564885, 1804314211, 280283812, -1621490461, -718763665, -380416836, 1567025079, 230547269, -786979926, -1521042119, -578291409, 789269639, -104579038, 1850467732, 1485974206, -1985622243, -2082178270, -1657176958, 224835230, -1619676166, -1880926675, 793747382, -566581289, -541081377, -1043501411, 2136942280, 764357816, -1990376510, -335556641, 1191044256, -883101420, 1855603887, 1676952477, 53080447, 2017344363, 89689000, 1268888526, 1961330935, -1343753778, -1941652598, -1209278627, 1938980407, -1716096573, 1059580270, -985072208, -1213022426, -622077506, 1359560694, -120891820, -1009615000, -1169102429, 180733311, -308505036, 2145517226, 2102725193, 1232517920, 1307481249, -643612805, 910700785, -508390281, -1581256618, 1151305643, 849255118, 2140188548, -1147798154, -23976170, 1929011814, 1100833174, 2058869801, -973749263, 1210914598, 1635903850, -1219152549, 1342706213, 1719630271, -1091573196, 2068722175, 1994936328, 519161527, -623931194, 295649143, 761536638, -538880484, -12735762, 1655051538, 1893623465, 2062531544, -202018276, 439549375, -689492444, -224402042, 1391178020, -1611104894, 1700561296, 1539683437, 204312023, 870543355, 2089375701, 1943310779, 1837292939, -1270711979, -974411936, -25690316, 1876791696, 1730568294, -2055297273, 680951260, -888146593, 1931912791, 1902247440, -489227397, -819042917, -105375178, 997178713, -889803283, -757752234, 731475692, -1326784006, 1253570303, -85474984, 1952201783, -287396479, 346118455, -491872111, -537286081, -1878826264, 266960892, 934870738, 404061212, 905412053, 489898842, -1471575245, 606745461, -926082778, -1319417027, -1172146203, -956795298, -470605016, 1141091600, -1952321127, 184227215, 1833691094, 359257690, 1312226142, 1486871348, -809583989, 1587270146, -850902141, 1341270792, 1666918503, -307827413, -462026316, -847282734, 2005459895, 2052927859, -1195548794, 1570610928, -1081198745, -1297637172, 474921683, 1526157937, -1770890714, 1318776597, 1140155994, 1609023492, 1166154923, -1867866881, 1004956576, 1941716890, 1170739839, 1044896142, 716622688, -271346791, -763804841, 1750279157, 435612388, -1319762078, -250266408, 1373607807, -1372134222, -1881198511, -1305499933, -756029604, -1415123765, -167927122, -868493753, -636816608, -126639253, 1502411129, 2113175481, 497502792, 502240672, 1341143844, 1716934395, -1555312188, -1757958354, -1694521298, -1813901058, 429349103, -965692936, -1547238694, 1279183588, 1325381784, -2129155106, 594937229, -631812748, -1102518378, -475411481, 281476773, -872168597, 648084213, 2020354603, -657069401, -2068067076, 1033569891, -1378395014, -88197757, -648035909, -1793775517, 1341987535, 1053808980, 2019518162, 533976760, -472172905, -1778647138, -1954546423, 475724141, -231026003, 454196466, -1578522263, 436531551, -346934250, -1162956365, -1677847601, 1027656673, -1796867656, 1806021289, -179845093, -2096657730, -1513935078, -1408674059, -379498913, -1728661589, -1554202664, -1880495383, -328186130, -1134674112, 967830008, -273179187, 1110347602, -1437060105, 1336524261, 1072196923, 1991884829, -1353455896, 907017075, -5662254, -626835019, -1676308745, -1018400196, -2018205345, -5384726, -1736648093, -1808085017, 964926675, 1457434390, -872767088, -760340196, 984109602, -298851491, -1551018788, 617578343, 1593785297, -489505884, -582645232, 1476055487, -952693325, 1776368976, -807221674, -1168538135, 1602299373, -1667411335, -1871224357, -2026574505, 2057718678, -742028013, 1952552560, 1465820636, -1201553861, -805309765, 174818287, -1859293637, 439386017, -1396346321, -1294628119, -1224989708, -953796913, 937205513, 418741603, 631925566, 1348433630, 1102135938, -213416471, 719011385, -360225741, -1181584301, 227125951, -348846457, 255690462, 957300184, 326024259, -3348953, -792932989, 1462744015, -615389846, 1287896958, -318615492, 2075910026, -977277816, 2070934923, -446463829, -749021465, 1815268194, -34575514, -1283443050, -951319436, -1413301771, -502671099, 1565716050, 1774103134, -1966561988, 828798757, 1428831670, -830684088, 1662948829, -1806411538, -2038683925, -217190757, 1004302731, 1118871623, -1673885360, -1074230472, 979230777, 190703193, 1322715380, -1076901275, -1729836042, -660733336, -1284164644, 361121041, 1592572314, -177360986, 918432986, -116366981, 1961873715, 1993425967, 626384739, 562197856, 789945008, 1740513050, -1632159197, 1305694878, -645798314, -673719944, 1428120909, 1758801716, 1531292209, 1219807078, 1806517607, -1060180999, -1212544723, -2022729824, -85345700, -818553582, 1344005556, -477263563, -1692353341, 1147327447, -116036721, -644751939, 1434941435, -832203557, 410570417, -2099964169, 1767581763, 1297865597, 1736437595, 1770830400, -205116065, -175185925, -825954217, 511299691, -1467625026, 503076234, -1162993223, 730626150, -211949323, -1935075821, 166354496, -2031001694, 1975596217, -1955077860, -1631066728, 1270723911, -1005102305, -1193559533, 1448493639, 1880882340, -1864302723, 119333543, 1341207337, -1299053506, -638612998, 1698135717, 728689051, 586317746, -911349603, 899939694, -140334462, 445043543, -140608488, -1351231250, -542547285, 459973917, 397520682, 816569498, 421631078, 2080340516, 925157884, -80686450, 1256012188, -93988406, -1114498601, -206923490, -312770589, 1691714470, 1928950675, -1299006218, -1242029736, 1329263834, -576914504, -162478940, -1219627573, -1283019735, -1225698221, 1034157043, 750215607, 171933333, -889306178, 1693075391, 2098727293, 1071334312, -1912603668, -1425248449, 627912349, -605510798, -1174409810, -1974864098, -2101481043, 987306705, 1742320492, -51391238, 606452605, -1946233221, -116368769, -1827210732, 1652283774, -310200361, -557331493, 960030223, 1389221969, -1927295001, -1924382060, -610865694, -1201466655, -1884494337, 1071704078, -576201522, -1499285805, -523370609, -912295045, -1900139633, 493652716, 2099103999, -2068840518, 2129947152, -1209600542, 1332207014, 921403818, 864375653, -1449306769, 842634102, 745925514, 1222779695, -833539856, -1451837956, -700803694, 1083448789, 759008813, -771903302, -1616216578, 219887024, 1532548070, 1137247705, 1522915631, 988723485, -1103745537, 458635001, 1810112880, 732681097, -1152649706, 861550182, -1167173365, 390575609, -1712159465, 1738306997, 2046671184, 1997805445, -707570853, -208365316, -1328411466, 659218626, -970703696, 933621792, -825764925, 1379642740, -132471029, -71943046, 956259834, 703642495, 1521013687, -1416545988, -109273160, -2138983732, 1920043903, -515858395, -140074553, -532843267, 1007213806, -554582998, -834390314, -163131371, 1839424794, 1756096879, 1426241048, -2064806146, 1910504567, -660635878, 819706066, 1327146575, 811265352, 1126733669, 1942450452, 899594727, 2110001290, -1966303257, -898615704, 935307965, -1063606683, 1696058982, 393536744, 416082650, -352047442, 1425953592, 951890913, -146347571, -1321887026, -303130271, -156589695, -605817605, 1718867271, 429339995, -932429987, 110793580, -1802547479, -826961000, -1716296018, 1323641580, 1878477205, 462984633, -1989693662, 366834683, -537973927, 1600104355, -576644206, -1897320694, -89146725, 526908280, 2012621265, 1559690371, 1006586485, -58383755, 1316885499, -368506697, -1598572926, 2060930672, 1352917124, 1893056448, -456573524, -1367510073, 1302556230, -1383094248, -1099859765, 220191420, -1490095651, -88719469, 1660803335, 1835825337, 1302245963, -1687891794, -2046599206, 1166226156, -1292656891, -68586607, 1803451495, -340959955, 2001598463, 1072484943, -1714143116, -1682078529, -1942200147, -471639802, 1070601803, -711549858, -1208043864, -1410331506, -40595281, -1986808415, -180506402, -303281303, -1770385601, -1526871597, -1727697519, 1957814296, 792565944, -207852088, -1902766234, 1293395850, 348110375, 1907680819, 1547016311, -716987969, -1205091158, 1873403401, 565938550, -853153198, 2054581473, -1668559313, -1714851222, -568992044, -173540619, -139226348, 771479278, -1789080758, -1649747706, -1729248291, -1700159426, -1021150517, -182849206, -1124408071, 1452917199, 895372803, -909678929, 1801084019, 1103172615, 1441474266, -749605203, -1654403338, -859963779, 328200005, -1632128320, -1614874773, -2110336344, 920365270, -1316203948, -296841577, 213035714, -1096111729, -1731068105, -990885413, 110466812, 1293426108, 330282170, 1674084845, -983044855, 2077534318, -814318175, -1443227359, -598667409, -1413551123, -528585228, 872761996, 1287192549, 323739299, 484473583, 1021076460, 1518069355, 519810204, -203598753, -1403499140, 1814940477, 660646429, 442258211, -325895699, 570535180, 1470563365, -1374702764, 2003652220, -1160260235, -26898341, -551341460, -1164011369, 1653181674, -302024856, 941343108, -618263142, -541461045, -1487318049, -90821107, -1613109779, 1039986660, 1534614428, 1898014130, 1944011109, -655935473, -859835397, 2062493162, -1567013821, -1950001827, 144255733, -822245022, -757219596, -187938195, -1487945461, 1979343884, -2047105190, 787078449, -405687283, 2052106060, 463187530, -429250373, -1238977877, -187074095, -1894224689, 463135575, -1850811397, 751446780, 921039357, 1777434410, 1770885756, -36986130, 2137969624, -667125059, -221668790, -171172560, -444318020, -28163316, -1079111799, 2000494591, -849758281, 950025108, -868600461, 1356526325, 1001533839, -1248138457, -1283736652, -2053741884, 1488004959, -588126059, -1319236057, -529858853, 1468916687, -181494683, -1225748814, -1127028361, -2086105433, -1999534683, 1903530683, 1266210970, -1125484870, -1400442138, -2085339220, 1226039855, -462916733, -450661261, 500367254, -1091212057, -216681539, -537236194, -90295926, -672170325, 1501685475, -265040929, -308507117, 2122800915, 988468174, -960272555, -1226056488, -1768455937, 919986053, 117401134, -1900041922, -677740249, -1298534913, -91526765, 477149152, -446466179, 2128328599, -1161410577, -722853028, 1992726997, 2071327833, -185861054, -1331557812, -1118900937, -1451098250, -1206603013, 1415312905, 786259307, -707091630, 857577929, -704725249, -1871270066, 564471538, -738468385, -722259841, -507052549, -713579430, -17592842, -2020126364, -122024695, -292033798, -892428377, 770237051, 934992284, -276476364, -7369903, -880429462, -143265844, -1880115682, -2106975284, -1225612692, -1917041160, 2117724316, 837745235, 1365714923, -57289269, -122325513, 392415353, -980475298, 640166870, -1145034717, 2142247866, -363591747, -958499993, -1940477747, -1083631433, -1822184061, 1880749625, -1911952068, -1755334247, -689955350, -1611730136, 41442468, -1119084554, -376233062, -1086652208, 591294525, 1886269948, -1145236815, -1800286288, -498886557, -1346752446, -168141093, 406454120, -1887597561, 1472056343, -1076105821, -1868857429, -59383850, -274002494, -1406535205, -1013225610, -516705633, -355066151, 1830548217, 2096053808, 1408827298, -909681133, -1934383282, 727116692, -227317562, -205083151, -1053747317, -1571371021, -1017769356, 1985154945, 1997563167, -1338679777, -1150261411, -1369229324, -1405735697, 758605565, -941805679, 1234982227, -1318719029, 4118956, -690184511, 1074596314, 1978826781, -498942810, -776219107, -222420085, 164438210, -2117676747, -1815316338, 1632034615, 2132048118, -569188652, -896571441, -155421513, -1370603969, -12291029, 1549757342, 68417625, -1110211095, 1942120200, 198212280, -216360554, 1360624795, 1911970258, -1446390615, 1222449557, -1597075662, 1611123085, -811179625, -1237853563, -597994953, 1127734222, -1552473655, 2097658468, 896563481, -425502982, -1312629236, -1932671072, 2104430936, -1143144239, 774878956, 1395333687, 160987757, 1870285227, -2099325213, 721912907, 317575895, 1460135850, 164428636, -1580974712, -495640635, -942104616, 805271803, 1690654861, 418059201, 1238798021, 1180744632, 689304002, -225555464, 1945077682, 35462394, -1276959758, 620858135, 1441964293, 1857569521, -1017644057, 1137554909, -1815461046, 1458468936, 1759494108, -1510706965, 631650692, -1231826277, -1026070031, -600148112, 1827399049, 1403055970, -125395819, 1219534248, -973265830, -597218340, 2109598592, -1481894217, -725766259, -1851364822, -470779990, -245952184, -34207923, 859746279, 79042195, -1107302882, -589536715, -538238836, -2136043774, 1058356187, -272744150, 929649054, 1568365543, 1472158947, 754243861, -1613334384, -1334413702, -1259458157, -1613135010, 2010931031, -1293616451, 1995501152, -1531221007, 61494378, -1755333217, 848636241, -915899666, -1563276853, 1163970548, 1980718223, 192826279, -663517207, 853131494, -1302529365, -1114027483, -411823711, 933204635, -911376960, 1307927013, 2142883381, 456058418, 28486984, 985112271, -762069920, 288423204, 201552602, -1913231365, -1743074572, -76440837, -1059985930, 213870846, -959104702, -1904250910, -1013226517, -331368707, 413221571, -1308177188, -941153577, -151482519, 2018962001, 715877090, -1802643860, -915695749, -1409760071, 1354648741, -1880158990, 1194746169, -950728686, -10359811, -774943001, -622628165, 642757275, 1893926891, -1481846019, -1528960901, 1169100513, 1048739242, 307078250, 157385108, 820086779, 2021326499, 1765173740, -327929170, 586453934, 201146036, 1441983175, 468303631, -1090240191, 1513580466, -1363835201, 2096821396, -23135427, 2002061351, -936174999, 560353245, -1148793347, -758975058, 871338889, -796476519, 1002234702, 595837181, 2036431935, 2003276032, 1055471853, -431401330, -1166153614, -1201781049, 1211399667, -1276117510, -922458482, 275217655, -862466421, -1113142572, -1489569817, -1466274157, 332101306, -922091745, 1593650431, -122733939, -180357837, -1882103570, -2105307334, 36878011, -508441463, 128899234, -827713609, -48616316, -1732750365, 629702385, 1343902997, 1092807604, 1959480024, -1333037817, -1997579676, -347103004, 64224501, -1359138870, 2008446907, 1835703113, -704970886, -1450508490, -285954566, 893595377, -1405252090, -386993417, -1694057107, -424112327, -381180577, 390840959, -243339747, -38764206, 521703739, 389594908, -1146134699, 1946083606, 460059479, -940727737, -141935894, 1052566329, 116340184, -487342807, 2070816542, 1609027088, 1706594255, 1782401515, 1413998425, 1969141882, -669052061, -1746080054, -421575750, 366105432, -243874340, 79114271, 124106473, -16445249, 569704427, -1783489083, 1999661589, -1259672152, -848974368, -624524346, -80850697, -1175332801, -2022836752, 872088857, -217170695, 1522158484, 1428413496, -494707109, 1637886653, 1369055485, -366552064, -1487991531, -1295560753, -289621772, 1338076683, -130410727, -402632884, -553282002, -2087732877, -678289971, -454693617, 733939101, 1289271149, -298116288, -62836922, -168752243, 1835799987, -1273098103, -671887429, -1114902271, -1089535323, -684339434, -1419341306, -651253893, -191971447, -918115025, 1530710541, -29820605, 382009149, 2038079246, -7965241, 1872006212, 721607113, -368812299, 1906853139, -255092060, -278683672, -803802484, -667269459, 1367682270, -1112221061, -1614423992, -732507692, 187341792, -1328567211, -390742029, -1093706785, -290708402, 1196365791, -1645090562, -1360426334, -101501034, -1375920165, 2045389510, -417379301, -1756563915, -1651486822, 603895502, -1024421141, -486697544, -847891281, 1742642987, -1831091374, 1305461636, -101467316, -2081223459, -1576657954, 585911016, -901318804, 1708685681, -512631078, 451720471, 501911016, -341354725, -37709793, 1030422263, -2065112010, -518106411, 1138580914, -1101677135, 1271579579, -23172928, -307047558, -456470881, -542780085, -1459066263, -140284470, 2084681674, 1365562240, 1965585599, 2075398031, 464396108, -535596202, 1445982137, -6349118, -990028563, -1755592802, -109636878, -284905225, -1761874636, 641542244, -710583489, -981054767, -953923843, -1331856481, 1436159785, 1053842682, -923804644, -1793295893, -1405641415, -1788170915, 1033171197, 1294424447, 2042105831, 458281924, -408451783, -35571745, -1796708174, -1459000249, -708486038, -429820606, 1867757068, 886527691, 2012802028, -1961425019, 381647008, -31461580, -345156826, 515631087, -1665837940, 2137325128, -541228817, -591456485, 582184664, -959569626, -547229851, 264104308, 2049752583, -1798500378, -228102705, 1073094773, -792162301, -664340773, 1020236710, 1912584726, -695642217, -80611880, 956268023, 1803396039, -365501940, -135682311, -711346570, -1831154233, -2100738169, -1418311938, 763326727, -1852201253, -2047968906, 685276085, -491069683, 418289789, 1673075694, 355265364, 1793113361, -974232396, -1552121703, -1906058237, -212394666, -1154536129, 2034336436, -291027887, -1038000622, 2071600923, 1944629162, 493216285, -1227050563, 839632236, -745357100, -585273185, 532217574, -776483410, 1889321200, 1898310521, 1136057661, -878725123, -1277507863, -1611715299, 877857992, -1390781330, -340622144, 1768278946, 933088786, 1410919013, 978150824, 1962259193, 485952302, -1387799639, -393940399, -261160012, -1040763817, -1453647293, -626999585, 105820927, 1307906846, 1498091925, 721459843, 1734005211, 746574621, 1977983935, -1478670516, -1318642979, -906602594, 1075442468, -1296776449, 1295169893, -26481854, -94584482, -977439086, 1426059158, 107179988, -1964066694, -1826377754, -2116802837, -331160903, 1609150517, -1167252346, 1588509323, -591479813, -1535976027, 1482523821, -557861927, 1885232371, -1536320625, 1742506353, -594060767, -1605098378, -1394499251, 1354776527, -73015648, -417695794, -458871686, 1314163438, -327375831, 1712061148, -1396463562, -1567175889, 3454433, 1479995561, -167862798, 608050754, -577788848, 1738779727, 1608119197, -1483744424, -876500379, 228917150, 623191565, 1072079137, -1236010323, -1429873407, -208013009, -813564982, -1796453035, -1561643652, 1127624623, -1554014163, -1380084037, -975314787, -1275352017, 1124948662, 962354473, 1979412924, 1213970668, 1171331685, -1226677377, 580383035, -1782809204, 1264289961, -1204874202, -232988990, -1943719731, -1485026609, 1464806098, 183728417, -1972371587, -766598916, 1949357990, 319858782, 123708950, -1911607462, -1396598809, -702416156, 814386164, -308329880, -993447585, 61737873, -1647401962, -504631187, 1427249915, -248132571, 1101427306, 1022327343, 1239338261, -669268121, -10633131, -655317807, -1615445251, 65876488, 83058483, 2012523196, 1410636217, -843267636, 1843987305, 39090148, 2145127566, -482423873, 1893880225, 310432735, -459843135, 1946033493, -1734889092, 2027600875, -521671838, 2006991275, 1190233016, -772580759, -914792231, -1370624165, -1884894804, -674068342, -861014547, -1468218757, -501636473, -2028243831, -449223483, -1946434762, 737010092, -588005667, -1476705052, -136160852, -1473030818, -110913296, -1391766339, 182421215, 982351723, -1528608211, -594605730, 1792239459, -102183564, -1309184036, 1564097223, -111593273, -669696057, -1627530322, -602101623, -1904840371, -1093564083, 1060381429, -140833414, 767844455, 198460474, -1454423494, 1823457548, 335296386, 997107753, -1198957511, 1487487521, -1948973391, -678202706, -805777422, -1354449735, -911682745, -1649148409, -1494693959, 2105405312, -1563572569, -115664159, 1823463902, 2092767666, -705146102, -927415598, 499076177, 1387105927, -1671031432, 315342591, 5169022, -674811123, -1954802991, -1934965383, -686858434, -1387297114, -1842378929, 347956716, 1982214638, 1652513171, -433038458, -1663977638, -338717515, -1649736958, 1657112942, 302956241, -604291695, -1913271683, 94141374, 1068920128, -1552271108, -1913796678, 322574910, 1419695945, 603411282, -983934225, 779687065, 633069368, -147388, -350293433, -420912177, 2105180774, 65092406, -659929218, 348587765, 164401877, 1154398305, -1889196456, 1833819753, -721740550, 878458058, -784076955, -806055149, 1547403996, 1342009805, 397185955, 485956506, 1135722419, 871836383, 2047437405, -1346623012, -2004024011, -1877203895, 1877508210, 1731274381, -865421552, 709344092, -469798435, -1151429513, -248627628, -1030388029, 1892331718, 89712837, 1226925115, -360784745, -668185203, -2062438221, 2134432177, -1441441535, 1602828362, 316333452, -44486, 1620234939, -1683229447, 86892164, 1466788781, -518380460, -1355881873, -1485914130, 381400936, 1440928454, 1903615544, -1955880961, -1886494780, 2044544670, -38042258, 1106041755, 610143233, -76335544, 1004872973, -539303753, -1345244987, -105767421, 1738930010, 2098153191, -604848655, 201121492, -1183336895, -507790254, -260281544, -169118279, 463147726, 1870368732, 1835732565, 1474054474, -1802288696, -1709468289, -1729932793, 819757372, -128721090, 1471291780, -1107485450, -913232895, -1720635389, 1581931649, 278949751, 1999677367, -999908502, -616580185, 1515174048, -235000326, -113970344, 1176721661, -1343499684, -2101885445, -1619419568, -1733266073, -1079530119, -185074026, -1931797731, 1379809855, 1179636759, 248817516, -1662704045, 1286600654, -1075482889, 1801536954, -1615463502, 1881583160, -1991061929, -381580308, -713598019, -545284310, 1166070721, 858011150, -1168417382, -934604792, -91626727, 919690754, -298289372, -2139946262, 1109727688, 1677426896, -1220551851, -1132991651, -761920932, -1485964223, -700097401, 1006242772, -1063761011, 1839606245, -2208876, -1413797857, 2015187381, 1873573659, -1493741700, 2130275626, 333118018, 974452783, -393294038, -15007778, 965675674, 1742515474, -105028654, 577986493, 1752383327, -1969021138, 469271525, 1691262709, -1700738692, 1653226154, 1994150396, -470455129, 1727528038, 486170571, 287569105, 913899782, -2109596525, 166184929, 460399046, -577161699, -842103190, 2124220605, -277168658, -1758332566, 1455171450, -1336096769, 89521893, 1380583295, 782048133, -523945015, -139547326, 1901976976, 441855362, 826731030, 1371652721, 1994599422, 210491786, -703373432, 2112836737, -574880409, 1545925224, 1428477641, -673747217, -792911501, -689509111, -1087776136, 2032077807, -2132091005, 1019606625, 1424740248, -157540713, 1511279806, -140855038, 424456459, -2088765733, 1332286519, -320631098, -480252335, 1772589716, -237469976, -371245688, 758910455, -1200996571, -632463957, -158558633, -958092185, 212330613, 1575817468, 902947108, -1676841404, -1010581053, -880916588, 1486579955, 636332511, 1960432943, 1889571368, 931249544, -1363711134, -1747153733, -939731942, -1215076957, -1010155326, -254675497, 2081705485, 295624958, -1655080187, -2075117649, -1706549394, -960643628, 503877609, 1998733004, 268383622, -275259519, -1923138205, -1753793796, 1597106166, 759432622, -1345258394, -1619477309, 1163427383, 438418316, 1877709760, -1363161113, 1805056487, -593679905, -134830186, -861868067, -1560167197, 575046585, -1319390675, 1774228187, -2060948197, 1909693635, 1792679631, -901182316, -922047630, -1655580642, 552942412, -1613164697, -891707222, -12634439, -1485965065, 119469373, -1933582618, 1839564774, 803773695, 1723472329, 1716657634, 1399422969, 460815284, 333747115, -1251591193, -1048049280, 915129471, -745074820, 625618239, 246966099, -261839313, -708858, -2065701571, 724991479, -1827639917, 744974022, -984581556, -1724171663, -810089368, -1964164297, -2130979962, 48191658, 1439990684, 1984959774, 2069028838, -1743912160, -1395685542, 1782148432, 1567064293, 974070255, 1301275715, -2035783682, -1585918059, 1916921465, -133243818, 1269002236, -427465475, -1377407347, -219056328, 372717899, 1407117616, 790247196, 195373381, -463196743, -151880222, 280964978, 805171033, 1870259105, -1115992857, 1481255628, -1749417098, -692597089, -1009441071, 337180224, 898790708, 2088459557, -310838793, -2093050013, -1449034348, -585239502, -1289853914, 197046963, 1905304988, 1329191682, -1230648324, -679875204, -417156551, -511994652, -1216350727, 267139253, -1593858065, 491374069, 1013881009, 1549602132, 255607343, 1040841157, 1307811693, -268926744, 1971071825, 2146132976, 1479763447, 1554242083, -914338334, -1015378938, -36164000, 2081517251, -1006880151, -1518580163, -1627835539, 1458075883, -1523619730, 1746468862, -1198305884, -1369479547, -141836805, 370709861, 992136347, -2087119769, 1153085942, 2072654738, -1971947662, 1625388686, -1695041963, 1697930093, -1056268179, -1802763895, 889102398, -1167537092, 46639025, -783161439, -35725997, -1452483645, -422220294, 1782660600, -215598104, -337745769, -1391511785, 56601924, -553458989, 735850545, 1795897386, 726608803, -1498545102, -1098326751, -697591450, 525033024, -546633272, 621725543, -1039903940, -30565532, -2458730, -278199824, -1904540755, 342152159, 1179754447, -73035777, -1343346292, -1209204164, 1794372686, 2013536189, -807153014, -297002839, 2146602860, -1738636307, -408167670, -15184407, -254866433, 916616764, -888558273, -1336846367, -1887840336, 1561351405, -373371562, -1043202416, -574113550, -1496797881, -992134249, 243098875, 524084565, 910146179, 1157225202, -518320118, 1068733385, 1797773099, 385623715, -991376937, -975543936, -436781174, 475889625, -1125294222, 2016593172, -332674613, 1338829554, -508596257, -388735530, -809849988, 954432936, -2108310986, 1002666595, 637597944, -167727348, 321389125, -1036209592, 2116541064, -2061240071, 1983197729, -741061977, 1267543619, 1416460907, -77626098, 445037948, 32207979, 730063004, -1389290567, 831433612, -966650985, 1466558662, -1753840027, -889985538, -668064541, 1624937951, 1509610493, -1970600728, -748836594, 1325053789, -473257498, 1965397227, -492900822, -571636565, -687084136, 2093222986, -1257561868, 1924740515, -1643130598, 1858326283, 1425411989, -507668329, 1797566492, -454309856, 1744415168, -1808525393, 1828632689, -270369528, -1873492347, 1880946133, -1138675821, -272727040, -1481185934, -671189112, -1209010605, -1150408296, 1337490255, 829358729, -852774957, -488313646, 1039378391, 240434001, -1640239144, -609583206, 402190695, 418371813, -832700883, -493705320, 1454204100, 2141960183, -175339649, -1889431777, -546128954, 1969012190, -1628426795, 1431217689, 1735357666, 1415209613, -684225041, 1969934885, -1124404740, 1566934919, -577509899, -342269705, 2098157798, -973621630, 376298917, -2093376373, 2146754458, 923235020, 1297242206, 249379272, -824883265, 1171357329, -1086649023, -885541258, -1065489953, -1172246190, 173666075, 2038472730, 263882967, -702565061, -1123170600, -28281490, -2024086322, 98486402, -234136730, -641237805, -173287953, -1394362338, 2013578309, 1322747825, 1887257412, 358437196, -1029202559, 2138466011, -407865719, -1241574279, -119054745, 1660420005, 1196422613, 2139353005, 1979106986, -1075790350, -64433689, -552685861, -20696531, -1305205032, 365669862, 2076783940, 881849681, 2038455423, 1473228920, -880607887, 1954511166, 1171891684, 2016692655, 1440670907, -689253121, -568732834, -1305782027, -118010106, -1358477416, 1250678973, 2004796269, -1058330250, -556121929, 1253250069, 1254584375, -1133684708, -405014870, 1682220702, -719479543, 1000703208, -782507562, 1625012140, -838891656, 1230514870, -657035213, 1840440290, -582493849, -1658313805, -381137467, 1793004650, 395451319, 1060789189, 919112314, 875097944, -609222609, -961488643, -1885977777, -644924195, 939095551, -168873927, -1782562, 2068556164, -527976450, -1501990778, -173187360, 2046074484, -241184760, -1460489228, -299618465, 268143075, -963381774, 1322356644, 249736759, 1769889791, 904651591, -1297852773, -1721947145, -2112433079, 382311601, -1244253718, -604724563, -728000019, -1287030437, -1914060473, -1615837198, 2114241135, -80341637, 2141385475, -1981754559, 1089625064, -252953115, 1184018265, -1743648769, -204039160, 597306252, -1380604065, -367924466, -748738954, -1111094692, 1522495147, 1195998196, -481321809, -423847123, 2124983248, -462381440, -1435265432, 2001164154, -1201450291, 448311436, 489193330, -1531522349, -2002150936, 1047888593, -1962993057, -1249816447, -1610678991, 402322154, -2041077597, 537613385, 1576988365, 2120933624, 1724250494, 1754082216, -1053195158, 2056985262, 1169428962, -1309173856, 859677153, -1420948657, -1478444281, 979743707, 1935494783, -1765034401, -88914710, -84228005, 760159984, -661538836, -1691688560, 2041286258, 976712536, -2017826495, -1407624785, 1223329615, 754865555, -559274040, -2026828923, -82168629, 2074828074, 466485103, -116732424, 192076461, -610591753, -45919311, -1782268707, -2143712569, 1475301131, -1737367179, -310501625, 2063088228, 1416315543, 228254965, -360715813, 425206947, -1267593820, -5598677, 662560977, -256029961, 2047876511, -325578906, 1318567780, -1210487687, -1418278226, 2124192162, 135810061, -1738309972, 1457470520, 1860766911, -1880310380, -2027138347, 679072566, 1872695587, -1495600178, 871586398, -548424265, 779053026, -645376193, 807956289, 1398514470, 615448006, -303425594, -1075256975, -399798417, 1529143173, -1050343961, -1452464405, -1178742945, 2102358723, 1252318742, -806099495, 592615448, 2137968187, -680542368, -735805517, 997673957, 1718819762, -1681877187, -176621953, -1488832230, -873186313, -652480180, -1812650948, -2028397611, -1949298029, 1321321675, 1049370620, -1013324975, -2078864060, 1001247683, -612675365, -330779929, -986556164, -1378124979, -2016295726, 1217062718, -1715774523, -428329792, -647677322, -73504625, 1736380732, -1413844300, -1421317121, 1336760444, -427925856, -1061383246, -409055598, 1849531003, -155533981, 1024876332, -65160713, 1683115219, 1279070049, 1477971415, 207566459, -1550111607, -1866082838, -2094058965, -583045351, -1770332731, 1599451379, -1380136677, -742689, -1564732788, -625371297, -2086097229, 381214158, 448068654, -809764533, -287347349, -162835027, 500333196, -1391108632, -142885967, 339695144, -2058357643, 1599252859, 2104419948, -808007907, -341706773, 1234509468, -2052814296, 495625031, -1152044308, 1726417934, -612859927, -286376538, -1395798540, -1125651095, -437039385, 1250369883, -1342845619, -532862905, 1340761512, -441176084, -746607598, 1256861930, -1248891369, -214144116, -269001298, -419327971, 1212225636, 1521744194, -1586682754, -541106365, -99903550, -217888852, -1598555394, 973775627, -148399923, 95040763, 691811642, -1974335203, -1839980115, -939891305, 1138241145, 1321078330, -43189701, -20101531, 1045755414, -1244571555, -321386250, -1584543493, 1383729732, -777285148, -1380755286, -1011376349, 2097358494, 1879008205, -1760226135, -638033447, -199506059, 405011791, -741103981, 1492318551, 510470884, -1428072570, -652418049, -1226344889, 1749710680, -864260849, 1209122092, -1489048240, -1970671842, 2072755461, -1279001995, -1669070727, -108379340, 749651813, 1667077748, -1123602050, -520618354, 1508647918, 979336971, 1960809886, -1766884038, 1085298452, -420074271, -313637298, -317676253, -1735970014, -1210293535, -1048099602, 261853238, -1248903434, 15235623, -1426584387, -1972505754, -881849430, -321793205, -2044112884, 2118673451, -2145755887, 1095306550, -501770936, -1430833093, 2021572329, -373769299, 505407127, -742345478, -738407019, 627307709, -2032195426, -1659996462, 1930114170, -1627535153, -744513596, -356315009, -23728952, -292720775, 214231139, 1004945091, 984052287, -1612771854, -1784097491, -1770203810, -1256803843, 738591557, -538653595, 1878257128, 697561855, -367480833, -476333774, -1825512262, -751596417, 1736087471, -1187437635, -93484271, 495599414, -575191498, -1329916299, 804775098, 1649931500, -1582930234, 919739219, -1695295682, 1889686807, -1881057089, -738264931, 1058707560, -1417952544, 241772747, -588524037, -57711767, 1517200368, 417180388, -1093700865, 290976240, 1578705884, 265672171, 790584053, 1228225591, 1675499005, 1274325131, 2013100069, 2057821582, 2110938413, -1771132209, 1637819575, -363716065, 915100220, -1251741873, -1456504285, -903691277, 228586404, -1354823000, -2114217202, 1762453131, 1556177263, -1428678853, -1258566007, 1473420788, 631991403, 772402933, -1940163621, -1707530721, -1654965279, 681020885, -213588034, -1059564967, 1199297468, 1231663983, 419892780, 785357959, -240900348, 1315551382, 2010584589, -361178950, 1404769984, -738413572, 1709950451, -1322135877, -797175551, 33379454, 1080149254, 298014087, -1106974909, -392466975, 229702155, -1432728459, 1609386834, 751504231, -688502197, 1953642648, -1344677963, -552638032, -574850975, 1096180344, 1801427285, -2002261249, -489004865, -1098179769, 1639934717, -1101248277, 1930642738, -303119621, 53961091, -1832335329, 313682255, -723530935, -940392653, 1596578607, -1564881666, -1646975110, -1217939150, 1441277702, 1681877239, 2076532029, -843420107, -313639826, -4930133, 2044107851, -2119935651, 1894805958, 1449232615, 900234990, 796830034, -890018061, 1952024377, 2004520885, -1084656177, 1611224694, -893776846, -569449615, 607906865, 1204986899, -559976461, 1584602925, -1777690576, -1879091272, -1295106766, 1389945809, 1547674111, -290138421, -488400649, -1592331628, -1390445582, -443825329, -1426997378, -1633576641, 1978626970, 2021780662, 1777578022, 1466957538, -1343166987, 1835886906, -141434893, 126121815, 824490166, -52246266, -382474433, -608110706, 1683476574, 559688687, 90341528, 1630519603, 941991211, -416714369, -644359302, -1959753478, -568087780, 2076044139, 366802718, 934651293, -41096399, 90232617, -988056915, -713755583, -1321207330, 533329403, 1204418554, -1128890613, 777045546, 1968915647, 791135858, -237055849, -340319637, -1958301733, -1686716659, 1005172935, 1769012619, 1597538714, 1441252345, -280077683, 1396679512, 1200173430, -529531327, -912048228, -453640935, -84047024, -488387691, 1380368164, 1981868795, -1612730413, 1857880135, -17945889, -805410479, -1896093926, 1072125928, -1595155621, -167809424, -1897174929, 1553241246, -1833028945, -987175812, -1308946154, -90200643, 297616702, 1052961616, -569002368, 696466761, 136102750, -637291860, -1780391492, -204363369, -116493701, -882146368, -102821554, -658392593, -2049974577, -844783005, 1296861886, -1200000245, -2039747704, 384606248, 653578407, 1862355245, 118366131, -755989164, -1026976217, -1293795134, 938384423, -100807599, -1137457250, -90790145, -144566037, 1243470975, 1063687771, 86354407, 736615265, -1338591147, 1448469160, 485617736, 1909916540, -1074151129, -877888765, 695072742, -163203815, -724477523, 2119376267, -1227107470, -1804321197, 2145072609, -1170133777, -33395866, 2106388203, 1303347068, -2016072566, 1555828036, 1887747259, 1136121553, 1892795968, -1976235548, 2126382799, -160750628, -1781406029, -536518853, -1435427223, -37289508, -174852243, -1283836458, -1752597320, -271995672, -10832683, -100357663, 588204510, -1265908817, 342792419, 596140590, -1301106789, -1097632604, 329414627, 243360811, -874116441, 47624799, -376018553, 794545371, -121233775, -1873788946, -554920139, 531355346, 1033331822, -402259017, 1055363027, -844518955, 1609069294, -215526855, 1860056842, -759974439, -266479356, -181580320, 1559817080, -1812052601, -1855224719, 1469574567, -1658102922, -37667029, -476809451, -1970884136, 528459175, -308370570, 911993254, -1629713273, 2142102460, -818048843, -351059814, -981898137, -1485217330, 544385267, -1337599356, -1886590371, -879768363, 1929246126, -776489582, -920060462, -658005070, 551233278, 620196422, 351098081, 439858875, -296505944, 1234751596, -822089990, 1983250874, 824996771, -1342543294, 2142998814, -1258050087, 90693094, -1065944133, -373448504, -1771395714, 1868287421, -1046026250, -717690651, -1091694107, -1185827835, 1804251182, -1038657429, -1288375269, -1542544422, -1296468484, -520810467, -1797318923, 1396904862, 1259107426, -1019818021, 1374517325, 1879587215, 472819943, 636360182, -1350611583, -1264793328, 97478489, 699914933, -1834246675, -1685931342, -300637269, -26925480, 987720326, 599391422, -678418570, -1504110659, 2066388618, -679529457, 1064879116, 1235774166, -1772888370, -1133035842, 514479336, -1251951781, 704869882, -546140327, -1414601803, -1418986202, -2021640100, -62557755, 1333452376, -313262438, 1269214807, 903786269, 1066615143, -18760842, -555966668, -1430692031, 430770069, 1708431239, 2140504028, -797601224, -568441857, 534252715, -272879825, 707019242, -1274512025, -316037359, -450036303, 1429296866, -928238530, 319454135, 1376599973, 913968089, 2088544481, -806137022, -786665737, -349492853, -1624987328, -1067456427, -582788569, 2020116932, -754983365, -202862940, -199980319, 1844834897, -1583318600, -1977715176, 1211141070, -701339469, -1400978334, -221315975, 1183246831, -1713376563, -1347661802, -618324673, 1238022956, -1236650177, 903855058, -805920760, 2040398519, 2007258116, -1677941173, 306874844, -1312848086, -602030223, -257606316, -400621639, 1960020910, 2072236959, 1507747365, 755287749, 2070107103, 1291524027, 1075683077, 1903142686, -1233827916, -894363256, 1938882206, 1869583333, -1757005951, 762384361, -1892137335, -609570353, 1755172772, 1626534298, -1444358692, 784190591, -746480552, -1044310107, -1412199657, -1196827693, -585766067, 1315735387, -193291604, -42871797, -771266863, 71396686, -611106594, 1400822056, 1155063010, 1195159254, -622932372, 1822209296, 2039613723, -1193663267, -63148860, -1753894166, -1795110102, -302268493, -818738793, 1574727742, 269354357, -3817249, -1327730529, 1722460149, 976262331, 439173126, -257102147, 774565643, -449766371, 608161734, 255391598, -308269877, -692735129, -1376396466, 1757047249, -635439529, -1045191575, 1152705736, -908435121, -854769202, 919324829, 1016127250, -1215268865, -1909615180, 2042836683, 594067199, -996379495, -339199653, -1720722893, -941130491, -1855495393, -910691907, 2013847219, 261042371, -1027673879, -169136617, -927646593, 874867807, -145575255, -50669782, 1711123727, 1146969323, -762290394, 52583706, -1261235481, -1882771029, 269916267, -1524634704, -1087133642, 541484490, -748540904, -2098645753, -688184119, 1878566207, 662537417, -1629513881, -1162381417, -1125662244, -1743501323, -872722332, 39385849, 163217575, 1232186719, 12254823, -1565488458, 1452903248, 62897011, 574364140, 1697496924, 530837121, -1583186386, 668135123, -1344304347, 1502445324, 179756963, 1333754711, 2053916652, -721316593, 1021097210, -1778658337, -1645337501, 1006448916, 985448378, -1730266993, -607810012, -944987076, -606734062, 2118549023, -1874389090, 1820666259, 698379822, 1734518811, -311447546, 1739357637, 1573565731, -1080086123, 1265677136, 481670331, -179394175, 171359566, -2014590034, -346275358, -1552825138, 260943239, 1819632602, 1777509627, 384219483, 2043472369, 1813972182, -69304322, -646658926, -537271758, 1913055890, -550015286, 1048593849, 821949639, -1479905746, -1680183646, -1104429524, -632824462, -580209973, -1074006896, -427387103, -856397965, -691045595, -1860473457, -168237603, -1002919200, 1788843647, -311619338, -9766025, -1028508860, -2143619432, 894196949, -413666137, -503914043, -1012125784, -296812929, -77153082, 2135367244, 258994970, -2107476363, -164925181, -731172038, -782355076, 2044190233, 218024653, -429745046, 1731509803, 1192689068, -684106352, 657229849, -1487621176, -543713704, 1597051064, 970504917, -1738615813, 1941774071, -1600547679, 1398400143, -845316768, 2085812766, -890123291, -1137858643, -1946408643, 811576727, -563823369, -7503129, -337080253, 667015977, 1893166199, -572019043, -136690473, 2017108671, -891480375, -1451985974, -1304462368, 2027862751, 511637183, -125691317, 594617214, -1621459018, 973807731, -1765744388, -1424197585, -1972001330, -1949689014, -1688756427, -1110324257, 1018086663, -1583455699, -1839870528, -313937218, -746443868, -1412876089, 1422303772, 127622193, -341447035, 1723731037, 1700662782, 400575777, 251011016, -160000281, 525254671, -1263219700, -939693830, 734841147, -1561200301, -1014784247, -2006975110, 737683939, 653311482, -1525037743, 1905734341, -53331990, 776810029, 729144878, 1824201581, 2120084823, 877606911, -27045495, -753010824, 392344791, -1122570939, -646859280, 1468815341, 1462737833, -607862948, -1453403822, -861695491, -1503516947, 827587694, 1262023554, 610785302, -644409462, -386403846, -392976180, 953018238, -1489642211, -1144290882, -878224877, 2138866655, -240773181, -135054459, -622529598, -1252404450, 1400279797, -2141108485, -1619823041, 784808862, 176777956, 1943980202, -658557994, -947985991, -609831177, -1153892499, 1059499220, 791752186, -1345905399, -1108989466, -690018146, 653883568, 1999768766, 1537170288, 1072258367, -1331506443, 1117097082, -411201593, 833344372, 1612088987, -1381426046, -651777837, 64877243, 790740293, -145049683, 1948711703, 1908617774, -648001182, -178983023, 1868179015, -688435556, -228502795, 1027039231, -2008720933, 981926267, 1927741174, 2012740900, -698506645, 1293302286, -1110223937, -1002476549, 920637008, -1152555476, -1477400241, -206482981, 506816510, 892768635, 1797106044, -1686924932, 1898038048, -1632222229, -1779924406, 1839566297, -206576905, -898577328, -1347220559, -1346999738, 1959884081, 1820274204, 893909219, -1372962915, -1776390829, -1760018649, 1393466172, -272813340, -1807860862, 1597091545, 853795568, -265760342, 2103999951, 1968126087, -286966789, 1023664254, 611917322, -1406898179, -1619562916, 1887287647, 1235189566, 1849724733, -807581960, -841690150, 343488016, 381704778, 1163644793, 1125312714, 1239363567, 2047745779, -1570724429, 1068654573, -657025172, -439433988, 1192129400, 710732569, 795619582, 1655249595, 513796295, -1517775519, 182844191, -1883558231, 1987037595, 2071776264, 535418351, 654177044, -282098873, -1380778115, 1580252934, -773048163, 106469227, -500724741, 1072636429, -1387175314, 2043285354, 2066777521, 623565007, -1048782724, -257771105, 1368125110, -1993683368, -1487558733, -682275781, -312312259, -398004880, -404119461, 2075845619, -1198309196, 757051262, -611465793, -1376798548, 133412012, 509568549, 998119557, 1739368091, -219733571, -574904094, 934257748, 1007625683, 907844790, -2121383978, -174581281, -2013314981, -350803681, 429840030, -371565558, -10994103, -1658962182, 157807954, 707497705, -1686402655, 1754720637, -1887776161, -1629826061, -67340219, -1459664268, -848886512, -164175010, -1763788140, -298206212, 2016389927, 1732742868, 1910694178, 1664322381, 1505697540, -1227805023, 456772344, 2049889180, 465910088, 575231465, -1578716973, -1158278030, -960656810, 831761403, 895120489, -798982366, -1244159436, -1763353102, -189396714, 940487132, -405979785, -530325118, -55937856, -1370612424, -1007794331, 266299566, 2027101546, 1194850285, 1903939007, 216849948, -1574119339, 1840101924, -499385356, 1314284523, -1217987158, 1479074609, -613171049, 2030021272, 572223397, -238989777, -142893057, 680165006, 123454049, -1694864199, -1271850587, 1103373455, -409675447, 469175267, 1440963127, 1062321793, 2041855080, 464368888, 1610386428, -1874377268, 1945032028, 1825238399, -198499988, 1608456928, -455925031, 2080282171, -75753244, -2014318833, -1189291685, 1674404078, -172472478, -1640672787, 228382290, -473924166, 733449165, 130530657, 1811509734, 2032045477, 2058848235, 335280458, -1812023043, 1760142623, 1950964734, -2072190137, -932588938, 1261815979, 1564243522, 685178275, 1466156887, 1581972127, 466663055, 2028656043, -1040591010, -824820394, 1924395381, 133289376, -127234585, -93913281, 1761561811, 1169041230, -1516837410, 1868271461, -1360449682, -349866025, 146761212, 1857414835, -81369872, -1888840238, -1307005052, -269976774, 1406612953, -737627160, -1933333013, -1943677237, -1721338115, -422077075, -200371265, 1022404652, -1126908844, -1972990647, 97970764, -171787805, 926059004, -1697930085, 1053227807, 1145353895, 1779416024, 435056967, -1451838484, 928093994, 1475115506, -1100202812, -960834900, -281156935, -1577585198, -380763393, 355736843, -894912069, -1237454923, -29738369, -54341856, 2072683467, 1260410827, -1936124110, 176524543, 933551001, -1630602310, 796915889, 732540104, -2104108898, -427810440, -619381815, 1668757212, 1726543141, 1735085533, -1298565412, 391309777, 1905400232, 1450294958, -296494125, -146058915, -639055689, -1207603633, 351038428, 1195959224, 383110905, 1343997774, 925867676, -1437139488, 527841165, -392204386, -1075573490, 2097843647, 1375429704, 833451899, -2058256603, 1949185555, -428352154, -45911809, -711623819, -345519248, -1881260033, 1760842616, 1788188617, -1531487516, 693743132, -328324583, -1864511664, -144734242, -318788426, 113567278, 2076615582, -32966694, 1507111129, -63632299, 1889288640, -153164747, -251806165, -2108325940, 1494793259, -42469476, -330809934, 883879530, -411267630, -714522718, -1902299632, -1641162852, 232435432, -157025294, 215837355, 1072057174, -9003805, 1763075442, 1691610763, -1488408189, -274517409, 264233944, -937614266, -1104924135, -1741038880, 936739671, -960041911, 1655208089, 1392031470, -1400984942, 2020693498, -62194972, 787700513, -627823708, -1827148543, 2125084497, 2096657124, -23549555, 986178466, 1649257214, -1058289181, -1713757283, -1682469875, 710899354, -2047139361, -54909945, -489757839, -1116478926, -685529837, 1277319990, -1001431083, 659629948, -828925631, 1793898318, -1580856306, 926640366, 1328041133, 1055278898, 2080361195, -370400080, 2096824071, -17943036, 1247902700, 1853813750, 355544003, 310505709, 892118767, 323940267, 1901062043, 1776694711, -172651159, 2010085323, 1890524156, -1504816865, -719248554, -1028048610, 654141530, -1921054951, -1185133983, -57441230, -1518077848, 1306089646, 1650406518, -1796747133, 503270819, 27712888, -743818243, 178968572, -1267520329, 1312563019, -1359206533, -168843263, -1801630145, -1448088139, -1141578066, -1017366405, 1694870907, -12451031, 324762591, 1413225558, -2047898809, -129401828, 2142796203, 712660991, -777645302, -391725113, 1428418460, 1446474023, -1240075109, 1926943804, 809518975, 1627011495, 1755655219, -690246422, -812854329, -672352873, 1374152993, 639983197, -325064705, -198018856, 998027004, -805440713, -1925936205, -1317955061, 299700446, -752632135, 1259840672, 1369145619, 793896358, 146889309, -461367233, 1554962994, -154414597, -681800896, -1825713793, 1109097174, 1418305248, -1364998002, -941663889, 1821815055, -496592458, -2104470088, 1530641906, 772773341, -1407128136, 1565468122, 197363069, 1600284636, 1123587204, 243724254, -1486697624, 589970602, -341132903, -817500743, 607807200, -1478784234, -419804550, 694335308, -643280003, -1162320081, 399485562, -741232910, 1326499337, -84858750, 1401819857, -654807677, -353651476, -1158457073, -1900925761, 467645288, 1919830643, -1606813988, -833815392, -250310543, -1521514215, -1235163105, -112868747, 1188432666, 1582030296, -785595337, 301389529, 1599584633, -1444078564, -1881673603, -1420633378, -1287035936, -442038226, -144857237, -1233484431, -755182608, -555883846, 1537204938, -1608403264, 115396319, -283805642, 980155207, -60686740, -1662393541, -2141980890, -582713463, -1037263817, -420586585, -2064455557, -280232519, 2074924475, 1991069109, -839003130, 1431243114, 563508845, 981202377, 1240869112, -617978243, -1747134663, -1143483517, -2047781034, 316675423, 1306175124, 645640574, -470499307, -536748051, -1812073379, 392999636, 390035912, -517252433, -209733917, 1064481361, -1876232455, -1010595701, -1823536400, -1925662949, -732172461, -1157466930, 1700898642, 2056317815, -1150388346, -167011415, 721175516, 767445747, 637069073, 393196623, -275319257, -913000143, -1831765015, -445718731, -1411085423, 501208279, 1693080541, -554633314, -2023390851, 1730148379, -1721990260, 1997492168, 2126690716, 1806344856, -1481177346, -1408992553, -1966149173, 375744048, -390502032, 461514711, -628500591, 1457786170, 1773334966, 1532345689, 1687313199, 422208959, 1723680488, 788763242, 1238380113, -2132570940, 1996954968, 2123307735, -987758836, -878041420, 264435199, 612427887, -754037778, 1469307591, 703038247, -1898185210, 1067597935, -1271512236, -2091393211, 1767664383, -229857626, -1983892548, 138798076, -1288007477, -1833533640, -1618546985, 477810548, 1832910176, -750142994, 1854552453, 1934749973, -830510522, -2143335753, -798052568, -1030395916, -662146453, 2045435202, 1275873140, 66806313, 1664281702, -282686609, 264286583, 977272069, 409966627, 2035128531, 1236241790, 148571797, 1300506909, 1273667966, -1552963601, 1422268195, 2121617292, -1007740714, 1971183533, 1533397663, -607829692, -1512117868, 928891094, -1095528163, 1358435243, -66810132, 1744447201, 2109351155, 1011941373, 1643256825, 723597374, -427353301, 1884919279, -87901961, -610143402, -1800672321, -1135822216, -1680836720, -692150974, 1377673063, -166340265, 783320644, 109114865, -1279816678, -1220802265, -404557857, 1501936941, -1097384188, 2105531374, 1463195891, -903259837, 1588017324, 941019931, 650050193, -2063791949, -1720026201, 343811592, 1011506850, -953446261, -1672331001, 1583771154, 381774296, -1928833189, -1977418377, 1325911411, -1208310078, 1661708458, 83831289, -12853514, -1326860076, -773424982, -692020825, -1363034242, -214049447, 953436175, -1053709161, 1749890583, 300171993, -94737482, -1729541122, 229068379, -2091373089, -350069684, -1471047140, -186955303, -1996816788, -537851804, -427892755, 1009063687, -503894045, 1061372298, 897546522, -1223589373, -1291267111, -1771486787, 1921992271, 228660261, -468338101, -406736888, 616413055, -1414752890, -465088054, 1630645757, -724727116, -1093689755, 141279133, 231795931, -1387242548, -886020786, 1047239714, -380716843, 1937727093, -1888978719, -1469564414, -60238607, 1513471915, 988543929, -719619047, -1962941370, -311885715, -354258659, 216758818, -682778614, 1381474981, -1258831139, -395121541, -586905361, 1220304767, 1595921453, -176916632, -630245246, -1322722314, 990905559, -483927197, -1293683654, -1516788738, -1716652233, -1268874676, -1242825825, -1923795425, -5620548, -751316614, -1753894915, 510327887, -1254952124, -4224435, 1878874636, -690741661, 1626957069, -1447834243, 1848228872, -1103413897, 1580551032, -1489061891, 909383661, -2098622784, 452833857, 1129112151, -860446212, -798194141, 1472801427, 343646236, -676884221, 2097298970, -945221153, 2123181810, -463874050, 897503334, -1794180616, 438284516, 1933455287, 716356378, -566393325, 1490369174, -1730527292, 1875372391, -1011982344, 1232141098, -95617122, 1523672879, 1737932799, 1976523797, -326313683, -1072900298, -210942536, 943171101, 1708142662, 1986454199, 100621547, -1798740479, -883148867, -1107631782, 1035391586, 803091456, -2094128261, -1158023577, -279448021, -1936081476, 1994597686, 230183951, 1555144180, 605013142, 1043165886, -1972128427, 2101075165, 1540223902, -143292590, -708327102, 681029716, 439001341, -1242621883, 1017970671, -1769338225, -967267255, -140756487, 1571810971, -883170123, -372207223, -209078183, 829879001, -1217070121, -31984746, -1087266510, 993778079, -2001038280, 979024334, -471217857, -682954690, -909392130, 914299306, -797492617, 863718947, -1344707489, -21530811, -59697748, -512875234, -2037680132, 1310574604, -1465688583, -39877853, 311085167, 39517070, -1876565181, 1372423150, -654056654, -449460949, 843802605, 1493227440, 1444067233, 1647965801, -1135652625, -1408311155, 1323608419, -549164345, -1235694385, 659140014, -1460385832, 2143014297, 1333616371, -842044621, 1723017297, 1257275384, 1270701927, -247870669, -810360411, -1196605517, 2126550529, -1533038413, -1045094669, -872949046, -237686258, -1083472218, 1096478270, 1539042013, -1536112970, 2113627486, -369547269, 128377511, -67678227, -960816317, 1743510653, -310935953, 388354159, -1392548423, 1663032657, -135100982, -171091320, 291465685, 1945632667, -118627959, 1942869169, -83539805, 1944387182, -1447824143, 728936777, -338432502, 1391776225, -1211911055, 2109440968, -896544074, -1415815956, -1447041466, -2036380449, -309915890, 264204221, -469916511, 2056059702, 355607211, -478701581, -1624438363, -915473479, 454027796, 531391219, -948298196, 737954459, -1267280932, -77962141, -22233885, -597814786, 900465354, 1596232174, 2126094328, 963505812, -236012783, 1875934546, 1463247525, 1807395903, -555068589, -1760961549, -232178417, 1790492644, 161141890, -298603043, -852595080, -352738763, -472364122, 1970896469, -1994566517, 1908581689, 1626596846, 329139865, -184852728, 897016408, 172580164, 1284714057, -1153750948, 2066134282, -742664526, 1911289462, -770369433, -1982318749, 14340431, 2056873708, -2095398967, 1816867835, -1909261417, -1932641077, -864018538, -1148680824, -1378699700, 492407643, 1381582626, -830839846, 1811457658, -8964826, -1312115225, -1181904787, 781231847, -1193485163, -499664458, -283793585, -206195854, -134533619, -1055566450, -176676611, 2144886662, -105912410, 1258093681, 1570037282, -2017107838, 1198012839, 972815348, -1285503737, -853545900, -419975260, -46439195, -21894562, 789567400, 1395060176, 926011295, 2091342795, -440814689, -1218254972, 735226407, 1556862924, 1541716584, -308449835, -275288522, -965018109, 952085098, -2136172419, 494866269, -118690127, 1244930794, 1058469848, -731777121, -1877877299, -1569038023, 140697153, -1221632394, -1510626181, -760647748, -1183169849, 1408892021, -725718017, 2124406035, 1676368879, -798566598, -1578373368, -2048824421, -901937658, -170314239, -631647902, -538420793, -1119213217, -2016665077, -744489599, -373043479, -1573817430, -1294799383, -610242577, -680640605, 1342451746, 1430216141, 968457243, 1056826821, -1354108161, -924153867, -203491931, -365165730, -125837890, 841454902, -1819209586, 320542667, -1631425153, -1652563726, 1327876054, 1450038912, -1744077050, -1602814079, 225420155, -1675983889, -1126876620, -827987286, -1866754526, 788394391, -42074389, -1101960498, 1556522134, -1342802234, -841713825, -8243187, 1950814285, -997496928, -731930973, 1014922456, -1227910257, 1579379838, 1767665335, -1693554064, 1026776101, 763883999, -339560359, 1841104746, -63366226, 1151621194, 1843693181, -448516271, -973219047, -610362, -62182659, -1082964285, 1263591439, 2134981031, 850734347, 454534622, 1331133297, 591198007, -2007701362, 1358185765, -184781073, -364573949, 2003406802, -1000236249, 215339315, -1100187263, 383401322, 593255873, 1706970799, 2008063620, -717544028, -1570628803, 1120676429, 1976579310, 1743235833, -739292129, 1896870853, 2045609301, 1961612534, 1768585404, -1347773237, 903863267, 1784841711, -960687782, 966355579, 1953840384, 2074971715, -1455211621, 795375333, -459059787, 1400557507, -2031174451, -2028016989, 707395809, 1771893560, -615523669, 1779801150, 1856732872, -2000054250, -157386524, -1001468046, -369697147, 1441682543, -930242731, 1720040266, 60951714, 695092170, -1083623774, 1655158764, -1903830101, -13460428, -161002138, 1569151407, 59729386, -157226060, 855085502, -105009205, -1885374879, 737520055, -752923752, -1343622474, -1355957337, 1657895837, 1964850218, 1581002734, -1579229595, -1950011394, -1135339686, -349708097, -1908477622, -1782345584, 989348085, 1291301056, -2021219395, 784756267, -167810398, -1856844677, -559675203, 1971640047, -621449684, -501453227, 2098687496, 321529839, -1604899700, 872414055, 2084805796, 1493917023, -601439479, -1027721954, -1242766312, 2027940862, -1391097692, 447932786, 818389185, 87119629, 911785327, -1001891805, -908756423, 1542009271, -1541687321, 674806943, -1426022454, -2137841446, 465968816, -1642835537, -1229850799, -1294068741, 1566552277, -1315479734, 1497673309, -1864799747, 1414194110, 269729686, 1225218429, 1057001033, -2140158561, 656107052, 500070887, -801417970, -785142220, 2006674793, -771158443, -784047361, -53346649, -1975067754, 2011818622, 2135076699, 1255600666, -425559010, -1617851705, -387778040, -1499545761, -1501110823, -848937540, -750020451, 619635477, 1296418492, 1962430150, -878876115, -450889569, -1569464978, -841283238, 1060249942, 433041110, -1753034459, -114623723, -443750019, 1712292725, 1477921441, 530446775, 111200948, -695963148, -1458986573, -470121606, 1910099421, 519933353, -74487689, -2111852677, -1363939099, -1628657915, 2141043065, -1998928846, -1649955618, -681896157, 1736566124, 1415919615, -2041999027, 231694876, -743204813, -39684839, 1695013763, 761576095, 397285125, -937762946, -24327943, -1434891909, -1821507944, -1387250118, 1016332584, 2123161324, -877045449, 2053757287, 619636687, 987410339, -925512765, 1647978102, -1279397242, 116542948, 1631406194, -1794452995, 716725969, -1217499084, 1763356854, 1605287618, 296784327, -1516295756, 752097083, -1538803059, 2134414136, 1375067282, -1628873762, 1692922294, -1522882804, 1647627858, -407155059, 1444257940, 1854806171, 1006064213, -1519428938, 1581759601, 1819782879, 109610871, 469775397, -623036490, -122721994, -704121887, -1847989763, -458519576, -113930388, 1391103371, -396997131, 1546080750, 1530584407, 1336338687, 1188928486, -1294604215, 1592687316, 1528135576, 1432927615, 1961317231, -1930367332, 1935267902, -1387355855, 1861466718, -944272889, -850240640, -41208454, 1973364929, -1916477521, -1476913315, -39187188, -1874129604, -1245932139, -725626373, -1884909947, -1491600696, -1931327607, 141462221, 700388221, -239779066, -473999435, 1576865325, -695785019, -1403668634, 1186533788, -1212751144, -1647926542, 350660803, 985105539, -1713524735, 747096704, -1143376257, -84213296, 1869065067, 1336866527, -438173353, -1313354533, 1926753733, 2074409746, 1624206008, -1428973569, 1575984350, -31488749, 701310393, 1124053225, 884682182, 575664861, -884773992, -472957447, 1271207833, -689558947, -556877587, -173955184, -1075802659, 1251874631, -813062682, -606392634, -151606078, 803101673, -718041048, 2077021006, -736312459, -983830687, -1111122955, 40006621, -1932367566, -112924756, 430046983, -216411418, -1239248961, -293779517, 2111509667, 863432627, -153168522, 1414839037, -1787062845, 2010638549, 1604447465, -1212201049, -1937150661, -226232537, 897283973, -75062491, -355355489, 1510743214, -1879463156, 820767280, 2024052638, -1657471791, 164740313, 801179976, -1289390792, 1519635325, 538692385, 1107203116, -615363976, 1052419060, -31623434, -1624437109, 1111238025, -285150057, -1898192290, -172143461, -6511343, -1868808937, -950693691, -278452648, 251688864, -1921004445, -950166549, -1186453650, 1618232280, 1727510099, 601859057, -1679001982, -474896389, 1392335996, -1570296760, -338985928, 296142334, -260949971, -1515316514, -1020684605, 1009817212, -652661191, 84020563, 1978226906, 391606302, -1616838625, 2065551172, 648451958, -1925426312, 1922836678, 720060657, 1729289313, -2013461665, 71134321, -305873565, -1941382007, 1665721338, 1727024472, -1200032216, -487787668, -363018387, -1997602903, 1667985006, 1026732570, 1315304746, -1802818623, -1288628464, 1760689967, 999872321, -1428161071, 1898081183, -1447310063, 1980093914, 719473803, 1735909832, -2032175327, -66768844, -202971244, -1784482176, -1419347980, 1183896936, -1122744305, -1777102278, 1484371365, -1251154284, -1250473910, -107944384, -479617840, -445907342, -1028816329, -1789682097, 1638562668, -395378602, 1755559923, -746890079, -1352757419, -72530893, 1200017220, -1577790070, 1729263015, 765091016, 312073955, 1465590990, 1059950675, 1675601982, -1879300847, -695585700, -751503397, -1644276510, 2034842431, 1114357510, 331687472, -873484092, 1002904027, -1911767346, 528079869, -1736179919, -1116898616, 1703404057, -661654842, -974569399, -1128944120, -2099038483, -327501600, -1445522500, 1274409834, -176918211, -105894516, -913000523, -17589408, -738309928, -506368645, 1907468256, 2117827033, 1968186791, 1492447188, 895916951, 2086641629, 584518568, -1057641094, -1076963934, -1446085961, -1391347964, -1879663717, -1919244717, 142470737, -47180373, 1965283919, -203400932, 1854827135, 19911980, -1687076549, -141835864, -819383816, -5130994, -1136661051, -333120019, 377038234, 1073371327, 1527155300, 1859807463, 1002825367, -1726717115, -1334334202, -1848975313, 56575598, 1550925939, 2041572918, 1155779482, 477683258, -1820938462, 366454451, -286412383, 1509003892, 1206125644, 1442725653, -953917283, 1371764690, -1804882920, 276400761, -622471203, 1618451447, -294348291, -5349854, -1756826502, -968339336, -2063804189, -587567327, -870700783, 864094694, 248607347, -940588390, -1619528276, 1039035591, -723624324, 377932366, 2010862975, -1529452903, -395808385, 1778214115, -233248413, -490923942, -1497904263, 1059216353, -394695, -423449511, -1495271210, -141323331, -406590026, -2080634364, -1759465907, 1063085707, 66694285, -1596790943, -1245841415, -1770657832, -1538990662, -1235299615, -1546250564, -883326058, 802630761, -1656794020, 1196401040, -487227088, -361378255, -1283477612, -117710469, -405318914, 2112479842, -903923337, 880197724, 1924127543, 1898708252, -1806897986, -71872289, 880381711, -1906420515, -488157846, -1167047578, 2120027869, -654313729, -322484571, -1436765977, 1311808207, -114438409, -1069277462, 378944750, -1353745040, 1495565451, -833940593, -389964482, 217312251, -350837762, -809544953, -882255636, -609749251, -1075408962, 2021449077, 1469906206, -69165876, 1236248107, -1842457517, 1488083269, 312374971, -229173006, -342910298, 1657454578, 2008289681, -1900316976, -1358874244, -1478378142, 1775681828, -774284223, -1113518531, 962279472, 1902397440, -857890556, 1256502078, 296746972, -11680888, -494280885, -930423685, -958142583, -513385157, -467815977, -1333858217, 2035993403, 200168298, -627065253, -1643982738, -1149434199, 498829491, 1009026712, -103063197, -482625329, -419945249, -1942949260, -704412493, 81147896, 181714828, 933812175, -1974806514, 738106719, 640182733, 934821948, 1840183965, -1346765147, 404623313, -1133023770, -855722185, -968100480, -696005690, 1949920748, -1366681230, 1828270775, 1778868218, -97004307, -1231242666, 1891470973, 299788797, -330297687, 696171446, 1866937271, -201075724, 1334899050, -826477359, -419437027, 916348920, 998192734, -1977344552, -1900757669, 1079831030, 776757587, -31772071, -503808564, -677719263, -1285965963, 1249078173, -341241960, 2096147404, -342631092, -1310576607, 1626871234, 1086124927, -1777246032, 1721848035, -884715322, -2020971666, -32212517, 1509031663, 48873726, 121547532, 1895626298, -1575168665, 458226525, -1627823962, -1017748001, -1402882120, 863067932, -547487995, 787815068, 1791149637, 1852325705, -1255291454, -1990018602, -1802971586, 998954486, -1653980841, -1504312346, -874879270, -1557859, -1686195535, -10529549, -1261453772, -80271478, 1768684396, -1282883790, 867663436, 1506261563, -631140383, -1419037114, 918747875, 1837089606, 1957183149, -581150531, -618515989, 1413128048, 236451737, 1811463192, -919375675, 1992733761, 209645198, -189450187, 2089330446, 1404938071, -345344311, -1379441013, -74361612, -864099910, 1768134367, -707599913, -551951163, -940626991, 1015816929, -1209334639, 1305924201, -802936021, -1860907387, 615020537, -1123393003, -2082292935, 322209206, -1799757960, -1837402499, 2093514814, -159217940, -1836135155, -904919633, 238535628, -1766048519, 1266234985, 1907984280, -1305637842, -135828797, 1489497339, 815460901, -593572040, 9418059, 1660764275, 2144547433, -373739605, -836452935, 965685811, -1061240865, 965164206, -658636561, -1281415347, 894042542, 2005387535, -1979242667, -17718394, -816262404, 1963525949, -1975800329, 1761199806, 1885101391, 63683135, -2089672483, 1990186899, -1691751803, -943840331, 1920264158, -245770648, -1767582273, 1917733993, 1525968945, -603239345, -1731569155, -301238652, -1094087470, 1574457803, 1514430363, -690502216, -1012017811, 811370435, 1733618080, 1869983077, 522264518, 514900685, -1930264578, 413326186, -1322601809, 257250085, -52275687, -694010211, 890321323, 668403434, 259465963, 2124081789, 1580215435, -1537773171, 1810525802, -1096310815, 1333479481, 1870154530, 2012051309, -874169709, -1619128935, 917170090, -336255959, 1620148936, -2102740258, -578776834, -1478322166, 1810331884, -926844223, -23240799, 591974347, 695852265, 1083586393, 1131254371, -1801456509, 2123819138, -980281743, 446282536, -1674694806, -886358006, -831561424, 744641677, 427686629, -983304317, 2100795385, -1660584603, -62531154, 1764850278, 338916351, 1692992703, -1966086228, -507627285, -972055077, -775798923, 771151132, 426531795, 1147028216, 1274188243, 2110031838, -1536763417, -142501093, 41582039, -1370615912, -747399138, -692367488, 730407735, 1602435938, -4461317, 443949071, 1535032127, 1765731255, -9480689, -847504040, 118484429, -1272646991, -2068336293, -561654145, -143531053, 727993374, -1913658514, 2043929392, -1930635789, -935013113, -1308610059, 1365381367, 131174621, 476520119, -39539426, 165877082, -1400688681, 322906181, 1412689597, 1932039929, -383167501, 327988318, -877412063, -782792806, -610380572, -649520368, 1070446444, -1053000335, -510308314, 1575151347, -1504679780, -1060669439, -569416836, 895582084, -990409970, -672240517, -1981080385, -862038406, -901471458, -606201015, 1816199066, 1454058763, 495172451, -1829213388, 476553958, -700470566, 798590974, -285109850, 790492607, -376533690, -492630231, -1727202728, -1248937508, 221673068, -272382025, 1526430205, 1505586847, -1096076670, 1514666421, 350183262, -641240586, -493085081, -1922591621, -393396679, 2090466751, 150321497, -1935829444, -2080985355, -39254607, -540649021, -1339607252, -1530563000, 619801908, 2028464853, 1884560850, -1610648604, -1686594581, 1503338427, 764881452, -181719333, 1740704899, -1822542650, 1139426559, 1300952999, 261045505, 561257628, -2066097083, -1149739316, 88044635, -1445461083, 1173090939, -1871971274, -1881997050, -304470762, 1208126849, -132566383, -152146647, -1377880769, -162301635, -998515611, 1524200288, 863882160, -1730971992, -14224556, 2070679411, 1383345469, 275249568, 358898106, 1675092714, -175439012, 1561661361, 1961877808, -1377408479, 1366905260, -26367721, -587923538, -236518637, 1041116995, 953959750, -2036871723, -1101071998, 817200604, 1586111051, -684196389, -807270307, -10299801, -689380384, 427664608, 1482349151, -1648803593, -1463568691, -2087182087, -1115916419, -72168279, 1056329669, -67123258, -199780569, -1309311008, -992099210, -1142992594, -1260588426, -304160582, -75995314, -21248028, -134309924, 2131457723, -499726585, 721481127, 1004007168, -98757414, -1319360717, -1435112775, 1493134711, 1590478067, 1329480324, -1133527557, -1684197457, -391341126, 1567367001, 865098388, -1171080608, 1326862079, -1153968850, 379540886, -1835139734, -331532535, -10195201, 790489243, -901013850, -1765876792, 545421491, -626124343, 1716681867, -1485709814, 772814027, 1513449210, -1905445882, -643690478, 1702522238, 1936078396, 435283318, 1207614130, -296663891, -1550735548, -446006030, 674487584, 944996961, -1526186012, -548285701, 259918535, 389311815, 2006291920, 1613679204, -1617694611, -2009470042, 1302462348, -349781438, 1169474003, -934092809, 1114310975, -451737872, -41320659, 856909305, -2041210303, -1288237339, 1943958492, 882939867, -1888806810, 1269881334, -2077267863, -2021400614, -474252726, -557422094, -1197782755, -94405282, -894563365, 185688269, 1989576182, 1740105388, -74881031, -1655297092, 1983848867, 979694231, -2129385063, 1295385237, 2120760744, -1106152826, -358413325, 2020024882, 996100531, 257560211, -408070099, 363298639, -2043908057, 156951554, 1123044189, 749353613, 2102550235, 1494942548, 2144872897, 121075228, -1096808193, -673405322, 668764112, -1856472593, -905185641, 2059197876, 1963311189, 1013911287, -1697433900, -791521868, -805478934, 729660930, -29982003, 1013238381, 831725066, 296907951, 1441959363, -1704770812, -1257554157, 1232595731, -29552720, 818232439, -443070949, -1939825834, -208038466, -350785560, 2025572218, 1899069569, -716196267, -1625042578, -2014157639, 731603598, -654814222, -588747544, 1872918005, -2121416657, 983815874, 1478679952, -569033907, -168360479, -99568585, 1798839997, 1257987707, 2128475556, 1595544152, -52822590, -1564683142, 97303211, -274209409, -1139713265, -310474977, -111202341, -1639505949, 2059017094, 1030631348, 1852887302, 1767565788, -1121078653, -134361981, 1566026159, -293226775, 1585938295, -940183930, 1508743739, -1111568670, -590756576, -297976376, -742998738, 1984604847, -1478154380, -1511481220, 1673071727, -1322863412, 1796420479, 301651359, 1050780671, -1403200771, -295347254, 1169891290, -839487922, -64305819, -1322710723, 123267352, 1312821082, -1416596578, -1539356811, -1442836105, 1871353497, -1108673973, -306473252, 2002639093, -482528001, -885442758, -539374187, 1272183370, 521512676, 748862733, 1509720230, 534637995, 412868004, -337143085, -1316012942, -1497380077, 1912243386, 1075126180, -735101781, -604059401, 1218636195, 980269492, 1536571806, 699264463, 1893711860, 1719870829, 1991649567, -101500029, -780401899, 2084567564, 1337947813, 1482566699, -1260209179, 1744686521, 2142742133, 863320523, -318767163, 1896867630, -707450043, -1665898043, -8389917, 1508292525, 380749949, -2112332359, -1029927855, -1312619275, -1809187740, -2095647531, -1545628325, 1084675114, -1023396458, 1412520303, -15134721, 1311511129, 268218332, -2111977557, -1408880503, -1413110289, 1971985422, 1565302074, 1577536358, -792266248, 474965687, -409144114, -1208251626, 1541529935, -519042319, 1509053089, 243597273, -1207041798, -1624578698, -613366887, 1660342075, 1596420499, 1045943426, -1888405551, 229716605, -7462906, 1498531619, 2067458268, -1114683598, 973868025, -229045471, 1053443398, 330624478, 2091605873, 1425151069, -1304111859, -1640997601, -1591270431, -1214523652, 1370862104, 89022504, 1397801950, -675365219, -828231287, 207943579, -1388757051, 604095632, 1356982911, 1254352031, 1240263884, 1633280385, -1528391684, 1412168431, 267801465, -2059654665, 1190586148, 1006490741, -1729123554, 1859870450, 197632914, -1418929510, -1170832715, 1029428182, -114836281, 527068090, 977169531, -546174102, 350764333, 1605803822, -294915599, -124220520, -1242043445, 2089574257, 1727393267, 425418651, -738470501, 655867122, -2103499785, -604382857, -103810571, 1961337208, -1405784128, -25713228, -691142854, -366411865, -205335811, -764436825, 1472623822, 749804189, 1634769492, -1218063118, -692332813, 553378707, -1388600208, 2140760256, 382436583, -618665910, 945967299, 194431101, -690251509, -1989499069, -822169061, 1704948372, 251026137, 1500022862, -212327881, -297646231, -102078363, -13764096, 707813362, -15485690, 1964220796, 2096209380, 383177826, -1784837294, -1818478423, -1250832392, -1588436594, -1456526113, -1997316640, -634260205, 1016458688, -223740860, -840306074, 660251374, -907219917, 63504825, -64488325, -714762148, -1299486974, -1714820682, 722337133, 65659004, 1067413972, -1214436804, -1753883251, 1367092679, 1150597888, 1798417454, 2009724051, -247149052, -1671222870, -38984905, 1055155948, 1130301051, 1461174232, -1084336599, -864769682, 1492123070, -1237624529, 656044237, -1458076915, 1007959830, -144009777, 360671174, -102514577, -1467629181, 1953334993, 494298055, -80913170, 1207603549, 859694003, -108587615, -1236062314, -365058732, 1822711627, -34962706, -87530395, 1466744805, 1004176468, -1133830178, 1308490636, -952548578, -2079650405, -1238268967, 872335364, 1340403610, -157561397, -1667789388, 281620113, -1356963529, 2142261143, -1356466397, 1482051389, -541761595, 882872395, 191848418, 510523693, 1435929771, -1976508405, 1660292932, 1935658815, 1411997040, -124830551, -1931873298, 1460870027, -1349164278, -1975585045, 482310271, -38654745, -1107792751, 1699445333, 864646638, 1604096548, -1497694855, 1065889548, 1991820218, 1848944733, 2033952683, -575766542, -14911138, 2119661660, -1352031452, 2009585905, 966568918, 884577748, -1792582697, 1942469690, 616272670, -301079365, 687751202, -1582414490, 1596387253, -519642789, 1793834951, 427139940, -1282526146, -1753630019, -883602381, -855018945, -1361544075, 1734992407, 1378250383, 1605138335, 973123007, -973013229, 1003434330, -585762980, -1516825641, 2132802041, 908669545, 331987488, -389518252, 1313728069, -417741585, -1138988293, -627676418, -2074996517, -75431144, -1933184306, 2122783277, -349719851, 2005962664, 1879003075, 861532042, 845571094, 1441748645, -858445517, 722847203, 2062249951, -1129417359, 893018504, -1900493525, -10801458, 1105995818, -275253505, 2058072860, 2141272993, 1838723718, 733706407, -1828593201, -1659615736, -285607490, -338848176, 1695567255, -578948234, 1038087825, 1750681319, -1043046540, -1203954086, 893668201, 985200340, -799178812, -991841355, -974465562, -1622839808, -827924196, 1688740215, -530711643, -119577557, 2141842541, -413689381, -1977737538, 2071790713, -1157935979, -1897658133, 1010003367, 1998651232, 59101218, -1399877234, 718483302, -1267677760, 1825904537, -1670520688, -1351492149, -731912499, -2125401270, -1904745362, -419819983, 146635451, 835083595, -377807909, -1169965686, 435663273, -375659202, 795720356, -1149994545, 1945032277, 869527128, 1797145479, -1149268471, -463682519, 1459944270, -1471940844, 278848824, -1529514014, 1398132351, 626131297, -1160560652, -1851412909, -1173045289, -1978026841, -218960417, -1116386184, -1008133632, -2020623511, 1388249550, -2046942919, -45029506, 186011611, -578899490, 1782643964, -1578570542, -597822612, -158116085, -78932035, -303258959, 1470904975, -481583474, 2062190856, 454271439, -328336945, 653123320, -211122036, 734833646, -1921003145, -237197351, -966832303, -719247918, -311209201, 918346620, -1505473383, 1381527287, -584997061, 529481259, -1467824554, -761066666, -518495802, -76981316, 583237330, -841955783, -2127256934, -359794797, 513012798, 829848613, -1043684730, -198390180, -118165095, -182288386, -144035561, -1256886040, -92865429, 1118608385, 258185258, -672256015, -1417758734, 836744632, -138476779, -1258463471, -282031309, -797181478, -549018806, 1774665981, -827944216, 1798257813, -151373599, -225629077, 1394279846, -342222228, -445457900, 1457769771, -290603626, -1552154667, 1844640377, 2124792769, -137569106, -41000513, 1951570659, -1249698323, -1485274462, -564545026, 2108731360, -1277283552, -137198292, -72555415, -62497830, 1462602622, -971559493, -144505449, 1993588792, 1878608089, -961186414, 1417213574, -1013572967, -842022080, -402940701, -152815569, 1866773375, -1073810131, 1844997268, -275375278, -727776674, -1294402070, -724120026, 678359261, 2024534915, 574321781, 1950112675, 1412686504, -1007063672, -1362782012, -31781961, 1146859420, 593603465, -1004152932, -990321620, 497104088, 745552226, -942228033, 276714856, 1863839031, 533847749, -1544718353, -246087277, 57012600, 1713327198, -1516246722, -1055926388, -138028298, 1650848839, -1517766009, 1713000113, -798759574, -1462330182, -1881153505, -1754394620, 1942997689, 799237732, -2103859201, 1803509430, -306545068, 1840821402, 610161359, 519855769, 284892601, -720285373, -233527827, -1621955088, -1031999154, 74505865, -478220272, 965556690, 156800994, 1687739618, -2043151405, -1914663384, -144508729, -21147, -306399786, 988780349, -1114919587, 1546751861, -610201712, -1219692833, 1404765017, 1068188482, -88943396, 1797515842, -1157647790, 599100666, -683929601, 1195266525, 1889983217, 2023468561, -167099434, 2126115049, 1206889684, 975023002, -2073029227, 1995860918, 394119469, 2057233449, -89674704, -1991764397, -1088878658, 826618513, 1301290182, -560106282, -973815100, -1564863736, 1610727920, -606651986, -1147483942, -191615878, 1522281033, -1345647304, -863077905, 666952936, 167089987, 1918272413, -815338892, -672145932, 1450579395, -754714127, 545169468, -1916420893, 1013840361, 1015744591, 706100494, 809974672, 1860640054, 474163826, -1076904295, 979366781, -1183781041, -1074012482, -1022728201, -100723652, 168622839, 226336082, 639538626, 2042812209, 1011719355, -802315935, 31087348, -545338015, -785147505, 1530870980, -2059834045, -19403747, 1479438175, 1329014117, 1321862133, 840553465, 1845208465, 1940617353, 452282834, 1351020417, -2037625209, -1830487906, -1214259533, 1430256805, 1812105753, 1717002427, 53452591, -421633408, -1963152947, -2145870161, -1325818387, -1340021758, 1389421996, -539332614, 1982941059, 1480901069, -1147460315, 1121031230, -2019323973, -270485783, -1721197293, -659557128, 375978848, 1543120827, -9677020, 366640529, -1305066021, -1857044113, -2066351876, -421943026, -420016145, -865656944, -1222072597, -1383669895, 1470228425, 2079184574, -1747561810, -332137991, -318906116, -1645203010, -806378595, 2097806494, 1821029559, -805944778, -375855869, -307977564, 328245029, -621053116, -1347509113, -975987037, -228416282, -1537588099, 993004553, -2032809251, -1346274963, 1380524050, -909729833, -51553591, -75012924, -1111626440, -289646233, 2044831165, -2911824, 374438521, -1904564267, -582551053, 1337654975, -650247672, -260401569, -153749946, -1269431006, 1990364590, -1149395676, 1600967080, -680395479, -112754795, -724293723, -652558355, -1902338532, 1154913217, 2048802029, -292713880, -437518903, 500930364, -1256641637, -1629967217, -1951131569, -257368722, -896847978, -858960069, -296355544, -375723374, -272897801, -1608795134, 1672543273, 1433472671, -1997281123, -1105988353, 460316679, 1069903087, -1717682976, 1293532661, -1377597189, -1277432607, -813985299, -82537638, 1805238734, 130125394, 439599312, -1895936116, -879366892, 966080567, 1474807030, 1322502997, -1209759790, 1913175402, -1677853851, 56447327, -1699831904, -1217557553, -2042412176, 1252476775, -418959732, -1256841922, 670443159, -601175148, 2080600534, 490705504, -1127743258, -1160322489, -857154309, -496141228, 1199863789, -547056625, -376090035, -1059252310, 1213582705, 1999992679, -579544837, 1663868515, 1963870493, -674121018, 1897619704, 1712157791, 440835995, 1286706394, -589903445, -1655713730, -1354824831, 1426454277, 2060810029, -1202903434, -1133576202, 808221305, -1774572718, -1017441403, -584014291, -838951825, 157638175, -2044918963, -1254237441, -613046308, -85631086, 1199271823, 233303230, 1802751417, 1598618726, -1077432641, -612061422, 74993287, -1883504054, -110167711, 2104310613, -1835257697, -1521086795, -1179204727, -470835401, 1496040243, -1172652405, 432075257, -729332165, 943798211, -519348837, 521211582, -948472081, -929893525, 2096130967, 1858062977, -1896591443, 1306391445, 549438303, -170062417, -92357151, -1681881944, -1142978953, -1481864201, -170988049, 1764354437, -480939264, 1300872051, -1694409443, -1293919002, -431166285, 1165955637, -1688335423, -458879062, 2024232939, -1834428009, -139155176, -789072993, -222491301, 2036457444, -884665987, 1146473909, -1357933727, 1105325562, 1459602978, -1155605815, -884591158, 1158723289, -529109752, -1503006939, -1486924995, 1327227295, -121607499, -1216832083, -1467482534, -877767338, -1837239009, -217523808, -559267665, 986904160, 659818634, -270544061, 1864112637, 87324342, -113715485, -1685818385, 964778459, -1634835133, 429075303, 870543921, -762016432, 657750124, -557376410, -1602063041, -1103774338, -1656593531, -34799971, -1943651780, -1548746651, -1999674908, 1932550862, -1090787302, 833606524, -1667663593, -1513222519, -863335635, 429334384, -924092226, 688116817, -1637880214, -1118045785, -1703402445, -1641721566, -448533046, 122717153, 1628401171, -1637950090, 1621597831, -1265865471, 1898904359, 840268124, -1031430753, -1287025019, 909553928, 44283391, -1648959801, 2126210859, -151525654, -616623266, 1875645119, -616314098, -1397129875, -1845520715, 1602563760, -1652246293, 725217833, -128385326, 1943572936, 870003821, -2038474762, 758064298, -498275831, -1460431899, 627449376, -1893433313, -1368138822, 215028931, -146079769, 1083926693, -1975806719, 523746423, -1985452352, 1850775878, 799218901, -857237565, 1327482395, 1943628917, -875365477, -1094097141, 1906872614, 2006778626, 1811597254, 2037331140, 473873494, -2067679918, -596064332, -1959033551, -1549279233, -2097071047, -933264429, -325510613, 1138338645, 2110212359, 371097053, -677921202, 1402158213, 891936220, -1764630085, -1043316778, -1676318323, -916469495, -1209756787, 1491132250, -504045226, -335776787, 837788355, -1106810800, -172565981, 1382386037, 1937634726, -1077364482, -1938881057, 247199130, -983970708, 1561901285, -423138390, -337783335, 954789999, -1688294445, 1231103580, -841496324, -1214859248, 462452232, -661861258, -1612488065, 1678684522, -469858883, 1324597859, -565338290, -1331958705, -1681529060, 1071952293, -139939131, 2136898858, -670656641, 1510931130, 1160135508, 1247994295, -1332926927, -803608650, -218572994, 1542190520, 355434285, -88661104, -534471873, -1003566289, -184593784, 1158549450, 54283127, -506623783, 1159663269, -981721182, 2080220525, 53995788, -1686034088, -1759436348, 1903716715, 522841256, -750422034, -216377044, 631482362, -239709011, 1483262583, 2018969945, 570555011, -1414010330, 214496531, -1488330199, -38276985, 1201565619, 1983154587, -1771384092, -1761387570, 1402485106, -2056622455, 529807921, -1419545993, 2028542817, -894464089, -143137467, -1090795768, -747663506, 2142993786, 1801850358, -268469665, -2066842557, -439722190, -1715375814, -1028898887, -421172958, 270007680, -3853974, -1958775537, 915808240, 252661183, 375540808, -1645084284, -1341514566, 1486150906, 1184481268, 516456631, -1959087643, -1589876978, 1985210857, -1112032281, 1451351206, -826652265, -134976272, 1599880475, 1073210600, 966135657, 2111795502, 1786310293, 832451489, 1841987966, 1944452841, -1144927010, 1991056816, 1740951269, -1367946281, 1538488684, 2012172050, -1454270633, -605466789, 1837873503, -896096671, -630369007, 744677690, 1379570115, -692613880, -1732411415, 1266437627, 64649955, 1195874265, 2032634789, -269607853, 2104244946, 1464416652, -1412359216, 136013756, -1790465378, 553978591, -1125131468, -287309627, 731188942, 2078135818, -1176540567, 2110175965, -1080082053, 1804346872, -652107525, -126001432, -742421492, -229288310, -156454417, -314385804, -1931560453, 1312936700, -1125969892, -1073858131, -1302894244, -566322995, 570666413, 1435330516, 1416099161, -1837800040, -1344960169, -1188781196, 1670208238, 1671482877, -43291505, -93464271, -775301298, -796418081, -2076658339, 1988172184, 1895811573, -96755566, 1183715109, 2115821111, 1622542835, -1070678729, -591295284, -675626413, -1328678481, -211209949, -1049471366, -654807080, -106734803, 2007990014, 2084229895, 1420763335, 2046748119, -882939132, 2140059039, -183213055, -1548693582, -1072383873, -260968944, -301557319, 662865521, -3462696, 1051655900, -2036155634, 1679783468, -1215756937, 1524535134, 1109968562, -949614980, -1124844867, 1174177072, -1812646948, 1745083443, 170090287, 1958087037, -908159046, 909071879, -1091440159, -1969603405, 941161780, -1388321387, -1969517548, -466034888, 592843761, 865065488, -1940115114, -1764463663, -97250051, 1550493987, -419488266, 1027039166, 1569709091, -757294212, -678502601, -781421033, 1123957035, -908511879, 1554396216, -1076967492, -1745150081, -273845414, 583591047, -875257889, 363655133, -298879383, -438842675, 1822935682, -1157413713, 217056861, 1874441349, 356900523, 1729552196, 1777924917, -805918163, -2003096085, -136643115, 1440593001, 1368292593, 2008641482, -2015490261, -371960676, -1858938480, -1783849850, -466170898, -1969884163, 210626444, 666177786, 610123093, 861154337, -900152195, -1612179221, 1657945916, 1187748657, -372712857, -2113938298, -1209467648, -1672942298, 1029956207, -2047149167, -449562595, -36460156, -454430090, -84816437, 1939948479, -418988722, 992650519, 834596164, 1877640166, 1454173739, -72509904, 1869802064, 1574769434, 192388877, 1605005593, -671588690, 1627072354, -1128293364, 570865663, -459287833, 2004154696, 1080765863, -1310934289, 1132328246, 1442958742, 1653651913, -1628852175, 167421452, 1402925479, 2000377681, -1933315481, -1829610356, 1056229362, -790149289, -559530119, 795023, -692778140, 132660855, -715051202, -350946619, 2093330424, 1920035418, -1692228015, 312251508, -1422987461, -559175856, 1725737374, -1552298697, -814855575, -1215240774, -348804704, -290138186, -1610922649, -144935707, 251018425, -174641674, -52759290, -829343394, 1290181099, 2130440060, 1299700357, -1537315151, -1181773352, 1806978023, -441237955, -674825922, 1249178581, 1208431355, 1649739977, 561697536, 564050821, -642938971, -1543634963, -1157969383, -1125153198, -1425084561, -1658849443, 1320660632, 1924343699, -1646087204, 930739359, 2039759573, -1775195121, -2101535722, -1347606699, 552410413, -1154691282, -205127830, -969835259, 921672569, -150402136, 362957196, 1078196093, -592449615, -2119811855, -379202324, 1527085989, -1325820640, 641628141, -110909848, 859402099, 1636549786, 1534907601, -1564119716, 316651733, 1605448379, -726713091, -798793195, -1680402571, -1210111922, 1532950316, -1772594292, -1602427817, -1632645356, 1590813631, -1100687200, 96062945, 479133697, 1264314262, -362136380, 544419734, -1628976267, -766126303, 1905696074, 1576847530, -325169437, -1089937686, 1121872090, 795053639, 1000356291, 751478909, 1152082649, 969542184, -328444376, 1092036527, -243466851, 1837681435, -191499929];
define("bloomdata", function(){});

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// A utility to check and log password strength

define('passwordcheck',['jquery',
    'bloomfilter',
    'bloomdata'
  ],
  function ($, bloomfilter, bloomdata) {
    'use strict';

    return function (options) {
      // do something awesome with the options here, like set up the URL to fetch the data from, or
      // set the minimum password length.
      options = options || {};
      var minLength = options.minLength || 8;
      var NO_OF_HASHING_FUNCTIONS = options.noOfHashFunctions || 8;
      var bloom = new BloomFilter(BLOOM, NO_OF_HASHING_FUNCTIONS); //eslint-disable-line no-undef

      var MESSAGES = {
        ALL_NUMBERS_LETTERS: 'ALL_NUMBERS_LETTERS',
        BLOOMFILTER_TRIGGERED: 'BLOOMFILTER_TRIGGERED',
        BLOOMFILTER_HIT: 'BLOOMFILTER_HIT',
        BLOOMFILTER_MISS: 'BLOOMFILTER_MISS',
        MISSING_PASSWORD: 'MISSING_PASSWORD',
        PASSWORD_NOT_A_STRING: 'PASSWORD_NOT_A_STRING',
        PASSWORD_TOO_SHORT: 'PASSWORD_TOO_SHORT'
      };

      function strengthCheck(password) {
        // Check for passwords that at least contain a number and an alphabet,
        // or if alphabets, then at least (minLength + 4) characters long
        var regexString = '((?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9!@#$%^&*()_+ ]{' + minLength + ',' + (minLength + 4) + '})|([A-Za-z0-9!@#$%^&*()_+ ]{' + (minLength + 4) + ',})';
        var regex = new RegExp(regexString);
        return regex.test(password);
      }

      return function (password, callback) {
        if (! password) {
          callback(MESSAGES.MISSING_PASSWORD);
        } else if (typeof password !== 'string') {
          callback(MESSAGES.PASSWORD_NOT_A_STRING);
        } else if (password.length < minLength) {
          callback(MESSAGES.PASSWORD_TOO_SHORT);
        } else {
          // password is non-empty, a string and length greater than minimum length
          // we can start checking for password strength
          var isStrong = strengthCheck(password);
          if (isStrong) {
            // Only if the password has a chance of being strong do we check with the bloom filter
            // else, simply reject the password. This helps us to not store all-alpha or all-numeric passwords
            // on the bloom filter, reducing space.
            var isPasswordFound = bloom.test(password);
            if (isPasswordFound) {
              callback(MESSAGES.BLOOMFILTER_HIT);
            } else {
              callback(MESSAGES.BLOOMFILTER_MISS);
            }
          } else {
            callback(MESSAGES.ALL_NUMBERS_LETTERS);
          }
        }
      };
    };
  });

