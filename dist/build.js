webpackJsonp([0,1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var Vue = __webpack_require__(9);
	var app = Vue.extend({});
	var VueResource = __webpack_require__(11);
	Vue.use(VueResource);
	var VueRouter = __webpack_require__(19);
	Vue.use(VueRouter);
	var validator = __webpack_require__(20);
	Vue.use(validator);

	var router = new VueRouter({
	    hashbang: true,
	    history: false,
	    saveScrollPosition: true,
	    transitionOnLoad: true
	});

	__webpack_require__(24)(router);

	router.start(app, "#app");

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/*!
	 * Vue.js v1.0.10
	 * (c) 2015 Evan You
	 * Released under the MIT License.
	 */
	'use strict';

	function set(obj, key, val) {
	  if (hasOwn(obj, key)) {
	    obj[key] = val;
	    return;
	  }
	  if (obj._isVue) {
	    set(obj._data, key, val);
	    return;
	  }
	  var ob = obj.__ob__;
	  if (!ob) {
	    obj[key] = val;
	    return;
	  }
	  ob.convert(key, val);
	  ob.dep.notify();
	  if (ob.vms) {
	    var i = ob.vms.length;
	    while (i--) {
	      var vm = ob.vms[i];
	      vm._proxy(key);
	      vm._digest();
	    }
	  }
	}

	/**
	 * Delete a property and trigger change if necessary.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 */

	function del(obj, key) {
	  if (!hasOwn(obj, key)) {
	    return;
	  }
	  delete obj[key];
	  var ob = obj.__ob__;
	  if (!ob) {
	    return;
	  }
	  ob.dep.notify();
	  if (ob.vms) {
	    var i = ob.vms.length;
	    while (i--) {
	      var vm = ob.vms[i];
	      vm._unproxy(key);
	      vm._digest();
	    }
	  }
	}

	var hasOwnProperty = Object.prototype.hasOwnProperty;
	/**
	 * Check whether the object has the property.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @return {Boolean}
	 */

	function hasOwn(obj, key) {
	  return hasOwnProperty.call(obj, key);
	}

	/**
	 * Check if an expression is a literal value.
	 *
	 * @param {String} exp
	 * @return {Boolean}
	 */

	var literalValueRE = /^\s?(true|false|[\d\.]+|'[^']*'|"[^"]*")\s?$/;

	function isLiteral(exp) {
	  return literalValueRE.test(exp);
	}

	/**
	 * Check if a string starts with $ or _
	 *
	 * @param {String} str
	 * @return {Boolean}
	 */

	function isReserved(str) {
	  var c = (str + '').charCodeAt(0);
	  return c === 0x24 || c === 0x5F;
	}

	/**
	 * Guard text output, make sure undefined outputs
	 * empty string
	 *
	 * @param {*} value
	 * @return {String}
	 */

	function _toString(value) {
	  return value == null ? '' : value.toString();
	}

	/**
	 * Check and convert possible numeric strings to numbers
	 * before setting back to data
	 *
	 * @param {*} value
	 * @return {*|Number}
	 */

	function toNumber(value) {
	  if (typeof value !== 'string') {
	    return value;
	  } else {
	    var parsed = Number(value);
	    return isNaN(parsed) ? value : parsed;
	  }
	}

	/**
	 * Convert string boolean literals into real booleans.
	 *
	 * @param {*} value
	 * @return {*|Boolean}
	 */

	function toBoolean(value) {
	  return value === 'true' ? true : value === 'false' ? false : value;
	}

	/**
	 * Strip quotes from a string
	 *
	 * @param {String} str
	 * @return {String | false}
	 */

	function stripQuotes(str) {
	  var a = str.charCodeAt(0);
	  var b = str.charCodeAt(str.length - 1);
	  return a === b && (a === 0x22 || a === 0x27) ? str.slice(1, -1) : str;
	}

	/**
	 * Camelize a hyphen-delmited string.
	 *
	 * @param {String} str
	 * @return {String}
	 */

	var camelizeRE = /-(\w)/g;

	function camelize(str) {
	  return str.replace(camelizeRE, toUpper);
	}

	function toUpper(_, c) {
	  return c ? c.toUpperCase() : '';
	}

	/**
	 * Hyphenate a camelCase string.
	 *
	 * @param {String} str
	 * @return {String}
	 */

	var hyphenateRE = /([a-z\d])([A-Z])/g;

	function hyphenate(str) {
	  return str.replace(hyphenateRE, '$1-$2').toLowerCase();
	}

	/**
	 * Converts hyphen/underscore/slash delimitered names into
	 * camelized classNames.
	 *
	 * e.g. my-component => MyComponent
	 *      some_else    => SomeElse
	 *      some/comp    => SomeComp
	 *
	 * @param {String} str
	 * @return {String}
	 */

	var classifyRE = /(?:^|[-_\/])(\w)/g;

	function classify(str) {
	  return str.replace(classifyRE, toUpper);
	}

	/**
	 * Simple bind, faster than native
	 *
	 * @param {Function} fn
	 * @param {Object} ctx
	 * @return {Function}
	 */

	function bind$1(fn, ctx) {
	  return function (a) {
	    var l = arguments.length;
	    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
	  };
	}

	/**
	 * Convert an Array-like object to a real Array.
	 *
	 * @param {Array-like} list
	 * @param {Number} [start] - start index
	 * @return {Array}
	 */

	function toArray(list, start) {
	  start = start || 0;
	  var i = list.length - start;
	  var ret = new Array(i);
	  while (i--) {
	    ret[i] = list[i + start];
	  }
	  return ret;
	}

	/**
	 * Mix properties into target object.
	 *
	 * @param {Object} to
	 * @param {Object} from
	 */

	function extend(to, from) {
	  var keys = Object.keys(from);
	  var i = keys.length;
	  while (i--) {
	    to[keys[i]] = from[keys[i]];
	  }
	  return to;
	}

	/**
	 * Quick object check - this is primarily used to tell
	 * Objects from primitive values when we know the value
	 * is a JSON-compliant type.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */

	function isObject(obj) {
	  return obj !== null && typeof obj === 'object';
	}

	/**
	 * Strict object type check. Only returns true
	 * for plain JavaScript objects.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */

	var toString = Object.prototype.toString;
	var OBJECT_STRING = '[object Object]';

	function isPlainObject(obj) {
	  return toString.call(obj) === OBJECT_STRING;
	}

	/**
	 * Array type check.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */

	var isArray = Array.isArray;

	/**
	 * Define a non-enumerable property
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 * @param {Boolean} [enumerable]
	 */

	function def(obj, key, val, enumerable) {
	  Object.defineProperty(obj, key, {
	    value: val,
	    enumerable: !!enumerable,
	    writable: true,
	    configurable: true
	  });
	}

	/**
	 * Debounce a function so it only gets called after the
	 * input stops arriving after the given wait period.
	 *
	 * @param {Function} func
	 * @param {Number} wait
	 * @return {Function} - the debounced function
	 */

	function _debounce(func, wait) {
	  var timeout, args, context, timestamp, result;
	  var later = function later() {
	    var last = Date.now() - timestamp;
	    if (last < wait && last >= 0) {
	      timeout = setTimeout(later, wait - last);
	    } else {
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    }
	  };
	  return function () {
	    context = this;
	    args = arguments;
	    timestamp = Date.now();
	    if (!timeout) {
	      timeout = setTimeout(later, wait);
	    }
	    return result;
	  };
	}

	/**
	 * Manual indexOf because it's slightly faster than
	 * native.
	 *
	 * @param {Array} arr
	 * @param {*} obj
	 */

	function indexOf(arr, obj) {
	  var i = arr.length;
	  while (i--) {
	    if (arr[i] === obj) return i;
	  }
	  return -1;
	}

	/**
	 * Make a cancellable version of an async callback.
	 *
	 * @param {Function} fn
	 * @return {Function}
	 */

	function cancellable(fn) {
	  var cb = function cb() {
	    if (!cb.cancelled) {
	      return fn.apply(this, arguments);
	    }
	  };
	  cb.cancel = function () {
	    cb.cancelled = true;
	  };
	  return cb;
	}

	/**
	 * Check if two values are loosely equal - that is,
	 * if they are plain objects, do they have the same shape?
	 *
	 * @param {*} a
	 * @param {*} b
	 * @return {Boolean}
	 */

	function looseEqual(a, b) {
	  /* eslint-disable eqeqeq */
	  return a == b || (isObject(a) && isObject(b) ? JSON.stringify(a) === JSON.stringify(b) : false);
	  /* eslint-enable eqeqeq */
	}

	var hasProto = ('__proto__' in {});

	// Browser environment sniffing
	var inBrowser = typeof window !== 'undefined' && Object.prototype.toString.call(window) !== '[object Object]';

	var isIE9 = inBrowser && navigator.userAgent.toLowerCase().indexOf('msie 9.0') > 0;

	var isAndroid = inBrowser && navigator.userAgent.toLowerCase().indexOf('android') > 0;

	var transitionProp = undefined;
	var transitionEndEvent = undefined;
	var animationProp = undefined;
	var animationEndEvent = undefined;

	// Transition property/event sniffing
	if (inBrowser && !isIE9) {
	  var isWebkitTrans = window.ontransitionend === undefined && window.onwebkittransitionend !== undefined;
	  var isWebkitAnim = window.onanimationend === undefined && window.onwebkitanimationend !== undefined;
	  transitionProp = isWebkitTrans ? 'WebkitTransition' : 'transition';
	  transitionEndEvent = isWebkitTrans ? 'webkitTransitionEnd' : 'transitionend';
	  animationProp = isWebkitAnim ? 'WebkitAnimation' : 'animation';
	  animationEndEvent = isWebkitAnim ? 'webkitAnimationEnd' : 'animationend';
	}

	/**
	 * Defer a task to execute it asynchronously. Ideally this
	 * should be executed as a microtask, so we leverage
	 * MutationObserver if it's available, and fallback to
	 * setTimeout(0).
	 *
	 * @param {Function} cb
	 * @param {Object} ctx
	 */

	var nextTick = (function () {
	  var callbacks = [];
	  var pending = false;
	  var timerFunc;
	  function nextTickHandler() {
	    pending = false;
	    var copies = callbacks.slice(0);
	    callbacks = [];
	    for (var i = 0; i < copies.length; i++) {
	      copies[i]();
	    }
	  }
	  /* istanbul ignore if */
	  if (typeof MutationObserver !== 'undefined') {
	    var counter = 1;
	    var observer = new MutationObserver(nextTickHandler);
	    var textNode = document.createTextNode(counter);
	    observer.observe(textNode, {
	      characterData: true
	    });
	    timerFunc = function () {
	      counter = (counter + 1) % 2;
	      textNode.data = counter;
	    };
	  } else {
	    timerFunc = setTimeout;
	  }
	  return function (cb, ctx) {
	    var func = ctx ? function () {
	      cb.call(ctx);
	    } : cb;
	    callbacks.push(func);
	    if (pending) return;
	    pending = true;
	    timerFunc(nextTickHandler, 0);
	  };
	})();

	function Cache(limit) {
	  this.size = 0;
	  this.limit = limit;
	  this.head = this.tail = undefined;
	  this._keymap = Object.create(null);
	}

	var p = Cache.prototype;

	/**
	 * Put <value> into the cache associated with <key>.
	 * Returns the entry which was removed to make room for
	 * the new entry. Otherwise undefined is returned.
	 * (i.e. if there was enough room already).
	 *
	 * @param {String} key
	 * @param {*} value
	 * @return {Entry|undefined}
	 */

	p.put = function (key, value) {
	  var entry = {
	    key: key,
	    value: value
	  };
	  this._keymap[key] = entry;
	  if (this.tail) {
	    this.tail.newer = entry;
	    entry.older = this.tail;
	  } else {
	    this.head = entry;
	  }
	  this.tail = entry;
	  if (this.size === this.limit) {
	    return this.shift();
	  } else {
	    this.size++;
	  }
	};

	/**
	 * Purge the least recently used (oldest) entry from the
	 * cache. Returns the removed entry or undefined if the
	 * cache was empty.
	 */

	p.shift = function () {
	  var entry = this.head;
	  if (entry) {
	    this.head = this.head.newer;
	    this.head.older = undefined;
	    entry.newer = entry.older = undefined;
	    this._keymap[entry.key] = undefined;
	  }
	  return entry;
	};

	/**
	 * Get and register recent use of <key>. Returns the value
	 * associated with <key> or undefined if not in cache.
	 *
	 * @param {String} key
	 * @param {Boolean} returnEntry
	 * @return {Entry|*}
	 */

	p.get = function (key, returnEntry) {
	  var entry = this._keymap[key];
	  if (entry === undefined) return;
	  if (entry === this.tail) {
	    return returnEntry ? entry : entry.value;
	  }
	  // HEAD--------------TAIL
	  //   <.older   .newer>
	  //  <--- add direction --
	  //   A  B  C  <D>  E
	  if (entry.newer) {
	    if (entry === this.head) {
	      this.head = entry.newer;
	    }
	    entry.newer.older = entry.older; // C <-- E.
	  }
	  if (entry.older) {
	    entry.older.newer = entry.newer; // C. --> E
	  }
	  entry.newer = undefined; // D --x
	  entry.older = this.tail; // D. --> E
	  if (this.tail) {
	    this.tail.newer = entry; // E. <-- D
	  }
	  this.tail = entry;
	  return returnEntry ? entry : entry.value;
	};

	var cache$1 = new Cache(1000);
	var filterTokenRE = /[^\s'"]+|'[^']*'|"[^"]*"/g;
	var reservedArgRE = /^in$|^-?\d+/;

	/**
	 * Parser state
	 */

	var str;
	var dir;
	var c;
	var i;
	var l;
	var lastFilterIndex;
	var inSingle;
	var inDouble;
	var curly;
	var square;
	var paren;
	/**
	 * Push a filter to the current directive object
	 */

	function pushFilter() {
	  var exp = str.slice(lastFilterIndex, i).trim();
	  var filter;
	  if (exp) {
	    filter = {};
	    var tokens = exp.match(filterTokenRE);
	    filter.name = tokens[0];
	    if (tokens.length > 1) {
	      filter.args = tokens.slice(1).map(processFilterArg);
	    }
	  }
	  if (filter) {
	    (dir.filters = dir.filters || []).push(filter);
	  }
	  lastFilterIndex = i + 1;
	}

	/**
	 * Check if an argument is dynamic and strip quotes.
	 *
	 * @param {String} arg
	 * @return {Object}
	 */

	function processFilterArg(arg) {
	  if (reservedArgRE.test(arg)) {
	    return {
	      value: toNumber(arg),
	      dynamic: false
	    };
	  } else {
	    var stripped = stripQuotes(arg);
	    var dynamic = stripped === arg;
	    return {
	      value: dynamic ? arg : stripped,
	      dynamic: dynamic
	    };
	  }
	}

	/**
	 * Parse a directive value and extract the expression
	 * and its filters into a descriptor.
	 *
	 * Example:
	 *
	 * "a + 1 | uppercase" will yield:
	 * {
	 *   expression: 'a + 1',
	 *   filters: [
	 *     { name: 'uppercase', args: null }
	 *   ]
	 * }
	 *
	 * @param {String} str
	 * @return {Object}
	 */

	function parseDirective(s) {

	  var hit = cache$1.get(s);
	  if (hit) {
	    return hit;
	  }

	  // reset parser state
	  str = s;
	  inSingle = inDouble = false;
	  curly = square = paren = 0;
	  lastFilterIndex = 0;
	  dir = {};

	  for (i = 0, l = str.length; i < l; i++) {
	    c = str.charCodeAt(i);
	    if (inSingle) {
	      // check single quote
	      if (c === 0x27) inSingle = !inSingle;
	    } else if (inDouble) {
	      // check double quote
	      if (c === 0x22) inDouble = !inDouble;
	    } else if (c === 0x7C && // pipe
	    str.charCodeAt(i + 1) !== 0x7C && str.charCodeAt(i - 1) !== 0x7C) {
	      if (dir.expression == null) {
	        // first filter, end of expression
	        lastFilterIndex = i + 1;
	        dir.expression = str.slice(0, i).trim();
	      } else {
	        // already has filter
	        pushFilter();
	      }
	    } else {
	      switch (c) {
	        case 0x22:
	          inDouble = true;break; // "
	        case 0x27:
	          inSingle = true;break; // '
	        case 0x28:
	          paren++;break; // (
	        case 0x29:
	          paren--;break; // )
	        case 0x5B:
	          square++;break; // [
	        case 0x5D:
	          square--;break; // ]
	        case 0x7B:
	          curly++;break; // {
	        case 0x7D:
	          curly--;break; // }
	      }
	    }
	  }

	  if (dir.expression == null) {
	    dir.expression = str.slice(0, i).trim();
	  } else if (lastFilterIndex !== 0) {
	    pushFilter();
	  }

	  cache$1.put(s, dir);
	  return dir;
	}

	var directive = Object.freeze({
	  parseDirective: parseDirective
	});

	var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
	var cache = undefined;
	var tagRE = undefined;
	var htmlRE = undefined;
	/**
	 * Escape a string so it can be used in a RegExp
	 * constructor.
	 *
	 * @param {String} str
	 */

	function escapeRegex(str) {
	  return str.replace(regexEscapeRE, '\\$&');
	}

	function compileRegex() {
	  var open = escapeRegex(config.delimiters[0]);
	  var close = escapeRegex(config.delimiters[1]);
	  var unsafeOpen = escapeRegex(config.unsafeDelimiters[0]);
	  var unsafeClose = escapeRegex(config.unsafeDelimiters[1]);
	  tagRE = new RegExp(unsafeOpen + '(.+?)' + unsafeClose + '|' + open + '(.+?)' + close, 'g');
	  htmlRE = new RegExp('^' + unsafeOpen + '.*' + unsafeClose + '$');
	  // reset cache
	  cache = new Cache(1000);
	}

	/**
	 * Parse a template text string into an array of tokens.
	 *
	 * @param {String} text
	 * @return {Array<Object> | null}
	 *               - {String} type
	 *               - {String} value
	 *               - {Boolean} [html]
	 *               - {Boolean} [oneTime]
	 */

	function parseText(text) {
	  if (!cache) {
	    compileRegex();
	  }
	  var hit = cache.get(text);
	  if (hit) {
	    return hit;
	  }
	  text = text.replace(/\n/g, '');
	  if (!tagRE.test(text)) {
	    return null;
	  }
	  var tokens = [];
	  var lastIndex = tagRE.lastIndex = 0;
	  var match, index, html, value, first, oneTime;
	  /* eslint-disable no-cond-assign */
	  while (match = tagRE.exec(text)) {
	    /* eslint-enable no-cond-assign */
	    index = match.index;
	    // push text token
	    if (index > lastIndex) {
	      tokens.push({
	        value: text.slice(lastIndex, index)
	      });
	    }
	    // tag token
	    html = htmlRE.test(match[0]);
	    value = html ? match[1] : match[2];
	    first = value.charCodeAt(0);
	    oneTime = first === 42; // *
	    value = oneTime ? value.slice(1) : value;
	    tokens.push({
	      tag: true,
	      value: value.trim(),
	      html: html,
	      oneTime: oneTime
	    });
	    lastIndex = index + match[0].length;
	  }
	  if (lastIndex < text.length) {
	    tokens.push({
	      value: text.slice(lastIndex)
	    });
	  }
	  cache.put(text, tokens);
	  return tokens;
	}

	/**
	 * Format a list of tokens into an expression.
	 * e.g. tokens parsed from 'a {{b}} c' can be serialized
	 * into one single expression as '"a " + b + " c"'.
	 *
	 * @param {Array} tokens
	 * @return {String}
	 */

	function tokensToExp(tokens) {
	  if (tokens.length > 1) {
	    return tokens.map(function (token) {
	      return formatToken(token);
	    }).join('+');
	  } else {
	    return formatToken(tokens[0], true);
	  }
	}

	/**
	 * Format a single token.
	 *
	 * @param {Object} token
	 * @param {Boolean} single
	 * @return {String}
	 */

	function formatToken(token, single) {
	  return token.tag ? inlineFilters(token.value, single) : '"' + token.value + '"';
	}

	/**
	 * For an attribute with multiple interpolation tags,
	 * e.g. attr="some-{{thing | filter}}", in order to combine
	 * the whole thing into a single watchable expression, we
	 * have to inline those filters. This function does exactly
	 * that. This is a bit hacky but it avoids heavy changes
	 * to directive parser and watcher mechanism.
	 *
	 * @param {String} exp
	 * @param {Boolean} single
	 * @return {String}
	 */

	var filterRE$1 = /[^|]\|[^|]/;
	function inlineFilters(exp, single) {
	  if (!filterRE$1.test(exp)) {
	    return single ? exp : '(' + exp + ')';
	  } else {
	    var dir = parseDirective(exp);
	    if (!dir.filters) {
	      return '(' + exp + ')';
	    } else {
	      return 'this._applyFilters(' + dir.expression + // value
	      ',null,' + // oldValue (null for read)
	      JSON.stringify(dir.filters) + // filter descriptors
	      ',false)'; // write?
	    }
	  }
	}

	var text$1 = Object.freeze({
	  compileRegex: compileRegex,
	  parseText: parseText,
	  tokensToExp: tokensToExp
	});

	var delimiters = ['{{', '}}'];
	var unsafeDelimiters = ['{{{', '}}}'];

	var config = Object.defineProperties({

	  /**
	   * Whether to print debug messages.
	   * Also enables stack trace for warnings.
	   *
	   * @type {Boolean}
	   */

	  debug: false,

	  /**
	   * Whether to suppress warnings.
	   *
	   * @type {Boolean}
	   */

	  silent: false,

	  /**
	   * Whether to use async rendering.
	   */

	  async: true,

	  /**
	   * Whether to warn against errors caught when evaluating
	   * expressions.
	   */

	  warnExpressionErrors: true,

	  /**
	   * Whether or not to handle fully object properties which
	   * are already backed by getters and seters. Depending on
	   * use case and environment, this might introduce non-neglible
	   * performance penalties.
	   */
	  convertAllProperties: false,

	  /**
	   * Internal flag to indicate the delimiters have been
	   * changed.
	   *
	   * @type {Boolean}
	   */

	  _delimitersChanged: true,

	  /**
	   * List of asset types that a component can own.
	   *
	   * @type {Array}
	   */

	  _assetTypes: ['component', 'directive', 'elementDirective', 'filter', 'transition', 'partial'],

	  /**
	   * prop binding modes
	   */

	  _propBindingModes: {
	    ONE_WAY: 0,
	    TWO_WAY: 1,
	    ONE_TIME: 2
	  },

	  /**
	   * Max circular updates allowed in a batcher flush cycle.
	   */

	  _maxUpdateCount: 100

	}, {
	  delimiters: { /**
	                 * Interpolation delimiters. Changing these would trigger
	                 * the text parser to re-compile the regular expressions.
	                 *
	                 * @type {Array<String>}
	                 */

	    get: function get() {
	      return delimiters;
	    },
	    set: function set(val) {
	      delimiters = val;
	      compileRegex();
	    },
	    configurable: true,
	    enumerable: true
	  },
	  unsafeDelimiters: {
	    get: function get() {
	      return unsafeDelimiters;
	    },
	    set: function set(val) {
	      unsafeDelimiters = val;
	      compileRegex();
	    },
	    configurable: true,
	    enumerable: true
	  }
	});

	var warn = undefined;

	if (process.env.NODE_ENV !== 'production') {
	  (function () {
	    var hasConsole = typeof console !== 'undefined';
	    warn = function (msg, e) {
	      if (hasConsole && (!config.silent || config.debug)) {
	        console.warn('[Vue warn]: ' + msg);
	        /* istanbul ignore if */
	        if (config.debug) {
	          if (e) {
	            throw e;
	          } else {
	            console.warn(new Error('Warning Stack Trace').stack);
	          }
	        }
	      }
	    };
	  })();
	}

	/**
	 * Append with transition.
	 *
	 * @param {Element} el
	 * @param {Element} target
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	function appendWithTransition(el, target, vm, cb) {
	  applyTransition(el, 1, function () {
	    target.appendChild(el);
	  }, vm, cb);
	}

	/**
	 * InsertBefore with transition.
	 *
	 * @param {Element} el
	 * @param {Element} target
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	function beforeWithTransition(el, target, vm, cb) {
	  applyTransition(el, 1, function () {
	    before(el, target);
	  }, vm, cb);
	}

	/**
	 * Remove with transition.
	 *
	 * @param {Element} el
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	function removeWithTransition(el, vm, cb) {
	  applyTransition(el, -1, function () {
	    remove(el);
	  }, vm, cb);
	}

	/**
	 * Apply transitions with an operation callback.
	 *
	 * @param {Element} el
	 * @param {Number} direction
	 *                  1: enter
	 *                 -1: leave
	 * @param {Function} op - the actual DOM operation
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	function applyTransition(el, direction, op, vm, cb) {
	  var transition = el.__v_trans;
	  if (!transition ||
	  // skip if there are no js hooks and CSS transition is
	  // not supported
	  !transition.hooks && !transitionEndEvent ||
	  // skip transitions for initial compile
	  !vm._isCompiled ||
	  // if the vm is being manipulated by a parent directive
	  // during the parent's compilation phase, skip the
	  // animation.
	  vm.$parent && !vm.$parent._isCompiled) {
	    op();
	    if (cb) cb();
	    return;
	  }
	  var action = direction > 0 ? 'enter' : 'leave';
	  transition[action](op, cb);
	}

	/**
	 * Query an element selector if it's not an element already.
	 *
	 * @param {String|Element} el
	 * @return {Element}
	 */

	function query(el) {
	  if (typeof el === 'string') {
	    var selector = el;
	    el = document.querySelector(el);
	    if (!el) {
	      process.env.NODE_ENV !== 'production' && warn('Cannot find element: ' + selector);
	    }
	  }
	  return el;
	}

	/**
	 * Check if a node is in the document.
	 * Note: document.documentElement.contains should work here
	 * but always returns false for comment nodes in phantomjs,
	 * making unit tests difficult. This is fixed by doing the
	 * contains() check on the node's parentNode instead of
	 * the node itself.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */

	function inDoc(node) {
	  var doc = document.documentElement;
	  var parent = node && node.parentNode;
	  return doc === node || doc === parent || !!(parent && parent.nodeType === 1 && doc.contains(parent));
	}

	/**
	 * Get and remove an attribute from a node.
	 *
	 * @param {Node} node
	 * @param {String} _attr
	 */

	function getAttr(node, _attr) {
	  var val = node.getAttribute(_attr);
	  if (val !== null) {
	    node.removeAttribute(_attr);
	  }
	  return val;
	}

	/**
	 * Get an attribute with colon or v-bind: prefix.
	 *
	 * @param {Node} node
	 * @param {String} name
	 * @return {String|null}
	 */

	function getBindAttr(node, name) {
	  var val = getAttr(node, ':' + name);
	  if (val === null) {
	    val = getAttr(node, 'v-bind:' + name);
	  }
	  return val;
	}

	/**
	 * Insert el before target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */

	function before(el, target) {
	  target.parentNode.insertBefore(el, target);
	}

	/**
	 * Insert el after target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */

	function after(el, target) {
	  if (target.nextSibling) {
	    before(el, target.nextSibling);
	  } else {
	    target.parentNode.appendChild(el);
	  }
	}

	/**
	 * Remove el from DOM
	 *
	 * @param {Element} el
	 */

	function remove(el) {
	  el.parentNode.removeChild(el);
	}

	/**
	 * Prepend el to target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */

	function prepend(el, target) {
	  if (target.firstChild) {
	    before(el, target.firstChild);
	  } else {
	    target.appendChild(el);
	  }
	}

	/**
	 * Replace target with el
	 *
	 * @param {Element} target
	 * @param {Element} el
	 */

	function replace(target, el) {
	  var parent = target.parentNode;
	  if (parent) {
	    parent.replaceChild(el, target);
	  }
	}

	/**
	 * Add event listener shorthand.
	 *
	 * @param {Element} el
	 * @param {String} event
	 * @param {Function} cb
	 */

	function on$1(el, event, cb) {
	  el.addEventListener(event, cb);
	}

	/**
	 * Remove event listener shorthand.
	 *
	 * @param {Element} el
	 * @param {String} event
	 * @param {Function} cb
	 */

	function off(el, event, cb) {
	  el.removeEventListener(event, cb);
	}

	/**
	 * Add class with compatibility for IE & SVG
	 *
	 * @param {Element} el
	 * @param {Strong} cls
	 */

	function addClass(el, cls) {
	  if (el.classList) {
	    el.classList.add(cls);
	  } else {
	    var cur = ' ' + (el.getAttribute('class') || '') + ' ';
	    if (cur.indexOf(' ' + cls + ' ') < 0) {
	      el.setAttribute('class', (cur + cls).trim());
	    }
	  }
	}

	/**
	 * Remove class with compatibility for IE & SVG
	 *
	 * @param {Element} el
	 * @param {Strong} cls
	 */

	function removeClass(el, cls) {
	  if (el.classList) {
	    el.classList.remove(cls);
	  } else {
	    var cur = ' ' + (el.getAttribute('class') || '') + ' ';
	    var tar = ' ' + cls + ' ';
	    while (cur.indexOf(tar) >= 0) {
	      cur = cur.replace(tar, ' ');
	    }
	    el.setAttribute('class', cur.trim());
	  }
	  if (!el.className) {
	    el.removeAttribute('class');
	  }
	}

	/**
	 * Extract raw content inside an element into a temporary
	 * container div
	 *
	 * @param {Element} el
	 * @param {Boolean} asFragment
	 * @return {Element}
	 */

	function extractContent(el, asFragment) {
	  var child;
	  var rawContent;
	  /* istanbul ignore if */
	  if (isTemplate(el) && el.content instanceof DocumentFragment) {
	    el = el.content;
	  }
	  if (el.hasChildNodes()) {
	    trimNode(el);
	    rawContent = asFragment ? document.createDocumentFragment() : document.createElement('div');
	    /* eslint-disable no-cond-assign */
	    while (child = el.firstChild) {
	      /* eslint-enable no-cond-assign */
	      rawContent.appendChild(child);
	    }
	  }
	  return rawContent;
	}

	/**
	 * Trim possible empty head/tail textNodes inside a parent.
	 *
	 * @param {Node} node
	 */

	function trimNode(node) {
	  trim(node, node.firstChild);
	  trim(node, node.lastChild);
	}

	function trim(parent, node) {
	  if (node && node.nodeType === 3 && !node.data.trim()) {
	    parent.removeChild(node);
	  }
	}

	/**
	 * Check if an element is a template tag.
	 * Note if the template appears inside an SVG its tagName
	 * will be in lowercase.
	 *
	 * @param {Element} el
	 */

	function isTemplate(el) {
	  return el.tagName && el.tagName.toLowerCase() === 'template';
	}

	/**
	 * Create an "anchor" for performing dom insertion/removals.
	 * This is used in a number of scenarios:
	 * - fragment instance
	 * - v-html
	 * - v-if
	 * - v-for
	 * - component
	 *
	 * @param {String} content
	 * @param {Boolean} persist - IE trashes empty textNodes on
	 *                            cloneNode(true), so in certain
	 *                            cases the anchor needs to be
	 *                            non-empty to be persisted in
	 *                            templates.
	 * @return {Comment|Text}
	 */

	function createAnchor(content, persist) {
	  var anchor = config.debug ? document.createComment(content) : document.createTextNode(persist ? ' ' : '');
	  anchor.__vue_anchor = true;
	  return anchor;
	}

	/**
	 * Find a component ref attribute that starts with $.
	 *
	 * @param {Element} node
	 * @return {String|undefined}
	 */

	var refRE = /^v-ref:/;

	function findRef(node) {
	  if (node.hasAttributes()) {
	    var attrs = node.attributes;
	    for (var i = 0, l = attrs.length; i < l; i++) {
	      var name = attrs[i].name;
	      if (refRE.test(name)) {
	        return camelize(name.replace(refRE, ''));
	      }
	    }
	  }
	}

	/**
	 * Map a function to a range of nodes .
	 *
	 * @param {Node} node
	 * @param {Node} end
	 * @param {Function} op
	 */

	function mapNodeRange(node, end, op) {
	  var next;
	  while (node !== end) {
	    next = node.nextSibling;
	    op(node);
	    node = next;
	  }
	  op(end);
	}

	/**
	 * Remove a range of nodes with transition, store
	 * the nodes in a fragment with correct ordering,
	 * and call callback when done.
	 *
	 * @param {Node} start
	 * @param {Node} end
	 * @param {Vue} vm
	 * @param {DocumentFragment} frag
	 * @param {Function} cb
	 */

	function removeNodeRange(start, end, vm, frag, cb) {
	  var done = false;
	  var removed = 0;
	  var nodes = [];
	  mapNodeRange(start, end, function (node) {
	    if (node === end) done = true;
	    nodes.push(node);
	    removeWithTransition(node, vm, onRemoved);
	  });
	  function onRemoved() {
	    removed++;
	    if (done && removed >= nodes.length) {
	      for (var i = 0; i < nodes.length; i++) {
	        frag.appendChild(nodes[i]);
	      }
	      cb && cb();
	    }
	  }
	}

	var commonTagRE = /^(div|p|span|img|a|b|i|br|ul|ol|li|h1|h2|h3|h4|h5|h6|code|pre|table|th|td|tr|form|label|input|select|option|nav|article|section|header|footer)$/;

	/**
	 * Check if an element is a component, if yes return its
	 * component id.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Object|undefined}
	 */

	function checkComponentAttr(el, options) {
	  var tag = el.tagName.toLowerCase();
	  var hasAttrs = el.hasAttributes();
	  if (!commonTagRE.test(tag) && tag !== 'component') {
	    if (resolveAsset(options, 'components', tag)) {
	      return { id: tag };
	    } else {
	      var is = hasAttrs && getIsBinding(el);
	      if (is) {
	        return is;
	      } else if (process.env.NODE_ENV !== 'production') {
	        if (tag.indexOf('-') > -1 || /HTMLUnknownElement/.test(el.toString()) &&
	        // Chrome returns unknown for several HTML5 elements.
	        // https://code.google.com/p/chromium/issues/detail?id=540526
	        !/^(data|time|rtc|rb)$/.test(tag)) {
	          warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly?');
	        }
	      }
	    }
	  } else if (hasAttrs) {
	    return getIsBinding(el);
	  }
	}

	/**
	 * Get "is" binding from an element.
	 *
	 * @param {Element} el
	 * @return {Object|undefined}
	 */

	function getIsBinding(el) {
	  // dynamic syntax
	  var exp = getAttr(el, 'is');
	  if (exp != null) {
	    return { id: exp };
	  } else {
	    exp = getBindAttr(el, 'is');
	    if (exp != null) {
	      return { id: exp, dynamic: true };
	    }
	  }
	}

	/**
	 * Set a prop's initial value on a vm and its data object.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @param {*} value
	 */

	function initProp(vm, prop, value) {
	  var key = prop.path;
	  vm[key] = vm._data[key] = assertProp(prop, value) ? value : undefined;
	}

	/**
	 * Assert whether a prop is valid.
	 *
	 * @param {Object} prop
	 * @param {*} value
	 */

	function assertProp(prop, value) {
	  // if a prop is not provided and is not required,
	  // skip the check.
	  if (prop.raw === null && !prop.required) {
	    return true;
	  }
	  var options = prop.options;
	  var type = options.type;
	  var valid = true;
	  var expectedType;
	  if (type) {
	    if (type === String) {
	      expectedType = 'string';
	      valid = typeof value === expectedType;
	    } else if (type === Number) {
	      expectedType = 'number';
	      valid = typeof value === 'number';
	    } else if (type === Boolean) {
	      expectedType = 'boolean';
	      valid = typeof value === 'boolean';
	    } else if (type === Function) {
	      expectedType = 'function';
	      valid = typeof value === 'function';
	    } else if (type === Object) {
	      expectedType = 'object';
	      valid = isPlainObject(value);
	    } else if (type === Array) {
	      expectedType = 'array';
	      valid = isArray(value);
	    } else {
	      valid = value instanceof type;
	    }
	  }
	  if (!valid) {
	    process.env.NODE_ENV !== 'production' && warn('Invalid prop: type check failed for ' + prop.path + '="' + prop.raw + '".' + ' Expected ' + formatType(expectedType) + ', got ' + formatValue(value) + '.');
	    return false;
	  }
	  var validator = options.validator;
	  if (validator) {
	    if (!validator.call(null, value)) {
	      process.env.NODE_ENV !== 'production' && warn('Invalid prop: custom validator check failed for ' + prop.path + '="' + prop.raw + '"');
	      return false;
	    }
	  }
	  return true;
	}

	function formatType(val) {
	  return val ? val.charAt(0).toUpperCase() + val.slice(1) : 'custom type';
	}

	function formatValue(val) {
	  return Object.prototype.toString.call(val).slice(8, -1);
	}

	/**
	 * Option overwriting strategies are functions that handle
	 * how to merge a parent option value and a child option
	 * value into the final value.
	 *
	 * All strategy functions follow the same signature:
	 *
	 * @param {*} parentVal
	 * @param {*} childVal
	 * @param {Vue} [vm]
	 */

	var strats = config.optionMergeStrategies = Object.create(null);

	/**
	 * Helper that recursively merges two data objects together.
	 */

	function mergeData(to, from) {
	  var key, toVal, fromVal;
	  for (key in from) {
	    toVal = to[key];
	    fromVal = from[key];
	    if (!hasOwn(to, key)) {
	      set(to, key, fromVal);
	    } else if (isObject(toVal) && isObject(fromVal)) {
	      mergeData(toVal, fromVal);
	    }
	  }
	  return to;
	}

	/**
	 * Data
	 */

	strats.data = function (parentVal, childVal, vm) {
	  if (!vm) {
	    // in a Vue.extend merge, both should be functions
	    if (!childVal) {
	      return parentVal;
	    }
	    if (typeof childVal !== 'function') {
	      process.env.NODE_ENV !== 'production' && warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.');
	      return parentVal;
	    }
	    if (!parentVal) {
	      return childVal;
	    }
	    // when parentVal & childVal are both present,
	    // we need to return a function that returns the
	    // merged result of both functions... no need to
	    // check if parentVal is a function here because
	    // it has to be a function to pass previous merges.
	    return function mergedDataFn() {
	      return mergeData(childVal.call(this), parentVal.call(this));
	    };
	  } else if (parentVal || childVal) {
	    return function mergedInstanceDataFn() {
	      // instance merge
	      var instanceData = typeof childVal === 'function' ? childVal.call(vm) : childVal;
	      var defaultData = typeof parentVal === 'function' ? parentVal.call(vm) : undefined;
	      if (instanceData) {
	        return mergeData(instanceData, defaultData);
	      } else {
	        return defaultData;
	      }
	    };
	  }
	};

	/**
	 * El
	 */

	strats.el = function (parentVal, childVal, vm) {
	  if (!vm && childVal && typeof childVal !== 'function') {
	    process.env.NODE_ENV !== 'production' && warn('The "el" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.');
	    return;
	  }
	  var ret = childVal || parentVal;
	  // invoke the element factory if this is instance merge
	  return vm && typeof ret === 'function' ? ret.call(vm) : ret;
	};

	/**
	 * Hooks and param attributes are merged as arrays.
	 */

	strats.init = strats.created = strats.ready = strats.attached = strats.detached = strats.beforeCompile = strats.compiled = strats.beforeDestroy = strats.destroyed = function (parentVal, childVal) {
	  return childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
	};

	/**
	 * 0.11 deprecation warning
	 */

	strats.paramAttributes = function () {
	  /* istanbul ignore next */
	  process.env.NODE_ENV !== 'production' && warn('"paramAttributes" option has been deprecated in 0.12. ' + 'Use "props" instead.');
	};

	/**
	 * Assets
	 *
	 * When a vm is present (instance creation), we need to do
	 * a three-way merge between constructor options, instance
	 * options and parent options.
	 */

	function mergeAssets(parentVal, childVal) {
	  var res = Object.create(parentVal);
	  return childVal ? extend(res, guardArrayAssets(childVal)) : res;
	}

	config._assetTypes.forEach(function (type) {
	  strats[type + 's'] = mergeAssets;
	});

	/**
	 * Events & Watchers.
	 *
	 * Events & watchers hashes should not overwrite one
	 * another, so we merge them as arrays.
	 */

	strats.watch = strats.events = function (parentVal, childVal) {
	  if (!childVal) return parentVal;
	  if (!parentVal) return childVal;
	  var ret = {};
	  extend(ret, parentVal);
	  for (var key in childVal) {
	    var parent = ret[key];
	    var child = childVal[key];
	    if (parent && !isArray(parent)) {
	      parent = [parent];
	    }
	    ret[key] = parent ? parent.concat(child) : [child];
	  }
	  return ret;
	};

	/**
	 * Other object hashes.
	 */

	strats.props = strats.methods = strats.computed = function (parentVal, childVal) {
	  if (!childVal) return parentVal;
	  if (!parentVal) return childVal;
	  var ret = Object.create(null);
	  extend(ret, parentVal);
	  extend(ret, childVal);
	  return ret;
	};

	/**
	 * Default strategy.
	 */

	var defaultStrat = function defaultStrat(parentVal, childVal) {
	  return childVal === undefined ? parentVal : childVal;
	};

	/**
	 * Make sure component options get converted to actual
	 * constructors.
	 *
	 * @param {Object} options
	 */

	function guardComponents(options) {
	  if (options.components) {
	    var components = options.components = guardArrayAssets(options.components);
	    var def;
	    var ids = Object.keys(components);
	    for (var i = 0, l = ids.length; i < l; i++) {
	      var key = ids[i];
	      if (commonTagRE.test(key)) {
	        process.env.NODE_ENV !== 'production' && warn('Do not use built-in HTML elements as component ' + 'id: ' + key);
	        continue;
	      }
	      def = components[key];
	      if (isPlainObject(def)) {
	        components[key] = Vue.extend(def);
	      }
	    }
	  }
	}

	/**
	 * Ensure all props option syntax are normalized into the
	 * Object-based format.
	 *
	 * @param {Object} options
	 */

	function guardProps(options) {
	  var props = options.props;
	  var i, val;
	  if (isArray(props)) {
	    options.props = {};
	    i = props.length;
	    while (i--) {
	      val = props[i];
	      if (typeof val === 'string') {
	        options.props[val] = null;
	      } else if (val.name) {
	        options.props[val.name] = val;
	      }
	    }
	  } else if (isPlainObject(props)) {
	    var keys = Object.keys(props);
	    i = keys.length;
	    while (i--) {
	      val = props[keys[i]];
	      if (typeof val === 'function') {
	        props[keys[i]] = { type: val };
	      }
	    }
	  }
	}

	/**
	 * Guard an Array-format assets option and converted it
	 * into the key-value Object format.
	 *
	 * @param {Object|Array} assets
	 * @return {Object}
	 */

	function guardArrayAssets(assets) {
	  if (isArray(assets)) {
	    var res = {};
	    var i = assets.length;
	    var asset;
	    while (i--) {
	      asset = assets[i];
	      var id = typeof asset === 'function' ? asset.options && asset.options.name || asset.id : asset.name || asset.id;
	      if (!id) {
	        process.env.NODE_ENV !== 'production' && warn('Array-syntax assets must provide a "name" or "id" field.');
	      } else {
	        res[id] = asset;
	      }
	    }
	    return res;
	  }
	  return assets;
	}

	/**
	 * Merge two option objects into a new one.
	 * Core utility used in both instantiation and inheritance.
	 *
	 * @param {Object} parent
	 * @param {Object} child
	 * @param {Vue} [vm] - if vm is present, indicates this is
	 *                     an instantiation merge.
	 */

	function mergeOptions(parent, child, vm) {
	  guardComponents(child);
	  guardProps(child);
	  var options = {};
	  var key;
	  if (child.mixins) {
	    for (var i = 0, l = child.mixins.length; i < l; i++) {
	      parent = mergeOptions(parent, child.mixins[i], vm);
	    }
	  }
	  for (key in parent) {
	    mergeField(key);
	  }
	  for (key in child) {
	    if (!hasOwn(parent, key)) {
	      mergeField(key);
	    }
	  }
	  function mergeField(key) {
	    var strat = strats[key] || defaultStrat;
	    options[key] = strat(parent[key], child[key], vm, key);
	  }
	  return options;
	}

	/**
	 * Resolve an asset.
	 * This function is used because child instances need access
	 * to assets defined in its ancestor chain.
	 *
	 * @param {Object} options
	 * @param {String} type
	 * @param {String} id
	 * @return {Object|Function}
	 */

	function resolveAsset(options, type, id) {
	  var assets = options[type];
	  var camelizedId;
	  return assets[id] ||
	  // camelCase ID
	  assets[camelizedId = camelize(id)] ||
	  // Pascal Case ID
	  assets[camelizedId.charAt(0).toUpperCase() + camelizedId.slice(1)];
	}

	/**
	 * Assert asset exists
	 */

	function assertAsset(val, type, id) {
	  if (!val) {
	    process.env.NODE_ENV !== 'production' && warn('Failed to resolve ' + type + ': ' + id);
	  }
	}

	var arrayProto = Array.prototype;
	var arrayMethods = Object.create(arrayProto)

	/**
	 * Intercept mutating methods and emit events
	 */

	;['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
	  // cache original method
	  var original = arrayProto[method];
	  def(arrayMethods, method, function mutator() {
	    // avoid leaking arguments:
	    // http://jsperf.com/closure-with-arguments
	    var i = arguments.length;
	    var args = new Array(i);
	    while (i--) {
	      args[i] = arguments[i];
	    }
	    var result = original.apply(this, args);
	    var ob = this.__ob__;
	    var inserted;
	    switch (method) {
	      case 'push':
	        inserted = args;
	        break;
	      case 'unshift':
	        inserted = args;
	        break;
	      case 'splice':
	        inserted = args.slice(2);
	        break;
	    }
	    if (inserted) ob.observeArray(inserted);
	    // notify change
	    ob.dep.notify();
	    return result;
	  });
	});

	/**
	 * Swap the element at the given index with a new value
	 * and emits corresponding event.
	 *
	 * @param {Number} index
	 * @param {*} val
	 * @return {*} - replaced element
	 */

	def(arrayProto, '$set', function $set(index, val) {
	  if (index >= this.length) {
	    this.length = index + 1;
	  }
	  return this.splice(index, 1, val)[0];
	});

	/**
	 * Convenience method to remove the element at given index.
	 *
	 * @param {Number} index
	 * @param {*} val
	 */

	def(arrayProto, '$remove', function $remove(item) {
	  /* istanbul ignore if */
	  if (!this.length) return;
	  var index = indexOf(this, item);
	  if (index > -1) {
	    return this.splice(index, 1);
	  }
	});

	var uid$3 = 0;

	/**
	 * A dep is an observable that can have multiple
	 * directives subscribing to it.
	 *
	 * @constructor
	 */
	function Dep() {
	  this.id = uid$3++;
	  this.subs = [];
	}

	// the current target watcher being evaluated.
	// this is globally unique because there could be only one
	// watcher being evaluated at any time.
	Dep.target = null;

	/**
	 * Add a directive subscriber.
	 *
	 * @param {Directive} sub
	 */

	Dep.prototype.addSub = function (sub) {
	  this.subs.push(sub);
	};

	/**
	 * Remove a directive subscriber.
	 *
	 * @param {Directive} sub
	 */

	Dep.prototype.removeSub = function (sub) {
	  this.subs.$remove(sub);
	};

	/**
	 * Add self as a dependency to the target watcher.
	 */

	Dep.prototype.depend = function () {
	  Dep.target.addDep(this);
	};

	/**
	 * Notify all subscribers of a new value.
	 */

	Dep.prototype.notify = function () {
	  // stablize the subscriber list first
	  var subs = toArray(this.subs);
	  for (var i = 0, l = subs.length; i < l; i++) {
	    subs[i].update();
	  }
	};

	var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

	/**
	 * Observer class that are attached to each observed
	 * object. Once attached, the observer converts target
	 * object's property keys into getter/setters that
	 * collect dependencies and dispatches updates.
	 *
	 * @param {Array|Object} value
	 * @constructor
	 */

	function Observer(value) {
	  this.value = value;
	  this.dep = new Dep();
	  def(value, '__ob__', this);
	  if (isArray(value)) {
	    var augment = hasProto ? protoAugment : copyAugment;
	    augment(value, arrayMethods, arrayKeys);
	    this.observeArray(value);
	  } else {
	    this.walk(value);
	  }
	}

	// Instance methods

	/**
	 * Walk through each property and convert them into
	 * getter/setters. This method should only be called when
	 * value type is Object.
	 *
	 * @param {Object} obj
	 */

	Observer.prototype.walk = function (obj) {
	  var keys = Object.keys(obj);
	  var i = keys.length;
	  while (i--) {
	    this.convert(keys[i], obj[keys[i]]);
	  }
	};

	/**
	 * Observe a list of Array items.
	 *
	 * @param {Array} items
	 */

	Observer.prototype.observeArray = function (items) {
	  var i = items.length;
	  while (i--) {
	    observe(items[i]);
	  }
	};

	/**
	 * Convert a property into getter/setter so we can emit
	 * the events when the property is accessed/changed.
	 *
	 * @param {String} key
	 * @param {*} val
	 */

	Observer.prototype.convert = function (key, val) {
	  defineReactive(this.value, key, val);
	};

	/**
	 * Add an owner vm, so that when $set/$delete mutations
	 * happen we can notify owner vms to proxy the keys and
	 * digest the watchers. This is only called when the object
	 * is observed as an instance's root $data.
	 *
	 * @param {Vue} vm
	 */

	Observer.prototype.addVm = function (vm) {
	  (this.vms || (this.vms = [])).push(vm);
	};

	/**
	 * Remove an owner vm. This is called when the object is
	 * swapped out as an instance's $data object.
	 *
	 * @param {Vue} vm
	 */

	Observer.prototype.removeVm = function (vm) {
	  this.vms.$remove(vm);
	};

	// helpers

	/**
	 * Augment an target Object or Array by intercepting
	 * the prototype chain using __proto__
	 *
	 * @param {Object|Array} target
	 * @param {Object} proto
	 */

	function protoAugment(target, src) {
	  target.__proto__ = src;
	}

	/**
	 * Augment an target Object or Array by defining
	 * hidden properties.
	 *
	 * @param {Object|Array} target
	 * @param {Object} proto
	 */

	function copyAugment(target, src, keys) {
	  var i = keys.length;
	  var key;
	  while (i--) {
	    key = keys[i];
	    def(target, key, src[key]);
	  }
	}

	/**
	 * Attempt to create an observer instance for a value,
	 * returns the new observer if successfully observed,
	 * or the existing observer if the value already has one.
	 *
	 * @param {*} value
	 * @param {Vue} [vm]
	 * @return {Observer|undefined}
	 * @static
	 */

	function observe(value, vm) {
	  if (!value || typeof value !== 'object') {
	    return;
	  }
	  var ob;
	  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
	    ob = value.__ob__;
	  } else if ((isArray(value) || isPlainObject(value)) && !Object.isFrozen(value) && !value._isVue) {
	    ob = new Observer(value);
	  }
	  if (ob && vm) {
	    ob.addVm(vm);
	  }
	  return ob;
	}

	/**
	 * Define a reactive property on an Object.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 */

	function defineReactive(obj, key, val) {
	  var dep = new Dep();

	  // cater for pre-defined getter/setters
	  var getter, setter;
	  if (config.convertAllProperties) {
	    var property = Object.getOwnPropertyDescriptor(obj, key);
	    if (property && property.configurable === false) {
	      return;
	    }
	    getter = property && property.get;
	    setter = property && property.set;
	  }

	  var childOb = observe(val);
	  Object.defineProperty(obj, key, {
	    enumerable: true,
	    configurable: true,
	    get: function reactiveGetter() {
	      var value = getter ? getter.call(obj) : val;
	      if (Dep.target) {
	        dep.depend();
	        if (childOb) {
	          childOb.dep.depend();
	        }
	        if (isArray(value)) {
	          for (var e, i = 0, l = value.length; i < l; i++) {
	            e = value[i];
	            e && e.__ob__ && e.__ob__.dep.depend();
	          }
	        }
	      }
	      return value;
	    },
	    set: function reactiveSetter(newVal) {
	      var value = getter ? getter.call(obj) : val;
	      if (newVal === value) {
	        return;
	      }
	      if (setter) {
	        setter.call(obj, newVal);
	      } else {
	        val = newVal;
	      }
	      childOb = observe(newVal);
	      dep.notify();
	    }
	  });
	}

	var util = Object.freeze({
		defineReactive: defineReactive,
		set: set,
		del: del,
		hasOwn: hasOwn,
		isLiteral: isLiteral,
		isReserved: isReserved,
		_toString: _toString,
		toNumber: toNumber,
		toBoolean: toBoolean,
		stripQuotes: stripQuotes,
		camelize: camelize,
		hyphenate: hyphenate,
		classify: classify,
		bind: bind$1,
		toArray: toArray,
		extend: extend,
		isObject: isObject,
		isPlainObject: isPlainObject,
		def: def,
		debounce: _debounce,
		indexOf: indexOf,
		cancellable: cancellable,
		looseEqual: looseEqual,
		isArray: isArray,
		hasProto: hasProto,
		inBrowser: inBrowser,
		isIE9: isIE9,
		isAndroid: isAndroid,
		get transitionProp () { return transitionProp; },
		get transitionEndEvent () { return transitionEndEvent; },
		get animationProp () { return animationProp; },
		get animationEndEvent () { return animationEndEvent; },
		nextTick: nextTick,
		query: query,
		inDoc: inDoc,
		getAttr: getAttr,
		getBindAttr: getBindAttr,
		before: before,
		after: after,
		remove: remove,
		prepend: prepend,
		replace: replace,
		on: on$1,
		off: off,
		addClass: addClass,
		removeClass: removeClass,
		extractContent: extractContent,
		trimNode: trimNode,
		isTemplate: isTemplate,
		createAnchor: createAnchor,
		findRef: findRef,
		mapNodeRange: mapNodeRange,
		removeNodeRange: removeNodeRange,
		mergeOptions: mergeOptions,
		resolveAsset: resolveAsset,
		assertAsset: assertAsset,
		checkComponentAttr: checkComponentAttr,
		initProp: initProp,
		assertProp: assertProp,
		commonTagRE: commonTagRE,
		get warn () { return warn; }
	});

	var uid = 0;

	function initMixin (Vue) {

	  /**
	   * The main init sequence. This is called for every
	   * instance, including ones that are created from extended
	   * constructors.
	   *
	   * @param {Object} options - this options object should be
	   *                           the result of merging class
	   *                           options and the options passed
	   *                           in to the constructor.
	   */

	  Vue.prototype._init = function (options) {

	    options = options || {};

	    this.$el = null;
	    this.$parent = options.parent;
	    this.$root = this.$parent ? this.$parent.$root : this;
	    this.$children = [];
	    this.$refs = {}; // child vm references
	    this.$els = {}; // element references
	    this._watchers = []; // all watchers as an array
	    this._directives = []; // all directives

	    // a uid
	    this._uid = uid++;

	    // a flag to avoid this being observed
	    this._isVue = true;

	    // events bookkeeping
	    this._events = {}; // registered callbacks
	    this._eventsCount = {}; // for $broadcast optimization

	    // fragment instance properties
	    this._isFragment = false;
	    this._fragment = // @type {DocumentFragment}
	    this._fragmentStart = // @type {Text|Comment}
	    this._fragmentEnd = null; // @type {Text|Comment}

	    // lifecycle state
	    this._isCompiled = this._isDestroyed = this._isReady = this._isAttached = this._isBeingDestroyed = false;
	    this._unlinkFn = null;

	    // context:
	    // if this is a transcluded component, context
	    // will be the common parent vm of this instance
	    // and its host.
	    this._context = options._context || this.$parent;

	    // scope:
	    // if this is inside an inline v-for, the scope
	    // will be the intermediate scope created for this
	    // repeat fragment. this is used for linking props
	    // and container directives.
	    this._scope = options._scope;

	    // fragment:
	    // if this instance is compiled inside a Fragment, it
	    // needs to reigster itself as a child of that fragment
	    // for attach/detach to work properly.
	    this._frag = options._frag;
	    if (this._frag) {
	      this._frag.children.push(this);
	    }

	    // push self into parent / transclusion host
	    if (this.$parent) {
	      this.$parent.$children.push(this);
	    }

	    // merge options.
	    options = this.$options = mergeOptions(this.constructor.options, options, this);

	    // set ref
	    this._updateRef();

	    // initialize data as empty object.
	    // it will be filled up in _initScope().
	    this._data = {};

	    // call init hook
	    this._callHook('init');

	    // initialize data observation and scope inheritance.
	    this._initState();

	    // setup event system and option events.
	    this._initEvents();

	    // call created hook
	    this._callHook('created');

	    // if `el` option is passed, start compilation.
	    if (options.el) {
	      this.$mount(options.el);
	    }
	  };
	}

	var pathCache = new Cache(1000);

	// actions
	var APPEND = 0;
	var PUSH = 1;
	var INC_SUB_PATH_DEPTH = 2;
	var PUSH_SUB_PATH = 3;

	// states
	var BEFORE_PATH = 0;
	var IN_PATH = 1;
	var BEFORE_IDENT = 2;
	var IN_IDENT = 3;
	var IN_SUB_PATH = 4;
	var IN_SINGLE_QUOTE = 5;
	var IN_DOUBLE_QUOTE = 6;
	var AFTER_PATH = 7;
	var ERROR = 8;

	var pathStateMachine = [];

	pathStateMachine[BEFORE_PATH] = {
	  'ws': [BEFORE_PATH],
	  'ident': [IN_IDENT, APPEND],
	  '[': [IN_SUB_PATH],
	  'eof': [AFTER_PATH]
	};

	pathStateMachine[IN_PATH] = {
	  'ws': [IN_PATH],
	  '.': [BEFORE_IDENT],
	  '[': [IN_SUB_PATH],
	  'eof': [AFTER_PATH]
	};

	pathStateMachine[BEFORE_IDENT] = {
	  'ws': [BEFORE_IDENT],
	  'ident': [IN_IDENT, APPEND]
	};

	pathStateMachine[IN_IDENT] = {
	  'ident': [IN_IDENT, APPEND],
	  '0': [IN_IDENT, APPEND],
	  'number': [IN_IDENT, APPEND],
	  'ws': [IN_PATH, PUSH],
	  '.': [BEFORE_IDENT, PUSH],
	  '[': [IN_SUB_PATH, PUSH],
	  'eof': [AFTER_PATH, PUSH]
	};

	pathStateMachine[IN_SUB_PATH] = {
	  "'": [IN_SINGLE_QUOTE, APPEND],
	  '"': [IN_DOUBLE_QUOTE, APPEND],
	  '[': [IN_SUB_PATH, INC_SUB_PATH_DEPTH],
	  ']': [IN_PATH, PUSH_SUB_PATH],
	  'eof': ERROR,
	  'else': [IN_SUB_PATH, APPEND]
	};

	pathStateMachine[IN_SINGLE_QUOTE] = {
	  "'": [IN_SUB_PATH, APPEND],
	  'eof': ERROR,
	  'else': [IN_SINGLE_QUOTE, APPEND]
	};

	pathStateMachine[IN_DOUBLE_QUOTE] = {
	  '"': [IN_SUB_PATH, APPEND],
	  'eof': ERROR,
	  'else': [IN_DOUBLE_QUOTE, APPEND]
	};

	/**
	 * Determine the type of a character in a keypath.
	 *
	 * @param {Char} ch
	 * @return {String} type
	 */

	function getPathCharType(ch) {
	  if (ch === undefined) {
	    return 'eof';
	  }

	  var code = ch.charCodeAt(0);

	  switch (code) {
	    case 0x5B: // [
	    case 0x5D: // ]
	    case 0x2E: // .
	    case 0x22: // "
	    case 0x27: // '
	    case 0x30:
	      // 0
	      return ch;

	    case 0x5F: // _
	    case 0x24:
	      // $
	      return 'ident';

	    case 0x20: // Space
	    case 0x09: // Tab
	    case 0x0A: // Newline
	    case 0x0D: // Return
	    case 0xA0: // No-break space
	    case 0xFEFF: // Byte Order Mark
	    case 0x2028: // Line Separator
	    case 0x2029:
	      // Paragraph Separator
	      return 'ws';
	  }

	  // a-z, A-Z
	  if (code >= 0x61 && code <= 0x7A || code >= 0x41 && code <= 0x5A) {
	    return 'ident';
	  }

	  // 1-9
	  if (code >= 0x31 && code <= 0x39) {
	    return 'number';
	  }

	  return 'else';
	}

	/**
	 * Format a subPath, return its plain form if it is
	 * a literal string or number. Otherwise prepend the
	 * dynamic indicator (*).
	 *
	 * @param {String} path
	 * @return {String}
	 */

	function formatSubPath(path) {
	  var trimmed = path.trim();
	  // invalid leading 0
	  if (path.charAt(0) === '0' && isNaN(path)) {
	    return false;
	  }
	  return isLiteral(trimmed) ? stripQuotes(trimmed) : '*' + trimmed;
	}

	/**
	 * Parse a string path into an array of segments
	 *
	 * @param {String} path
	 * @return {Array|undefined}
	 */

	function parse(path) {
	  var keys = [];
	  var index = -1;
	  var mode = BEFORE_PATH;
	  var subPathDepth = 0;
	  var c, newChar, key, type, transition, action, typeMap;

	  var actions = [];

	  actions[PUSH] = function () {
	    if (key !== undefined) {
	      keys.push(key);
	      key = undefined;
	    }
	  };

	  actions[APPEND] = function () {
	    if (key === undefined) {
	      key = newChar;
	    } else {
	      key += newChar;
	    }
	  };

	  actions[INC_SUB_PATH_DEPTH] = function () {
	    actions[APPEND]();
	    subPathDepth++;
	  };

	  actions[PUSH_SUB_PATH] = function () {
	    if (subPathDepth > 0) {
	      subPathDepth--;
	      mode = IN_SUB_PATH;
	      actions[APPEND]();
	    } else {
	      subPathDepth = 0;
	      key = formatSubPath(key);
	      if (key === false) {
	        return false;
	      } else {
	        actions[PUSH]();
	      }
	    }
	  };

	  function maybeUnescapeQuote() {
	    var nextChar = path[index + 1];
	    if (mode === IN_SINGLE_QUOTE && nextChar === "'" || mode === IN_DOUBLE_QUOTE && nextChar === '"') {
	      index++;
	      newChar = '\\' + nextChar;
	      actions[APPEND]();
	      return true;
	    }
	  }

	  while (mode != null) {
	    index++;
	    c = path[index];

	    if (c === '\\' && maybeUnescapeQuote()) {
	      continue;
	    }

	    type = getPathCharType(c);
	    typeMap = pathStateMachine[mode];
	    transition = typeMap[type] || typeMap['else'] || ERROR;

	    if (transition === ERROR) {
	      return; // parse error
	    }

	    mode = transition[0];
	    action = actions[transition[1]];
	    if (action) {
	      newChar = transition[2];
	      newChar = newChar === undefined ? c : newChar;
	      if (action() === false) {
	        return;
	      }
	    }

	    if (mode === AFTER_PATH) {
	      keys.raw = path;
	      return keys;
	    }
	  }
	}

	/**
	 * External parse that check for a cache hit first
	 *
	 * @param {String} path
	 * @return {Array|undefined}
	 */

	function parsePath(path) {
	  var hit = pathCache.get(path);
	  if (!hit) {
	    hit = parse(path);
	    if (hit) {
	      pathCache.put(path, hit);
	    }
	  }
	  return hit;
	}

	/**
	 * Get from an object from a path string
	 *
	 * @param {Object} obj
	 * @param {String} path
	 */

	function getPath(obj, path) {
	  return parseExpression(path).get(obj);
	}

	/**
	 * Warn against setting non-existent root path on a vm.
	 */

	var warnNonExistent;
	if (process.env.NODE_ENV !== 'production') {
	  warnNonExistent = function (path) {
	    warn('You are setting a non-existent path "' + path.raw + '" ' + 'on a vm instance. Consider pre-initializing the property ' + 'with the "data" option for more reliable reactivity ' + 'and better performance.');
	  };
	}

	/**
	 * Set on an object from a path
	 *
	 * @param {Object} obj
	 * @param {String | Array} path
	 * @param {*} val
	 */

	function setPath(obj, path, val) {
	  var original = obj;
	  if (typeof path === 'string') {
	    path = parse(path);
	  }
	  if (!path || !isObject(obj)) {
	    return false;
	  }
	  var last, key;
	  for (var i = 0, l = path.length; i < l; i++) {
	    last = obj;
	    key = path[i];
	    if (key.charAt(0) === '*') {
	      key = parseExpression(key.slice(1)).get.call(original, original);
	    }
	    if (i < l - 1) {
	      obj = obj[key];
	      if (!isObject(obj)) {
	        obj = {};
	        if (process.env.NODE_ENV !== 'production' && last._isVue) {
	          warnNonExistent(path);
	        }
	        set(last, key, obj);
	      }
	    } else {
	      if (isArray(obj)) {
	        obj.$set(key, val);
	      } else if (key in obj) {
	        obj[key] = val;
	      } else {
	        if (process.env.NODE_ENV !== 'production' && obj._isVue) {
	          warnNonExistent(path);
	        }
	        set(obj, key, val);
	      }
	    }
	  }
	  return true;
	}

	var path = Object.freeze({
	  parsePath: parsePath,
	  getPath: getPath,
	  setPath: setPath
	});

	var expressionCache = new Cache(1000);

	var allowedKeywords = 'Math,Date,this,true,false,null,undefined,Infinity,NaN,' + 'isNaN,isFinite,decodeURI,decodeURIComponent,encodeURI,' + 'encodeURIComponent,parseInt,parseFloat';
	var allowedKeywordsRE = new RegExp('^(' + allowedKeywords.replace(/,/g, '\\b|') + '\\b)');

	// keywords that don't make sense inside expressions
	var improperKeywords = 'break,case,class,catch,const,continue,debugger,default,' + 'delete,do,else,export,extends,finally,for,function,if,' + 'import,in,instanceof,let,return,super,switch,throw,try,' + 'var,while,with,yield,enum,await,implements,package,' + 'proctected,static,interface,private,public';
	var improperKeywordsRE = new RegExp('^(' + improperKeywords.replace(/,/g, '\\b|') + '\\b)');

	var wsRE = /\s/g;
	var newlineRE = /\n/g;
	var saveRE = /[\{,]\s*[\w\$_]+\s*:|('[^']*'|"[^"]*")|new |typeof |void /g;
	var restoreRE = /"(\d+)"/g;
	var pathTestRE = /^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\]|\[[A-Za-z_$][\w$]*\])*$/;
	var pathReplaceRE = /[^\w$\.]([A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\])*)/g;
	var booleanLiteralRE = /^(true|false)$/;

	/**
	 * Save / Rewrite / Restore
	 *
	 * When rewriting paths found in an expression, it is
	 * possible for the same letter sequences to be found in
	 * strings and Object literal property keys. Therefore we
	 * remove and store these parts in a temporary array, and
	 * restore them after the path rewrite.
	 */

	var saved = [];

	/**
	 * Save replacer
	 *
	 * The save regex can match two possible cases:
	 * 1. An opening object literal
	 * 2. A string
	 * If matched as a plain string, we need to escape its
	 * newlines, since the string needs to be preserved when
	 * generating the function body.
	 *
	 * @param {String} str
	 * @param {String} isString - str if matched as a string
	 * @return {String} - placeholder with index
	 */

	function save(str, isString) {
	  var i = saved.length;
	  saved[i] = isString ? str.replace(newlineRE, '\\n') : str;
	  return '"' + i + '"';
	}

	/**
	 * Path rewrite replacer
	 *
	 * @param {String} raw
	 * @return {String}
	 */

	function rewrite(raw) {
	  var c = raw.charAt(0);
	  var path = raw.slice(1);
	  if (allowedKeywordsRE.test(path)) {
	    return raw;
	  } else {
	    path = path.indexOf('"') > -1 ? path.replace(restoreRE, restore) : path;
	    return c + 'scope.' + path;
	  }
	}

	/**
	 * Restore replacer
	 *
	 * @param {String} str
	 * @param {String} i - matched save index
	 * @return {String}
	 */

	function restore(str, i) {
	  return saved[i];
	}

	/**
	 * Rewrite an expression, prefixing all path accessors with
	 * `scope.` and generate getter/setter functions.
	 *
	 * @param {String} exp
	 * @return {Function}
	 */

	function compileGetter(exp) {
	  if (improperKeywordsRE.test(exp)) {
	    process.env.NODE_ENV !== 'production' && warn('Avoid using reserved keywords in expression: ' + exp);
	  }
	  // reset state
	  saved.length = 0;
	  // save strings and object literal keys
	  var body = exp.replace(saveRE, save).replace(wsRE, '');
	  // rewrite all paths
	  // pad 1 space here becaue the regex matches 1 extra char
	  body = (' ' + body).replace(pathReplaceRE, rewrite).replace(restoreRE, restore);
	  return makeGetterFn(body);
	}

	/**
	 * Build a getter function. Requires eval.
	 *
	 * We isolate the try/catch so it doesn't affect the
	 * optimization of the parse function when it is not called.
	 *
	 * @param {String} body
	 * @return {Function|undefined}
	 */

	function makeGetterFn(body) {
	  try {
	    return new Function('scope', 'return ' + body + ';');
	  } catch (e) {
	    process.env.NODE_ENV !== 'production' && warn('Invalid expression. ' + 'Generated function body: ' + body);
	  }
	}

	/**
	 * Compile a setter function for the expression.
	 *
	 * @param {String} exp
	 * @return {Function|undefined}
	 */

	function compileSetter(exp) {
	  var path = parsePath(exp);
	  if (path) {
	    return function (scope, val) {
	      setPath(scope, path, val);
	    };
	  } else {
	    process.env.NODE_ENV !== 'production' && warn('Invalid setter expression: ' + exp);
	  }
	}

	/**
	 * Parse an expression into re-written getter/setters.
	 *
	 * @param {String} exp
	 * @param {Boolean} needSet
	 * @return {Function}
	 */

	function parseExpression(exp, needSet) {
	  exp = exp.trim();
	  // try cache
	  var hit = expressionCache.get(exp);
	  if (hit) {
	    if (needSet && !hit.set) {
	      hit.set = compileSetter(hit.exp);
	    }
	    return hit;
	  }
	  var res = { exp: exp };
	  res.get = isSimplePath(exp) && exp.indexOf('[') < 0
	  // optimized super simple getter
	  ? makeGetterFn('scope.' + exp)
	  // dynamic getter
	  : compileGetter(exp);
	  if (needSet) {
	    res.set = compileSetter(exp);
	  }
	  expressionCache.put(exp, res);
	  return res;
	}

	/**
	 * Check if an expression is a simple path.
	 *
	 * @param {String} exp
	 * @return {Boolean}
	 */

	function isSimplePath(exp) {
	  return pathTestRE.test(exp) &&
	  // don't treat true/false as paths
	  !booleanLiteralRE.test(exp) &&
	  // Math constants e.g. Math.PI, Math.E etc.
	  exp.slice(0, 5) !== 'Math.';
	}

	var expression = Object.freeze({
	  parseExpression: parseExpression,
	  isSimplePath: isSimplePath
	});

	// we have two separate queues: one for directive updates
	// and one for user watcher registered via $watch().
	// we want to guarantee directive updates to be called
	// before user watchers so that when user watchers are
	// triggered, the DOM would have already been in updated
	// state.
	var queue = [];
	var userQueue = [];
	var has = {};
	var circular = {};
	var waiting = false;
	var internalQueueDepleted = false;

	/**
	 * Reset the batcher's state.
	 */

	function resetBatcherState() {
	  queue = [];
	  userQueue = [];
	  has = {};
	  circular = {};
	  waiting = internalQueueDepleted = false;
	}

	/**
	 * Flush both queues and run the watchers.
	 */

	function flushBatcherQueue() {
	  runBatcherQueue(queue);
	  internalQueueDepleted = true;
	  runBatcherQueue(userQueue);
	  // dev tool hook
	  /* istanbul ignore if */
	  if (process.env.NODE_ENV !== 'production') {
	    if (inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
	      window.__VUE_DEVTOOLS_GLOBAL_HOOK__.emit('flush');
	    }
	  }
	  resetBatcherState();
	}

	/**
	 * Run the watchers in a single queue.
	 *
	 * @param {Array} queue
	 */

	function runBatcherQueue(queue) {
	  // do not cache length because more watchers might be pushed
	  // as we run existing watchers
	  for (var i = 0; i < queue.length; i++) {
	    var watcher = queue[i];
	    var id = watcher.id;
	    has[id] = null;
	    watcher.run();
	    // in dev build, check and stop circular updates.
	    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
	      circular[id] = (circular[id] || 0) + 1;
	      if (circular[id] > config._maxUpdateCount) {
	        queue.splice(has[id], 1);
	        warn('You may have an infinite update loop for watcher ' + 'with expression: ' + watcher.expression);
	      }
	    }
	  }
	}

	/**
	 * Push a watcher into the watcher queue.
	 * Jobs with duplicate IDs will be skipped unless it's
	 * pushed when the queue is being flushed.
	 *
	 * @param {Watcher} watcher
	 *   properties:
	 *   - {Number} id
	 *   - {Function} run
	 */

	function pushWatcher(watcher) {
	  var id = watcher.id;
	  if (has[id] == null) {
	    // if an internal watcher is pushed, but the internal
	    // queue is already depleted, we run it immediately.
	    if (internalQueueDepleted && !watcher.user) {
	      watcher.run();
	      return;
	    }
	    // push watcher into appropriate queue
	    var q = watcher.user ? userQueue : queue;
	    has[id] = q.length;
	    q.push(watcher);
	    // queue the flush
	    if (!waiting) {
	      waiting = true;
	      nextTick(flushBatcherQueue);
	    }
	  }
	}

	var uid$2 = 0;

	/**
	 * A watcher parses an expression, collects dependencies,
	 * and fires callback when the expression value changes.
	 * This is used for both the $watch() api and directives.
	 *
	 * @param {Vue} vm
	 * @param {String} expression
	 * @param {Function} cb
	 * @param {Object} options
	 *                 - {Array} filters
	 *                 - {Boolean} twoWay
	 *                 - {Boolean} deep
	 *                 - {Boolean} user
	 *                 - {Boolean} sync
	 *                 - {Boolean} lazy
	 *                 - {Function} [preProcess]
	 *                 - {Function} [postProcess]
	 * @constructor
	 */
	function Watcher(vm, expOrFn, cb, options) {
	  // mix in options
	  if (options) {
	    extend(this, options);
	  }
	  var isFn = typeof expOrFn === 'function';
	  this.vm = vm;
	  vm._watchers.push(this);
	  this.expression = isFn ? expOrFn.toString() : expOrFn;
	  this.cb = cb;
	  this.id = ++uid$2; // uid for batching
	  this.active = true;
	  this.dirty = this.lazy; // for lazy watchers
	  this.deps = Object.create(null);
	  this.newDeps = null;
	  this.prevError = null; // for async error stacks
	  // parse expression for getter/setter
	  if (isFn) {
	    this.getter = expOrFn;
	    this.setter = undefined;
	  } else {
	    var res = parseExpression(expOrFn, this.twoWay);
	    this.getter = res.get;
	    this.setter = res.set;
	  }
	  this.value = this.lazy ? undefined : this.get();
	  // state for avoiding false triggers for deep and Array
	  // watchers during vm._digest()
	  this.queued = this.shallow = false;
	}

	/**
	 * Add a dependency to this directive.
	 *
	 * @param {Dep} dep
	 */

	Watcher.prototype.addDep = function (dep) {
	  var id = dep.id;
	  if (!this.newDeps[id]) {
	    this.newDeps[id] = dep;
	    if (!this.deps[id]) {
	      this.deps[id] = dep;
	      dep.addSub(this);
	    }
	  }
	};

	/**
	 * Evaluate the getter, and re-collect dependencies.
	 */

	Watcher.prototype.get = function () {
	  this.beforeGet();
	  var scope = this.scope || this.vm;
	  var value;
	  try {
	    value = this.getter.call(scope, scope);
	  } catch (e) {
	    if (process.env.NODE_ENV !== 'production' && config.warnExpressionErrors) {
	      warn('Error when evaluating expression "' + this.expression + '". ' + (config.debug ? '' : 'Turn on debug mode to see stack trace.'), e);
	    }
	  }
	  // "touch" every property so they are all tracked as
	  // dependencies for deep watching
	  if (this.deep) {
	    traverse(value);
	  }
	  if (this.preProcess) {
	    value = this.preProcess(value);
	  }
	  if (this.filters) {
	    value = scope._applyFilters(value, null, this.filters, false);
	  }
	  if (this.postProcess) {
	    value = this.postProcess(value);
	  }
	  this.afterGet();
	  return value;
	};

	/**
	 * Set the corresponding value with the setter.
	 *
	 * @param {*} value
	 */

	Watcher.prototype.set = function (value) {
	  var scope = this.scope || this.vm;
	  if (this.filters) {
	    value = scope._applyFilters(value, this.value, this.filters, true);
	  }
	  try {
	    this.setter.call(scope, scope, value);
	  } catch (e) {
	    if (process.env.NODE_ENV !== 'production' && config.warnExpressionErrors) {
	      warn('Error when evaluating setter "' + this.expression + '"', e);
	    }
	  }
	  // two-way sync for v-for alias
	  var forContext = scope.$forContext;
	  if (forContext && forContext.alias === this.expression) {
	    if (forContext.filters) {
	      process.env.NODE_ENV !== 'production' && warn('It seems you are using two-way binding on ' + 'a v-for alias (' + this.expression + '), and the ' + 'v-for has filters. This will not work properly. ' + 'Either remove the filters or use an array of ' + 'objects and bind to object properties instead.');
	      return;
	    }
	    forContext._withLock(function () {
	      if (scope.$key) {
	        // original is an object
	        forContext.rawValue[scope.$key] = value;
	      } else {
	        forContext.rawValue.$set(scope.$index, value);
	      }
	    });
	  }
	};

	/**
	 * Prepare for dependency collection.
	 */

	Watcher.prototype.beforeGet = function () {
	  Dep.target = this;
	  this.newDeps = Object.create(null);
	};

	/**
	 * Clean up for dependency collection.
	 */

	Watcher.prototype.afterGet = function () {
	  Dep.target = null;
	  var ids = Object.keys(this.deps);
	  var i = ids.length;
	  while (i--) {
	    var id = ids[i];
	    if (!this.newDeps[id]) {
	      this.deps[id].removeSub(this);
	    }
	  }
	  this.deps = this.newDeps;
	};

	/**
	 * Subscriber interface.
	 * Will be called when a dependency changes.
	 *
	 * @param {Boolean} shallow
	 */

	Watcher.prototype.update = function (shallow) {
	  if (this.lazy) {
	    this.dirty = true;
	  } else if (this.sync || !config.async) {
	    this.run();
	  } else {
	    // if queued, only overwrite shallow with non-shallow,
	    // but not the other way around.
	    this.shallow = this.queued ? shallow ? this.shallow : false : !!shallow;
	    this.queued = true;
	    // record before-push error stack in debug mode
	    /* istanbul ignore if */
	    if (process.env.NODE_ENV !== 'production' && config.debug) {
	      this.prevError = new Error('[vue] async stack trace');
	    }
	    pushWatcher(this);
	  }
	};

	/**
	 * Batcher job interface.
	 * Will be called by the batcher.
	 */

	Watcher.prototype.run = function () {
	  if (this.active) {
	    var value = this.get();
	    if (value !== this.value ||
	    // Deep watchers and Array watchers should fire even
	    // when the value is the same, because the value may
	    // have mutated; but only do so if this is a
	    // non-shallow update (caused by a vm digest).
	    (isArray(value) || this.deep) && !this.shallow) {
	      // set new value
	      var oldValue = this.value;
	      this.value = value;
	      // in debug + async mode, when a watcher callbacks
	      // throws, we also throw the saved before-push error
	      // so the full cross-tick stack trace is available.
	      var prevError = this.prevError;
	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production' && config.debug && prevError) {
	        this.prevError = null;
	        try {
	          this.cb.call(this.vm, value, oldValue);
	        } catch (e) {
	          nextTick(function () {
	            throw prevError;
	          }, 0);
	          throw e;
	        }
	      } else {
	        this.cb.call(this.vm, value, oldValue);
	      }
	    }
	    this.queued = this.shallow = false;
	  }
	};

	/**
	 * Evaluate the value of the watcher.
	 * This only gets called for lazy watchers.
	 */

	Watcher.prototype.evaluate = function () {
	  // avoid overwriting another watcher that is being
	  // collected.
	  var current = Dep.target;
	  this.value = this.get();
	  this.dirty = false;
	  Dep.target = current;
	};

	/**
	 * Depend on all deps collected by this watcher.
	 */

	Watcher.prototype.depend = function () {
	  var depIds = Object.keys(this.deps);
	  var i = depIds.length;
	  while (i--) {
	    this.deps[depIds[i]].depend();
	  }
	};

	/**
	 * Remove self from all dependencies' subcriber list.
	 */

	Watcher.prototype.teardown = function () {
	  if (this.active) {
	    // remove self from vm's watcher list
	    // we can skip this if the vm if being destroyed
	    // which can improve teardown performance.
	    if (!this.vm._isBeingDestroyed) {
	      this.vm._watchers.$remove(this);
	    }
	    var depIds = Object.keys(this.deps);
	    var i = depIds.length;
	    while (i--) {
	      this.deps[depIds[i]].removeSub(this);
	    }
	    this.active = false;
	    this.vm = this.cb = this.value = null;
	  }
	};

	/**
	 * Recrusively traverse an object to evoke all converted
	 * getters, so that every nested property inside the object
	 * is collected as a "deep" dependency.
	 *
	 * @param {*} val
	 */

	function traverse(val) {
	  var i, keys;
	  if (isArray(val)) {
	    i = val.length;
	    while (i--) traverse(val[i]);
	  } else if (isObject(val)) {
	    keys = Object.keys(val);
	    i = keys.length;
	    while (i--) traverse(val[keys[i]]);
	  }
	}

	var cloak = {
	  bind: function bind() {
	    var el = this.el;
	    this.vm.$once('hook:compiled', function () {
	      el.removeAttribute('v-cloak');
	    });
	  }
	};

	var ref = {
	  bind: function bind() {
	    process.env.NODE_ENV !== 'production' && warn('v-ref:' + this.arg + ' must be used on a child ' + 'component. Found on <' + this.el.tagName.toLowerCase() + '>.');
	  }
	};

	var el = {

	  priority: 1500,

	  bind: function bind() {
	    /* istanbul ignore if */
	    if (!this.arg) {
	      return;
	    }
	    var id = this.id = camelize(this.arg);
	    var refs = (this._scope || this.vm).$els;
	    if (hasOwn(refs, id)) {
	      refs[id] = this.el;
	    } else {
	      defineReactive(refs, id, this.el);
	    }
	  },

	  unbind: function unbind() {
	    var refs = (this._scope || this.vm).$els;
	    if (refs[this.id] === this.el) {
	      refs[this.id] = null;
	    }
	  }
	};

	var prefixes = ['-webkit-', '-moz-', '-ms-'];
	var camelPrefixes = ['Webkit', 'Moz', 'ms'];
	var importantRE = /!important;?$/;
	var propCache = Object.create(null);

	var testEl = null;

	var style = {

	  deep: true,

	  update: function update(value) {
	    if (typeof value === 'string') {
	      this.el.style.cssText = value;
	    } else if (isArray(value)) {
	      this.handleObject(value.reduce(extend, {}));
	    } else {
	      this.handleObject(value || {});
	    }
	  },

	  handleObject: function handleObject(value) {
	    // cache object styles so that only changed props
	    // are actually updated.
	    var cache = this.cache || (this.cache = {});
	    var name, val;
	    for (name in cache) {
	      if (!(name in value)) {
	        this.handleSingle(name, null);
	        delete cache[name];
	      }
	    }
	    for (name in value) {
	      val = value[name];
	      if (val !== cache[name]) {
	        cache[name] = val;
	        this.handleSingle(name, val);
	      }
	    }
	  },

	  handleSingle: function handleSingle(prop, value) {
	    prop = normalize(prop);
	    if (!prop) return; // unsupported prop
	    // cast possible numbers/booleans into strings
	    if (value != null) value += '';
	    if (value) {
	      var isImportant = importantRE.test(value) ? 'important' : '';
	      if (isImportant) {
	        value = value.replace(importantRE, '').trim();
	      }
	      this.el.style.setProperty(prop, value, isImportant);
	    } else {
	      this.el.style.removeProperty(prop);
	    }
	  }

	};

	/**
	 * Normalize a CSS property name.
	 * - cache result
	 * - auto prefix
	 * - camelCase -> dash-case
	 *
	 * @param {String} prop
	 * @return {String}
	 */

	function normalize(prop) {
	  if (propCache[prop]) {
	    return propCache[prop];
	  }
	  var res = prefix(prop);
	  propCache[prop] = propCache[res] = res;
	  return res;
	}

	/**
	 * Auto detect the appropriate prefix for a CSS property.
	 * https://gist.github.com/paulirish/523692
	 *
	 * @param {String} prop
	 * @return {String}
	 */

	function prefix(prop) {
	  prop = hyphenate(prop);
	  var camel = camelize(prop);
	  var upper = camel.charAt(0).toUpperCase() + camel.slice(1);
	  if (!testEl) {
	    testEl = document.createElement('div');
	  }
	  if (camel in testEl.style) {
	    return prop;
	  }
	  var i = prefixes.length;
	  var prefixed;
	  while (i--) {
	    prefixed = camelPrefixes[i] + upper;
	    if (prefixed in testEl.style) {
	      return prefixes[i] + prop;
	    }
	  }
	}

	// xlink
	var xlinkNS = 'http://www.w3.org/1999/xlink';
	var xlinkRE = /^xlink:/;

	// these input element attributes should also set their
	// corresponding properties
	var inputProps = {
	  value: 1,
	  checked: 1,
	  selected: 1
	};

	// these attributes should set a hidden property for
	// binding v-model to object values
	var modelProps = {
	  value: '_value',
	  'true-value': '_trueValue',
	  'false-value': '_falseValue'
	};

	// check for attributes that prohibit interpolations
	var disallowedInterpAttrRE = /^v-|^:|^@|^(is|transition|transition-mode|debounce|track-by|stagger|enter-stagger|leave-stagger)$/;

	var bind = {

	  priority: 850,

	  bind: function bind() {
	    var attr = this.arg;
	    var tag = this.el.tagName;
	    // should be deep watch on object mode
	    if (!attr) {
	      this.deep = true;
	    }
	    // handle interpolation bindings
	    if (this.descriptor.interp) {
	      // only allow binding on native attributes
	      if (disallowedInterpAttrRE.test(attr) || attr === 'name' && (tag === 'PARTIAL' || tag === 'SLOT')) {
	        process.env.NODE_ENV !== 'production' && warn(attr + '="' + this.descriptor.raw + '": ' + 'attribute interpolation is not allowed in Vue.js ' + 'directives and special attributes.');
	        this.el.removeAttribute(attr);
	        this.invalid = true;
	      }

	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production') {
	        var raw = attr + '="' + this.descriptor.raw + '": ';
	        // warn src
	        if (attr === 'src') {
	          warn(raw + 'interpolation in "src" attribute will cause ' + 'a 404 request. Use v-bind:src instead.');
	        }

	        // warn style
	        if (attr === 'style') {
	          warn(raw + 'interpolation in "style" attribute will cause ' + 'the attribute to be discarded in Internet Explorer. ' + 'Use v-bind:style instead.');
	        }
	      }
	    }
	  },

	  update: function update(value) {
	    if (this.invalid) {
	      return;
	    }
	    var attr = this.arg;
	    if (this.arg) {
	      this.handleSingle(attr, value);
	    } else {
	      this.handleObject(value || {});
	    }
	  },

	  // share object handler with v-bind:class
	  handleObject: style.handleObject,

	  handleSingle: function handleSingle(attr, value) {
	    if (inputProps[attr] && attr in this.el) {
	      this.el[attr] = attr === 'value' ? value || '' : // IE9 will set input.value to "null" for null...
	      value;
	    }
	    // set model props
	    var modelProp = modelProps[attr];
	    if (modelProp) {
	      this.el[modelProp] = value;
	      // update v-model if present
	      var model = this.el.__v_model;
	      if (model) {
	        model.listener();
	      }
	    }
	    // do not set value attribute for textarea
	    if (attr === 'value' && this.el.tagName === 'TEXTAREA') {
	      this.el.removeAttribute(attr);
	      return;
	    }
	    // update attribute
	    if (value != null && value !== false) {
	      if (xlinkRE.test(attr)) {
	        this.el.setAttributeNS(xlinkNS, attr, value);
	      } else {
	        this.el.setAttribute(attr, value);
	      }
	    } else {
	      this.el.removeAttribute(attr);
	    }
	  }
	};

	// keyCode aliases
	var keyCodes = {
	  esc: 27,
	  tab: 9,
	  enter: 13,
	  space: 32,
	  'delete': 46,
	  up: 38,
	  left: 37,
	  right: 39,
	  down: 40
	};

	function keyFilter(handler, keys) {
	  var codes = keys.map(function (key) {
	    var charCode = key.charCodeAt(0);
	    if (charCode > 47 && charCode < 58) {
	      return parseInt(key, 10);
	    }
	    if (key.length === 1) {
	      charCode = key.toUpperCase().charCodeAt(0);
	      if (charCode > 64 && charCode < 91) {
	        return charCode;
	      }
	    }
	    return keyCodes[key];
	  });
	  return function keyHandler(e) {
	    if (codes.indexOf(e.keyCode) > -1) {
	      return handler.call(this, e);
	    }
	  };
	}

	function stopFilter(handler) {
	  return function stopHandler(e) {
	    e.stopPropagation();
	    return handler.call(this, e);
	  };
	}

	function preventFilter(handler) {
	  return function preventHandler(e) {
	    e.preventDefault();
	    return handler.call(this, e);
	  };
	}

	var on = {

	  acceptStatement: true,
	  priority: 700,

	  bind: function bind() {
	    // deal with iframes
	    if (this.el.tagName === 'IFRAME' && this.arg !== 'load') {
	      var self = this;
	      this.iframeBind = function () {
	        on$1(self.el.contentWindow, self.arg, self.handler);
	      };
	      this.on('load', this.iframeBind);
	    }
	  },

	  update: function update(handler) {
	    // stub a noop for v-on with no value,
	    // e.g. @mousedown.prevent
	    if (!this.descriptor.raw) {
	      handler = function () {};
	    }

	    if (typeof handler !== 'function') {
	      process.env.NODE_ENV !== 'production' && warn('v-on:' + this.arg + '="' + this.expression + '" expects a function value, ' + 'got ' + handler);
	      return;
	    }

	    // apply modifiers
	    if (this.modifiers.stop) {
	      handler = stopFilter(handler);
	    }
	    if (this.modifiers.prevent) {
	      handler = preventFilter(handler);
	    }
	    // key filter
	    var keys = Object.keys(this.modifiers).filter(function (key) {
	      return key !== 'stop' && key !== 'prevent';
	    });
	    if (keys.length) {
	      handler = keyFilter(handler, keys);
	    }

	    this.reset();
	    this.handler = handler;

	    if (this.iframeBind) {
	      this.iframeBind();
	    } else {
	      on$1(this.el, this.arg, this.handler);
	    }
	  },

	  reset: function reset() {
	    var el = this.iframeBind ? this.el.contentWindow : this.el;
	    if (this.handler) {
	      off(el, this.arg, this.handler);
	    }
	  },

	  unbind: function unbind() {
	    this.reset();
	  }
	};

	var checkbox = {

	  bind: function bind() {
	    var self = this;
	    var el = this.el;

	    this.getValue = function () {
	      return el.hasOwnProperty('_value') ? el._value : self.params.number ? toNumber(el.value) : el.value;
	    };

	    function getBooleanValue() {
	      var val = el.checked;
	      if (val && el.hasOwnProperty('_trueValue')) {
	        return el._trueValue;
	      }
	      if (!val && el.hasOwnProperty('_falseValue')) {
	        return el._falseValue;
	      }
	      return val;
	    }

	    this.listener = function () {
	      var model = self._watcher.value;
	      if (isArray(model)) {
	        var val = self.getValue();
	        if (el.checked) {
	          if (indexOf(model, val) < 0) {
	            model.push(val);
	          }
	        } else {
	          model.$remove(val);
	        }
	      } else {
	        self.set(getBooleanValue());
	      }
	    };

	    this.on('change', this.listener);
	    if (el.checked) {
	      this.afterBind = this.listener;
	    }
	  },

	  update: function update(value) {
	    var el = this.el;
	    if (isArray(value)) {
	      el.checked = indexOf(value, this.getValue()) > -1;
	    } else {
	      if (el.hasOwnProperty('_trueValue')) {
	        el.checked = looseEqual(value, el._trueValue);
	      } else {
	        el.checked = !!value;
	      }
	    }
	  }
	};

	var select = {

	  bind: function bind() {
	    var self = this;
	    var el = this.el;

	    // method to force update DOM using latest value.
	    this.forceUpdate = function () {
	      if (self._watcher) {
	        self.update(self._watcher.get());
	      }
	    };

	    // check if this is a multiple select
	    var multiple = this.multiple = el.hasAttribute('multiple');

	    // attach listener
	    this.listener = function () {
	      var value = getValue(el, multiple);
	      value = self.params.number ? isArray(value) ? value.map(toNumber) : toNumber(value) : value;
	      self.set(value);
	    };
	    this.on('change', this.listener);

	    // if has initial value, set afterBind
	    var initValue = getValue(el, multiple, true);
	    if (multiple && initValue.length || !multiple && initValue !== null) {
	      this.afterBind = this.listener;
	    }

	    // All major browsers except Firefox resets
	    // selectedIndex with value -1 to 0 when the element
	    // is appended to a new parent, therefore we have to
	    // force a DOM update whenever that happens...
	    this.vm.$on('hook:attached', this.forceUpdate);
	  },

	  update: function update(value) {
	    var el = this.el;
	    el.selectedIndex = -1;
	    var multi = this.multiple && isArray(value);
	    var options = el.options;
	    var i = options.length;
	    var op, val;
	    while (i--) {
	      op = options[i];
	      val = op.hasOwnProperty('_value') ? op._value : op.value;
	      /* eslint-disable eqeqeq */
	      op.selected = multi ? indexOf$1(value, val) > -1 : looseEqual(value, val);
	      /* eslint-enable eqeqeq */
	    }
	  },

	  unbind: function unbind() {
	    /* istanbul ignore next */
	    this.vm.$off('hook:attached', this.forceUpdate);
	  }
	};

	/**
	 * Get select value
	 *
	 * @param {SelectElement} el
	 * @param {Boolean} multi
	 * @param {Boolean} init
	 * @return {Array|*}
	 */

	function getValue(el, multi, init) {
	  var res = multi ? [] : null;
	  var op, val, selected;
	  for (var i = 0, l = el.options.length; i < l; i++) {
	    op = el.options[i];
	    selected = init ? op.hasAttribute('selected') : op.selected;
	    if (selected) {
	      val = op.hasOwnProperty('_value') ? op._value : op.value;
	      if (multi) {
	        res.push(val);
	      } else {
	        return val;
	      }
	    }
	  }
	  return res;
	}

	/**
	 * Native Array.indexOf uses strict equal, but in this
	 * case we need to match string/numbers with custom equal.
	 *
	 * @param {Array} arr
	 * @param {*} val
	 */

	function indexOf$1(arr, val) {
	  var i = arr.length;
	  while (i--) {
	    if (looseEqual(arr[i], val)) {
	      return i;
	    }
	  }
	  return -1;
	}

	var radio = {

	  bind: function bind() {
	    var self = this;
	    var el = this.el;

	    this.getValue = function () {
	      // value overwrite via v-bind:value
	      if (el.hasOwnProperty('_value')) {
	        return el._value;
	      }
	      var val = el.value;
	      if (self.params.number) {
	        val = toNumber(val);
	      }
	      return val;
	    };

	    this.listener = function () {
	      self.set(self.getValue());
	    };
	    this.on('change', this.listener);

	    if (el.checked) {
	      this.afterBind = this.listener;
	    }
	  },

	  update: function update(value) {
	    this.el.checked = looseEqual(value, this.getValue());
	  }
	};

	var text$2 = {

	  bind: function bind() {
	    var self = this;
	    var el = this.el;
	    var isRange = el.type === 'range';
	    var lazy = this.params.lazy;
	    var number = this.params.number;
	    var debounce = this.params.debounce;

	    // handle composition events.
	    //   http://blog.evanyou.me/2014/01/03/composition-event/
	    // skip this for Android because it handles composition
	    // events quite differently. Android doesn't trigger
	    // composition events for language input methods e.g.
	    // Chinese, but instead triggers them for spelling
	    // suggestions... (see Discussion/#162)
	    var composing = false;
	    if (!isAndroid && !isRange) {
	      this.on('compositionstart', function () {
	        composing = true;
	      });
	      this.on('compositionend', function () {
	        composing = false;
	        // in IE11 the "compositionend" event fires AFTER
	        // the "input" event, so the input handler is blocked
	        // at the end... have to call it here.
	        //
	        // #1327: in lazy mode this is unecessary.
	        if (!lazy) {
	          self.listener();
	        }
	      });
	    }

	    // prevent messing with the input when user is typing,
	    // and force update on blur.
	    this.focused = false;
	    if (!isRange) {
	      this.on('focus', function () {
	        self.focused = true;
	      });
	      this.on('blur', function () {
	        self.focused = false;
	        self.listener();
	      });
	    }

	    // Now attach the main listener
	    this.listener = function () {
	      if (composing) return;
	      var val = number || isRange ? toNumber(el.value) : el.value;
	      self.set(val);
	      // force update on next tick to avoid lock & same value
	      // also only update when user is not typing
	      nextTick(function () {
	        if (self._bound && !self.focused) {
	          self.update(self._watcher.value);
	        }
	      });
	    };

	    // apply debounce
	    if (debounce) {
	      this.listener = _debounce(this.listener, debounce);
	    }

	    // Support jQuery events, since jQuery.trigger() doesn't
	    // trigger native events in some cases and some plugins
	    // rely on $.trigger()
	    //
	    // We want to make sure if a listener is attached using
	    // jQuery, it is also removed with jQuery, that's why
	    // we do the check for each directive instance and
	    // store that check result on itself. This also allows
	    // easier test coverage control by unsetting the global
	    // jQuery variable in tests.
	    this.hasjQuery = typeof jQuery === 'function';
	    if (this.hasjQuery) {
	      jQuery(el).on('change', this.listener);
	      if (!lazy) {
	        jQuery(el).on('input', this.listener);
	      }
	    } else {
	      this.on('change', this.listener);
	      if (!lazy) {
	        this.on('input', this.listener);
	      }
	    }

	    // IE9 doesn't fire input event on backspace/del/cut
	    if (!lazy && isIE9) {
	      this.on('cut', function () {
	        nextTick(self.listener);
	      });
	      this.on('keyup', function (e) {
	        if (e.keyCode === 46 || e.keyCode === 8) {
	          self.listener();
	        }
	      });
	    }

	    // set initial value if present
	    if (el.hasAttribute('value') || el.tagName === 'TEXTAREA' && el.value.trim()) {
	      this.afterBind = this.listener;
	    }
	  },

	  update: function update(value) {
	    this.el.value = _toString(value);
	  },

	  unbind: function unbind() {
	    var el = this.el;
	    if (this.hasjQuery) {
	      jQuery(el).off('change', this.listener);
	      jQuery(el).off('input', this.listener);
	    }
	  }
	};

	var handlers = {
	  text: text$2,
	  radio: radio,
	  select: select,
	  checkbox: checkbox
	};

	var model = {

	  priority: 800,
	  twoWay: true,
	  handlers: handlers,
	  params: ['lazy', 'number', 'debounce'],

	  /**
	   * Possible elements:
	   *   <select>
	   *   <textarea>
	   *   <input type="*">
	   *     - text
	   *     - checkbox
	   *     - radio
	   *     - number
	   */

	  bind: function bind() {
	    // friendly warning...
	    this.checkFilters();
	    if (this.hasRead && !this.hasWrite) {
	      process.env.NODE_ENV !== 'production' && warn('It seems you are using a read-only filter with ' + 'v-model. You might want to use a two-way filter ' + 'to ensure correct behavior.');
	    }
	    var el = this.el;
	    var tag = el.tagName;
	    var handler;
	    if (tag === 'INPUT') {
	      handler = handlers[el.type] || handlers.text;
	    } else if (tag === 'SELECT') {
	      handler = handlers.select;
	    } else if (tag === 'TEXTAREA') {
	      handler = handlers.text;
	    } else {
	      process.env.NODE_ENV !== 'production' && warn('v-model does not support element type: ' + tag);
	      return;
	    }
	    el.__v_model = this;
	    handler.bind.call(this);
	    this.update = handler.update;
	    this._unbind = handler.unbind;
	  },

	  /**
	   * Check read/write filter stats.
	   */

	  checkFilters: function checkFilters() {
	    var filters = this.filters;
	    if (!filters) return;
	    var i = filters.length;
	    while (i--) {
	      var filter = resolveAsset(this.vm.$options, 'filters', filters[i].name);
	      if (typeof filter === 'function' || filter.read) {
	        this.hasRead = true;
	      }
	      if (filter.write) {
	        this.hasWrite = true;
	      }
	    }
	  },

	  unbind: function unbind() {
	    this.el.__v_model = null;
	    this._unbind && this._unbind();
	  }
	};

	var show = {

	  bind: function bind() {
	    // check else block
	    var next = this.el.nextElementSibling;
	    if (next && getAttr(next, 'v-else') !== null) {
	      this.elseEl = next;
	    }
	  },

	  update: function update(value) {
	    this.apply(this.el, value);
	    if (this.elseEl) {
	      this.apply(this.elseEl, !value);
	    }
	  },

	  apply: function apply(el, value) {
	    applyTransition(el, value ? 1 : -1, function () {
	      el.style.display = value ? '' : 'none';
	    }, this.vm);
	  }
	};

	var templateCache = new Cache(1000);
	var idSelectorCache = new Cache(1000);

	var map = {
	  efault: [0, '', ''],
	  legend: [1, '<fieldset>', '</fieldset>'],
	  tr: [2, '<table><tbody>', '</tbody></table>'],
	  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>']
	};

	map.td = map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

	map.option = map.optgroup = [1, '<select multiple="multiple">', '</select>'];

	map.thead = map.tbody = map.colgroup = map.caption = map.tfoot = [1, '<table>', '</table>'];

	map.g = map.defs = map.symbol = map.use = map.image = map.text = map.circle = map.ellipse = map.line = map.path = map.polygon = map.polyline = map.rect = [1, '<svg ' + 'xmlns="http://www.w3.org/2000/svg" ' + 'xmlns:xlink="http://www.w3.org/1999/xlink" ' + 'xmlns:ev="http://www.w3.org/2001/xml-events"' + 'version="1.1">', '</svg>'];

	/**
	 * Check if a node is a supported template node with a
	 * DocumentFragment content.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */

	function isRealTemplate(node) {
	  return isTemplate(node) && node.content instanceof DocumentFragment;
	}

	var tagRE$1 = /<([\w:]+)/;
	var entityRE = /&\w+;|&#\d+;|&#x[\dA-F]+;/;

	/**
	 * Convert a string template to a DocumentFragment.
	 * Determines correct wrapping by tag types. Wrapping
	 * strategy found in jQuery & component/domify.
	 *
	 * @param {String} templateString
	 * @param {Boolean} raw
	 * @return {DocumentFragment}
	 */

	function stringToFragment(templateString, raw) {
	  // try a cache hit first
	  var hit = templateCache.get(templateString);
	  if (hit) {
	    return hit;
	  }

	  var frag = document.createDocumentFragment();
	  var tagMatch = templateString.match(tagRE$1);
	  var entityMatch = entityRE.test(templateString);

	  if (!tagMatch && !entityMatch) {
	    // text only, return a single text node.
	    frag.appendChild(document.createTextNode(templateString));
	  } else {

	    var tag = tagMatch && tagMatch[1];
	    var wrap = map[tag] || map.efault;
	    var depth = wrap[0];
	    var prefix = wrap[1];
	    var suffix = wrap[2];
	    var node = document.createElement('div');

	    if (!raw) {
	      templateString = templateString.trim();
	    }
	    node.innerHTML = prefix + templateString + suffix;
	    while (depth--) {
	      node = node.lastChild;
	    }

	    var child;
	    /* eslint-disable no-cond-assign */
	    while (child = node.firstChild) {
	      /* eslint-enable no-cond-assign */
	      frag.appendChild(child);
	    }
	  }

	  templateCache.put(templateString, frag);
	  return frag;
	}

	/**
	 * Convert a template node to a DocumentFragment.
	 *
	 * @param {Node} node
	 * @return {DocumentFragment}
	 */

	function nodeToFragment(node) {
	  // if its a template tag and the browser supports it,
	  // its content is already a document fragment.
	  if (isRealTemplate(node)) {
	    trimNode(node.content);
	    return node.content;
	  }
	  // script template
	  if (node.tagName === 'SCRIPT') {
	    return stringToFragment(node.textContent);
	  }
	  // normal node, clone it to avoid mutating the original
	  var clonedNode = cloneNode(node);
	  var frag = document.createDocumentFragment();
	  var child;
	  /* eslint-disable no-cond-assign */
	  while (child = clonedNode.firstChild) {
	    /* eslint-enable no-cond-assign */
	    frag.appendChild(child);
	  }
	  trimNode(frag);
	  return frag;
	}

	// Test for the presence of the Safari template cloning bug
	// https://bugs.webkit.org/showug.cgi?id=137755
	var hasBrokenTemplate = (function () {
	  /* istanbul ignore else */
	  if (inBrowser) {
	    var a = document.createElement('div');
	    a.innerHTML = '<template>1</template>';
	    return !a.cloneNode(true).firstChild.innerHTML;
	  } else {
	    return false;
	  }
	})();

	// Test for IE10/11 textarea placeholder clone bug
	var hasTextareaCloneBug = (function () {
	  /* istanbul ignore else */
	  if (inBrowser) {
	    var t = document.createElement('textarea');
	    t.placeholder = 't';
	    return t.cloneNode(true).value === 't';
	  } else {
	    return false;
	  }
	})();

	/**
	 * 1. Deal with Safari cloning nested <template> bug by
	 *    manually cloning all template instances.
	 * 2. Deal with IE10/11 textarea placeholder bug by setting
	 *    the correct value after cloning.
	 *
	 * @param {Element|DocumentFragment} node
	 * @return {Element|DocumentFragment}
	 */

	function cloneNode(node) {
	  if (!node.querySelectorAll) {
	    return node.cloneNode();
	  }
	  var res = node.cloneNode(true);
	  var i, original, cloned;
	  /* istanbul ignore if */
	  if (hasBrokenTemplate) {
	    var tempClone = res;
	    if (isRealTemplate(node)) {
	      node = node.content;
	      tempClone = res.content;
	    }
	    original = node.querySelectorAll('template');
	    if (original.length) {
	      cloned = tempClone.querySelectorAll('template');
	      i = cloned.length;
	      while (i--) {
	        cloned[i].parentNode.replaceChild(cloneNode(original[i]), cloned[i]);
	      }
	    }
	  }
	  /* istanbul ignore if */
	  if (hasTextareaCloneBug) {
	    if (node.tagName === 'TEXTAREA') {
	      res.value = node.value;
	    } else {
	      original = node.querySelectorAll('textarea');
	      if (original.length) {
	        cloned = res.querySelectorAll('textarea');
	        i = cloned.length;
	        while (i--) {
	          cloned[i].value = original[i].value;
	        }
	      }
	    }
	  }
	  return res;
	}

	/**
	 * Process the template option and normalizes it into a
	 * a DocumentFragment that can be used as a partial or a
	 * instance template.
	 *
	 * @param {*} template
	 *        Possible values include:
	 *        - DocumentFragment object
	 *        - Node object of type Template
	 *        - id selector: '#some-template-id'
	 *        - template string: '<div><span>{{msg}}</span></div>'
	 * @param {Boolean} shouldClone
	 * @param {Boolean} raw
	 *        inline HTML interpolation. Do not check for id
	 *        selector and keep whitespace in the string.
	 * @return {DocumentFragment|undefined}
	 */

	function parseTemplate(template, shouldClone, raw) {
	  var node, frag;

	  // if the template is already a document fragment,
	  // do nothing
	  if (template instanceof DocumentFragment) {
	    trimNode(template);
	    return shouldClone ? cloneNode(template) : template;
	  }

	  if (typeof template === 'string') {
	    // id selector
	    if (!raw && template.charAt(0) === '#') {
	      // id selector can be cached too
	      frag = idSelectorCache.get(template);
	      if (!frag) {
	        node = document.getElementById(template.slice(1));
	        if (node) {
	          frag = nodeToFragment(node);
	          // save selector to cache
	          idSelectorCache.put(template, frag);
	        }
	      }
	    } else {
	      // normal string template
	      frag = stringToFragment(template, raw);
	    }
	  } else if (template.nodeType) {
	    // a direct node
	    frag = nodeToFragment(template);
	  }

	  return frag && shouldClone ? cloneNode(frag) : frag;
	}

	var template = Object.freeze({
	  cloneNode: cloneNode,
	  parseTemplate: parseTemplate
	});

	/**
	 * Abstraction for a partially-compiled fragment.
	 * Can optionally compile content with a child scope.
	 *
	 * @param {Function} linker
	 * @param {Vue} vm
	 * @param {DocumentFragment} frag
	 * @param {Vue} [host]
	 * @param {Object} [scope]
	 */
	function Fragment(linker, vm, frag, host, scope, parentFrag) {
	  this.children = [];
	  this.childFrags = [];
	  this.vm = vm;
	  this.scope = scope;
	  this.inserted = false;
	  this.parentFrag = parentFrag;
	  if (parentFrag) {
	    parentFrag.childFrags.push(this);
	  }
	  this.unlink = linker(vm, frag, host, scope, this);
	  var single = this.single = frag.childNodes.length === 1 &&
	  // do not go single mode if the only node is an anchor
	  !frag.childNodes[0].__vue_anchor;
	  if (single) {
	    this.node = frag.childNodes[0];
	    this.before = singleBefore;
	    this.remove = singleRemove;
	  } else {
	    this.node = createAnchor('fragment-start');
	    this.end = createAnchor('fragment-end');
	    this.frag = frag;
	    prepend(this.node, frag);
	    frag.appendChild(this.end);
	    this.before = multiBefore;
	    this.remove = multiRemove;
	  }
	  this.node.__vfrag__ = this;
	}

	/**
	 * Call attach/detach for all components contained within
	 * this fragment. Also do so recursively for all child
	 * fragments.
	 *
	 * @param {Function} hook
	 */

	Fragment.prototype.callHook = function (hook) {
	  var i, l;
	  for (i = 0, l = this.children.length; i < l; i++) {
	    hook(this.children[i]);
	  }
	  for (i = 0, l = this.childFrags.length; i < l; i++) {
	    this.childFrags[i].callHook(hook);
	  }
	};

	/**
	 * Destroy the fragment.
	 */

	Fragment.prototype.destroy = function () {
	  if (this.parentFrag) {
	    this.parentFrag.childFrags.$remove(this);
	  }
	  this.unlink();
	};

	/**
	 * Insert fragment before target, single node version
	 *
	 * @param {Node} target
	 * @param {Boolean} withTransition
	 */

	function singleBefore(target, withTransition) {
	  this.inserted = true;
	  var method = withTransition !== false ? beforeWithTransition : before;
	  method(this.node, target, this.vm);
	  if (inDoc(this.node)) {
	    this.callHook(attach);
	  }
	}

	/**
	 * Remove fragment, single node version
	 */

	function singleRemove() {
	  this.inserted = false;
	  var shouldCallRemove = inDoc(this.node);
	  var self = this;
	  self.callHook(destroyChild);
	  removeWithTransition(this.node, this.vm, function () {
	    if (shouldCallRemove) {
	      self.callHook(detach);
	    }
	    self.destroy();
	  });
	}

	/**
	 * Insert fragment before target, multi-nodes version
	 *
	 * @param {Node} target
	 * @param {Boolean} withTransition
	 */

	function multiBefore(target, withTransition) {
	  this.inserted = true;
	  var vm = this.vm;
	  var method = withTransition !== false ? beforeWithTransition : before;
	  mapNodeRange(this.node, this.end, function (node) {
	    method(node, target, vm);
	  });
	  if (inDoc(this.node)) {
	    this.callHook(attach);
	  }
	}

	/**
	 * Remove fragment, multi-nodes version
	 */

	function multiRemove() {
	  this.inserted = false;
	  var self = this;
	  var shouldCallRemove = inDoc(this.node);
	  self.callHook(destroyChild);
	  removeNodeRange(this.node, this.end, this.vm, this.frag, function () {
	    if (shouldCallRemove) {
	      self.callHook(detach);
	    }
	    self.destroy();
	  });
	}

	/**
	 * Call attach hook for a Vue instance.
	 *
	 * @param {Vue} child
	 */

	function attach(child) {
	  if (!child._isAttached) {
	    child._callHook('attached');
	  }
	}

	/**
	 * Call destroy for all contained instances,
	 * with remove:false and defer:true.
	 * Defer is necessary because we need to
	 * keep the children to call detach hooks
	 * on them.
	 *
	 * @param {Vue} child
	 */

	function destroyChild(child) {
	  child.$destroy(false, true);
	}

	/**
	 * Call detach hook for a Vue instance.
	 *
	 * @param {Vue} child
	 */

	function detach(child) {
	  if (child._isAttached) {
	    child._callHook('detached');
	  }
	}

	var linkerCache = new Cache(5000);

	/**
	 * A factory that can be used to create instances of a
	 * fragment. Caches the compiled linker if possible.
	 *
	 * @param {Vue} vm
	 * @param {Element|String} el
	 */
	function FragmentFactory(vm, el) {
	  this.vm = vm;
	  var template;
	  var isString = typeof el === 'string';
	  if (isString || isTemplate(el)) {
	    template = parseTemplate(el, true);
	  } else {
	    template = document.createDocumentFragment();
	    template.appendChild(el);
	  }
	  this.template = template;
	  // linker can be cached, but only for components
	  var linker;
	  var cid = vm.constructor.cid;
	  if (cid > 0) {
	    var cacheId = cid + (isString ? el : el.outerHTML);
	    linker = linkerCache.get(cacheId);
	    if (!linker) {
	      linker = compile(template, vm.$options, true);
	      linkerCache.put(cacheId, linker);
	    }
	  } else {
	    linker = compile(template, vm.$options, true);
	  }
	  this.linker = linker;
	}

	/**
	 * Create a fragment instance with given host and scope.
	 *
	 * @param {Vue} host
	 * @param {Object} scope
	 * @param {Fragment} parentFrag
	 */

	FragmentFactory.prototype.create = function (host, scope, parentFrag) {
	  var frag = cloneNode(this.template);
	  return new Fragment(this.linker, this.vm, frag, host, scope, parentFrag);
	};

	var vIf = {

	  priority: 2000,

	  bind: function bind() {
	    var el = this.el;
	    if (!el.__vue__) {
	      // check else block
	      var next = el.nextElementSibling;
	      if (next && getAttr(next, 'v-else') !== null) {
	        remove(next);
	        this.elseFactory = new FragmentFactory(this.vm, next);
	      }
	      // check main block
	      this.anchor = createAnchor('v-if');
	      replace(el, this.anchor);
	      this.factory = new FragmentFactory(this.vm, el);
	    } else {
	      process.env.NODE_ENV !== 'production' && warn('v-if="' + this.expression + '" cannot be ' + 'used on an instance root element.');
	      this.invalid = true;
	    }
	  },

	  update: function update(value) {
	    if (this.invalid) return;
	    if (value) {
	      if (!this.frag) {
	        this.insert();
	      }
	    } else {
	      this.remove();
	    }
	  },

	  insert: function insert() {
	    if (this.elseFrag) {
	      this.elseFrag.remove();
	      this.elseFrag = null;
	    }
	    this.frag = this.factory.create(this._host, this._scope, this._frag);
	    this.frag.before(this.anchor);
	  },

	  remove: function remove() {
	    if (this.frag) {
	      this.frag.remove();
	      this.frag = null;
	    }
	    if (this.elseFactory && !this.elseFrag) {
	      this.elseFrag = this.elseFactory.create(this._host, this._scope, this._frag);
	      this.elseFrag.before(this.anchor);
	    }
	  },

	  unbind: function unbind() {
	    if (this.frag) {
	      this.frag.destroy();
	    }
	  }
	};

	var uid$1 = 0;

	var vFor = {

	  priority: 2000,

	  params: ['track-by', 'stagger', 'enter-stagger', 'leave-stagger'],

	  bind: function bind() {
	    // support "item in items" syntax
	    var inMatch = this.expression.match(/(.*) in (.*)/);
	    if (inMatch) {
	      var itMatch = inMatch[1].match(/\((.*),(.*)\)/);
	      if (itMatch) {
	        this.iterator = itMatch[1].trim();
	        this.alias = itMatch[2].trim();
	      } else {
	        this.alias = inMatch[1].trim();
	      }
	      this.expression = inMatch[2];
	    }

	    if (!this.alias) {
	      process.env.NODE_ENV !== 'production' && warn('Alias is required in v-for.');
	      return;
	    }

	    // uid as a cache identifier
	    this.id = '__v-for__' + ++uid$1;

	    // check if this is an option list,
	    // so that we know if we need to update the <select>'s
	    // v-model when the option list has changed.
	    // because v-model has a lower priority than v-for,
	    // the v-model is not bound here yet, so we have to
	    // retrive it in the actual updateModel() function.
	    var tag = this.el.tagName;
	    this.isOption = (tag === 'OPTION' || tag === 'OPTGROUP') && this.el.parentNode.tagName === 'SELECT';

	    // setup anchor nodes
	    this.start = createAnchor('v-for-start');
	    this.end = createAnchor('v-for-end');
	    replace(this.el, this.end);
	    before(this.start, this.end);

	    // cache
	    this.cache = Object.create(null);

	    // fragment factory
	    this.factory = new FragmentFactory(this.vm, this.el);
	  },

	  update: function update(data) {
	    this.diff(data);
	    this.updateRef();
	    this.updateModel();
	  },

	  /**
	   * Diff, based on new data and old data, determine the
	   * minimum amount of DOM manipulations needed to make the
	   * DOM reflect the new data Array.
	   *
	   * The algorithm diffs the new data Array by storing a
	   * hidden reference to an owner vm instance on previously
	   * seen data. This allows us to achieve O(n) which is
	   * better than a levenshtein distance based algorithm,
	   * which is O(m * n).
	   *
	   * @param {Array} data
	   */

	  diff: function diff(data) {
	    // check if the Array was converted from an Object
	    var item = data[0];
	    var convertedFromObject = this.fromObject = isObject(item) && hasOwn(item, '$key') && hasOwn(item, '$value');

	    var trackByKey = this.params.trackBy;
	    var oldFrags = this.frags;
	    var frags = this.frags = new Array(data.length);
	    var alias = this.alias;
	    var iterator = this.iterator;
	    var start = this.start;
	    var end = this.end;
	    var inDocument = inDoc(start);
	    var init = !oldFrags;
	    var i, l, frag, key, value, primitive;

	    // First pass, go through the new Array and fill up
	    // the new frags array. If a piece of data has a cached
	    // instance for it, we reuse it. Otherwise build a new
	    // instance.
	    for (i = 0, l = data.length; i < l; i++) {
	      item = data[i];
	      key = convertedFromObject ? item.$key : null;
	      value = convertedFromObject ? item.$value : item;
	      primitive = !isObject(value);
	      frag = !init && this.getCachedFrag(value, i, key);
	      if (frag) {
	        // reusable fragment
	        frag.reused = true;
	        // update $index
	        frag.scope.$index = i;
	        // update $key
	        if (key) {
	          frag.scope.$key = key;
	        }
	        // update iterator
	        if (iterator) {
	          frag.scope[iterator] = key !== null ? key : i;
	        }
	        // update data for track-by, object repeat &
	        // primitive values.
	        if (trackByKey || convertedFromObject || primitive) {
	          frag.scope[alias] = value;
	        }
	      } else {
	        // new isntance
	        frag = this.create(value, alias, i, key);
	        frag.fresh = !init;
	      }
	      frags[i] = frag;
	      if (init) {
	        frag.before(end);
	      }
	    }

	    // we're done for the initial render.
	    if (init) {
	      return;
	    }

	    // Second pass, go through the old fragments and
	    // destroy those who are not reused (and remove them
	    // from cache)
	    var removalIndex = 0;
	    var totalRemoved = oldFrags.length - frags.length;
	    for (i = 0, l = oldFrags.length; i < l; i++) {
	      frag = oldFrags[i];
	      if (!frag.reused) {
	        this.deleteCachedFrag(frag);
	        this.remove(frag, removalIndex++, totalRemoved, inDocument);
	      }
	    }

	    // Final pass, move/insert new fragments into the
	    // right place.
	    var targetPrev, prevEl, currentPrev;
	    var insertionIndex = 0;
	    for (i = 0, l = frags.length; i < l; i++) {
	      frag = frags[i];
	      // this is the frag that we should be after
	      targetPrev = frags[i - 1];
	      prevEl = targetPrev ? targetPrev.staggerCb ? targetPrev.staggerAnchor : targetPrev.end || targetPrev.node : start;
	      if (frag.reused && !frag.staggerCb) {
	        currentPrev = findPrevFrag(frag, start, this.id);
	        if (currentPrev !== targetPrev && (!currentPrev ||
	        // optimization for moving a single item.
	        // thanks to suggestions by @livoras in #1807
	        findPrevFrag(currentPrev, start, this.id) !== targetPrev)) {
	          this.move(frag, prevEl);
	        }
	      } else {
	        // new instance, or still in stagger.
	        // insert with updated stagger index.
	        this.insert(frag, insertionIndex++, prevEl, inDocument);
	      }
	      frag.reused = frag.fresh = false;
	    }
	  },

	  /**
	   * Create a new fragment instance.
	   *
	   * @param {*} value
	   * @param {String} alias
	   * @param {Number} index
	   * @param {String} [key]
	   * @return {Fragment}
	   */

	  create: function create(value, alias, index, key) {
	    var host = this._host;
	    // create iteration scope
	    var parentScope = this._scope || this.vm;
	    var scope = Object.create(parentScope);
	    // ref holder for the scope
	    scope.$refs = Object.create(parentScope.$refs);
	    scope.$els = Object.create(parentScope.$els);
	    // make sure point $parent to parent scope
	    scope.$parent = parentScope;
	    // for two-way binding on alias
	    scope.$forContext = this;
	    // define scope properties
	    defineReactive(scope, alias, value);
	    defineReactive(scope, '$index', index);
	    if (key) {
	      defineReactive(scope, '$key', key);
	    } else if (scope.$key) {
	      // avoid accidental fallback
	      def(scope, '$key', null);
	    }
	    if (this.iterator) {
	      defineReactive(scope, this.iterator, key !== null ? key : index);
	    }
	    var frag = this.factory.create(host, scope, this._frag);
	    frag.forId = this.id;
	    this.cacheFrag(value, frag, index, key);
	    return frag;
	  },

	  /**
	   * Update the v-ref on owner vm.
	   */

	  updateRef: function updateRef() {
	    var ref = this.descriptor.ref;
	    if (!ref) return;
	    var hash = (this._scope || this.vm).$refs;
	    var refs;
	    if (!this.fromObject) {
	      refs = this.frags.map(findVmFromFrag);
	    } else {
	      refs = {};
	      this.frags.forEach(function (frag) {
	        refs[frag.scope.$key] = findVmFromFrag(frag);
	      });
	    }
	    hash[ref] = refs;
	  },

	  /**
	   * For option lists, update the containing v-model on
	   * parent <select>.
	   */

	  updateModel: function updateModel() {
	    if (this.isOption) {
	      var parent = this.start.parentNode;
	      var model = parent && parent.__v_model;
	      if (model) {
	        model.forceUpdate();
	      }
	    }
	  },

	  /**
	   * Insert a fragment. Handles staggering.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Node} prevEl
	   * @param {Boolean} inDocument
	   */

	  insert: function insert(frag, index, prevEl, inDocument) {
	    if (frag.staggerCb) {
	      frag.staggerCb.cancel();
	      frag.staggerCb = null;
	    }
	    var staggerAmount = this.getStagger(frag, index, null, 'enter');
	    if (inDocument && staggerAmount) {
	      // create an anchor and insert it synchronously,
	      // so that we can resolve the correct order without
	      // worrying about some elements not inserted yet
	      var anchor = frag.staggerAnchor;
	      if (!anchor) {
	        anchor = frag.staggerAnchor = createAnchor('stagger-anchor');
	        anchor.__vfrag__ = frag;
	      }
	      after(anchor, prevEl);
	      var op = frag.staggerCb = cancellable(function () {
	        frag.staggerCb = null;
	        frag.before(anchor);
	        remove(anchor);
	      });
	      setTimeout(op, staggerAmount);
	    } else {
	      frag.before(prevEl.nextSibling);
	    }
	  },

	  /**
	   * Remove a fragment. Handles staggering.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Number} total
	   * @param {Boolean} inDocument
	   */

	  remove: function remove(frag, index, total, inDocument) {
	    if (frag.staggerCb) {
	      frag.staggerCb.cancel();
	      frag.staggerCb = null;
	      // it's not possible for the same frag to be removed
	      // twice, so if we have a pending stagger callback,
	      // it means this frag is queued for enter but removed
	      // before its transition started. Since it is already
	      // destroyed, we can just leave it in detached state.
	      return;
	    }
	    var staggerAmount = this.getStagger(frag, index, total, 'leave');
	    if (inDocument && staggerAmount) {
	      var op = frag.staggerCb = cancellable(function () {
	        frag.staggerCb = null;
	        frag.remove();
	      });
	      setTimeout(op, staggerAmount);
	    } else {
	      frag.remove();
	    }
	  },

	  /**
	   * Move a fragment to a new position.
	   * Force no transition.
	   *
	   * @param {Fragment} frag
	   * @param {Node} prevEl
	   */

	  move: function move(frag, prevEl) {
	    frag.before(prevEl.nextSibling, false);
	  },

	  /**
	   * Cache a fragment using track-by or the object key.
	   *
	   * @param {*} value
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {String} [key]
	   */

	  cacheFrag: function cacheFrag(value, frag, index, key) {
	    var trackByKey = this.params.trackBy;
	    var cache = this.cache;
	    var primitive = !isObject(value);
	    var id;
	    if (key || trackByKey || primitive) {
	      id = trackByKey ? trackByKey === '$index' ? index : value[trackByKey] : key || value;
	      if (!cache[id]) {
	        cache[id] = frag;
	      } else if (trackByKey !== '$index') {
	        process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
	      }
	    } else {
	      id = this.id;
	      if (hasOwn(value, id)) {
	        if (value[id] === null) {
	          value[id] = frag;
	        } else {
	          process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
	        }
	      } else {
	        def(value, id, frag);
	      }
	    }
	    frag.raw = value;
	  },

	  /**
	   * Get a cached fragment from the value/index/key
	   *
	   * @param {*} value
	   * @param {Number} index
	   * @param {String} key
	   * @return {Fragment}
	   */

	  getCachedFrag: function getCachedFrag(value, index, key) {
	    var trackByKey = this.params.trackBy;
	    var primitive = !isObject(value);
	    var frag;
	    if (key || trackByKey || primitive) {
	      var id = trackByKey ? trackByKey === '$index' ? index : value[trackByKey] : key || value;
	      frag = this.cache[id];
	    } else {
	      frag = value[this.id];
	    }
	    if (frag && (frag.reused || frag.fresh)) {
	      process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
	    }
	    return frag;
	  },

	  /**
	   * Delete a fragment from cache.
	   *
	   * @param {Fragment} frag
	   */

	  deleteCachedFrag: function deleteCachedFrag(frag) {
	    var value = frag.raw;
	    var trackByKey = this.params.trackBy;
	    var scope = frag.scope;
	    var index = scope.$index;
	    // fix #948: avoid accidentally fall through to
	    // a parent repeater which happens to have $key.
	    var key = hasOwn(scope, '$key') && scope.$key;
	    var primitive = !isObject(value);
	    if (trackByKey || key || primitive) {
	      var id = trackByKey ? trackByKey === '$index' ? index : value[trackByKey] : key || value;
	      this.cache[id] = null;
	    } else {
	      value[this.id] = null;
	      frag.raw = null;
	    }
	  },

	  /**
	   * Get the stagger amount for an insertion/removal.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Number} total
	   * @param {String} type
	   */

	  getStagger: function getStagger(frag, index, total, type) {
	    type = type + 'Stagger';
	    var trans = frag.node.__v_trans;
	    var hooks = trans && trans.hooks;
	    var hook = hooks && (hooks[type] || hooks.stagger);
	    return hook ? hook.call(frag, index, total) : index * parseInt(this.params[type] || this.params.stagger, 10);
	  },

	  /**
	   * Pre-process the value before piping it through the
	   * filters. This is passed to and called by the watcher.
	   */

	  _preProcess: function _preProcess(value) {
	    // regardless of type, store the un-filtered raw value.
	    this.rawValue = value;
	    return value;
	  },

	  /**
	   * Post-process the value after it has been piped through
	   * the filters. This is passed to and called by the watcher.
	   *
	   * It is necessary for this to be called during the
	   * wathcer's dependency collection phase because we want
	   * the v-for to update when the source Object is mutated.
	   */

	  _postProcess: function _postProcess(value) {
	    if (isArray(value)) {
	      return value;
	    } else if (isPlainObject(value)) {
	      // convert plain object to array.
	      var keys = Object.keys(value);
	      var i = keys.length;
	      var res = new Array(i);
	      var key;
	      while (i--) {
	        key = keys[i];
	        res[i] = {
	          $key: key,
	          $value: value[key]
	        };
	      }
	      return res;
	    } else {
	      if (typeof value === 'number') {
	        value = range(value);
	      }
	      return value || [];
	    }
	  },

	  unbind: function unbind() {
	    if (this.descriptor.ref) {
	      (this._scope || this.vm).$refs[this.descriptor.ref] = null;
	    }
	    if (this.frags) {
	      var i = this.frags.length;
	      var frag;
	      while (i--) {
	        frag = this.frags[i];
	        this.deleteCachedFrag(frag);
	        frag.destroy();
	      }
	    }
	  }
	};

	/**
	 * Helper to find the previous element that is a fragment
	 * anchor. This is necessary because a destroyed frag's
	 * element could still be lingering in the DOM before its
	 * leaving transition finishes, but its inserted flag
	 * should have been set to false so we can skip them.
	 *
	 * If this is a block repeat, we want to make sure we only
	 * return frag that is bound to this v-for. (see #929)
	 *
	 * @param {Fragment} frag
	 * @param {Comment|Text} anchor
	 * @param {String} id
	 * @return {Fragment}
	 */

	function findPrevFrag(frag, anchor, id) {
	  var el = frag.node.previousSibling;
	  /* istanbul ignore if */
	  if (!el) return;
	  frag = el.__vfrag__;
	  while ((!frag || frag.forId !== id || !frag.inserted) && el !== anchor) {
	    el = el.previousSibling;
	    /* istanbul ignore if */
	    if (!el) return;
	    frag = el.__vfrag__;
	  }
	  return frag;
	}

	/**
	 * Find a vm from a fragment.
	 *
	 * @param {Fragment} frag
	 * @return {Vue|undefined}
	 */

	function findVmFromFrag(frag) {
	  var node = frag.node;
	  // handle multi-node frag
	  if (frag.end) {
	    while (!node.__vue__ && node !== frag.end && node.nextSibling) {
	      node = node.nextSibling;
	    }
	  }
	  return node.__vue__;
	}

	/**
	 * Create a range array from given number.
	 *
	 * @param {Number} n
	 * @return {Array}
	 */

	function range(n) {
	  var i = -1;
	  var ret = new Array(n);
	  while (++i < n) {
	    ret[i] = i;
	  }
	  return ret;
	}

	if (process.env.NODE_ENV !== 'production') {
	  vFor.warnDuplicate = function (value) {
	    warn('Duplicate value found in v-for="' + this.descriptor.raw + '": ' + JSON.stringify(value) + '. Use track-by="$index" if ' + 'you are expecting duplicate values.');
	  };
	}

	var html = {

	  bind: function bind() {
	    // a comment node means this is a binding for
	    // {{{ inline unescaped html }}}
	    if (this.el.nodeType === 8) {
	      // hold nodes
	      this.nodes = [];
	      // replace the placeholder with proper anchor
	      this.anchor = createAnchor('v-html');
	      replace(this.el, this.anchor);
	    }
	  },

	  update: function update(value) {
	    value = _toString(value);
	    if (this.nodes) {
	      this.swap(value);
	    } else {
	      this.el.innerHTML = value;
	    }
	  },

	  swap: function swap(value) {
	    // remove old nodes
	    var i = this.nodes.length;
	    while (i--) {
	      remove(this.nodes[i]);
	    }
	    // convert new value to a fragment
	    // do not attempt to retrieve from id selector
	    var frag = parseTemplate(value, true, true);
	    // save a reference to these nodes so we can remove later
	    this.nodes = toArray(frag.childNodes);
	    before(frag, this.anchor);
	  }
	};

	var text = {

	  bind: function bind() {
	    this.attr = this.el.nodeType === 3 ? 'data' : 'textContent';
	  },

	  update: function update(value) {
	    this.el[this.attr] = _toString(value);
	  }
	};

	// must export plain object
	var publicDirectives = {
	  text: text,
	  html: html,
	  'for': vFor,
	  'if': vIf,
	  show: show,
	  model: model,
	  on: on,
	  bind: bind,
	  el: el,
	  ref: ref,
	  cloak: cloak
	};

	var queue$1 = [];
	var queued = false;

	/**
	 * Push a job into the queue.
	 *
	 * @param {Function} job
	 */

	function pushJob(job) {
	  queue$1.push(job);
	  if (!queued) {
	    queued = true;
	    nextTick(flush);
	  }
	}

	/**
	 * Flush the queue, and do one forced reflow before
	 * triggering transitions.
	 */

	function flush() {
	  // Force layout
	  var f = document.documentElement.offsetHeight;
	  for (var i = 0; i < queue$1.length; i++) {
	    queue$1[i]();
	  }
	  queue$1 = [];
	  queued = false;
	  // dummy return, so js linters don't complain about
	  // unused variable f
	  return f;
	}

	var TYPE_TRANSITION = 1;
	var TYPE_ANIMATION = 2;
	var transDurationProp = transitionProp + 'Duration';
	var animDurationProp = animationProp + 'Duration';

	/**
	 * A Transition object that encapsulates the state and logic
	 * of the transition.
	 *
	 * @param {Element} el
	 * @param {String} id
	 * @param {Object} hooks
	 * @param {Vue} vm
	 */
	function Transition(el, id, hooks, vm) {
	  this.id = id;
	  this.el = el;
	  this.enterClass = id + '-enter';
	  this.leaveClass = id + '-leave';
	  this.hooks = hooks;
	  this.vm = vm;
	  // async state
	  this.pendingCssEvent = this.pendingCssCb = this.cancel = this.pendingJsCb = this.op = this.cb = null;
	  this.justEntered = false;
	  this.entered = this.left = false;
	  this.typeCache = {};
	  // bind
	  var self = this;['enterNextTick', 'enterDone', 'leaveNextTick', 'leaveDone'].forEach(function (m) {
	    self[m] = bind$1(self[m], self);
	  });
	}

	var p$1 = Transition.prototype;

	/**
	 * Start an entering transition.
	 *
	 * 1. enter transition triggered
	 * 2. call beforeEnter hook
	 * 3. add enter class
	 * 4. insert/show element
	 * 5. call enter hook (with possible explicit js callback)
	 * 6. reflow
	 * 7. based on transition type:
	 *    - transition:
	 *        remove class now, wait for transitionend,
	 *        then done if there's no explicit js callback.
	 *    - animation:
	 *        wait for animationend, remove class,
	 *        then done if there's no explicit js callback.
	 *    - no css transition:
	 *        done now if there's no explicit js callback.
	 * 8. wait for either done or js callback, then call
	 *    afterEnter hook.
	 *
	 * @param {Function} op - insert/show the element
	 * @param {Function} [cb]
	 */

	p$1.enter = function (op, cb) {
	  this.cancelPending();
	  this.callHook('beforeEnter');
	  this.cb = cb;
	  addClass(this.el, this.enterClass);
	  op();
	  this.entered = false;
	  this.callHookWithCb('enter');
	  if (this.entered) {
	    return; // user called done synchronously.
	  }
	  this.cancel = this.hooks && this.hooks.enterCancelled;
	  pushJob(this.enterNextTick);
	};

	/**
	 * The "nextTick" phase of an entering transition, which is
	 * to be pushed into a queue and executed after a reflow so
	 * that removing the class can trigger a CSS transition.
	 */

	p$1.enterNextTick = function () {

	  // Important hack:
	  // in Chrome, if a just-entered element is applied the
	  // leave class while its interpolated property still has
	  // a very small value (within one frame), Chrome will
	  // skip the leave transition entirely and not firing the
	  // transtionend event. Therefore we need to protected
	  // against such cases using a one-frame timeout.
	  this.justEntered = true;
	  var self = this;
	  setTimeout(function () {
	    self.justEntered = false;
	  }, 17);

	  var enterDone = this.enterDone;
	  var type = this.getCssTransitionType(this.enterClass);
	  if (!this.pendingJsCb) {
	    if (type === TYPE_TRANSITION) {
	      // trigger transition by removing enter class now
	      removeClass(this.el, this.enterClass);
	      this.setupCssCb(transitionEndEvent, enterDone);
	    } else if (type === TYPE_ANIMATION) {
	      this.setupCssCb(animationEndEvent, enterDone);
	    } else {
	      enterDone();
	    }
	  } else if (type === TYPE_TRANSITION) {
	    removeClass(this.el, this.enterClass);
	  }
	};

	/**
	 * The "cleanup" phase of an entering transition.
	 */

	p$1.enterDone = function () {
	  this.entered = true;
	  this.cancel = this.pendingJsCb = null;
	  removeClass(this.el, this.enterClass);
	  this.callHook('afterEnter');
	  if (this.cb) this.cb();
	};

	/**
	 * Start a leaving transition.
	 *
	 * 1. leave transition triggered.
	 * 2. call beforeLeave hook
	 * 3. add leave class (trigger css transition)
	 * 4. call leave hook (with possible explicit js callback)
	 * 5. reflow if no explicit js callback is provided
	 * 6. based on transition type:
	 *    - transition or animation:
	 *        wait for end event, remove class, then done if
	 *        there's no explicit js callback.
	 *    - no css transition:
	 *        done if there's no explicit js callback.
	 * 7. wait for either done or js callback, then call
	 *    afterLeave hook.
	 *
	 * @param {Function} op - remove/hide the element
	 * @param {Function} [cb]
	 */

	p$1.leave = function (op, cb) {
	  this.cancelPending();
	  this.callHook('beforeLeave');
	  this.op = op;
	  this.cb = cb;
	  addClass(this.el, this.leaveClass);
	  this.left = false;
	  this.callHookWithCb('leave');
	  if (this.left) {
	    return; // user called done synchronously.
	  }
	  this.cancel = this.hooks && this.hooks.leaveCancelled;
	  // only need to handle leaveDone if
	  // 1. the transition is already done (synchronously called
	  //    by the user, which causes this.op set to null)
	  // 2. there's no explicit js callback
	  if (this.op && !this.pendingJsCb) {
	    // if a CSS transition leaves immediately after enter,
	    // the transitionend event never fires. therefore we
	    // detect such cases and end the leave immediately.
	    if (this.justEntered) {
	      this.leaveDone();
	    } else {
	      pushJob(this.leaveNextTick);
	    }
	  }
	};

	/**
	 * The "nextTick" phase of a leaving transition.
	 */

	p$1.leaveNextTick = function () {
	  var type = this.getCssTransitionType(this.leaveClass);
	  if (type) {
	    var event = type === TYPE_TRANSITION ? transitionEndEvent : animationEndEvent;
	    this.setupCssCb(event, this.leaveDone);
	  } else {
	    this.leaveDone();
	  }
	};

	/**
	 * The "cleanup" phase of a leaving transition.
	 */

	p$1.leaveDone = function () {
	  this.left = true;
	  this.cancel = this.pendingJsCb = null;
	  this.op();
	  removeClass(this.el, this.leaveClass);
	  this.callHook('afterLeave');
	  if (this.cb) this.cb();
	  this.op = null;
	};

	/**
	 * Cancel any pending callbacks from a previously running
	 * but not finished transition.
	 */

	p$1.cancelPending = function () {
	  this.op = this.cb = null;
	  var hasPending = false;
	  if (this.pendingCssCb) {
	    hasPending = true;
	    off(this.el, this.pendingCssEvent, this.pendingCssCb);
	    this.pendingCssEvent = this.pendingCssCb = null;
	  }
	  if (this.pendingJsCb) {
	    hasPending = true;
	    this.pendingJsCb.cancel();
	    this.pendingJsCb = null;
	  }
	  if (hasPending) {
	    removeClass(this.el, this.enterClass);
	    removeClass(this.el, this.leaveClass);
	  }
	  if (this.cancel) {
	    this.cancel.call(this.vm, this.el);
	    this.cancel = null;
	  }
	};

	/**
	 * Call a user-provided synchronous hook function.
	 *
	 * @param {String} type
	 */

	p$1.callHook = function (type) {
	  if (this.hooks && this.hooks[type]) {
	    this.hooks[type].call(this.vm, this.el);
	  }
	};

	/**
	 * Call a user-provided, potentially-async hook function.
	 * We check for the length of arguments to see if the hook
	 * expects a `done` callback. If true, the transition's end
	 * will be determined by when the user calls that callback;
	 * otherwise, the end is determined by the CSS transition or
	 * animation.
	 *
	 * @param {String} type
	 */

	p$1.callHookWithCb = function (type) {
	  var hook = this.hooks && this.hooks[type];
	  if (hook) {
	    if (hook.length > 1) {
	      this.pendingJsCb = cancellable(this[type + 'Done']);
	    }
	    hook.call(this.vm, this.el, this.pendingJsCb);
	  }
	};

	/**
	 * Get an element's transition type based on the
	 * calculated styles.
	 *
	 * @param {String} className
	 * @return {Number}
	 */

	p$1.getCssTransitionType = function (className) {
	  /* istanbul ignore if */
	  if (!transitionEndEvent ||
	  // skip CSS transitions if page is not visible -
	  // this solves the issue of transitionend events not
	  // firing until the page is visible again.
	  // pageVisibility API is supported in IE10+, same as
	  // CSS transitions.
	  document.hidden ||
	  // explicit js-only transition
	  this.hooks && this.hooks.css === false ||
	  // element is hidden
	  isHidden(this.el)) {
	    return;
	  }
	  var type = this.typeCache[className];
	  if (type) return type;
	  var inlineStyles = this.el.style;
	  var computedStyles = window.getComputedStyle(this.el);
	  var transDuration = inlineStyles[transDurationProp] || computedStyles[transDurationProp];
	  if (transDuration && transDuration !== '0s') {
	    type = TYPE_TRANSITION;
	  } else {
	    var animDuration = inlineStyles[animDurationProp] || computedStyles[animDurationProp];
	    if (animDuration && animDuration !== '0s') {
	      type = TYPE_ANIMATION;
	    }
	  }
	  if (type) {
	    this.typeCache[className] = type;
	  }
	  return type;
	};

	/**
	 * Setup a CSS transitionend/animationend callback.
	 *
	 * @param {String} event
	 * @param {Function} cb
	 */

	p$1.setupCssCb = function (event, cb) {
	  this.pendingCssEvent = event;
	  var self = this;
	  var el = this.el;
	  var onEnd = this.pendingCssCb = function (e) {
	    if (e.target === el) {
	      off(el, event, onEnd);
	      self.pendingCssEvent = self.pendingCssCb = null;
	      if (!self.pendingJsCb && cb) {
	        cb();
	      }
	    }
	  };
	  on$1(el, event, onEnd);
	};

	/**
	 * Check if an element is hidden - in that case we can just
	 * skip the transition alltogether.
	 *
	 * @param {Element} el
	 * @return {Boolean}
	 */

	function isHidden(el) {
	  return !(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
	}

	var transition = {

	  priority: 1100,

	  update: function update(id, oldId) {
	    var el = this.el;
	    // resolve on owner vm
	    var hooks = resolveAsset(this.vm.$options, 'transitions', id);
	    id = id || 'v';
	    // apply on closest vm
	    el.__v_trans = new Transition(el, id, hooks, this.el.__vue__ || this.vm);
	    if (oldId) {
	      removeClass(el, oldId + '-transition');
	    }
	    addClass(el, id + '-transition');
	  }
	};

	var bindingModes = config._propBindingModes;

	var propDef = {

	  bind: function bind() {

	    var child = this.vm;
	    var parent = child._context;
	    // passed in from compiler directly
	    var prop = this.descriptor.prop;
	    var childKey = prop.path;
	    var parentKey = prop.parentPath;
	    var twoWay = prop.mode === bindingModes.TWO_WAY;

	    var parentWatcher = this.parentWatcher = new Watcher(parent, parentKey, function (val) {
	      if (assertProp(prop, val)) {
	        child[childKey] = val;
	      }
	    }, {
	      twoWay: twoWay,
	      filters: prop.filters,
	      // important: props need to be observed on the
	      // v-for scope if present
	      scope: this._scope
	    });

	    // set the child initial value.
	    initProp(child, prop, parentWatcher.value);

	    // setup two-way binding
	    if (twoWay) {
	      // important: defer the child watcher creation until
	      // the created hook (after data observation)
	      var self = this;
	      child.$once('hook:created', function () {
	        self.childWatcher = new Watcher(child, childKey, function (val) {
	          parentWatcher.set(val);
	        }, {
	          // ensure sync upward before parent sync down.
	          // this is necessary in cases e.g. the child
	          // mutates a prop array, then replaces it. (#1683)
	          sync: true
	        });
	      });
	    }
	  },

	  unbind: function unbind() {
	    this.parentWatcher.teardown();
	    if (this.childWatcher) {
	      this.childWatcher.teardown();
	    }
	  }
	};

	var component = {

	  priority: 1500,

	  params: ['keep-alive', 'transition-mode', 'inline-template'],

	  /**
	   * Setup. Two possible usages:
	   *
	   * - static:
	   *   <comp> or <div v-component="comp">
	   *
	   * - dynamic:
	   *   <component :is="view">
	   */

	  bind: function bind() {
	    if (!this.el.__vue__) {
	      // keep-alive cache
	      this.keepAlive = this.params.keepAlive;
	      if (this.keepAlive) {
	        this.cache = {};
	      }
	      // check inline-template
	      if (this.params.inlineTemplate) {
	        // extract inline template as a DocumentFragment
	        this.inlineTemplate = extractContent(this.el, true);
	      }
	      // component resolution related state
	      this.pendingComponentCb = this.Component = null;
	      // transition related state
	      this.pendingRemovals = 0;
	      this.pendingRemovalCb = null;
	      // create a ref anchor
	      this.anchor = createAnchor('v-component');
	      replace(this.el, this.anchor);
	      // remove is attribute.
	      // this is removed during compilation, but because compilation is
	      // cached, when the component is used elsewhere this attribute
	      // will remain at link time.
	      this.el.removeAttribute('is');
	      // remove ref, same as above
	      if (this.descriptor.ref) {
	        this.el.removeAttribute('v-ref:' + hyphenate(this.descriptor.ref));
	      }
	      // if static, build right now.
	      if (this.literal) {
	        this.setComponent(this.expression);
	      }
	    } else {
	      process.env.NODE_ENV !== 'production' && warn('cannot mount component "' + this.expression + '" ' + 'on already mounted element: ' + this.el);
	    }
	  },

	  /**
	   * Public update, called by the watcher in the dynamic
	   * literal scenario, e.g. <component :is="view">
	   */

	  update: function update(value) {
	    if (!this.literal) {
	      this.setComponent(value);
	    }
	  },

	  /**
	   * Switch dynamic components. May resolve the component
	   * asynchronously, and perform transition based on
	   * specified transition mode. Accepts a few additional
	   * arguments specifically for vue-router.
	   *
	   * The callback is called when the full transition is
	   * finished.
	   *
	   * @param {String} value
	   * @param {Function} [cb]
	   */

	  setComponent: function setComponent(value, cb) {
	    this.invalidatePending();
	    if (!value) {
	      // just remove current
	      this.unbuild(true);
	      this.remove(this.childVM, cb);
	      this.childVM = null;
	    } else {
	      var self = this;
	      this.resolveComponent(value, function () {
	        self.mountComponent(cb);
	      });
	    }
	  },

	  /**
	   * Resolve the component constructor to use when creating
	   * the child vm.
	   */

	  resolveComponent: function resolveComponent(id, cb) {
	    var self = this;
	    this.pendingComponentCb = cancellable(function (Component) {
	      self.ComponentName = Component.options.name || id;
	      self.Component = Component;
	      cb();
	    });
	    this.vm._resolveComponent(id, this.pendingComponentCb);
	  },

	  /**
	   * Create a new instance using the current constructor and
	   * replace the existing instance. This method doesn't care
	   * whether the new component and the old one are actually
	   * the same.
	   *
	   * @param {Function} [cb]
	   */

	  mountComponent: function mountComponent(cb) {
	    // actual mount
	    this.unbuild(true);
	    var self = this;
	    var activateHook = this.Component.options.activate;
	    var cached = this.getCached();
	    var newComponent = this.build();
	    if (activateHook && !cached) {
	      this.waitingFor = newComponent;
	      activateHook.call(newComponent, function () {
	        self.waitingFor = null;
	        self.transition(newComponent, cb);
	      });
	    } else {
	      // update ref for kept-alive component
	      if (cached) {
	        newComponent._updateRef();
	      }
	      this.transition(newComponent, cb);
	    }
	  },

	  /**
	   * When the component changes or unbinds before an async
	   * constructor is resolved, we need to invalidate its
	   * pending callback.
	   */

	  invalidatePending: function invalidatePending() {
	    if (this.pendingComponentCb) {
	      this.pendingComponentCb.cancel();
	      this.pendingComponentCb = null;
	    }
	  },

	  /**
	   * Instantiate/insert a new child vm.
	   * If keep alive and has cached instance, insert that
	   * instance; otherwise build a new one and cache it.
	   *
	   * @param {Object} [extraOptions]
	   * @return {Vue} - the created instance
	   */

	  build: function build(extraOptions) {
	    var cached = this.getCached();
	    if (cached) {
	      return cached;
	    }
	    if (this.Component) {
	      // default options
	      var options = {
	        name: this.ComponentName,
	        el: cloneNode(this.el),
	        template: this.inlineTemplate,
	        // make sure to add the child with correct parent
	        // if this is a transcluded component, its parent
	        // should be the transclusion host.
	        parent: this._host || this.vm,
	        // if no inline-template, then the compiled
	        // linker can be cached for better performance.
	        _linkerCachable: !this.inlineTemplate,
	        _ref: this.descriptor.ref,
	        _asComponent: true,
	        _isRouterView: this._isRouterView,
	        // if this is a transcluded component, context
	        // will be the common parent vm of this instance
	        // and its host.
	        _context: this.vm,
	        // if this is inside an inline v-for, the scope
	        // will be the intermediate scope created for this
	        // repeat fragment. this is used for linking props
	        // and container directives.
	        _scope: this._scope,
	        // pass in the owner fragment of this component.
	        // this is necessary so that the fragment can keep
	        // track of its contained components in order to
	        // call attach/detach hooks for them.
	        _frag: this._frag
	      };
	      // extra options
	      // in 1.0.0 this is used by vue-router only
	      /* istanbul ignore if */
	      if (extraOptions) {
	        extend(options, extraOptions);
	      }
	      var child = new this.Component(options);
	      if (this.keepAlive) {
	        this.cache[this.Component.cid] = child;
	      }
	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production' && this.el.hasAttribute('transition') && child._isFragment) {
	        warn('Transitions will not work on a fragment instance. ' + 'Template: ' + child.$options.template);
	      }
	      return child;
	    }
	  },

	  /**
	   * Try to get a cached instance of the current component.
	   *
	   * @return {Vue|undefined}
	   */

	  getCached: function getCached() {
	    return this.keepAlive && this.cache[this.Component.cid];
	  },

	  /**
	   * Teardown the current child, but defers cleanup so
	   * that we can separate the destroy and removal steps.
	   *
	   * @param {Boolean} defer
	   */

	  unbuild: function unbuild(defer) {
	    if (this.waitingFor) {
	      this.waitingFor.$destroy();
	      this.waitingFor = null;
	    }
	    var child = this.childVM;
	    if (!child || this.keepAlive) {
	      if (child) {
	        // remove ref
	        child._updateRef(true);
	      }
	      return;
	    }
	    // the sole purpose of `deferCleanup` is so that we can
	    // "deactivate" the vm right now and perform DOM removal
	    // later.
	    child.$destroy(false, defer);
	  },

	  /**
	   * Remove current destroyed child and manually do
	   * the cleanup after removal.
	   *
	   * @param {Function} cb
	   */

	  remove: function remove(child, cb) {
	    var keepAlive = this.keepAlive;
	    if (child) {
	      // we may have a component switch when a previous
	      // component is still being transitioned out.
	      // we want to trigger only one lastest insertion cb
	      // when the existing transition finishes. (#1119)
	      this.pendingRemovals++;
	      this.pendingRemovalCb = cb;
	      var self = this;
	      child.$remove(function () {
	        self.pendingRemovals--;
	        if (!keepAlive) child._cleanup();
	        if (!self.pendingRemovals && self.pendingRemovalCb) {
	          self.pendingRemovalCb();
	          self.pendingRemovalCb = null;
	        }
	      });
	    } else if (cb) {
	      cb();
	    }
	  },

	  /**
	   * Actually swap the components, depending on the
	   * transition mode. Defaults to simultaneous.
	   *
	   * @param {Vue} target
	   * @param {Function} [cb]
	   */

	  transition: function transition(target, cb) {
	    var self = this;
	    var current = this.childVM;
	    // for devtool inspection
	    if (process.env.NODE_ENV !== 'production') {
	      if (current) current._inactive = true;
	      target._inactive = false;
	    }
	    this.childVM = target;
	    switch (self.params.transitionMode) {
	      case 'in-out':
	        target.$before(self.anchor, function () {
	          self.remove(current, cb);
	        });
	        break;
	      case 'out-in':
	        self.remove(current, function () {
	          target.$before(self.anchor, cb);
	        });
	        break;
	      default:
	        self.remove(current);
	        target.$before(self.anchor, cb);
	    }
	  },

	  /**
	   * Unbind.
	   */

	  unbind: function unbind() {
	    this.invalidatePending();
	    // Do not defer cleanup when unbinding
	    this.unbuild();
	    // destroy all keep-alive cached instances
	    if (this.cache) {
	      for (var key in this.cache) {
	        this.cache[key].$destroy();
	      }
	      this.cache = null;
	    }
	  }
	};

	var vClass = {

	  deep: true,

	  update: function update(value) {
	    if (value && typeof value === 'string') {
	      this.handleObject(stringToObject(value));
	    } else if (isPlainObject(value)) {
	      this.handleObject(value);
	    } else if (isArray(value)) {
	      this.handleArray(value);
	    } else {
	      this.cleanup();
	    }
	  },

	  handleObject: function handleObject(value) {
	    this.cleanup(value);
	    var keys = this.prevKeys = Object.keys(value);
	    for (var i = 0, l = keys.length; i < l; i++) {
	      var key = keys[i];
	      if (value[key]) {
	        addClass(this.el, key);
	      } else {
	        removeClass(this.el, key);
	      }
	    }
	  },

	  handleArray: function handleArray(value) {
	    this.cleanup(value);
	    for (var i = 0, l = value.length; i < l; i++) {
	      if (value[i]) {
	        addClass(this.el, value[i]);
	      }
	    }
	    this.prevKeys = value.slice();
	  },

	  cleanup: function cleanup(value) {
	    if (this.prevKeys) {
	      var i = this.prevKeys.length;
	      while (i--) {
	        var key = this.prevKeys[i];
	        if (key && (!value || !contains$1(value, key))) {
	          removeClass(this.el, key);
	        }
	      }
	    }
	  }
	};

	function stringToObject(value) {
	  var res = {};
	  var keys = value.trim().split(/\s+/);
	  var i = keys.length;
	  while (i--) {
	    res[keys[i]] = true;
	  }
	  return res;
	}

	function contains$1(value, key) {
	  return isArray(value) ? value.indexOf(key) > -1 : hasOwn(value, key);
	}

	var internalDirectives = {
	  style: style,
	  'class': vClass,
	  component: component,
	  prop: propDef,
	  transition: transition
	};

	var propBindingModes = config._propBindingModes;
	var empty = {};

	// regexes
	var identRE = /^[$_a-zA-Z]+[\w$]*$/;
	var settablePathRE = /^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\[[^\[\]]+\])*$/;

	/**
	 * Compile props on a root element and return
	 * a props link function.
	 *
	 * @param {Element|DocumentFragment} el
	 * @param {Array} propOptions
	 * @return {Function} propsLinkFn
	 */

	function compileProps(el, propOptions) {
	  var props = [];
	  var names = Object.keys(propOptions);
	  var i = names.length;
	  var options, name, attr, value, path, parsed, prop;
	  while (i--) {
	    name = names[i];
	    options = propOptions[name] || empty;

	    if (process.env.NODE_ENV !== 'production' && name === '$data') {
	      warn('Do not use $data as prop.');
	      continue;
	    }

	    // props could contain dashes, which will be
	    // interpreted as minus calculations by the parser
	    // so we need to camelize the path here
	    path = camelize(name);
	    if (!identRE.test(path)) {
	      process.env.NODE_ENV !== 'production' && warn('Invalid prop key: "' + name + '". Prop keys ' + 'must be valid identifiers.');
	      continue;
	    }

	    prop = {
	      name: name,
	      path: path,
	      options: options,
	      mode: propBindingModes.ONE_WAY,
	      raw: null
	    };

	    attr = hyphenate(name);
	    // first check dynamic version
	    if ((value = getBindAttr(el, attr)) === null) {
	      if ((value = getBindAttr(el, attr + '.sync')) !== null) {
	        prop.mode = propBindingModes.TWO_WAY;
	      } else if ((value = getBindAttr(el, attr + '.once')) !== null) {
	        prop.mode = propBindingModes.ONE_TIME;
	      }
	    }
	    if (value !== null) {
	      // has dynamic binding!
	      prop.raw = value;
	      parsed = parseDirective(value);
	      value = parsed.expression;
	      prop.filters = parsed.filters;
	      // check binding type
	      if (isLiteral(value)) {
	        // for expressions containing literal numbers and
	        // booleans, there's no need to setup a prop binding,
	        // so we can optimize them as a one-time set.
	        prop.optimizedLiteral = true;
	      } else {
	        prop.dynamic = true;
	        // check non-settable path for two-way bindings
	        if (process.env.NODE_ENV !== 'production' && prop.mode === propBindingModes.TWO_WAY && !settablePathRE.test(value)) {
	          prop.mode = propBindingModes.ONE_WAY;
	          warn('Cannot bind two-way prop with non-settable ' + 'parent path: ' + value);
	        }
	      }
	      prop.parentPath = value;

	      // warn required two-way
	      if (process.env.NODE_ENV !== 'production' && options.twoWay && prop.mode !== propBindingModes.TWO_WAY) {
	        warn('Prop "' + name + '" expects a two-way binding type.');
	      }
	    } else if ((value = getAttr(el, attr)) !== null) {
	      // has literal binding!
	      prop.raw = value;
	    } else if (options.required) {
	      // warn missing required
	      process.env.NODE_ENV !== 'production' && warn('Missing required prop: ' + name);
	    }
	    // push prop
	    props.push(prop);
	  }
	  return makePropsLinkFn(props);
	}

	/**
	 * Build a function that applies props to a vm.
	 *
	 * @param {Array} props
	 * @return {Function} propsLinkFn
	 */

	function makePropsLinkFn(props) {
	  return function propsLinkFn(vm, scope) {
	    // store resolved props info
	    vm._props = {};
	    var i = props.length;
	    var prop, path, options, value, raw;
	    while (i--) {
	      prop = props[i];
	      raw = prop.raw;
	      path = prop.path;
	      options = prop.options;
	      vm._props[path] = prop;
	      if (raw === null) {
	        // initialize absent prop
	        initProp(vm, prop, getDefault(vm, options));
	      } else if (prop.dynamic) {
	        // dynamic prop
	        if (vm._context) {
	          if (prop.mode === propBindingModes.ONE_TIME) {
	            // one time binding
	            value = (scope || vm._context).$get(prop.parentPath);
	            initProp(vm, prop, value);
	          } else {
	            // dynamic binding
	            vm._bindDir({
	              name: 'prop',
	              def: propDef,
	              prop: prop
	            }, null, null, scope); // el, host, scope
	          }
	        } else {
	            process.env.NODE_ENV !== 'production' && warn('Cannot bind dynamic prop on a root instance' + ' with no parent: ' + prop.name + '="' + raw + '"');
	          }
	      } else if (prop.optimizedLiteral) {
	        // optimized literal, cast it and just set once
	        var stripped = stripQuotes(raw);
	        value = stripped === raw ? toBoolean(toNumber(raw)) : stripped;
	        initProp(vm, prop, value);
	      } else {
	        // string literal, but we need to cater for
	        // Boolean props with no value
	        value = options.type === Boolean && raw === '' ? true : raw;
	        initProp(vm, prop, value);
	      }
	    }
	  };
	}

	/**
	 * Get the default value of a prop.
	 *
	 * @param {Vue} vm
	 * @param {Object} options
	 * @return {*}
	 */

	function getDefault(vm, options) {
	  // no default, return undefined
	  if (!hasOwn(options, 'default')) {
	    // absent boolean value defaults to false
	    return options.type === Boolean ? false : undefined;
	  }
	  var def = options['default'];
	  // warn against non-factory defaults for Object & Array
	  if (isObject(def)) {
	    process.env.NODE_ENV !== 'production' && warn('Object/Array as default prop values will be shared ' + 'across multiple instances. Use a factory function ' + 'to return the default value instead.');
	  }
	  // call factory function for non-Function types
	  return typeof def === 'function' && options.type !== Function ? def.call(vm) : def;
	}

	// special binding prefixes
	var bindRE = /^v-bind:|^:/;
	var onRE = /^v-on:|^@/;
	var argRE = /:(.*)$/;
	var modifierRE = /\.[^\.]+/g;
	var transitionRE = /^(v-bind:|:)?transition$/;

	// terminal directives
	var terminalDirectives = ['for', 'if'];

	// default directive priority
	var DEFAULT_PRIORITY = 1000;

	/**
	 * Compile a template and return a reusable composite link
	 * function, which recursively contains more link functions
	 * inside. This top level compile function would normally
	 * be called on instance root nodes, but can also be used
	 * for partial compilation if the partial argument is true.
	 *
	 * The returned composite link function, when called, will
	 * return an unlink function that tearsdown all directives
	 * created during the linking phase.
	 *
	 * @param {Element|DocumentFragment} el
	 * @param {Object} options
	 * @param {Boolean} partial
	 * @return {Function}
	 */

	function compile(el, options, partial) {
	  // link function for the node itself.
	  var nodeLinkFn = partial || !options._asComponent ? compileNode(el, options) : null;
	  // link function for the childNodes
	  var childLinkFn = !(nodeLinkFn && nodeLinkFn.terminal) && el.tagName !== 'SCRIPT' && el.hasChildNodes() ? compileNodeList(el.childNodes, options) : null;

	  /**
	   * A composite linker function to be called on a already
	   * compiled piece of DOM, which instantiates all directive
	   * instances.
	   *
	   * @param {Vue} vm
	   * @param {Element|DocumentFragment} el
	   * @param {Vue} [host] - host vm of transcluded content
	   * @param {Object} [scope] - v-for scope
	   * @param {Fragment} [frag] - link context fragment
	   * @return {Function|undefined}
	   */

	  return function compositeLinkFn(vm, el, host, scope, frag) {
	    // cache childNodes before linking parent, fix #657
	    var childNodes = toArray(el.childNodes);
	    // link
	    var dirs = linkAndCapture(function compositeLinkCapturer() {
	      if (nodeLinkFn) nodeLinkFn(vm, el, host, scope, frag);
	      if (childLinkFn) childLinkFn(vm, childNodes, host, scope, frag);
	    }, vm);
	    return makeUnlinkFn(vm, dirs);
	  };
	}

	/**
	 * Apply a linker to a vm/element pair and capture the
	 * directives created during the process.
	 *
	 * @param {Function} linker
	 * @param {Vue} vm
	 */

	function linkAndCapture(linker, vm) {
	  var originalDirCount = vm._directives.length;
	  linker();
	  var dirs = vm._directives.slice(originalDirCount);
	  dirs.sort(directiveComparator);
	  for (var i = 0, l = dirs.length; i < l; i++) {
	    dirs[i]._bind();
	  }
	  return dirs;
	}

	/**
	 * Directive priority sort comparator
	 *
	 * @param {Object} a
	 * @param {Object} b
	 */

	function directiveComparator(a, b) {
	  a = a.descriptor.def.priority || DEFAULT_PRIORITY;
	  b = b.descriptor.def.priority || DEFAULT_PRIORITY;
	  return a > b ? -1 : a === b ? 0 : 1;
	}

	/**
	 * Linker functions return an unlink function that
	 * tearsdown all directives instances generated during
	 * the process.
	 *
	 * We create unlink functions with only the necessary
	 * information to avoid retaining additional closures.
	 *
	 * @param {Vue} vm
	 * @param {Array} dirs
	 * @param {Vue} [context]
	 * @param {Array} [contextDirs]
	 * @return {Function}
	 */

	function makeUnlinkFn(vm, dirs, context, contextDirs) {
	  return function unlink(destroying) {
	    teardownDirs(vm, dirs, destroying);
	    if (context && contextDirs) {
	      teardownDirs(context, contextDirs);
	    }
	  };
	}

	/**
	 * Teardown partial linked directives.
	 *
	 * @param {Vue} vm
	 * @param {Array} dirs
	 * @param {Boolean} destroying
	 */

	function teardownDirs(vm, dirs, destroying) {
	  var i = dirs.length;
	  while (i--) {
	    dirs[i]._teardown();
	    if (!destroying) {
	      vm._directives.$remove(dirs[i]);
	    }
	  }
	}

	/**
	 * Compile link props on an instance.
	 *
	 * @param {Vue} vm
	 * @param {Element} el
	 * @param {Object} props
	 * @param {Object} [scope]
	 * @return {Function}
	 */

	function compileAndLinkProps(vm, el, props, scope) {
	  var propsLinkFn = compileProps(el, props);
	  var propDirs = linkAndCapture(function () {
	    propsLinkFn(vm, scope);
	  }, vm);
	  return makeUnlinkFn(vm, propDirs);
	}

	/**
	 * Compile the root element of an instance.
	 *
	 * 1. attrs on context container (context scope)
	 * 2. attrs on the component template root node, if
	 *    replace:true (child scope)
	 *
	 * If this is a fragment instance, we only need to compile 1.
	 *
	 * @param {Vue} vm
	 * @param {Element} el
	 * @param {Object} options
	 * @param {Object} contextOptions
	 * @return {Function}
	 */

	function compileRoot(el, options, contextOptions) {
	  var containerAttrs = options._containerAttrs;
	  var replacerAttrs = options._replacerAttrs;
	  var contextLinkFn, replacerLinkFn;

	  // only need to compile other attributes for
	  // non-fragment instances
	  if (el.nodeType !== 11) {
	    // for components, container and replacer need to be
	    // compiled separately and linked in different scopes.
	    if (options._asComponent) {
	      // 2. container attributes
	      if (containerAttrs && contextOptions) {
	        contextLinkFn = compileDirectives(containerAttrs, contextOptions);
	      }
	      if (replacerAttrs) {
	        // 3. replacer attributes
	        replacerLinkFn = compileDirectives(replacerAttrs, options);
	      }
	    } else {
	      // non-component, just compile as a normal element.
	      replacerLinkFn = compileDirectives(el.attributes, options);
	    }
	  } else if (process.env.NODE_ENV !== 'production' && containerAttrs) {
	    // warn container directives for fragment instances
	    var names = containerAttrs.filter(function (attr) {
	      // allow vue-loader/vueify scoped css attributes
	      return attr.name.indexOf('_v-') < 0 &&
	      // allow event listeners
	      !onRE.test(attr.name) &&
	      // allow slots
	      attr.name !== 'slot';
	    }).map(function (attr) {
	      return '"' + attr.name + '"';
	    });
	    if (names.length) {
	      var plural = names.length > 1;
	      warn('Attribute' + (plural ? 's ' : ' ') + names.join(', ') + (plural ? ' are' : ' is') + ' ignored on component ' + '<' + options.el.tagName.toLowerCase() + '> because ' + 'the component is a fragment instance: ' + 'http://vuejs.org/guide/components.html#Fragment_Instance');
	    }
	  }

	  return function rootLinkFn(vm, el, scope) {
	    // link context scope dirs
	    var context = vm._context;
	    var contextDirs;
	    if (context && contextLinkFn) {
	      contextDirs = linkAndCapture(function () {
	        contextLinkFn(context, el, null, scope);
	      }, context);
	    }

	    // link self
	    var selfDirs = linkAndCapture(function () {
	      if (replacerLinkFn) replacerLinkFn(vm, el);
	    }, vm);

	    // return the unlink function that tearsdown context
	    // container directives.
	    return makeUnlinkFn(vm, selfDirs, context, contextDirs);
	  };
	}

	/**
	 * Compile a node and return a nodeLinkFn based on the
	 * node type.
	 *
	 * @param {Node} node
	 * @param {Object} options
	 * @return {Function|null}
	 */

	function compileNode(node, options) {
	  var type = node.nodeType;
	  if (type === 1 && node.tagName !== 'SCRIPT') {
	    return compileElement(node, options);
	  } else if (type === 3 && node.data.trim()) {
	    return compileTextNode(node, options);
	  } else {
	    return null;
	  }
	}

	/**
	 * Compile an element and return a nodeLinkFn.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function|null}
	 */

	function compileElement(el, options) {
	  // preprocess textareas.
	  // textarea treats its text content as the initial value.
	  // just bind it as an attr directive for value.
	  if (el.tagName === 'TEXTAREA') {
	    var tokens = parseText(el.value);
	    if (tokens) {
	      el.setAttribute(':value', tokensToExp(tokens));
	      el.value = '';
	    }
	  }
	  var linkFn;
	  var hasAttrs = el.hasAttributes();
	  // check terminal directives (for & if)
	  if (hasAttrs) {
	    linkFn = checkTerminalDirectives(el, options);
	  }
	  // check element directives
	  if (!linkFn) {
	    linkFn = checkElementDirectives(el, options);
	  }
	  // check component
	  if (!linkFn) {
	    linkFn = checkComponent(el, options);
	  }
	  // normal directives
	  if (!linkFn && hasAttrs) {
	    linkFn = compileDirectives(el.attributes, options);
	  }
	  return linkFn;
	}

	/**
	 * Compile a textNode and return a nodeLinkFn.
	 *
	 * @param {TextNode} node
	 * @param {Object} options
	 * @return {Function|null} textNodeLinkFn
	 */

	function compileTextNode(node, options) {
	  // skip marked text nodes
	  if (node._skip) {
	    return removeText;
	  }

	  var tokens = parseText(node.wholeText);
	  if (!tokens) {
	    return null;
	  }

	  // mark adjacent text nodes as skipped,
	  // because we are using node.wholeText to compile
	  // all adjacent text nodes together. This fixes
	  // issues in IE where sometimes it splits up a single
	  // text node into multiple ones.
	  var next = node.nextSibling;
	  while (next && next.nodeType === 3) {
	    next._skip = true;
	    next = next.nextSibling;
	  }

	  var frag = document.createDocumentFragment();
	  var el, token;
	  for (var i = 0, l = tokens.length; i < l; i++) {
	    token = tokens[i];
	    el = token.tag ? processTextToken(token, options) : document.createTextNode(token.value);
	    frag.appendChild(el);
	  }
	  return makeTextNodeLinkFn(tokens, frag, options);
	}

	/**
	 * Linker for an skipped text node.
	 *
	 * @param {Vue} vm
	 * @param {Text} node
	 */

	function removeText(vm, node) {
	  remove(node);
	}

	/**
	 * Process a single text token.
	 *
	 * @param {Object} token
	 * @param {Object} options
	 * @return {Node}
	 */

	function processTextToken(token, options) {
	  var el;
	  if (token.oneTime) {
	    el = document.createTextNode(token.value);
	  } else {
	    if (token.html) {
	      el = document.createComment('v-html');
	      setTokenType('html');
	    } else {
	      // IE will clean up empty textNodes during
	      // frag.cloneNode(true), so we have to give it
	      // something here...
	      el = document.createTextNode(' ');
	      setTokenType('text');
	    }
	  }
	  function setTokenType(type) {
	    if (token.descriptor) return;
	    var parsed = parseDirective(token.value);
	    token.descriptor = {
	      name: type,
	      def: publicDirectives[type],
	      expression: parsed.expression,
	      filters: parsed.filters
	    };
	  }
	  return el;
	}

	/**
	 * Build a function that processes a textNode.
	 *
	 * @param {Array<Object>} tokens
	 * @param {DocumentFragment} frag
	 */

	function makeTextNodeLinkFn(tokens, frag) {
	  return function textNodeLinkFn(vm, el, host, scope) {
	    var fragClone = frag.cloneNode(true);
	    var childNodes = toArray(fragClone.childNodes);
	    var token, value, node;
	    for (var i = 0, l = tokens.length; i < l; i++) {
	      token = tokens[i];
	      value = token.value;
	      if (token.tag) {
	        node = childNodes[i];
	        if (token.oneTime) {
	          value = (scope || vm).$eval(value);
	          if (token.html) {
	            replace(node, parseTemplate(value, true));
	          } else {
	            node.data = value;
	          }
	        } else {
	          vm._bindDir(token.descriptor, node, host, scope);
	        }
	      }
	    }
	    replace(el, fragClone);
	  };
	}

	/**
	 * Compile a node list and return a childLinkFn.
	 *
	 * @param {NodeList} nodeList
	 * @param {Object} options
	 * @return {Function|undefined}
	 */

	function compileNodeList(nodeList, options) {
	  var linkFns = [];
	  var nodeLinkFn, childLinkFn, node;
	  for (var i = 0, l = nodeList.length; i < l; i++) {
	    node = nodeList[i];
	    nodeLinkFn = compileNode(node, options);
	    childLinkFn = !(nodeLinkFn && nodeLinkFn.terminal) && node.tagName !== 'SCRIPT' && node.hasChildNodes() ? compileNodeList(node.childNodes, options) : null;
	    linkFns.push(nodeLinkFn, childLinkFn);
	  }
	  return linkFns.length ? makeChildLinkFn(linkFns) : null;
	}

	/**
	 * Make a child link function for a node's childNodes.
	 *
	 * @param {Array<Function>} linkFns
	 * @return {Function} childLinkFn
	 */

	function makeChildLinkFn(linkFns) {
	  return function childLinkFn(vm, nodes, host, scope, frag) {
	    var node, nodeLinkFn, childrenLinkFn;
	    for (var i = 0, n = 0, l = linkFns.length; i < l; n++) {
	      node = nodes[n];
	      nodeLinkFn = linkFns[i++];
	      childrenLinkFn = linkFns[i++];
	      // cache childNodes before linking parent, fix #657
	      var childNodes = toArray(node.childNodes);
	      if (nodeLinkFn) {
	        nodeLinkFn(vm, node, host, scope, frag);
	      }
	      if (childrenLinkFn) {
	        childrenLinkFn(vm, childNodes, host, scope, frag);
	      }
	    }
	  };
	}

	/**
	 * Check for element directives (custom elements that should
	 * be resovled as terminal directives).
	 *
	 * @param {Element} el
	 * @param {Object} options
	 */

	function checkElementDirectives(el, options) {
	  var tag = el.tagName.toLowerCase();
	  if (commonTagRE.test(tag)) return;
	  var def = resolveAsset(options, 'elementDirectives', tag);
	  if (def) {
	    return makeTerminalNodeLinkFn(el, tag, '', options, def);
	  }
	}

	/**
	 * Check if an element is a component. If yes, return
	 * a component link function.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function|undefined}
	 */

	function checkComponent(el, options) {
	  var component = checkComponentAttr(el, options);
	  if (component) {
	    var ref = findRef(el);
	    var descriptor = {
	      name: 'component',
	      ref: ref,
	      expression: component.id,
	      def: internalDirectives.component,
	      modifiers: {
	        literal: !component.dynamic
	      }
	    };
	    var componentLinkFn = function componentLinkFn(vm, el, host, scope, frag) {
	      if (ref) {
	        defineReactive((scope || vm).$refs, ref, null);
	      }
	      vm._bindDir(descriptor, el, host, scope, frag);
	    };
	    componentLinkFn.terminal = true;
	    return componentLinkFn;
	  }
	}

	/**
	 * Check an element for terminal directives in fixed order.
	 * If it finds one, return a terminal link function.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function} terminalLinkFn
	 */

	function checkTerminalDirectives(el, options) {
	  // skip v-pre
	  if (getAttr(el, 'v-pre') !== null) {
	    return skip;
	  }
	  // skip v-else block, but only if following v-if
	  if (el.hasAttribute('v-else')) {
	    var prev = el.previousElementSibling;
	    if (prev && prev.hasAttribute('v-if')) {
	      return skip;
	    }
	  }
	  var value, dirName;
	  for (var i = 0, l = terminalDirectives.length; i < l; i++) {
	    dirName = terminalDirectives[i];
	    /* eslint-disable no-cond-assign */
	    if (value = el.getAttribute('v-' + dirName)) {
	      return makeTerminalNodeLinkFn(el, dirName, value, options);
	    }
	    /* eslint-enable no-cond-assign */
	  }
	}

	function skip() {}
	skip.terminal = true;

	/**
	 * Build a node link function for a terminal directive.
	 * A terminal link function terminates the current
	 * compilation recursion and handles compilation of the
	 * subtree in the directive.
	 *
	 * @param {Element} el
	 * @param {String} dirName
	 * @param {String} value
	 * @param {Object} options
	 * @param {Object} [def]
	 * @return {Function} terminalLinkFn
	 */

	function makeTerminalNodeLinkFn(el, dirName, value, options, def) {
	  var parsed = parseDirective(value);
	  var descriptor = {
	    name: dirName,
	    expression: parsed.expression,
	    filters: parsed.filters,
	    raw: value,
	    // either an element directive, or if/for
	    def: def || publicDirectives[dirName]
	  };
	  // check ref for v-for and router-view
	  if (dirName === 'for' || dirName === 'router-view') {
	    descriptor.ref = findRef(el);
	  }
	  var fn = function terminalNodeLinkFn(vm, el, host, scope, frag) {
	    if (descriptor.ref) {
	      defineReactive((scope || vm).$refs, descriptor.ref, null);
	    }
	    vm._bindDir(descriptor, el, host, scope, frag);
	  };
	  fn.terminal = true;
	  return fn;
	}

	/**
	 * Compile the directives on an element and return a linker.
	 *
	 * @param {Array|NamedNodeMap} attrs
	 * @param {Object} options
	 * @return {Function}
	 */

	function compileDirectives(attrs, options) {
	  var i = attrs.length;
	  var dirs = [];
	  var attr, name, value, rawName, rawValue, dirName, arg, modifiers, dirDef, tokens;
	  while (i--) {
	    attr = attrs[i];
	    name = rawName = attr.name;
	    value = rawValue = attr.value;
	    tokens = parseText(value);
	    // reset arg
	    arg = null;
	    // check modifiers
	    modifiers = parseModifiers(name);
	    name = name.replace(modifierRE, '');

	    // attribute interpolations
	    if (tokens) {
	      value = tokensToExp(tokens);
	      arg = name;
	      pushDir('bind', publicDirectives.bind, true);
	      // warn against mixing mustaches with v-bind
	      if (process.env.NODE_ENV !== 'production') {
	        if (name === 'class' && Array.prototype.some.call(attrs, function (attr) {
	          return attr.name === ':class' || attr.name === 'v-bind:class';
	        })) {
	          warn('class="' + rawValue + '": Do not mix mustache interpolation ' + 'and v-bind for "class" on the same element. Use one or the other.');
	        }
	      }
	    } else

	      // special attribute: transition
	      if (transitionRE.test(name)) {
	        modifiers.literal = !bindRE.test(name);
	        pushDir('transition', internalDirectives.transition);
	      } else

	        // event handlers
	        if (onRE.test(name)) {
	          arg = name.replace(onRE, '');
	          pushDir('on', publicDirectives.on);
	        } else

	          // attribute bindings
	          if (bindRE.test(name)) {
	            dirName = name.replace(bindRE, '');
	            if (dirName === 'style' || dirName === 'class') {
	              pushDir(dirName, internalDirectives[dirName]);
	            } else {
	              arg = dirName;
	              pushDir('bind', publicDirectives.bind);
	            }
	          } else

	            // normal directives
	            if (name.indexOf('v-') === 0) {
	              // check arg
	              arg = (arg = name.match(argRE)) && arg[1];
	              if (arg) {
	                name = name.replace(argRE, '');
	              }
	              // extract directive name
	              dirName = name.slice(2);

	              // skip v-else (when used with v-show)
	              if (dirName === 'else') {
	                continue;
	              }

	              dirDef = resolveAsset(options, 'directives', dirName);

	              if (process.env.NODE_ENV !== 'production') {
	                assertAsset(dirDef, 'directive', dirName);
	              }

	              if (dirDef) {
	                pushDir(dirName, dirDef);
	              }
	            }
	  }

	  /**
	   * Push a directive.
	   *
	   * @param {String} dirName
	   * @param {Object|Function} def
	   * @param {Boolean} [interp]
	   */

	  function pushDir(dirName, def, interp) {
	    var parsed = parseDirective(value);
	    dirs.push({
	      name: dirName,
	      attr: rawName,
	      raw: rawValue,
	      def: def,
	      arg: arg,
	      modifiers: modifiers,
	      expression: parsed.expression,
	      filters: parsed.filters,
	      interp: interp
	    });
	  }

	  if (dirs.length) {
	    return makeNodeLinkFn(dirs);
	  }
	}

	/**
	 * Parse modifiers from directive attribute name.
	 *
	 * @param {String} name
	 * @return {Object}
	 */

	function parseModifiers(name) {
	  var res = Object.create(null);
	  var match = name.match(modifierRE);
	  if (match) {
	    var i = match.length;
	    while (i--) {
	      res[match[i].slice(1)] = true;
	    }
	  }
	  return res;
	}

	/**
	 * Build a link function for all directives on a single node.
	 *
	 * @param {Array} directives
	 * @return {Function} directivesLinkFn
	 */

	function makeNodeLinkFn(directives) {
	  return function nodeLinkFn(vm, el, host, scope, frag) {
	    // reverse apply because it's sorted low to high
	    var i = directives.length;
	    while (i--) {
	      vm._bindDir(directives[i], el, host, scope, frag);
	    }
	  };
	}

	var specialCharRE = /[^\w\-:\.]/;

	/**
	 * Process an element or a DocumentFragment based on a
	 * instance option object. This allows us to transclude
	 * a template node/fragment before the instance is created,
	 * so the processed fragment can then be cloned and reused
	 * in v-for.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Element|DocumentFragment}
	 */

	function transclude(el, options) {
	  // extract container attributes to pass them down
	  // to compiler, because they need to be compiled in
	  // parent scope. we are mutating the options object here
	  // assuming the same object will be used for compile
	  // right after this.
	  if (options) {
	    options._containerAttrs = extractAttrs(el);
	  }
	  // for template tags, what we want is its content as
	  // a documentFragment (for fragment instances)
	  if (isTemplate(el)) {
	    el = parseTemplate(el);
	  }
	  if (options) {
	    if (options._asComponent && !options.template) {
	      options.template = '<slot></slot>';
	    }
	    if (options.template) {
	      options._content = extractContent(el);
	      el = transcludeTemplate(el, options);
	    }
	  }
	  if (el instanceof DocumentFragment) {
	    // anchors for fragment instance
	    // passing in `persist: true` to avoid them being
	    // discarded by IE during template cloning
	    prepend(createAnchor('v-start', true), el);
	    el.appendChild(createAnchor('v-end', true));
	  }
	  return el;
	}

	/**
	 * Process the template option.
	 * If the replace option is true this will swap the $el.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Element|DocumentFragment}
	 */

	function transcludeTemplate(el, options) {
	  var template = options.template;
	  var frag = parseTemplate(template, true);
	  if (frag) {
	    var replacer = frag.firstChild;
	    var tag = replacer.tagName && replacer.tagName.toLowerCase();
	    if (options.replace) {
	      /* istanbul ignore if */
	      if (el === document.body) {
	        process.env.NODE_ENV !== 'production' && warn('You are mounting an instance with a template to ' + '<body>. This will replace <body> entirely. You ' + 'should probably use `replace: false` here.');
	      }
	      // there are many cases where the instance must
	      // become a fragment instance: basically anything that
	      // can create more than 1 root nodes.
	      if (
	      // multi-children template
	      frag.childNodes.length > 1 ||
	      // non-element template
	      replacer.nodeType !== 1 ||
	      // single nested component
	      tag === 'component' || resolveAsset(options, 'components', tag) || replacer.hasAttribute('is') || replacer.hasAttribute(':is') || replacer.hasAttribute('v-bind:is') ||
	      // element directive
	      resolveAsset(options, 'elementDirectives', tag) ||
	      // for block
	      replacer.hasAttribute('v-for') ||
	      // if block
	      replacer.hasAttribute('v-if')) {
	        return frag;
	      } else {
	        options._replacerAttrs = extractAttrs(replacer);
	        mergeAttrs(el, replacer);
	        return replacer;
	      }
	    } else {
	      el.appendChild(frag);
	      return el;
	    }
	  } else {
	    process.env.NODE_ENV !== 'production' && warn('Invalid template option: ' + template);
	  }
	}

	/**
	 * Helper to extract a component container's attributes
	 * into a plain object array.
	 *
	 * @param {Element} el
	 * @return {Array}
	 */

	function extractAttrs(el) {
	  if (el.nodeType === 1 && el.hasAttributes()) {
	    return toArray(el.attributes);
	  }
	}

	/**
	 * Merge the attributes of two elements, and make sure
	 * the class names are merged properly.
	 *
	 * @param {Element} from
	 * @param {Element} to
	 */

	function mergeAttrs(from, to) {
	  var attrs = from.attributes;
	  var i = attrs.length;
	  var name, value;
	  while (i--) {
	    name = attrs[i].name;
	    value = attrs[i].value;
	    if (!to.hasAttribute(name) && !specialCharRE.test(name)) {
	      to.setAttribute(name, value);
	    } else if (name === 'class') {
	      value.split(/\s+/).forEach(function (cls) {
	        addClass(to, cls);
	      });
	    }
	  }
	}

	var compiler = Object.freeze({
		compile: compile,
		compileAndLinkProps: compileAndLinkProps,
		compileRoot: compileRoot,
		transclude: transclude
	});

	function stateMixin (Vue) {

	  /**
	   * Accessor for `$data` property, since setting $data
	   * requires observing the new object and updating
	   * proxied properties.
	   */

	  Object.defineProperty(Vue.prototype, '$data', {
	    get: function get() {
	      return this._data;
	    },
	    set: function set(newData) {
	      if (newData !== this._data) {
	        this._setData(newData);
	      }
	    }
	  });

	  /**
	   * Setup the scope of an instance, which contains:
	   * - observed data
	   * - computed properties
	   * - user methods
	   * - meta properties
	   */

	  Vue.prototype._initState = function () {
	    this._initProps();
	    this._initMeta();
	    this._initMethods();
	    this._initData();
	    this._initComputed();
	  };

	  /**
	   * Initialize props.
	   */

	  Vue.prototype._initProps = function () {
	    var options = this.$options;
	    var el = options.el;
	    var props = options.props;
	    if (props && !el) {
	      process.env.NODE_ENV !== 'production' && warn('Props will not be compiled if no `el` option is ' + 'provided at instantiation.');
	    }
	    // make sure to convert string selectors into element now
	    el = options.el = query(el);
	    this._propsUnlinkFn = el && el.nodeType === 1 && props
	    // props must be linked in proper scope if inside v-for
	    ? compileAndLinkProps(this, el, props, this._scope) : null;
	  };

	  /**
	   * Initialize the data.
	   */

	  Vue.prototype._initData = function () {
	    var propsData = this._data;
	    var optionsDataFn = this.$options.data;
	    var optionsData = optionsDataFn && optionsDataFn();
	    if (optionsData) {
	      this._data = optionsData;
	      for (var prop in propsData) {
	        if (process.env.NODE_ENV !== 'production' && hasOwn(optionsData, prop)) {
	          warn('Data field "' + prop + '" is already defined ' + 'as a prop. Use prop default value instead.');
	        }
	        if (this._props[prop].raw !== null || !hasOwn(optionsData, prop)) {
	          set(optionsData, prop, propsData[prop]);
	        }
	      }
	    }
	    var data = this._data;
	    // proxy data on instance
	    var keys = Object.keys(data);
	    var i, key;
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      this._proxy(key);
	    }
	    // observe data
	    observe(data, this);
	  };

	  /**
	   * Swap the instance's $data. Called in $data's setter.
	   *
	   * @param {Object} newData
	   */

	  Vue.prototype._setData = function (newData) {
	    newData = newData || {};
	    var oldData = this._data;
	    this._data = newData;
	    var keys, key, i;
	    // unproxy keys not present in new data
	    keys = Object.keys(oldData);
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      if (!(key in newData)) {
	        this._unproxy(key);
	      }
	    }
	    // proxy keys not already proxied,
	    // and trigger change for changed values
	    keys = Object.keys(newData);
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      if (!hasOwn(this, key)) {
	        // new property
	        this._proxy(key);
	      }
	    }
	    oldData.__ob__.removeVm(this);
	    observe(newData, this);
	    this._digest();
	  };

	  /**
	   * Proxy a property, so that
	   * vm.prop === vm._data.prop
	   *
	   * @param {String} key
	   */

	  Vue.prototype._proxy = function (key) {
	    if (!isReserved(key)) {
	      // need to store ref to self here
	      // because these getter/setters might
	      // be called by child scopes via
	      // prototype inheritance.
	      var self = this;
	      Object.defineProperty(self, key, {
	        configurable: true,
	        enumerable: true,
	        get: function proxyGetter() {
	          return self._data[key];
	        },
	        set: function proxySetter(val) {
	          self._data[key] = val;
	        }
	      });
	    }
	  };

	  /**
	   * Unproxy a property.
	   *
	   * @param {String} key
	   */

	  Vue.prototype._unproxy = function (key) {
	    if (!isReserved(key)) {
	      delete this[key];
	    }
	  };

	  /**
	   * Force update on every watcher in scope.
	   */

	  Vue.prototype._digest = function () {
	    for (var i = 0, l = this._watchers.length; i < l; i++) {
	      this._watchers[i].update(true); // shallow updates
	    }
	  };

	  /**
	   * Setup computed properties. They are essentially
	   * special getter/setters
	   */

	  function noop() {}
	  Vue.prototype._initComputed = function () {
	    var computed = this.$options.computed;
	    if (computed) {
	      for (var key in computed) {
	        var userDef = computed[key];
	        var def = {
	          enumerable: true,
	          configurable: true
	        };
	        if (typeof userDef === 'function') {
	          def.get = makeComputedGetter(userDef, this);
	          def.set = noop;
	        } else {
	          def.get = userDef.get ? userDef.cache !== false ? makeComputedGetter(userDef.get, this) : bind$1(userDef.get, this) : noop;
	          def.set = userDef.set ? bind$1(userDef.set, this) : noop;
	        }
	        Object.defineProperty(this, key, def);
	      }
	    }
	  };

	  function makeComputedGetter(getter, owner) {
	    var watcher = new Watcher(owner, getter, null, {
	      lazy: true
	    });
	    return function computedGetter() {
	      if (watcher.dirty) {
	        watcher.evaluate();
	      }
	      if (Dep.target) {
	        watcher.depend();
	      }
	      return watcher.value;
	    };
	  }

	  /**
	   * Setup instance methods. Methods must be bound to the
	   * instance since they might be passed down as a prop to
	   * child components.
	   */

	  Vue.prototype._initMethods = function () {
	    var methods = this.$options.methods;
	    if (methods) {
	      for (var key in methods) {
	        this[key] = bind$1(methods[key], this);
	      }
	    }
	  };

	  /**
	   * Initialize meta information like $index, $key & $value.
	   */

	  Vue.prototype._initMeta = function () {
	    var metas = this.$options._meta;
	    if (metas) {
	      for (var key in metas) {
	        defineReactive(this, key, metas[key]);
	      }
	    }
	  };
	}

	var eventRE = /^v-on:|^@/;

	function eventsMixin (Vue) {

	  /**
	   * Setup the instance's option events & watchers.
	   * If the value is a string, we pull it from the
	   * instance's methods by name.
	   */

	  Vue.prototype._initEvents = function () {
	    var options = this.$options;
	    if (options._asComponent) {
	      registerComponentEvents(this, options.el);
	    }
	    registerCallbacks(this, '$on', options.events);
	    registerCallbacks(this, '$watch', options.watch);
	  };

	  /**
	   * Register v-on events on a child component
	   *
	   * @param {Vue} vm
	   * @param {Element} el
	   */

	  function registerComponentEvents(vm, el) {
	    var attrs = el.attributes;
	    var name, handler;
	    for (var i = 0, l = attrs.length; i < l; i++) {
	      name = attrs[i].name;
	      if (eventRE.test(name)) {
	        name = name.replace(eventRE, '');
	        handler = (vm._scope || vm._context).$eval(attrs[i].value, true);
	        vm.$on(name.replace(eventRE), handler);
	      }
	    }
	  }

	  /**
	   * Register callbacks for option events and watchers.
	   *
	   * @param {Vue} vm
	   * @param {String} action
	   * @param {Object} hash
	   */

	  function registerCallbacks(vm, action, hash) {
	    if (!hash) return;
	    var handlers, key, i, j;
	    for (key in hash) {
	      handlers = hash[key];
	      if (isArray(handlers)) {
	        for (i = 0, j = handlers.length; i < j; i++) {
	          register(vm, action, key, handlers[i]);
	        }
	      } else {
	        register(vm, action, key, handlers);
	      }
	    }
	  }

	  /**
	   * Helper to register an event/watch callback.
	   *
	   * @param {Vue} vm
	   * @param {String} action
	   * @param {String} key
	   * @param {Function|String|Object} handler
	   * @param {Object} [options]
	   */

	  function register(vm, action, key, handler, options) {
	    var type = typeof handler;
	    if (type === 'function') {
	      vm[action](key, handler, options);
	    } else if (type === 'string') {
	      var methods = vm.$options.methods;
	      var method = methods && methods[handler];
	      if (method) {
	        vm[action](key, method, options);
	      } else {
	        process.env.NODE_ENV !== 'production' && warn('Unknown method: "' + handler + '" when ' + 'registering callback for ' + action + ': "' + key + '".');
	      }
	    } else if (handler && type === 'object') {
	      register(vm, action, key, handler.handler, handler);
	    }
	  }

	  /**
	   * Setup recursive attached/detached calls
	   */

	  Vue.prototype._initDOMHooks = function () {
	    this.$on('hook:attached', onAttached);
	    this.$on('hook:detached', onDetached);
	  };

	  /**
	   * Callback to recursively call attached hook on children
	   */

	  function onAttached() {
	    if (!this._isAttached) {
	      this._isAttached = true;
	      this.$children.forEach(callAttach);
	    }
	  }

	  /**
	   * Iterator to call attached hook
	   *
	   * @param {Vue} child
	   */

	  function callAttach(child) {
	    if (!child._isAttached && inDoc(child.$el)) {
	      child._callHook('attached');
	    }
	  }

	  /**
	   * Callback to recursively call detached hook on children
	   */

	  function onDetached() {
	    if (this._isAttached) {
	      this._isAttached = false;
	      this.$children.forEach(callDetach);
	    }
	  }

	  /**
	   * Iterator to call detached hook
	   *
	   * @param {Vue} child
	   */

	  function callDetach(child) {
	    if (child._isAttached && !inDoc(child.$el)) {
	      child._callHook('detached');
	    }
	  }

	  /**
	   * Trigger all handlers for a hook
	   *
	   * @param {String} hook
	   */

	  Vue.prototype._callHook = function (hook) {
	    var handlers = this.$options[hook];
	    if (handlers) {
	      for (var i = 0, j = handlers.length; i < j; i++) {
	        handlers[i].call(this);
	      }
	    }
	    this.$emit('hook:' + hook);
	  };
	}

	function noop() {}

	/**
	 * A directive links a DOM element with a piece of data,
	 * which is the result of evaluating an expression.
	 * It registers a watcher with the expression and calls
	 * the DOM update function when a change is triggered.
	 *
	 * @param {String} name
	 * @param {Node} el
	 * @param {Vue} vm
	 * @param {Object} descriptor
	 *                 - {String} name
	 *                 - {Object} def
	 *                 - {String} expression
	 *                 - {Array<Object>} [filters]
	 *                 - {Boolean} literal
	 *                 - {String} attr
	 *                 - {String} raw
	 * @param {Object} def - directive definition object
	 * @param {Vue} [host] - transclusion host component
	 * @param {Object} [scope] - v-for scope
	 * @param {Fragment} [frag] - owner fragment
	 * @constructor
	 */
	function Directive(descriptor, vm, el, host, scope, frag) {
	  this.vm = vm;
	  this.el = el;
	  // copy descriptor properties
	  this.descriptor = descriptor;
	  this.name = descriptor.name;
	  this.expression = descriptor.expression;
	  this.arg = descriptor.arg;
	  this.modifiers = descriptor.modifiers;
	  this.filters = descriptor.filters;
	  this.literal = this.modifiers && this.modifiers.literal;
	  // private
	  this._locked = false;
	  this._bound = false;
	  this._listeners = null;
	  // link context
	  this._host = host;
	  this._scope = scope;
	  this._frag = frag;
	  // store directives on node in dev mode
	  if (process.env.NODE_ENV !== 'production' && this.el) {
	    this.el._vue_directives = this.el._vue_directives || [];
	    this.el._vue_directives.push(this);
	  }
	}

	/**
	 * Initialize the directive, mixin definition properties,
	 * setup the watcher, call definition bind() and update()
	 * if present.
	 *
	 * @param {Object} def
	 */

	Directive.prototype._bind = function () {
	  var name = this.name;
	  var descriptor = this.descriptor;

	  // remove attribute
	  if ((name !== 'cloak' || this.vm._isCompiled) && this.el && this.el.removeAttribute) {
	    var attr = descriptor.attr || 'v-' + name;
	    this.el.removeAttribute(attr);
	  }

	  // copy def properties
	  var def = descriptor.def;
	  if (typeof def === 'function') {
	    this.update = def;
	  } else {
	    extend(this, def);
	  }

	  // setup directive params
	  this._setupParams();

	  // initial bind
	  if (this.bind) {
	    this.bind();
	  }

	  if (this.literal) {
	    this.update && this.update(descriptor.raw);
	  } else if ((this.expression || this.modifiers) && (this.update || this.twoWay) && !this._checkStatement()) {
	    // wrapped updater for context
	    var dir = this;
	    if (this.update) {
	      this._update = function (val, oldVal) {
	        if (!dir._locked) {
	          dir.update(val, oldVal);
	        }
	      };
	    } else {
	      this._update = noop;
	    }
	    var preProcess = this._preProcess ? bind$1(this._preProcess, this) : null;
	    var postProcess = this._postProcess ? bind$1(this._postProcess, this) : null;
	    var watcher = this._watcher = new Watcher(this.vm, this.expression, this._update, // callback
	    {
	      filters: this.filters,
	      twoWay: this.twoWay,
	      deep: this.deep,
	      preProcess: preProcess,
	      postProcess: postProcess,
	      scope: this._scope
	    });
	    // v-model with inital inline value need to sync back to
	    // model instead of update to DOM on init. They would
	    // set the afterBind hook to indicate that.
	    if (this.afterBind) {
	      this.afterBind();
	    } else if (this.update) {
	      this.update(watcher.value);
	    }
	  }
	  this._bound = true;
	};

	/**
	 * Setup all param attributes, e.g. track-by,
	 * transition-mode, etc...
	 */

	Directive.prototype._setupParams = function () {
	  if (!this.params) {
	    return;
	  }
	  var params = this.params;
	  // swap the params array with a fresh object.
	  this.params = Object.create(null);
	  var i = params.length;
	  var key, val, mappedKey;
	  while (i--) {
	    key = params[i];
	    mappedKey = camelize(key);
	    val = getBindAttr(this.el, key);
	    if (val != null) {
	      // dynamic
	      this._setupParamWatcher(mappedKey, val);
	    } else {
	      // static
	      val = getAttr(this.el, key);
	      if (val != null) {
	        this.params[mappedKey] = val === '' ? true : val;
	      }
	    }
	  }
	};

	/**
	 * Setup a watcher for a dynamic param.
	 *
	 * @param {String} key
	 * @param {String} expression
	 */

	Directive.prototype._setupParamWatcher = function (key, expression) {
	  var self = this;
	  var called = false;
	  var unwatch = (this._scope || this.vm).$watch(expression, function (val, oldVal) {
	    self.params[key] = val;
	    // since we are in immediate mode,
	    // only call the param change callbacks if this is not the first update.
	    if (called) {
	      var cb = self.paramWatchers && self.paramWatchers[key];
	      if (cb) {
	        cb.call(self, val, oldVal);
	      }
	    } else {
	      called = true;
	    }
	  }, {
	    immediate: true
	  });(this._paramUnwatchFns || (this._paramUnwatchFns = [])).push(unwatch);
	};

	/**
	 * Check if the directive is a function caller
	 * and if the expression is a callable one. If both true,
	 * we wrap up the expression and use it as the event
	 * handler.
	 *
	 * e.g. on-click="a++"
	 *
	 * @return {Boolean}
	 */

	Directive.prototype._checkStatement = function () {
	  var expression = this.expression;
	  if (expression && this.acceptStatement && !isSimplePath(expression)) {
	    var fn = parseExpression(expression).get;
	    var scope = this._scope || this.vm;
	    var handler = function handler(e) {
	      scope.$event = e;
	      fn.call(scope, scope);
	      scope.$event = null;
	    };
	    if (this.filters) {
	      handler = scope._applyFilters(handler, null, this.filters);
	    }
	    this.update(handler);
	    return true;
	  }
	};

	/**
	 * Set the corresponding value with the setter.
	 * This should only be used in two-way directives
	 * e.g. v-model.
	 *
	 * @param {*} value
	 * @public
	 */

	Directive.prototype.set = function (value) {
	  /* istanbul ignore else */
	  if (this.twoWay) {
	    this._withLock(function () {
	      this._watcher.set(value);
	    });
	  } else if (process.env.NODE_ENV !== 'production') {
	    warn('Directive.set() can only be used inside twoWay' + 'directives.');
	  }
	};

	/**
	 * Execute a function while preventing that function from
	 * triggering updates on this directive instance.
	 *
	 * @param {Function} fn
	 */

	Directive.prototype._withLock = function (fn) {
	  var self = this;
	  self._locked = true;
	  fn.call(self);
	  nextTick(function () {
	    self._locked = false;
	  });
	};

	/**
	 * Convenience method that attaches a DOM event listener
	 * to the directive element and autometically tears it down
	 * during unbind.
	 *
	 * @param {String} event
	 * @param {Function} handler
	 */

	Directive.prototype.on = function (event, handler) {
	  on$1(this.el, event, handler);(this._listeners || (this._listeners = [])).push([event, handler]);
	};

	/**
	 * Teardown the watcher and call unbind.
	 */

	Directive.prototype._teardown = function () {
	  if (this._bound) {
	    this._bound = false;
	    if (this.unbind) {
	      this.unbind();
	    }
	    if (this._watcher) {
	      this._watcher.teardown();
	    }
	    var listeners = this._listeners;
	    var i;
	    if (listeners) {
	      i = listeners.length;
	      while (i--) {
	        off(this.el, listeners[i][0], listeners[i][1]);
	      }
	    }
	    var unwatchFns = this._paramUnwatchFns;
	    if (unwatchFns) {
	      i = unwatchFns.length;
	      while (i--) {
	        unwatchFns[i]();
	      }
	    }
	    if (process.env.NODE_ENV !== 'production' && this.el) {
	      this.el._vue_directives.$remove(this);
	    }
	    this.vm = this.el = this._watcher = this._listeners = null;
	  }
	};

	function lifecycleMixin (Vue) {

	  /**
	   * Update v-ref for component.
	   *
	   * @param {Boolean} remove
	   */

	  Vue.prototype._updateRef = function (remove) {
	    var ref = this.$options._ref;
	    if (ref) {
	      var refs = (this._scope || this._context).$refs;
	      if (remove) {
	        if (refs[ref] === this) {
	          refs[ref] = null;
	        }
	      } else {
	        refs[ref] = this;
	      }
	    }
	  };

	  /**
	   * Transclude, compile and link element.
	   *
	   * If a pre-compiled linker is available, that means the
	   * passed in element will be pre-transcluded and compiled
	   * as well - all we need to do is to call the linker.
	   *
	   * Otherwise we need to call transclude/compile/link here.
	   *
	   * @param {Element} el
	   * @return {Element}
	   */

	  Vue.prototype._compile = function (el) {
	    var options = this.$options;

	    // transclude and init element
	    // transclude can potentially replace original
	    // so we need to keep reference; this step also injects
	    // the template and caches the original attributes
	    // on the container node and replacer node.
	    var original = el;
	    el = transclude(el, options);
	    this._initElement(el);

	    // root is always compiled per-instance, because
	    // container attrs and props can be different every time.
	    var contextOptions = this._context && this._context.$options;
	    var rootLinker = compileRoot(el, options, contextOptions);

	    // compile and link the rest
	    var contentLinkFn;
	    var ctor = this.constructor;
	    // component compilation can be cached
	    // as long as it's not using inline-template
	    if (options._linkerCachable) {
	      contentLinkFn = ctor.linker;
	      if (!contentLinkFn) {
	        contentLinkFn = ctor.linker = compile(el, options);
	      }
	    }

	    // link phase
	    // make sure to link root with prop scope!
	    var rootUnlinkFn = rootLinker(this, el, this._scope);
	    var contentUnlinkFn = contentLinkFn ? contentLinkFn(this, el) : compile(el, options)(this, el);

	    // register composite unlink function
	    // to be called during instance destruction
	    this._unlinkFn = function () {
	      rootUnlinkFn();
	      // passing destroying: true to avoid searching and
	      // splicing the directives
	      contentUnlinkFn(true);
	    };

	    // finally replace original
	    if (options.replace) {
	      replace(original, el);
	    }

	    this._isCompiled = true;
	    this._callHook('compiled');
	    return el;
	  };

	  /**
	   * Initialize instance element. Called in the public
	   * $mount() method.
	   *
	   * @param {Element} el
	   */

	  Vue.prototype._initElement = function (el) {
	    if (el instanceof DocumentFragment) {
	      this._isFragment = true;
	      this.$el = this._fragmentStart = el.firstChild;
	      this._fragmentEnd = el.lastChild;
	      // set persisted text anchors to empty
	      if (this._fragmentStart.nodeType === 3) {
	        this._fragmentStart.data = this._fragmentEnd.data = '';
	      }
	      this._fragment = el;
	    } else {
	      this.$el = el;
	    }
	    this.$el.__vue__ = this;
	    this._callHook('beforeCompile');
	  };

	  /**
	   * Create and bind a directive to an element.
	   *
	   * @param {String} name - directive name
	   * @param {Node} node   - target node
	   * @param {Object} desc - parsed directive descriptor
	   * @param {Object} def  - directive definition object
	   * @param {Vue} [host] - transclusion host component
	   * @param {Object} [scope] - v-for scope
	   * @param {Fragment} [frag] - owner fragment
	   */

	  Vue.prototype._bindDir = function (descriptor, node, host, scope, frag) {
	    this._directives.push(new Directive(descriptor, this, node, host, scope, frag));
	  };

	  /**
	   * Teardown an instance, unobserves the data, unbind all the
	   * directives, turn off all the event listeners, etc.
	   *
	   * @param {Boolean} remove - whether to remove the DOM node.
	   * @param {Boolean} deferCleanup - if true, defer cleanup to
	   *                                 be called later
	   */

	  Vue.prototype._destroy = function (remove, deferCleanup) {
	    if (this._isBeingDestroyed) {
	      if (!deferCleanup) {
	        this._cleanup();
	      }
	      return;
	    }
	    this._callHook('beforeDestroy');
	    this._isBeingDestroyed = true;
	    var i;
	    // remove self from parent. only necessary
	    // if parent is not being destroyed as well.
	    var parent = this.$parent;
	    if (parent && !parent._isBeingDestroyed) {
	      parent.$children.$remove(this);
	      // unregister ref (remove: true)
	      this._updateRef(true);
	    }
	    // destroy all children.
	    i = this.$children.length;
	    while (i--) {
	      this.$children[i].$destroy();
	    }
	    // teardown props
	    if (this._propsUnlinkFn) {
	      this._propsUnlinkFn();
	    }
	    // teardown all directives. this also tearsdown all
	    // directive-owned watchers.
	    if (this._unlinkFn) {
	      this._unlinkFn();
	    }
	    i = this._watchers.length;
	    while (i--) {
	      this._watchers[i].teardown();
	    }
	    // remove reference to self on $el
	    if (this.$el) {
	      this.$el.__vue__ = null;
	    }
	    // remove DOM element
	    var self = this;
	    if (remove && this.$el) {
	      this.$remove(function () {
	        self._cleanup();
	      });
	    } else if (!deferCleanup) {
	      this._cleanup();
	    }
	  };

	  /**
	   * Clean up to ensure garbage collection.
	   * This is called after the leave transition if there
	   * is any.
	   */

	  Vue.prototype._cleanup = function () {
	    if (this._isDestroyed) {
	      return;
	    }
	    // remove self from owner fragment
	    // do it in cleanup so that we can call $destroy with
	    // defer right when a fragment is about to be removed.
	    if (this._frag) {
	      this._frag.children.$remove(this);
	    }
	    // remove reference from data ob
	    // frozen object may not have observer.
	    if (this._data.__ob__) {
	      this._data.__ob__.removeVm(this);
	    }
	    // Clean up references to private properties and other
	    // instances. preserve reference to _data so that proxy
	    // accessors still work. The only potential side effect
	    // here is that mutating the instance after it's destroyed
	    // may affect the state of other components that are still
	    // observing the same object, but that seems to be a
	    // reasonable responsibility for the user rather than
	    // always throwing an error on them.
	    this.$el = this.$parent = this.$root = this.$children = this._watchers = this._context = this._scope = this._directives = null;
	    // call the last hook...
	    this._isDestroyed = true;
	    this._callHook('destroyed');
	    // turn off all instance listeners.
	    this.$off();
	  };
	}

	function miscMixin (Vue) {

	  /**
	   * Apply a list of filter (descriptors) to a value.
	   * Using plain for loops here because this will be called in
	   * the getter of any watcher with filters so it is very
	   * performance sensitive.
	   *
	   * @param {*} value
	   * @param {*} [oldValue]
	   * @param {Array} filters
	   * @param {Boolean} write
	   * @return {*}
	   */

	  Vue.prototype._applyFilters = function (value, oldValue, filters, write) {
	    var filter, fn, args, arg, offset, i, l, j, k;
	    for (i = 0, l = filters.length; i < l; i++) {
	      filter = filters[i];
	      fn = resolveAsset(this.$options, 'filters', filter.name);
	      if (process.env.NODE_ENV !== 'production') {
	        assertAsset(fn, 'filter', filter.name);
	      }
	      if (!fn) continue;
	      fn = write ? fn.write : fn.read || fn;
	      if (typeof fn !== 'function') continue;
	      args = write ? [value, oldValue] : [value];
	      offset = write ? 2 : 1;
	      if (filter.args) {
	        for (j = 0, k = filter.args.length; j < k; j++) {
	          arg = filter.args[j];
	          args[j + offset] = arg.dynamic ? this.$get(arg.value) : arg.value;
	        }
	      }
	      value = fn.apply(this, args);
	    }
	    return value;
	  };

	  /**
	   * Resolve a component, depending on whether the component
	   * is defined normally or using an async factory function.
	   * Resolves synchronously if already resolved, otherwise
	   * resolves asynchronously and caches the resolved
	   * constructor on the factory.
	   *
	   * @param {String} id
	   * @param {Function} cb
	   */

	  Vue.prototype._resolveComponent = function (id, cb) {
	    var factory = resolveAsset(this.$options, 'components', id);
	    if (process.env.NODE_ENV !== 'production') {
	      assertAsset(factory, 'component', id);
	    }
	    if (!factory) {
	      return;
	    }
	    // async component factory
	    if (!factory.options) {
	      if (factory.resolved) {
	        // cached
	        cb(factory.resolved);
	      } else if (factory.requested) {
	        // pool callbacks
	        factory.pendingCallbacks.push(cb);
	      } else {
	        factory.requested = true;
	        var cbs = factory.pendingCallbacks = [cb];
	        factory(function resolve(res) {
	          if (isPlainObject(res)) {
	            res = Vue.extend(res);
	          }
	          // cache resolved
	          factory.resolved = res;
	          // invoke callbacks
	          for (var i = 0, l = cbs.length; i < l; i++) {
	            cbs[i](res);
	          }
	        }, function reject(reason) {
	          process.env.NODE_ENV !== 'production' && warn('Failed to resolve async component: ' + id + '. ' + (reason ? '\nReason: ' + reason : ''));
	        });
	      }
	    } else {
	      // normal component
	      cb(factory);
	    }
	  };
	}

	function globalAPI (Vue) {

	  /**
	   * Expose useful internals
	   */

	  Vue.util = util;
	  Vue.config = config;
	  Vue.set = set;
	  Vue['delete'] = del;
	  Vue.nextTick = nextTick;

	  /**
	   * The following are exposed for advanced usage / plugins
	   */

	  Vue.compiler = compiler;
	  Vue.FragmentFactory = FragmentFactory;
	  Vue.internalDirectives = internalDirectives;
	  Vue.parsers = {
	    path: path,
	    text: text$1,
	    template: template,
	    directive: directive,
	    expression: expression
	  };

	  /**
	   * Each instance constructor, including Vue, has a unique
	   * cid. This enables us to create wrapped "child
	   * constructors" for prototypal inheritance and cache them.
	   */

	  Vue.cid = 0;
	  var cid = 1;

	  /**
	   * Class inheritance
	   *
	   * @param {Object} extendOptions
	   */

	  Vue.extend = function (extendOptions) {
	    extendOptions = extendOptions || {};
	    var Super = this;
	    var isFirstExtend = Super.cid === 0;
	    if (isFirstExtend && extendOptions._Ctor) {
	      return extendOptions._Ctor;
	    }
	    var name = extendOptions.name || Super.options.name;
	    var Sub = createClass(name || 'VueComponent');
	    Sub.prototype = Object.create(Super.prototype);
	    Sub.prototype.constructor = Sub;
	    Sub.cid = cid++;
	    Sub.options = mergeOptions(Super.options, extendOptions);
	    Sub['super'] = Super;
	    // allow further extension
	    Sub.extend = Super.extend;
	    // create asset registers, so extended classes
	    // can have their private assets too.
	    config._assetTypes.forEach(function (type) {
	      Sub[type] = Super[type];
	    });
	    // enable recursive self-lookup
	    if (name) {
	      Sub.options.components[name] = Sub;
	    }
	    // cache constructor
	    if (isFirstExtend) {
	      extendOptions._Ctor = Sub;
	    }
	    return Sub;
	  };

	  /**
	   * A function that returns a sub-class constructor with the
	   * given name. This gives us much nicer output when
	   * logging instances in the console.
	   *
	   * @param {String} name
	   * @return {Function}
	   */

	  function createClass(name) {
	    return new Function('return function ' + classify(name) + ' (options) { this._init(options) }')();
	  }

	  /**
	   * Plugin system
	   *
	   * @param {Object} plugin
	   */

	  Vue.use = function (plugin) {
	    /* istanbul ignore if */
	    if (plugin.installed) {
	      return;
	    }
	    // additional parameters
	    var args = toArray(arguments, 1);
	    args.unshift(this);
	    if (typeof plugin.install === 'function') {
	      plugin.install.apply(plugin, args);
	    } else {
	      plugin.apply(null, args);
	    }
	    plugin.installed = true;
	    return this;
	  };

	  /**
	   * Apply a global mixin by merging it into the default
	   * options.
	   */

	  Vue.mixin = function (mixin) {
	    Vue.options = mergeOptions(Vue.options, mixin);
	  };

	  /**
	   * Create asset registration methods with the following
	   * signature:
	   *
	   * @param {String} id
	   * @param {*} definition
	   */

	  config._assetTypes.forEach(function (type) {
	    Vue[type] = function (id, definition) {
	      if (!definition) {
	        return this.options[type + 's'][id];
	      } else {
	        /* istanbul ignore if */
	        if (process.env.NODE_ENV !== 'production') {
	          if (type === 'component' && commonTagRE.test(id)) {
	            warn('Do not use built-in HTML elements as component ' + 'id: ' + id);
	          }
	        }
	        if (type === 'component' && isPlainObject(definition)) {
	          definition.name = id;
	          definition = Vue.extend(definition);
	        }
	        this.options[type + 's'][id] = definition;
	        return definition;
	      }
	    };
	  });
	}

	var filterRE = /[^|]\|[^|]/;

	function dataAPI (Vue) {

	  /**
	   * Get the value from an expression on this vm.
	   *
	   * @param {String} exp
	   * @param {Boolean} [asStatement]
	   * @return {*}
	   */

	  Vue.prototype.$get = function (exp, asStatement) {
	    var res = parseExpression(exp);
	    if (res) {
	      if (asStatement && !isSimplePath(exp)) {
	        var self = this;
	        return function statementHandler() {
	          res.get.call(self, self);
	        };
	      } else {
	        try {
	          return res.get.call(this, this);
	        } catch (e) {}
	      }
	    }
	  };

	  /**
	   * Set the value from an expression on this vm.
	   * The expression must be a valid left-hand
	   * expression in an assignment.
	   *
	   * @param {String} exp
	   * @param {*} val
	   */

	  Vue.prototype.$set = function (exp, val) {
	    var res = parseExpression(exp, true);
	    if (res && res.set) {
	      res.set.call(this, this, val);
	    }
	  };

	  /**
	   * Delete a property on the VM
	   *
	   * @param {String} key
	   */

	  Vue.prototype.$delete = function (key) {
	    del(this._data, key);
	  };

	  /**
	   * Watch an expression, trigger callback when its
	   * value changes.
	   *
	   * @param {String|Function} expOrFn
	   * @param {Function} cb
	   * @param {Object} [options]
	   *                 - {Boolean} deep
	   *                 - {Boolean} immediate
	   * @return {Function} - unwatchFn
	   */

	  Vue.prototype.$watch = function (expOrFn, cb, options) {
	    var vm = this;
	    var parsed;
	    if (typeof expOrFn === 'string') {
	      parsed = parseDirective(expOrFn);
	      expOrFn = parsed.expression;
	    }
	    var watcher = new Watcher(vm, expOrFn, cb, {
	      deep: options && options.deep,
	      filters: parsed && parsed.filters
	    });
	    if (options && options.immediate) {
	      cb.call(vm, watcher.value);
	    }
	    return function unwatchFn() {
	      watcher.teardown();
	    };
	  };

	  /**
	   * Evaluate a text directive, including filters.
	   *
	   * @param {String} text
	   * @param {Boolean} [asStatement]
	   * @return {String}
	   */

	  Vue.prototype.$eval = function (text, asStatement) {
	    // check for filters.
	    if (filterRE.test(text)) {
	      var dir = parseDirective(text);
	      // the filter regex check might give false positive
	      // for pipes inside strings, so it's possible that
	      // we don't get any filters here
	      var val = this.$get(dir.expression, asStatement);
	      return dir.filters ? this._applyFilters(val, null, dir.filters) : val;
	    } else {
	      // no filter
	      return this.$get(text, asStatement);
	    }
	  };

	  /**
	   * Interpolate a piece of template text.
	   *
	   * @param {String} text
	   * @return {String}
	   */

	  Vue.prototype.$interpolate = function (text) {
	    var tokens = parseText(text);
	    var vm = this;
	    if (tokens) {
	      if (tokens.length === 1) {
	        return vm.$eval(tokens[0].value) + '';
	      } else {
	        return tokens.map(function (token) {
	          return token.tag ? vm.$eval(token.value) : token.value;
	        }).join('');
	      }
	    } else {
	      return text;
	    }
	  };

	  /**
	   * Log instance data as a plain JS object
	   * so that it is easier to inspect in console.
	   * This method assumes console is available.
	   *
	   * @param {String} [path]
	   */

	  Vue.prototype.$log = function (path) {
	    var data = path ? getPath(this._data, path) : this._data;
	    if (data) {
	      data = clean(data);
	    }
	    // include computed fields
	    if (!path) {
	      for (var key in this.$options.computed) {
	        data[key] = clean(this[key]);
	      }
	    }
	    console.log(data);
	  };

	  /**
	   * "clean" a getter/setter converted object into a plain
	   * object copy.
	   *
	   * @param {Object} - obj
	   * @return {Object}
	   */

	  function clean(obj) {
	    return JSON.parse(JSON.stringify(obj));
	  }
	}

	function domAPI (Vue) {

	  /**
	   * Convenience on-instance nextTick. The callback is
	   * auto-bound to the instance, and this avoids component
	   * modules having to rely on the global Vue.
	   *
	   * @param {Function} fn
	   */

	  Vue.prototype.$nextTick = function (fn) {
	    nextTick(fn, this);
	  };

	  /**
	   * Append instance to target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$appendTo = function (target, cb, withTransition) {
	    return insert(this, target, cb, withTransition, append, appendWithTransition);
	  };

	  /**
	   * Prepend instance to target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$prependTo = function (target, cb, withTransition) {
	    target = query(target);
	    if (target.hasChildNodes()) {
	      this.$before(target.firstChild, cb, withTransition);
	    } else {
	      this.$appendTo(target, cb, withTransition);
	    }
	    return this;
	  };

	  /**
	   * Insert instance before target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$before = function (target, cb, withTransition) {
	    return insert(this, target, cb, withTransition, beforeWithCb, beforeWithTransition);
	  };

	  /**
	   * Insert instance after target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$after = function (target, cb, withTransition) {
	    target = query(target);
	    if (target.nextSibling) {
	      this.$before(target.nextSibling, cb, withTransition);
	    } else {
	      this.$appendTo(target.parentNode, cb, withTransition);
	    }
	    return this;
	  };

	  /**
	   * Remove instance from DOM
	   *
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$remove = function (cb, withTransition) {
	    if (!this.$el.parentNode) {
	      return cb && cb();
	    }
	    var inDocument = this._isAttached && inDoc(this.$el);
	    // if we are not in document, no need to check
	    // for transitions
	    if (!inDocument) withTransition = false;
	    var self = this;
	    var realCb = function realCb() {
	      if (inDocument) self._callHook('detached');
	      if (cb) cb();
	    };
	    if (this._isFragment) {
	      removeNodeRange(this._fragmentStart, this._fragmentEnd, this, this._fragment, realCb);
	    } else {
	      var op = withTransition === false ? removeWithCb : removeWithTransition;
	      op(this.$el, this, realCb);
	    }
	    return this;
	  };

	  /**
	   * Shared DOM insertion function.
	   *
	   * @param {Vue} vm
	   * @param {Element} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition]
	   * @param {Function} op1 - op for non-transition insert
	   * @param {Function} op2 - op for transition insert
	   * @return vm
	   */

	  function insert(vm, target, cb, withTransition, op1, op2) {
	    target = query(target);
	    var targetIsDetached = !inDoc(target);
	    var op = withTransition === false || targetIsDetached ? op1 : op2;
	    var shouldCallHook = !targetIsDetached && !vm._isAttached && !inDoc(vm.$el);
	    if (vm._isFragment) {
	      mapNodeRange(vm._fragmentStart, vm._fragmentEnd, function (node) {
	        op(node, target, vm);
	      });
	      cb && cb();
	    } else {
	      op(vm.$el, target, vm, cb);
	    }
	    if (shouldCallHook) {
	      vm._callHook('attached');
	    }
	    return vm;
	  }

	  /**
	   * Check for selectors
	   *
	   * @param {String|Element} el
	   */

	  function query(el) {
	    return typeof el === 'string' ? document.querySelector(el) : el;
	  }

	  /**
	   * Append operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Node} target
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */

	  function append(el, target, vm, cb) {
	    target.appendChild(el);
	    if (cb) cb();
	  }

	  /**
	   * InsertBefore operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Node} target
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */

	  function beforeWithCb(el, target, vm, cb) {
	    before(el, target);
	    if (cb) cb();
	  }

	  /**
	   * Remove operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */

	  function removeWithCb(el, vm, cb) {
	    remove(el);
	    if (cb) cb();
	  }
	}

	function eventsAPI (Vue) {

	  /**
	   * Listen on the given `event` with `fn`.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */

	  Vue.prototype.$on = function (event, fn) {
	    (this._events[event] || (this._events[event] = [])).push(fn);
	    modifyListenerCount(this, event, 1);
	    return this;
	  };

	  /**
	   * Adds an `event` listener that will be invoked a single
	   * time then automatically removed.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */

	  Vue.prototype.$once = function (event, fn) {
	    var self = this;
	    function on() {
	      self.$off(event, on);
	      fn.apply(this, arguments);
	    }
	    on.fn = fn;
	    this.$on(event, on);
	    return this;
	  };

	  /**
	   * Remove the given callback for `event` or all
	   * registered callbacks.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */

	  Vue.prototype.$off = function (event, fn) {
	    var cbs;
	    // all
	    if (!arguments.length) {
	      if (this.$parent) {
	        for (event in this._events) {
	          cbs = this._events[event];
	          if (cbs) {
	            modifyListenerCount(this, event, -cbs.length);
	          }
	        }
	      }
	      this._events = {};
	      return this;
	    }
	    // specific event
	    cbs = this._events[event];
	    if (!cbs) {
	      return this;
	    }
	    if (arguments.length === 1) {
	      modifyListenerCount(this, event, -cbs.length);
	      this._events[event] = null;
	      return this;
	    }
	    // specific handler
	    var cb;
	    var i = cbs.length;
	    while (i--) {
	      cb = cbs[i];
	      if (cb === fn || cb.fn === fn) {
	        modifyListenerCount(this, event, -1);
	        cbs.splice(i, 1);
	        break;
	      }
	    }
	    return this;
	  };

	  /**
	   * Trigger an event on self.
	   *
	   * @param {String} event
	   * @return {Boolean} shouldPropagate
	   */

	  Vue.prototype.$emit = function (event) {
	    var cbs = this._events[event];
	    var shouldPropagate = !cbs;
	    if (cbs) {
	      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
	      var args = toArray(arguments, 1);
	      for (var i = 0, l = cbs.length; i < l; i++) {
	        var res = cbs[i].apply(this, args);
	        if (res === true) {
	          shouldPropagate = true;
	        }
	      }
	    }
	    return shouldPropagate;
	  };

	  /**
	   * Recursively broadcast an event to all children instances.
	   *
	   * @param {String} event
	   * @param {...*} additional arguments
	   */

	  Vue.prototype.$broadcast = function (event) {
	    // if no child has registered for this event,
	    // then there's no need to broadcast.
	    if (!this._eventsCount[event]) return;
	    var children = this.$children;
	    for (var i = 0, l = children.length; i < l; i++) {
	      var child = children[i];
	      var shouldPropagate = child.$emit.apply(child, arguments);
	      if (shouldPropagate) {
	        child.$broadcast.apply(child, arguments);
	      }
	    }
	    return this;
	  };

	  /**
	   * Recursively propagate an event up the parent chain.
	   *
	   * @param {String} event
	   * @param {...*} additional arguments
	   */

	  Vue.prototype.$dispatch = function () {
	    this.$emit.apply(this, arguments);
	    var parent = this.$parent;
	    while (parent) {
	      var shouldPropagate = parent.$emit.apply(parent, arguments);
	      parent = shouldPropagate ? parent.$parent : null;
	    }
	    return this;
	  };

	  /**
	   * Modify the listener counts on all parents.
	   * This bookkeeping allows $broadcast to return early when
	   * no child has listened to a certain event.
	   *
	   * @param {Vue} vm
	   * @param {String} event
	   * @param {Number} count
	   */

	  var hookRE = /^hook:/;
	  function modifyListenerCount(vm, event, count) {
	    var parent = vm.$parent;
	    // hooks do not get broadcasted so no need
	    // to do bookkeeping for them
	    if (!parent || !count || hookRE.test(event)) return;
	    while (parent) {
	      parent._eventsCount[event] = (parent._eventsCount[event] || 0) + count;
	      parent = parent.$parent;
	    }
	  }
	}

	function lifecycleAPI (Vue) {

	  /**
	   * Set instance target element and kick off the compilation
	   * process. The passed in `el` can be a selector string, an
	   * existing Element, or a DocumentFragment (for block
	   * instances).
	   *
	   * @param {Element|DocumentFragment|string} el
	   * @public
	   */

	  Vue.prototype.$mount = function (el) {
	    if (this._isCompiled) {
	      process.env.NODE_ENV !== 'production' && warn('$mount() should be called only once.');
	      return;
	    }
	    el = query(el);
	    if (!el) {
	      el = document.createElement('div');
	    }
	    this._compile(el);
	    this._initDOMHooks();
	    if (inDoc(this.$el)) {
	      this._callHook('attached');
	      ready.call(this);
	    } else {
	      this.$once('hook:attached', ready);
	    }
	    return this;
	  };

	  /**
	   * Mark an instance as ready.
	   */

	  function ready() {
	    this._isAttached = true;
	    this._isReady = true;
	    this._callHook('ready');
	  }

	  /**
	   * Teardown the instance, simply delegate to the internal
	   * _destroy.
	   */

	  Vue.prototype.$destroy = function (remove, deferCleanup) {
	    this._destroy(remove, deferCleanup);
	  };

	  /**
	   * Partially compile a piece of DOM and return a
	   * decompile function.
	   *
	   * @param {Element|DocumentFragment} el
	   * @param {Vue} [host]
	   * @return {Function}
	   */

	  Vue.prototype.$compile = function (el, host, scope, frag) {
	    return compile(el, this.$options, true)(this, el, host, scope, frag);
	  };
	}

	/**
	 * The exposed Vue constructor.
	 *
	 * API conventions:
	 * - public API methods/properties are prefixed with `$`
	 * - internal methods/properties are prefixed with `_`
	 * - non-prefixed properties are assumed to be proxied user
	 *   data.
	 *
	 * @constructor
	 * @param {Object} [options]
	 * @public
	 */

	function Vue(options) {
	  this._init(options);
	}

	// install internals
	initMixin(Vue);
	stateMixin(Vue);
	eventsMixin(Vue);
	lifecycleMixin(Vue);
	miscMixin(Vue);

	// install APIs
	globalAPI(Vue);
	dataAPI(Vue);
	domAPI(Vue);
	eventsAPI(Vue);
	lifecycleAPI(Vue);

	var convertArray = vFor._postProcess;

	/**
	 * Limit filter for arrays
	 *
	 * @param {Number} n
	 * @param {Number} offset (Decimal expected)
	 */

	function limitBy(arr, n, offset) {
	  offset = offset ? parseInt(offset, 10) : 0;
	  return typeof n === 'number' ? arr.slice(offset, offset + n) : arr;
	}

	/**
	 * Filter filter for arrays
	 *
	 * @param {String} search
	 * @param {String} [delimiter]
	 * @param {String} ...dataKeys
	 */

	function filterBy(arr, search, delimiter) {
	  arr = convertArray(arr);
	  if (search == null) {
	    return arr;
	  }
	  if (typeof search === 'function') {
	    return arr.filter(search);
	  }
	  // cast to lowercase string
	  search = ('' + search).toLowerCase();
	  // allow optional `in` delimiter
	  // because why not
	  var n = delimiter === 'in' ? 3 : 2;
	  // extract and flatten keys
	  var keys = toArray(arguments, n).reduce(function (prev, cur) {
	    return prev.concat(cur);
	  }, []);
	  var res = [];
	  var item, key, val, j;
	  for (var i = 0, l = arr.length; i < l; i++) {
	    item = arr[i];
	    val = item && item.$value || item;
	    j = keys.length;
	    if (j) {
	      while (j--) {
	        key = keys[j];
	        if (key === '$key' && contains(item.$key, search) || contains(getPath(val, key), search)) {
	          res.push(item);
	          break;
	        }
	      }
	    } else if (contains(item, search)) {
	      res.push(item);
	    }
	  }
	  return res;
	}

	/**
	 * Filter filter for arrays
	 *
	 * @param {String} sortKey
	 * @param {String} reverse
	 */

	function orderBy(arr, sortKey, reverse) {
	  arr = convertArray(arr);
	  if (!sortKey) {
	    return arr;
	  }
	  var order = reverse && reverse < 0 ? -1 : 1;
	  // sort on a copy to avoid mutating original array
	  return arr.slice().sort(function (a, b) {
	    if (sortKey !== '$key') {
	      if (isObject(a) && '$value' in a) a = a.$value;
	      if (isObject(b) && '$value' in b) b = b.$value;
	    }
	    a = isObject(a) ? getPath(a, sortKey) : a;
	    b = isObject(b) ? getPath(b, sortKey) : b;
	    return a === b ? 0 : a > b ? order : -order;
	  });
	}

	/**
	 * String contain helper
	 *
	 * @param {*} val
	 * @param {String} search
	 */

	function contains(val, search) {
	  var i;
	  if (isPlainObject(val)) {
	    var keys = Object.keys(val);
	    i = keys.length;
	    while (i--) {
	      if (contains(val[keys[i]], search)) {
	        return true;
	      }
	    }
	  } else if (isArray(val)) {
	    i = val.length;
	    while (i--) {
	      if (contains(val[i], search)) {
	        return true;
	      }
	    }
	  } else if (val != null) {
	    return val.toString().toLowerCase().indexOf(search) > -1;
	  }
	}

	var digitsRE = /(\d{3})(?=\d)/g;

	// asset collections must be a plain object.
	var filters = {

	  orderBy: orderBy,
	  filterBy: filterBy,
	  limitBy: limitBy,

	  /**
	   * Stringify value.
	   *
	   * @param {Number} indent
	   */

	  json: {
	    read: function read(value, indent) {
	      return typeof value === 'string' ? value : JSON.stringify(value, null, Number(indent) || 2);
	    },
	    write: function write(value) {
	      try {
	        return JSON.parse(value);
	      } catch (e) {
	        return value;
	      }
	    }
	  },

	  /**
	   * 'abc' => 'Abc'
	   */

	  capitalize: function capitalize(value) {
	    if (!value && value !== 0) return '';
	    value = value.toString();
	    return value.charAt(0).toUpperCase() + value.slice(1);
	  },

	  /**
	   * 'abc' => 'ABC'
	   */

	  uppercase: function uppercase(value) {
	    return value || value === 0 ? value.toString().toUpperCase() : '';
	  },

	  /**
	   * 'AbC' => 'abc'
	   */

	  lowercase: function lowercase(value) {
	    return value || value === 0 ? value.toString().toLowerCase() : '';
	  },

	  /**
	   * 12345 => $12,345.00
	   *
	   * @param {String} sign
	   */

	  currency: function currency(value, _currency) {
	    value = parseFloat(value);
	    if (!isFinite(value) || !value && value !== 0) return '';
	    _currency = _currency != null ? _currency : '$';
	    var stringified = Math.abs(value).toFixed(2);
	    var _int = stringified.slice(0, -3);
	    var i = _int.length % 3;
	    var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : '';
	    var _float = stringified.slice(-3);
	    var sign = value < 0 ? '-' : '';
	    return _currency + sign + head + _int.slice(i).replace(digitsRE, '$1,') + _float;
	  },

	  /**
	   * 'item' => 'items'
	   *
	   * @params
	   *  an array of strings corresponding to
	   *  the single, double, triple ... forms of the word to
	   *  be pluralized. When the number to be pluralized
	   *  exceeds the length of the args, it will use the last
	   *  entry in the array.
	   *
	   *  e.g. ['single', 'double', 'triple', 'multiple']
	   */

	  pluralize: function pluralize(value) {
	    var args = toArray(arguments, 1);
	    return args.length > 1 ? args[value % 10 - 1] || args[args.length - 1] : args[0] + (value === 1 ? '' : 's');
	  },

	  /**
	   * Debounce a handler function.
	   *
	   * @param {Function} handler
	   * @param {Number} delay = 300
	   * @return {Function}
	   */

	  debounce: function debounce(handler, delay) {
	    if (!handler) return;
	    if (!delay) {
	      delay = 300;
	    }
	    return _debounce(handler, delay);
	  }
	};

	var partial = {

	  priority: 1750,

	  params: ['name'],

	  // watch changes to name for dynamic partials
	  paramWatchers: {
	    name: function name(value) {
	      vIf.remove.call(this);
	      if (value) {
	        this.insert(value);
	      }
	    }
	  },

	  bind: function bind() {
	    this.anchor = createAnchor('v-partial');
	    replace(this.el, this.anchor);
	    this.insert(this.params.name);
	  },

	  insert: function insert(id) {
	    var partial = resolveAsset(this.vm.$options, 'partials', id);
	    if (process.env.NODE_ENV !== 'production') {
	      assertAsset(partial, 'partial', id);
	    }
	    if (partial) {
	      this.factory = new FragmentFactory(this.vm, partial);
	      vIf.insert.call(this);
	    }
	  },

	  unbind: function unbind() {
	    if (this.frag) {
	      this.frag.destroy();
	    }
	  }
	};

	// This is the elementDirective that handles <content>
	// transclusions. It relies on the raw content of an
	// instance being stored as `$options._content` during
	// the transclude phase.

	var slot = {

	  priority: 1750,

	  params: ['name'],

	  bind: function bind() {
	    var host = this.vm;
	    var raw = host.$options._content;
	    var content;
	    if (!raw) {
	      this.fallback();
	      return;
	    }
	    var context = host._context;
	    var slotName = this.params.name;
	    if (!slotName) {
	      // Default content
	      var self = this;
	      var compileDefaultContent = function compileDefaultContent() {
	        self.compile(extractFragment(raw.childNodes, raw, true), context, host);
	      };
	      if (!host._isCompiled) {
	        // defer until the end of instance compilation,
	        // because the default outlet must wait until all
	        // other possible outlets with selectors have picked
	        // out their contents.
	        host.$once('hook:compiled', compileDefaultContent);
	      } else {
	        compileDefaultContent();
	      }
	    } else {
	      var selector = '[slot="' + slotName + '"]';
	      var nodes = raw.querySelectorAll(selector);
	      if (nodes.length) {
	        content = extractFragment(nodes, raw);
	        if (content.hasChildNodes()) {
	          this.compile(content, context, host);
	        } else {
	          this.fallback();
	        }
	      } else {
	        this.fallback();
	      }
	    }
	  },

	  fallback: function fallback() {
	    this.compile(extractContent(this.el, true), this.vm);
	  },

	  compile: function compile(content, context, host) {
	    if (content && context) {
	      var scope = host ? host._scope : this._scope;
	      this.unlink = context.$compile(content, host, scope, this._frag);
	    }
	    if (content) {
	      replace(this.el, content);
	    } else {
	      remove(this.el);
	    }
	  },

	  unbind: function unbind() {
	    if (this.unlink) {
	      this.unlink();
	    }
	  }
	};

	/**
	 * Extract qualified content nodes from a node list.
	 *
	 * @param {NodeList} nodes
	 * @param {Element} parent
	 * @param {Boolean} main
	 * @return {DocumentFragment}
	 */

	function extractFragment(nodes, parent, main) {
	  var frag = document.createDocumentFragment();
	  for (var i = 0, l = nodes.length; i < l; i++) {
	    var node = nodes[i];
	    // if this is the main outlet, we want to skip all
	    // previously selected nodes;
	    // otherwise, we want to mark the node as selected.
	    // clone the node so the original raw content remains
	    // intact. this ensures proper re-compilation in cases
	    // where the outlet is inside a conditional block
	    if (main && !node.__v_selected) {
	      append(node);
	    } else if (!main && node.parentNode === parent) {
	      node.__v_selected = true;
	      append(node);
	    }
	  }
	  return frag;

	  function append(node) {
	    if (isTemplate(node) && !node.hasAttribute('v-if') && !node.hasAttribute('v-for')) {
	      node = parseTemplate(node);
	    }
	    node = cloneNode(node);
	    frag.appendChild(node);
	  }
	}

	var elementDirectives = {
	  slot: slot,
	  partial: partial
	};

	Vue.version = '1.0.10';

	/**
	 * Vue and every constructor that extends Vue has an
	 * associated options object, which can be accessed during
	 * compilation steps as `this.constructor.options`.
	 *
	 * These can be seen as the default options of every
	 * Vue instance.
	 */

	Vue.options = {
	  directives: publicDirectives,
	  elementDirectives: elementDirectives,
	  filters: filters,
	  transitions: {},
	  components: {},
	  partials: {},
	  replace: true
	};

	// devtools global hook
	/* istanbul ignore if */
	if (process.env.NODE_ENV !== 'production') {
	  if (inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
	    window.__VUE_DEVTOOLS_GLOBAL_HOOK__.emit('init', Vue);
	  }
	}

	module.exports = Vue;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ },
/* 10 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Install plugin.
	 */

	function install(Vue) {

	    var _ = __webpack_require__(12)(Vue);

	    Vue.url = __webpack_require__(13)(_);
	    Vue.http = __webpack_require__(14)(_);
	    Vue.resource = __webpack_require__(18)(_);

	    Object.defineProperties(Vue.prototype, {

	        $url: {
	            get: function () {
	                return _.options(Vue.url, this, this.$options.url);
	            }
	        },

	        $http: {
	            get: function () {
	                return _.options(Vue.http, this, this.$options.http);
	            }
	        },

	        $resource: {
	            get: function () {
	                return Vue.resource.bind(this);
	            }
	        }

	    });
	}

	if (window.Vue) {
	    Vue.use(install);
	}

	module.exports = install;

/***/ },
/* 12 */
/***/ function(module, exports) {

	/**
	 * Utility functions.
	 */

	module.exports = function (Vue) {

	    var _ = Vue.util.extend({}, Vue.util);

	    _.isString = function (value) {
	        return typeof value === 'string';
	    };

	    _.isFunction = function (value) {
	        return typeof value === 'function';
	    };

	    _.options = function (fn, obj, options) {

	        options = options || {};

	        if (_.isFunction(options)) {
	            options = options.call(obj);
	        }

	        return _.extend(fn.bind({vm: obj, options: options}), fn, {options: options});
	    };

	    _.each = function (obj, iterator) {

	        var i, key;

	        if (typeof obj.length == 'number') {
	            for (i = 0; i < obj.length; i++) {
	                iterator.call(obj[i], obj[i], i);
	            }
	        } else if (_.isObject(obj)) {
	            for (key in obj) {
	                if (obj.hasOwnProperty(key)) {
	                    iterator.call(obj[key], obj[key], key);
	                }
	            }
	        }

	        return obj;
	    };

	    _.extend = function (target) {

	        var array = [], args = array.slice.call(arguments, 1), deep;

	        if (typeof target == 'boolean') {
	            deep = target;
	            target = args.shift();
	        }

	        args.forEach(function (arg) {
	            extend(target, arg, deep);
	        });

	        return target;
	    };

	    function extend(target, source, deep) {
	        for (var key in source) {
	            if (deep && (_.isPlainObject(source[key]) || _.isArray(source[key]))) {
	                if (_.isPlainObject(source[key]) && !_.isPlainObject(target[key])) {
	                    target[key] = {};
	                }
	                if (_.isArray(source[key]) && !_.isArray(target[key])) {
	                    target[key] = [];
	                }
	                extend(target[key], source[key], deep);
	            } else if (source[key] !== undefined) {
	                target[key] = source[key];
	            }
	        }
	    }

	    return _;
	};


/***/ },
/* 13 */
/***/ function(module, exports) {

	/**
	 * Service for URL templating.
	 */

	var ie = document.documentMode;
	var el = document.createElement('a');

	module.exports = function (_) {

	    function Url(url, params) {

	        var urlParams = {}, queryParams = {}, options = url, query;

	        if (!_.isPlainObject(options)) {
	            options = {url: url, params: params};
	        }

	        options = _.extend(true, {},
	            Url.options, this.options, options
	        );

	        url = options.url.replace(/(\/?):([a-z]\w*)/gi, function (match, slash, name) {

	            if (options.params[name]) {
	                urlParams[name] = true;
	                return slash + encodeUriSegment(options.params[name]);
	            }

	            return '';
	        });

	        if (_.isString(options.root) && !url.match(/^(https?:)?\//)) {
	            url = options.root + '/' + url;
	        }

	        _.each(options.params, function (value, key) {
	            if (!urlParams[key]) {
	                queryParams[key] = value;
	            }
	        });

	        query = Url.params(queryParams);

	        if (query) {
	            url += (url.indexOf('?') == -1 ? '?' : '&') + query;
	        }

	        return url;
	    }

	    /**
	     * Url options.
	     */

	    Url.options = {
	        url: '',
	        root: null,
	        params: {}
	    };

	    /**
	     * Encodes a Url parameter string.
	     *
	     * @param {Object} obj
	     */

	    Url.params = function (obj) {

	        var params = [];

	        params.add = function (key, value) {

	            if (_.isFunction (value)) {
	                value = value();
	            }

	            if (value === null) {
	                value = '';
	            }

	            this.push(encodeUriSegment(key) + '=' + encodeUriSegment(value));
	        };

	        serialize(params, obj);

	        return params.join('&');
	    };

	    /**
	     * Parse a URL and return its components.
	     *
	     * @param {String} url
	     */

	    Url.parse = function (url) {

	        if (ie) {
	            el.href = url;
	            url = el.href;
	        }

	        el.href = url;

	        return {
	            href: el.href,
	            protocol: el.protocol ? el.protocol.replace(/:$/, '') : '',
	            port: el.port,
	            host: el.host,
	            hostname: el.hostname,
	            pathname: el.pathname.charAt(0) === '/' ? el.pathname : '/' + el.pathname,
	            search: el.search ? el.search.replace(/^\?/, '') : '',
	            hash: el.hash ? el.hash.replace(/^#/, '') : ''
	        };
	    };

	    function serialize(params, obj, scope) {

	        var array = _.isArray(obj), plain = _.isPlainObject(obj), hash;

	        _.each(obj, function (value, key) {

	            hash = _.isObject(value) || _.isArray(value);

	            if (scope) {
	                key = scope + '[' + (plain || hash ? key : '') + ']';
	            }

	            if (!scope && array) {
	                params.add(value.name, value.value);
	            } else if (hash) {
	                serialize(params, value, key);
	            } else {
	                params.add(key, value);
	            }
	        });
	    }

	    function encodeUriSegment(value) {

	        return encodeUriQuery(value, true).
	            replace(/%26/gi, '&').
	            replace(/%3D/gi, '=').
	            replace(/%2B/gi, '+');
	    }

	    function encodeUriQuery(value, spaces) {

	        return encodeURIComponent(value).
	            replace(/%40/gi, '@').
	            replace(/%3A/gi, ':').
	            replace(/%24/g, '$').
	            replace(/%2C/gi, ',').
	            replace(/%20/g, (spaces ? '%20' : '+'));
	    }

	    return _.url = Url;
	};


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Service for sending network requests.
	 */

	var xhr = __webpack_require__(15);
	var jsonp = __webpack_require__(17);
	var Promise = __webpack_require__(16);

	module.exports = function (_) {

	    var originUrl = _.url.parse(location.href);
	    var jsonType = {'Content-Type': 'application/json;charset=utf-8'};

	    function Http(url, options) {

	        var promise;

	        if (_.isPlainObject(url)) {
	            options = url;
	            url = '';
	        }

	        options = _.extend({url: url}, options);
	        options = _.extend(true, {},
	            Http.options, this.options, options
	        );

	        if (options.crossOrigin === null) {
	            options.crossOrigin = crossOrigin(options.url);
	        }

	        options.method = options.method.toUpperCase();
	        options.headers = _.extend({}, Http.headers.common,
	            !options.crossOrigin ? Http.headers.custom : {},
	            Http.headers[options.method.toLowerCase()],
	            options.headers
	        );

	        if (_.isPlainObject(options.data) && /^(GET|JSONP)$/i.test(options.method)) {
	            _.extend(options.params, options.data);
	            delete options.data;
	        }

	        if (options.emulateHTTP && !options.crossOrigin && /^(PUT|PATCH|DELETE)$/i.test(options.method)) {
	            options.headers['X-HTTP-Method-Override'] = options.method;
	            options.method = 'POST';
	        }

	        if (options.emulateJSON && _.isPlainObject(options.data)) {
	            options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
	            options.data = _.url.params(options.data);
	        }

	        if (_.isObject(options.data) && /FormData/i.test(options.data.toString())) {
	            delete options.headers['Content-Type'];
	        }

	        if (_.isPlainObject(options.data)) {
	            options.data = JSON.stringify(options.data);
	        }

	        promise = (options.method == 'JSONP' ? jsonp : xhr).call(this.vm, _, options);
	        promise = extendPromise(promise.then(transformResponse, transformResponse), this.vm);

	        if (options.success) {
	            promise = promise.success(options.success);
	        }

	        if (options.error) {
	            promise = promise.error(options.error);
	        }

	        return promise;
	    }

	    function extendPromise(promise, vm) {

	        promise.success = function (fn) {

	            return extendPromise(promise.then(function (response) {
	                return fn.call(vm, response.data, response.status, response) || response;
	            }), vm);

	        };

	        promise.error = function (fn) {

	            return extendPromise(promise.then(undefined, function (response) {
	                return fn.call(vm, response.data, response.status, response) || response;
	            }), vm);

	        };

	        promise.always = function (fn) {

	            var cb = function (response) {
	                return fn.call(vm, response.data, response.status, response) || response;
	            };

	            return extendPromise(promise.then(cb, cb), vm);
	        };

	        return promise;
	    }

	    function transformResponse(response) {

	        try {
	            response.data = JSON.parse(response.responseText);
	        } catch (e) {
	            response.data = response.responseText;
	        }

	        return response.ok ? response : Promise.reject(response);
	    }

	    function crossOrigin(url) {

	        var requestUrl = _.url.parse(url);

	        return (requestUrl.protocol !== originUrl.protocol || requestUrl.host !== originUrl.host);
	    }

	    Http.options = {
	        method: 'get',
	        params: {},
	        data: '',
	        xhr: null,
	        jsonp: 'callback',
	        beforeSend: null,
	        crossOrigin: null,
	        emulateHTTP: false,
	        emulateJSON: false
	    };

	    Http.headers = {
	        put: jsonType,
	        post: jsonType,
	        patch: jsonType,
	        delete: jsonType,
	        common: {'Accept': 'application/json, text/plain, */*'},
	        custom: {'X-Requested-With': 'XMLHttpRequest'}
	    };

	    ['get', 'put', 'post', 'patch', 'delete', 'jsonp'].forEach(function (method) {

	        Http[method] = function (url, data, success, options) {

	            if (_.isFunction(data)) {
	                options = success;
	                success = data;
	                data = undefined;
	            }

	            return this(url, _.extend({method: method, data: data, success: success}, options));
	        };
	    });

	    return _.http = Http;
	};


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * XMLHttp request.
	 */

	var Promise = __webpack_require__(16);
	var XDomain = window.XDomainRequest;

	module.exports = function (_, options) {

	    var request = new XMLHttpRequest(), promise;

	    if (XDomain && options.crossOrigin) {
	        request = new XDomainRequest(); options.headers = {};
	    }

	    if (_.isPlainObject(options.xhr)) {
	        _.extend(request, options.xhr);
	    }

	    if (_.isFunction(options.beforeSend)) {
	        options.beforeSend.call(this, request, options);
	    }

	    promise = new Promise(function (resolve, reject) {

	        request.open(options.method, _.url(options), true);

	        _.each(options.headers, function (value, header) {
	            request.setRequestHeader(header, value);
	        });

	        var handler = function (event) {

	            request.ok = event.type === 'load';

	            if (request.ok && request.status) {
	                request.ok = request.status >= 200 && request.status < 300;
	            }

	            (request.ok ? resolve : reject)(request);
	        };

	        request.onload = handler;
	        request.onabort = handler;
	        request.onerror = handler;

	        request.send(options.data);
	    });

	    return promise;
	};


/***/ },
/* 16 */
/***/ function(module, exports) {

	/**
	 * Promises/A+ polyfill v1.1.0 (https://github.com/bramstein/promis)
	 */

	var RESOLVED = 0;
	var REJECTED = 1;
	var PENDING  = 2;

	function Promise(executor) {

	    this.state = PENDING;
	    this.value = undefined;
	    this.deferred = [];

	    var promise = this;

	    try {
	        executor(function (x) {
	            promise.resolve(x);
	        }, function (r) {
	            promise.reject(r);
	        });
	    } catch (e) {
	        promise.reject(e);
	    }
	}

	Promise.reject = function (r) {
	    return new Promise(function (resolve, reject) {
	        reject(r);
	    });
	};

	Promise.resolve = function (x) {
	    return new Promise(function (resolve, reject) {
	        resolve(x);
	    });
	};

	Promise.all = function all(iterable) {
	    return new Promise(function (resolve, reject) {
	        var count = 0,
	            result = [];

	        if (iterable.length === 0) {
	            resolve(result);
	        }

	        function resolver(i) {
	            return function (x) {
	                result[i] = x;
	                count += 1;

	                if (count === iterable.length) {
	                    resolve(result);
	                }
	            };
	        }

	        for (var i = 0; i < iterable.length; i += 1) {
	            iterable[i].then(resolver(i), reject);
	        }
	    });
	};

	Promise.race = function race(iterable) {
	    return new Promise(function (resolve, reject) {
	        for (var i = 0; i < iterable.length; i += 1) {
	            iterable[i].then(resolve, reject);
	        }
	    });
	};

	var p = Promise.prototype;

	p.resolve = function resolve(x) {
	    var promise = this;

	    if (promise.state === PENDING) {
	        if (x === promise) {
	            throw new TypeError('Promise settled with itself.');
	        }

	        var called = false;

	        try {
	            var then = x && x['then'];

	            if (x !== null && typeof x === 'object' && typeof then === 'function') {
	                then.call(x, function (x) {
	                    if (!called) {
	                        promise.resolve(x);
	                    }
	                    called = true;

	                }, function (r) {
	                    if (!called) {
	                        promise.reject(r);
	                    }
	                    called = true;
	                });
	                return;
	            }
	        } catch (e) {
	            if (!called) {
	                promise.reject(e);
	            }
	            return;
	        }
	        promise.state = RESOLVED;
	        promise.value = x;
	        promise.notify();
	    }
	};

	p.reject = function reject(reason) {
	    var promise = this;

	    if (promise.state === PENDING) {
	        if (reason === promise) {
	            throw new TypeError('Promise settled with itself.');
	        }

	        promise.state = REJECTED;
	        promise.value = reason;
	        promise.notify();
	    }
	};

	p.notify = function notify() {
	    var promise = this;

	    async(function () {
	        if (promise.state !== PENDING) {
	            while (promise.deferred.length) {
	                var deferred = promise.deferred.shift(),
	                    onResolved = deferred[0],
	                    onRejected = deferred[1],
	                    resolve = deferred[2],
	                    reject = deferred[3];

	                try {
	                    if (promise.state === RESOLVED) {
	                        if (typeof onResolved === 'function') {
	                            resolve(onResolved.call(undefined, promise.value));
	                        } else {
	                            resolve(promise.value);
	                        }
	                    } else if (promise.state === REJECTED) {
	                        if (typeof onRejected === 'function') {
	                            resolve(onRejected.call(undefined, promise.value));
	                        } else {
	                            reject(promise.value);
	                        }
	                    }
	                } catch (e) {
	                    reject(e);
	                }
	            }
	        }
	    });
	};

	p.catch = function (onRejected) {
	    return this.then(undefined, onRejected);
	};

	p.then = function then(onResolved, onRejected) {
	    var promise = this;

	    return new Promise(function (resolve, reject) {
	        promise.deferred.push([onResolved, onRejected, resolve, reject]);
	        promise.notify();
	    });
	};

	var queue = [];
	var async = function (callback) {
	    queue.push(callback);

	    if (queue.length === 1) {
	        async.async();
	    }
	};

	async.run = function () {
	    while (queue.length) {
	        queue[0]();
	        queue.shift();
	    }
	};

	if (window.MutationObserver) {
	    var el = document.createElement('div');
	    var mo = new MutationObserver(async.run);

	    mo.observe(el, {
	        attributes: true
	    });

	    async.async = function () {
	        el.setAttribute("x", 0);
	    };
	} else {
	    async.async = function () {
	        setTimeout(async.run);
	    };
	}

	module.exports = window.Promise || Promise;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * JSONP request.
	 */

	var Promise = __webpack_require__(16);

	module.exports = function (_, options) {

	    var callback = '_jsonp' + Math.random().toString(36).substr(2), response = {}, script, body;

	    options.params[options.jsonp] = callback;

	    if (_.isFunction(options.beforeSend)) {
	        options.beforeSend.call(this, {}, options);
	    }

	    return new Promise(function (resolve, reject) {

	        script = document.createElement('script');
	        script.src = _.url(options);
	        script.type = 'text/javascript';
	        script.async = true;

	        window[callback] = function (data) {
	            body = data;
	        };

	        var handler = function (event) {

	            delete window[callback];
	            document.body.removeChild(script);

	            if (event.type === 'load' && !body) {
	                event.type = 'error';
	            }

	            response.ok = event.type !== 'error';
	            response.status = response.ok ? 200 : 404;
	            response.responseText = body ? body : event.type;

	            (response.ok ? resolve : reject)(response);
	        };

	        script.onload = handler;
	        script.onerror = handler;

	        document.body.appendChild(script);
	    });

	};


/***/ },
/* 18 */
/***/ function(module, exports) {

	/**
	 * Service for interacting with RESTful services.
	 */

	module.exports = function (_) {

	    function Resource(url, params, actions, options) {

	        var self = this, resource = {};

	        actions = _.extend({},
	            Resource.actions,
	            actions
	        );

	        _.each(actions, function (action, name) {

	            action = _.extend(true, {url: url, params: params || {}}, options, action);

	            resource[name] = function () {
	                return (self.$http || _.http)(opts(action, arguments));
	            };
	        });

	        return resource;
	    }

	    function opts(action, args) {

	        var options = _.extend({}, action), params = {}, data, success, error;

	        switch (args.length) {

	            case 4:

	                error = args[3];
	                success = args[2];

	            case 3:
	            case 2:

	                if (_.isFunction(args[1])) {

	                    if (_.isFunction(args[0])) {

	                        success = args[0];
	                        error = args[1];

	                        break;
	                    }

	                    success = args[1];
	                    error = args[2];

	                } else {

	                    params = args[0];
	                    data = args[1];
	                    success = args[2];

	                    break;
	                }

	            case 1:

	                if (_.isFunction(args[0])) {
	                    success = args[0];
	                } else if (/^(POST|PUT|PATCH)$/i.test(options.method)) {
	                    data = args[0];
	                } else {
	                    params = args[0];
	                }

	                break;

	            case 0:

	                break;

	            default:

	                throw 'Expected up to 4 arguments [params, data, success, error], got ' + args.length + ' arguments';
	        }

	        options.data = data;
	        options.params = _.extend({}, options.params, params);

	        if (success) {
	            options.success = success;
	        }

	        if (error) {
	            options.error = error;
	        }

	        return options;
	    }

	    Resource.actions = {

	        get: {method: 'GET'},
	        save: {method: 'POST'},
	        query: {method: 'GET'},
	        update: {method: 'PUT'},
	        remove: {method: 'DELETE'},
	        delete: {method: 'DELETE'}

	    };

	    return _.resource = Resource;
	};


/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';

	var babelHelpers = {};

	babelHelpers.classCallCheck = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};
	function Target(path, matcher, delegate) {
	  this.path = path;
	  this.matcher = matcher;
	  this.delegate = delegate;
	}

	Target.prototype = {
	  to: function to(target, callback) {
	    var delegate = this.delegate;

	    if (delegate && delegate.willAddRoute) {
	      target = delegate.willAddRoute(this.matcher.target, target);
	    }

	    this.matcher.add(this.path, target);

	    if (callback) {
	      if (callback.length === 0) {
	        throw new Error("You must have an argument in the function passed to `to`");
	      }
	      this.matcher.addChild(this.path, target, callback, this.delegate);
	    }
	    return this;
	  }
	};

	function Matcher(target) {
	  this.routes = {};
	  this.children = {};
	  this.target = target;
	}

	Matcher.prototype = {
	  add: function add(path, handler) {
	    this.routes[path] = handler;
	  },

	  addChild: function addChild(path, target, callback, delegate) {
	    var matcher = new Matcher(target);
	    this.children[path] = matcher;

	    var match = generateMatch(path, matcher, delegate);

	    if (delegate && delegate.contextEntered) {
	      delegate.contextEntered(target, match);
	    }

	    callback(match);
	  }
	};

	function generateMatch(startingPath, matcher, delegate) {
	  return function (path, nestedCallback) {
	    var fullPath = startingPath + path;

	    if (nestedCallback) {
	      nestedCallback(generateMatch(fullPath, matcher, delegate));
	    } else {
	      return new Target(startingPath + path, matcher, delegate);
	    }
	  };
	}

	function addRoute(routeArray, path, handler) {
	  var len = 0;
	  for (var i = 0, l = routeArray.length; i < l; i++) {
	    len += routeArray[i].path.length;
	  }

	  path = path.substr(len);
	  var route = { path: path, handler: handler };
	  routeArray.push(route);
	}

	function eachRoute(baseRoute, matcher, callback, binding) {
	  var routes = matcher.routes;

	  for (var path in routes) {
	    if (routes.hasOwnProperty(path)) {
	      var routeArray = baseRoute.slice();
	      addRoute(routeArray, path, routes[path]);

	      if (matcher.children[path]) {
	        eachRoute(routeArray, matcher.children[path], callback, binding);
	      } else {
	        callback.call(binding, routeArray);
	      }
	    }
	  }
	}

	function map (callback, addRouteCallback) {
	  var matcher = new Matcher();

	  callback(generateMatch("", matcher, this.delegate));

	  eachRoute([], matcher, function (route) {
	    if (addRouteCallback) {
	      addRouteCallback(this, route);
	    } else {
	      this.add(route);
	    }
	  }, this);
	}

	var specials = ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'];

	var escapeRegex = new RegExp('(\\' + specials.join('|\\') + ')', 'g');

	function isArray(test) {
	  return Object.prototype.toString.call(test) === "[object Array]";
	}

	// A Segment represents a segment in the original route description.
	// Each Segment type provides an `eachChar` and `regex` method.
	//
	// The `eachChar` method invokes the callback with one or more character
	// specifications. A character specification consumes one or more input
	// characters.
	//
	// The `regex` method returns a regex fragment for the segment. If the
	// segment is a dynamic of star segment, the regex fragment also includes
	// a capture.
	//
	// A character specification contains:
	//
	// * `validChars`: a String with a list of all valid characters, or
	// * `invalidChars`: a String with a list of all invalid characters
	// * `repeat`: true if the character specification can repeat

	function StaticSegment(string) {
	  this.string = string;
	}
	StaticSegment.prototype = {
	  eachChar: function eachChar(callback) {
	    var string = this.string,
	        ch;

	    for (var i = 0, l = string.length; i < l; i++) {
	      ch = string.charAt(i);
	      callback({ validChars: ch });
	    }
	  },

	  regex: function regex() {
	    return this.string.replace(escapeRegex, '\\$1');
	  },

	  generate: function generate() {
	    return this.string;
	  }
	};

	function DynamicSegment(name) {
	  this.name = name;
	}
	DynamicSegment.prototype = {
	  eachChar: function eachChar(callback) {
	    callback({ invalidChars: "/", repeat: true });
	  },

	  regex: function regex() {
	    return "([^/]+)";
	  },

	  generate: function generate(params) {
	    return params[this.name];
	  }
	};

	function StarSegment(name) {
	  this.name = name;
	}
	StarSegment.prototype = {
	  eachChar: function eachChar(callback) {
	    callback({ invalidChars: "", repeat: true });
	  },

	  regex: function regex() {
	    return "(.+)";
	  },

	  generate: function generate(params) {
	    return params[this.name];
	  }
	};

	function EpsilonSegment() {}
	EpsilonSegment.prototype = {
	  eachChar: function eachChar() {},
	  regex: function regex() {
	    return "";
	  },
	  generate: function generate() {
	    return "";
	  }
	};

	function parse(route, names, specificity) {
	  // normalize route as not starting with a "/". Recognition will
	  // also normalize.
	  if (route.charAt(0) === "/") {
	    route = route.substr(1);
	  }

	  var segments = route.split("/"),
	      results = [];

	  // A routes has specificity determined by the order that its different segments
	  // appear in. This system mirrors how the magnitude of numbers written as strings
	  // works.
	  // Consider a number written as: "abc". An example would be "200". Any other number written
	  // "xyz" will be smaller than "abc" so long as `a > z`. For instance, "199" is smaller
	  // then "200", even though "y" and "z" (which are both 9) are larger than "0" (the value
	  // of (`b` and `c`). This is because the leading symbol, "2", is larger than the other
	  // leading symbol, "1".
	  // The rule is that symbols to the left carry more weight than symbols to the right
	  // when a number is written out as a string. In the above strings, the leading digit
	  // represents how many 100's are in the number, and it carries more weight than the middle
	  // number which represents how many 10's are in the number.
	  // This system of number magnitude works well for route specificity, too. A route written as
	  // `a/b/c` will be more specific than `x/y/z` as long as `a` is more specific than
	  // `x`, irrespective of the other parts.
	  // Because of this similarity, we assign each type of segment a number value written as a
	  // string. We can find the specificity of compound routes by concatenating these strings
	  // together, from left to right. After we have looped through all of the segments,
	  // we convert the string to a number.
	  specificity.val = '';

	  for (var i = 0, l = segments.length; i < l; i++) {
	    var segment = segments[i],
	        match;

	    if (match = segment.match(/^:([^\/]+)$/)) {
	      results.push(new DynamicSegment(match[1]));
	      names.push(match[1]);
	      specificity.val += '3';
	    } else if (match = segment.match(/^\*([^\/]+)$/)) {
	      results.push(new StarSegment(match[1]));
	      specificity.val += '2';
	      names.push(match[1]);
	    } else if (segment === "") {
	      results.push(new EpsilonSegment());
	      specificity.val += '1';
	    } else {
	      results.push(new StaticSegment(segment));
	      specificity.val += '4';
	    }
	  }

	  specificity.val = +specificity.val;

	  return results;
	}

	// A State has a character specification and (`charSpec`) and a list of possible
	// subsequent states (`nextStates`).
	//
	// If a State is an accepting state, it will also have several additional
	// properties:
	//
	// * `regex`: A regular expression that is used to extract parameters from paths
	//   that reached this accepting state.
	// * `handlers`: Information on how to convert the list of captures into calls
	//   to registered handlers with the specified parameters
	// * `types`: How many static, dynamic or star segments in this route. Used to
	//   decide which route to use if multiple registered routes match a path.
	//
	// Currently, State is implemented naively by looping over `nextStates` and
	// comparing a character specification against a character. A more efficient
	// implementation would use a hash of keys pointing at one or more next states.

	function State(charSpec) {
	  this.charSpec = charSpec;
	  this.nextStates = [];
	}

	State.prototype = {
	  get: function get(charSpec) {
	    var nextStates = this.nextStates;

	    for (var i = 0, l = nextStates.length; i < l; i++) {
	      var child = nextStates[i];

	      var isEqual = child.charSpec.validChars === charSpec.validChars;
	      isEqual = isEqual && child.charSpec.invalidChars === charSpec.invalidChars;

	      if (isEqual) {
	        return child;
	      }
	    }
	  },

	  put: function put(charSpec) {
	    var state;

	    // If the character specification already exists in a child of the current
	    // state, just return that state.
	    if (state = this.get(charSpec)) {
	      return state;
	    }

	    // Make a new state for the character spec
	    state = new State(charSpec);

	    // Insert the new state as a child of the current state
	    this.nextStates.push(state);

	    // If this character specification repeats, insert the new state as a child
	    // of itself. Note that this will not trigger an infinite loop because each
	    // transition during recognition consumes a character.
	    if (charSpec.repeat) {
	      state.nextStates.push(state);
	    }

	    // Return the new state
	    return state;
	  },

	  // Find a list of child states matching the next character
	  match: function match(ch) {
	    // DEBUG "Processing `" + ch + "`:"
	    var nextStates = this.nextStates,
	        child,
	        charSpec,
	        chars;

	    // DEBUG "  " + debugState(this)
	    var returned = [];

	    for (var i = 0, l = nextStates.length; i < l; i++) {
	      child = nextStates[i];

	      charSpec = child.charSpec;

	      if (typeof (chars = charSpec.validChars) !== 'undefined') {
	        if (chars.indexOf(ch) !== -1) {
	          returned.push(child);
	        }
	      } else if (typeof (chars = charSpec.invalidChars) !== 'undefined') {
	        if (chars.indexOf(ch) === -1) {
	          returned.push(child);
	        }
	      }
	    }

	    return returned;
	  }

	  /** IF DEBUG
	  , debug: function() {
	    var charSpec = this.charSpec,
	        debug = "[",
	        chars = charSpec.validChars || charSpec.invalidChars;
	     if (charSpec.invalidChars) { debug += "^"; }
	    debug += chars;
	    debug += "]";
	     if (charSpec.repeat) { debug += "+"; }
	     return debug;
	  }
	  END IF **/
	};

	/** IF DEBUG
	function debug(log) {
	  console.log(log);
	}

	function debugState(state) {
	  return state.nextStates.map(function(n) {
	    if (n.nextStates.length === 0) { return "( " + n.debug() + " [accepting] )"; }
	    return "( " + n.debug() + " <then> " + n.nextStates.map(function(s) { return s.debug() }).join(" or ") + " )";
	  }).join(", ")
	}
	END IF **/

	// Sort the routes by specificity
	function sortSolutions(states) {
	  return states.sort(function (a, b) {
	    return b.specificity.val - a.specificity.val;
	  });
	}

	function recognizeChar(states, ch) {
	  var nextStates = [];

	  for (var i = 0, l = states.length; i < l; i++) {
	    var state = states[i];

	    nextStates = nextStates.concat(state.match(ch));
	  }

	  return nextStates;
	}

	var oCreate = Object.create || function (proto) {
	  function F() {}
	  F.prototype = proto;
	  return new F();
	};

	function RecognizeResults(queryParams) {
	  this.queryParams = queryParams || {};
	}
	RecognizeResults.prototype = oCreate({
	  splice: Array.prototype.splice,
	  slice: Array.prototype.slice,
	  push: Array.prototype.push,
	  length: 0,
	  queryParams: null
	});

	function findHandler(state, path, queryParams) {
	  var handlers = state.handlers,
	      regex = state.regex;
	  var captures = path.match(regex),
	      currentCapture = 1;
	  var result = new RecognizeResults(queryParams);

	  for (var i = 0, l = handlers.length; i < l; i++) {
	    var handler = handlers[i],
	        names = handler.names,
	        params = {};

	    for (var j = 0, m = names.length; j < m; j++) {
	      params[names[j]] = captures[currentCapture++];
	    }

	    result.push({ handler: handler.handler, params: params, isDynamic: !!names.length });
	  }

	  return result;
	}

	function addSegment(currentState, segment) {
	  segment.eachChar(function (ch) {
	    var state;

	    currentState = currentState.put(ch);
	  });

	  return currentState;
	}

	function decodeQueryParamPart(part) {
	  // http://www.w3.org/TR/html401/interact/forms.html#h-17.13.4.1
	  part = part.replace(/\+/gm, '%20');
	  return decodeURIComponent(part);
	}

	// The main interface

	var RouteRecognizer = function RouteRecognizer() {
	  this.rootState = new State();
	  this.names = {};
	};

	RouteRecognizer.prototype = {
	  add: function add(routes, options) {
	    var currentState = this.rootState,
	        regex = "^",
	        specificity = {},
	        handlers = [],
	        allSegments = [],
	        name;

	    var isEmpty = true;

	    for (var i = 0, l = routes.length; i < l; i++) {
	      var route = routes[i],
	          names = [];

	      var segments = parse(route.path, names, specificity);

	      allSegments = allSegments.concat(segments);

	      for (var j = 0, m = segments.length; j < m; j++) {
	        var segment = segments[j];

	        if (segment instanceof EpsilonSegment) {
	          continue;
	        }

	        isEmpty = false;

	        // Add a "/" for the new segment
	        currentState = currentState.put({ validChars: "/" });
	        regex += "/";

	        // Add a representation of the segment to the NFA and regex
	        currentState = addSegment(currentState, segment);
	        regex += segment.regex();
	      }

	      var handler = { handler: route.handler, names: names };
	      handlers.push(handler);
	    }

	    if (isEmpty) {
	      currentState = currentState.put({ validChars: "/" });
	      regex += "/";
	    }

	    currentState.handlers = handlers;
	    currentState.regex = new RegExp(regex + "$");
	    currentState.specificity = specificity;

	    if (name = options && options.as) {
	      this.names[name] = {
	        segments: allSegments,
	        handlers: handlers
	      };
	    }
	  },

	  handlersFor: function handlersFor(name) {
	    var route = this.names[name],
	        result = [];
	    if (!route) {
	      throw new Error("There is no route named " + name);
	    }

	    for (var i = 0, l = route.handlers.length; i < l; i++) {
	      result.push(route.handlers[i]);
	    }

	    return result;
	  },

	  hasRoute: function hasRoute(name) {
	    return !!this.names[name];
	  },

	  generate: function generate(name, params) {
	    var route = this.names[name],
	        output = "";
	    if (!route) {
	      throw new Error("There is no route named " + name);
	    }

	    var segments = route.segments;

	    for (var i = 0, l = segments.length; i < l; i++) {
	      var segment = segments[i];

	      if (segment instanceof EpsilonSegment) {
	        continue;
	      }

	      output += "/";
	      output += segment.generate(params);
	    }

	    if (output.charAt(0) !== '/') {
	      output = '/' + output;
	    }

	    if (params && params.queryParams) {
	      output += this.generateQueryString(params.queryParams);
	    }

	    return output;
	  },

	  generateQueryString: function generateQueryString(params) {
	    var pairs = [];
	    var keys = [];
	    for (var key in params) {
	      if (params.hasOwnProperty(key)) {
	        keys.push(key);
	      }
	    }
	    keys.sort();
	    for (var i = 0, len = keys.length; i < len; i++) {
	      key = keys[i];
	      var value = params[key];
	      if (value == null) {
	        continue;
	      }
	      var pair = encodeURIComponent(key);
	      if (isArray(value)) {
	        for (var j = 0, l = value.length; j < l; j++) {
	          var arrayPair = key + '[]' + '=' + encodeURIComponent(value[j]);
	          pairs.push(arrayPair);
	        }
	      } else {
	        pair += "=" + encodeURIComponent(value);
	        pairs.push(pair);
	      }
	    }

	    if (pairs.length === 0) {
	      return '';
	    }

	    return "?" + pairs.join("&");
	  },

	  parseQueryString: function parseQueryString(queryString) {
	    var pairs = queryString.split("&"),
	        queryParams = {};
	    for (var i = 0; i < pairs.length; i++) {
	      var pair = pairs[i].split('='),
	          key = decodeQueryParamPart(pair[0]),
	          keyLength = key.length,
	          isArray = false,
	          value;
	      if (pair.length === 1) {
	        value = 'true';
	      } else {
	        //Handle arrays
	        if (keyLength > 2 && key.slice(keyLength - 2) === '[]') {
	          isArray = true;
	          key = key.slice(0, keyLength - 2);
	          if (!queryParams[key]) {
	            queryParams[key] = [];
	          }
	        }
	        value = pair[1] ? decodeQueryParamPart(pair[1]) : '';
	      }
	      if (isArray) {
	        queryParams[key].push(value);
	      } else {
	        queryParams[key] = value;
	      }
	    }
	    return queryParams;
	  },

	  recognize: function recognize(path) {
	    var states = [this.rootState],
	        pathLen,
	        i,
	        l,
	        queryStart,
	        queryParams = {},
	        isSlashDropped = false;

	    queryStart = path.indexOf('?');
	    if (queryStart !== -1) {
	      var queryString = path.substr(queryStart + 1, path.length);
	      path = path.substr(0, queryStart);
	      queryParams = this.parseQueryString(queryString);
	    }

	    path = decodeURI(path);

	    // DEBUG GROUP path

	    if (path.charAt(0) !== "/") {
	      path = "/" + path;
	    }

	    pathLen = path.length;
	    if (pathLen > 1 && path.charAt(pathLen - 1) === "/") {
	      path = path.substr(0, pathLen - 1);
	      isSlashDropped = true;
	    }

	    for (i = 0, l = path.length; i < l; i++) {
	      states = recognizeChar(states, path.charAt(i));
	      if (!states.length) {
	        break;
	      }
	    }

	    // END DEBUG GROUP

	    var solutions = [];
	    for (i = 0, l = states.length; i < l; i++) {
	      if (states[i].handlers) {
	        solutions.push(states[i]);
	      }
	    }

	    states = sortSolutions(solutions);

	    var state = solutions[0];

	    if (state && state.handlers) {
	      // if a trailing slash was dropped and a star segment is the last segment
	      // specified, put the trailing slash back
	      if (isSlashDropped && state.regex.source.slice(-5) === "(.+)$") {
	        path = path + "/";
	      }
	      return findHandler(state, path, queryParams);
	    }
	  }
	};

	RouteRecognizer.prototype.map = map;

	RouteRecognizer.VERSION = '0.1.9';

	var genQuery = RouteRecognizer.prototype.generateQueryString;

	// export default for holding the Vue reference
	var exports$1 = {};
	/**
	 * Warn stuff.
	 *
	 * @param {String} msg
	 */

	function warn(msg) {
	  /* istanbul ignore next */
	  if (window.console) {
	    console.warn('[vue-router] ' + msg);
	    /* istanbul ignore if */
	    if (!exports$1.Vue || exports$1.Vue.config.debug) {
	      console.warn(new Error('warning stack trace:').stack);
	    }
	  }
	}

	/**
	 * Resolve a relative path.
	 *
	 * @param {String} base
	 * @param {String} relative
	 * @param {Boolean} append
	 * @return {String}
	 */

	function resolvePath(base, relative, append) {
	  var query = base.match(/(\?.*)$/);
	  if (query) {
	    query = query[1];
	    base = base.slice(0, -query.length);
	  }
	  // a query!
	  if (relative.charAt(0) === '?') {
	    return base + relative;
	  }
	  var stack = base.split('/');
	  // remove trailing segment if:
	  // - not appending
	  // - appending to trailing slash (last segment is empty)
	  if (!append || !stack[stack.length - 1]) {
	    stack.pop();
	  }
	  // resolve relative path
	  var segments = relative.replace(/^\//, '').split('/');
	  for (var i = 0; i < segments.length; i++) {
	    var segment = segments[i];
	    if (segment === '.') {
	      continue;
	    } else if (segment === '..') {
	      stack.pop();
	    } else {
	      stack.push(segment);
	    }
	  }
	  // ensure leading slash
	  if (stack[0] !== '') {
	    stack.unshift('');
	  }
	  return stack.join('/');
	}

	/**
	 * Forgiving check for a promise
	 *
	 * @param {Object} p
	 * @return {Boolean}
	 */

	function isPromise(p) {
	  return p && typeof p.then === 'function';
	}

	/**
	 * Retrive a route config field from a component instance
	 * OR a component contructor.
	 *
	 * @param {Function|Vue} component
	 * @param {String} name
	 * @return {*}
	 */

	function getRouteConfig(component, name) {
	  var options = component && (component.$options || component.options);
	  return options && options.route && options.route[name];
	}

	/**
	 * Resolve an async component factory. Have to do a dirty
	 * mock here because of Vue core's internal API depends on
	 * an ID check.
	 *
	 * @param {Object} handler
	 * @param {Function} cb
	 */

	var resolver = undefined;

	function resolveAsyncComponent(handler, cb) {
	  if (!resolver) {
	    resolver = {
	      resolve: exports$1.Vue.prototype._resolveComponent,
	      $options: {
	        components: {
	          _: handler.component
	        }
	      }
	    };
	  } else {
	    resolver.$options.components._ = handler.component;
	  }
	  resolver.resolve('_', function (Component) {
	    handler.component = Component;
	    cb(Component);
	  });
	}

	/**
	 * Map the dynamic segments in a path to params.
	 *
	 * @param {String} path
	 * @param {Object} params
	 * @param {Object} query
	 */

	function mapParams(path, params, query) {
	  if (params === undefined) params = {};

	  path = path.replace(/:([^\/]+)/g, function (_, key) {
	    var val = params[key];
	    if (!val) {
	      warn('param "' + key + '" not found when generating ' + 'path for "' + path + '" with params ' + JSON.stringify(params));
	    }
	    return val || '';
	  });
	  if (query) {
	    path += genQuery(query);
	  }
	  return path;
	}

	var hashRE = /#.*$/;

	var HTML5History = (function () {
	  function HTML5History(_ref) {
	    var root = _ref.root;
	    var onChange = _ref.onChange;
	    babelHelpers.classCallCheck(this, HTML5History);

	    if (root) {
	      // make sure there's the starting slash
	      if (root.charAt(0) !== '/') {
	        root = '/' + root;
	      }
	      // remove trailing slash
	      this.root = root.replace(/\/$/, '');
	      this.rootRE = new RegExp('^\\' + this.root);
	    } else {
	      this.root = null;
	    }
	    this.onChange = onChange;
	    // check base tag
	    var baseEl = document.querySelector('base');
	    this.base = baseEl && baseEl.getAttribute('href');
	  }

	  HTML5History.prototype.start = function start() {
	    var _this = this;

	    this.listener = function (e) {
	      var url = decodeURI(location.pathname + location.search);
	      if (_this.root) {
	        url = url.replace(_this.rootRE, '');
	      }
	      _this.onChange(url, e && e.state, location.hash);
	    };
	    window.addEventListener('popstate', this.listener);
	    this.listener();
	  };

	  HTML5History.prototype.stop = function stop() {
	    window.removeEventListener('popstate', this.listener);
	  };

	  HTML5History.prototype.go = function go(path, replace, append) {
	    var url = this.formatPath(path, append);
	    if (replace) {
	      history.replaceState({}, '', url);
	    } else {
	      // record scroll position by replacing current state
	      history.replaceState({
	        pos: {
	          x: window.pageXOffset,
	          y: window.pageYOffset
	        }
	      }, '');
	      // then push new state
	      history.pushState({}, '', url);
	    }
	    var hashMatch = path.match(hashRE);
	    var hash = hashMatch && hashMatch[0];
	    path = url
	    // strip hash so it doesn't mess up params
	    .replace(hashRE, '')
	    // remove root before matching
	    .replace(this.rootRE, '');
	    this.onChange(path, null, hash);
	  };

	  HTML5History.prototype.formatPath = function formatPath(path, append) {
	    return path.charAt(0) === '/'
	    // absolute path
	    ? this.root ? this.root + '/' + path.replace(/^\//, '') : path : resolvePath(this.base || location.pathname, path, append);
	  };

	  return HTML5History;
	})();

	var HashHistory = (function () {
	  function HashHistory(_ref) {
	    var hashbang = _ref.hashbang;
	    var onChange = _ref.onChange;
	    babelHelpers.classCallCheck(this, HashHistory);

	    this.hashbang = hashbang;
	    this.onChange = onChange;
	  }

	  HashHistory.prototype.start = function start() {
	    var self = this;
	    this.listener = function () {
	      var path = location.hash;
	      var raw = path.replace(/^#!?/, '');
	      // always
	      if (raw.charAt(0) !== '/') {
	        raw = '/' + raw;
	      }
	      var formattedPath = self.formatPath(raw);
	      if (formattedPath !== path) {
	        location.replace(formattedPath);
	        return;
	      }
	      // determine query
	      // note it's possible to have queries in both the actual URL
	      // and the hash fragment itself.
	      var query = location.search && path.indexOf('?') > -1 ? '&' + location.search.slice(1) : location.search;
	      self.onChange(decodeURI(path.replace(/^#!?/, '') + query));
	    };
	    window.addEventListener('hashchange', this.listener);
	    this.listener();
	  };

	  HashHistory.prototype.stop = function stop() {
	    window.removeEventListener('hashchange', this.listener);
	  };

	  HashHistory.prototype.go = function go(path, replace, append) {
	    path = this.formatPath(path, append);
	    if (replace) {
	      location.replace(path);
	    } else {
	      location.hash = path;
	    }
	  };

	  HashHistory.prototype.formatPath = function formatPath(path, append) {
	    var isAbsoloute = path.charAt(0) === '/';
	    var prefix = '#' + (this.hashbang ? '!' : '');
	    return isAbsoloute ? prefix + path : prefix + resolvePath(location.hash.replace(/^#!?/, ''), path, append);
	  };

	  return HashHistory;
	})();

	var AbstractHistory = (function () {
	  function AbstractHistory(_ref) {
	    var onChange = _ref.onChange;
	    babelHelpers.classCallCheck(this, AbstractHistory);

	    this.onChange = onChange;
	    this.currentPath = '/';
	  }

	  AbstractHistory.prototype.start = function start() {
	    this.onChange('/');
	  };

	  AbstractHistory.prototype.stop = function stop() {
	    // noop
	  };

	  AbstractHistory.prototype.go = function go(path, replace, append) {
	    path = this.currentPath = this.formatPath(path, append);
	    this.onChange(path);
	  };

	  AbstractHistory.prototype.formatPath = function formatPath(path, append) {
	    return path.charAt(0) === '/' ? path : resolvePath(this.currentPath, path, append);
	  };

	  return AbstractHistory;
	})();

	/**
	 * Determine the reusability of an existing router view.
	 *
	 * @param {Directive} view
	 * @param {Object} handler
	 * @param {Transition} transition
	 */

	function canReuse(view, handler, transition) {
	  var component = view.childVM;
	  if (!component || !handler) {
	    return false;
	  }
	  // important: check view.Component here because it may
	  // have been changed in activate hook
	  if (view.Component !== handler.component) {
	    return false;
	  }
	  var canReuseFn = getRouteConfig(component, 'canReuse');
	  return typeof canReuseFn === 'boolean' ? canReuseFn : canReuseFn ? canReuseFn.call(component, {
	    to: transition.to,
	    from: transition.from
	  }) : true; // defaults to true
	}

	/**
	 * Check if a component can deactivate.
	 *
	 * @param {Directive} view
	 * @param {Transition} transition
	 * @param {Function} next
	 */

	function canDeactivate(view, transition, next) {
	  var fromComponent = view.childVM;
	  var hook = getRouteConfig(fromComponent, 'canDeactivate');
	  if (!hook) {
	    next();
	  } else {
	    transition.callHook(hook, fromComponent, next, {
	      expectBoolean: true
	    });
	  }
	}

	/**
	 * Check if a component can activate.
	 *
	 * @param {Object} handler
	 * @param {Transition} transition
	 * @param {Function} next
	 */

	function canActivate(handler, transition, next) {
	  resolveAsyncComponent(handler, function (Component) {
	    // have to check due to async-ness
	    if (transition.aborted) {
	      return;
	    }
	    // determine if this component can be activated
	    var hook = getRouteConfig(Component, 'canActivate');
	    if (!hook) {
	      next();
	    } else {
	      transition.callHook(hook, null, next, {
	        expectBoolean: true
	      });
	    }
	  });
	}

	/**
	 * Call deactivate hooks for existing router-views.
	 *
	 * @param {Directive} view
	 * @param {Transition} transition
	 * @param {Function} next
	 */

	function deactivate(view, transition, next) {
	  var component = view.childVM;
	  var hook = getRouteConfig(component, 'deactivate');
	  if (!hook) {
	    next();
	  } else {
	    transition.callHooks(hook, component, next);
	  }
	}

	/**
	 * Activate / switch component for a router-view.
	 *
	 * @param {Directive} view
	 * @param {Transition} transition
	 * @param {Number} depth
	 * @param {Function} [cb]
	 */

	function activate(view, transition, depth, cb, reuse) {
	  var handler = transition.activateQueue[depth];
	  if (!handler) {
	    // fix 1.0.0-alpha.3 compat
	    if (view._bound) {
	      view.setComponent(null);
	    }
	    cb && cb();
	    return;
	  }

	  var Component = view.Component = handler.component;
	  var activateHook = getRouteConfig(Component, 'activate');
	  var dataHook = getRouteConfig(Component, 'data');
	  var waitForData = getRouteConfig(Component, 'waitForData');

	  view.depth = depth;
	  view.activated = false;

	  var component = undefined;
	  var loading = !!(dataHook && !waitForData);

	  // "reuse" is a flag passed down when the parent view is
	  // either reused via keep-alive or as a child of a kept-alive view.
	  // of course we can only reuse if the current kept-alive instance
	  // is of the correct type.
	  reuse = reuse && view.childVM && view.childVM.constructor === Component;

	  if (reuse) {
	    // just reuse
	    component = view.childVM;
	    component.$loadingRouteData = loading;
	  } else {
	    // unbuild current component. this step also destroys
	    // and removes all nested child views.
	    view.unbuild(true);
	    // handle keep-alive.
	    // if the view has keep-alive, the child vm is not actually
	    // destroyed - its nested views will still be in router's
	    // view list. We need to removed these child views and
	    // cache them on the child vm.
	    if (view.keepAlive) {
	      var views = transition.router._views;
	      var i = views.indexOf(view);
	      if (i > 0) {
	        transition.router._views = views.slice(i);
	        if (view.childVM) {
	          view.childVM._routerViews = views.slice(0, i);
	        }
	      }
	    }

	    // build the new component. this will also create the
	    // direct child view of the current one. it will register
	    // itself as view.childView.
	    component = view.build({
	      _meta: {
	        $loadingRouteData: loading
	      }
	    });
	    // handle keep-alive.
	    // when a kept-alive child vm is restored, we need to
	    // add its cached child views into the router's view list,
	    // and also properly update current view's child view.
	    if (view.keepAlive) {
	      component.$loadingRouteData = loading;
	      var cachedViews = component._routerViews;
	      if (cachedViews) {
	        transition.router._views = cachedViews.concat(transition.router._views);
	        view.childView = cachedViews[cachedViews.length - 1];
	        component._routerViews = null;
	      }
	    }
	  }

	  // cleanup the component in case the transition is aborted
	  // before the component is ever inserted.
	  var cleanup = function cleanup() {
	    component.$destroy();
	  };

	  // actually insert the component and trigger transition
	  var insert = function insert() {
	    if (reuse) {
	      cb && cb();
	      return;
	    }
	    var router = transition.router;
	    if (router._rendered || router._transitionOnLoad) {
	      view.transition(component);
	    } else {
	      // no transition on first render, manual transition
	      /* istanbul ignore if */
	      if (view.setCurrent) {
	        // 0.12 compat
	        view.setCurrent(component);
	      } else {
	        // 1.0
	        view.childVM = component;
	      }
	      component.$before(view.anchor, null, false);
	    }
	    cb && cb();
	  };

	  // called after activation hook is resolved
	  var afterActivate = function afterActivate() {
	    view.activated = true;
	    // activate the child view
	    if (view.childView) {
	      activate(view.childView, transition, depth + 1, null, reuse || view.keepAlive);
	    }
	    if (dataHook && waitForData) {
	      // wait until data loaded to insert
	      loadData(component, transition, dataHook, insert, cleanup);
	    } else {
	      // load data and insert at the same time
	      if (dataHook) {
	        loadData(component, transition, dataHook);
	      }
	      insert();
	    }
	  };

	  if (activateHook) {
	    transition.callHooks(activateHook, component, afterActivate, {
	      cleanup: cleanup
	    });
	  } else {
	    afterActivate();
	  }
	}

	/**
	 * Reuse a view, just reload data if necessary.
	 *
	 * @param {Directive} view
	 * @param {Transition} transition
	 */

	function reuse(view, transition) {
	  var component = view.childVM;
	  var dataHook = getRouteConfig(component, 'data');
	  if (dataHook) {
	    loadData(component, transition, dataHook);
	  }
	}

	/**
	 * Asynchronously load and apply data to component.
	 *
	 * @param {Vue} component
	 * @param {Transition} transition
	 * @param {Function} hook
	 * @param {Function} cb
	 * @param {Function} cleanup
	 */

	function loadData(component, transition, hook, cb, cleanup) {
	  component.$loadingRouteData = true;
	  transition.callHooks(hook, component, function (data, onError) {
	    // merge data from multiple data hooks
	    if (Array.isArray(data) && data._needMerge) {
	      data = data.reduce(function (res, obj) {
	        if (isPlainObject(obj)) {
	          Object.keys(obj).forEach(function (key) {
	            res[key] = obj[key];
	          });
	        }
	        return res;
	      }, Object.create(null));
	    }
	    // handle promise sugar syntax
	    var promises = [];
	    if (isPlainObject(data)) {
	      Object.keys(data).forEach(function (key) {
	        var val = data[key];
	        if (isPromise(val)) {
	          promises.push(val.then(function (resolvedVal) {
	            component.$set(key, resolvedVal);
	          }));
	        } else {
	          component.$set(key, val);
	        }
	      });
	    }
	    if (!promises.length) {
	      component.$loadingRouteData = false;
	      cb && cb();
	    } else {
	      promises[0].constructor.all(promises).then(function (_) {
	        component.$loadingRouteData = false;
	        cb && cb();
	      }, onError);
	    }
	  }, {
	    cleanup: cleanup,
	    expectData: true
	  });
	}

	function isPlainObject(obj) {
	  return Object.prototype.toString.call(obj) === '[object Object]';
	}

	/**
	 * A RouteTransition object manages the pipeline of a
	 * router-view switching process. This is also the object
	 * passed into user route hooks.
	 *
	 * @param {Router} router
	 * @param {Route} to
	 * @param {Route} from
	 */

	var RouteTransition = (function () {
	  function RouteTransition(router, to, from) {
	    babelHelpers.classCallCheck(this, RouteTransition);

	    this.router = router;
	    this.to = to;
	    this.from = from;
	    this.next = null;
	    this.aborted = false;
	    this.done = false;

	    // start by determine the queues

	    // the deactivate queue is an array of router-view
	    // directive instances that need to be deactivated,
	    // deepest first.
	    this.deactivateQueue = router._views;

	    // check the default handler of the deepest match
	    var matched = to.matched ? Array.prototype.slice.call(to.matched) : [];

	    // the activate queue is an array of route handlers
	    // that need to be activated
	    this.activateQueue = matched.map(function (match) {
	      return match.handler;
	    });
	  }

	  /**
	   * Abort current transition and return to previous location.
	   */

	  RouteTransition.prototype.abort = function abort() {
	    if (!this.aborted) {
	      this.aborted = true;
	      // if the root path throws an error during validation
	      // on initial load, it gets caught in an infinite loop.
	      var abortingOnLoad = !this.from.path && this.to.path === '/';
	      if (!abortingOnLoad) {
	        this.router.replace(this.from.path || '/');
	      }
	    }
	  };

	  /**
	   * Abort current transition and redirect to a new location.
	   *
	   * @param {String} path
	   */

	  RouteTransition.prototype.redirect = function redirect(path) {
	    if (!this.aborted) {
	      this.aborted = true;
	      if (typeof path === 'string') {
	        path = mapParams(path, this.to.params, this.to.query);
	      } else {
	        path.params = path.params || this.to.params;
	        path.query = path.query || this.to.query;
	      }
	      this.router.replace(path);
	    }
	  };

	  /**
	   * A router view transition's pipeline can be described as
	   * follows, assuming we are transitioning from an existing
	   * <router-view> chain [Component A, Component B] to a new
	   * chain [Component A, Component C]:
	   *
	   *  A    A
	   *  | => |
	   *  B    C
	   *
	   * 1. Reusablity phase:
	   *   -> canReuse(A, A)
	   *   -> canReuse(B, C)
	   *   -> determine new queues:
	   *      - deactivation: [B]
	   *      - activation: [C]
	   *
	   * 2. Validation phase:
	   *   -> canDeactivate(B)
	   *   -> canActivate(C)
	   *
	   * 3. Activation phase:
	   *   -> deactivate(B)
	   *   -> activate(C)
	   *
	   * Each of these steps can be asynchronous, and any
	   * step can potentially abort the transition.
	   *
	   * @param {Function} cb
	   */

	  RouteTransition.prototype.start = function start(cb) {
	    var transition = this;
	    var daq = this.deactivateQueue;
	    var aq = this.activateQueue;
	    var rdaq = daq.slice().reverse();
	    var reuseQueue = undefined;

	    // 1. Reusability phase
	    var i = undefined;
	    for (i = 0; i < rdaq.length; i++) {
	      if (!canReuse(rdaq[i], aq[i], transition)) {
	        break;
	      }
	    }
	    if (i > 0) {
	      reuseQueue = rdaq.slice(0, i);
	      daq = rdaq.slice(i).reverse();
	      aq = aq.slice(i);
	    }

	    // 2. Validation phase
	    transition.runQueue(daq, canDeactivate, function () {
	      transition.runQueue(aq, canActivate, function () {
	        transition.runQueue(daq, deactivate, function () {
	          // 3. Activation phase

	          // Update router current route
	          transition.router._onTransitionValidated(transition);

	          // trigger reuse for all reused views
	          reuseQueue && reuseQueue.forEach(function (view) {
	            reuse(view, transition);
	          });

	          // the root of the chain that needs to be replaced
	          // is the top-most non-reusable view.
	          if (daq.length) {
	            var view = daq[daq.length - 1];
	            var depth = reuseQueue ? reuseQueue.length : 0;
	            activate(view, transition, depth, cb);
	          } else {
	            cb();
	          }
	        });
	      });
	    });
	  };

	  /**
	   * Asynchronously and sequentially apply a function to a
	   * queue.
	   *
	   * @param {Array} queue
	   * @param {Function} fn
	   * @param {Function} cb
	   */

	  RouteTransition.prototype.runQueue = function runQueue(queue, fn, cb) {
	    var transition = this;
	    step(0);
	    function step(index) {
	      if (index >= queue.length) {
	        cb();
	      } else {
	        fn(queue[index], transition, function () {
	          step(index + 1);
	        });
	      }
	    }
	  };

	  /**
	   * Call a user provided route transition hook and handle
	   * the response (e.g. if the user returns a promise).
	   *
	   * If the user neither expects an argument nor returns a
	   * promise, the hook is assumed to be synchronous.
	   *
	   * @param {Function} hook
	   * @param {*} [context]
	   * @param {Function} [cb]
	   * @param {Object} [options]
	   *                 - {Boolean} expectBoolean
	   *                 - {Boolean} expectData
	   *                 - {Function} cleanup
	   */

	  RouteTransition.prototype.callHook = function callHook(hook, context, cb) {
	    var _ref = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

	    var _ref$expectBoolean = _ref.expectBoolean;
	    var expectBoolean = _ref$expectBoolean === undefined ? false : _ref$expectBoolean;
	    var _ref$expectData = _ref.expectData;
	    var expectData = _ref$expectData === undefined ? false : _ref$expectData;
	    var cleanup = _ref.cleanup;

	    var transition = this;
	    var nextCalled = false;

	    // abort the transition
	    var abort = function abort() {
	      cleanup && cleanup();
	      transition.abort();
	    };

	    // handle errors
	    var onError = function onError(err) {
	      // cleanup indicates an after-activation hook,
	      // so instead of aborting we just let the transition
	      // finish.
	      cleanup ? next() : abort();
	      if (err && !transition.router._suppress) {
	        warn('Uncaught error during transition: ');
	        throw err instanceof Error ? err : new Error(err);
	      }
	    };

	    // advance the transition to the next step
	    var next = function next(data) {
	      if (nextCalled) {
	        warn('transition.next() should be called only once.');
	        return;
	      }
	      nextCalled = true;
	      if (transition.aborted) {
	        cleanup && cleanup();
	        return;
	      }
	      cb && cb(data, onError);
	    };

	    // expose a clone of the transition object, so that each
	    // hook gets a clean copy and prevent the user from
	    // messing with the internals.
	    var exposed = {
	      to: transition.to,
	      from: transition.from,
	      abort: abort,
	      next: next,
	      redirect: function redirect() {
	        transition.redirect.apply(transition, arguments);
	      }
	    };

	    // actually call the hook
	    var res = undefined;
	    try {
	      res = hook.call(context, exposed);
	    } catch (err) {
	      return onError(err);
	    }

	    // handle boolean/promise return values
	    var resIsPromise = isPromise(res);
	    if (expectBoolean) {
	      if (typeof res === 'boolean') {
	        res ? next() : abort();
	      } else if (resIsPromise) {
	        res.then(function (ok) {
	          ok ? next() : abort();
	        }, onError);
	      } else if (!hook.length) {
	        next(res);
	      }
	    } else if (resIsPromise) {
	      res.then(next, onError);
	    } else if (expectData && isPlainOjbect(res) || !hook.length) {
	      next(res);
	    }
	  };

	  /**
	   * Call a single hook or an array of async hooks in series.
	   *
	   * @param {Array} hooks
	   * @param {*} context
	   * @param {Function} cb
	   * @param {Object} [options]
	   */

	  RouteTransition.prototype.callHooks = function callHooks(hooks, context, cb, options) {
	    var _this = this;

	    if (Array.isArray(hooks)) {
	      (function () {
	        var res = [];
	        res._needMerge = true;
	        var onError = undefined;
	        _this.runQueue(hooks, function (hook, _, next) {
	          if (!_this.aborted) {
	            _this.callHook(hook, context, function (r, onError) {
	              if (r) res.push(r);
	              onError = onError;
	              next();
	            }, options);
	          }
	        }, function () {
	          cb(res, onError);
	        });
	      })();
	    } else {
	      this.callHook(hooks, context, cb, options);
	    }
	  };

	  return RouteTransition;
	})();

	function isPlainOjbect(val) {
	  return Object.prototype.toString.call(val) === '[object Object]';
	}

	var internalKeysRE = /^(component|subRoutes)$/;

	/**
	 * Route Context Object
	 *
	 * @param {String} path
	 * @param {Router} router
	 */

	var Route = function Route(path, router) {
	  var _this = this;

	  babelHelpers.classCallCheck(this, Route);

	  var matched = router._recognizer.recognize(path);
	  if (matched) {
	    // copy all custom fields from route configs
	    [].forEach.call(matched, function (match) {
	      for (var key in match.handler) {
	        if (!internalKeysRE.test(key)) {
	          _this[key] = match.handler[key];
	        }
	      }
	    });
	    // set query and params
	    this.query = matched.queryParams;
	    this.params = [].reduce.call(matched, function (prev, cur) {
	      if (cur.params) {
	        for (var key in cur.params) {
	          prev[key] = cur.params[key];
	        }
	      }
	      return prev;
	    }, {});
	  }
	  // expose path and router
	  this.path = path;
	  this.router = router;
	  // for internal use
	  this.matched = matched || router._notFoundHandler;
	  // Important: freeze self to prevent observation
	  Object.freeze(this);
	};

	function applyOverride (Vue) {

	  var _ = Vue.util;

	  // override Vue's init and destroy process to keep track of router instances
	  var init = Vue.prototype._init;
	  Vue.prototype._init = function (options) {
	    var root = options._parent || options.parent || this;
	    var route = root.$route;
	    if (route) {
	      route.router._children.push(this);
	      if (!this.$route) {
	        /* istanbul ignore if */
	        if (this._defineMeta) {
	          // 0.12
	          this._defineMeta('$route', route);
	        } else {
	          // 1.0
	          _.defineReactive(this, '$route', route);
	        }
	      }
	    }
	    init.call(this, options);
	  };

	  var destroy = Vue.prototype._destroy;
	  Vue.prototype._destroy = function () {
	    if (!this._isBeingDestroyed) {
	      var route = this.$root.$route;
	      if (route) {
	        route.router._children.$remove(this);
	      }
	      destroy.apply(this, arguments);
	    }
	  };

	  // 1.0 only: enable route mixins
	  var strats = Vue.config.optionMergeStrategies;
	  var hooksToMergeRE = /^(data|activate|deactivate)$/;

	  if (strats) {
	    strats.route = function (parentVal, childVal) {
	      if (!childVal) return parentVal;
	      if (!parentVal) return childVal;
	      var ret = {};
	      _.extend(ret, parentVal);
	      for (var key in childVal) {
	        var a = ret[key];
	        var b = childVal[key];
	        // for data, activate and deactivate, we need to merge them into
	        // arrays similar to lifecycle hooks.
	        if (a && hooksToMergeRE.test(key)) {
	          ret[key] = (_.isArray(a) ? a : [a]).concat(b);
	        } else {
	          ret[key] = b;
	        }
	      }
	      return ret;
	    };
	  }
	}

	function View (Vue) {

	  var _ = Vue.util;
	  var componentDef =
	  // 0.12
	  Vue.directive('_component') ||
	  // 1.0
	  Vue.internalDirectives.component;
	  // <router-view> extends the internal component directive
	  var viewDef = _.extend({}, componentDef);

	  // with some overrides
	  _.extend(viewDef, {

	    _isRouterView: true,

	    bind: function bind() {
	      var route = this.vm.$route;
	      /* istanbul ignore if */
	      if (!route) {
	        warn('<router-view> can only be used inside a ' + 'router-enabled app.');
	        return;
	      }
	      // force dynamic directive so v-component doesn't
	      // attempt to build right now
	      this._isDynamicLiteral = true;
	      // finally, init by delegating to v-component
	      componentDef.bind.call(this);

	      // all we need to do here is registering this view
	      // in the router. actual component switching will be
	      // managed by the pipeline.
	      var router = this.router = route.router;
	      router._views.unshift(this);

	      // note the views are in reverse order.
	      var parentView = router._views[1];
	      if (parentView) {
	        // register self as a child of the parent view,
	        // instead of activating now. This is so that the
	        // child's activate hook is called after the
	        // parent's has resolved.
	        parentView.childView = this;
	      }

	      // handle late-rendered view
	      // two possibilities:
	      // 1. root view rendered after transition has been
	      //    validated;
	      // 2. child view rendered after parent view has been
	      //    activated.
	      var transition = route.router._currentTransition;
	      if (!parentView && transition.done || parentView && parentView.activated) {
	        var depth = parentView ? parentView.depth + 1 : 0;
	        activate(this, transition, depth);
	      }
	    },

	    unbind: function unbind() {
	      this.router._views.$remove(this);
	      componentDef.unbind.call(this);
	    }
	  });

	  Vue.elementDirective('router-view', viewDef);
	}

	var trailingSlashRE = /\/$/;
	var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
	var queryStringRE = /\?.*$/;

	// install v-link, which provides navigation support for
	// HTML5 history mode
	function Link (Vue) {

	  var _ = Vue.util;

	  Vue.directive('link', {

	    bind: function bind() {
	      var _this = this;

	      var vm = this.vm;
	      /* istanbul ignore if */
	      if (!vm.$route) {
	        warn('v-link can only be used inside a ' + 'router-enabled app.');
	        return;
	      }
	      // no need to handle click if link expects to be opened
	      // in a new window/tab.
	      /* istanbul ignore if */
	      if (this.el.tagName === 'A' && this.el.getAttribute('target') === '_blank') {
	        return;
	      }
	      // handle click
	      var router = vm.$route.router;
	      this.handler = function (e) {
	        // don't redirect with control keys
	        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
	        // don't redirect when preventDefault called
	        if (e.defaultPrevented) return;
	        // don't redirect on right click
	        if (e.button !== 0) return;

	        var target = _this.target;
	        var go = function go(target) {
	          e.preventDefault();
	          if (target != null) {
	            router.go(target);
	          }
	        };

	        if (_this.el.tagName === 'A' || e.target === _this.el) {
	          // v-link on <a v-link="'path'">
	          go(target);
	        } else {
	          // v-link delegate on <div v-link>
	          var el = e.target;
	          while (el && el.tagName !== 'A' && el !== _this.el) {
	            el = el.parentNode;
	          }
	          if (!el) return;
	          if (el.tagName !== 'A' || !el.href) {
	            // allow not anchor
	            go(target);
	          } else if (sameOrigin(el)) {
	            go({
	              path: el.pathname,
	              replace: target && target.replace,
	              append: target && target.append
	            });
	          }
	        }
	      };
	      this.el.addEventListener('click', this.handler);
	      // manage active link class
	      this.unwatch = vm.$watch('$route.path', _.bind(this.updateClasses, this));
	    },

	    update: function update(path) {
	      var router = this.vm.$route.router;
	      var append = undefined;
	      this.target = path;
	      if (_.isObject(path)) {
	        append = path.append;
	        this.exact = path.exact;
	        this.prevActiveClass = this.activeClass;
	        this.activeClass = path.activeClass;
	      }
	      path = this.path = router._stringifyPath(path);
	      this.activeRE = path && !this.exact ? new RegExp('^' + path.replace(/\/$/, '').replace(regexEscapeRE, '\\$&') + '(\\/|$)') : null;
	      this.updateClasses(this.vm.$route.path);
	      var isAbsolute = path.charAt(0) === '/';
	      // do not format non-hash relative paths
	      var href = path && (router.mode === 'hash' || isAbsolute) ? router.history.formatPath(path, append) : path;
	      if (this.el.tagName === 'A') {
	        if (href) {
	          this.el.href = href;
	        } else {
	          this.el.removeAttribute('href');
	        }
	      }
	    },

	    updateClasses: function updateClasses(path) {
	      var el = this.el;
	      var router = this.vm.$route.router;
	      var activeClass = this.activeClass || router._linkActiveClass;
	      // clear old class
	      if (this.prevActiveClass !== activeClass) {
	        _.removeClass(el, this.prevActiveClass);
	      }
	      // remove query string before matching
	      var dest = this.path.replace(queryStringRE, '');
	      path = path.replace(queryStringRE, '');
	      // add new class
	      if (this.exact) {
	        if (dest === path ||
	        // also allow additional trailing slash
	        dest.charAt(dest.length - 1) !== '/' && dest === path.replace(trailingSlashRE, '')) {
	          _.addClass(el, activeClass);
	        } else {
	          _.removeClass(el, activeClass);
	        }
	      } else {
	        if (this.activeRE && this.activeRE.test(path)) {
	          _.addClass(el, activeClass);
	        } else {
	          _.removeClass(el, activeClass);
	        }
	      }
	    },

	    unbind: function unbind() {
	      this.el.removeEventListener('click', this.handler);
	      this.unwatch && this.unwatch();
	    }
	  });

	  function sameOrigin(link) {
	    return link.protocol === location.protocol && link.hostname === location.hostname && link.port === location.port;
	  }
	}

	var historyBackends = {
	  abstract: AbstractHistory,
	  hash: HashHistory,
	  html5: HTML5History
	};

	// late bind during install
	var Vue = undefined;

	/**
	 * Router constructor
	 *
	 * @param {Object} [options]
	 */

	var Router = (function () {
	  function Router() {
	    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    var _ref$hashbang = _ref.hashbang;
	    var hashbang = _ref$hashbang === undefined ? true : _ref$hashbang;
	    var _ref$abstract = _ref.abstract;
	    var abstract = _ref$abstract === undefined ? false : _ref$abstract;
	    var _ref$history = _ref.history;
	    var history = _ref$history === undefined ? false : _ref$history;
	    var _ref$saveScrollPosition = _ref.saveScrollPosition;
	    var saveScrollPosition = _ref$saveScrollPosition === undefined ? false : _ref$saveScrollPosition;
	    var _ref$transitionOnLoad = _ref.transitionOnLoad;
	    var transitionOnLoad = _ref$transitionOnLoad === undefined ? false : _ref$transitionOnLoad;
	    var _ref$suppressTransitionError = _ref.suppressTransitionError;
	    var suppressTransitionError = _ref$suppressTransitionError === undefined ? false : _ref$suppressTransitionError;
	    var _ref$root = _ref.root;
	    var root = _ref$root === undefined ? null : _ref$root;
	    var _ref$linkActiveClass = _ref.linkActiveClass;
	    var linkActiveClass = _ref$linkActiveClass === undefined ? 'v-link-active' : _ref$linkActiveClass;
	    babelHelpers.classCallCheck(this, Router);

	    /* istanbul ignore if */
	    if (!Router.installed) {
	      throw new Error('Please install the Router with Vue.use() before ' + 'creating an instance.');
	    }

	    // Vue instances
	    this.app = null;
	    this._views = [];
	    this._children = [];

	    // route recognizer
	    this._recognizer = new RouteRecognizer();
	    this._guardRecognizer = new RouteRecognizer();

	    // state
	    this._started = false;
	    this._startCb = null;
	    this._currentRoute = {};
	    this._currentTransition = null;
	    this._previousTransition = null;
	    this._notFoundHandler = null;
	    this._notFoundRedirect = null;
	    this._beforeEachHooks = [];
	    this._afterEachHooks = [];

	    // feature detection
	    this._hasPushState = typeof window !== 'undefined' && window.history && window.history.pushState;

	    // trigger transition on initial render?
	    this._rendered = false;
	    this._transitionOnLoad = transitionOnLoad;

	    // history mode
	    this._abstract = abstract;
	    this._hashbang = hashbang;
	    this._history = this._hasPushState && history;

	    // other options
	    this._saveScrollPosition = saveScrollPosition;
	    this._linkActiveClass = linkActiveClass;
	    this._suppress = suppressTransitionError;

	    // create history object
	    var inBrowser = Vue.util.inBrowser;
	    this.mode = !inBrowser || this._abstract ? 'abstract' : this._history ? 'html5' : 'hash';

	    var History = historyBackends[this.mode];
	    var self = this;
	    this.history = new History({
	      root: root,
	      hashbang: this._hashbang,
	      onChange: function onChange(path, state, anchor) {
	        self._match(path, state, anchor);
	      }
	    });
	  }

	  /**
	   * Allow directly passing components to a route
	   * definition.
	   *
	   * @param {String} path
	   * @param {Object} handler
	   */

	  // API ===================================================

	  /**
	  * Register a map of top-level paths.
	  *
	  * @param {Object} map
	  */

	  Router.prototype.map = function map(_map) {
	    for (var route in _map) {
	      this.on(route, _map[route]);
	    }
	  };

	  /**
	   * Register a single root-level path
	   *
	   * @param {String} rootPath
	   * @param {Object} handler
	   *                 - {String} component
	   *                 - {Object} [subRoutes]
	   *                 - {Boolean} [forceRefresh]
	   *                 - {Function} [before]
	   *                 - {Function} [after]
	   */

	  Router.prototype.on = function on(rootPath, handler) {
	    if (rootPath === '*') {
	      this._notFound(handler);
	    } else {
	      this._addRoute(rootPath, handler, []);
	    }
	  };

	  /**
	   * Set redirects.
	   *
	   * @param {Object} map
	   */

	  Router.prototype.redirect = function redirect(map) {
	    for (var path in map) {
	      this._addRedirect(path, map[path]);
	    }
	  };

	  /**
	   * Set aliases.
	   *
	   * @param {Object} map
	   */

	  Router.prototype.alias = function alias(map) {
	    for (var path in map) {
	      this._addAlias(path, map[path]);
	    }
	  };

	  /**
	   * Set global before hook.
	   *
	   * @param {Function} fn
	   */

	  Router.prototype.beforeEach = function beforeEach(fn) {
	    this._beforeEachHooks.push(fn);
	  };

	  /**
	   * Set global after hook.
	   *
	   * @param {Function} fn
	   */

	  Router.prototype.afterEach = function afterEach(fn) {
	    this._afterEachHooks.push(fn);
	  };

	  /**
	   * Navigate to a given path.
	   * The path can be an object describing a named path in
	   * the format of { name: '...', params: {}, query: {}}
	   * The path is assumed to be already decoded, and will
	   * be resolved against root (if provided)
	   *
	   * @param {String|Object} path
	   * @param {Boolean} [replace]
	   */

	  Router.prototype.go = function go(path) {
	    var replace = false;
	    var append = false;
	    if (Vue.util.isObject(path)) {
	      replace = path.replace;
	      append = path.append;
	    }
	    path = this._stringifyPath(path);
	    if (path) {
	      this.history.go(path, replace, append);
	    }
	  };

	  /**
	   * Short hand for replacing current path
	   *
	   * @param {String} path
	   */

	  Router.prototype.replace = function replace(path) {
	    if (typeof path === 'string') {
	      path = { path: path };
	    }
	    path.replace = true;
	    this.go(path);
	  };

	  /**
	   * Start the router.
	   *
	   * @param {VueConstructor} App
	   * @param {String|Element} container
	   * @param {Function} [cb]
	   */

	  Router.prototype.start = function start(App, container, cb) {
	    /* istanbul ignore if */
	    if (this._started) {
	      warn('already started.');
	      return;
	    }
	    this._started = true;
	    this._startCb = cb;
	    if (!this.app) {
	      /* istanbul ignore if */
	      if (!App || !container) {
	        throw new Error('Must start vue-router with a component and a ' + 'root container.');
	      }
	      this._appContainer = container;
	      var Ctor = this._appConstructor = typeof App === 'function' ? App : Vue.extend(App);
	      // give it a name for better debugging
	      Ctor.options.name = Ctor.options.name || 'RouterApp';
	    }
	    this.history.start();
	  };

	  /**
	   * Stop listening to route changes.
	   */

	  Router.prototype.stop = function stop() {
	    this.history.stop();
	    this._started = false;
	  };

	  // Internal methods ======================================

	  /**
	  * Add a route containing a list of segments to the internal
	  * route recognizer. Will be called recursively to add all
	  * possible sub-routes.
	  *
	  * @param {String} path
	  * @param {Object} handler
	  * @param {Array} segments
	  */

	  Router.prototype._addRoute = function _addRoute(path, handler, segments) {
	    guardComponent(path, handler);
	    handler.path = path;
	    handler.fullPath = (segments.reduce(function (path, segment) {
	      return path + segment.path;
	    }, '') + path).replace('//', '/');
	    segments.push({
	      path: path,
	      handler: handler
	    });
	    this._recognizer.add(segments, {
	      as: handler.name
	    });
	    // add sub routes
	    if (handler.subRoutes) {
	      for (var subPath in handler.subRoutes) {
	        // recursively walk all sub routes
	        this._addRoute(subPath, handler.subRoutes[subPath],
	        // pass a copy in recursion to avoid mutating
	        // across branches
	        segments.slice());
	      }
	    }
	  };

	  /**
	   * Set the notFound route handler.
	   *
	   * @param {Object} handler
	   */

	  Router.prototype._notFound = function _notFound(handler) {
	    guardComponent('*', handler);
	    this._notFoundHandler = [{ handler: handler }];
	  };

	  /**
	   * Add a redirect record.
	   *
	   * @param {String} path
	   * @param {String} redirectPath
	   */

	  Router.prototype._addRedirect = function _addRedirect(path, redirectPath) {
	    if (path === '*') {
	      this._notFoundRedirect = redirectPath;
	    } else {
	      this._addGuard(path, redirectPath, this.replace);
	    }
	  };

	  /**
	   * Add an alias record.
	   *
	   * @param {String} path
	   * @param {String} aliasPath
	   */

	  Router.prototype._addAlias = function _addAlias(path, aliasPath) {
	    this._addGuard(path, aliasPath, this._match);
	  };

	  /**
	   * Add a path guard.
	   *
	   * @param {String} path
	   * @param {String} mappedPath
	   * @param {Function} handler
	   */

	  Router.prototype._addGuard = function _addGuard(path, mappedPath, _handler) {
	    var _this = this;

	    this._guardRecognizer.add([{
	      path: path,
	      handler: function handler(match, query) {
	        var realPath = mapParams(mappedPath, match.params, query);
	        _handler.call(_this, realPath);
	      }
	    }]);
	  };

	  /**
	   * Check if a path matches any redirect records.
	   *
	   * @param {String} path
	   * @return {Boolean} - if true, will skip normal match.
	   */

	  Router.prototype._checkGuard = function _checkGuard(path) {
	    var matched = this._guardRecognizer.recognize(path);
	    if (matched) {
	      matched[0].handler(matched[0], matched.queryParams);
	      return true;
	    } else if (this._notFoundRedirect) {
	      matched = this._recognizer.recognize(path);
	      if (!matched) {
	        this.replace(this._notFoundRedirect);
	        return true;
	      }
	    }
	  };

	  /**
	   * Match a URL path and set the route context on vm,
	   * triggering view updates.
	   *
	   * @param {String} path
	   * @param {Object} [state]
	   * @param {String} [anchor]
	   */

	  Router.prototype._match = function _match(path, state, anchor) {
	    var _this2 = this;

	    if (this._checkGuard(path)) {
	      return;
	    }

	    var currentRoute = this._currentRoute;
	    var currentTransition = this._currentTransition;

	    if (currentTransition) {
	      if (currentTransition.to.path === path) {
	        // do nothing if we have an active transition going to the same path
	        return;
	      } else if (currentRoute.path === path) {
	        // We are going to the same path, but we also have an ongoing but
	        // not-yet-validated transition. Abort that transition and reset to
	        // prev transition.
	        currentTransition.aborted = true;
	        this._currentTransition = this._prevTransition;
	        return;
	      } else {
	        // going to a totally different path. abort ongoing transition.
	        currentTransition.aborted = true;
	      }
	    }

	    // construct new route and transition context
	    var route = new Route(path, this);
	    var transition = new RouteTransition(this, route, currentRoute);

	    // current transition is updated right now.
	    // however, current route will only be updated after the transition has
	    // been validated.
	    this._prevTransition = currentTransition;
	    this._currentTransition = transition;

	    if (!this.app) {
	      // initial render
	      this.app = new this._appConstructor({
	        el: this._appContainer,
	        _meta: {
	          $route: route
	        }
	      });
	    }

	    // check global before hook
	    var beforeHooks = this._beforeEachHooks;
	    var startTransition = function startTransition() {
	      transition.start(function () {
	        _this2._postTransition(route, state, anchor);
	      });
	    };

	    if (beforeHooks.length) {
	      transition.runQueue(beforeHooks, function (hook, _, next) {
	        if (transition === _this2._currentTransition) {
	          transition.callHook(hook, null, next, {
	            expectBoolean: true
	          });
	        }
	      }, startTransition);
	    } else {
	      startTransition();
	    }

	    if (!this._rendered && this._startCb) {
	      this._startCb.call(null);
	    }

	    // HACK:
	    // set rendered to true after the transition start, so
	    // that components that are acitvated synchronously know
	    // whether it is the initial render.
	    this._rendered = true;
	  };

	  /**
	   * Set current to the new transition.
	   * This is called by the transition object when the
	   * validation of a route has succeeded.
	   *
	   * @param {Transition} transition
	   */

	  Router.prototype._onTransitionValidated = function _onTransitionValidated(transition) {
	    // set current route
	    var route = this._currentRoute = transition.to;
	    // update route context for all children
	    if (this.app.$route !== route) {
	      this.app.$route = route;
	      this._children.forEach(function (child) {
	        child.$route = route;
	      });
	    }
	    // call global after hook
	    if (this._afterEachHooks.length) {
	      this._afterEachHooks.forEach(function (hook) {
	        return hook.call(null, {
	          to: transition.to,
	          from: transition.from
	        });
	      });
	    }
	    this._currentTransition.done = true;
	  };

	  /**
	   * Handle stuff after the transition.
	   *
	   * @param {Route} route
	   * @param {Object} [state]
	   * @param {String} [anchor]
	   */

	  Router.prototype._postTransition = function _postTransition(route, state, anchor) {
	    // handle scroll positions
	    // saved scroll positions take priority
	    // then we check if the path has an anchor
	    var pos = state && state.pos;
	    if (pos && this._saveScrollPosition) {
	      Vue.nextTick(function () {
	        window.scrollTo(pos.x, pos.y);
	      });
	    } else if (anchor) {
	      Vue.nextTick(function () {
	        var el = document.getElementById(anchor.slice(1));
	        if (el) {
	          window.scrollTo(window.scrollX, el.offsetTop);
	        }
	      });
	    }
	  };

	  /**
	   * Normalize named route object / string paths into
	   * a string.
	   *
	   * @param {Object|String|Number} path
	   * @return {String}
	   */

	  Router.prototype._stringifyPath = function _stringifyPath(path) {
	    if (path && typeof path === 'object') {
	      if (path.name) {
	        var params = path.params || {};
	        if (path.query) {
	          params.queryParams = path.query;
	        }
	        return this._recognizer.generate(path.name, params);
	      } else if (path.path) {
	        var fullPath = path.path;
	        if (path.query) {
	          var query = this._recognizer.generateQueryString(path.query);
	          if (fullPath.indexOf('?') > -1) {
	            fullPath += '&' + query.slice(1);
	          } else {
	            fullPath += query;
	          }
	        }
	        return fullPath;
	      } else {
	        return '';
	      }
	    } else {
	      return path ? path + '' : '';
	    }
	  };

	  return Router;
	})();

	function guardComponent(path, handler) {
	  var comp = handler.component;
	  if (Vue.util.isPlainObject(comp)) {
	    comp = handler.component = Vue.extend(comp);
	  }
	  /* istanbul ignore if */
	  if (typeof comp !== 'function') {
	    handler.component = null;
	    warn('invalid component for route "' + path + '".');
	  }
	}

	/* Installation */

	Router.installed = false;

	/**
	 * Installation interface.
	 * Install the necessary directives.
	 */

	Router.install = function (externalVue) {
	  /* istanbul ignore if */
	  if (Router.installed) {
	    warn('already installed.');
	    return;
	  }
	  Vue = externalVue;
	  applyOverride(Vue);
	  View(Vue);
	  Link(Vue);
	  exports$1.Vue = Vue;
	  Router.installed = true;
	};

	// auto install
	/* istanbul ignore if */
	if (typeof window !== 'undefined' && window.Vue) {
	  window.Vue.use(Router);
	}

	module.exports = Router;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Import(s)
	 */

	var validates = __webpack_require__(21)
	var _ = __webpack_require__(22)


	/**
	 * Export(s)
	 */

	module.exports = install


	/**
	 * Install plugin
	 */

	function install (Vue, options) {
	  options = options || {}
	  var componentName = options.component = options.component || '$validator'
	  var directiveName = options.directive = options.directive || 'validate'
	  var path = Vue.parsers.path
	  var util = Vue.util


	  // custom validators merge strategy setting
	  Vue.config.optionMergeStrategies.validator = function (parent, child, vm, k) {
	    var validatorOptions = { validates: {}, namespace: {} }
	    if (!parent && !child) {
	      return validatorOptions
	    } else if (!parent && child) {
	      util.extend(validatorOptions['validates'], child['validates'])
	      util.extend(validatorOptions['namespace'], child['namespace'])
	      return validatorOptions
	    } else if (parent && !child) {
	      util.extend(validatorOptions['validates'], parent['validates'])
	      util.extend(validatorOptions['namespace'], parent['namespace'])
	      return validatorOptions
	    } else if (parent && child) {
	      var key
	      if ('validates' in parent) {
	        util.extend(validatorOptions['validates'], parent['validates'])
	      }
	      if ('namespace' in parent) {
	        util.extend(validatorOptions['namespace'], parent['namespace'])
	      }
	      if ('validates' in child) {
	        for (key in child['validates']) {
	          if ('validates' in parent && !parent['validates'].hasOwnProperty(key)) {
	            validatorOptions['validates'][key] = child['validates'][key]
	          }
	        }
	      }
	      if ('namespace' in child) {
	        for (key in child['namespace']) {
	          if ('namespace' in parent && !parent['namespace'].hasOwnProperty(key)) {
	            validatorOptions['namespace'][key] = child['namespace'][key]
	          }
	        }
	      }
	      return validatorOptions
	    } else {
	      _.warn('unexpected validator option merge strategy')
	      return validatorOptions
	    }
	  }


	  function getVal (obj, keypath) {
	    var ret = null
	    try {
	      ret = path.get(obj, keypath)
	    } catch (e) { }
	    return ret
	  }


	  Vue.directive(directiveName, {

	    priority: 1024,

	    bind: function () {
	      var vm = this.vm
	      var el = this.el
	      var $validator = vm[componentName]
	      var keypath = this._keypath = this._parseModelAttribute(el.getAttribute(Vue.config.prefix + 'model'))
	      var validator = this.arg ? this.arg : this.expression
	      var arg = this.arg ? this.expression : null

	      var customs = _.getCustomValidators(vm.$options)
	      if (!this._checkValidator(validator, validates, customs)) {
	        _.warn("specified invalid '"
	          + validator + "' validator at v-validate directive !! please check '"
	          + validator + "' validator !!")
	        this._ignore = true
	        return
	      }

	      if (!$validator) {
	        vm[componentName] = $validator = vm.$addChild(
	          {}, // null option
	          Vue.extend(__webpack_require__(23))
	        )
	      }

	      var value = el.getAttribute('value')
	      if (el.getAttribute('number') !== null) {
	        value = util.toNumber(value)
	      }
	      this._init = value

	      var validation = $validator._getValidationNamespace('validation')
	      var init = value || vm.$get(keypath)
	      var readyEvent = el.getAttribute('wait-for')

	      if (readyEvent && !$validator._isRegistedReadyEvent(keypath)) {
	        $validator._addReadyEvents(keypath, this._checkParam('wait-for'))
	      }
	      
	      this._setupValidator($validator, keypath, validation, validator, el, arg, init)
	    },

	    update: function (val, old) {
	      if (this._ignore) { return }

	      var self = this
	      var vm = this.vm
	      var keypath = this._keypath
	      var validator = this.arg ? this.arg : this.expression
	      var $validator = vm[componentName]

	      $validator._changeValidator(keypath, validator, val)
	      if (!$validator._isRegistedReadyEvent(keypath)) { // normal
	        this._updateValidator($validator, validator, keypath)
	      } else { // wait-for
	        vm.$once($validator._getReadyEvents(keypath), function (val) {
	          $validator._setInitialValue(keypath, val)
	          vm.$set(keypath, val)
	          self._updateValidator($validator, validator, keypath)
	        })
	      }
	    },

	     
	    unbind: function () {
	      if (this._ignore) { return }

	      var vm = this.vm
	      var keypath = this._keypath
	      var validator = this.arg ? this.arg : this.expression
	      var $validator = vm[componentName]

	      this._teardownValidator(vm, $validator, keypath, validator)
	    },

	    _parseModelAttribute: function (attr) {
	      var res = Vue.parsers.directive.parse(attr)
	      return res[0].arg ? res[0].arg : res[0].expression
	    },

	    _checkValidator: function (validator, validates, customs) {
	      var items = Object.keys(validates).concat(Object.keys(customs))
	      return items.some(function (item) {
	        return item === validator
	      })
	    },

	    _setupValidator: function ($validator, keypath, validation, validator, el, arg, init) {
	      var vm = this.vm

	      if (!getVal($validator[validation], keypath)) {
	        $validator._defineModelValidationScope(keypath)
	        if (el.tagName === 'INPUT' && el.type === 'radio') {
	          if (getVal(vm, keypath) === init) {
	            $validator._setInitialValue(keypath, init)
	          }
	        } else {
	          $validator._setInitialValue(keypath, init)
	        }
	      }

	      if (!getVal($validator[validation], [keypath, validator].join('.'))) {
	        $validator._defineValidatorToValidationScope(keypath, validator)
	        $validator._addValidator(keypath, validator, getVal(vm, arg) || arg)
	      }
	    },

	    _updateValidator: function ($validator, validator, keypath) {
	      var value = $validator.$get(keypath)
	      var el = this.el

	      if (this._init) {
	        value = this._init
	        delete this._init
	      }

	      if (el.tagName === 'INPUT' && el.type === 'radio') {
	        if (value === $validator.$get(keypath)) {
	          $validator._updateDirtyProperty(keypath, value)
	        }
	      } else {
	        $validator._updateDirtyProperty(keypath, value)
	      }

	      $validator._doValidate(keypath, validator, $validator.$get(keypath))
	    },

	    _teardownValidator: function (vm, $validator, keypath, validator) {
	      $validator._undefineValidatorToValidationScope(keypath, validator)
	      $validator._undefineModelValidationScope(keypath, validator)
	    }
	  })
	}


/***/ },
/* 21 */
/***/ function(module, exports) {

	/**
	 * Fundamental validate functions
	 */


	/**
	 * required
	 *
	 * This function validate whether the value has been filled out.
	 *
	 * @param val
	 * @return {Boolean}
	 */

	function required (val) {
	  if (Array.isArray(val)) {
	    return val.length > 0
	  } else if (typeof val === 'number') {
	    return true
	  } else if ((val !== null) && (typeof val === 'object')) {
	    return Object.keys(val).length > 0
	  } else {
	    return !val
	      ? false
	      : true
	  }
	}


	/**
	 * pattern
	 *
	 * This function validate whether the value matches the regex pattern
	 *
	 * @param val
	 * @param {String} pat
	 * @return {Boolean}
	 */

	function pattern (val, pat) {
	  if (typeof pat !== 'string') { return false }

	  var match = pat.match(new RegExp('^/(.*?)/([gimy]*)$'))
	  if (!match) { return false }

	  return new RegExp(match[1], match[2]).test(val)
	}


	/**
	 * minLength
	 *
	 * This function validate whether the minimum length of the string.
	 *
	 * @param {String} val
	 * @param {String|Number} min
	 * @return {Boolean}
	 */

	function minLength (val, min) {
	  return typeof val === 'string' &&
	    isInteger(min, 10) &&
	    val.length >= parseInt(min, 10)
	}


	/**
	 * maxLength
	 *
	 * This function validate whether the maximum length of the string.
	 *
	 * @param {String} val
	 * @param {String|Number} max
	 * @return {Boolean}
	 */

	function maxLength (val, max) {
	  return typeof val === 'string' &&
	    isInteger(max, 10) &&
	    val.length <= parseInt(max, 10)
	}


	/**
	 * min
	 *
	 * This function validate whether the minimum value of the numberable value.
	 *
	 * @param {*} val
	 * @param {*} arg minimum
	 * @return {Boolean}
	 */

	function min (val, arg) {
	  return !isNaN(+(val)) && !isNaN(+(arg)) && (+(val) >= +(arg))
	}


	/**
	 * max
	 *
	 * This function validate whether the maximum value of the numberable value.
	 *
	 * @param {*} val
	 * @param {*} arg maximum
	 * @return {Boolean}
	 */

	function max (val, arg) {
	  return !isNaN(+(val)) && !isNaN(+(arg)) && (+(val) <= +(arg))
	}


	/**
	 * isInteger
	 *
	 * This function check whether the value of the string is integer.
	 *
	 * @param {String} val
	 * @return {Boolean}
	 * @private
	 */

	function isInteger (val) {
	  return /^(-?[1-9]\d*|0)$/.test(val)
	}


	/**
	 * export(s)
	 */
	module.exports = {
	  required: required,
	  pattern: pattern,
	  minLength: minLength,
	  maxLength: maxLength,
	  min: min,
	  max: max
	}


/***/ },
/* 22 */
/***/ function(module, exports) {

	/**
	 * Utilties
	 */


	/**
	 * warn
	 *
	 * @param {String} msg
	 * @param {Error} [err]
	 *
	 */

	exports.warn = function (msg, err) {
	  if (window.console) {
	    console.warn('[vue-validator] ' + msg)
	    if (err) {
	      console.warn(err.stack)
	    }
	  }
	}

	/**
	 * Get target validatable object
	 *
	 * @param {Object} validation
	 * @param {String} keypath
	 * @return {Object} validatable object
	 */

	exports.getTarget = function (validation, keypath) {
	  var last = validation
	  var keys = keypath.split('.')
	  var key, obj
	  for (var i = 0; i < keys.length; i++) {
	    key = keys[i]
	    obj = last[key]
	    last = obj
	    if (!last) {
	      break
	    }
	  }
	  return last
	}

	/**
	 * Get custom validators
	 *
	 * @param {Object} options
	 * @return {Object}
	 */

	exports.getCustomValidators = function (options) {
	  var opts = options
	  var validators = {}
	  var key
	  var context
	  do {
	    if (opts['validator'] && opts['validator']['validates']) {
	      for (key in opts['validator']['validates']) {
	        if (!validators.hasOwnProperty(key)) {
	          validators[key] = opts['validator']['validates'][key]
	        }
	      }
	    }
	    context = opts._context || opts._parent
	    if (context) {
	      opts = context.$options
	    }
	  } while (context || opts._parent)
	  return validators
	}


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Import(s)
	 */

	var validates = __webpack_require__(21)
	var _ = __webpack_require__(22)


	/**
	 * Export(s)
	 */


	/**
	 * `v-validator` component with mixin
	 */

	module.exports = {
	  inherit: true,

	  created: function () {
	    this._initValidationVariables()
	    this._initOptions()
	    this._mixinCustomValidates()
	    this._defineProperties()
	    this._defineValidationScope()
	  },

	  methods: {
	    _getValidationNamespace: function (key) {
	      return this._namespace[key]
	    },

	    _initValidationVariables: function () {
	      this._validators = {}
	      this._validates = {}
	      this._initialValues = {}
	      for (var key in validates) {
	        this._validates[key] = validates[key]
	      }
	      this._validatorWatchers = {}
	      this._readyEvents = {}
	    },

	    _initOptions: function () {
	      this._namespace = getCustomNamespace(this.$options)
	      this._namespace.validation = this._namespace.validation || 'validation'
	      this._namespace.valid = this._namespace.valid || 'valid'
	      this._namespace.invalid = this._namespace.invalid || 'invalid'
	      this._namespace.dirty = this._namespace.dirty || 'dirty'
	    },

	    _mixinCustomValidates: function () {
	      var customs = _.getCustomValidators(this.$options)
	      for (var key in customs) {
	        this._validates[key] = customs[key]
	      }
	    },

	    _defineValidProperty: function (target, getter) {
	      Object.defineProperty(target, this._getValidationNamespace('valid'), {
	        enumerable: true,
	        configurable: true,
	        get: getter
	      })
	    },

	    _undefineValidProperty: function (target) {
	      delete target[this._getValidationNamespace('valid')]
	    },

	    _defineInvalidProperty: function (target) {
	      var self = this
	      Object.defineProperty(target, this._getValidationNamespace('invalid'), {
	        enumerable: true,
	        configurable: true,
	        get: function () {
	          return !target[self._getValidationNamespace('valid')]
	        }
	      })
	    },

	    _undefineInvalidProperty: function (target) {
	      delete target[this._getValidationNamespace('invalid')]
	    },

	    _defineDirtyProperty: function (target, getter) {
	      Object.defineProperty(target, this._getValidationNamespace('dirty'), {
	        enumerable: true,
	        configurable: true,
	        get: getter
	      })
	    },

	    _undefineDirtyProperty: function (target) {
	      delete target[this._getValidationNamespace('dirty')]
	    },

	    _defineProperties: function () {
	      var self = this

	      var walk = function (obj, propName, namespaces) {
	        var ret = false
	        var keys = Object.keys(obj)
	        var i = keys.length
	        var key, last
	        while (i--) {
	          key = keys[i]
	          last = obj[key]
	          if (!(key in namespaces) && typeof last === 'object') {
	            ret = walk(last, propName, namespaces)
	            if ((propName === self._getValidationNamespace('valid') && !ret) ||
	                (propName === self._getValidationNamespace('dirty') && ret)) {
	              break
	            }
	          } else if (key === propName && typeof last !== 'object') {
	            ret = last
	            if ((key === self._getValidationNamespace('valid') && !ret) ||
	                (key === self._getValidationNamespace('dirty') && ret)) {
	              break
	            }
	          }
	        }
	        return ret
	      }

	      this._defineValidProperty(this.$parent, function () {
	        var validationName = self._getValidationNamespace('validation')
	        var validName = self._getValidationNamespace('valid')
	        return walk(this[validationName], validName, self._namespace)
	      })

	      this._defineInvalidProperty(this.$parent)

	      this._defineDirtyProperty(this.$parent, function () {
	        var validationName = self._getValidationNamespace('validation')
	        var dirtyName = self._getValidationNamespace('dirty')
	        return walk(this[validationName], dirtyName, self._namespace)
	      })
	    },

	    _undefineProperties: function () {
	      this._undefineDirtyProperty(this.$parent)
	      this._undefineInvalidProperty(this.$parent)
	      this._undefineValidProperty(this.$parent)
	    },

	    _defineValidationScope: function () {
	      this.$parent.$add(this._getValidationNamespace('validation'), {})
	    },

	    _undefineValidationScope: function () {
	      var validationName = this._getValidationNamespace('validation')
	      this.$parent.$delete(validationName)
	    },

	    _defineModelValidationScope: function (keypath) {
	      var self = this
	      var validationName = this._getValidationNamespace('validation')
	      var dirtyName = this._getValidationNamespace('dirty')

	      var keys = keypath.split('.')
	      var last = this[validationName]
	      var obj, key
	      for (var i = 0; i < keys.length; i++) {
	        key = keys[i]
	        obj = last[key]
	        if (!obj) {
	          obj = {}
	          last.$add(key, obj)
	        }
	        last = obj
	      }
	      last.$add(dirtyName, false)

	      this._defineValidProperty(last, function () {
	        var ret = true
	        var validators = self._validators[keypath]
	        var i = validators.length
	        var validator
	        while (i--) {
	          validator = validators[i]
	          if (last[validator.name]) {
	            ret = false
	            break
	          }
	        }
	        return ret
	      })
	      this._defineInvalidProperty(last)
	      
	      this._validators[keypath] = []

	      this._watchModel(keypath, function (val, old) {
	        self._updateDirtyProperty(keypath, val)
	        self._validators[keypath].forEach(function (validator) {
	          self._doValidate(keypath, validator.name, val)
	        })
	      })
	    },

	    _undefineModelValidationScope: function (keypath, validator) {
	      if (this.$parent) {
	        var targetPath = [this._getValidationNamespace('validation'), keypath].join('.')
	        var target = this.$parent.$get(targetPath)
	        if (target && Object.keys(target).length === 3 &&
	            this._getValidationNamespace('valid') in target &&
	            this._getValidationNamespace('invalid') in target &&
	            this._getValidationNamespace('dirty') in target) {
	          this._unwatchModel(keypath)
	          this._undefineDirtyProperty(target)
	          this._undefineInvalidProperty(target)
	          this._undefineValidProperty(target)
	          removeValidationProperties(
	            this.$parent.$get(this._getValidationNamespace('validation')),
	            keypath
	          )
	        }
	      }
	    },

	    _defineValidatorToValidationScope: function (keypath, validator) {
	      var target = _.getTarget(this[this._getValidationNamespace('validation')], keypath)
	      target.$add(validator, null)
	    },

	    _undefineValidatorToValidationScope: function (keypath, validator) {
	      var validationName = this._getValidationNamespace('validation')
	      if (this.$parent) {
	        var targetPath = [validationName, keypath].join('.')
	        var target = this.$parent.$get(targetPath)
	        if (target) {
	          target.$delete(validator)
	        }
	      }
	    },

	    _getInitialValue: function (keypath) {
	      return this._initialValues[keypath]
	    },

	    _setInitialValue: function (keypath, val) {
	      this._initialValues[keypath] = val
	    },

	    _addValidator: function (keypath, validator, arg) {
	      this._validators[keypath].push({ name: validator, arg: arg })
	    },

	    _changeValidator: function (keypath, validator, arg) {
	      var validators = this._validators[keypath]
	      var i = validators.length
	      while (i--) {
	        if (validators[i].name === validator) {
	          validators[i].arg = arg
	          break
	        }
	      }
	    },

	    _findValidator: function (keypath, validator) {
	      var found = null
	      var validators = this._validators[keypath]
	      var i = validators.length
	      while (i--) {
	        if (validators[i].name === validator) {
	          found = validators[i]
	          break
	        }
	      }
	      return found
	    },

	    _watchModel: function (keypath, fn) {
	      this._validatorWatchers[keypath] =
	        this.$watch(keypath, fn, { deep: false, immediate: true })
	    },

	    _unwatchModel: function (keypath) {
	      var unwatch = this._validatorWatchers[keypath]
	      if (unwatch) {
	        unwatch()
	        delete this._validatorWatchers[keypath]
	      }
	    },
	    
	    _addReadyEvents: function (id, event) {
	      this._readyEvents[id] = event
	    },

	    _getReadyEvents: function (id) {
	      return this._readyEvents[id]
	    },

	    _isRegistedReadyEvent: function (id) {
	      return id in this._readyEvents
	    },

	    _updateDirtyProperty: function (keypath, val) {
	      var validationName = this._getValidationNamespace('validation')
	      var dirtyName = this._getValidationNamespace('dirty')

	      var target = _.getTarget(this[validationName], keypath)
	      if (target) {
	        target.$set(dirtyName, this._getInitialValue(keypath) !== val)
	      }
	    },

	    _doValidate: function (keypath, validateName, val) {
	      var validationName = this._getValidationNamespace('validation')

	      var target = _.getTarget(this[validationName], keypath)
	      var validator = this._findValidator(keypath, validateName)
	      if (target && validator) {
	        this._invokeValidator(
	          this._validates[validateName],
	          val, validator.arg,
	          function (result) {
	            target.$set(validateName, !result)
	          })
	      }
	    },
	    
	    _invokeValidator: function (validator, val, arg, fn) {
	      var future = validator.call(this, val, arg)
	      if (typeof future === 'function') { // async
	        if (future.resolved) {
	          // cached
	          fn(future.resolved)
	        } else if (future.requested) {
	          // pool callbacks
	          future.pendingCallbacks.push(fn)
	        } else {
	          future.requested = true
	          var fns = future.pendingCallbacks = [fn]
	          future(function resolve () {
	            future.resolved = true
	            for (var i = 0, l = fns.length; i < l; i++) {
	              fns[i](true)
	            }
	          }, function reject () {
	            fn(false)
	          })
	        }
	      } else { // sync
	        fn(future)
	      }
	    }
	  }
	}

	/**
	 * Remove properties from target validation
	 *
	 * @param {Object} validation
	 * @param {String} keypath
	 */

	function removeValidationProperties (validation, keypath) {
	  var keys = keypath.split('.')
	  var key, obj
	  while (keys.length) {
	    key = keys.pop()
	    if (keys.length !== 0) {
	      obj = _.getTarget(validation, keys.join('.'))
	      obj.$delete(key)
	    } else {
	      validation.$delete(key)
	    }
	  }
	}

	/**
	 * Get custom namespace
	 *
	 * @param {Object} options
	 * @return {Object}
	 */

	function getCustomNamespace (options) {
	  var namespace = {}
	  var key
	  var context
	  do {
	    if (options['validator'] && options['validator']['namespace']) {
	      for (key in options['validator']['namespace']) {
	        if (!namespace.hasOwnProperty(key)) {
	          namespace[key] = options['validator']['namespace'][key]
	        }
	      }
	    }
	    context = options._context || options._parent
	    if (context) {
	      options = context.$options
	    }
	  } while (context || options._parent)
	  return namespace
	}


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	module.exports=function(router){
	    router.map({
	        '/':{				//首页
	            name:'index',
	            component:__webpack_require__(25)
	        },
	        '/login': {	        //登录
	        	name:'login',
	        	component:__webpack_require__(44)
	        },
	        '/register': {
	            name:'register',
	            component:__webpack_require__(53)
	        },
	        '/forget': {
	            name:'forget',
	            component:__webpack_require__(58)
	        },
	        '/test': {
	            name:'test',
	            component:__webpack_require__(58)
	        }
	    })
	}

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(26)

	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(43)
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "F:\\xampp\\htdocs\\ZJDesk-Vue\\src\\views\\index.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
	  }
	})()}

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// <template>
	//     <!-- 全局header 开始-->
	//     <nv-zjheader>
	//     </nv-zjheader>
	//     <!-- 全局header 结束 -->

	//     <div class="zjd-container bgf4f4f4">
	//         <!-- 掌金课堂header 开始-->
	//         <nv-zjdheader>
	//         </nv-zjdheader>
	//         <!-- 掌金课堂header 结束 -->

	//     </div>

	//     <!-- 全局footer 开始-->
	//     <nv-zjfooter>
	//     </nv-zjfooter>
	//     <!-- 全局footer 结束-->
	// </template>
	// <script>
	// require('../assets/scss/base.scss');
	module.exports = {
	    data: function data() {
	        return {
	            msg: "hello world Vue!111"
	        };
	    },
	    components: {
	        'nvZjheader': __webpack_require__(27),
	        'nvZjdheader': __webpack_require__(34),
	        'nvZjfooter': __webpack_require__(39)
	    }
	};
	// </script>

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(28)

	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(31)
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "F:\\xampp\\htdocs\\ZJDesk-Vue\\src\\components\\zjheader.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
	  }
	})()}

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// <template>

	// 	<div class="zj-header">

	// 		<div class="zj-toolbar bgf5f8fa">

	// 			<div class="w1200 clearfix ">

	//     			<div class="zj-hsection clearfix">

	//     				<div class="w150">营销顾问021-6031-0260</div>

	//     				<div class="w150">前台4006-502-365</div>

	//     			</div>

	//     			<div class="zj-hsection clearfix">

	//     				<div class="w90"><a  style="display:inline;" v-link="{name:'login'}">登录</a> | <a style="display:inline;" v-link="{name:'register'}">注册</a></div>

	//     				<div class="w100"><a href="#">微盘客服</a></div>

	//     				<div class="w100"><a href="#">投资顾问</a></div>

	//     				<div class="w100"><a href="#">APP下载</a></div>

	//     				<div class="w100"><a href="#">掌金课堂</a></div>

	//     				<div class="w100"><a href="#">掌金官网</a></div>

	//     			</div>

	//     		</div>

	// 		</div>

	// 		<div class="zj-hbar">

	//     		<div class="w1200 clearfix">

	//     			<div class="zj-hsection">

	//     				<img class="ZJDesk-logo" src="../assets/images/ZJDesk-logo.png" alt="ZJDesk-logo">

	//     			</div>

	//     			<div class="zj-hsection">

	//     				<a href="#"><img src="../assets/images/header-banner.png" alt="header-banner" class="header-banner"></a>

	//     			</div>

	//     		</div>

	//     	</div>

	// 	</div>

	// </template>

	// <script>
	__webpack_require__(29);
	__webpack_require__(30);
	// </script>

/***/ },
/* 29 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 30 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"zj-header\">\r\n\t\t<div class=\"zj-toolbar bgf5f8fa\">\r\n\t\t\t<div class=\"w1200 clearfix \">\r\n    \t\t\t<div class=\"zj-hsection clearfix\">\r\n    \t\t\t\t<div class=\"w150\">营销顾问021-6031-0260</div>\r\n    \t\t\t\t<div class=\"w150\">前台4006-502-365</div>\r\n    \t\t\t</div>\r\n    \t\t\t<div class=\"zj-hsection clearfix\">\r\n    \t\t\t\t<div class=\"w90\"><a  style=\"display:inline;\" v-link=\"{name:'login'}\">登录</a> | <a style=\"display:inline;\" v-link=\"{name:'register'}\">注册</a></div>\r\n    \t\t\t\t<div class=\"w100\"><a href=\"#\">微盘客服</a></div>\r\n    \t\t\t\t<div class=\"w100\"><a href=\"#\">投资顾问</a></div>\r\n    \t\t\t\t<div class=\"w100\"><a href=\"#\">APP下载</a></div>\r\n    \t\t\t\t<div class=\"w100\"><a href=\"#\">掌金课堂</a></div>\r\n    \t\t\t\t<div class=\"w100\"><a href=\"#\">掌金官网</a></div>\r\n    \t\t\t</div>\r\n    \t\t</div>\r\n\t\t</div>\r\n\r\n\t\t<div class=\"zj-hbar\">\r\n    \t\t<div class=\"w1200 clearfix\">\r\n    \t\t\t<div class=\"zj-hsection\">\r\n    \t\t\t\t<img class=\"ZJDesk-logo\" src=\"" + __webpack_require__(32) + "\" alt=\"ZJDesk-logo\">\r\n    \t\t\t</div>\r\n    \t\t\t<div class=\"zj-hsection\">\r\n    \t\t\t\t<a href=\"#\"><img src=\"" + __webpack_require__(33) + "\" alt=\"header-banner\" class=\"header-banner\"></a>\r\n    \t\t\t</div>\r\n    \t\t</div>\r\n    \t</div>\r\n\t</div>";

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPMAAABwCAIAAABEsNEeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo5YTNkNDhkZC04MDQxLTdmNDctYjNkZS1hODdlZTQyOTllM2UiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzExNDRBMDk5NDAzMTFFNTk2RTdBNDYxOUUzRUUwRUMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzExNDRBMDg5NDAzMTFFNTk2RTdBNDYxOUUzRUUwRUMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmM3YzA1MThkLTRjYjAtMWE0YS1iMDMxLTM2ODY0NzYzNGY5NSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5YTNkNDhkZC04MDQxLTdmNDctYjNkZS1hODdlZTQyOTllM2UiLz4g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"

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAABwCAIAAABNZJn5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo5YTNkNDhkZC04MDQxLTdmNDctYjNkZS1hODdlZTQyOTllM2UiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjJGNUFDRTE5NDA1MTFFNTg0QzhCNTA2QzY3MDJCMjEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjJGNUFDRTA5NDA1MTFFNTg0QzhCNTA2QzY3MDJCMjEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6YTM5Mzk1OGQtY2NlOC1iMDQwLTg1ZmMtMWI3ZmJkMjJkYzk3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjlhM2Q0OGRkLTgwNDEtN2Y0Ny1iM2RlLWE4N2VlNDI5OWUzZSIv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"

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(35)

	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(38)
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "F:\\xampp\\htdocs\\ZJDesk-Vue\\src\\components\\zjdheader.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
	  }
	})()}

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// <template>

	//     <div class="zjd-header">

	//         <div class="zj-container w1200 clearfix">

	//             <div class="w240">全部课程<i class="icon icon-nav icon-icon-nav"></i>

	//                 <ul class="header-nav clearfix">

	//                     <li class="nav-item">

	//                         <i class="icon-arrow icon-icon-index-arrow"></i>

	//                         <p class="item-title">名师堂</p>

	//                         <p class="item clearfix">

	//                             <span class="first">木子老师</span>

	//                             <span class="first">林凌老师</span>

	//                         </p>

	//                         <ul class="item-expand clearfix">

	//                             <li class="second">木子</li>

	//                             <li class="second">林凌</li>

	//                             <li class="second">洪兴</li>

	//                             <li class="second">吉米</li>

	//                             <li class="second">木子</li>

	//                             <li class="second">林凌</li>

	//                             <li class="second">洪兴</li>

	//                             <li class="second">吉米</li>

	//                             <li class="second">木子</li>

	//                             <li class="second">林凌</li>

	//                             <li class="second">洪兴</li>

	//                             <li class="second">吉米</li>

	//                         </ul>

	//                     </li>

	//                     <li class="nav-item">

	//                         <i class="icon-arrow icon-icon-index-arrow"></i>

	//                         <p class="item-title">基础课程</p>

	//                         <p class="item clearfix">

	//                             <span class="first">交易心理</span>

	//                             <span class="first">资金管理</span>

	//                         </p>

	//                     </li>

	//                     <li class="nav-item">

	//                         <i class="icon-arrow icon-icon-index-arrow"></i>

	//                         <p class="item-title">专业课程</p>

	//                         <p class="item clearfix">

	//                             <span class="first">波浪理论</span>

	//                             <span class="first">道氏理论</span>

	//                         </p>

	//                     </li>

	//                     <li class="nav-item">

	//                         <i class="icon-arrow icon-icon-index-arrow"></i>

	//                         <p class="item-title">特色课程</p>

	//                         <p class="item clearfix">

	//                             <span class="first">新手入门</span>

	//                             <span class="first">推荐课程</span>

	//                         </p>

	//                     </li>

	//                     <li class="nav-item">

	//                         <i class="icon-arrow icon-icon-index-arrow"></i>

	//                         <p class="item-title">专辑课程</p>

	//                         <p class="item clearfix">

	//                             <span class="first">木子老师</span>

	//                             <span class="first">林凌老师</span>

	//                         </p>

	//                     </li>

	//                 </ul>

	//             </div>

	//             <div class="w140"><a href="./index.html">首页</a></div>

	//             <div class="w140"><a href="./hot.html">热门课程</a></div>

	//             <div class="w140"><a href="#">预约课程</a></div>

	//             <div class="w140"><a href="./teacher.html">名师堂</a></div>

	//             <div class="w140"><a class="active" href="./user.html">个人中心</a></div>

	//         </div>

	//     </div>

	// </template>

	// <script>
	__webpack_require__(36);
	__webpack_require__(37);
	// </script>

/***/ },
/* 36 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 37 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 38 */
/***/ function(module, exports) {

	module.exports = "<div class=\"zjd-header\">\r\n        <div class=\"zj-container w1200 clearfix\">\r\n            <div class=\"w240\">全部课程<i class=\"icon icon-nav icon-icon-nav\"></i>\r\n                <ul class=\"header-nav clearfix\">\r\n                    <li class=\"nav-item\">\r\n                        <i class=\"icon-arrow icon-icon-index-arrow\"></i>\r\n                        <p class=\"item-title\">名师堂</p>\r\n                        <p class=\"item clearfix\">\r\n                            <span class=\"first\">木子老师</span>\r\n                            <span class=\"first\">林凌老师</span>\r\n                        </p>\r\n                        <ul class=\"item-expand clearfix\">\r\n                            <li class=\"second\">木子</li>\r\n                            <li class=\"second\">林凌</li>\r\n                            <li class=\"second\">洪兴</li>\r\n                            <li class=\"second\">吉米</li>\r\n                            <li class=\"second\">木子</li>\r\n                            <li class=\"second\">林凌</li>\r\n                            <li class=\"second\">洪兴</li>\r\n                            <li class=\"second\">吉米</li>\r\n                            <li class=\"second\">木子</li>\r\n                            <li class=\"second\">林凌</li>\r\n                            <li class=\"second\">洪兴</li>\r\n                            <li class=\"second\">吉米</li>\r\n                        </ul>\r\n                    </li>\r\n                    <li class=\"nav-item\">\r\n                        <i class=\"icon-arrow icon-icon-index-arrow\"></i>\r\n                        <p class=\"item-title\">基础课程</p>\r\n                        <p class=\"item clearfix\">\r\n                            <span class=\"first\">交易心理</span>\r\n                            <span class=\"first\">资金管理</span>\r\n                        </p>\r\n                    </li>\r\n                    <li class=\"nav-item\">\r\n                        <i class=\"icon-arrow icon-icon-index-arrow\"></i>\r\n                        <p class=\"item-title\">专业课程</p>\r\n                        <p class=\"item clearfix\">\r\n                            <span class=\"first\">波浪理论</span>\r\n                            <span class=\"first\">道氏理论</span>\r\n                        </p>\r\n                    </li>\r\n                    <li class=\"nav-item\">\r\n                        <i class=\"icon-arrow icon-icon-index-arrow\"></i>\r\n                        <p class=\"item-title\">特色课程</p>\r\n                        <p class=\"item clearfix\">\r\n                            <span class=\"first\">新手入门</span>\r\n                            <span class=\"first\">推荐课程</span>\r\n                        </p>\r\n                    </li>\r\n                    <li class=\"nav-item\">\r\n                        <i class=\"icon-arrow icon-icon-index-arrow\"></i>\r\n                        <p class=\"item-title\">专辑课程</p>\r\n                        <p class=\"item clearfix\">\r\n                            <span class=\"first\">木子老师</span>\r\n                            <span class=\"first\">林凌老师</span>\r\n                        </p>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n            <div class=\"w140\"><a href=\"./index.html\">首页</a></div>\r\n            <div class=\"w140\"><a href=\"./hot.html\">热门课程</a></div>\r\n            <div class=\"w140\"><a href=\"#\">预约课程</a></div>\r\n            <div class=\"w140\"><a href=\"./teacher.html\">名师堂</a></div>\r\n            <div class=\"w140\"><a class=\"active\" href=\"./user.html\">个人中心</a></div>\r\n        </div>\r\n    </div>";

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(40)

	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(42)
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "F:\\xampp\\htdocs\\ZJDesk-Vue\\src\\components\\zjfooter.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
	  }
	})()}

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// <template>

	// 	<div class="zj-footer">

	//     	<div class="zj-footer-section">

	//     		<div class="zj-container">

	//     		</div>

	//     	</div>

	//     	<div class="zj-footer-bottom">

	//     		<div class="zj-container">

	//     			Copyright © 上海掌金信息技术有限公司[Shanghai Holdgold Technology Co.,Ltd.] All Right Reserved.

	//     		</div>

	//     	</div>

	//     </div>

	// </template>

	// <script>
	__webpack_require__(41);
	// </script>

/***/ },
/* 41 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 42 */
/***/ function(module, exports) {

	module.exports = "<div class=\"zj-footer\">\r\n    \t<div class=\"zj-footer-section\">\r\n    \t\t<div class=\"zj-container\">\r\n\r\n    \t\t</div>\r\n    \t</div>\r\n    \t<div class=\"zj-footer-bottom\">\r\n    \t\t<div class=\"zj-container\">\r\n    \t\t\tCopyright © 上海掌金信息技术有限公司[Shanghai Holdgold Technology Co.,Ltd.] All Right Reserved.\r\n    \t\t</div>\r\n    \t</div>\r\n    </div>";

/***/ },
/* 43 */
/***/ function(module, exports) {

	module.exports = "<!-- 全局header 开始-->\n    <nv-zjheader>\n    </nv-zjheader>\n    <!-- 全局header 结束 -->\n\n    <div class=\"zjd-container bgf4f4f4\">\n        <!-- 掌金课堂header 开始-->\n        <nv-zjdheader>\n        </nv-zjdheader>\n        <!-- 掌金课堂header 结束 -->\n\n    </div>\n\n    <!-- 全局footer 开始-->\n    <nv-zjfooter>\n    </nv-zjfooter>\n    <!-- 全局footer 结束-->";

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(45)

	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(51)
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "F:\\xampp\\htdocs\\ZJDesk-Vue\\src\\views\\login.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
	  }
	})()}

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// <template>

	//     <!-- 全局header 开始-->

	//     <nv-zjheader>

	//     </nv-zjheader>

	//     <!-- 全局header 结束 -->

	//     <div class="zjd-container bgf4f4f4">

	//         <!-- 掌金课堂header 开始-->

	//         <nv-zjdheader>

	//         </nv-zjdheader>

	//         <!-- 掌金课堂header 结束 -->

	//         <!-- 掌金课堂breadcrumb 开始-->

	//         <nv-zjdbreadcrumb>

	//         </nv-zjdbreadcrumb>

	//         <!-- 掌金课堂breadcrumb 结束-->

	//         <div class="zjd-top login">

	//             <div class="zjd-container clearfix">

	//                 <img src="../assets/images/zjd-login-bg.png" alt="zjd-loin-bg" class="login-bg fl">

	//                 <div class="zjd-login fl">

	//                     <div class="item tr"><a v-link="{name:'register'}">无账号？立即注册</a></div>

	//                     <div class="input">

	//                         <p class="item tl">用户名</p>

	//                         <i class="icon-login-account icon-icon-login-account"></i>

	//                         <input type="text" class="text-input" name="account" placeholder="手机号码">

	//                     </div>

	//                     <div class="input">

	//                         <p class="item tl">密码</p>

	//                         <i class="icon-login-pwd icon-icon-login-pwd"></i>

	//                         <input type="text" class="text-input" name="pwd" placeholder="密码">

	//                     </div>

	//                     <div class="item pt8">

	//                         <input type="checkbox" class="checkbox-input">  记住此用户

	//                         <a class="fr" v-link="{name:'forget'}">忘记密码</a>

	//                     </div>

	//                     <div class="input">

	//                         <button class="submit-input tc">登 录</button>

	//                     </div>

	//                     <div class="item b64a1e tc">可使用掌金APP账户登录</div>

	//                 </div>

	//             </div>

	//         </div>

	//     </div>

	//     <!-- 全局footer 开始-->

	//     <nv-zjfooter>

	//     </nv-zjfooter>

	//     <!-- 全局footer 结束-->

	// </template>

	// <script>
	__webpack_require__(46);
	module.exports = {
	    data: function data() {},
	    components: {
	        'nvZjheader': __webpack_require__(27),
	        'nvZjdheader': __webpack_require__(34),
	        'nvZjdbreadcrumb': __webpack_require__(47),
	        'nvZjfooter': __webpack_require__(39)
	    }
	};
	// </script>

/***/ },
/* 46 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(48)

	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(50)
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "F:\\xampp\\htdocs\\ZJDesk-Vue\\src\\components\\zjdbreadcrumb.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
	  }
	})()}

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// <template>

	// 	<div class="zjd-top w1200">

	// 		<ol class="zjd-breadcrumb clearfix">

	// 			<li class="index active"><a v-link="{name:'index'}">首页</a></li>

	// 			<li class="item "><a v-link="{name:'login'}">账户登录</a></li>

	// 		</ol>

	// 	</div>

	// </template>

	// <script>
	__webpack_require__(49);
	// </script>

/***/ },
/* 49 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 50 */
/***/ function(module, exports) {

	module.exports = "<div class=\"zjd-top w1200\">\r\n\t\t<ol class=\"zjd-breadcrumb clearfix\">\r\n\t\t\t<li class=\"index active\"><a v-link=\"{name:'index'}\">首页</a></li>\r\n\t\t\t<li class=\"item \"><a v-link=\"{name:'login'}\">账户登录</a></li>\r\n\t\t</ol>\r\n\t</div>";

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<!-- 全局header 开始-->\r\n    <nv-zjheader>\r\n    </nv-zjheader>\r\n    <!-- 全局header 结束 -->\r\n\r\n    <div class=\"zjd-container bgf4f4f4\">\r\n        <!-- 掌金课堂header 开始-->\r\n        <nv-zjdheader>\r\n        </nv-zjdheader>\r\n        <!-- 掌金课堂header 结束 -->\r\n\r\n        <!-- 掌金课堂breadcrumb 开始-->\r\n        <nv-zjdbreadcrumb>\r\n        </nv-zjdbreadcrumb>\r\n        <!-- 掌金课堂breadcrumb 结束-->\r\n\r\n        <div class=\"zjd-top login\">\r\n            <div class=\"zjd-container clearfix\">\r\n                <img src=\"" + __webpack_require__(52) + "\" alt=\"zjd-loin-bg\" class=\"login-bg fl\">\r\n                <div class=\"zjd-login fl\">\r\n                    <div class=\"item tr\"><a v-link=\"{name:'register'}\">无账号？立即注册</a></div>\r\n                    <div class=\"input\">\r\n                        <p class=\"item tl\">用户名</p>\r\n                        <i class=\"icon-login-account icon-icon-login-account\"></i>\r\n                        <input type=\"text\" class=\"text-input\" name=\"account\" placeholder=\"手机号码\">\r\n                    </div>\r\n                    <div class=\"input\">\r\n                        <p class=\"item tl\">密码</p>\r\n                        <i class=\"icon-login-pwd icon-icon-login-pwd\"></i>\r\n                        <input type=\"text\" class=\"text-input\" name=\"pwd\" placeholder=\"密码\">\r\n                    </div>\r\n                    <div class=\"item pt8\">\r\n                        <input type=\"checkbox\" class=\"checkbox-input\">  记住此用户\r\n                        <a class=\"fr\" v-link=\"{name:'forget'}\">忘记密码</a>\r\n                    </div>\r\n                    <div class=\"input\">\r\n                        <button class=\"submit-input tc\">登 录</button>\r\n                    </div>\r\n                    <div class=\"item b64a1e tc\">可使用掌金APP账户登录</div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n    </div>\r\n\r\n    <!-- 全局footer 开始-->\r\n    <nv-zjfooter>\r\n    </nv-zjfooter>\r\n    <!-- 全局footer 结束-->";

/***/ },
/* 52 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAiQAAAHUCAYAAAAKiTP0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjhCMTgzQzgxOTgwOTExRTVCNzQxODZCMjY4MzQ4RTkxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjhCMTgzQzgyOTgwOTExRTVCNzQxODZCMjY4MzQ4RTkxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OEIxODNDN0Y5ODA5MTFFNUI3NDE4NkIyNjgzNDhFOTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OEIxODNDODA5ODA5MTFFNUI3NDE4NkIyNjgzNDhFOTEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5aPzugAAD82ElEQVR42uyd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"

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(54)

	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(56)
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "F:\\xampp\\htdocs\\ZJDesk-Vue\\src\\views\\register.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
	  }
	})()}

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// <template>

	//     <!-- 全局header 开始-->

	//     <nv-zjheader>

	//     </nv-zjheader>

	//     <!-- 全局header 结束 -->

	//     <div class="zjd-container bgf4f4f4">

	//         <!-- 掌金课堂header 开始-->

	//         <nv-zjdheader>

	//         </nv-zjdheader>

	//         <!-- 掌金课堂header 结束 -->

	//         <!-- 掌金课堂breadcrumb 开始-->

	//         <nv-zjdbreadcrumb>

	//         </nv-zjdbreadcrumb>

	//         <!-- 掌金课堂breadcrumb 结束-->

	//         <!-- 掌金课堂注册 开始-->

	//         <div class="zjd-top register w1200 clearfix">

	//             <div class="register-section fl">

	//                 <div class="input">

	//                     <p class="item tl">手机号</p>

	//                     <input type="text" class="text-input" name="phone">

	//                 </div>

	//                 <div class="input clearfix">

	//                     <p class="item tl">短信验证</p>

	//                     <input type="text" class="text-input w170 fl" name="code">

	//                     <button class="code-input tc fl">获取验证码</button>

	//                 </div>

	//                 <div class="input">

	//                     <p class="item tl">设置密码</p>

	//                     <input type="text" class="text-input" name="code">

	//                 </div>

	//                 <div class="input">

	//                     <p class="item tl">确认密码</p>

	//                     <input type="text" class="text-input" name="code">

	//                 </div>

	//                 <div class="item pt8">

	//                     <input type="checkbox" class="checkbox-input">  注册协议

	//                 </div>

	//                 <div class="input">

	//                     <button class="submit-input tc">注 册</button>

	//                 </div>

	//             </div>

	//             <a class="register-ad" href="#3"><img src="../assets/images/zjd-register-ad.png" alt="register-ad"></a>

	//         </div>

	//         <!-- 掌金课堂注册 结束-->

	//     </div>

	//     <!-- 全局footer 开始-->

	//     <nv-zjfooter>

	//     </nv-zjfooter>

	//     <!-- 全局footer 结束-->

	// </template>

	// <script>
	__webpack_require__(55);
	module.exports = {
	    data: function data() {},
	    components: {
	        'nvZjheader': __webpack_require__(27),
	        'nvZjdheader': __webpack_require__(34),
	        'nvZjdbreadcrumb': __webpack_require__(47),
	        'nvZjfooter': __webpack_require__(39)
	    }
	};
	// </script>

/***/ },
/* 55 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<!-- 全局header 开始-->\r\n    <nv-zjheader>\r\n    </nv-zjheader>\r\n    <!-- 全局header 结束 -->\r\n\r\n    <div class=\"zjd-container bgf4f4f4\">\r\n        <!-- 掌金课堂header 开始-->\r\n        <nv-zjdheader>\r\n        </nv-zjdheader>\r\n        <!-- 掌金课堂header 结束 -->\r\n\r\n        <!-- 掌金课堂breadcrumb 开始-->\r\n        <nv-zjdbreadcrumb>\r\n        </nv-zjdbreadcrumb>\r\n        <!-- 掌金课堂breadcrumb 结束-->\r\n\r\n        <!-- 掌金课堂注册 开始-->\r\n        <div class=\"zjd-top register w1200 clearfix\">\r\n            <div class=\"register-section fl\">\r\n                <div class=\"input\">\r\n                    <p class=\"item tl\">手机号</p>\r\n                    <input type=\"text\" class=\"text-input\" name=\"phone\">\r\n                </div>\r\n                <div class=\"input clearfix\">\r\n                    <p class=\"item tl\">短信验证</p>\r\n                    <input type=\"text\" class=\"text-input w170 fl\" name=\"code\">\r\n                    <button class=\"code-input tc fl\">获取验证码</button>\r\n                </div>\r\n                <div class=\"input\">\r\n                    <p class=\"item tl\">设置密码</p>\r\n                    <input type=\"text\" class=\"text-input\" name=\"code\">\r\n                </div>\r\n                <div class=\"input\">\r\n                    <p class=\"item tl\">确认密码</p>\r\n                    <input type=\"text\" class=\"text-input\" name=\"code\">\r\n                </div>\r\n                <div class=\"item pt8\">\r\n                    <input type=\"checkbox\" class=\"checkbox-input\">  注册协议\r\n                </div>\r\n                <div class=\"input\">\r\n                    <button class=\"submit-input tc\">注 册</button>\r\n                </div>\r\n            </div>\r\n            <a class=\"register-ad\" href=\"#3\"><img src=\"" + __webpack_require__(57) + "\" alt=\"register-ad\"></a>\r\n        </div>\r\n        <!-- 掌金课堂注册 结束-->\r\n\r\n    </div>\r\n\r\n    <!-- 全局footer 开始-->\r\n    <nv-zjfooter>\r\n    </nv-zjfooter>\r\n    <!-- 全局footer 结束-->";

/***/ },
/* 57 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAADICAIAAAC7/QjhAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjYwRDI5NDgyOTgwOTExRTU5M0U3QjhBODYzOUQ1QUNDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjYwRDI5NDgzOTgwOTExRTU5M0U3QjhBODYzOUQ1QUNDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjBEMjk0ODA5ODA5MTFFNTkzRTdCOEE4NjM5RDVBQ0MiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjBEMjk0ODE5ODA5MTFFNTkzRTdCOEE4NjM5RDVBQ0MiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6inkoZAAIWh0lEQVR42pS9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"

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(59)
	module.exports = __webpack_require__(63)

	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(64)
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "F:\\xampp\\htdocs\\ZJDesk-Vue\\src\\views\\test.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
	  }
	})()}

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(60);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(62)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-90ee0682&file=test.vue!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./test.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-90ee0682&file=test.vue!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./test.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(61)();
	// imports


	// module
	exports.push([module.id, "", ""]);

	// exports


/***/ },
/* 61 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 63 */
/***/ function(module, exports) {

	"use strict";

	// <template>

	// 	<h3>{{msg}}</h3>

	// 	<ul>

	// 		<li v-link="{name:'test'}">test</li>

	// 		<li v-link="{name:'login'}">login</li>

	// 		<li v-link="{name:'index'}">index</li>

	// 	</ul>

	// 	<input type="text" v-model="msg">

	// </template>

	// <script>
	module.exports = {
	    data: function data() {
	        return {
	            msg: "hello world Vue!111"
	        };
	    }
	};
	// </script>

	// <style>

	// </style>

/***/ },
/* 64 */
/***/ function(module, exports) {

	module.exports = "<h3>{{msg}}</h3>\r\n\t<ul>\r\n\t\t<li v-link=\"{name:'test'}\">test</li>\r\n\t\t<li v-link=\"{name:'login'}\">login</li>\r\n\t\t<li v-link=\"{name:'index'}\">index</li>\r\n\t</ul>\r\n\t<input type=\"text\" v-model=\"msg\">";

/***/ }
]);