'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var vscode = require('vscode');
var path = require('path');
var path__default = _interopDefault(path);
var fs = require('fs');
var fs__default = _interopDefault(fs);
var readline = require('readline');
var util$1 = require('util');
var util$1__default = _interopDefault(util$1);
var http = _interopDefault(require('http'));
var https = _interopDefault(require('https'));
var url = _interopDefault(require('url'));
var stream = _interopDefault(require('stream'));
var assert = _interopDefault(require('assert'));
var tty = _interopDefault(require('tty'));
var os = _interopDefault(require('os'));
var zlib = _interopDefault(require('zlib'));

const REL_CONTROLLERS = path.join('app', 'controllers');
const REL_MODELS = path.join('app', 'models');
const REL_VIEWS = path.join('app', 'views');
const REL_LAYOUTS = path.join('app', 'views', 'layouts');
const REL_HELPERS = path.join('app', 'helpers');
const REL_JAVASCRIPTS = path.join('app', 'assets', 'javascripts');
const REL_STYLESHEETS = path.join('app', 'assets', 'stylesheets');
const REL_SPEC = 'spec';
const REL_TEST = 'test';
const REL_CONTROLLERS_CONCERNS = path.join('app', 'controllers', 'concerns');
const REL_MODELS_CONCERNS = path.join('app', 'models', 'concerns');
var FileType;
(function (FileType) {
    FileType[FileType["Controller"] = 0] = "Controller";
    FileType[FileType["ControllerConcerns"] = 1] = "ControllerConcerns";
    FileType[FileType["Model"] = 2] = "Model";
    FileType[FileType["ModelConcerns"] = 3] = "ModelConcerns";
    FileType[FileType["Layout"] = 4] = "Layout";
    FileType[FileType["View"] = 5] = "View";
    FileType[FileType["Helper"] = 6] = "Helper";
    FileType[FileType["Javascript"] = 7] = "Javascript";
    FileType[FileType["StyleSheet"] = 8] = "StyleSheet";
    FileType[FileType["Rspec"] = 9] = "Rspec";
    FileType[FileType["Test"] = 10] = "Test";
    FileType[FileType["Unkown"] = 11] = "Unkown";
})(FileType || (FileType = {}));
const FileTypeRelPath = new Map([
    [FileType.Controller, REL_CONTROLLERS],
    [FileType.ControllerConcerns, REL_CONTROLLERS_CONCERNS],
    [FileType.Model, REL_MODELS],
    [FileType.ModelConcerns, REL_MODELS_CONCERNS],
    [FileType.Layout, REL_LAYOUTS],
    [FileType.View, REL_VIEWS],
    [FileType.Helper, REL_HELPERS],
    [FileType.Javascript, REL_JAVASCRIPTS],
    [FileType.StyleSheet, REL_STYLESHEETS],
    [FileType.Rspec, REL_SPEC],
    [FileType.Test, REL_TEST],
]);
const PATTERNS = {
    CLASS_INHERIT_DECLARATION: /^class\s+[^<]+<\s+/,
    FUNCTION_DECLARATON: /^def\s+/,
    INCLUDE_DECLARATION: /^include\s+/,
    CAPITALIZED: /^[A-Z](?=[a-z])/,
    PARAMS_DECLARATION: /_params$/,
    LAYOUT_DECLARATION: /^layout\s+/,
    LAYOUT_MATCH: /^layout\s+(['":]?([A-Za-z\/0-9_]+)['"]?)/,
    RENDER_DECLARATION: /render[\(\s]/,
    RENDER_TO_STRING_DECLARATION: /render_to_string[\(\s]/,
    RENDER_MATCH: /([A-Za-z\/0-9_-]+(\.[A-Za-z0-9]+)*)/g,
    MODEL_RELATIONS: /^has_one|^has_many|^has_and_belongs_to_many|^belongs_to/,
    CONTROLLER_FILTERS: /^(skip_|prepend_)?(before|after|around)_(action|filter)/,
    HELPER_METHODS: /^helper_method/,
    CLASS_STATIC_METHOD_CALL: /(([A-Z][A-Za-z]+)\.[^\)]*)/,
};
const VIEWS_PATTERNS = {
    RENDER_PATTERN: /render/,
    RENDER_FUNC_PATTERN: /(escape_javascript|j)?[\s\(]render([\s\(]:([a-z]+)\s*=>\s*)?(["'])([^\4]+)\4/,
    RENDER_FUNC_PATTERN2: /(escape_javascript|j)?[\s\(]render([\s\(]([a-z]+):\s*)?(["'])([^\4]+)\4/,
};

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, basedir, module) {
	return module = {
	  path: basedir,
	  exports: {},
	  require: function (path, base) {
      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
    }
	}, fn(module, module.exports), module.exports;
}

function getCjsExportFromNamespace (n) {
	return n && n['default'] || n;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var util = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.underbar_prefix = exports.uppercase = exports.space_or_underbar = exports.underbar = exports.id_suffix = void 0;
/**
 * @description These are regular expressions used for converting between String formats.
 * @private
 */
exports.id_suffix = new RegExp('(_ids|_id)$', 'g');
exports.underbar = new RegExp('_', 'g');
exports.space_or_underbar = new RegExp('[\ _]', 'g');
exports.uppercase = new RegExp('([A-Z])', 'g');
exports.underbar_prefix = new RegExp('^_');

});

var dasherize_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.dasherize = void 0;
/**
 * This function replaces underscores with dashes in the string.
 * @public
 * @function
 * @param {String} str The subject string.
 * @returns {String} Replaces all spaces or underscores with dashes.
 * @example
 *
 *     var inflection = require( 'inflection' );
 *
 *     inflection.dasherize( 'message_properties' ); // === 'message-properties'
 *     inflection.dasherize( 'Message Properties' ); // === 'Message-Properties'
 */

function dasherize(str) {
    return str.replace(util.space_or_underbar, '-');
}
exports.dasherize = dasherize;
exports.default = dasherize;

});

var ordinalize_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordinalize = void 0;
/**
 * This function adds ordinalize support to every String object.
 * @public
 * @function
 * @param {String} str The subject string.
 * @returns {String} Return all found numbers their sequence like '22nd'.
 * @example
 *
 *     var inflection = require( 'inflection' );
 *
 *     inflection.ordinalize( 'the 1 pitch' ); // === 'the 1st pitch'
 */
function ordinalize(str) {
    const str_arr = str.split(' ');
    let i = 0;
    const j = str_arr.length;
    for (; i < j; i++) {
        let k = parseInt(str_arr[i], 10);
        if (!isNaN(k)) {
            let ltd = str_arr[i].substring(str_arr[i].length - 2);
            let ld = str_arr[i].substring(str_arr[i].length - 1);
            let suf = 'th';
            if (ltd != '11' && ltd != '12' && ltd != '13') {
                if (ld === '1') {
                    suf = 'st';
                }
                else if (ld === '2') {
                    suf = 'nd';
                }
                else if (ld === '3') {
                    suf = 'rd';
                }
            }
            str_arr[i] += suf;
        }
    }
    return str_arr.join(' ');
}
exports.ordinalize = ordinalize;
exports.default = ordinalize;

});

var indexOf_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexOf = void 0;
/**
 * This lets us detect if an Array contains a given element.
 * @public
 * @function
 * @param {Array} arr The subject array.
 * @param {Object} item Object to locate in the Array.
 * @param {Number} from_index Starts checking from this position in the Array.(optional)
 * @param {Function} compare_func Function used to compare Array item vs passed item.(optional)
 * @returns {Number} Return index position in the Array of the passed item.
 * @example
 *
 *     var inflection = require( 'inflection' );
 *
 *     inflection.indexOf([ 'hi','there' ], 'guys' ); // === -1
 *     inflection.indexOf([ 'hi','there' ], 'hi' ); // === 0
 */
function indexOf(arr, item, from_index, compare_func) {
    if (!from_index) {
        from_index = -1;
    }
    let index = -1;
    let i = from_index;
    const j = arr.length;
    for (; i < j; i++) {
        if (arr[i] === item || compare_func && compare_func(arr[i], item)) {
            index = i;
            break;
        }
    }
    return index;
}
exports.indexOf = indexOf;
exports.default = indexOf;

});

var _apply_rules_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports._apply_rules = void 0;

/**
 * A helper method that applies rules based replacement to a String.
 * @private
 * @function
 * @param {String} str String to modify and return based on the passed rules.
 * @param {Array: [RegExp, String]} rules Regexp to match paired with String to use for replacement
 * @param {Array: [String]} skip Strings to skip if they match
 * @param {String} override String to return as though this method succeeded (used to conform to APIs)
 * @returns {String} Return passed String modified by passed rules.
 * @example
 *
 *     this._apply_rules( 'cows', singular_rules ); // === 'cow'
 */
function _apply_rules(str, rules, skip, override) {
    if (override) {
        str = override;
    }
    else {
        let ignore = (indexOf_1.indexOf(skip, str.toLowerCase()) > -1);
        if (!ignore) {
            let i = 0;
            let j = rules.length;
            for (; i < j; i++) {
                if (str.match(rules[i][0])) {
                    if (rules[i][1] !== undefined) {
                        str = str.replace(rules[i][0], rules[i][1]);
                    }
                    break;
                }
            }
        }
    }
    return str;
}
exports._apply_rules = _apply_rules;
exports.default = _apply_rules;

});

var uncountable_words = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.uncountable_words = void 0;
/**
 * @description This is a list of nouns that use the same form for both singular and plural.
 *              This list should remain entirely in lower case to correctly match Strings.
 * @private
 */
exports.uncountable_words = [
    // 'access',
    'accommodation',
    'adulthood',
    'advertising',
    'advice',
    'aggression',
    'aid',
    'air',
    'aircraft',
    'alcohol',
    'anger',
    'applause',
    'arithmetic',
    // 'art',
    'assistance',
    'athletics',
    // 'attention',
    'bacon',
    'baggage',
    // 'ballet',
    // 'beauty',
    'beef',
    // 'beer',
    // 'behavior',
    'biology',
    // 'billiards',
    'blood',
    'botany',
    // 'bowels',
    'bread',
    // 'business',
    'butter',
    'carbon',
    'cardboard',
    'cash',
    'chalk',
    'chaos',
    'chess',
    'crossroads',
    'countryside',
    // 'damage',
    'dancing',
    // 'danger',
    'deer',
    // 'delight',
    // 'dessert',
    'dignity',
    'dirt',
    // 'distribution',
    'dust',
    'economics',
    'education',
    'electricity',
    // 'employment',
    // 'energy',
    'engineering',
    'enjoyment',
    // 'entertainment',
    'envy',
    'equipment',
    'ethics',
    'evidence',
    'evolution',
    // 'failure',
    // 'faith',
    'fame',
    'fiction',
    // 'fish',
    'flour',
    'flu',
    'food',
    // 'freedom',
    // 'fruit',
    'fuel',
    'fun',
    // 'funeral',
    'furniture',
    'gallows',
    'garbage',
    'garlic',
    // 'gas',
    'genetics',
    // 'glass',
    'gold',
    'golf',
    'gossip',
    'grammar',
    // 'grass',
    'gratitude',
    'grief',
    // 'ground',
    'guilt',
    'gymnastics',
    // 'hair',
    'happiness',
    'hardware',
    'harm',
    'hate',
    'hatred',
    'health',
    'heat',
    // 'height',
    'help',
    'homework',
    'honesty',
    'honey',
    'hospitality',
    'housework',
    'humour',
    'hunger',
    'hydrogen',
    'ice',
    'importance',
    'inflation',
    'information',
    // 'injustice',
    'innocence',
    // 'intelligence',
    'iron',
    'irony',
    'jam',
    // 'jealousy',
    // 'jelly',
    'jewelry',
    // 'joy',
    'judo',
    // 'juice',
    // 'justice',
    'karate',
    // 'kindness',
    'knowledge',
    // 'labour',
    'lack',
    // 'land',
    'laughter',
    'lava',
    'leather',
    'leisure',
    'lightning',
    'linguine',
    'linguini',
    'linguistics',
    'literature',
    'litter',
    'livestock',
    'logic',
    'loneliness',
    // 'love',
    'luck',
    'luggage',
    'macaroni',
    'machinery',
    'magic',
    // 'mail',
    'management',
    'mankind',
    'marble',
    'mathematics',
    'mayonnaise',
    'measles',
    // 'meat',
    // 'metal',
    'methane',
    'milk',
    'minus',
    'money',
    // 'moose',
    'mud',
    'music',
    'mumps',
    'nature',
    'news',
    'nitrogen',
    'nonsense',
    'nurture',
    'nutrition',
    'obedience',
    'obesity',
    // 'oil',
    'oxygen',
    // 'paper',
    // 'passion',
    'pasta',
    'patience',
    // 'permission',
    'physics',
    'poetry',
    'pollution',
    'poverty',
    // 'power',
    'pride',
    // 'production',
    // 'progress',
    // 'pronunciation',
    'psychology',
    'publicity',
    'punctuation',
    // 'quality',
    // 'quantity',
    'quartz',
    'racism',
    // 'rain',
    // 'recreation',
    'relaxation',
    'reliability',
    'research',
    'respect',
    'revenge',
    'rice',
    'rubbish',
    'rum',
    'safety',
    // 'salad',
    // 'salt',
    // 'sand',
    // 'satire',
    'scenery',
    'seafood',
    'seaside',
    'series',
    'shame',
    'sheep',
    'shopping',
    // 'silence',
    'sleep',
    // 'slang'
    'smoke',
    'smoking',
    'snow',
    'soap',
    'software',
    'soil',
    // 'sorrow',
    // 'soup',
    'spaghetti',
    // 'speed',
    'species',
    // 'spelling',
    // 'sport',
    'steam',
    // 'strength',
    'stuff',
    'stupidity',
    // 'success',
    // 'sugar',
    'sunshine',
    'symmetry',
    // 'tea',
    'tennis',
    'thirst',
    'thunder',
    'timber',
    // 'time',
    // 'toast',
    // 'tolerance',
    // 'trade',
    'traffic',
    'transportation',
    // 'travel',
    'trust',
    // 'understanding',
    'underwear',
    'unemployment',
    'unity',
    // 'usage',
    'validity',
    'veal',
    'vegetation',
    'vegetarianism',
    'vengeance',
    'violence',
    // 'vision',
    'vitality',
    'warmth',
    // 'water',
    'wealth',
    'weather',
    // 'weight',
    'welfare',
    'wheat',
    // 'whiskey',
    // 'width',
    'wildlife',
    // 'wine',
    'wisdom',
    // 'wood',
    // 'wool',
    // 'work',
    // 'yeast',
    'yoga',
    'zinc',
    'zoology',
];
exports.default = exports.uncountable_words;

});

var regex = createCommonjsModule(function (module, exports) {
/**
 * @description These rules translate from the singular form of a noun to its plural form.
 * @private
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.regex = void 0;
exports.regex = {
    plural: {
        men: new RegExp('^(m|wom)en$', 'gi'),
        people: new RegExp('(pe)ople$', 'gi'),
        children: new RegExp('(child)ren$', 'gi'),
        tia: new RegExp('([ti])a$', 'gi'),
        analyses: new RegExp('((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$', 'gi'),
        hives: new RegExp('(hi|ti)ves$', 'gi'),
        curves: new RegExp('(curve)s$', 'gi'),
        lrves: new RegExp('([lr])ves$', 'gi'),
        aves: new RegExp('([a])ves$', 'gi'),
        foves: new RegExp('([^fo])ves$', 'gi'),
        movies: new RegExp('(m)ovies$', 'gi'),
        aeiouyies: new RegExp('([^aeiouy]|qu)ies$', 'gi'),
        series: new RegExp('(s)eries$', 'gi'),
        xes: new RegExp('(x|ch|ss|sh)es$', 'gi'),
        mice: new RegExp('([m|l])ice$', 'gi'),
        buses: new RegExp('(bus)es$', 'gi'),
        oes: new RegExp('(o)es$', 'gi'),
        shoes: new RegExp('(shoe)s$', 'gi'),
        crises: new RegExp('(cris|ax|test)es$', 'gi'),
        octopi: new RegExp('(octop|vir)i$', 'gi'),
        aliases: new RegExp('(alias|canvas|status|campus)es$', 'gi'),
        summonses: new RegExp('^(summons)es$', 'gi'),
        oxen: new RegExp('^(ox)en', 'gi'),
        matrices: new RegExp('(matr)ices$', 'gi'),
        vertices: new RegExp('(vert|ind)ices$', 'gi'),
        feet: new RegExp('^feet$', 'gi'),
        teeth: new RegExp('^teeth$', 'gi'),
        geese: new RegExp('^geese$', 'gi'),
        quizzes: new RegExp('(quiz)zes$', 'gi'),
        whereases: new RegExp('^(whereas)es$', 'gi'),
        criteria: new RegExp('^(criteri)a$', 'gi'),
        genera: new RegExp('^genera$', 'gi'),
        ss: new RegExp('ss$', 'gi'),
        s: new RegExp('s$', 'gi'),
    },
    singular: {
        man: new RegExp('^(m|wom)an$', 'gi'),
        person: new RegExp('(pe)rson$', 'gi'),
        child: new RegExp('(child)$', 'gi'),
        ox: new RegExp('^(ox)$', 'gi'),
        axis: new RegExp('(ax|test)is$', 'gi'),
        octopus: new RegExp('(octop|vir)us$', 'gi'),
        alias: new RegExp('(alias|status|canvas|campus)$', 'gi'),
        summons: new RegExp('^(summons)$', 'gi'),
        bus: new RegExp('(bu)s$', 'gi'),
        buffalo: new RegExp('(buffal|tomat|potat)o$', 'gi'),
        tium: new RegExp('([ti])um$', 'gi'),
        sis: new RegExp('sis$', 'gi'),
        ffe: new RegExp('(?:([^f])fe|([lr])f)$', 'gi'),
        hive: new RegExp('(hi|ti)ve$', 'gi'),
        aeiouyy: new RegExp('([^aeiouy]|qu)y$', 'gi'),
        x: new RegExp('(x|ch|ss|sh)$', 'gi'),
        matrix: new RegExp('(matr)ix$', 'gi'),
        vertex: new RegExp('(vert|ind)ex$', 'gi'),
        mouse: new RegExp('([m|l])ouse$', 'gi'),
        foot: new RegExp('^foot$', 'gi'),
        tooth: new RegExp('^tooth$', 'gi'),
        goose: new RegExp('^goose$', 'gi'),
        quiz: new RegExp('(quiz)$', 'gi'),
        whereas: new RegExp('^(whereas)$', 'gi'),
        criterion: new RegExp('^(criteri)on$', 'gi'),
        genus: new RegExp('^genus$', 'gi'),
        s: new RegExp('s$', 'gi'),
        common: new RegExp('$', 'gi'),
    },
};
exports.default = exports.regex;

});

var plural_rules = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.plural_rules = void 0;

exports.plural_rules = [
    // do not replace if its already a plural word
    [regex.regex.plural.men],
    [regex.regex.plural.people],
    [regex.regex.plural.children],
    [regex.regex.plural.tia],
    [regex.regex.plural.analyses],
    [regex.regex.plural.hives],
    [regex.regex.plural.curves],
    [regex.regex.plural.lrves],
    [regex.regex.plural.foves],
    [regex.regex.plural.aeiouyies],
    [regex.regex.plural.series],
    [regex.regex.plural.movies],
    [regex.regex.plural.xes],
    [regex.regex.plural.mice],
    [regex.regex.plural.buses],
    [regex.regex.plural.oes],
    [regex.regex.plural.shoes],
    [regex.regex.plural.crises],
    [regex.regex.plural.octopi],
    [regex.regex.plural.aliases],
    [regex.regex.plural.summonses],
    [regex.regex.plural.oxen],
    [regex.regex.plural.matrices],
    [regex.regex.plural.feet],
    [regex.regex.plural.teeth],
    [regex.regex.plural.geese],
    [regex.regex.plural.quizzes],
    [regex.regex.plural.whereases],
    [regex.regex.plural.criteria],
    [regex.regex.plural.genera],
    // original rule
    [regex.regex.singular.man, '$1en'],
    [regex.regex.singular.person, '$1ople'],
    [regex.regex.singular.child, '$1ren'],
    [regex.regex.singular.ox, '$1en'],
    [regex.regex.singular.axis, '$1es'],
    [regex.regex.singular.octopus, '$1i'],
    [regex.regex.singular.alias, '$1es'],
    [regex.regex.singular.summons, '$1es'],
    [regex.regex.singular.bus, '$1ses'],
    [regex.regex.singular.buffalo, '$1oes'],
    [regex.regex.singular.tium, '$1a'],
    [regex.regex.singular.sis, 'ses'],
    [regex.regex.singular.ffe, '$1$2ves'],
    [regex.regex.singular.hive, '$1ves'],
    [regex.regex.singular.aeiouyy, '$1ies'],
    [regex.regex.singular.matrix, '$1ices'],
    [regex.regex.singular.vertex, '$1ices'],
    [regex.regex.singular.x, '$1es'],
    [regex.regex.singular.mouse, '$1ice'],
    [regex.regex.singular.foot, 'feet'],
    [regex.regex.singular.tooth, 'teeth'],
    [regex.regex.singular.goose, 'geese'],
    [regex.regex.singular.quiz, '$1zes'],
    [regex.regex.singular.whereas, '$1es'],
    [regex.regex.singular.criterion, '$1a'],
    [regex.regex.singular.genus, 'genera'],
    [regex.regex.singular.s, 's'],
    [regex.regex.singular.common, 's'],
];
exports.default = exports.plural_rules;

});

var pluralize_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.pluralize = void 0;



/**
 * This function adds pluralization support to every String object.
 * @public
 * @function
 * @param {String} str The subject string.
 * @param {String} plural Overrides normal output with said String.(optional)
 * @returns {String} Singular English language nouns are returned in plural form.
 * @example
 *
 *     var inflection = require( 'inflection' );
 *
 *     inflection.pluralize( 'person' ); // === 'people'
 *     inflection.pluralize( 'octopus' ); // === 'octopi'
 *     inflection.pluralize( 'Hat' ); // === 'Hats'
 *     inflection.pluralize( 'person', 'guys' ); // === 'guys'
 */
function pluralize(str, plural) {
    return _apply_rules_1._apply_rules(str, plural_rules.plural_rules, uncountable_words.uncountable_words, plural);
}
exports.pluralize = pluralize;
exports.default = pluralize;

});

var singular_rules = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.singular_rules = void 0;

/**
 * @description These rules translate from the plural form of a noun to its singular form.
 * @private
 */
exports.singular_rules = [
    // do not replace if its already a singular word
    [regex.regex.singular.man],
    [regex.regex.singular.person],
    [regex.regex.singular.child],
    [regex.regex.singular.ox],
    [regex.regex.singular.axis],
    [regex.regex.singular.octopus],
    [regex.regex.singular.alias],
    [regex.regex.singular.summons],
    [regex.regex.singular.bus],
    [regex.regex.singular.buffalo],
    [regex.regex.singular.tium],
    [regex.regex.singular.sis],
    [regex.regex.singular.ffe],
    [regex.regex.singular.hive],
    [regex.regex.singular.aeiouyy],
    [regex.regex.singular.x],
    [regex.regex.singular.matrix],
    [regex.regex.singular.mouse],
    [regex.regex.singular.foot],
    [regex.regex.singular.tooth],
    [regex.regex.singular.goose],
    [regex.regex.singular.quiz],
    [regex.regex.singular.whereas],
    [regex.regex.singular.criterion],
    [regex.regex.singular.genus],
    // original rule
    [regex.regex.plural.men, '$1an'],
    [regex.regex.plural.people, '$1rson'],
    [regex.regex.plural.children, '$1'],
    [regex.regex.plural.genera, 'genus'],
    [regex.regex.plural.criteria, '$1on'],
    [regex.regex.plural.tia, '$1um'],
    [regex.regex.plural.analyses, '$1$2sis'],
    [regex.regex.plural.hives, '$1ve'],
    [regex.regex.plural.curves, '$1'],
    [regex.regex.plural.lrves, '$1f'],
    [regex.regex.plural.aves, '$1ve'],
    [regex.regex.plural.foves, '$1fe'],
    [regex.regex.plural.movies, '$1ovie'],
    [regex.regex.plural.aeiouyies, '$1y'],
    [regex.regex.plural.series, '$1eries'],
    [regex.regex.plural.xes, '$1'],
    [regex.regex.plural.mice, '$1ouse'],
    [regex.regex.plural.buses, '$1'],
    [regex.regex.plural.oes, '$1'],
    [regex.regex.plural.shoes, '$1'],
    [regex.regex.plural.crises, '$1is'],
    [regex.regex.plural.octopi, '$1us'],
    [regex.regex.plural.aliases, '$1'],
    [regex.regex.plural.summonses, '$1'],
    [regex.regex.plural.oxen, '$1'],
    [regex.regex.plural.matrices, '$1ix'],
    [regex.regex.plural.vertices, '$1ex'],
    [regex.regex.plural.feet, 'foot'],
    [regex.regex.plural.teeth, 'tooth'],
    [regex.regex.plural.geese, 'goose'],
    [regex.regex.plural.quizzes, '$1'],
    [regex.regex.plural.whereases, '$1'],
    [regex.regex.plural.ss, 'ss'],
    [regex.regex.plural.s, ''],
];
exports.default = exports.singular_rules;

});

var singularize_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.singularize = void 0;



/**
 * This function adds singularization support to every String object.
 * @public
 * @function
 * @param {String} str The subject string.
 * @param {String} singular Overrides normal output with said String.(optional)
 * @returns {String} Plural English language nouns are returned in singular form.
 * @example
 *
 *     var inflection = require( 'inflection' );
 *
 *     inflection.singularize( 'people' ); // === 'person'
 *     inflection.singularize( 'octopi' ); // === 'octopus'
 *     inflection.singularize( 'Hats' ); // === 'Hat'
 *     inflection.singularize( 'guys', 'person' ); // === 'person'
 */
function singularize(str, singular) {
    return _apply_rules_1._apply_rules(str, singular_rules.singular_rules, uncountable_words.uncountable_words, singular);
}
exports.singularize = singularize;
exports.default = singularize;

});

var inflect_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.inflect = void 0;




/**
 * This function will pluralize or singularlize a String appropriately based on an integer value
 * @public
 * @function
 * @param {String} str The subject string.
 * @param {Number} count The number to base pluralization off of.
 * @param {String} singular Overrides normal output with said String.(optional)
 * @param {String} plural Overrides normal output with said String.(optional)
 * @returns {String} English language nouns are returned in the plural or singular form based on the count.
 * @example
 *
 *     var inflection = require( 'inflection' );
 *
 *     inflection.inflect( 'people' 1 ); // === 'person'
 *     inflection.inflect( 'octopi' 1 ); // === 'octopus'
 *     inflection.inflect( 'Hats' 1 ); // === 'Hat'
 *     inflection.inflect( 'guys', 1 , 'person' ); // === 'person'
 *     inflection.inflect( 'person', 2 ); // === 'people'
 *     inflection.inflect( 'octopus', 2 ); // === 'octopi'
 *     inflection.inflect( 'Hat', 2 ); // === 'Hats'
 *     inflection.inflect( 'person', 2, null, 'guys' ); // === 'guys'
 */
function inflect(str, count, singular, plural) {
    count = parseInt(count, 10);
    if (isNaN(count))
        return str;
    if (count === 0 || count > 1) {
        return _apply_rules_1._apply_rules(str, plural_rules.plural_rules, uncountable_words.uncountable_words, plural);
    }
    else {
        return _apply_rules_1._apply_rules(str, singular_rules.singular_rules, uncountable_words.uncountable_words, singular);
    }
}
exports.inflect = inflect;
exports.default = inflect;

});

var camelize_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.camelize = void 0;
/**
 * This function adds camelization support to every String object.
 * @public
 * @function
 * @param {String} str The subject string.
 * @param {Boolean} low_first_letter Default is to capitalize the first letter of the results.(optional)
 *                                 Passing true will lowercase it.
 * @returns {String} Lower case underscored words will be returned in camel case.
 *                  additionally '/' is translated to '::'
 * @example
 *
 *     var inflection = require( 'inflection' );
 *
 *     inflection.camelize( 'message_properties' ); // === 'MessageProperties'
 *     inflection.camelize( 'message_properties', true ); // === 'messageProperties'
 */
function camelize(str, low_first_letter) {
    const str_path = str.split('/');
    let i = 0;
    const j = str_path.length;
    let str_arr, k, l, first;
    for (; i < j; i++) {
        str_arr = str_path[i].split('_');
        k = 0;
        l = str_arr.length;
        for (; k < l; k++) {
            if (k !== 0) {
                str_arr[k] = str_arr[k].toLowerCase();
            }
            first = str_arr[k].charAt(0);
            first = low_first_letter && i === 0 && k === 0
                ? first.toLowerCase() : first.toUpperCase();
            str_arr[k] = first + str_arr[k].substring(1);
        }
        str_path[i] = str_arr.join('');
    }
    return str_path.join('::');
}
exports.camelize = camelize;
exports.default = camelize;

});

var underscore_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.underscore = void 0;

/**
 * This function adds underscore support to every String object.
 * @public
 * @function
 * @param {String} str The subject string.
 * @param {Boolean} all_upper_case Default is to lowercase and add underscore prefix.(optional)
 *                  Passing true will return as entered.
 * @returns {String} Camel cased words are returned as lower cased and underscored.
 *                  additionally '::' is translated to '/'.
 * @example
 *
 *     var inflection = require( 'inflection' );
 *
 *     inflection.underscore( 'MessageProperties' ); // === 'message_properties'
 *     inflection.underscore( 'messageProperties' ); // === 'message_properties'
 *     inflection.underscore( 'MP', true ); // === 'MP'
 */
function underscore(str, all_upper_case) {
    if (all_upper_case && str === str.toUpperCase())
        return str;
    const str_path = str.split('::');
    let i = 0;
    const j = str_path.length;
    for (; i < j; i++) {
        str_path[i] = str_path[i].replace(util.uppercase, '_$1');
        str_path[i] = str_path[i].replace(util.underbar_prefix, '');
    }
    return str_path.join('/').toLowerCase();
}
exports.underscore = underscore;
exports.default = underscore;

});

var capitalize_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.capitalize = void 0;
/**
 * This function adds capitalization support to every String object.
 * @public
 * @function
 * @param {String} str The subject string.
 * @returns {String} All characters will be lower case and the first will be upper.
 * @example
 *
 *     var inflection = require( 'inflection' );
 *
 *     inflection.capitalize( 'message_properties' ); // === 'Message_properties'
 *     inflection.capitalize( 'message properties', true ); // === 'Message properties'
 */
function capitalize(str) {
    str = str.toLowerCase();
    return str.substring(0, 1).toUpperCase() + str.substring(1);
}
exports.capitalize = capitalize;
exports.default = capitalize;

});

var non_titlecased_words = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.non_titlecased_words = void 0;
/**
 * @description This is a list of words that should not be capitalized for title case.
 * @private
 */
exports.non_titlecased_words = [
    'and', 'or', 'nor', 'a', 'an', 'the', 'so', 'but', 'to', 'of', 'at', 'by',
    'from', 'into', 'on', 'onto', 'off', 'out', 'in', 'over', 'with', 'for',
];
exports.default = exports.non_titlecased_words;

});

var titleize_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.titleize = void 0;




/**
 * This function adds titleize support to every String object.
 * @public
 * @function
 * @param {String} str The subject string.
 * @returns {String} Capitalizes words as you would for a book title.
 * @example
 *
 *     var inflection = require( 'inflection' );
 *
 *     inflection.titleize( 'message_properties' ); // === 'Message Properties'
 *     inflection.titleize( 'message properties to keep' ); // === 'Message Properties to Keep'
 */
function titleize(str) {
    str = str.toLowerCase().replace(util.underbar, ' ');
    const str_arr = str.split(' ');
    let i = 0;
    const j = str_arr.length;
    let d, k, l;
    for (; i < j; i++) {
        d = str_arr[i].split('-');
        k = 0;
        l = d.length;
        for (; k < l; k++) {
            if (indexOf_1.indexOf(non_titlecased_words.non_titlecased_words, d[k].toLowerCase()) < 0) {
                d[k] = capitalize_1.capitalize(d[k]);
            }
        }
        str_arr[i] = d.join('-');
    }
    str = str_arr.join(' ');
    str = str.substring(0, 1).toUpperCase() + str.substring(1);
    return str;
}
exports.titleize = titleize;
exports.default = titleize;

});

var tableize_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.tableize = void 0;


/**
 * This function adds tableize support to every String object.
 * @public
 * @function
 * @param {String} str The subject string.
 * @returns {String} Return camel cased words into their underscored plural form.
 * @example
 *
 *     var inflection = require( 'inflection' );
 *
 *     inflection.tableize( 'MessageBusProperty' ); // === 'message_bus_properties'
 */
function tableize(str) {
    str = underscore_1.underscore(str);
    str = pluralize_1.pluralize(str);
    return str;
}
exports.tableize = tableize;
exports.default = tableize;

});

var kebabize_1 = createCommonjsModule(function (module, exports) {
var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.kebabize = void 0;

const dasherize_1$1 = __importDefault(dasherize_1);
/**
 * This function adds kebabize support to every String object.
 * @public
 * @function
 * @param {String} str The subject string.
 * @returns {String} Return camel cased words into kebab-case form.
 * @example
 *
 *     var inflection = require( 'inflection' );
 *
 *     inflection.kebabize( 'MessageBusProperty' ); // === 'message-bus-property'
 */
function kebabize(str) {
    str = underscore_1.underscore(str);
    str = dasherize_1$1.default(str);
    return str;
}
exports.kebabize = kebabize;
exports.default = kebabize;

});

var classify_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.classify = void 0;


/**
 * This function adds classification support to every String object.
 * @public
 * @function
 * @param {String} str The subject string.
 * @returns {String} Underscored plural nouns become the camel cased singular form.
 * @example
 *
 *     var inflection = require( 'inflection' );
 *
 *     inflection.classify( 'message_bus_properties' ); // === 'MessageBusProperty'
 */
function classify(str) {
    str = camelize_1.camelize(str);
    str = singularize_1.singularize(str);
    return str;
}
exports.classify = classify;
exports.default = classify;

});

var demodulize_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.demodulize = void 0;
/**
 * This function adds demodulize support to every String object.
 * @public
 * @function
 * @param {String} str The subject string.
 * @returns {String} Removes module names leaving only class names.(Ruby style)
 * @example
 *
 *     var inflection = require( 'inflection' );
 *
 *     inflection.demodulize( 'Message::Bus::Properties' ); // === 'Properties'
 */
function demodulize(str) {
    const str_arr = str.split('::');
    return str_arr[str_arr.length - 1];
}
exports.demodulize = demodulize;
exports.default = demodulize;

});

var humanize_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.humanize = void 0;


/**
 * This function adds humanize support to every String object.
 * @public
 * @function
 * @param {String} str The subject string.
 * @param {Boolean} low_first_letter Default is to capitalize the first letter of the results.(optional)
 *                                 Passing true will lowercase it.
 * @returns {String} Lower case underscored words will be returned in humanized form.
 * @example
 *
 *     var inflection = require( 'inflection' );
 *
 *     inflection.humanize( 'message_properties' ); // === 'Message properties'
 *     inflection.humanize( 'message_properties', true ); // === 'message properties'
 */
function humanize(str, low_first_letter) {
    str = str.toLowerCase();
    str = str.replace(util.id_suffix, '');
    str = str.replace(util.underbar, ' ');
    if (!low_first_letter) {
        str = capitalize_1.capitalize(str);
    }
    return str;
}
exports.humanize = humanize;
exports.default = humanize;

});

var foreign_key_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.foreign_key = void 0;


/**
 * This function adds foreign key support to every String object.
 * @public
 * @function
 * @param {String} str The subject string.
 * @param {Boolean} drop_id_ubar Default is to seperate id with an underbar at the end of the class name,
you can pass true to skip it.(optional)
 * @returns {String} Underscored plural nouns become the camel cased singular form.
 * @example
 *
 *     var inflection = require( 'inflection' );
 *
 *     inflection.foreign_key( 'MessageBusProperty' ); // === 'message_bus_property_id'
 *     inflection.foreign_key( 'MessageBusProperty', true ); // === 'message_bus_propertyid'
 */
function foreign_key(str, drop_id_ubar) {
    str = demodulize_1.demodulize(str);
    str = underscore_1.underscore(str) + ((drop_id_ubar) ? ('') : ('_')) + 'id';
    return str;
}
exports.foreign_key = foreign_key;
exports.default = foreign_key;

});

var inflector = createCommonjsModule(function (module, exports) {
var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inflector = void 0;
const pluralize_1$1 = __importDefault(pluralize_1);
const singularize_1$1 = __importDefault(singularize_1);
const inflect_1$1 = __importDefault(inflect_1);
const camelize_1$1 = __importDefault(camelize_1);
const underscore_1$1 = __importDefault(underscore_1);
const humanize_1$1 = __importDefault(humanize_1);
const capitalize_1$1 = __importDefault(capitalize_1);
const dasherize_1$1 = __importDefault(dasherize_1);
const titleize_1$1 = __importDefault(titleize_1);
const demodulize_1$1 = __importDefault(demodulize_1);
const tableize_1$1 = __importDefault(tableize_1);
const kebabize_1$1 = __importDefault(kebabize_1);
const classify_1$1 = __importDefault(classify_1);
const foreign_key_1$1 = __importDefault(foreign_key_1);
const ordinalize_1$1 = __importDefault(ordinalize_1);
exports.inflector = {
    pluralize: pluralize_1$1.default,
    singularize: singularize_1$1.default,
    inflect: inflect_1$1.default,
    camelize: camelize_1$1.default,
    underscore: underscore_1$1.default,
    humanize: humanize_1$1.default,
    capitalize: capitalize_1$1.default,
    dasherize: dasherize_1$1.default,
    titleize: titleize_1$1.default,
    demodulize: demodulize_1$1.default,
    tableize: tableize_1$1.default,
    kebabize: kebabize_1$1.default,
    classify: classify_1$1.default,
    foreign_key: foreign_key_1$1.default,
    ordinalize: ordinalize_1$1.default,
};
exports.default = exports.inflector;

});

var transform_1 = createCommonjsModule(function (module, exports) {
var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transform = void 0;
/**
 * This function performs multiple inflection methods on a string
 * @public
 * @function
 * @param {String} str The subject string.
 * @param {Array} arr An array of inflection methods.
 * @returns {String}
 * @example
 *
 *     var inflection = require( 'inflection' );
 *
 *     inflection.transform( 'all job', [ 'pluralize', 'capitalize', 'dasherize' ]); // === 'All-jobs'
 */
const inflector_1 = __importDefault(inflector);
function transform(str, arr) {
    for (const method of arr) {
        if (typeof method === 'function') {
            str = method(str);
        }
        else if (inflector_1.default.hasOwnProperty(method)) {
            str = inflector_1.default[method](str);
        }
    }
    return str;
}
exports.transform = transform;
exports.default = transform;

});

var inflection2 = createCommonjsModule(function (module, exports) {
/*!
 * inflection
 * Copyright(c) 2011 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileoverview
 * A port of inflection-js to node.js module.
 */
var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transform = exports.ordinalize = exports.foreign_key = exports.classify = exports.kebabize = exports.tableize = exports.demodulize = exports.titleize = exports.dasherize = exports.capitalize = exports.humanize = exports.underscore = exports.camelize = exports.inflect = exports.singularize = exports.pluralize = exports.indexOf = exports._apply_rules = void 0;
const dasherize_1$1 = __importDefault(dasherize_1);
exports.dasherize = dasherize_1$1.default;
const ordinalize_1$1 = __importDefault(ordinalize_1);
exports.ordinalize = ordinalize_1$1.default;
const indexOf_1$1 = __importDefault(indexOf_1);
exports.indexOf = indexOf_1$1.default;
const _apply_rules_1$1 = __importDefault(_apply_rules_1);
exports._apply_rules = _apply_rules_1$1.default;
const pluralize_1$1 = __importDefault(pluralize_1);
exports.pluralize = pluralize_1$1.default;
const singularize_1$1 = __importDefault(singularize_1);
exports.singularize = singularize_1$1.default;
const inflect_1$1 = __importDefault(inflect_1);
exports.inflect = inflect_1$1.default;
const camelize_1$1 = __importDefault(camelize_1);
exports.camelize = camelize_1$1.default;
const underscore_1$1 = __importDefault(underscore_1);
exports.underscore = underscore_1$1.default;
const capitalize_1$1 = __importDefault(capitalize_1);
exports.capitalize = capitalize_1$1.default;
const titleize_1$1 = __importDefault(titleize_1);
exports.titleize = titleize_1$1.default;
const tableize_1$1 = __importDefault(tableize_1);
exports.tableize = tableize_1$1.default;
const kebabize_1$1 = __importDefault(kebabize_1);
exports.kebabize = kebabize_1$1.default;
const classify_1$1 = __importDefault(classify_1);
exports.classify = classify_1$1.default;
const demodulize_1$1 = __importDefault(demodulize_1);
exports.demodulize = demodulize_1$1.default;
const humanize_1$1 = __importDefault(humanize_1);
exports.humanize = humanize_1$1.default;
const foreign_key_1$1 = __importDefault(foreign_key_1);
exports.foreign_key = foreign_key_1$1.default;
const transform_1$1 = __importDefault(transform_1);
exports.transform = transform_1$1.default;
exports.default = {
    _apply_rules: _apply_rules_1$1.default,
    indexOf: indexOf_1$1.default,
    pluralize: pluralize_1$1.default,
    singularize: singularize_1$1.default,
    inflect: inflect_1$1.default,
    camelize: camelize_1$1.default,
    underscore: underscore_1$1.default,
    humanize: humanize_1$1.default,
    capitalize: capitalize_1$1.default,
    dasherize: dasherize_1$1.default,
    titleize: titleize_1$1.default,
    demodulize: demodulize_1$1.default,
    tableize: tableize_1$1.default,
    kebabize: kebabize_1$1.default,
    classify: classify_1$1.default,
    foreign_key: foreign_key_1$1.default,
    ordinalize: ordinalize_1$1.default,
    transform: transform_1$1.default,
};

});

var index = /*@__PURE__*/unwrapExports(inflection2);

const LocalBundle = 'vendor/bundle/**';
const gitignores = {};
function dectFileType(filePath) {
    for (const [key, value] of FileTypeRelPath) {
        if (filePath.indexOf(value) >= 0) {
            return key;
        }
    }
    return FileType.Unkown;
}
function wordsToPath(s) {
    return index.underscore(s.replace(/[A-Z]{2,}(?![a-z])/, (s) => {
        return index.titleize(s);
    }));
}
function flatten(arr) {
    return arr.reduce((flat, toFlatten) => {
        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
}
function toPosixPath(s) {
    return s.split(path__default.sep).join(path__default.posix.sep);
}
/**
 * findFiles in root of document and repect gitignore
 */
function findFiles(document, include, exclude, maxResults, token) {
    const ws = vscode.workspace.getWorkspaceFolder(document.uri);
    const name = ws.name;
    const _include = new vscode.RelativePattern(ws, toPosixPath(include));
    const _exclude = gitignores[name] && exclude ? gitignores[name].concat(exclude) : exclude;
    return vscode.workspace.findFiles(_include, _exclude + `,${LocalBundle}`, maxResults, token);
}
/**
 * ...Word -> A::B::Word
 */
function getSymbol(document, position) {
    const wordRange = document.getWordRangeAtPosition(position);
    if (!wordRange) {
        return void 0;
    }
    const word = document.getText(wordRange);
    if (!word) {
        return void 0;
    }
    const lineStartToWord = document
        .getText(new vscode.Range(new vscode.Position(position.line, 0), wordRange.end))
        .trim();
    const r = new RegExp('(((::)?[A-Za-z]+)*(::)?' + word + ')').exec(lineStartToWord);
    if (r.length >= 2) {
        return r[1];
    }
}
/**
 *
 * @param symbol A::B::Word
 * @returns lowercase name and sub path
 */
function getSubPathBySymbol(symbol) {
    const seq = symbol
        .split('::')
        .map(wordsToPath)
        .filter((v) => v !== ''), sub = seq.slice(0, -1).join(path__default.sep), name = seq[seq.length - 1];
    return [name, sub];
}

class RailsHelper {
    constructor(document, relativeFileName, line) {
        this.patterns = [
            path.join(REL_CONTROLLERS, 'PTN', '*'),
            path.join(REL_CONTROLLERS, 'PTN*'),
            path.join(REL_MODELS, 'SINGULARIZE', '*'),
            path.join(REL_MODELS, 'SINGULARIZE*'),
            path.join(REL_MODELS, 'BASENAME_SINGULARIZE', '*'),
            path.join(REL_MODELS, 'BASENAME_SINGULARIZE*'),
            path.join(REL_VIEWS, 'PTN', '*'),
            path.join(REL_VIEWS, 'PTN*'),
            path.join(REL_LAYOUTS, 'PTN', '*'),
            path.join(REL_LAYOUTS, 'PTN*'),
            path.join(REL_HELPERS, 'PTN', '*'),
            path.join(REL_HELPERS, 'PTN*'),
            path.join(REL_JAVASCRIPTS, 'PTN', '*'),
            path.join(REL_JAVASCRIPTS, 'PTN*'),
            path.join(REL_STYLESHEETS, 'PTN', '*'),
            path.join(REL_STYLESHEETS, 'PTN*'),
        ];
        this.document = document;
        this.relativeFileName = relativeFileName;
        this.fileName = path.basename(relativeFileName);
        const filePath = path.dirname(relativeFileName);
        this.line = line;
        this.initPatten(filePath);
    }
    searchPaths() {
        const res = [];
        this.patterns.forEach((e) => {
            let p = e.replace('PTN', this.filePatten.toString());
            p = p.replace('BASENAME_SINGULARIZE', index.singularize(path.basename(this.filePatten.toString())));
            p = p.replace('SINGULARIZE', index.singularize(this.filePatten.toString()));
            res.push(p);
        });
        return res;
    }
    initPatten(filePath) {
        this.filePatten = null;
        this.targetFile = null;
        const fileType = dectFileType(filePath), prefix = filePath.substring(FileTypeRelPath.get(fileType).length + 1);
        switch (fileType) {
            case FileType.Controller:
                this.filePatten = path.join(prefix, this.fileName.replace(/_controller\.rb$/, ''));
                if (this.line && /^def\s+/.test(this.line)) {
                    this.filePatten = path.join(this.filePatten, this.line.replace(/^def\s+/, ''));
                }
                break;
            case FileType.Model:
                const filePatten = path.join(prefix, this.fileName.replace(/\.rb$/, ''));
                this.filePatten = index.pluralize(filePatten.toString());
                break;
            case FileType.Layout:
                this.filePatten = path.join(prefix, this.fileName.replace(/\..*?\..*?$/, ''));
                break;
            case FileType.View:
                this.filePatten = prefix;
                break;
            case FileType.Helper:
                this.filePatten =
                    prefix === '' && this.fileName === 'application_helper.rb'
                        ? ''
                        : path.join(prefix, this.fileName.replace(/_helper\.rb$/, ''));
                break;
            case FileType.Javascript:
                this.filePatten = path.join(prefix, this.fileName.replace(/\.js$/, '').replace(/\..*?\..*?$/, ''));
                break;
            case FileType.StyleSheet:
                this.filePatten = path.join(prefix, this.fileName.replace(/\.css$/, '').replace(/\..*?\..*?$/, ''));
                break;
            case FileType.Rspec:
                this.targetFile = path.join('app', prefix, this.fileName.replace('_spec.rb', '.rb'));
                break;
            case FileType.Test:
                this.filePatten = path.join('app', prefix, this.fileName.replace('_test.rb', '.rb'));
                break;
        }
    }
    generateList(arr) {
        const ap = arr.map(async (cur) => {
            const res = await findFiles(this.document, cur.toString(), null);
            return res
                .map((i) => {
                return vscode.workspace.asRelativePath(i);
            })
                .filter((v) => this.relativeFileName !== v);
        });
        return Promise.all(ap).then((lists) => {
            return flatten(lists);
        });
    }
    showQuickPick(items) {
        const p = vscode.window.showQuickPick(items, {
            placeHolder: 'Select File',
            matchOnDetail: true,
        });
        p.then((value) => {
            if (!value)
                return;
            const rootPath = vscode.workspace.getWorkspaceFolder(this.document.uri)
                .uri.path;
            const fn = vscode.Uri.parse('file://' + path.join(rootPath, value));
            vscode.workspace.openTextDocument(fn).then((doc) => {
                return vscode.window.showTextDocument(doc);
            });
        });
    }
    showFileList() {
        if (this.filePatten != null) {
            const paths = this.searchPaths().slice();
            this.generateList(paths).then((v) => {
                this.showQuickPick(v);
            });
        }
        else if (this.targetFile != null) {
            this.generateList([this.targetFile]).then((v) => {
                this.showQuickPick(v);
            });
        }
    }
}

// This file generated through ./bin/gen_symbols.js,Do NOT modify it!
const { CompactPrefixTree, getWordsFromTrie, } = require('compact-prefix-tree/cjs');
const serialized = '{"abstractcontroller":{"":null,"::":{"actionnotfound":{"":null,"::":{"correction":{"":null,"#corrections()":null,"::new()":null},"new()":null}},"base":{"":null,"#a":{"ction_":{"methods()":null,"name()":null},"vailable_action?()":null},"::":{"a":{"bstract!()":null,"ction_methods()":null},"clear_action_methods!()":null,"controller_path()":null,"internal_methods()":null,"method_added()":null,"supports_path?()":null},"#controller_path()":null,"#formats()":null,"#p":{"erformed?()":null,"rocess()":null},"#response_body()":null},"ca":{"ching":{"":null,"::":{"c":{"lassmethods":{"":null,"#view_cache_dependency()":null},"onfigmethods":{"":null,"#cache_store":{"()":null,"=()":null}}},"fragments":{"":null,"::classmethods":{"":null,"#fragment_cache_key()":null},"#combined_fragment_cache_key()":null,"#expire_fragment()":null,"#fragment_exist?()":null,"#read_fragment()":null,"#write_fragment()":null}},"#cache()":null,"#view_cache_dependencies()":null},"llbacks":{"":null,"::classmethods":{"":null,"#_":{"insert_callbacks()":null,"normalize_callback_options()":null},"#a":{"fter_action()":null,"ppend_":{"a":{"fter_action()":null,"round_action()":null},"before_action()":null},"round_action()":null},"#before_action()":null,"#prepend_":{"a":{"fter_action()":null,"round_action()":null},"before_action()":null},"#skip_":{"a":{"fter_action()":null,"round_action()":null},"before_action()":null}},"#process_action()":null}},"collector":{"":null,"::generate_method_for_mime()":null},"doublerendererror":{"":null,"::new()":null},"helpers":{"":null,"::":{"classmethods":{"":null,"#_helpers_for_modification()":null,"#clear_helpers()":null,"#helper":{"()":null,"_method()":null},"#inherited()":null,"#modules_for_helpers()":null},"missinghelpererror":{"":null,"::new()":null}},"#_helpers()":null},"railties":{"":null,"::routeshelpers":{"":null,"::with()":null}},"rendering":{"":null,"#_":{"normalize_":{"args()":null,"options()":null},"process_options()":null},"#render":{"()":null,"_to_":{"body()":null,"string()":null},"ed_format()":null},"#view_assigns()":null},"translation":{"":null,"#l":{"()":null,"ocalize()":null},"#t":{"()":null,"ranslate()":null}},"urlfor":{"":null,"::classmethods":{"":null,"#_routes()":null,"#action_methods()":null},"#_routes()":null}}},"acti":{"on":{"c":{"able":{"":null,"::":{"c":{"hannel":{"":null,"::":{"b":{"ase":{"":null,"::":{"action_methods()":null,"clear_action_methods!()":null,"method_added()":null,"new()":null},"#defer_subscription_confirmation":{"!()":null,"?()":null},"#ensure_confirmation_sent()":null,"#perform_action()":null,"#reject()":null,"#subscri":{"be":{"_to_channel()":null,"d()":null},"ption_":{"confirmation_sent?()":null,"rejected?()":null}},"#transmit()":null,"#unsubscribed()":null},"roadcasting":{"":null,"::classmethods":{"":null,"#broadcast":{"_to()":null,"ing_for()":null}}}},"callbacks":{"":null,"::classmethods":{"":null,"#after_":{"subscribe()":null,"unsubscribe()":null},"#before_":{"subscribe()":null,"unsubscribe()":null},"#on_":{"subscribe()":null,"unsubscribe()":null}}},"channelstub":{"":null,"#confirmed?()":null,"#rejected?()":null,"#st":{"art_periodic_timers()":null,"op_":{"all_streams()":null,"periodic_timers()":null},"ream":{"_from()":null,"s()":null}}},"connectionstub":{"":null,"::new()":null,"#transmit()":null},"naming":{"":null,"::classmethods":{"":null,"#channel_name()":null}},"noninferrablechannelerror":{"":null,"::new()":null},"periodictimers":{"":null,"::classmethods":{"":null,"#periodically()":null}},"streams":{"":null,"#st":{"op_":{"all_streams()":null,"stream_f":{"or()":null,"rom()":null}},"ream_":{"f":{"or()":null,"rom()":null},"or_reject_for()":null}}},"testcase":{"":null,"::behavior":{"":null,"::classmethods":{"":null,"#channel_class()":null,"#determine_default_channel()":null,"#tests()":null},"#assert_":{"broadcast":{"_on()":null,"s()":null},"has_stream":{"()":null,"_for()":null},"no_streams()":null},"#perform()":null,"#s":{"tub_connection()":null,"ubscribe()":null},"#transmissions()":null,"#unsubscribe()":null}}}},"onnection":{"":null,"::":{"a":{"ssertions":{"":null,"#assert_reject_connection()":null},"uthorization":{"":null,"::unauthorizederror":null,"#reject_unauthorized_connection()":null}},"base":{"":null,"#beat()":null,"#c":{"lose()":null,"ookies()":null},"::new()":null,"#request()":null,"#s":{"end_async()":null,"tatistics()":null}},"identification":{"":null,"::classmethods":{"":null,"#identified_by()":null},"#connection_identifier()":null},"internalchannel":null,"noninferrableconnectionerror":{"":null,"::new()":null},"streameventloop":{"":null,"#attach()":null,"#detach()":null,"::new()":null,"#post()":null,"#stop()":null,"#timer()":null,"#writes_pending()":null},"taggedloggerproxy":{"":null,"#add_tags()":null,"#log()":null,"::new()":null,"#tag()":null},"test":{"c":{"ase":{"":null,"::behavior":{"":null,"::classmethods":{"":null,"#connection_class()":null,"#determine_default_connection()":null,"#tests()":null},"#co":{"nnect()":null,"okies()":null},"#disconnect()":null}},"onnection":{"":null,"::new()":null},"ookiejar":{"":null,"#encrypted()":null,"#signed()":null}},"request":null}}}},"helpers":{"":null,"::actioncablehelper":{"":null,"#action_cable_meta_tag()":null}},"remoteconnections":{"":null,"::":{"remoteconnection":{"":null,"#disconnect()":null,"::":{"invalididentifierserror":null,"new()":null}},"new()":null},"#where()":null},"server":{"":null,"::":{"b":{"ase":{"":null,"#c":{"all()":null,"onnection_identifiers()":null},"#disconnect()":null,"#event_loop()":null,"::":{"logger()":null,"new()":null},"#pubsub()":null,"#re":{"mote_connections()":null,"start()":null},"#worker_pool()":null},"roadcasting":{"":null,"::broadcaster":{"":null,"#broadcast()":null,"::new()":null},"#broadcast":{"()":null,"er_for()":null}}},"configuration":{"":null,"::new()":null,"#pubsub_adapter()":null},"worker":{"":null,"::activerecordconnectionmanagement":{"":null,"#with_database_connections()":null}}}},"subscriptionadapter":{"":null,"::":{"async":{"":null,"::asyncsubscribermap":{"":null,"#add_subscriber()":null,"#invoke_callback()":null,"::new()":null}},"base":{"":null,"#broadcast()":null,"#identifier()":null,"::new()":null,"#s":{"hutdown()":null,"ubscribe()":null},"#unsubscribe()":null},"postgresql":{"":null,"::listener":{"":null,"#add_channel()":null,"#invoke_callback()":null,"#listen()":null,"::new()":null,"#remove_channel()":null,"#shutdown()":null}},"redis":{"":null,"::listener":{"":null,"#add_channel()":null,"#invoke_callback()":null,"#listen()":null,"::new()":null,"#remove_channel()":null,"#shutdown()":null}},"subscribermap":{"":null,"#add_":{"channel()":null,"subscriber()":null},"#broadcast()":null,"#invoke_callback()":null,"::new()":null,"#remove_":{"channel()":null,"subscriber()":null}},"test":{"":null,"#broadcast":{"()":null,"s()":null},"#clear":{"()":null,"_messages()":null}}}},"test":{"case":null,"helper":{"":null,"#assert_":{"broadcast":{"_on()":null,"s()":null},"no_broadcasts()":null}}},"version":{"":null,"()":null},"gem_version()":null}},"ontroller":{"":null,"::":{"api":{"":null,"rendering":{"":null,"#render_to_body()":null},"::without_modules()":null},"base":{"":null,"#re":{"quest()":null,"sponse()":null},"::without_modules()":null},"caching":null,"co":{"n":{"ditionalget":{"":null,"::classmethods":{"":null,"#etag()":null},"#expires_":{"in()":null,"now()":null},"#fresh_when()":null,"#http_cache_forever()":null,"#stale?()":null},"tentsecuritypolicy":{"":null,"::classmethods":{"":null,"#content_security_policy":{"()":null,"_report_only()":null}}}},"okies":{"":null,"#cookies()":null}},"datastreaming":{"":null,"#send_":{"data()":null,"file()":null}},"defaultheaders":{"":null,"::classmethods":{"":null,"#make_response!()":null}},"etagwith":{"flash":null,"templatedigest":null},"flash":{"":null,"::classmethods":{"":null,"#add_flash_types()":null},"#redirect_to()":null},"formbuilder":{"":null,"::classmethods":{"":null,"#default_form_builder()":null},"#default_form_builder()":null},"he":{"ad":{"":null,"#head()":null},"lpers":{"":null,"::classmethods":{"":null,"#all_helpers_from_path()":null,"#helper":{"_attr()":null,"s()":null},"#modules_for_helpers()":null},"#helpers()":null}},"httpauthentication":{"":null,"::":{"basic":{"":null,"::controllermethods":{"":null,"::classmethods":{"":null,"#http_basic_authenticate_with()":null},"#authenticate_":{"or_request_with_http_basic()":null,"with_http_basic()":null},"#http_basic_authenticate_or_request_with()":null,"#request_http_basic_authentication()":null},"#auth":{"_":{"param()":null,"scheme()":null},"enticat":{"e()":null,"ion_request()":null}},"#decode_credentials()":null,"#encode_credentials()":null,"#has_basic_credentials?()":null,"#user_name_and_password()":null},"digest":{"":null,"::controllermethods":{"":null,"#authenticate_":{"or_request_with_http_digest()":null,"with_http_digest()":null},"#request_http_digest_authentication()":null},"#authenticat":{"e()":null,"ion_":{"header()":null,"request()":null}},"#decode_credentials":{"()":null,"_header()":null},"#e":{"ncode_credentials()":null,"xpected_response()":null},"#ha1()":null,"#nonce()":null,"#opaque()":null,"#secret_token()":null,"#validate_":{"digest_response()":null,"nonce()":null}},"token":{"":null,"::controllermethods":{"":null,"#authenticate_":{"or_request_with_http_token()":null,"with_http_token()":null},"#request_http_token_authentication()":null},"#authenticat":{"e()":null,"ion_request()":null},"#encode_credentials()":null,"#params_array_from()":null,"#r":{"aw_params()":null,"ewrite_param_values()":null},"#token_":{"and_options()":null,"params_from()":null}}}},"implicitrender":null,"instrumentation":{"":null,"::classmethods":null,"#append_info_to_payload()":null,"#cleanup_view_runtime()":null,"#process_action()":null,"#re":{"direct_to()":null,"nder()":null},"#send_":{"data()":null,"file()":null}},"live":{"":null,"::":{"cl":{"assmethods":{"":null,"#make_response!()":null},"ientdisconnected":null},"sse":{"":null,"#close()":null,"::new()":null,"#write()":null}},"testresponse":null,"#process()":null,"#response_body=()":null},"log":{"subscriber":{"":null,"#halted_callback()":null,"#logger()":null,"#process_action()":null,"#redirect_to()":null,"#s":{"end_":{"data()":null,"file()":null},"tart_processing()":null},"#unpermitted_parameters()":null},"ging":{"":null,"::classmethods":{"":null,"#log_at()":null}}},"metal":{"":null,"::":{"action()":null,"controller_name()":null,"dispatch()":null,"make_response!()":null,"middleware()":null,"new()":null,"use()":null},"#controller_name()":null,"#p":{"arams":{"()":null,"=()":null},"erformed?()":null},"#res":{"et_session()":null,"ponse_body=()":null},"#url_for()":null},"mi":{"meresponds":{"":null,"::collector":{"":null,"#a":{"ll()":null,"ny":{"()":null,"_response?()":null}},"#custom()":null,"#negotiate_format()":null,"::new()":null,"#response()":null},"#respond_to()":null},"ssingrenderer":{"":null,"::new()":null}},"param":{"eter":{"encoding":{"":null,"::classmethods":{"":null,"#param_encoding()":null,"#skip_parameter_encoding()":null}},"missing":{"":null,"::correction":{"":null,"#corrections()":null,"::new()":null}},"s":{"":null,"#==()":null,"#[]":{"()":null,"=()":null},"#as_json()":null,"#co":{"mpact":{"()":null,"!()":null,"_blank":{"()":null,"!()":null}},"nverted_arrays()":null},"#d":{"e":{"ep_":{"dup()":null,"transform_keys":{"()":null,"!()":null}},"lete":{"()":null,"_if()":null}},"ig()":null},"#e":{"ach":{"()":null,"_key()":null,"_nested_attribute()":null,"_pair()":null,"_value()":null},"mpty?()":null,"ql?()":null,"xcept()":null,"xtract!()":null},"#fetch()":null,"#has":{"_":{"key?()":null,"value?()":null},"h()":null},"#in":{"clude?()":null,"spect()":null},"#ke":{"ep_if()":null,"y?()":null,"ys()":null},"#me":{"mber?()":null,"rge":{"()":null,"!()":null}},"#nested_attributes?()":null,"::new()":null,"#permit":{"()":null,"!()":null,"ted?()":null},"#re":{"ject":{"()":null,"!()":null},"quire":{"()":null,"d()":null},"verse_merge":{"()":null,"!()":null}},"#s":{"elect":{"()":null,"!()":null},"lice":{"()":null,"!()":null}},"#t":{"o_":{"h":{"()":null,"ash()":null},"param()":null,"query()":null,"s()":null,"unsafe_h":{"()":null,"ash()":null}},"ransform_":{"keys":{"()":null,"!()":null},"values":{"()":null,"!()":null}}},"#value":{"?()":null,"s()":null,"s_at()":null},"#with_defaults":{"()":null,"!()":null}}},"swrapper":{"":null,"::options":{"":null,"::classmethods":{"":null,"#_set_wrapper_options()":null,"#inherited()":null,"#wrap_parameters()":null}}}},"permissionspolicy":{"":null,"::classmethods":{"":null,"#permissions_policy()":null}},"railties":{"":null,"::helpers":{"":null,"#inherited()":null}},"re":{"directing":{"":null,"#redirect_":{"back()":null,"to()":null}},"nder":{"er":{"":null,"s":{"":null,"::":{"all":null,"classmethods":{"":null,"#use_renderer":{"()":null,"s()":null}},"_render_with_renderer_method_name()":null,"add()":null,"remove()":null},"#_render_to_body_with_renderer()":null,"#render_to_body()":null},"#new()":null,"::":{"for()":null,"new()":null},"#render":{"()":null,"_to_string()":null},"#with_defaults()":null},"ing":{"":null,"::classmethods":{"":null,"#inherited()":null},"#render_to_":{"body()":null,"string()":null}}},"questforgeryprotection":{"":null,"::":{"classmethods":{"":null,"#protect_from_forgery()":null,"#skip_forgery_protection()":null},"protectionmethods":{"":null,"::":{"exception":{"":null,"#handle_unverified_request()":null,"::new()":null},"nullsession":{"":null,"#handle_unverified_request()":null,"::new()":null},"resetsession":{"":null,"#handle_unverified_request()":null,"::new()":null}}}},"#any_authenticity_token_valid?()":null,"#c":{"ompare_with_":{"global_token()":null,"real_token()":null},"srf_token_hmac()":null},"#form_authenticity_param()":null,"#global_csrf_token()":null,"#handle_unverified_request()":null,"#ma":{"rk":{"_for_same_origin_verification!()":null,"ed_for_same_origin_verification?()":null},"sk":{"_token()":null,"ed_authenticity_token()":null}},"#no":{"n_xhr_javascript_response?()":null,"rmalize_action_path()":null},"#p":{"er_form_csrf_token()":null,"rotect_against_forgery?()":null},"#re":{"al_csrf_token()":null,"quest_authenticity_tokens()":null},"#unmask_token()":null,"#v":{"alid_":{"authenticity_token?()":null,"per_form_csrf_token?()":null,"request_origin?()":null},"erif":{"ied_request?()":null,"y_":{"authenticity_token()":null,"same_origin_request()":null}}},"#xor_byte_strings()":null},"scue":{"":null,"#show_detailed_exceptions?()":null},"spondtomismatcherror":{"":null,"::new()":null},"move_renderer()":null},"str":{"eaming":null,"ongparameters":{"":null,"#params":{"()":null,"=()":null}}},"test":{"case":{"":null,"::behavior":{"":null,"::classmethods":{"":null,"#controller_class":{"()":null,"=()":null},"#determine_default_controller_class()":null,"#tests()":null},"#build_response()":null,"#controller_class_name()":null,"#delete()":null,"#ge":{"nerated_path()":null,"t()":null},"#head()":null,"#p":{"atch()":null,"ost()":null,"rocess()":null,"ut()":null},"#query_parameter_names()":null,"#setup_controller_request_and_response()":null}},"ing":null},"un":{"filteredparameters":null,"permittedparameters":null},"url":{"for":{"":null,"#url_options()":null},"generationerror":{"":null,"::correction":{"":null,"#corrections()":null,"::new()":null}}},"add_renderer()":null}}},"dispatch":{"":null,"::":{"assertion":{"response":{"":null,"#code_and_name()":null,"::new()":null},"s":{"":null,"::r":{"esponseassertions":{"":null,"#assert_re":{"directed_to()":null,"sponse()":null}},"outingassertions":{"":null,"#assert_":{"generates()":null,"recognizes()":null,"routing()":null},"#method_missing()":null,"#with_routing()":null}},"#html_document()":null}},"callbacks":{"":null,"::":{"after()":null,"before()":null,"new()":null},"#call()":null},"co":{"ntentsecuritypolicy":{"":null,"::":{"middleware":{"":null,"#call()":null,"::new()":null},"request":{"":null,"#content_security_policy":{"()":null,"=()":null,"_nonce":{"()":null,"_directives":{"()":null,"=()":null},"_generator":{"()":null,"=()":null}},"_report_only":{"()":null,"=()":null}}},"new()":null},"#b":{"lock_all_mixed_content()":null,"uild()":null},"#initialize_copy()":null,"#plugin_types()":null,"#re":{"port_uri()":null,"quire_sri_for()":null},"#sandbox()":null,"#upgrade_insecure_requests()":null},"okies":{"":null,"#call()":null,"::":{"chainedcookiejars":{"":null,"#encrypted()":null,"#permanent()":null,"#signed":{"()":null,"_or_encrypted()":null}},"new()":null}}},"debug":{"exceptions":{"":null,"#call()":null,"::":{"new()":null,"register_interceptor()":null}},"locks":{"":null,"#call()":null,"::new()":null}},"ex":{"ceptionwrapper":{"":null,"#application_trace()":null,"#exception_trace()":null,"#f":{"ramework_trace()":null,"ull_trace()":null},"#rescue_template()":null,"#s":{"ource_":{"extracts()":null,"to_show_id()":null},"tatus_code()":null},"::":{"new()":null,"status_code_for_exception()":null},"#trace":{"_to_show()":null,"s()":null},"#unwrapped_exception()":null},"ecutor":{"":null,"#call()":null,"::new()":null}},"filehandler":{"":null,"#attempt()":null,"#call()":null,"::new()":null},"flash":{"":null,"::":{"flashhash":{"":null,"#[]":{"()":null,"=()":null},"#alert":{"()":null,"=()":null},"#clear()":null,"#d":{"elete()":null,"iscard()":null},"#e":{"ach()":null,"mpty?()":null},"#initialize_copy()":null,"#ke":{"ep()":null,"y?()":null,"ys()":null},"#no":{"tice":{"()":null,"=()":null},"w()":null,"w_is_loaded?()":null},"#stringify_array()":null,"#to_hash()":null},"requestmethods":{"":null,"#flash":{"()":null,"=()":null}},"new()":null}},"hostauthorization":{"":null,"#call()":null,"::new()":null},"http":{"":null,"::":{"cache":{"":null,"::re":{"quest":{"":null,"#etag_matches?()":null,"#fresh?()":null,"#if_":{"modified_since()":null,"none_match":{"()":null,"_etags()":null}},"#not_modified?()":null},"sponse":{"":null,"#date":{"()":null,"=()":null,"?()":null},"#etag":{"=()":null,"?()":null},"#last_modified":{"()":null,"=()":null,"?()":null},"#strong_etag":{"=()":null,"?()":null},"#weak_etag":{"=()":null,"?()":null}}}},"filter":{"parameters":{"":null,"#env_filter()":null,"#filtered_":{"env()":null,"pa":{"rameters()":null,"th()":null},"query_string()":null},"::new()":null,"#parameter_filter":{"()":null,"_for()":null}},"redirect":null},"headers":{"":null,"#[]":{"()":null,"=()":null},"#add()":null,"#e":{"ach()":null,"nv()":null},"#fetch()":null,"::from_hash()":null,"#include?()":null,"#key?()":null,"#merge":{"()":null,"!()":null}},"mimenegotiation":{"":null,"::invalidtype":null,"#accepts()":null,"#content_":{"mime_type()":null,"type()":null},"#format":{"()":null,"=()":null,"_from_path_extension()":null,"s()":null,"s=()":null},"#negotiate_mime()":null,"#params_readable?()":null,"#should_apply_vary_header?()":null,"#use_accept_header()":null,"#va":{"lid_accept_header()":null,"riant":{"()":null,"=()":null}}},"parameters":{"":null,"::":{"classmethods":{"":null,"#parameter_parsers=()":null},"parseerror":{"":null,"::new()":null}},"#pa":{"ram":{"eters()":null,"s()":null},"th_parameters()":null}},"url":{"":null,"#domain()":null,"::":{"extract_":{"domain()":null,"subdomain":{"()":null,"s()":null}},"full_url_for()":null,"new()":null,"path_for()":null,"url_for()":null},"#host":{"()":null,"_with_port()":null},"#optional_port()":null,"#p":{"ort":{"()":null,"_string()":null},"rotocol()":null},"#raw_host_with_port()":null,"#s":{"erver_port()":null,"tandard_port":{"()":null,"?()":null},"ubdomain":{"()":null,"s()":null}},"#url()":null},"uploadedfile":{"":null,"#close()":null,"#eof?()":null,"#open()":null,"#path()":null,"#re":{"ad()":null,"wind()":null},"#size()":null,"#to_":{"io()":null,"path()":null}}}},"integration":{"":null,"::":{"r":{"equesthelpers":{"":null,"#delete()":null,"#follow_redirect!()":null,"#get()":null,"#head()":null,"#options()":null,"#p":{"atch()":null,"ost()":null,"ut()":null}},"unner":{"":null,"#create_session()":null,"#default_url_options":{"()":null,"=()":null},"#integration_session()":null,"::new()":null,"#open_session()":null,"#reset!()":null}},"session":{"":null,"#cookies()":null,"#h":{"ost()":null,"ttps":{"!()":null,"?()":null}},"::new()":null,"#process()":null,"#reset!()":null,"#url_options()":null}},"test":{"":null,"::":{"behavior":{"":null,"::classmethods":{"":null,"#app":{"()":null,"=()":null},"#register_encoder()":null},"#app()":null,"#document_root_element()":null},"urloptions":{"":null,"#url_options()":null}}}},"journey":{"":null,"::":{"format":{"":null,"ter":{"":null,"::":{"missingroute":null,"routewithparams":null}}},"parser":null,"route":{"":null,"::verbmatchers":{"":null,"::":{"all":null,"unknown":null}}}}},"middlewarestack":{"":null,"::":{"instrumentationproxy":{"":null,"#call()":null,"::new()":null},"middleware":{"":null,"#==()":null,"#build":{"()":null,"_instrumented()":null},"#inspect()":null,"#name()":null,"::new()":null},"new()":null},"#[]()":null,"#build()":null,"#delete()":null,"#each()":null,"#in":{"itialize_copy()":null,"sert":{"()":null,"_after()":null,"_before()":null}},"#last()":null,"#move":{"()":null,"_after()":null,"_before()":null},"#s":{"ize()":null,"wap()":null},"#u":{"nshift()":null,"se()":null}},"permissionspolicy":{"":null,"::":{"middleware":{"":null,"#call()":null,"::new()":null},"request":{"":null,"#permissions_policy":{"()":null,"=()":null}},"new()":null},"#build()":null,"#initialize_copy()":null},"publicexceptions":{"":null,"#call()":null,"::new()":null},"rails":{"entitystore":{"":null,"#exist?()":null,"::":{"rack":{"":null,"::cache":{"":null,"::entitystore":null}},"new()":null,"resolve()":null},"#open()":null,"#read()":null,"#write()":null},"metastore":{"":null,"::":{"rack":{"":null,"::cache":{"":null,"::metastore":null}},"new()":null,"resolve()":null},"#read()":null,"#write()":null}},"re":{"loader":null,"moteip":{"":null,"::":{"getip":{"":null,"#calculate_ip()":null,"#filter_proxies()":null,"#ips_from()":null,"::new()":null,"#to_s()":null},"ipspoofattackerror":null,"new()":null},"#call()":null},"quest":{"":null,"encoder":{"":null,"::identityencoder":{"":null,"#accept_header()":null,"#content_type()":null,"#encode_params()":null,"#response_parser()":null}},"id":{"":null,"#call()":null,"::new()":null},"#get()":null,"#post()":null,"#authorization()":null,"#body()":null,"#co":{"mmit_flash()":null,"nt":{"ent_length()":null,"roller_class":{"()":null,"_for()":null}},"okie_jar()":null},"#f":{"orm_data?()":null,"ullpath()":null},"#h":{"eaders()":null,"ttp_auth_salt()":null},"#ip()":null,"#key?()":null,"#lo":{"cal?()":null,"gger()":null},"#me":{"dia_type()":null,"thod":{"()":null,"_symbol()":null}},"::":{"empty()":null,"new()":null},"#original_":{"fullpath()":null,"url()":null},"#query_parameters()":null,"#r":{"aw_":{"post()":null,"request_method()":null},"emote_ip":{"()":null,"=()":null},"equest_":{"id()":null,"method":{"()":null,"_symbol()":null},"parameters":{"()":null,"=()":null}},"eset_session()":null},"#s":{"e":{"nd_early_hints()":null,"rver_software()":null,"ssion_options=()":null},"sl?()":null},"#uuid()":null,"#x":{"hr?()":null,"ml_http_request?()":null}},"sponse":{"":null,"#a":{"bort()":null,"wait_":{"commit()":null,"sent()":null}},"#body":{"()":null,"=()":null,"_parts()":null},"#c":{"harset":{"()":null,"=()":null},"lose()":null,"ode()":null,"ommit":{"!()":null,"ted?()":null},"ontent_type":{"()":null,"=()":null},"ookies()":null},"::":{"rackbody":{"":null,"#body()":null,"#close()":null,"#each()":null,"::new()":null,"#respond_to?()":null,"#to_":{"ary()":null,"path()":null}},"create()":null,"merge_default_headers()":null,"new()":null,"return_only_media_type_on_content_type":{"()":null,"=()":null}},"#delete_header()":null,"#each()":null,"#get_header()":null,"#has_header?()":null,"#me":{"dia_type()":null,"ssage()":null},"#prepare!()":null,"#res":{"et_body!()":null,"ponse_code()":null},"#s":{"e":{"n":{"d":{"_file()":null,"ing":{"!()":null,"?()":null,"_file=()":null}},"t!()":null,"t?()":null},"t_header()":null},"tatus":{"=()":null,"_message()":null}},"#to_a()":null,"#write()":null}},"routing":{"":null,"::":{"consoleformatter":{"":null,"::":{"base":{"":null,"#header()":null,"::new()":null,"#no_routes()":null,"#result()":null,"#section":{"()":null,"_title()":null}},"expanded":{"":null,"::new()":null,"#section":{"()":null,"_title()":null}},"sheet":{"":null,"#header()":null,"#section":{"()":null,"_title()":null}}}},"htmltableformatter":{"":null,"#header()":null,"::new()":null,"#no_routes()":null,"#result()":null,"#section":{"()":null,"_title()":null}},"mapper":{"":null,"::":{"base":{"":null,"#default_url_options":{"()":null,"=()":null},"#has_named_route?()":null,"#m":{"atch()":null,"ount()":null},"#with_default_scope()":null},"concerns":{"":null,"#concern":{"()":null,"s()":null}},"customurls":{"":null,"#direct()":null,"#resolve()":null},"httphelpers":{"":null,"#delete()":null,"#get()":null,"#options()":null,"#p":{"atch()":null,"ost()":null,"ut()":null}},"resources":{"":null,"#api_only?()":null,"#collection()":null,"#draw()":null,"#m":{"atch()":null,"ember()":null},"#n":{"amespace()":null,"ested()":null,"ew()":null},"#r":{"esource":{"()":null,"s()":null,"s_path_names()":null},"oot()":null},"#s":{"et_member_mappings_for_resource()":null,"hallow":{"()":null,"?()":null}},"#with_scope_level()":null},"scoping":{"":null,"#con":{"straints()":null,"troller()":null},"#defaults()":null,"#namespace()":null,"#scope()":null},"normalize_":{"name()":null,"path()":null}}},"pathredirect":{"":null,"#inspect()":null,"#path()":null},"polymorphicroutes":{"":null,"#polymorphic_":{"path()":null,"url()":null}},"redirection":{"":null,"#redirect()":null},"route":{"set":{"":null,"::":{"customurlhelper":null,"dispatcher":null,"generator":null,"mountedhelpers":null,"namedroutecollection":{"":null,"::urlhelper":{"":null,"::optimizedurlhelper":null}},"staticdispatcher":null}},"wrapper":{"":null,"#action()":null,"#con":{"straints()":null,"troller()":null},"#en":{"dpoint()":null,"gine?()":null},"#internal?()":null,"#name()":null,"#path()":null,"#r":{"ack_app()":null,"eqs()":null}}},"urlfor":{"":null,"#_":{"routes_context()":null,"with_routes()":null},"::new()":null,"#optimize_routes_generation?()":null,"#route_for()":null,"#url_":{"for()":null,"options()":null}}}},"ssl":null,"session":{"":null,"::":{"abstracts":{"ecurestore":{"":null,"#generate_sid()":null},"tore":null},"cachestore":{"":null,"#delete_session()":null,"#find_session()":null,"::new()":null,"#write_session()":null},"co":{"mpatibility":{"":null,"#generate_sid()":null,"#initialize_sid()":null,"::new()":null},"okiestore":{"":null,"#delete_session()":null,"#load_session()":null,"::":{"sessionid":{"":null,"::new()":null},"new()":null}}},"memcachestore":{"":null,"::new()":null},"stalesessioncheck":{"":null,"#extract_session_id()":null,"#load_session()":null,"#stale_session_check!()":null}}},"showexceptions":{"":null,"#call()":null,"::new()":null},"static":{"":null,"#call()":null,"::new()":null},"systemtest":{"case":{"":null,"::driven_by()":null},"ing":{"":null,"::testhelpers":{"":null,"::screenshothelper":{"":null,"#take_":{"failed_screenshot()":null,"screenshot()":null}}}}},"test":{"process":{"":null,"::fixturefile":{"":null,"#fixture_file_upload()":null},"#assigns()":null,"#cookies()":null,"#flash()":null,"#redirect_to_url()":null,"#session()":null},"re":{"quest":{"":null,"#ac":{"cept=()":null,"tion=()":null},"::create()":null,"#host=()":null,"#if_":{"modified_since=()":null,"none_match=()":null},"#p":{"ath=()":null,"ort=()":null},"#re":{"mote_addr=()":null,"quest_":{"method=()":null,"uri=()":null}},"#user_agent=()":null},"sponse":{"":null,"::from_response()":null,"#parsed_body()":null,"#response_parser()":null}}}}},"mail":{"box":{"":null,"::":{"base":{"":null,"controller":null,"#bounce_with()":null,"#process()":null,"::":{"new()":null,"receive()":null}},"callbacks":{"":null,"#a":{"fter_processing()":null,"round_processing()":null},"#before_processing()":null},"engine":null,"in":{"boundemail":{"":null,"::":{"incineratable":{"":null,"::incineration":{"":null,"::new()":null,"#run()":null},"#incinerate":{"()":null,"_later()":null}},"messageid":{"":null,"#create_and_extract_message_id!()":null,"#extract_message_id()":null,"#generate_missing_message_id()":null},"routable":{"":null,"#route":{"()":null,"_later()":null}}},"s":null,"#mail()":null,"#processed?()":null,"#source()":null},"cinerationjob":{"":null,"#perform()":null,"::schedule()":null},"gresses":{"":null,"::":{"ma":{"ilgun":{"":null,"::inboundemailscontroller":{"":null,"::authenticator":{"":null,"#authenticated?()":null,"::new()":null},"#create()":null}},"ndrill":{"":null,"::inboundemailscontroller":{"":null,"::authenticator":{"":null,"#authenticated?()":null,"::new()":null},"#create()":null,"#health_check()":null}}},"postmark":{"":null,"::inboundemailscontroller":{"":null,"#create()":null}},"relay":{"":null,"::inboundemailscontroller":{"":null,"#create()":null}},"sendgrid":{"":null,"::inboundemailscontroller":{"":null,"#create()":null}}}}},"relayer":{"":null,"::":{"result":{"":null,"#failure?()":null,"#permanent_failure?()":null,"#success?()":null,"#transient_failure?()":null},"new()":null},"#relay()":null},"rout":{"er":{"":null,"#add_route":{"()":null,"s()":null},"#mailbox_for()":null,"::":{"rout":{"e":{"":null,"#ma":{"ilbox_class()":null,"tch?()":null},"::new()":null},"ingerror":null},"new()":null},"#route()":null},"ing":{"":null,"job":{"":null,"#perform()":null},"#mailbox_for()":null,"#rout":{"e()":null,"ing()":null}}},"test":{"case":null,"helper":{"":null,"#create_inbound_email_from_":{"fixture()":null,"mail()":null,"source()":null},"#receive_inbound_email_from_":{"fixture()":null,"mail()":null,"source()":null}}},"version":{"":null,"()":null},"gem_version()":null}},"er":{"":null,"::":{"base":{"":null,"#attachments()":null,"::":{"lateattachmentsproxy":{"":null,"#[]=()":null,"#inline()":null},"controller_path()":null,"default":{"()":null,"_options=()":null},"email_address_with_name()":null,"mailer_name()":null,"new()":null,"register_":{"interceptor":{"()":null,"s()":null},"observer":{"()":null,"s()":null}},"supports_path?()":null,"unregister_":{"interceptor":{"()":null,"s()":null},"observer":{"()":null,"s()":null}}},"#default_i18n_subject()":null,"#email_address_with_name()":null,"#headers()":null,"#mail":{"()":null,"er_name()":null},"#set_content_type()":null},"collector":{"":null,"#a":{"ll()":null,"ny()":null},"#custom()":null,"::new()":null},"deliverymethods":{"":null,"::classmethods":{"":null,"#add_delivery_method()":null}},"inlinepreviewinterceptor":null,"logsubscriber":{"":null,"#deliver()":null,"#logger()":null,"#process()":null},"mailhelper":{"":null,"#attachments()":null,"#block_format()":null,"#format_paragraph()":null,"#m":{"ailer()":null,"essage()":null}},"messagedelivery":{"":null,"#deliver_":{"later":{"()":null,"!()":null},"now":{"()":null,"!()":null}},"#message()":null,"#processed?()":null},"noninferrablemailererror":{"":null,"::new()":null},"parameterized":{"":null,"::classmethods":{"":null,"#with()":null}},"preview":{"":null,"s":{"":null,"::classmethods":{"":null,"#register_preview_interceptor":{"()":null,"s()":null},"#unregister_preview_interceptor":{"()":null,"s()":null}}},"::":{"all()":null,"call()":null,"email":{"_exists?()":null,"s()":null},"exists?()":null,"find()":null,"new()":null,"preview_name()":null}},"rescuable":null,"test":{"case":{"":null,"::":{"behavior":{"":null,"::classmethods":{"":null,"#determine_default_mailer()":null,"#mailer_class()":null,"#tests()":null}},"cleartestdeliveries":null}},"helper":{"":null,"#assert_":{"e":{"mails()":null,"nqueued_email":{"_with()":null,"s()":null}},"no_e":{"mails()":null,"nqueued_emails()":null}}}},"version":{"":null,"()":null},"gem_version()":null}}},"text":{"":null,"::":{"att":{"ach":{"able":{"":null,"s":{"":null,"::":{"contentattachment":{"":null,"#attachable_plain_text_representation()":null,"::from_node()":null,"#to_":{"partial_path()":null,"trix_content_attachment_partial_path()":null}},"missingattachable":{"":null,"::to_partial_path()":null},"remoteimage":{"":null,"#attachable_plain_text_representation()":null,"::":{"from_node()":null,"new()":null},"#to_partial_path()":null}}},"#a":{"s_json()":null,"ttachable_":{"content_type()":null,"file":{"name()":null,"size()":null},"metadata()":null,"sgid()":null}},"#from_attachable_sgid()":null,"::from_":{"attachable_sgid()":null,"node()":null},"#previewable_attachable?()":null,"#to_":{"rich_text_attributes()":null,"trix_content_attachment_partial_path()":null}},"ment":{"":null,"gallery":{"":null,"#attachments()":null,"#inspect()":null,"::":{"f":{"ind_attachment_gallery_nodes()":null,"ragment_by_":{"canonicalizing_attachment_galleries()":null,"replacing_attachment_gallery_nodes()":null},"rom_node()":null},"new()":null},"#size()":null},"s":{"":null,"::":{"caching":{"":null,"#cache_key()":null},"minification":{"":null,"#fragment_by_minifying_attachments()":null},"trixconversion":{"":null,"#fr":{"agment_by_converting_trix_attachments()":null,"om_trix_attachment()":null},"#to_trix_attachment()":null}}},"#caption()":null,"#full_attributes()":null,"#inspect()":null,"::":{"fr":{"agment_by_canonicalizing_attachments()":null,"om_":{"att":{"achable":{"()":null,"s()":null},"ributes()":null},"node()":null}},"new()":null},"#to_":{"html()":null,"plain_text()":null,"s()":null},"#with_full_attributes()":null}},"ribute":{"":null,"#has_rich_text()":null}},"content":{"":null,"helper":{"":null,"#render_action_text_":{"attachments()":null,"content()":null},"#sanitize_action_text_content()":null},"#==()":null,"#a":{"ppend_attachables()":null,"s_json()":null,"ttach":{"ables()":null,"ment":{"_galleries()":null,"s()":null}}},"#gallery_attachments()":null,"#inspect()":null,"#links()":null,"::":{"fragment_by_canonicalizing_content()":null,"new()":null},"#render_attachment":{"_galleries()":null,"s()":null},"#to_":{"html()":null,"plain_text()":null,"rendered_html_with_layout()":null,"s()":null,"trix_html()":null}},"engine":{"":null,"#attachable_plain_text_representation()":null,"#previewable_attachable?()":null,"#to_trix_content_attachment_partial_path()":null},"fixtureset":{"":null,"::attachment()":null},"fragment":{"":null,"#find_all()":null,"::":{"from_html()":null,"new()":null,"wrap()":null},"#replace()":null,"#to_":{"html()":null,"plain_text()":null,"s()":null},"#update()":null},"htmlconversion":{"":null,"#create_element()":null,"#fragment_for_html()":null,"#node_to_html()":null},"plaintextconversion":{"":null,"#node_to_plain_text()":null},"richtext":{"":null,"#to_plain_text()":null},"serialization":{"":null,"#_dump()":null,"#dump()":null,"#load()":null},"systemtesthelper":{"":null,"#fill_in_rich_text_area()":null},"taghelper":{"":null,"#rich_text_area_tag()":null},"trixattachment":{"":null,"#attributes()":null,"::":{"from_attributes()":null,"new()":null},"#to_":{"html()":null,"s()":null}},"version":{"":null,"()":null},"gem_version()":null}},"view":{"":null,"::":{"abstractrenderer":{"":null,"::renderedcollection":{"":null,"::emptycollection":{"":null,"#body()":null,"::new()":null}}},"base":{"":null,"#_run()":null,"#compiled_method_container()":null,"#in_rendering_context()":null,"::":{"cache_template_loading":{"()":null,"=()":null},"inspect()":null}},"cacheexpiry":{"":null,"#clear_cache":{"()":null,"_if_necessary()":null},"::":{"executor":{"":null,"#before()":null,"::new()":null},"new()":null}},"context":{"":null,"#_":{"layout_for()":null,"prepare_context()":null}},"digestor":{"":null,"::":{"injected":{"":null,"#digest()":null},"missing":{"":null,"#digest()":null},"node":{"":null,"#d":{"ependency_digest()":null,"igest()":null},"::":{"create()":null,"new()":null},"#to_dep_map()":null},"nulllogger":{"":null,"::":{"debug()":null,"error()":null}},"partial":null,"digest()":null,"logger()":null,"tree()":null}},"fi":{"lesystemresolver":{"":null,"#==()":null,"#eql?()":null,"::new()":null,"#to_":{"path()":null,"s()":null}},"xtureresolver":{"":null,"#data()":null,"::new()":null,"#to_s()":null}},"helpers":{"":null,"::":{"a":{"ctivemodel":{"helper":null,"instancetag":{"":null,"#content_tag()":null,"#error_":{"message()":null,"wrapping()":null},"#object()":null,"#tag()":null}},"sset":{"taghelper":{"":null,"#au":{"dio_tag()":null,"to_discovery_link_tag()":null},"#favicon_link_tag()":null,"#image_tag()":null,"#javascript_include_tag()":null,"#preload_link_tag()":null,"#stylesheet_link_tag()":null,"#video_tag()":null},"urlhelper":{"":null,"#a":{"sset_":{"path()":null,"url()":null},"udio_":{"path()":null,"url()":null}},"#compute_asset_":{"extname()":null,"host()":null,"path()":null},"#font_":{"path()":null,"url()":null},"#image_":{"path()":null,"url()":null},"#javascript_":{"path()":null,"url()":null},"#p":{"ath_to_":{"a":{"sset()":null,"udio()":null},"font()":null,"image()":null,"javascript()":null,"stylesheet()":null,"video()":null},"ublic_compute_asset_path()":null},"#stylesheet_":{"path()":null,"url()":null},"#url_to_":{"a":{"sset()":null,"udio()":null},"font()":null,"image()":null,"javascript()":null,"stylesheet()":null,"video()":null},"#video_":{"path()":null,"url()":null}}},"tomfeedhelper":{"":null,"#atom_feed()":null}},"ca":{"chehelper":{"":null,"#cache":{"()":null,"_fragment_name()":null,"_if()":null,"_unless()":null}},"pturehelper":{"":null,"#c":{"apture()":null,"ontent_for":{"()":null,"?()":null}},"#provide()":null}},"cs":{"phelper":{"":null,"#csp_meta_tag()":null},"rfhelper":{"":null,"#csrf_meta_tag":{"()":null,"s()":null}}},"datehelper":{"":null,"#d":{"ate":{"_select()":null,"time_select()":null},"istance_of_time_in_words":{"()":null,"_to_now()":null}},"#select_":{"da":{"te":{"()":null,"time()":null},"y()":null},"hour()":null,"minute()":null,"month()":null,"second()":null,"time()":null,"year()":null},"#time_":{"ago_in_words()":null,"select()":null,"tag()":null}},"debughelper":{"":null,"#debug()":null},"form":{"builder":{"":null,"#button()":null,"#c":{"heck_box()":null,"ol":{"lection_":{"check_boxes()":null,"radio_buttons()":null,"select()":null},"or_field()":null}},"#date":{"_":{"field()":null,"select()":null},"time_":{"field()":null,"local_field()":null,"select()":null}},"#email_field()":null,"#fi":{"elds":{"()":null,"_for()":null},"le_field()":null},"#grouped_collection_select()":null,"#hidden_field()":null,"#label()":null,"#m":{"onth_field()":null,"ultipart=()":null},"::":{"_to_partial_path()":null,"new()":null},"#number_field()":null,"#p":{"assword_field()":null,"hone_field()":null},"#r":{"a":{"dio_button()":null,"nge_field()":null},"ich_text_area()":null},"#s":{"e":{"arch_field()":null,"lect()":null},"ubmit()":null},"#t":{"e":{"lephone_field()":null,"xt_":{"area()":null,"field()":null}},"ime_":{"field()":null,"select()":null,"zone_select()":null},"o_":{"model()":null,"partial_path()":null}},"#url_field()":null,"#week_field()":null},"helper":{"":null,"#c":{"heck_box()":null,"olor_field()":null},"#date":{"_field()":null,"time_":{"field()":null,"local_field()":null}},"#email_field()":null,"#f":{"i":{"elds":{"()":null,"_for()":null},"le_field()":null},"orm_":{"for()":null,"with()":null}},"#hidden_field()":null,"#label()":null,"#month_field()":null,"#number_field()":null,"#p":{"assword_field()":null,"hone_field()":null},"#r":{"a":{"dio_button()":null,"nge_field()":null},"ich_text_area()":null},"#search_field()":null,"#t":{"e":{"lephone_field()":null,"xt_":{"area()":null,"field()":null}},"ime_field()":null},"#url_field()":null,"#week_field()":null},"optionshelper":{"":null,"#collection_":{"check_boxes()":null,"radio_buttons()":null,"select()":null},"#grouped_":{"collection_select()":null,"options_for_select()":null},"#option":{"_groups_from_collection_for_select()":null,"s_f":{"or_select()":null,"rom_collection_for_select()":null}},"#select()":null,"#time_zone_":{"options_for_select()":null,"select()":null}},"taghelper":{"":null,"#button_tag()":null,"#c":{"heck_box_tag()":null,"olor_field_tag()":null},"#date":{"_field_tag()":null,"time_":{"field_tag()":null,"local_field_tag()":null}},"#email_field_tag()":null,"#f":{"i":{"eld_set_tag()":null,"le_field_tag()":null},"orm_tag()":null},"#hidden_field_tag()":null,"#image_submit_tag()":null,"#label_tag()":null,"#month_field_tag()":null,"#number_field_tag()":null,"#p":{"assword_field_tag()":null,"hone_field_tag()":null},"#ra":{"dio_button_tag()":null,"nge_field_tag()":null},"#s":{"e":{"arch_field_tag()":null,"lect_tag()":null},"ubmit_tag()":null},"#t":{"e":{"lephone_field_tag()":null,"xt_":{"area_tag()":null,"field_tag()":null}},"ime_field_tag()":null},"#u":{"rl_field_tag()":null,"tf8_enforcer_tag()":null},"#week_field_tag()":null}},"javascripthelper":{"":null,"#escape_javascript()":null,"#j":{"()":null,"avascript_tag()":null}},"numberhelper":{"":null,"::invalidnumbererror":{"":null,"::new()":null},"#number_":{"to_":{"currency()":null,"human":{"()":null,"_size()":null},"percentage()":null,"phone()":null},"with_":{"delimiter()":null,"precision()":null}}},"outputsafetyhelper":{"":null,"#raw()":null,"#safe_join()":null,"#to_sentence()":null},"renderinghelper":{"":null,"#_layout_for()":null,"#render()":null},"sanitizehelper":{"":null,"#s":{"anitize":{"()":null,"_css()":null},"trip_":{"links()":null,"tags()":null}}},"tag":{"helper":{"":null,"::build_tag_values()":null,"#c":{"data_section()":null,"lass_names()":null,"ontent_tag()":null},"#escape_once()":null,"#t":{"ag()":null,"oken_list()":null}},"s":{"":null,"::actiontext":{"":null,"#editable_value()":null,"#render()":null}}},"texthelper":{"":null,"#c":{"oncat()":null,"urrent_cycle()":null,"ycle()":null},"#excerpt()":null,"#highlight()":null,"#pluralize()":null,"#reset_cycle()":null,"#s":{"afe_concat()":null,"imple_format()":null},"#truncate()":null,"#word_wrap()":null},"translationhelper":{"":null,"#l":{"()":null,"ocalize()":null},"#t":{"()":null,"ranslate()":null}},"urlhelper":{"":null,"::classmethods":{"":null,"#_url_for_modules()":null},"#_current_page?()":null,"#button_to()":null,"#current_page?()":null,"#link_to":{"()":null,"_if()":null,"_unless":{"()":null,"_current()":null}},"#mail_to()":null,"#phone_to()":null,"#sms_to()":null}}},"layouts":{"":null,"::classmethods":{"":null,"#layout()":null},"#action_has_layout?()":null},"lo":{"gsubscriber":{"":null,"#cache_message()":null,"#from_rails_root()":null,"#logger()":null,"::new()":null,"#r":{"ails_root()":null,"ender_":{"co":{"llection()":null,"unt()":null},"layout()":null,"partial()":null,"template()":null}},"#start()":null},"okupcontext":{"":null,"::":{"detailscache":{"":null,"#_set_detail()":null,"#disable_cache()":null},"viewpaths":{"":null,"#any":{"?()":null,"_templates?()":null},"#detail_args_for()":null,"#exists?()":null,"#find":{"()":null,"_all()":null,"_template()":null},"#template_exists?()":null,"#with_fallbacks()":null}}}},"nullresolver":{"":null,"#query()":null},"partial":{"iteration":{"":null,"#first?()":null,"#last?()":null,"::new()":null},"renderer":{"":null,"::new()":null,"#render()":null}},"re":{"cordidentifier":{"":null,"#dom_":{"class()":null,"id()":null},"#record_key_for_dom_id()":null},"nder":{"er":{"":null,"::new()":null,"#render":{"()":null,"_body()":null}},"ing":{"":null,"::":{"classmethods":{"":null,"#_":{"helpers()":null,"routes()":null},"#build_view_context_class()":null,"#view_context_class()":null},"new()":null},"#render_to_body()":null,"#view_context":{"()":null,"_class()":null}}},"solver":{"":null,"::":{"cache":{"":null,"::smallcache":{"":null,"::new()":null}},"path":{"":null,"::":{"build()":null,"new()":null},"#to_s":{"()":null,"tr()":null}},"new()":null},"#clear_cache()":null,"#find_all()":null}},"routingurlfor":{"":null,"#url_for()":null},"syntaxerrorintemplate":{"":null,"#annotated_source_code()":null,"#message()":null,"::new()":null},"te":{"mplate":{"":null,"::":{"handlers":{"":null,"::":{"builder":{"":null,"#call()":null,"#require_engine()":null},"erb":{"":null,"::call()":null,"#call()":null,"#handles_encoding?()":null,"#supports_streaming?()":null},"html":{"":null,"#call()":null},"raw":{"":null,"#call()":null}}},"sources":{"":null,"::file":{"":null,"::new()":null,"#to_s()":null}},"types":{"":null,"::":{"type":{"":null,"#==()":null,"::":{"[]()":null,"new()":null},"#ref()":null,"#to_s":{"()":null,"tr()":null,"ym()":null}},"[]()":null,"delegate_to()":null,"symbols()":null}},"new()":null},"#encode!()":null,"#ins":{"pect()":null,"trument()":null},"#local_assigns()":null,"#render()":null,"#s":{"hort_identifier()":null,"ource()":null,"upports_streaming?()":null},"#type()":null},"stcase":{"":null,"::":{"behavior":{"":null,"::":{"classmethods":{"":null,"#determine_default_helper_class()":null,"#helper_":{"class()":null,"method()":null},"#new()":null,"#tests()":null},"locals":{"":null,"#render()":null},"renderedviewscollection":{"":null,"#add()":null,"#locals_for()":null,"::new()":null,"#rendered_views()":null,"#view_rendered?()":null}},"#_":{"routes()":null,"test_case()":null},"#config()":null,"#protect_against_forgery?()":null,"#render":{"()":null,"ed_views()":null},"#setup_with_controller()":null},"testcontroller":{"":null,"#controller_path=()":null,"::new()":null}}}},"unboundtemplate":{"":null,"#bind_locals()":null,"::new()":null},"version":{"":null,"()":null},"viewpaths":{"":null,"::classmethods":{"":null,"#_view_paths":{"()":null,"=()":null},"#append_view_path()":null,"#prepend_view_path()":null,"#view_paths":{"()":null,"=()":null}},"#append_view_path()":null,"#details_for_lookup()":null,"#lookup_context()":null,"#prepend_view_path()":null},"gem_version()":null}}},"ve":{"job":{"":null,"::":{"arguments":{"":null,"::hash":{"":null,"::ruby2_keywords_hash":{"()":null,"?()":null}},"#deserialize()":null,"#serialize()":null},"base":null,"callbacks":{"":null,"::classmethods":{"":null,"#a":{"fter_":{"enqueue()":null,"perform()":null},"round_":{"enqueue()":null,"perform()":null}},"#before_":{"enqueue()":null,"perform()":null},"#inherited()":null}},"core":{"":null,"#deserialize()":null,"::":{"classmethods":{"":null,"#deserialize()":null,"#set()":null},"new()":null},"#serialize()":null},"deserializationerror":null,"enqueuing":{"":null,"::classmethods":{"":null,"#job_or_instantiate()":null,"#perform_later()":null},"#enqueue()":null},"ex":{"ceptions":{"":null,"::classmethods":{"":null,"#discard_on()":null,"#retry_on()":null},"#retry_job()":null},"ecution":{"":null,"::classmethods":{"":null,"#perform_now()":null},"#perform":{"()":null,"_now()":null}}},"queue":{"adapter":{"":null,"::classmethods":{"":null,"#queue_adapter":{"()":null,"=()":null,"_name()":null}},"s":{"":null,"::":{"asyncadapter":{"":null,"::new()":null},"backburneradapter":null,"delayedjobadapter":null,"inlineadapter":null,"que":{"adapter":null,"ueclassicadapter":{"":null,"#build_queue()":null}},"resqueadapter":null,"sidekiqadapter":null,"sneakersadapter":{"":null,"::new()":null},"suckerpunchadapter":null,"testadapter":{"":null,"#enqueued_jobs()":null,"#performed_jobs()":null},"lookup()":null}}},"name":{"":null,"::classmethods":{"":null,"#queue_as()":null},"#queue_name()":null},"priority":{"":null,"::classmethods":{"":null,"#queue_with_priority()":null},"#priority()":null}},"serializ":{"ationerror":null,"ers":{"":null,"::objectserializer":{"":null,"#deserialize()":null,"#klass()":null,"#serialize":{"()":null,"?()":null}}}},"test":{"case":null,"helper":{"":null,"::testqueueadapter":{"":null,"::classmethods":{"":null,"#disable_test_adapter()":null,"#enable_test_adapter()":null,"#queue_adapter()":null}},"#assert_":{"enqueued_":{"jobs()":null,"with()":null},"no_":{"enqueued_jobs()":null,"performed_jobs()":null},"performed_":{"jobs()":null,"with()":null}},"#perform_enqueued_jobs()":null,"#queue_adapter":{"()":null,"_for_test()":null}}},"version":{"":null,"()":null},"gem_version()":null}},"model":{"":null,"::":{"attribute":{"assignment":{"":null,"#a":{"ssign_attributes()":null,"ttributes=()":null}},"methods":{"":null,"::classmethods":{"":null,"::codegenerator":{"":null,"#<<()":null,"#execute()":null,"::":{"batch()":null,"new()":null},"#rename_method()":null},"#a":{"lias_attribute()":null,"ttribute_":{"alias":{"()":null,"?()":null},"method_":{"affix()":null,"prefix()":null,"suffix()":null}}},"#define_attribute_method":{"()":null,"s()":null},"#undefine_attribute_methods()":null},"#attribute_missing()":null,"#method_missing()":null,"#respond_to":{"?()":null,"_without_attributes?()":null}},"s":{"":null,"::classmethods":{"":null,"#attribute":{"()":null,"_names()":null}}}},"callbacks":{"":null,"#define_model_callbacks()":null},"conversion":{"":null,"#to_":{"key()":null,"model()":null,"par":{"am()":null,"tial_path()":null}}},"deprecationhandling":{"detailshash":{"":null,"::new()":null},"message":{"array":{"":null,"#<<()":null,"#clear()":null,"::new()":null},"hash":{"":null,"#[]=()":null,"#delete()":null,"::new()":null}}},"dirty":{"":null,"#c":{"hange":{"d":{"()":null,"?()":null,"_attributes()":null},"s()":null,"s_applied()":null},"lear_":{"attribute_changes()":null,"changes_information()":null}},"#previous_changes()":null,"#restore_attributes()":null},"error":{"":null,"s":{"":null,"#[]()":null,"#a":{"dd":{"()":null,"ed?()":null},"s_json()":null,"ttribute_names()":null},"#de":{"lete()":null,"tails()":null},"#each()":null,"#full_message":{"()":null,"s()":null,"s_for()":null},"#g":{"enerate_message()":null,"roup_by_attribute()":null},"#has_key?()":null,"#i":{"mport()":null,"nclude?()":null},"#key":{"?()":null,"s()":null},"#me":{"rge!()":null,"ssages":{"()":null,"_for()":null}},"::new()":null,"#of_kind?()":null,"#slice!()":null,"#to_":{"a()":null,"h()":null,"hash()":null,"xml()":null},"#values()":null,"#where()":null},"#attributes_for_hash()":null,"#detail":{"()":null,"s()":null},"#full_message()":null,"#m":{"atch?()":null,"essage()":null},"::new()":null,"#strict_match?()":null},"forbiddenattributeserror":null,"lint":{"":null,"::tests":{"":null,"#test_":{"errors_aref()":null,"model_naming()":null,"persisted?()":null,"to_":{"key()":null,"par":{"am()":null,"tial_path()":null}}}}},"missingattributeerror":null,"model":{"":null,"::new()":null,"#persisted?()":null},"nam":{"e":{"":null,"#!~()":null,"#<=>()":null,"#=":{"=":{"()":null,"=()":null},"~()":null},"#eql?()":null,"#human()":null,"#match?()":null,"::new()":null,"#to_s":{"()":null,"tr()":null}},"ing":{"":null,"#model_name()":null,"::":{"p":{"aram_key()":null,"lural()":null},"route_key()":null,"singular":{"()":null,"_route_key()":null},"uncountable?()":null}}},"nestederror":{"":null,"::new()":null},"rangeerror":null,"se":{"curepassword":{"":null,"::":{"classmethods":{"":null,"#has_secure_password()":null},"instancemethodsonactivation":{"":null,"::new()":null}}},"rializ":{"ation":{"":null,"#serializable_hash()":null},"ers":{"":null,"::json":{"":null,"#as_json()":null,"#from_json()":null}}}},"strictvalidationfailed":null,"translation":{"":null,"#human_attribute_name()":null,"#i18n_scope()":null,"#lookup_ancestors()":null},"type":{"":null,"::":{"boolean":null,"helpers":{"":null,"::":{"acceptsmultiparametertime":{"":null,"::instancemethods":null},"mutable":null,"numeric":null,"time":{"value":null,"zone":null}}},"value":{"":null,"#==()":null,"#assert_valid_value()":null,"#c":{"ast":{"()":null,"_value()":null},"hanged":{"?()":null,"_in_place?()":null}},"#deserialize()":null,"#eql?()":null,"#hash()":null,"::new()":null,"#serializ":{"able?()":null,"e()":null}},"regist":{"r":{"ation":null,"y":null},"er()":null}}},"unknownattributeerror":{"":null,"::new()":null},"version":{"":null,"()":null},"validat":{"ion":{"error":{"":null,"::new()":null},"s":{"":null,"::":{"acceptancevalidator":{"":null,"::lazilydefineattributes":{"":null,"#==()":null,"#define_on()":null,"#included()":null,"#matches?()":null,"::new()":null}},"callbacks":{"":null,"::classmethods":{"":null,"#after_validation()":null,"#before_validation()":null}},"classmethods":{"":null,"#attribute_method?()":null,"#clear_validators!()":null,"#validat":{"e":{"()":null,"s()":null,"s!()":null,"s_":{"each()":null,"with()":null}},"ors":{"()":null,"_on()":null}}},"helpermethods":{"":null,"#validates_":{"a":{"bsence_of()":null,"cceptance_of()":null},"confirmation_of()":null,"exclusion_of()":null,"format_of()":null,"inclusion_of()":null,"length_of()":null,"numericality_of()":null,"presence_of()":null,"size_of()":null}}},"#errors()":null,"#invalid?()":null,"#raise_validation_error()":null,"#valid":{"?()":null,"ate":{"()":null,"!()":null,"s_with()":null}}}},"or":{"":null,"#kind()":null,"::":{"kind()":null,"new()":null},"#validate()":null}},"gem_version()":null}},"record":{"":null,"::":{"a":{"ctive":{"jobrequirederror":null,"recorderror":null},"dapter":{"not":{"found":null,"specified":null},"timeout":null},"ggregations":{"":null,"::classmethods":{"":null,"#composed_of()":null}},"ssociation":{"notfounderror":{"":null,"::correction":{"":null,"#corrections()":null,"::new()":null}},"typemismatch":null,"s":{"":null,"::c":{"lassmethods":{"":null,"#belongs_to()":null,"#has_":{"and_belongs_to_many()":null,"many()":null,"one()":null}},"ollectionproxy":{"":null,"#<<()":null,"#==()":null,"#a":{"ny?()":null,"ppend()":null},"#build()":null,"#c":{"alculate()":null,"lear()":null,"oncat()":null,"ount()":null,"reate":{"()":null,"!()":null}},"#d":{"e":{"lete":{"()":null,"_all()":null},"stroy":{"()":null,"_all()":null}},"istinct()":null},"#empty?()":null,"#f":{"i":{"fth()":null,"nd()":null,"rst()":null},"orty_two()":null,"ourth()":null},"#include?()":null,"#l":{"ast()":null,"ength()":null,"oad":{"_target()":null,"ed":{"()":null,"?()":null}}},"#many?()":null,"#new()":null,"#p":{"luck()":null,"ush()":null},"#re":{"load()":null,"place()":null,"set()":null},"#s":{"cope()":null,"econd":{"()":null,"_to_last()":null},"elect()":null,"ize()":null},"#t":{"a":{"ke()":null,"rget()":null},"hird":{"()":null,"_to_last()":null}}}}}},"ttribute":{"assignment":{"":null,"error":{"":null,"::new()":null}},"methods":{"":null,"::":{"beforetypecast":{"":null,"#attributes_before_type_cast()":null,"#read_attribute_before_type_cast()":null},"classmethods":{"":null,"#attribute_":{"method?()":null,"names()":null},"#dangerous_class_method?()":null,"#has_attribute?()":null,"#instance_method_already_implemented?()":null},"dirty":{"":null,"#attribute":{"_":{"before_last_save()":null,"change_to_be_saved()":null,"in_database()":null},"s_in_database()":null},"#change":{"d_attribute_names_to_save()":null,"s_to_save()":null},"#has_changes_to_save?()":null,"#reload()":null,"#saved_change":{"_to_attribute":{"()":null,"?()":null},"s()":null,"s?()":null},"#will_save_change_to_attribute?()":null},"primarykey":{"":null,"::classmethods":{"":null,"#dangerous_attribute_method?()":null,"#instance_method_already_implemented?()":null,"#primary_key":{"()":null,"=()":null},"#quoted_primary_key()":null},"#id":{"()":null,"=()":null,"?()":null,"_before_type_cast()":null,"_in_database()":null,"_was()":null},"#to_key()":null},"query":{"":null,"#query_attribute()":null},"read":{"":null,"#_read_attribute()":null,"#read_attribute()":null},"serialization":{"":null,"::c":{"lassmethods":{"":null,"#serialize()":null},"olumnnotserializableerror":{"":null,"::new()":null}}},"timezoneconversion":null,"write":{"":null,"#write_attribute()":null}},"#[]":{"()":null,"=()":null},"#a":{"ccessed_fields()":null,"ttribute":{"_":{"for_inspect()":null,"names()":null,"present?()":null},"s()":null}},"#has_attribute?()":null,"#respond_to?()":null},"s":{"":null,"::classmethods":{"":null,"#attribute()":null,"#define_attribute()":null}}},"utosaveassociation":{"":null,"#changed_for_autosave?()":null,"#destroyed_by_association":{"()":null,"=()":null},"#mark":{"_for_destruction()":null,"ed_for_destruction?()":null},"#reload()":null}},"ba":{"se":null,"tches":{"":null,"::batchenumerator":{"":null,"#de":{"lete_all()":null,"stroy_all()":null},"#each":{"()":null,"_record()":null},"#update_all()":null},"#find_":{"each()":null,"in_batches()":null},"#in_batches()":null}},"cal":{"culations":{"":null,"#average()":null,"#c":{"alculate()":null,"ount()":null},"#ids()":null,"#m":{"aximum()":null,"inimum()":null},"#p":{"ick()":null,"luck()":null},"#sum()":null},"lbacks":{"":null,"::classmethods":{"":null,"#a":{"fter_":{"create()":null,"destroy()":null,"find()":null,"initialize()":null,"save()":null,"touch()":null,"update()":null},"round_":{"create()":null,"destroy()":null,"save()":null,"update()":null}},"#before_":{"create()":null,"destroy()":null,"save()":null,"update()":null}}}},"co":{"n":{"figurationerror":null,"nection":{"adapters":{"":null,"::":{"abstract":{"adapter":{"":null,"#a":{"ctive?()":null,"dapter_name()":null},"#cl":{"ear_cache!()":null,"ose()":null},"::":{"version":{"":null,"#<=>()":null,"::new()":null,"#to_s()":null},"database_exists?()":null,"type_cast_config_to_":{"boolean()":null,"integer()":null}},"#dis":{"able_":{"extension()":null,"referential_integrity()":null},"card!()":null,"connect!()":null},"#e":{"nable_extension()":null,"xpire()":null,"xtensions()":null},"#index_algorithms()":null,"#l":{"ease()":null,"og()":null},"#pre":{"fetch_primary_key?()":null,"pared_statements":{"()":null,"?()":null},"venting_writes?()":null},"#r":{"aw_connection()":null,"econnect!()":null,"eplica?()":null,"equires_reloading?()":null,"eset!()":null},"#s":{"chema_cache":{"()":null,"=()":null},"upports_":{"advisory_locks?()":null,"bulk_alter?()":null,"check_constraints?()":null,"comm":{"ents":{"?()":null,"_in_create?()":null},"on_table_expressions?()":null},"datetime_with_precision?()":null,"ddl_transactions?()":null,"ex":{"p":{"lain?()":null,"ression_index?()":null},"tensions?()":null},"foreign_":{"keys?()":null,"tables?()":null},"in":{"dex":{"_sort_order?()":null,"es_in_create?()":null},"sert_":{"conflict_target?()":null,"on_duplicate_":{"skip?()":null,"update?()":null},"returning?()":null}},"json?()":null,"lazy_transactions?()":null,"materialized_views?()":null,"optimizer_hints?()":null,"parti":{"al_index?()":null,"tioned_indexes?()":null},"savepoints?()":null,"transaction_isolation?()":null,"validate_constraints?()":null,"vi":{"ews?()":null,"rtual_columns?()":null}}},"#throw_away!()":null,"#u":{"nprepared_statement()":null,"se_metadata_table?()":null},"#verify!()":null},"mysqladapter":{"":null,"#begin_":{"db_transaction()":null,"isolated_db_transaction()":null},"#c":{"h":{"arset()":null,"eck_constraints()":null},"ollation()":null,"reate_database()":null,"urrent_database()":null},"#drop_table()":null,"#e":{"mpty_insert_statement_value()":null,"xecute()":null},"#foreign_keys()":null,"#index_algorithms()":null,"#native_database_types()":null,"::":{"emulate_booleans()":null,"new()":null},"#re":{"create_database()":null,"name_":{"index()":null,"table()":null}},"#s":{"how_variable()":null,"trict_mode?()":null,"upports_":{"advisory_locks?()":null,"bulk_alter?()":null,"check_constraints?()":null,"common_table_expressions?()":null,"datetime_with_precision?()":null,"exp":{"lain?()":null,"ression_index?()":null},"foreign_keys?()":null,"in":{"dex":{"_sort_order?()":null,"es_in_create?()":null},"sert_on_duplicate_":{"skip?()":null,"update?()":null}},"optimizer_hints?()":null,"transaction_isolation?()":null,"vi":{"ews?()":null,"rtual_columns?()":null}}}}},"co":{"lumn":{"":null,"methods":{"":null,"#column()":null,"#primary_key()":null}},"nnection":{"handler":{"":null,"#a":{"ctive_connections?()":null,"ll_connection_pools()":null},"#c":{"lear_":{"a":{"ctive_connections!()":null,"ll_connections!()":null},"reloadable_connections!()":null},"onnect":{"ed?()":null,"ion_pool":{"_list()":null,"s()":null}}},"#establish_connection()":null,"#flush_idle_connections!()":null,"::new()":null,"#re":{"move_connection":{"()":null,"_pool()":null},"trieve_connection_pool()":null},"#while_preventing_writes()":null},"pool":{"":null,"::":{"queue":{"":null,"#a":{"dd()":null,"ny_waiting?()":null},"#clear()":null,"#delete()":null,"::new()":null,"#num_waiting()":null,"#poll()":null},"reaper":{"":null,"::new()":null,"#run()":null},"new()":null},"#active_connection?()":null,"#c":{"heck":{"in()":null,"out()":null},"lear_reloadable_connections":{"()":null,"!()":null},"onnect":{"ed?()":null,"ion":{"()":null,"s()":null}}},"#disconnect":{"()":null,"!()":null},"#flush":{"()":null,"!()":null},"#lock_thread=()":null,"#re":{"ap()":null,"lease_connection()":null,"move()":null},"#stat()":null,"#with_connection()":null}}},"database":{"limits":{"":null,"#allowed_index_name_length()":null,"#in":{"_clause_length()":null,"dex_name_length()":null},"#table_alias_length()":null},"statements":{"":null,"#add_transaction_record()":null,"#begin_":{"db_transaction()":null,"isolated_db_transaction()":null},"#c":{"ommit_db_transaction()":null,"reate()":null},"#de":{"fault_sequence_name()":null,"lete()":null},"#e":{"mpty_insert_statement_value()":null,"xec":{"_":{"delete()":null,"insert()":null,"query()":null,"update()":null},"ute()":null}},"#insert":{"()":null,"_fixture":{"()":null,"s_set()":null}},"::new()":null,"#r":{"eset_sequence!()":null,"ollback_":{"db_transaction()":null,"to_savepoint()":null}},"#s":{"anitize_limit()":null,"elect_":{"all()":null,"one()":null,"rows()":null,"value":{"()":null,"s()":null}}},"#t":{"o_sql()":null,"ransaction":{"()":null,"_isolation_levels()":null,"_open?()":null},"runcate()":null},"#update()":null,"#write_query?()":null}},"deduplicable":{"":null,"::classmethods":{"":null,"#new()":null,"#registry()":null},"#-@()":null,"#deduplicate()":null},"mysql":{"":null,"::":{"columnmethods":{"":null,"#blob()":null,"#long":{"blob()":null,"text()":null},"#medium":{"blob()":null,"text()":null},"#tiny":{"blob()":null,"text()":null},"#unsigned_":{"bigint()":null,"decimal()":null,"float()":null,"integer()":null}},"databasestatements":{"":null,"#ex":{"ec":{"_":{"delete()":null,"query()":null,"update()":null},"ute()":null},"plain()":null}},"table":{"":null,"definition":{"":null,"::new()":null}}},"2adapter":{"":null,"#active?()":null,"#disconnect!()":null,"#error_number()":null,"::":{"database_exists?()":null,"new":{"()":null,"_client()":null}},"#quote_string()":null,"#re":{"connect!()":null,"set!()":null},"#supports_":{"comments":{"?()":null,"_in_create?()":null},"json?()":null,"lazy_transactions?()":null,"savepoints?()":null}}},"nullcolumn":null,"postgresql":{"":null,"::":{"altertable":{"":null,"::new()":null,"#validate_constraint()":null},"columnmethods":{"":null,"#b":{"i":{"gserial()":null,"t()":null,"t_varying()":null},"ox()":null},"#ci":{"dr()":null,"rcle()":null,"text()":null},"#daterange()":null,"#hstore()":null,"#in":{"et()":null,"t4range()":null,"t8range()":null,"terval()":null},"#jsonb()":null,"#l":{"ine()":null,"seg()":null,"tree()":null},"#m":{"acaddr()":null,"oney()":null},"#numrange()":null,"#oid()":null,"#p":{"ath()":null,"oint()":null,"olygon()":null,"rimary_key()":null},"#serial()":null,"#ts":{"range()":null,"tzrange()":null,"vector()":null},"#uuid()":null,"#xml()":null},"databasestatements":{"":null,"#begin_":{"db_transaction()":null,"isolated_db_transaction()":null},"#commit_db_transaction()":null,"#ex":{"ec":{"_":{"delete()":null,"insert()":null,"query()":null,"rollback_db_transaction()":null,"update()":null},"ute()":null},"plain()":null}},"oid":{"":null,"::bit":{"":null,"::data":{"":null,"#binary?()":null,"#hex?()":null,"::new()":null,"#to_s()":null}}},"quoting":{"":null,"#column_name_":{"matcher()":null,"with_order_matcher()":null},"#escape_bytea()":null,"#quote_":{"schema_name()":null,"table_name_for_assignment()":null},"#unescape_bytea()":null},"schemastatements":{"":null,"#c":{"lient_min_messages":{"()":null,"=()":null},"ollation()":null,"reate_":{"database()":null,"schema()":null},"type()":null,"urrent_":{"database()":null,"schema()":null}},"#drop_schema()":null,"#encoding()":null,"#foreign_":{"keys()":null,"table":{"_exists?()":null,"s()":null}},"#index_name_exists?()":null,"#rename_":{"index()":null,"table()":null},"#s":{"chema_":{"exists?()":null,"names()":null,"search_path":{"()":null,"=()":null}},"erial_sequence()":null},"#validate_":{"c":{"heck_constraint()":null,"onstraint()":null},"foreign_key()":null}},"table":{"":null,"definition":{"":null,"::new()":null}},"typemetadata":null},"adapter":{"":null,"#active?()":null,"::":{"create_unlogged_tables()":null,"database_exists?()":null,"new":{"()":null,"_client()":null}},"#dis":{"able_extension()":null,"connect!()":null},"#e":{"nable_extension()":null,"xtension":{"_":{"available?()":null,"enabled?()":null},"s()":null}},"#index_algorithms()":null,"#max_identifier_length()":null,"#re":{"connect!()":null,"set!()":null},"#s":{"e":{"ssion_auth=()":null,"t_standard_conforming_strings()":null},"upports_":{"advisory_locks?()":null,"bulk_alter?()":null,"check_constraints?()":null,"comm":{"ents?()":null,"on_table_expressions?()":null},"datetime_with_precision?()":null,"ddl_transactions?()":null,"ex":{"p":{"lain?()":null,"ression_index?()":null},"tensions?()":null},"foreign_":{"keys?()":null,"tables?()":null},"in":{"dex_sort_order?()":null,"sert_":{"conflict_target?()":null,"on_":{"conflict?()":null,"duplicate_":{"skip?()":null,"update?()":null}},"returning?()":null}},"json?()":null,"lazy_transactions?()":null,"materialized_views?()":null,"optimizer_hints?()":null,"parti":{"al_index?()":null,"tioned_indexes?()":null},"pgcrypto_uuid?()":null,"savepoints?()":null,"transaction_isolation?()":null,"validate_constraints?()":null,"views?()":null}},"#use_insert_returning?()":null}},"qu":{"erycache":{"":null,"#c":{"ache()":null,"lear_query_cache()":null},"::":{"connectionpoolconfiguration":{"":null,"#disable_query_cache!()":null,"#enable_query_cache!()":null,"::new()":null,"#query_cache_enabled()":null},"dirties_query_cache()":null,"new()":null},"#disable_query_cache!()":null,"#enable_query_cache!()":null,"#select_all()":null,"#uncached()":null},"oting":{"":null,"#quote":{"()":null,"_column_name()":null,"_string()":null,"_table_name":{"()":null,"_for_assignment()":null},"d_":{"date()":null,"false()":null,"true()":null}},"#type_cast()":null,"#unquoted_":{"false()":null,"true()":null}}},"realtransaction":{"":null,"#commit()":null,"#materialize!()":null,"#rollback()":null},"savepoint":{"transaction":{"":null,"#commit()":null,"#full_rollback?()":null,"#materialize!()":null,"::new()":null,"#rollback()":null},"s":{"":null,"#c":{"reate_savepoint()":null,"urrent_savepoint_name()":null},"#exec_rollback_to_savepoint()":null,"#release_savepoint()":null}},"schema":{"cache":{"":null,"#add()":null,"#c":{"lear":{"!()":null,"_data_source_cache!()":null},"olumns":{"()":null,"_hash":{"()":null,"?()":null}}},"#d":{"ata_source":{"_exists?()":null,"s()":null},"ump_to()":null},"#encode_with()":null,"#in":{"dexes()":null,"it":{"_with()":null,"ialize_dup()":null}},"#marshal_":{"dump()":null,"load()":null},"::":{"load_from()":null,"new()":null},"#primary_keys()":null,"#size()":null},"statements":{"":null,"#a":{"dd_":{"belongs_to()":null,"check_constraint()":null,"column()":null,"foreign_key()":null,"index()":null,"reference()":null,"timestamps()":null},"ssume_migrated_upto_version()":null},"#c":{"h":{"ange_":{"column":{"()":null,"_comment()":null,"_default()":null,"_null()":null},"table":{"()":null,"_comment()":null}},"eck_constraints()":null},"olumn":{"_exists?()":null,"s()":null},"reate_":{"join_table()":null,"table()":null}},"#d":{"ata_source":{"_exists?()":null,"s()":null},"rop_":{"join_table()":null,"table()":null}},"#foreign_key":{"_exists?()":null,"s()":null},"#index":{"_":{"exists?()":null,"name_exists?()":null},"es()":null},"#native_database_types()":null,"#options_include_default?()":null,"#primary_key()":null,"#re":{"move_":{"belongs_to()":null,"check_constraint()":null,"column":{"()":null,"s()":null},"foreign_key()":null,"index()":null,"reference()":null,"timestamps()":null},"name_":{"column()":null,"index()":null,"table()":null}},"#table":{"_":{"alias_for()":null,"comment()":null,"exists?()":null,"options()":null},"s()":null},"#view":{"_exists?()":null,"s()":null}}},"sql":{"ite3":{"":null,"::":{"databasestatements":{"":null,"#begin_isolated_db_transaction()":null,"#ex":{"ec_":{"delete()":null,"query()":null,"update()":null},"plain()":null}},"tabledefinition":{"":null,"#belongs_to()":null,"#references()":null}},"adapter":{"":null,"#active?()":null,"#disconnect!()":null,"#encoding()":null,"#foreign_keys()":null,"::":{"database_exists?()":null,"new()":null},"#re":{"connect!()":null,"name_table()":null,"quires_reloading?()":null},"#supports_":{"c":{"heck_constraints?()":null,"ommon_table_expressions?()":null},"datetime_with_precision?()":null,"ddl_transactions?()":null,"exp":{"lain?()":null,"ression_index?()":null},"foreign_keys?()":null,"in":{"dex_sort_order?()":null,"sert_":{"conflict_target?()":null,"on_":{"conflict?()":null,"duplicate_":{"skip?()":null,"update?()":null}}}},"json?()":null,"lazy_transactions?()":null,"partial_index?()":null,"savepoints?()":null,"transaction_isolation?()":null,"views?()":null}}},"typemetadata":null},"table":{"":null,"definition":{"":null,"#[]()":null,"#belongs_to()":null,"#c":{"heck_constraint()":null,"olumn":{"()":null,"s()":null}},"#index()":null,"::new()":null,"#re":{"ferences()":null,"move_column()":null},"#timestamps()":null},"#belongs_to()":null,"#c":{"h":{"ange":{"()":null,"_default()":null,"_null()":null},"eck_constraint()":null},"olumn":{"()":null,"_exists?()":null}},"#foreign_key":{"()":null,"_exists?()":null},"#index":{"()":null,"_exists?()":null},"::new()":null,"#re":{"ferences()":null,"move":{"()":null,"_belongs_to()":null,"_check_constraint()":null,"_foreign_key()":null,"_index()":null,"_references()":null,"_timestamps()":null},"name":{"()":null,"_index()":null}},"#timestamps()":null},"transactionstate":{"":null,"#add_child()":null,"#com":{"mit":{"!()":null,"ted?()":null},"pleted?()":null},"#f":{"inalized?()":null,"ull":{"_":{"commit!()":null,"rollback!()":null},"y_":{"com":{"mitted?()":null,"pleted?()":null},"rolledback?()":null}}},"#invalidate":{"!()":null,"d?()":null},"::new()":null,"#nullify!()":null,"#roll":{"back!()":null,"edback?()":null}}}},"handling":{"":null,"#c":{"lear_query_caches_for_current_thread()":null,"onnect":{"ed":{"?()":null,"_to":{"()":null,"?()":null,"_many()":null}},"ing_to()":null,"ion":{"()":null,"_config()":null,"_db_config()":null,"_pool()":null,"_specification_name()":null},"s_to()":null}},"#establish_connection()":null,"#re":{"move_connection()":null,"trieve_connection()":null},"#while_preventing_writes()":null},"notestablished":null,"timeouterror":null}},"re":{"":null,"::":{"classmethods":{"":null,"#filter_attributes":{"()":null,"=()":null}},"inspectionmask":{"":null,"#pretty_print()":null},"con":{"figurations":{"()":null,"=()":null},"nection_":{"class()":null,"handler":{"()":null,"=()":null,"s()":null,"s=()":null}}},"current_":{"preventing_writes()":null,"role()":null,"shard()":null},"new()":null},"#<=>()":null,"#==()":null,"#c":{"lone()":null,"onnection_handler()":null},"#dup()":null,"#e":{"ncode_with()":null,"ql?()":null},"#fr":{"eeze()":null,"ozen?()":null},"#hash()":null,"#in":{"it_with()":null,"spect()":null},"#pretty_print()":null,"#readonly":{"!()":null,"?()":null},"#s":{"lice()":null,"trict_loading":{"!()":null,"?()":null}},"#values_at()":null},"untercache":{"":null,"::classmethods":{"":null,"#decrement_counter()":null,"#increment_counter()":null,"#reset_counters()":null,"#update_counters()":null}}},"da":{"ngerousattributeerror":null,"tabase":{"alreadyexists":null,"configurations":{"":null,"::":{"hashconfig":{"":null,"#adapter()":null,"#c":{"heckout_timeout()":null,"onfig()":null},"#database()":null,"#host()":null,"#idle_timeout()":null,"#migrations_paths()":null,"::new()":null,"#pool()":null,"#re":{"aping_frequency()":null,"plica?()":null},"#schema_cache_path()":null},"invalidconfigurationerror":null,"urlconfig":{"":null,"::new()":null},"new()":null},"#[]()":null,"#blank?()":null,"#configs_for()":null,"#default_hash()":null,"#empty?()":null,"#find_db_config()":null,"#to_h()":null}}},"de":{"adlocked":null,"legatedtype":{"":null,"#delegated_type()":null},"stroyassociationasync":{"error":null,"job":{"":null,"#perform()":null}}},"dynamicmatchers":{"":null,"::":{"findby":{"":null,"bang":{"":null,"#finder()":null,"::":{"prefix()":null,"suffix()":null}},"#finder()":null,"::prefix()":null},"method":{"":null,"#define()":null,"::":{"match()":null,"new()":null,"pattern()":null,"prefix()":null,"suffix()":null},"#valid?()":null}}},"eagerloadpolymorphicerror":{"":null,"::new()":null},"en":{"um":{"":null,"#enum()":null},"vironmentmismatcherror":{"":null,"::new()":null}},"ex":{"clusiveconnectiontimeouterror":null,"plain":null},"fi":{"ndermethods":{"":null,"#exists?()":null,"#f":{"i":{"fth":{"()":null,"!()":null},"nd":{"()":null,"_by":{"()":null,"!()":null}},"rst":{"()":null,"!()":null}},"orty_two":{"()":null,"!()":null},"ourth":{"()":null,"!()":null}},"#include?()":null,"#last":{"()":null,"!()":null},"#member?()":null,"#second":{"()":null,"!()":null,"_to_last":{"()":null,"!()":null}},"#t":{"ake":{"()":null,"!()":null},"hird":{"()":null,"!()":null,"_to_last":{"()":null,"!()":null}}}},"xtureset":{"":null,"#[]":{"()":null,"=()":null},"#each()":null,"::":{"c":{"lasscache":{"":null,"#[]()":null,"::new()":null},"ache":{"_f":{"ixtures()":null,"or_connection()":null},"d_fixtures()":null},"ontext_class()":null,"reate_fixtures()":null},"fixture_is_cached?()":null,"identify()":null,"instantiate_":{"all_loaded_fixtures()":null,"fixtures()":null},"new()":null,"reset_cache()":null,"signed_global_id()":null},"#size()":null,"#table_rows()":null}},"hasmanythroughassociationnotfounderror":{"":null,"::correction":{"":null,"#corrections()":null,"::new()":null}},"immutablerelation":null,"in":{"heritance":{"":null,"::classmethods":{"":null,"#abstract_class?()":null,"#base_class":{"()":null,"?()":null},"#compute_type()":null,"#descends_from_active_record?()":null,"#inherited()":null,"#new()":null,"#polymorphic_":{"class_for()":null,"name()":null},"#sti_":{"class_for()":null,"name()":null}},"#initialize_dup()":null},"tegration":{"":null,"::classmethods":{"":null,"#to_param()":null},"#cache_":{"key":{"()":null,"_with_version()":null},"version()":null},"#to_param()":null},"validforeignkey":null,"verseofassociationnotfounderror":{"":null,"::correction":{"":null,"#corrections()":null,"::new()":null}}},"irreversible":{"migration":null,"ordererror":null},"lo":{"ck":{"waittimeout":null,"ing":{"":null,"::":{"optimistic":{"":null,"::classmethods":{"":null,"#locking_":{"column":{"()":null,"=()":null},"enabled?()":null},"#reset_locking_column()":null,"#update_counters()":null}},"pessimistic":{"":null,"#lock!()":null,"#with_lock()":null}}}},"gsubscriber":{"":null,"::r":{"eset_runtime()":null,"untime":{"()":null,"=()":null}},"#s":{"ql()":null,"trict_loading_violation()":null}}},"mi":{"ddleware":{"":null,"::databaseselector":{"":null,"#call()":null,"::new()":null}},"gration":{"":null,"::":{"c":{"om":{"mandrecorder":{"":null,"#inverse_of()":null,"::new()":null,"#re":{"cord()":null,"play()":null,"vert()":null}},"patibility":{"":null,"::v":{"4_2":{"":null,"::tabledefinition":null},"5_":{"0":{"":null,"::tabledefinition":null},"1":null,"2":{"":null,"::":{"commandrecorder":null,"tabledefinition":null}}},"6_0":{"":null,"::":{"referencedefinition":null,"tabledefinition":null}}}}},"heck":{"pending":{"":null,"#call()":null,"::new()":null},"_pending!()":null},"urrent_version()":null},"[]()":null,"disable_ddl_transaction!()":null,"load_schema_if_pending!()":null,"migrate()":null,"new()":null},"#announce()":null,"#co":{"nnection()":null,"py()":null},"#down()":null,"#exec_migration()":null,"#m":{"ethod_missing()":null,"igrate()":null},"#next_migration_number()":null,"#proper_table_name()":null,"#r":{"ever":{"sible()":null,"t()":null,"ting?()":null},"un()":null},"#s":{"ay":{"()":null,"_with_time()":null},"uppress_messages()":null},"#up":{"()":null,"_only()":null},"#write()":null},"smatchedforeignkey":{"":null,"::new()":null}},"modelschema":{"":null,"::":{"classmethods":{"":null,"#co":{"lumn":{"_":{"defaults()":null,"for_attribute()":null,"names()":null},"s()":null},"ntent_columns()":null},"#i":{"gnored_columns":{"()":null,"=()":null},"nheritance_column":{"()":null,"=()":null},"nitialize_load_schema_monitor()":null},"#next_sequence_value()":null,"#pr":{"efetch_primary_key?()":null,"otected_environments":{"()":null,"=()":null}},"#quoted_table_name()":null,"#reset_column_information()":null,"#sequence_name":{"()":null,"=()":null},"#t":{"able_":{"exists?()":null,"name":{"()":null,"=()":null}},"ype_for_attribute()":null}},"im":{"mutable_strings_by_default=()":null,"plicit_order_column":{"()":null,"=()":null}},"internal_metadata_table_name":{"()":null,"=()":null},"pluralize_table_names":{"()":null,"=()":null},"primary_key_prefix_type":{"()":null,"=()":null},"schema_migrations_table_name":{"()":null,"=()":null},"table_name_":{"prefix":{"()":null,"=()":null},"suffix":{"()":null,"=()":null}}}},"multiparameterassignmenterrors":{"":null,"::new()":null},"nestedattributes":{"":null,"::":{"classmethods":{"":null,"#accepts_nested_attributes_for()":null},"toomanyrecords":null}},"no":{"databaseerror":null,"touching":{"":null,"::classmethods":{"":null,"#no_touching()":null},"#no_touching?()":null},"tnullviolation":null},"persistence":{"":null,"::classmethods":{"":null,"#create":{"()":null,"!()":null},"#de":{"lete()":null,"stroy()":null},"#ins":{"ert":{"()":null,"!()":null,"_all":{"()":null,"!()":null}},"tantiate()":null},"#up":{"date()":null,"sert":{"()":null,"_all()":null}}},"#becomes":{"()":null,"!()":null},"#de":{"crement":{"()":null,"!()":null},"lete()":null,"stroy":{"()":null,"!()":null,"ed?()":null}},"#increment":{"()":null,"!()":null},"#new_record?()":null,"#p":{"ersisted?()":null,"reviously_new_record?()":null},"#reload()":null,"#save":{"()":null,"!()":null},"#to":{"ggle":{"()":null,"!()":null},"uch()":null},"#update":{"()":null,"!()":null,"_attribute()":null,"_column":{"()":null,"s()":null}}},"pre":{"dicatebuilder":{"":null,"::basehandler":null},"paredstatement":{"cacheexpired":null,"invalid":null}},"query":{"aborted":null,"ca":{"che":{"":null,"::":{"c":{"lassmethods":{"":null,"#cache()":null,"#uncached()":null},"omplete()":null},"install_executor_hooks()":null,"run()":null}},"nceled":null},"methods":{"":null,"::wherechain":{"":null,"#missing()":null,"::new()":null,"#not()":null},"#an":{"d()":null,"notate()":null},"#create_with()":null,"#distinct()":null,"#e":{"ager_load()":null,"xt":{"ending()":null,"ract_associated()":null}},"#from()":null,"#group()":null,"#having()":null,"#includes()":null,"#joins()":null,"#l":{"eft_":{"joins()":null,"outer_joins()":null},"imit()":null,"ock()":null},"#none()":null,"#o":{"ffset()":null,"ptimizer_hints()":null,"r()":null,"rder()":null},"#preload()":null,"#re":{"adonly()":null,"ferences()":null,"order()":null,"select()":null,"verse_order()":null,"where()":null},"#s":{"elect()":null,"trict_loading()":null},"#un":{"iq!()":null,"scope()":null},"#where()":null},"ing":{"":null,"#count_by_sql()":null,"#find_by_sql()":null}},"rangeerror":null,"re":{"adonly":{"error":null,"record":null,"attributes":{"":null,"::classmethods":{"":null,"#attr_readonly()":null,"#readonly_attributes()":null}}},"cord":{"invalid":{"":null,"::new()":null},"not":{"destroyed":{"":null,"::new()":null},"found":{"":null,"::new()":null},"saved":{"":null,"::new()":null},"unique":null}},"flection":{"":null,"::":{"classmethods":{"":null,"#reflect":{"_on_a":{"ggregation()":null,"ll_a":{"ggregations()":null,"ssociations()":null,"utosave_associations()":null},"ssociation()":null},"ions()":null}},"macroreflection":{"":null,"#==()":null,"#autosave=()":null,"#compute_class()":null,"#klass()":null,"::new()":null,"#scope_for()":null}}},"lation":{"":null,"#==()":null,"#any?()":null,"#b":{"lank?()":null,"uild()":null},"#c":{"ache_":{"key":{"()":null,"_with_version()":null},"version()":null},"reate":{"()":null,"!()":null,"_or_find_by":{"()":null,"!()":null}}},"#de":{"lete_":{"all()":null,"by()":null},"stroy_":{"all()":null,"by()":null}},"#e":{"ager_loading?()":null,"mpty?()":null,"ncode_with()":null,"xplain()":null},"#find_or_":{"create_by":{"()":null,"!()":null},"initialize_by()":null},"#in":{"itialize_copy()":null,"spect()":null},"#joined_includes_values()":null,"#load":{"()":null,"_records()":null},"#many?()":null,"::":{"recordfetchwarning":{"":null,"#exec_queries()":null},"new()":null},"#n":{"ew()":null,"one?()":null},"#one?()":null,"#pretty_print()":null,"#re":{"load()":null,"set()":null},"#s":{"cop":{"e_for_create()":null,"ing()":null},"ize()":null},"#to":{"_":{"a":{"()":null,"ry()":null},"sql()":null},"uch_all()":null},"#update_":{"all()":null,"counters()":null},"#values()":null,"#where_values_hash()":null},"sult":{"":null,"#[]()":null,"#e":{"ach()":null,"mpty?()":null},"#in":{"cludes_column?()":null,"itialize_copy()":null},"#l":{"ast()":null,"ength()":null},"::new()":null,"#to_a":{"()":null,"ry()":null}}},"rollback":null,"sanitization":{"":null,"::classmethods":{"":null,"#sanitize_sql":{"()":null,"_array()":null,"_for_":{"assignment()":null,"conditions()":null,"order()":null},"_hash_for_assignment()":null,"_like()":null}}},"sc":{"hema":{"":null,"::define()":null},"oping":{"":null,"::":{"default":{"":null,"::classmethods":{"":null,"#default_scope()":null,"#unscoped()":null}},"named":{"":null,"::classmethods":{"":null,"#all()":null,"#default_scoped()":null,"#scope()":null}}}}},"se":{"curetoken":{"":null,"::":{"classmethods":{"":null,"#generate_unique_secure_token()":null,"#has_secure_token()":null},"minimumlengtherror":null}},"rialization":{"":null,"failure":null,"typemismatch":null,"#serializable_hash()":null}},"signedid":{"":null,"::classmethods":{"":null,"#find_signed":{"()":null,"!()":null},"#signed_id_verifier":{"()":null,"=()":null}},"#signed_id()":null},"spawnmethods":{"":null,"#except()":null,"#merge()":null,"#only()":null},"st":{"a":{"leobjecterror":{"":null,"::new()":null},"tement":{"cache":{"":null,"::partialquerycollector":{"":null,"#<<()":null,"#add_bind":{"()":null,"s()":null},"::new()":null,"#value()":null}},"invalid":{"":null,"::new()":null},"timeout":null}},"ore":{"":null,"::classmethods":{"":null,"#store":{"()":null,"_accessor()":null,"d_attributes()":null}},"#read_store_attribute()":null,"#write_store_attribute()":null},"rictloadingviolationerror":null},"su":{"bclassnotfound":null,"ppressor":{"":null,"::classmethods":{"":null,"#suppress()":null}}},"ta":{"blenotspecified":null,"sks":{"":null,"::databasetasks":{"":null,"#c":{"ache_dump_filename()":null,"harset":{"()":null,"_current()":null},"heck_":{"protected_environments!()":null,"schema_file()":null,"target_version()":null},"lear_schema_cache()":null,"ollation":{"()":null,"_current()":null},"reate":{"()":null,"_all()":null,"_current()":null},"urrent_config()":null},"#d":{"b_dir()":null,"rop":{"()":null,"_all()":null,"_current()":null},"ump_":{"filename()":null,"schema_cache()":null}},"#env()":null,"#f":{"ixtures_path()":null,"or_each()":null},"#load_s":{"chema_current()":null,"eed()":null},"#migrat":{"e":{"()":null,"_status()":null},"ions_paths()":null},"#name()":null,"#purge":{"()":null,"_all()":null,"_current()":null},"#r":{"aise_for_multi_db()":null,"egister_task()":null,"oot()":null},"#s":{"chema_":{"file":{"()":null,"_type()":null},"up_to_date?()":null},"eed_loader()":null,"etup_initial_database_yaml()":null,"pec()":null,"tructure_":{"dump()":null,"load()":null}},"::structure_":{"dump_flags()":null,"load_flags()":null},"#t":{"arget_version()":null,"runcate_all()":null}}}},"testfixtures":{"":null,"::classmethods":{"":null,"#fixtures()":null,"#set":{"_fixture_class()":null,"up_fixture_accessors()":null},"#uses_transaction":{"()":null,"?()":null}},"#enlist_fixture_connections()":null,"#run_in_transaction?()":null,"#setup_fixtures()":null,"#teardown_fixtures()":null},"timestamp":null,"trans":{"action":{"isolationerror":null,"rollbackerror":null,"s":{"":null,"::classmethods":{"":null,"#after_":{"c":{"ommit()":null,"reate_commit()":null},"destroy_commit()":null,"rollback()":null,"save_commit()":null,"update_commit()":null},"#transaction()":null}}},"lation":null},"type":{"":null,"::":{"adapterspecificregistry":null,"bi":{"ginteger":null,"nary":null},"boolean":null,"date":{"":null,"time":null},"dec":{"imal":null,"orationregistration":null},"float":null,"immutablestring":null,"inte":{"ger":null,"rnal":{"":null,"::timezone":{"":null,"#default_timezone()":null,"#is_utc?()":null}}},"json":{"":null,"#accessor()":null,"#changed_in_place?()":null,"#deserialize()":null,"#serialize()":null,"#type()":null},"string":null,"time":{"":null,"#serialize()":null},"value":null,"regist":{"ration":null,"er()":null}},"conflicterror":null},"unknown":{"attribute":{"error":null,"reference":null},"primarykey":{"":null,"::new()":null}},"version":{"":null,"()":null},"val":{"idations":{"":null,"::classmethods":{"":null,"#validates_":{"a":{"bsence_of()":null,"ssociated()":null},"length_of()":null,"numericality_of()":null,"presence_of()":null,"size_of()":null,"uniqueness_of()":null}},"#save":{"()":null,"!()":null},"#valid":{"?()":null,"ate()":null}},"uetoolong":null},"wrappeddatabaseexception":null,"gem_version()":null}},"storage":{"":null,"::":{"a":{"nalyze":{"job":{"":null,"#perform()":null},"r":{"":null,"::":{"imageanalyzer":{"":null,"::accept?()":null,"#metadata()":null},"videoanalyzer":{"":null,"::accept?()":null,"#metadata()":null},"accept?()":null,"analyze_later?()":null,"new()":null},"#download_blob_to_tempfile()":null,"#logger()":null,"#metadata()":null,"#tmpdir()":null}},"ttach":{"ed":{"":null,"::":{"m":{"any":{"":null,"#attach":{"()":null,"ed?()":null,"ments()":null},"#blobs()":null,"#detach()":null,"#purge":{"()":null,"_later()":null}},"odel":{"":null,"#has_":{"many_attached()":null,"one_attached()":null},"#purge":{"()":null,"_later()":null},"#validate_service_configuration()":null}},"one":{"":null,"#attach":{"()":null,"ed?()":null,"ment()":null},"#blank?()":null,"#detach()":null,"#purge":{"()":null,"_later()":null}},"new()":null}},"ment":{"":null,"#purge":{"()":null,"_later()":null}}}},"base":{"controller":null,"job":null},"blob":{"":null,"::":{"analyzable":{"":null,"#analyze":{"()":null,"_later()":null,"d?()":null}},"identifiable":{"":null,"#identif":{"ied?()":null,"y()":null,"y_without_saving()":null}},"representable":{"":null,"#preview":{"()":null,"able?()":null},"#representa":{"ble?()":null,"tion()":null},"#varia":{"ble?()":null,"nt()":null}},"create_":{"a":{"fter_upload!()":null,"nd_upload!()":null},"before_direct_upload!()":null},"find_signed":{"()":null,"!()":null},"generate_unique_secure_token()":null},"s":{"":null,"::":{"proxycontroller":{"":null,"#show()":null},"redirectcontroller":{"":null,"#show()":null}}},"#audio?()":null,"#d":{"elete()":null,"ownload()":null},"#filename()":null,"#image?()":null,"#key()":null,"#open()":null,"#purge":{"()":null,"_later()":null},"#s":{"ervice":{"()":null,"_headers_for_direct_upload()":null,"_url":{"()":null,"_for_direct_upload()":null}},"igned_id()":null},"#text?()":null,"#u":{"pload()":null,"rl()":null},"#video?()":null},"di":{"rectuploadscontroller":{"":null,"#create()":null},"skcontroller":{"":null,"#show()":null,"#update()":null}},"error":null,"filen":{"otfounderror":null,"ame":{"":null,"#<=>()":null,"#as_json()":null,"#base()":null,"#extension":{"()":null,"_with":{"_delimiter()":null,"out_delimiter()":null}},"#sanitized()":null,"#to_":{"json()":null,"s()":null},"::":{"new()":null,"wrap()":null}}},"in":{"tegrityerror":null,"variableerror":null},"logsubscriber":{"":null,"#logger()":null,"#service_":{"d":{"elete":{"()":null,"_prefixed()":null},"ownload()":null},"exist()":null,"mirror()":null,"streaming_download()":null,"upload()":null,"url()":null}},"mirrorjob":{"":null,"#perform()":null},"preview":{"":null,"error":null,"er":{"":null,"::":{"mupdfpreviewer":{"":null,"::":{"accept?()":null,"mutool_":{"exists?()":null,"path()":null}},"#preview()":null},"popplerpdfpreviewer":{"":null,"::":{"accept?()":null,"pdftoppm_":{"exists?()":null,"path()":null}},"#preview()":null},"videopreviewer":{"":null,"::":{"accept?()":null,"ffmpeg_":{"exists?()":null,"path()":null}},"#preview()":null},"accept?()":null,"new()":null},"#d":{"ownload_blob_to_tempfile()":null,"raw()":null},"#logger()":null,"#preview()":null,"#tmpdir()":null},"#download()":null,"#image()":null,"#key()":null,"::":{"unprocessederror":null,"new()":null},"#processed()":null,"#service_url()":null,"#url()":null},"purgejob":{"":null,"#perform()":null},"re":{"flection":{"":null,"::activerecordextensions":{"":null,"::classmethods":{"":null,"#reflect_on_a":{"ll_attachments()":null,"ttachment()":null}}}},"presentations":{"":null,"::":{"proxycontroller":{"":null,"#show()":null},"redirectcontroller":{"":null,"#show()":null}}}},"se":{"rvice":{"":null,"::":{"azurestorageservice":{"":null,"#d":{"elete":{"()":null,"_prefixed()":null},"ownload":{"()":null,"_chunk()":null}},"#exist?()":null,"#headers_for_direct_upload()":null,"::new()":null,"#u":{"pload()":null,"rl_for_direct_upload()":null}},"diskservice":{"":null,"#d":{"elete":{"()":null,"_prefixed()":null},"ownload":{"()":null,"_chunk()":null}},"#exist?()":null,"#headers_for_direct_upload()":null,"::new()":null,"#u":{"pload()":null,"rl_for_direct_upload()":null}},"gcsservice":{"":null,"#d":{"elete":{"()":null,"_prefixed()":null},"ownload":{"()":null,"_chunk()":null}},"#exist?()":null,"#headers_for_direct_upload()":null,"::new()":null,"#u":{"p":{"date_metadata()":null,"load()":null},"rl_for_direct_upload()":null}},"mirrorservice":{"":null,"#delete":{"()":null,"_prefixed()":null},"#mirror()":null,"::new()":null,"#upload()":null},"s3service":{"":null,"#d":{"elete":{"()":null,"_prefixed()":null},"ownload":{"()":null,"_chunk()":null}},"#exist?()":null,"#headers_for_direct_upload()":null,"::new()":null,"#u":{"pload()":null,"rl_for_direct_upload()":null}},"configure()":null},"#d":{"elete":{"()":null,"_prefixed()":null},"ownload":{"()":null,"_chunk()":null}},"#exist?()":null,"#headers_for_direct_upload()":null,"#open()":null,"#public?()":null,"#u":{"p":{"date_metadata()":null,"load()":null},"rl":{"()":null,"_for_direct_upload()":null}}},"tcurrent":null},"transformers":{"":null,"::":{"imageprocessingtransformer":null,"transformer":{"":null,"::new()":null,"#process()":null,"#transform()":null}}},"un":{"previewableerror":null,"representableerror":null},"version":{"":null,"()":null},"varia":{"nt":{"":null,"record":null,"withrecord":{"":null,"#image()":null,"::new()":null,"#process":{"()":null,"ed":{"()":null,"?()":null}}},"#download()":null,"#filename()":null,"#image()":null,"#key()":null,"::new()":null,"#processed()":null,"#service_url()":null,"#url()":null},"tion":{"":null,"#content_type()":null,"#d":{"efault_to()":null,"igest()":null},"::":{"decode()":null,"encode()":null,"new()":null,"wrap()":null},"#format()":null,"#key()":null,"#transform()":null}},"gem_version()":null}},"support":{"":null,"::":{"a":{"ctionableerror":{"":null,"::":{"classmethods":{"":null,"#action()":null},"nonactionable":null}},"rrayinquirer":{"":null,"#any?()":null},"utoload":{"":null,"#autoload":{"()":null,"_at()":null,"_under()":null,"s()":null},"#eager_":{"autoload()":null,"load!()":null}}},"backtracecleaner":{"":null,"#add_":{"filter()":null,"silencer()":null},"#clean()":null,"#filter()":null,"::new()":null,"#remove_":{"filters!()":null,"silencers!()":null}},"benchmarkable":{"":null,"#benchmark()":null},"ca":{"ch":{"e":{"":null,"::":{"connectionpoollike":{"":null,"#with()":null},"filestore":{"":null,"#clea":{"nup()":null,"r()":null},"#de":{"crement()":null,"lete_matched()":null},"#increment()":null,"::":{"new()":null,"supports_cache_versioning?()":null}},"mem":{"cachestore":{"":null,"#clear()":null,"#decrement()":null,"#increment()":null,"#stats()":null,"::":{"new()":null,"supports_cache_versioning?()":null}},"orystore":{"":null,"#clea":{"nup()":null,"r()":null},"#de":{"crement()":null,"lete_matched()":null},"#increment()":null,"::":{"default_coder":null,"new()":null,"supports_cache_versioning?()":null},"#prun":{"e()":null,"ing?()":null}}},"nullstore":{"":null,"#clea":{"nup()":null,"r()":null},"#de":{"crement()":null,"lete_matched()":null},"#increment()":null,"::supports_cache_versioning?()":null},"rediscachestore":{"":null,"#clea":{"nup()":null,"r()":null},"#de":{"crement()":null,"lete_matched()":null},"#in":{"crement()":null,"spect()":null},"#re":{"ad_multi()":null,"dis()":null},"::":{"new()":null,"supports_cache_versioning?()":null}},"st":{"ore":{"":null,"#clea":{"nup()":null,"r()":null},"#de":{"crement()":null,"lete":{"()":null,"_m":{"atched()":null,"ulti()":null}}},"#exist?()":null,"#fetch":{"()":null,"_multi()":null},"#increment()":null,"#key_matcher()":null,"#mute()":null,"::new()":null,"#read":{"()":null,"_multi()":null},"#silence!()":null,"#write":{"()":null,"_multi()":null}},"rategy":{"":null,"::localcache":{"":null,"::localstore":{"":null,"#clear()":null,"#delete_entry()":null,"::new()":null,"#read_":{"entry()":null,"multi_entries()":null},"#write_entry()":null},"#middleware()":null,"#with_local_cache()":null}}},"expand_cache_key()":null,"lookup_store()":null}},"ingkeygenerator":{"":null,"#generate_key()":null,"::new()":null}},"llbacks":{"":null,"::":{"c":{"lassmethods":{"":null,"#define_callbacks()":null,"#reset_callbacks()":null,"#s":{"et_callback()":null,"kip_callback()":null}},"onditionals":{"":null,"::value":{"":null,"#call()":null,"::new()":null}}},"filters":{"":null,"::":{"after":{"":null,"::build()":null},"before":{"":null,"::build()":null}}}},"#run_callbacks()":null}},"co":{"mparewithrange":{"":null,"#===()":null,"#cover?()":null,"#include?()":null},"nc":{"ern":{"":null,"#class_methods()":null,"#included()":null,"#prepended()":null},"urrency":{"":null,"::":{"loadinterlockawaremonitor":{"":null,"#mon_enter()":null,"#synchronize()":null},"sharelock":{"":null,"#exclusive()":null,"::new()":null,"#s":{"haring()":null,"tart_":{"exclusive()":null,"sharing()":null},"top_":{"exclusive()":null,"sharing()":null}},"#yield_shares()":null}}}},"nfigura":{"ble":{"":null,"::c":{"lassmethods":{"":null,"#config":{"()":null,"_accessor()":null,"ure()":null}},"onfiguration":{"":null,"#compile_methods!()":null,"::compile_methods!()":null}},"#config()":null},"tionfile":{"":null,"::formaterror":null}}},"currentattributes":{"":null,"::":{"a":{"fter_reset()":null,"ttribute()":null},"before_reset()":null,"instance()":null,"new()":null,"resets()":null},"#reset()":null,"#set()":null},"de":{"p":{"endencies":{"":null,"::":{"classcache":{"":null,"#[]()":null,"#clear!()":null,"#empty?()":null,"#get()":null,"#key?()":null,"::new()":null,"#s":{"afe_get()":null,"tore()":null}},"interlock":{"":null,"#done_":{"running()":null,"unloading()":null},"#loading()":null,"#permit_concurrent_loads()":null,"#running()":null,"#start_":{"running()":null,"unloading()":null},"#unloading()":null},"watchstack":{"":null,"#each()":null,"::new()":null,"#new_constants()":null,"#watch":{"_namespaces()":null,"ing?()":null}},"zeitwerkintegration":{"":null,"::":{"decorations":null,"inflector":null,"requiredependency":null}},"load":{"able":{"":null,"#require_dependency()":null},"_interlock()":null},"run_interlock()":null,"unload_interlock()":null}},"recation":{"":null,"::":{"behavior":{"":null,"#behavior":{"()":null,"=()":null},"#disallowed_behavior":{"()":null,"=()":null}},"deprecated":{"constant":{"accessor":{"":null,"#const_missing()":null,"#deprecate_constant()":null,"::included()":null},"proxy":{"":null,"#class()":null,"#inspect()":null,"::new()":null}},"instancevariableproxy":{"":null,"::new()":null},"objectproxy":{"":null,"::new()":null}},"disallowed":{"":null,"#disallowed_warnings()":null},"methodwrapper":{"":null,"#deprecate_methods()":null},"reporting":{"":null,"#allow()":null,"#deprecation_warning()":null,"#silence":{"()":null,"d()":null},"#warn()":null},"new()":null},"exception":null}},"scendantstracker":{"":null,"::":{"clear()":null,"descendants()":null,"direct_descendants()":null,"store_inherited()":null,"subclasses()":null},"#d":{"escendants()":null,"irect_descendants()":null},"#inherited()":null,"#subclasses()":null}},"duration":{"":null,"#%()":null,"#*()":null,"#+()":null,"#-()":null,"#/()":null,"#<=>()":null,"#==()":null,"#a":{"fter()":null,"go()":null},"#before()":null,"::":{"iso8601parser":{"":null,"::parsingerror":null},"build()":null,"parse()":null},"#eql?()":null,"#from_now()":null,"#hash()":null,"#i":{"n_":{"days()":null,"hours()":null,"minutes()":null,"months()":null,"seconds()":null,"weeks()":null,"years()":null},"so8601()":null},"#since()":null,"#to_":{"i()":null,"s()":null},"#until()":null},"encrypted":{"configuration":{"":null,"#config()":null,"::new()":null,"#read()":null,"#write()":null},"file":{"":null,"::":{"invalidkeylengtherror":{"":null,"::new()":null},"missing":{"contenterror":{"":null,"::new()":null},"keyerror":{"":null,"::new()":null}},"generate_key()":null,"new()":null},"#change()":null,"#key()":null,"#read()":null,"#write()":null}},"eventedfileupdatechecker":{"":null,"::core":null},"execut":{"ionwrapper":{"":null,"#complete!()":null,"::":{"r":{"egister_hook()":null,"un!()":null},"to_":{"complete()":null,"run()":null},"wrap()":null}},"or":null},"fileupdatechecker":{"":null,"#execute":{"()":null,"_if_updated()":null},"::new()":null,"#updated?()":null},"forktracker":{"":null,"::coreext":{"":null,"private":null,"#fork()":null}},"gzip":{"":null,"::":{"stream":{"":null,"#close()":null,"::new()":null},"compress()":null,"decompress()":null}},"hashwithindifferentaccess":{"":null,"#[]":{"()":null,"=()":null},"#assoc()":null,"#compact()":null,"#d":{"e":{"ep_s":{"tringify_keys":{"()":null,"!()":null},"ymbolize_keys()":null},"fault()":null,"lete()":null},"ig()":null,"up()":null},"#ex":{"cept()":null,"tractable_options?()":null},"#fetch":{"()":null,"_values()":null},"#has_key?()":null,"#include?()":null,"#key?()":null,"#me":{"mber?()":null,"rge":{"()":null,"!()":null}},"#nested_under_indifferent_access()":null,"::":{"[]()":null,"new()":null},"#re":{"gular_":{"update()":null,"writer()":null},"ject()":null,"place()":null,"verse_merge":{"()":null,"!()":null}},"#s":{"elect()":null,"lice":{"()":null,"!()":null},"tore()":null,"tringify_keys":{"()":null,"!()":null},"ymbolize_keys()":null},"#t":{"o_":{"hash()":null,"options":{"()":null,"!()":null}},"ransform_":{"keys":{"()":null,"!()":null},"values()":null}},"#update()":null,"#values_at()":null,"#with":{"_":{"defaults":{"()":null,"!()":null},"indifferent_access()":null},"out()":null}},"in":{"flector":{"":null,"::inflections":{"":null,"#acronym()":null,"#clear()":null,"#human()":null,"::":{"uncountables":{"":null,"#<<()":null,"#add()":null,"#delete()":null,"::new()":null,"#uncountable?()":null},"instance()":null,"new()":null},"#irregular()":null,"#plural()":null,"#singular()":null,"#uncountable()":null},"#c":{"amelize()":null,"lassify()":null,"onstantize()":null},"#d":{"asherize()":null,"econstantize()":null,"emodulize()":null},"#foreign_key()":null,"#humanize()":null,"#inflections()":null,"#ordinal":{"()":null,"ize()":null},"#p":{"arameterize()":null,"luralize()":null},"#s":{"afe_constantize()":null,"ingularize()":null},"#t":{"ableize()":null,"itleize()":null,"ransliterate()":null},"#u":{"nderscore()":null,"pcase_first()":null}},"heritableoptions":{"":null,"#inheritable_copy()":null,"::new()":null}},"json":{"":null,"::":{"decode()":null,"encode()":null,"parse_error()":null}},"keygenerator":{"":null,"#generate_key()":null,"::new()":null},"lazyloadhooks":{"":null,"#on_load()":null,"#run_load_hooks()":null},"log":{"subscriber":{"":null,"#color()":null,"#finish()":null,"::":{"testhelper":{"":null,"::mocklogger":{"":null,"#flush()":null,"#logged()":null,"#method_missing()":null,"::new()":null},"#set_logger()":null,"#wait()":null},"flush_all!()":null,"log":{"_subscribers()":null,"ger()":null}},"#logger()":null,"#start()":null},"ger":{"":null,"silence":{"":null,"#silence()":null},"::":{"simpleformatter":{"":null,"#call()":null},"logger_outputs_to?()":null,"new()":null}}},"message":{"encryptor":{"":null,"#decrypt_and_verify()":null,"#encrypt_and_sign()":null,"::":{"invalidmessage":null,"key_len()":null,"new()":null}},"verifier":{"":null,"#generate()":null,"::":{"invalidsignature":null,"new()":null},"#v":{"alid_message?()":null,"erif":{"ied()":null,"y()":null}}},"s":{"":null,"::rotator":{"":null,"::":{"encryptor":{"":null,"#decrypt_and_verify()":null},"verifier":{"":null,"#verified()":null}}}}},"multibyte":{"":null,"::":{"chars":{"":null,"#compose()":null,"#decompose()":null,"#grapheme_length()":null,"#limit()":null,"#method_missing()":null,"::new()":null,"#re":{"spond_to_missing?()":null,"verse()":null},"#s":{"lice!()":null,"plit()":null},"#ti":{"dy_bytes()":null,"tle":{"case()":null,"ize()":null}}},"unicode":{"":null,"#compose()":null,"#de":{"compose()":null,"fault_normalization_form":{"()":null,"=()":null}},"#tidy_bytes()":null},"proxy_class":{"()":null,"=()":null}}},"notifications":{"":null,"::":{"event":{"":null,"#<<()":null,"#allocations()":null,"#cpu_time()":null,"#duration()":null,"#finish!()":null,"#idle_time()":null,"::new()":null,"#parent_of?()":null,"#start!()":null},"fanout":{"":null,"#finish()":null,"#listen":{"ers_for()":null,"ing?()":null},"::":{"subscribers":{"":null,"::eventobject":{"":null,"#finish()":null,"#start()":null}},"new()":null},"#publish()":null,"#s":{"tart()":null,"ubscribe()":null},"#unsubscribe()":null,"#wait()":null},"instrument":{"er":{"":null,"#finish":{"()":null,"_with_state()":null},"#instrument()":null,"()":null,"::new()":null,"#start()":null},"()":null},"monotonic_subscribe()":null,"publish()":null,"subscribe":{"()":null,"d()":null},"unsubscribe()":null}},"num":{"berhelper":{"":null,"#number_to_":{"currency()":null,"delimited()":null,"human":{"()":null,"_size()":null},"percentage()":null,"phone()":null,"rounded()":null}},"ericwithformat":{"":null,"#to_s()":null}},"ordered":{"hash":{"":null,"#e":{"ncode_with()":null,"xtractable_options?()":null},"#nested_under_indifferent_access()":null,"#reject()":null,"#select()":null,"#to_yaml_type()":null},"options":{"":null,"#[]":{"()":null,"=()":null},"#_get()":null,"#extractable_options?()":null,"#inspect()":null,"#method_missing()":null,"#respond_to_missing?()":null}},"parameterfilter":{"":null,"#filter":{"()":null,"_param()":null},"::new()":null},"perthreadregistry":{"":null,"::extended()":null,"#instance()":null},"proxyobject":{"":null,"#raise()":null},"rangewithformat":{"":null,"#to_":{"default_s()":null,"formatted_s()":null,"s()":null}},"re":{"loader":{"":null,"::":{"after_class_unload()":null,"before_class_unload()":null,"new()":null,"reload!()":null,"to_prepare()":null,"wrap()":null},"#re":{"lease_unload_lock!()":null,"quire_unload_lock!()":null}},"scuable":{"":null,"::classmethods":{"":null,"#rescue_":{"from()":null,"with_handler()":null}},"#rescue_with_handler()":null}},"safebuffer":{"":null,"#%()":null,"#*()":null,"#+()":null,"#<<()":null,"#[]":{"()":null,"=()":null},"#c":{"lone_empty()":null,"oncat()":null},"#encode_with()":null,"#html_safe?()":null,"#in":{"itialize_copy()":null,"sert()":null},"::":{"safeconcaterror":{"":null,"::new()":null},"new()":null},"#original_concat()":null,"#prepend()":null,"#replace()":null,"#safe_concat()":null,"#to_":{"param()":null,"s()":null}},"secur":{"ecomparerotator":{"":null,"::new()":null,"#secure_compare!()":null},"ityutils":{"":null,"::":{"fixed_length_secure_compare()":null,"secure_compare()":null}}},"stringinquirer":null,"subscriber":{"":null,"::":{"a":{"dd_event_subscriber()":null,"ttach_to()":null},"detach_from()":null,"method_added()":null,"new()":null,"remove_event_subscriber()":null,"subscribers()":null},"#finish()":null,"#start()":null},"taggedlogging":{"":null,"#flush()":null,"::new()":null,"#tagged()":null},"test":{"case":{"":null,"::":{"parallelize":{"()":null,"_setup()":null,"_teardown()":null},"test_order":{"()":null,"=()":null}}},"ing":{"":null,"::":{"assertions":{"":null,"#assert_":{"changes()":null,"difference()":null,"no":{"_":{"changes()":null,"difference()":null},"t()":null,"thing_raised()":null}}},"constantlookup":null,"declarative":{"":null,"#test()":null},"filefixtures":{"":null,"#file_fixture()":null},"isolation":{"":null,"::":{"forking":{"":null,"_env?()":null,"#run_in_isolation()":null},"subprocess":{"":null,"#run_in_isolation()":null}},"#run()":null},"parallelization":{"":null,"::":{"server":{"":null,"#<<()":null,"#active_workers?()":null,"::new()":null,"#pop()":null,"#record()":null,"#s":{"hutdown()":null,"tart_worker()":null,"top_worker()":null}},"worker":{"":null,"#after_fork()":null,"::new()":null,"#perform_job()":null,"#run_cleanup()":null,"#s":{"afe_record()":null,"tart()":null},"#work_from_queue()":null}}},"setupandteardown":{"":null,"::":{"classmethods":{"":null,"#setup()":null,"#teardown()":null},"prepended()":null}},"timehelpers":{"":null,"#after_teardown()":null,"#freeze_time()":null,"#travel":{"()":null,"_back()":null,"_to()":null},"#unfreeze_time()":null}}}},"time":{"withzone":{"":null,"#+()":null,"#-()":null,"#<=>()":null,"#a":{"cts_like_time?()":null,"dvance()":null,"go()":null,"s_json()":null},"#b":{"etween?()":null,"lank?()":null},"#c":{"hange()":null,"omparable_time()":null},"#dst?()":null,"#eql?()":null,"#f":{"ormatted_offset()":null,"reeze()":null,"uture?()":null},"#g":{"et":{"gm()":null,"local()":null,"utc()":null},"mt":{"?()":null,"_offset()":null,"ime()":null,"off()":null}},"#h":{"ash()":null,"ttpdate()":null},"#i":{"n":{"()":null,"_time_zone()":null,"spect()":null},"s_a?()":null,"sdst()":null,"so8601()":null},"#kind_of?()":null,"#localtime()":null,"#m":{"arshal_":{"dump()":null,"load()":null},"ethod_missing()":null},"::n":{"ame()":null,"ew()":null},"#next_day?()":null,"#p":{"ast?()":null,"eriod()":null,"rev_day?()":null},"#r":{"espond_to":{"?()":null,"_missing?()":null},"fc":{"2822()":null,"3339()":null,"822()":null}},"#s":{"ince()":null,"trftime()":null},"#t":{"ime()":null,"o_":{"a()":null,"datetime()":null,"f()":null,"formatted_s()":null,"i()":null,"r()":null,"s()":null,"time()":null},"oday?()":null,"omorrow?()":null,"v_sec()":null},"#utc":{"()":null,"?()":null,"_offset()":null},"#xmlschema()":null,"#yesterday?()":null,"#zone()":null},"zone":{"":null,"#<=>()":null,"#=~()":null,"::":{"[]()":null,"all()":null,"country_zones()":null,"create()":null,"find_tzinfo()":null,"new()":null,"seconds_to_utc_offset()":null,"us_zones()":null},"#at()":null,"#formatted_offset()":null,"#iso8601()":null,"#local":{"()":null,"_to_utc()":null},"#match?()":null,"#now()":null,"#p":{"arse()":null,"eriod_for_":{"local()":null,"utc()":null}},"#rfc3339()":null,"#strptime()":null,"#to":{"_s()":null,"day()":null,"morrow()":null},"#utc_":{"offset()":null,"to_local()":null},"#yesterday()":null}},"version":{"":null,"()":null},"xml":{"converter":{"":null,"::disallowedtype":{"":null,"::new()":null}},"mini":{"":null,"_libxmlsax":{"":null,"::hashbuilder":{"":null,"#current_hash()":null,"#on_":{"c":{"data_block()":null,"haracters()":null},"end_":{"document()":null,"element()":null},"start_":{"document()":null,"element()":null}}}},"_nokogirisax":{"":null,"::hashbuilder":{"":null,"#c":{"data_block()":null,"haracters()":null,"urrent_hash()":null},"#e":{"nd_":{"document()":null,"element()":null},"rror()":null},"#start_":{"document()":null,"element()":null}}},"#backend":{"()":null,"=()":null},"#rename_key()":null,"#to_tag()":null,"#with_backend()":null}},"gem_version()":null}}}},"ar":{"el":{"":null,"::":{"nodes":null,"sql()":null}},"ray":{"":null,"#deep_dup()":null,"#ex":{"cluding()":null,"tract":{"!()":null,"_options!()":null}},"#f":{"ifth()":null,"orty_two()":null,"ourth()":null,"rom()":null},"#in":{"_groups":{"()":null,"_of()":null},"cluding()":null,"quiry()":null},"#s":{"econd":{"()":null,"_to_last()":null},"plit()":null},"#t":{"hird":{"()":null,"_to_last()":null},"o()":null,"o_":{"default_s()":null,"formatted_s()":null,"param()":null,"query()":null,"s()":null,"sentence()":null,"xml()":null}},"#without()":null,"::wrap()":null}},"benchmark":{"":null,"::ms()":null},"bigdecimal":null,"class":{"":null,"#class_attribute()":null,"#descendants()":null,"#subclasses()":null},"date":{"":null,"andtime":{"":null,"::":{"c":{"alculations":{"":null,"#a":{"fter?()":null,"ll_":{"day()":null,"month()":null,"quarter()":null,"week()":null,"year()":null},"t_":{"beginning_of_":{"month()":null,"quarter()":null,"week()":null,"year()":null},"end_of_":{"month()":null,"quarter()":null,"week()":null,"year()":null}}},"#be":{"fore?()":null,"ginning_of_":{"month()":null,"quarter()":null,"week()":null,"year()":null}},"#days_":{"ago()":null,"since()":null,"to_week_start()":null},"#end_of_":{"month()":null,"quarter()":null,"week()":null,"year()":null},"#future?()":null,"#last_":{"month()":null,"quarter()":null,"week":{"()":null,"day()":null},"year()":null},"#mon":{"day()":null,"ths_":{"ago()":null,"since()":null}},"#next_":{"day?()":null,"occurring()":null,"quarter()":null,"week":{"()":null,"day()":null}},"#on_week":{"day?()":null,"end?()":null},"#p":{"ast?()":null,"rev_":{"day?()":null,"occurring()":null,"quarter()":null,"week":{"()":null,"day()":null}}},"#sunday()":null,"#to":{"day?()":null,"morrow":{"()":null,"?()":null}},"#weeks_":{"ago()":null,"since()":null},"#ye":{"ars_":{"ago()":null,"since()":null},"sterday":{"()":null,"?()":null}}},"ompatibility":null},"zones":{"":null,"#in_time_zone()":null}}},"time":{"":null,"#<=>()":null,"#a":{"cts_like_":{"date?()":null,"time?()":null},"dvance()":null,"go()":null,"t_":{"beginning_of_":{"day()":null,"hour()":null,"minute()":null},"end_of_":{"day()":null,"hour()":null,"minute()":null},"mid":{"d":{"ay()":null,"le_of_day()":null},"night()":null},"noon()":null}},"#beginning_of_":{"day()":null,"hour()":null,"minute()":null},"#change()":null,"::c":{"ivil_from_format()":null,"urrent()":null},"#default_inspect()":null,"#end_of_":{"day()":null,"hour()":null,"minute()":null},"#formatted_offset()":null,"#g":{"et":{"gm()":null,"local()":null,"utc()":null},"mtime()":null},"#in":{"()":null,"spect()":null},"#localtime()":null,"#mid":{"d":{"ay()":null,"le_of_day()":null},"night()":null},"#n":{"oon()":null,"sec()":null},"#readable_inspect()":null,"#s":{"econds_":{"since_midnight()":null,"until_end_of_day()":null},"ince()":null,"ubsec()":null},"#to_":{"default_s()":null,"f()":null,"formatted_s()":null,"i()":null,"s()":null,"time()":null},"#u":{"sec()":null,"tc":{"()":null,"?()":null,"_offset()":null}}},"#<=>()":null,"#a":{"cts_like_date?()":null,"dvance()":null,"go()":null,"t_":{"beginning_of_day()":null,"end_of_day()":null,"mid":{"d":{"ay()":null,"le_of_day()":null},"night()":null},"noon()":null}},"#beginning_of_day()":null,"#c":{"hange()":null,"ompare_with":{"_coercion()":null,"out_coercion()":null}},"::":{"beginning_of_week":{"()":null,"=()":null},"current()":null,"find_beginning_of_week!()":null,"tomorrow()":null,"yesterday()":null},"#default_inspect()":null,"#end_of_day()":null,"#in":{"()":null,"spect()":null},"#mid":{"d":{"ay()":null,"le_of_day()":null},"night()":null},"#noon()":null,"#readable_inspect()":null,"#since()":null,"#to_":{"default_s()":null,"formatted_s()":null,"s()":null,"time()":null},"#xmlschema()":null},"delegator":{"":null,"#try":{"()":null,"!()":null}},"digest":{"":null,"::uuid":{"":null,"::uuid_":{"from_hash()":null,"v3()":null,"v4()":null,"v5()":null}}},"erb":{"":null,"::util":{"":null,"::":{"h":{"()":null,"tml_escape":{"()":null,"_once()":null}},"json_escape()":null}}},"enumerable":{"":null,"#compact_blank()":null,"#exclud":{"e?()":null,"ing()":null},"#in":{"cluding()":null,"dex_":{"by()":null,"with()":null}},"#many?()":null,"#p":{"ick()":null,"luck()":null},"#sum()":null,"#without()":null},"exception":{"":null,"#as_json()":null},"falseclass":{"":null,"#blank?()":null,"#to_param()":null},"file":{"":null,"::atomic_write()":null},"float":null,"hash":{"":null,"#assert_valid_keys()":null,"#compact_blank!()":null,"#deep_":{"dup()":null,"merge":{"()":null,"!()":null},"stringify_keys":{"()":null,"!()":null},"symbolize_keys":{"()":null,"!()":null},"transform_":{"keys":{"()":null,"!()":null},"values":{"()":null,"!()":null}}},"#ex":{"cept":{"()":null,"!()":null},"tract":{"!()":null,"able_options?()":null}},"::from_":{"trusted_xml()":null,"xml()":null},"#nested_under_indifferent_access()":null,"#reverse_":{"merge":{"()":null,"!()":null},"update()":null},"#s":{"lice!()":null,"tringify_keys":{"()":null,"!()":null},"ymbolize_keys":{"()":null,"!()":null}},"#to_":{"options":{"()":null,"!()":null},"param()":null,"query()":null,"xml()":null},"#with_":{"defaults":{"()":null,"!()":null},"indifferent_access()":null}},"io":null,"integer":{"":null,"#m":{"onth":{"()":null,"s()":null},"ultiple_of?()":null},"#ordinal":{"()":null,"ize()":null},"#year":{"()":null,"s()":null}},"kernel":{"":null,"#c":{"lass_eval()":null,"oncern()":null},"#enable_warnings()":null,"#s":{"ilence_warnings()":null,"uppress()":null},"#with_warnings()":null},"loaderror":{"":null,"#is_missing?()":null},"mail":{"":null,"::":{"address":{"":null,"#==()":null,"::wrap()":null},"message":{"":null,"#bcc_addresses()":null,"#cc_addresses()":null,"#from_address()":null,"#recipients":{"()":null,"_addresses()":null},"#to_addresses()":null,"#x_original_to_addresses()":null},"from_source()":null}},"method":{"":null,"#duplicable?()":null},"mi":{"me":{"":null,"::":{"alltype":{"":null,"#all?()":null,"#html?()":null,"::new()":null},"mimes":{"":null,"#<<()":null,"#delete_if()":null,"#each()":null,"::new()":null},"nulltype":{"":null,"#nil?()":null,"#ref()":null,"#to_s()":null},"type":{"":null,"#=":{"=":{"()":null,"=()":null},"~()":null},"#all?()":null,"#eql?()":null,"#html?()":null,"::":{"invalidmimetype":null,"lookup":{"()":null,"_by_extension()":null},"new()":null,"parse":{"()":null,"_data_with_trailing_star()":null,"_trailing_star()":null},"register":{"()":null,"_alias()":null,"_callback()":null},"unregister()":null},"#match?()":null,"#ref()":null,"#to_s":{"()":null,"tr()":null,"ym()":null}},"[]()":null,"fetch()":null}},"nitest":{"":null,"::":{"backtracefilterwithfallback":{"":null,"#filter()":null,"::new()":null},"suppressedsummaryreporter":{"":null,"#aggregated_results()":null},"plugin_rails_":{"init()":null,"options()":null}}}},"module":{"":null,"::":{"concerning":{"":null,"#concern":{"()":null,"ing()":null}},"delegationerror":null},"#a":{"lias_attribute()":null,"nonymous?()":null,"ttr_internal":{"()":null,"_accessor()":null,"_reader()":null,"_writer()":null}},"#cattr_":{"accessor()":null,"reader()":null,"writer()":null},"#de":{"legate":{"()":null,"_missing_to()":null},"precate()":null},"#m":{"attr_":{"accessor()":null,"reader()":null,"writer()":null},"odule_parent":{"()":null,"_name()":null,"s()":null}},"#re":{"define_":{"method()":null,"singleton_method()":null},"move_possible_":{"method()":null,"singleton_method()":null}},"#silence_redefinition_of_method()":null,"#thread_":{"cattr_accessor()":null,"mattr_accessor()":null}},"nameerror":{"":null,"#missing_name":{"()":null,"?()":null}},"nilclass":{"":null,"#blank?()":null,"#t":{"o_param()":null,"ry":{"()":null,"!()":null}}},"numeric":{"":null,"#byte":{"()":null,"s()":null},"#day":{"()":null,"s()":null},"#exabyte":{"()":null,"s()":null},"#fortnight":{"()":null,"s()":null},"#gigabyte":{"()":null,"s()":null},"#h":{"our":{"()":null,"s()":null},"tml_safe?()":null},"#in_milliseconds()":null,"#kilobyte":{"()":null,"s()":null},"#m":{"egabyte":{"()":null,"s()":null},"inute":{"()":null,"s()":null}},"#petabyte":{"()":null,"s()":null},"#second":{"()":null,"s()":null},"#terabyte":{"()":null,"s()":null},"#week":{"()":null,"s()":null}},"object":{"":null,"#acts_like?()":null,"#blank?()":null,"#d":{"eep_dup()":null,"uplicable?()":null},"#html_safe?()":null,"#in":{"?()":null,"stance_va":{"lues()":null,"riable_names()":null}},"#presen":{"ce":{"()":null,"_in()":null},"t?()":null},"#t":{"o_":{"param()":null,"query()":null},"ry":{"()":null,"!()":null}},"#unescape()":null,"#with_options()":null},"process":null,"ra":{"ils":{"":null,"::":{"ap":{"i":{"":null,"::":{"edgetask":{"":null,"#rails_version()":null},"repotask":{"":null,"#api_dir()":null,"#co":{"mponent_root_dir()":null,"nfigure_sdoc()":null}},"stabletask":{"":null,"#rails_version()":null},"task":{"":null,"#api_main()":null,"#configure_":{"rdoc_files()":null,"sdoc()":null},"#desc()":null,"::new()":null,"#setup_horo_variables()":null}}},"pbuilder":{"":null,"#app()":null,"#bin":{"()":null,"_when_updating()":null},"#c":{"onfig":{"()":null,"_target_version()":null,"_when_updating()":null,"ru()":null},"redentials()":null},"#d":{"atabase_yml()":null,"b()":null},"#g":{"emfile()":null,"it":{"attributes()":null,"ignore()":null}},"#l":{"ib()":null,"og()":null},"#master_key()":null,"#p":{"ackage_json()":null,"ublic_directory()":null},"#r":{"akefile()":null,"eadme()":null,"uby_version()":null},"#s":{"torage()":null,"ystem_test()":null},"#t":{"est()":null,"mp()":null},"#ve":{"ndor()":null,"rsion_control()":null},"#yarn_when_updating()":null},"plication":{"":null,"::":{"bootstrap":null,"configuration":{"":null,"#a":{"nnotations()":null,"pi_only=()":null,"utoloader=()":null},"#co":{"lorize_logging":{"()":null,"=()":null},"ntent_security_policy()":null},"#d":{"atabase_configuration()":null,"ebug_exception_response_format()":null,"efault_log_file()":null},"#encoding=()":null,"#load_defaults()":null,"::new()":null,"#p":{"aths()":null,"ermissions_policy()":null},"#session_store()":null},"defaultmiddlewarestack":{"":null,"#build_stack()":null,"::new()":null},"routesreloader":{"":null,"::new()":null,"#reload!()":null},"create()":null,"fin":{"isher":{"":null,"::":{"interlockhook":{"":null,"::":{"complete()":null,"run()":null}},"mutexhook":{"":null,"#complete()":null,"::new()":null,"#run()":null}}},"d_root()":null},"in":{"herited()":null,"stance()":null},"new()":null},"()":null,"#c":{"on":{"fig_for()":null,"sole()":null},"redentials()":null},"#e":{"ager_load!()":null,"ncrypted()":null,"nv_config()":null},"#generators()":null,"#i":{"nitialize":{"d?()":null,"r()":null},"solate_namespace()":null},"#key_generator()":null,"#message_verifier()":null,"#r":{"ake_tasks()":null,"eload_routes!()":null,"unner()":null},"#se":{"cret":{"_key_base()":null,"s()":null},"rver()":null},"#validate_secret_key_base()":null}},"co":{"mmand":{"":null,"::":{"actions":{"":null,"#load_":{"generators()":null,"tasks()":null},"#require_":{"application":{"!()":null,"_and_environment!()":null},"environment!()":null},"#set_application_directory!()":null},"base":{"":null,"::":{"ba":{"nner()":null,"se_name()":null},"command_name()":null,"de":{"fault_command_root()":null,"sc()":null},"engine?()":null,"executable()":null,"hide_command!()":null,"namespace()":null,"printing_commands()":null,"usage_path()":null},"#help()":null},"db":{"":null,"::system":null},"helpers":{"":null,"::editor":null},"command_type()":null,"file_lookup_paths()":null,"invoke()":null,"lookup_paths()":null,"root()":null}},"nductor":null,"nfiguration":{"":null,"::middlewarestackproxy":{"":null,"#delete()":null,"#insert":{"()":null,"_after()":null,"_before()":null},"#move":{"()":null,"_after()":null,"_before()":null},"::new()":null,"#swap()":null,"#u":{"nshift()":null,"se()":null}},"()":null},"nsole":{"":null,"methods":{"":null,"#app()":null,"#controller()":null,"#helper()":null,"#new_session()":null,"#reload!()":null},"#environment":{"()":null,"?()":null},"::":{"backtracecleaner":{"":null,"#filter_backtrace()":null},"new()":null,"start()":null},"#s":{"andbox?()":null,"et_environment!()":null,"tart()":null}}},"dbconsole":{"":null,"#config":{"()":null,"urations()":null},"#d":{"atabase()":null,"b_config()":null},"#environment()":null,"#find_cmd_and_exec()":null,"::":{"new()":null,"start()":null},"#start()":null},"in":{"fo":{"":null,"::":{"inspect()":null,"property()":null,"to_":{"html()":null,"s()":null}}},"itializable":{"":null,"::":{"c":{"lassmethods":{"":null,"#initializer":{"()":null,"s()":null,"s_":{"chain()":null,"for()":null}}},"ollection":{"":null,"#+()":null,"#tsort_each_child()":null}},"initializer":{"":null,"#after()":null,"#b":{"e":{"fore()":null,"longs_to?()":null},"ind()":null},"#context_class()":null,"::new()":null,"#run()":null}},"#initializers()":null,"#run_initializers()":null}},"paths":{"":null,"::":{"path":{"":null,"#<<()":null,"#c":{"hildren()":null,"oncat()":null},"#e":{"ach()":null,"xistent":{"()":null,"_directories()":null},"xpanded()":null},"#first()":null,"#last()":null,"::new()":null,"#p":{"aths()":null,"ush()":null},"#to_a":{"()":null,"ry()":null},"#unshift()":null},"root":{"":null,"#[]":{"()":null,"=()":null},"#a":{"dd()":null,"ll_paths()":null,"utoload_":{"once()":null,"paths()":null}},"#eager_load()":null,"#keys()":null,"#load_paths()":null,"::new()":null,"#values":{"()":null,"_at()":null}}}},"pluginbuilder":{"":null,"#a":{"pp()":null,"ssets_manifest()":null},"#bin()":null,"#config()":null,"#g":{"e":{"m":{"file":{"()":null,"_entry()":null},"spec()":null},"nerate_test_dummy()":null},"itignore()":null},"#li":{"b()":null,"cense()":null},"#r":{"akefile()":null,"eadme()":null},"#stylesheets()":null,"#test":{"()":null,"_dummy_":{"assets()":null,"clean()":null,"config()":null}},"#version_control()":null},"ra":{"ck":{"":null,"::logger":{"":null,"#c":{"all":{"()":null,"_app()":null},"ompute_tags()":null},"::new()":null,"#started_request_message()":null}},"il":{"s":{"":null,"::conductor":{"":null,"::actionmailbox":{"":null,"::":{"inboundemails":{"":null,"::sourcescontroller":{"":null,"#create()":null,"#new()":null},"controller":{"":null,"#create()":null,"#index()":null,"#new()":null,"#show()":null}},"reroutescontroller":{"":null,"#create()":null}}}}},"tie":{"":null,"::":{"abstract_railtie?()":null,"con":{"figur":{"a":{"ble":{"":null,"::classmethods":{"":null,"#configure()":null,"#in":{"herited()":null,"stance()":null},"#respond_to?()":null}},"tion":{"":null,"#a":{"fter_initialize()":null,"pp_":{"generators()":null,"middleware()":null}},"#before_":{"configuration()":null,"eager_load()":null,"initialize()":null},"#eager_load_namespaces()":null,"::new()":null,"#respond_to?()":null,"#to_prepare":{"()":null,"_blocks()":null},"#watchable_":{"dirs()":null,"files()":null}}},"e()":null},"sole()":null},"generators()":null,"instance()":null,"ra":{"iltie_name()":null,"ke_tasks()":null},"runner()":null,"server()":null,"subclasses()":null},"#config()":null}}},"se":{"crets":{"":null,"::missingkeyerror":{"":null,"::new()":null}},"rver":{"":null,"#default_options()":null,"#middleware()":null,"::":{"options":{"":null,"#parse!()":null},"new()":null},"#opt_parser()":null,"#s":{"e":{"rved_url()":null,"t_environment()":null},"tart()":null}}},"sourceannotationextractor":{"":null,"#display()":null,"::":{"annotation":{"":null,"::":{"directories()":null,"extensions()":null,"register_":{"directories()":null,"extensions()":null,"tags()":null},"tags()":null},"#to_s()":null},"enumerate()":null,"new()":null},"#extract_annotations_from()":null,"#find":{"()":null,"_in()":null}},"version":{"":null,"()":null},"autoloaders()":null,"backtrace":{"cleaner":{"":null,"::new()":null},"_cleaner()":null},"en":{"gine":{"":null,"::":{"configuration":{"":null,"#autoload_":{"once_paths()":null,"paths()":null},"#eager_load_paths()":null,"#generators()":null,"::new()":null,"#paths()":null,"#root=()":null},"railties":{"":null,"#-()":null,"#each()":null,"::new()":null},"updater":{"":null,"::":{"generator()":null,"run()":null}},"endpoint()":null,"find":{"()":null,"_root()":null},"inherited()":null,"isolate_namespace()":null,"new()":null},"#app()":null,"#c":{"all()":null,"onfig()":null},"#e":{"ager_load!()":null,"ndpoint()":null,"nv_config()":null},"#helpers":{"()":null,"_paths()":null},"#load_":{"con":{"fig_initializer()":null,"sole()":null},"generators()":null,"runner()":null,"se":{"ed()":null,"rver()":null},"tasks()":null},"#r":{"ailties()":null,"outes()":null}},"v()":null,"v=()":null},"ge":{"nerators":{"":null,"::":{"a":{"cti":{"ons":{"":null,"#a":{"dd_source()":null,"pplication()":null},"#e":{"nvironment()":null,"xecute_command()":null,"xtify()":null},"#g":{"e":{"m":{"()":null,"_group()":null},"nerate()":null},"it":{"()":null,"hub()":null}},"#in":{"dentation()":null,"itializer()":null},"#l":{"ib()":null,"og()":null},"#optimize_indentation()":null,"#quote()":null,"#r":{"a":{"ils_command()":null,"ke":{"()":null,"file()":null}},"eadme()":null,"oute()":null},"#vendor()":null,"#with_indentation()":null},"vemodel":{"":null,"::":{"all()":null,"build()":null,"find()":null,"new()":null},"#destroy()":null,"#errors()":null,"#save()":null,"#update()":null}},"pp":{"base":{"":null,"::gemfileentry":{"":null,"::":{"github()":null,"new()":null,"path()":null,"version()":null},"#version()":null}},"generator":{"":null,"#after_bundle()":null}},"pi_only!()":null},"base":{"":null,"::":{"add_shebang_option!()":null,"ba":{"nner()":null,"se_":{"name()":null,"root()":null}},"de":{"fault_":{"aliases_for_option()":null,"for_option()":null,"generator_root()":null,"source_root()":null,"value_for_option()":null},"sc()":null},"generator_name()":null,"hide!()":null,"hook_for()":null,"namespace()":null,"remove_hook_for()":null,"source_root()":null,"usage_path()":null},"#extract_last_module()":null,"#indent()":null,"#module_namespacing()":null,"#namespace":{"()":null,"d?()":null,"d_path()":null},"#wrap_with_namespace()":null},"benchmarkgenerator":{"":null,"#generate_layout()":null},"db":{"":null,"::system":null},"migration":{"":null,"#create_migration()":null,"#migration_template()":null,"#set_migration_assigns!()":null},"namedbase":{"":null,"#a":{"pplication_name()":null,"ttributes_names()":null},"::check_class_collision()":null,"#class_":{"name()":null,"path()":null},"#edit_helper()":null,"#fi":{"le_path()":null,"xture_file_name()":null},"#human_name()":null,"#i":{"18n_scope()":null,"ndex_helper()":null,"nside_template":{"()":null,"?()":null}},"#js_template()":null,"#mo":{"del_resource_name()":null,"untable_engine?()":null},"#n":{"amespaced_class_path()":null,"ew_helper()":null},"#plural":{"_":{"file_name()":null,"name()":null,"route_name()":null,"table_name()":null},"ize_table_names?()":null},"#r":{"e":{"direct_resource_name()":null,"gular_class_path()":null},"oute_url()":null},"#s":{"how_helper()":null,"ingular_":{"name()":null,"route_name()":null,"table_name()":null}},"#t":{"able_name()":null,"emplate()":null},"#u":{"ncountable?()":null,"rl_helper_prefix()":null}},"test":{"case":null,"ing":{"":null,"::":{"assertions":{"":null,"#assert_":{"class_method()":null,"directory()":null,"fi":{"eld_":{"default_value()":null,"type()":null},"le()":null},"instance_method()":null,"method()":null,"migration()":null,"no_":{"directory()":null,"file()":null,"migration()":null}}},"behaviour":{"":null,"::classmethods":{"":null,"#arguments()":null,"#destination()":null,"#tests()":null},"#create_generated_attribute()":null,"#generator()":null,"#prepare_destination()":null,"#run_generator()":null},"setupandteardown":null}}},"command_type()":null,"fallbacks()":null,"file_lookup_paths()":null,"help()":null,"hid":{"den_namespaces()":null,"e_namespace":{"()":null,"s()":null}},"invoke()":null,"lookup_paths()":null,"print_":{"generators()":null,"list()":null},"public_namespaces()":null,"sorted_groups()":null}},"m_version()":null},"groups()":null,"public_path()":null,"root()":null}},"nge":{"":null,"#overlaps?()":null}},"regexp":{"":null,"#multiline?()":null},"securerandom":{"":null,"::base":{"36()":null,"58()":null}},"string":{"":null,"#a":{"cts_like_string?()":null,"t()":null},"#blank?()":null,"#c":{"amel":{"case()":null,"ize()":null},"lassify()":null,"onstantize()":null},"#d":{"asherize()":null,"econstantize()":null,"emodulize()":null},"#exclude?()":null,"#f":{"irst()":null,"oreign_key()":null,"rom()":null},"#h":{"tml_safe()":null,"umanize()":null},"#i":{"n":{"_time_zone()":null,"dent":{"()":null,"!()":null},"quiry()":null},"s_utf8?()":null},"#last()":null,"#mb_chars()":null,"#p":{"arameterize()":null,"luralize()":null},"#remove":{"()":null,"!()":null},"#s":{"afe_constantize()":null,"ingularize()":null,"quish":{"()":null,"!()":null},"trip_heredoc()":null},"#t":{"ableize()":null,"itle":{"case()":null,"ize()":null},"o()":null,"o_":{"date":{"()":null,"time()":null},"time()":null},"runcate":{"()":null,"_bytes()":null,"_words()":null}},"#u":{"nderscore()":null,"pcase_first()":null}},"symbol":{"":null,"#end":{"_with?()":null,"s_with?()":null},"#start":{"_with?()":null,"s_with?()":null}},"time":{"":null,"#-()":null,"#<=>()":null,"#a":{"cts_like_time?()":null,"dvance()":null,"go()":null,"t_":{"beginning_of_":{"day()":null,"hour()":null,"minute()":null},"end_of_":{"day()":null,"hour()":null,"minute()":null},"mid":{"d":{"ay()":null,"le_of_day()":null},"night()":null},"noon()":null}},"::":{"===()":null,"at":{"()":null,"_with":{"_coercion()":null,"out_coercion()":null}},"current()":null,"days_in_":{"month()":null,"year()":null},"find_zone":{"()":null,"!()":null},"rfc3339()":null,"use_zone()":null,"zone":{"()":null,"=()":null}},"#beginning_of_":{"day()":null,"hour()":null,"minute()":null},"#c":{"eil()":null,"hange()":null,"ompare_with":{"_coercion()":null,"out_coercion()":null}},"#e":{"nd_of_":{"day()":null,"hour()":null,"minute()":null},"ql":{"?()":null,"_with":{"_coercion()":null,"out_coercion()":null}}},"#f":{"loor()":null,"ormatted_offset()":null},"#in()":null,"#mi":{"d":{"d":{"ay()":null,"le_of_day()":null},"night()":null},"nus_with":{"_coercion()":null,"out_":{"coercion()":null,"duration()":null}}},"#n":{"ext_":{"day()":null,"month()":null,"year()":null},"oon()":null},"#prev_":{"day()":null,"month()":null,"year()":null},"#s":{"ec":{"_fraction()":null,"onds_":{"since_midnight()":null,"until_end_of_day()":null}},"ince()":null},"#to_":{"default_s()":null,"formatted_s()":null,"s()":null,"time()":null}},"trueclass":{"":null,"#blank?()":null,"#to_param()":null},"uri":{"":null,"::parser()":null},"unboundmethod":{"":null,"#duplicable?()":null}}';
const words = getWordsFromTrie(JSON.parse(serialized));
const RAILS = new CompactPrefixTree(Array.from(words));

// This file generated through ./bin/gen_symbols.js,Do NOT modify it!
const { CompactPrefixTree: CompactPrefixTree$1, getWordsFromTrie: getWordsFromTrie$1, } = require('compact-prefix-tree/cjs');
const serialized$1 = '{"abbrev":{"":null,"::abbrev()":null},"ac":{"l":{"":null,"::":{"acl":{"entry":{"":null,"#dot_pat":{"()":null,"_str()":null},"#match()":null,"::new()":null},"list":{"":null,"#add()":null,"#match()":null,"::new()":null}},"new()":null}},"tion":{"":null,"filter":{"":null,"::new()":null},"map":{"":null,"::":{"build_tree()":null,"each_firstbyte_range()":null,"expand":{"()":null,"_rec()":null},"merge":{"()":null,"2()":null,"_rects()":null},"new()":null,"parse":{"()":null,"_to_rects()":null},"unambiguous_action()":null}},"::new()":null}},"add":{"er":{"":null,"::new()":null},"rinfo":{"":null,"::":{"foreach()":null,"getaddrinfo()":null,"ip()":null,"new()":null,"tcp()":null,"udp()":null,"unix()":null}}},"alias":{"2":null,"object":{"":null,"::klass_method()":null}},"ar":{"g":{"v":{"":null,"::shift()":null},"umenterror":null},"ray":{"":null,"code":{"":null,"::new()":null},"spec":{"":null,"::splat":{"":null,"#unpack_":{"3args()":null,"4args()":null}},"s":{"":null,"::":{"a":{"ssockey":{"":null,"#==()":null},"rray":{"convertable":{"":null,"::new()":null,"#to_a":{"()":null,"ry()":null}},"_with_":{"7bit_utf8_and_usascii_strings()":null,"usascii_and_":{"7bit_":{"ascii8bit_strings()":null,"utf8_strings()":null},"ascii8bit_strings()":null,"utf8_strings()":null},"utf8_and_":{"7bit_ascii8bit_strings()":null,"ascii8bit_strings()":null,"usascii_strings()":null}}}},"comparablewithfixnum":{"":null,"#<=>()":null,"::new()":null},"d":{"":null,"#<=>()":null},"mockforcompared":{"":null,"#<=>()":null,"::":{"compared?()":null,"new()":null}},"my":{"array":{"":null,"::new()":null},"range":null},"privatetoary":{"":null,"#to_ary()":null},"sexp":{"":null,"::new()":null},"sortsame":{"":null,"#<=>()":null,"#==()":null},"subarray":{"":null,"::new()":null},"toaryarray":{"":null,"#to_ary()":null},"ufosceptic":{"":null,"#<=>()":null},"empty_":{"frozen_array()":null,"recursive_array()":null},"frozen_array()":null,"head_recursive_array()":null,"recursive_array()":null,"un":{"comparable":{"":null,"#<=>()":null},"iversal_pack_object()":null}}}},"sub":{"":null,"::new()":null},"::":{"[]()":null,"new()":null,"try_convert()":null}}},"b":{"":null,"ar":{"":null,"::new()":null},"asic":{"object":{"":null,"specs":{"":null,"::":{"bosubclass":{"":null,"::kernel_defined?()":null},"ivars":{"":null,"::new()":null},"inste":{"val":{"c":{"var":null,"onst":null},"outer":{"":null,"::inner":null}},"xec":{"":null,"included":null,"::included()":null}},"singletonmethod":{"":null,"::":{"new_method_on_s":{"elf()":null,"ingleton":{"()":null,"_with_":{"alias_method()":null,"syntax_alias()":null}}},"singleton_method_":{"added()":null,"to_alias()":null}}}}},"::new()":null},"socket":{"":null,"::":{"do_not_reverse_lookup":{"()":null,"=()":null},"for_fd()":null}}},"ean":{"in":{"ofspecs":{"":null,"::":{"a":null,"b":null,"c":null}},"stanceofmatcher":{"":null,"::new()":null}},"cestorofmatcher":{"":null,"::new()":null}},"ec":{"lose":{"matcher":{"":null,"::new()":null},"tomatrixmatcher":{"":null,"::new()":null}},"omputedbymatcher":{"":null,"::new()":null}},"ekindofmatcher":{"":null,"::new()":null},"enchmark":{"":null,"driver":{"":null,"::":{"file":null,"benchmark()":null,"load()":null,"new()":null}},"::":{"tms":{"":null,"#*()":null,"#+()":null,"#-()":null,"#/()":null,"#add":{"()":null,"!()":null},"#format()":null,"#memberwise()":null,"::new()":null,"#to_":{"a()":null,"s()":null}},"benchmark()":null,"bm":{"()":null,"bm()":null},"measure()":null,"realtime()":null}},"iff":{"":null,"::new()":null},"ig":{"decimal":{"":null,"specs":{"":null,"::with_":{"limit()":null,"rounding()":null}},"::":{"_load()":null,"double_fig()":null,"json_create()":null,"limit()":null,"mode()":null,"new()":null,"save_":{"exception_mode()":null,"limit()":null,"rounding_mode()":null},"ver()":null}},"math":{"":null,"::":{"exp()":null,"log()":null}}},"inding":{"":null,"specs":{"":null,"::demo":{"":null,"#get_":{"binding":{"()":null,"_and_line()":null,"_in_block()":null},"empty_binding()":null,"file_of_binding()":null,"line_of_binding()":null},"::new()":null,"#square()":null}}},"lockspecs":{"":null,"::":{"overwriteblockvariable":{"":null,"#method_missing()":null,"::new()":null},"yield":{"":null,"er":{"":null,"#m()":null,"#r()":null,"#s()":null,"#z()":null},"#splat()":null,"#two_arg":{"_array()":null,"s()":null},"#yield_":{"splat_inside_block()":null,"this()":null}}}},"oard":{"":null,"::new()":null},"oring":{"":null,"::exception()":null},"ranch":{"":null,"::new()":null},"reak":{"specs":{"":null,"::":{"block":{"":null,"#break_":{"in_":{"block_in_while()":null,"method":{"()":null,"_captured()":null},"nested_method()":null,"yield":{"_captured()":null,"ing_method()":null}},"nil()":null,"value()":null},"#c":{"a":{"ll_method()":null,"pture_block()":null},"reate_block()":null},"#invoke_yield_in_while()":null,"#looped_":{"break_in_captured_block()":null,"delegate_block()":null},"#method()":null,"#yield":{"_value()":null,"ing()":null}},"driver":{"":null,"::new()":null,"#note()":null},"lambda":{"":null,"#break_in_":{"block_in_method()":null,"defining_scope()":null,"method":{"()":null,"_yield()":null},"nested_scope":{"()":null,"_block()":null,"_yield()":null}},"#create_lambda()":null,"#invoke_":{"lambda":{"()":null,"_block()":null},"yield()":null},"#note_invoke_yield()":null}}},"test":{"":null,"::":{"invoking_method":{"()":null,"2()":null},"meth_with_":{"block_call()":null,"yield()":null}}}},"ug":{"":null,"::":{"bignum":null,"class":null,"debug":{"":null,"::dataerror":null},"exception":null,"file":{"":null,"::stat":{"":null,"::for_":{"fd()":null,"path()":null}}},"float":null,"hash":null,"integer":{"":null,"::":{"breakable":{"":null,"::iter_break":{"()":null,"_value()":null}},"myinteger":{"":null,"::new()":null}}},"iter":{"":null,"::yield":{"":null,"#yield_block()":null}},"method":null,"proc":null,"regexp":null,"scanargs":{"":null,"::":{"hash()":null,"lead":{"()":null,"_hash()":null,"_opt":{"()":null,"_hash()":null,"_trail":{"()":null,"_hash()":null},"_var":{"()":null,"_hash()":null,"_trail":{"()":null,"_hash()":null}}},"_var":{"()":null,"_hash()":null,"_trail":{"()":null,"_hash()":null}}},"opt":{"()":null,"_hash()":null,"_trail":{"()":null,"_hash()":null},"_var":{"()":null,"_hash()":null,"_trail":{"()":null,"_hash()":null}}},"var":{"()":null,"_hash()":null,"_trail":{"()":null,"_hash()":null}}}},"symbol":{"":null,"::":{"find()":null,"pinneddown?()":null}},"time":null,"typeddata":{"":null,"::":{"check()":null,"make()":null}},"vm":{"":null,"::register_at_exit()":null},"win32":null,"funcall":{"()":null,"_callback()":null},"load_protect()":null,"postponed_job_":{"call_direct()":null,"register":{"()":null,"_one()":null}},"st":{"r":{"ing":null,"uct":null},"art()":null},"tracepoint_":{"specify_normal_and_internal_events()":null,"track_objspace_events()":null},"unp_st_foreach":{"()":null,"_check()":null}},"guard":{"":null,"::new()":null}}},"c":{"2":null,"":null,"api":{"classspecs":{"":null,"::":{"a":{"":null,"::":{"b":null,"d":null},"lloc":{"":null,"::new()":null},"ttr":{"":null,"::new()":null}},"cvars":{"":null,"#new_cv":{"()":null,"ar()":null},"#rbdcv_cvar()":null},"inherited":{"":null,"::inherited()":null},"m":{"":null,"#included?()":null},"newclass":{"":null,"::inherited()":null},"su":{"b":{"":null,"m":null,"sub":{"":null,"#call_super_method()":null},"#call_super_method()":null},"per":{"":null,"#call_super_method()":null}}}},"encodingspecs":{"":null,"::s":null},"modulespecs":{"":null,"::":{"a":null,"b":null,"c":null,"m":null,"rubyunderautoload":null,"super":null}},"objectspecs":{"":null,"::":{"alloc":{"":null,"::new()":null},"extend":{"":null,"#reach()":null},"subarray":{"":null,"#to_array()":null}}}},"c":null,"gi":{"":null,"::":{"cookie":{"":null,"#httponly=()":null,"#inspect()":null,"::":{"new()":null,"parse()":null},"#secure=()":null,"#to_s()":null,"#value":{"()":null,"=()":null}},"escape":{"":null,"#escape":{"()":null,"html()":null},"#unescape":{"()":null,"html()":null}},"html":{"3":null,"4":{"":null,"fr":null,"tr":null},"5":null,"extension":{"":null,"#a()":null,"#b":{"ase()":null,"lockquote()":null},"#c":{"aption()":null,"heckbox":{"()":null,"_group()":null}},"#f":{"ile_field()":null,"orm()":null},"#h":{"idden()":null,"tml()":null},"#im":{"age_button()":null,"g()":null},"#multipart_form()":null,"#p":{"assword_field()":null,"opup_menu()":null},"#r":{"adio_":{"button()":null,"group()":null},"eset()":null},"#s":{"crolling_list()":null,"ubmit()":null},"#text":{"_field()":null,"area()":null}}},"invalidencoding":null,"queryextension":{"":null,"#[]()":null,"#has_key?()":null,"#in":{"clude?()":null,"itialize_query()":null},"#key":{"?()":null,"s()":null},"#multipart?()":null,"#params=()":null,"#r":{"aw_cookie":{"()":null,"2()":null},"ead_":{"from_cmdline()":null,"multipart()":null}}},"session":{"":null,"::":{"filestore":{"":null,"#close()":null,"#delete()":null,"::new()":null,"#restore()":null,"#update()":null},"memorystore":{"":null,"#close()":null,"#delete()":null,"::new()":null,"#restore()":null,"#update()":null},"nullstore":{"":null,"#close()":null,"#delete()":null,"::new()":null,"#restore()":null,"#update()":null},"pstore":{"":null,"#close()":null,"#delete()":null,"::new()":null,"#restore()":null,"#update()":null},"new()":null},"#[]":{"()":null,"=()":null},"#c":{"lose()":null,"reate_new_id()":null},"#delete()":null,"#update()":null},"util":{"":null,"#escape":{"()":null,"element()":null,"html()":null,"_element()":null,"_html()":null},"#h()":null,"#pretty()":null,"#rfc1123_date()":null,"#unescape":{"()":null,"element()":null,"html()":null,"_element()":null,"_html()":null}},"accept_charset":{"()":null,"=()":null},"new()":null,"parse()":null},"specs":{"":null,"::":{"cgi_new()":null,"split()":null}}},"math":{"":null,"::":{"a":{"cos":{"()":null,"h()":null},"sin":{"()":null,"h()":null},"tan":{"()":null,"2()":null,"h()":null}},"cbrt()":null,"cos":{"()":null,"h()":null},"exp()":null,"log":{"()":null,"10()":null,"2()":null},"sin":{"()":null,"h()":null},"sqrt()":null,"tan":{"()":null,"h()":null}}},"sv":{"":null,"::":{"malformedcsverror":null,"row":{"":null,"#<<()":null,"#==()":null,"#[]":{"()":null,"=()":null},"#delete":{"()":null,"_if()":null},"#each()":null,"#f":{"etch()":null,"ield":{"()":null,"?()":null,"_row?()":null,"s()":null}},"#h":{"as_key?()":null,"eader":{"?()":null,"_row?()":null,"s()":null}},"#in":{"clude?()":null,"dex()":null,"spect()":null},"#key?()":null,"#member?()":null,"::new()":null,"#push()":null,"#to_":{"csv()":null,"hash()":null,"s()":null},"#values_at()":null},"table":{"":null,"#<<()":null,"#==()":null,"#[]":{"()":null,"=()":null},"#by_":{"col":{"()":null,"!()":null,"_or_row":{"()":null,"!()":null}},"row":{"()":null,"!()":null}},"#delete":{"()":null,"_if()":null},"#each()":null,"#headers()":null,"#inspect()":null,"::new()":null,"#push()":null,"()":null,"#to_":{"a()":null,"csv()":null,"s()":null},"#values_at()":null},"filter()":null,"foreach()":null,"generate":{"()":null,"_line()":null},"instance()":null,"new()":null,"open()":null,"parse":{"()":null,"_line()":null},"read":{"()":null,"lines()":null}}},"al":{"":null,"::new()":null},"ase":{"folding":{"":null,"::":{"util":{"":null,"#hex_seq()":null,"#print_table":{"()":null,"_1()":null}},"load()":null}},"mapping":{"":null,"::":{"load()":null,"new()":null}}},"atchspecs":{"":null,"::":{"catching_method()":null,"throwing_method()":null}},"ertstore":{"":null,"::new()":null},"ha":{"shdir":{"":null,"::new()":null},"inednexttest":{"":null,"::":{"enclosing_method()":null,"invoking_method()":null,"meth_with_yield()":null}},"nnel":null,"tclient":{"":null,"::new()":null},"tentry":{"":null,"::new()":null},"tserver":{"":null,"::new()":null}},"hecksum":{"":null,"::":{"new()":null,"update()":null}},"hild":null,"lass":{"":null,"container":{"":null,"::":{"classcontainer":{"":null,"::privateclass":null},"private":{"class":null,"module":null}}},"specs":{"":null,"::":{"a":null,"b":null,"c":{"":null,"ontainer":{"":null,"::":{"a":null,"b":null}},"::make_class_":{"instance_variable()":null,"variable()":null}},"d":{"":null,"#make_class_variable()":null},"e":{"":null,"mpty":null,"#meth()":null,"::":{"cmeth()":null,"smeth()":null}},"f":{"":null,"#another()":null,"#meth()":null},"g":{"":null,"#override()":null},"h":{"":null,"::":{"inherited()":null,"track_inherited()":null}},"i":{"":null,"::j":null},"k":{"":null,"::example_class_method()":null,"#example_instance_method()":null},"l":{"":null,"::m()":null},"m":{"":null,"etaclasssuper":null},"nosuperclassset":null,"number":{"":null,"::myclass":null},"o":{"":null,"::smeth()":null},"plus":null,"singleton":null,"superclass":{"evaluatedfirst":null,"notgiven":null,"re":{"opened":{"basicobject":null,"object":null},"settosubclass":null}},"twenty":null,"sclass_with_":{"block()":null,"return()":null},"string_":{"class_variables()":null,"instance_variables()":null}},"number":{"":null,"::myclass":null}},"variablesspec":{"":null,"::":{"class":{"a":{"":null,"#cvar_a":{"()":null,"=()":null}},"b":null,"c":{"":null,"::cvar_":{"c=()":null,"defined?()":null}}},"module":{"m":{"":null,"#cvar_m":{"()":null,"=()":null}},"n":{"":null,"#cvar_n":{"()":null,"=()":null}},"o":null}}},"::new()":null},"lock":{"":null,"::new()":null},"od":{"eloadingspecs":{"":null,"::":{"method":{"":null,"#load()":null,"#require()":null},"spec_":{"cleanup()":null,"setup()":null}}},"ingu":{"s_ascii":{"":null,"::":{"encoding()":null,"string_literal()":null}},"tf_8":{"":null,"::":{"encoding()":null,"string_literal()":null}}}},"olorize":{"":null,"::new()":null},"om":{"mentstripper":{"":null,"::strip()":null},"parable":{"":null,"specs":{"":null,"::":{"comparecallingsuper":{"":null,"#<=>()":null,"::new()":null},"weird":null,"witho":{"nlycomparedefined":{"":null,"#<=>()":null,"::new()":null},"utcomparedefined":null}}}},"pl":{"ainmatcher":{"":null,"::new()":null},"ex":{"":null,"::":{"compatible":null,"json_create()":null,"polar()":null,"rect":{"()":null,"angular()":null}}}}},"on":{"fig":{"":null,"::[]()":null},"ditionvariable":{"":null,"::new()":null},"stant":{"specs":{"":null,"::":{"c":{"s_singleton1":{"":null,"::foo()":null},"hilda":{"":null,"#const1":{"0()":null,"1()":null,"2()":null,"3()":null,"5()":null},"::const":{"1":{"0()":null,"1()":null,"2()":null,"3()":null,"5()":null,"9()":null},"21()":null,"23()":null}},"lass":{"a":{"":null,"::const":{"1":{"0()":null,"6()":null},"22()":null,"_missing()":null,"x()":null},"#const":{"10()":null,"x()":null}},"b":{"":null,"#const201()":null,"::const2":{"0":{"1()":null,"9()":null},"10()":null}},"c":{"":null,"::classe":null},"d":null},"ontainer":{"a":{"":null,"::const10()":null,"#const10()":null},"b":{"":null,"::c":{"hildb":{"":null,"::const2":{"0":{"1()":null,"2()":null,"3()":null,"4()":null,"5()":null,"6()":null},"12()":null,"13()":null,"14()":null},"#const2":{"0":{"1()":null,"2()":null,"3()":null,"4()":null,"5()":null},"13()":null}},"onst201()":null}}}},"module":{"a":null,"b":null,"c":null,"d":null,"e":null,"f":null,"g":null,"h":null,"m":null},"parent":{"a":{"":null,"::const":{"1":{"0()":null,"6()":null},"22()":null,"x()":null},"#const":{"10()":null,"x()":null}},"b":{"":null,"#const201()":null,"::const2":{"0":{"1()":null,"9()":null},"10()":null}}},"specadded1":null,"obj":{"":null,"::x":null},"get_const()":null}},"visibility":{"":null,"::":{"modulecontainer":{"":null,"::private":{"class":null,"module":null}},"privconst":{"class":{"":null,"child":{"":null,"#defined_from_subclass()":null,"#private_constant_from_subclass()":null},"::":{"nested":{"":null,"::":{"defined_from_scope()":null,"private_constant_from_scope()":null}},"defined_from_self()":null,"private_constant_from_self()":null}},"module":{"":null,"child":{"":null,"#defined_from_include()":null,"#private_constant_from_include()":null},"::":{"nested":{"":null,"::":{"defined_from_scope()":null,"private_constant_from_scope()":null}},"defined_from_self()":null,"private_constant_from_self()":null}}},"reset_private_constants()":null}}},"textstate":{"":null,"::new()":null}},"oreclassspecs":{"":null,"::":{"a":{"":null,"::inherited()":null},"f":null,"h":{"":null,"::inherited()":null},"inherited":{"":null,"::":{"a":{"":null,"::inherited()":null},"b":null,"c":null,"d":{"":null,"::inherited()":null}}},"m":{"":null,"#inherited()":null},"record":null}},"overage":{"":null,"specs":{"":null,"::filtered_result()":null},"::":{"peek_result()":null,"result()":null,"running?()":null,"start()":null}},"rlstore":{"":null,"::new()":null},"ustomargumenterror":{"":null,"::new()":null},"::new()":null},"dbm":{"":null,"::":{"new()":null,"open()":null}},"dqentry":{"":null,"::new()":null},"drb":{"":null,"::":{"drb":{"array":{"":null,"::new()":null},"bad":{"scheme":null,"uri":null},"conn":{"":null,"error":null},"error":null,"idconv":{"":null,"#to_":{"id()":null,"obj()":null}},"message":null,"ob":{"ject":{"":null,"#_":{"_drb":{"ref()":null,"uri()":null},"dump()":null},"#method_missing()":null,"::":{"_load()":null,"new":{"()":null,"_with":{"()":null,"_uri()":null}}},"#respond_to?()":null},"servable":{"":null,"#notify_observers()":null}},"protocol":{"":null,"#add_protocol()":null,"::":{"add_protocol()":null,"open":{"()":null,"_server()":null},"uri_option()":null},"#open":{"()":null,"_server()":null},"#uri_option()":null},"remoteerror":{"":null,"::new()":null},"sslsocket":{"":null,"::":{"sslconfig":{"":null,"#[]()":null,"#accept()":null,"#connect()":null,"::new()":null,"#setup_":{"certificate()":null,"ssl_context()":null}},"new()":null,"open":{"()":null,"_server()":null}}},"server":{"":null,"notfound":null,"#a":{"live?()":null,"ny_to_s()":null},"#check_insecure_method()":null,"::":{"invokemethod18mixin":null,"default_":{"a":{"cl()":null,"rgc_limit()":null},"id_conv()":null,"load_limit()":null,"safe_level()":null},"new()":null,"verbose":{"()":null,"=()":null}},"#error_print()":null,"#here?()":null,"#insecure_method?()":null,"#main_loop()":null,"#run()":null,"#s":{"hutdown()":null,"top_service()":null},"#to_":{"id()":null,"obj()":null},"#verbose":{"()":null,"=()":null}},"tcpsocket":null,"un":{"ixsocket":null,"dumped":null,"known":{"":null,"error":{"":null,"::new()":null},"#exception()":null,"::new()":null,"#reload()":null}}},"extserv":{"":null,"manager":{"":null,"#invoke_":{"service":{"()":null,"_command()":null},"thread()":null},"::":{"command":{"()":null,"=()":null},"new()":null},"#regist()":null,"#service()":null,"#unregist()":null},"#alive?()":null,"#front()":null,"::new()":null,"#stop_service()":null},"gw":{"":null,"idconv":null,"#[]":{"()":null,"=()":null},"::new()":null},"http0":{"":null,"::":{"c":{"allback":{"":null,"#close()":null,"#do_post()":null,"::new()":null,"#re":{"ply()":null,"q_body()":null}},"lientside":{"":null,"#alive?()":null,"#close()":null,"::new()":null,"#post()":null,"#recv_reply()":null,"#send_request()":null}},"server":{"":null,"side":{"":null,"#alive?()":null,"#close()":null,"::new()":null,"#recv_request()":null,"#send_reply()":null},"#accept()":null,"#close()":null,"::new()":null,"#push()":null,"#setup_webrick()":null},"strstream":{"":null,"::new()":null,"#read()":null,"#write()":null},"open":{"()":null,"_server()":null},"uri_option()":null}},"timeridconv":{"":null,"::":{"timerholder2":{"":null,"::invalidindexerror":null},"new()":null}},"config()":null,"current_server()":null,"fetch_server()":null,"front()":null,"here?()":null,"install_":{"acl()":null,"id_conv()":null},"re":{"gist_server()":null,"move_server()":null},"st":{"art_service()":null,"op_service()":null},"thread()":null,"to_":{"id()":null,"obj()":null},"uri()":null},"ex":{"2":{"":null,"::new()":null},"3":{"":null,"::new()":null},"4":{"":null,"::new()":null},"":null,"::new()":null},"namedidconv":{"":null,"::new()":null}},"dat":{"a":null,"e":{"":null,"time":{"":null,"::":{"_strptime()":null,"civil()":null,"commercial()":null,"httpdate()":null,"iso8601()":null,"jd()":null,"jisx0301()":null,"json_create()":null,"new()":null,"now()":null,"ordinal()":null,"parse()":null,"rfc":{"2822()":null,"3339()":null,"822()":null},"strptime()":null,"xmlschema()":null}},"::":{"_":{"httpdate()":null,"iso8601()":null,"jisx0301()":null,"parse()":null,"rfc":{"2822()":null,"3339()":null,"822()":null},"strptime()":null,"xmlschema()":null},"civil()":null,"commercial()":null,"gregorian_leap?()":null,"httpdate()":null,"iso8601()":null,"jd()":null,"jisx0301()":null,"json_create()":null,"julian_leap?()":null,"leap?()":null,"new()":null,"ordinal()":null,"parse()":null,"rfc":{"2822()":null,"3339()":null,"822()":null},"strptime()":null,"today()":null,"valid_":{"c":{"ivil?()":null,"ommercial?()":null},"date?()":null,"jd?()":null,"ordinal?()":null},"xmlschema()":null}}},"de":{"bugger__":{"":null,"::":{"break_points()":null,"context()":null,"debug_thread_info()":null,"display()":null,"get_thread()":null,"interrupt()":null,"make_thread_list()":null,"resume()":null,"set_":{"last_thread()":null,"trace()":null},"stdout":{"()":null,"=()":null},"suspend()":null,"thread_list":{"()":null,"_all()":null},"waiting()":null}},"fspec":{"":null,"nested":{"":null,"b":{"":null,"::eval_class_method()":null},"::":{"a_":{"class_method()":null,"singleton_method()":null},"create_class_method()":null}},"singleton":{"":null,"::a_class_method()":null},"::foo()":null},"fin":{"itializespec":{"":null,"::new()":null},"edspecs":{"":null,"::":{"basic":{"":null,"#a_defined_method()":null,"#class_variable_":{"defined()":null,"undefined()":null},"#defined_method()":null,"#global_variable_":{"defined()":null,"read()":null,"undefined()":null},"#instance_variable_":{"defined":{"()":null,"_nil()":null},"read()":null,"undefined()":null},"#local_variable_defined":{"()":null,"_nil()":null},"#no_yield_block":{"()":null,"_parameter()":null},"#pr":{"ivate_":{"method":{"()":null,"_defined()":null},"predicate":{"?()":null,"_defined()":null}},"otected_method()":null},"#yield_":{"block":{"()":null,"_parameter()":null},"defined_":{"method()":null,"parameter_method()":null}}},"child":{"":null,"#defined_super()":null,"::":{"module_":{"constant_defined()":null,"defined()":null},"parent_constant_defined()":null}},"class":{"undefiningmethod":null,"with":{"method":{"":null,"#test()":null},"outmethod":{"":null,"#test()":null}}},"intermediatemodule":{"1":{"":null,"#method_no_args()":null},"2":{"":null,"#method_no_args()":null}},"mixin":{"":null,"#defined_super()":null},"parent":{"":null,"#defined_super()":null},"super":{"":null,"withintermediatemodules":{"":null,"#method_no_args()":null},"class":{"":null,"#define_method_":{"args()":null,"block_":{"args()":null,"no_args()":null},"no_args()":null},"#method_":{"args()":null,"block_":{"args()":null,"no_args()":null},"no_args()":null},"#yield_method()":null},"#method_":{"args()":null,"block_":{"args()":null,"no_args()":null},"no_args()":null},"#no_super_method_":{"args()":null,"block_":{"args()":null,"no_args()":null},"no_args()":null}},"defined_method()":null,"exception_method()":null,"fixnum_method()":null,"side_effects()":null}}},"legat":{"especs":{"":null,"::":{"delegat":{"eclass":null,"or":{"":null,"#__setobj__()":null}},"extra":{"":null,"#extra":{"()":null,"_pr":{"ivate()":null,"otected()":null}}},"simple":{"":null,"#method_missing()":null,"#p":{"r":{"iv()":null,"ot()":null},"ub()":null},"#respond_to_missing?()":null}}},"or":{"":null,"::new()":null}},"moapplication":{"":null,"::new()":null}},"dhasen":{"":null,"::new()":null},"di":{"gest":{"":null,"::":{"base":{"":null,"#<<()":null,"#block_length()":null,"#digest_length()":null,"#reset()":null,"#update()":null},"class":{"":null,"::":{"b":{"ase64digest()":null,"ubblebabble()":null},"digest()":null,"file()":null,"hexdigest()":null}},"instance":{"":null,"#<<()":null,"#==()":null,"#b":{"ase64digest":{"()":null,"!()":null},"lock_length()":null,"ubblebabble()":null},"#digest":{"()":null,"!()":null,"_length()":null},"#fi":{"le()":null,"nish()":null},"#hexdigest":{"()":null,"!()":null},"#inspect()":null,"#length()":null,"#new()":null,"#reset()":null,"#size()":null,"#to_s()":null,"#update()":null},"md5":null,"rmd160":null,"sha":{"1":null,"2":{"":null,"#<<()":null,"#block_length()":null,"#digest_length()":null,"::new()":null,"#reset()":null,"#update()":null}},"bubblebabble()":null,"hexencode()":null}},"r":{"":null,"specs":{"":null,"::":{"c":{"lear_dirs()":null,"reate_mock_dirs()":null},"delete_mock_dirs()":null,"expected_paths()":null,"mock_":{"dir":{"()":null,"_files()":null},"rmdir()":null},"nonexistent()":null,"rmdir_dirs()":null}},"::":{"[]()":null,"ch":{"dir()":null,"ildren()":null,"root()":null},"delete()":null,"each_child()":null,"empty?()":null,"entries()":null,"exist":{"?()":null,"s?()":null},"foreach()":null,"getwd()":null,"glob()":null,"home()":null,"mk":{"dir()":null,"tmpdir()":null},"new()":null,"open()":null,"pwd()":null,"rmdir()":null,"tmpdir()":null,"unlink()":null}},"vmodspecs":{"":null,"::check_both_":{"bigdecimal()":null,"nan()":null}}},"do":{"g":{"":null,"::new()":null},"ttedformatter":{"":null,"::new()":null},"wnloader":{"":null,"::":{"g":{"nu":{"":null,"::download()":null},"ems":null},"rubygems":{"":null,"::download()":null},"cache_file()":null,"download()":null,"http":{"_options()":null,"s()":null,"s=()":null,"s?()":null},"link_cache()":null,"mode_for()":null,"save_cache()":null,"un":{"icode":{"":null,"::download()":null},"der()":null}}}},"eoferror":null,"emojitable":{"":null,"::new()":null},"en":{"v":{"":null,"::":{"[]":{"()":null,"=()":null},"assoc()":null,"clear()":null,"delete":{"()":null,"_if()":null},"each":{"()":null,"_key()":null,"_pair()":null,"_value()":null},"empty?()":null,"fetch()":null,"has_":{"key?()":null,"value?()":null},"in":{"clude?()":null,"dex()":null,"spect()":null,"vert()":null},"ke":{"ep_if()":null,"y()":null,"y?()":null,"ys()":null},"length()":null,"member?()":null,"rassoc()":null,"re":{"hash()":null,"ject":{"()":null,"!()":null},"place()":null},"select":{"()":null,"!()":null},"shift()":null,"size()":null,"store()":null,"to_":{"a()":null,"h()":null,"hash()":null,"s()":null},"update()":null,"value":{"?()":null,"s()":null,"s_at()":null}}},"coding":{"":null,"::":{"co":{"nverter":{"":null,"notfounderror":null,"#==()":null,"#conv":{"ert()":null,"path()":null},"#destination_encoding()":null,"#finish()":null,"#ins":{"ert_output()":null,"pect()":null},"#last_error()":null,"::":{"asciicompat_encoding()":null,"new()":null,"search_convpath()":null},"#p":{"rimitive_":{"convert()":null,"errinfo()":null},"utback()":null},"#replacement":{"()":null,"=()":null},"#source_encoding()":null},"mpatib":{"ilityerror":null,"le?()":null}},"invalidbytesequenceerror":{"":null,"#destination_encoding":{"()":null,"_name()":null},"#error_bytes()":null,"#incomplete_input?()":null,"#readagain_bytes()":null,"#source_encoding":{"()":null,"_name()":null}},"undefinedconversionerror":{"":null,"#destination_encoding":{"()":null,"_name()":null},"#error_char()":null,"#source_encoding":{"()":null,"_name()":null}},"aliases()":null,"default_":{"external":{"()":null,"=()":null},"internal":{"()":null,"=()":null}},"find()":null,"list()":null,"locale_charmap()":null,"name_list()":null},"specs":{"":null,"::":{"invalidbytesequenceerror":{"":null,"indirect":{"":null,"::exception()":null},"::exception()":null},"undefinedconversionerror":{"":null,"indirect":{"":null,"::exception()":null},"::exception()":null}}}},"surespec":{"":null,"::":{"container":{"":null,"#explicit_return_in_method_with_ensure()":null,"#implicit_return_in_method_with_ensure()":null,"::new()":null,"#raise_":{"and_rescue_in_method_with_ensure()":null,"in_method_with_ensure()":null},"#throw_in_method_with_ensure()":null},"error":null,"test":{"":null,"#call_block()":null,"#do_test()":null,"::new()":null}}},"um":{"specs":{"":null,"::numerous":{"":null,"#each()":null,"::new()":null}},"era":{"ble":{"":null,"specs":{"":null,"::":{"arrayconvertable":{"":null,"::new()":null,"#to_a":{"()":null,"ry()":null}},"compar":{"ablewithfixnum":{"":null,"#<=>()":null,"::new()":null},"esbyvowelcount":{"":null,"#<=>()":null,"::":{"new()":null,"wrap()":null}}},"each":{"counter":{"":null,"#each()":null,"::new()":null},"definer":{"":null,"#each()":null,"::new()":null}},"empty":{"":null,"withsize":{"":null,"#each()":null,"#size()":null},"#each()":null},"enumconvertable":{"":null,"::new()":null,"#respond_to_missing?()":null,"#to_enum()":null},"equals":{"":null,"#==()":null,"::new()":null},"freezy":{"":null,"#each()":null,"#to_a()":null},"invalidcomparable":{"":null,"#<=>()":null},"mapreturnsenumerable":{"":null,"::enumerablemapping":{"":null,"#each()":null,"::new()":null},"#each()":null,"#map()":null},"noeach":null,"numerous":{"":null,"withsize":{"":null,"#size()":null},"#each()":null,"::new()":null},"pattern":{"":null,"#===()":null,"::new()":null},"reversecomparable":{"":null,"#<=>()":null,"::new()":null},"sortbydummy":{"":null,"::new()":null,"#s()":null},"throwingeach":{"":null,"#each()":null},"un":{"comparable":{"":null,"#<=>()":null},"dupable":{"":null,"#clone()":null,"#dup()":null,"#initialize_dup()":null,"::new()":null}},"yieldsm":{"ixed":{"2":{"":null,"#each()":null,"::":{"first_yields()":null,"gathered_yields":{"()":null,"_with_args()":null},"greedy_yields()":null}},"":null,"#each()":null},"ulti":{"":null,"with":{"false":{"":null,"#each()":null},"singletrue":{"":null,"#each()":null}},"#each()":null}}}}},"tor":{"":null,"::":{"generator":null,"lazy":{"":null,"#c":{"hunk":{"()":null,"_while()":null},"ollect":{"()":null,"_concat()":null}},"#drop":{"()":null,"_while()":null},"#enum_for()":null,"#f":{"ind_all()":null,"lat_map()":null},"#grep":{"()":null,"_v()":null},"#lazy()":null,"#map()":null,"::new()":null,"#reject()":null,"#s":{"elect()":null,"lice_":{"after()":null,"before()":null,"when()":null}},"#t":{"ake":{"()":null,"_while()":null},"o_enum()":null},"#uniq()":null,"#zip()":null},"yielder":null,"new()":null},"lazyspecs":{"":null,"::":{"eventsmixed":{"":null,"#each()":null},"specificerror":null,"yieldsmixed":{"":null,"#each()":null,"::":{"gathered_":{"non_array_yields()":null,"yields":{"()":null,"_with_args()":null}},"initial_yields()":null}}}},"specs":{"":null,"::feed":{"":null,"#each()":null}}}}}},"eq":{"lmatcher":{"":null,"::new()":null},"ual":{"elementmatcher":{"":null,"::new()":null},"matcher":{"":null,"::new()":null}}},"er":{"b":{"":null,"::":{"defmethod":{"":null,"#def_erb_method()":null,"::def_erb_method()":null},"util":{"":null,"#h":{"()":null,"tml_escape()":null},"::":{"h":{"()":null,"tml_escape()":null},"u()":null,"url_encode()":null},"#u":{"()":null,"rl_encode()":null}},"new()":null,"version()":null}},"rno":{"":null,"::e":{"conn":{"aborted":null,"reset":null},"proto":null}}},"etc":{"":null,"::":{"confstr()":null,"end":{"grent()":null,"pwent()":null},"get":{"gr":{"ent()":null,"gid()":null,"nam()":null},"login()":null,"pw":{"ent()":null,"nam()":null,"uid()":null}},"group()":null,"nprocessors()":null,"passwd()":null,"set":{"grent()":null,"pwent()":null},"sys":{"conf":{"()":null,"dir()":null},"tmpdir()":null},"uname()":null}},"evalspecs":{"":null,"::":{"a":{"":null,"#c()":null},"coercedobject":{"":null,"#hash()":null,"#to_str()":null},"call_eval()":null}},"ex":{"amplestate":{"":null,"::new()":null},"ception":{"":null,"2messagemapper":{"":null,"::e2mm":{"":null,"::e2mm_message()":null}},"specs":{"":null,"::":{"backtrace":{"":null,"::backtrace()":null},"constructorexception":{"":null,"::new()":null},"emptytos":{"":null,"#to_s()":null},"exceptional":null,"overridetos":{"":null,"#to_s()":null},"unexceptional":{"":null,"#backtrace()":null,"#message()":null}}},"state":{"":null,"::new()":null},"::":{"exception()":null,"json_create()":null,"new()":null,"to_tty?()":null}},"ports":{"":null,"::":{"cygwin":{"":null,"#e":{"ach_":{"export()":null,"line()":null},"xports()":null},"::nm()":null},"mingw":{"":null,"#each_export()":null},"mswin":{"":null,"#each_":{"export()":null,"line()":null}},"create()":null,"extract()":null,"inherited()":null,"new()":null,"output()":null}},"tarray":{"":null,"::new()":null},"tlibs":{"":null,"::run()":null}},"featureguard":{"":null,"::enabled?()":null},"fi":{"ber":{"":null,"::":{"current()":null,"yield()":null}},"ddle":{"":null,"::":{"basictypes":null,"cparser":{"":null,"#compact()":null,"#parse_":{"ctype()":null,"signature()":null,"struct_signature()":null},"#split_arguments()":null},"cstruct":{"":null,"builder":{"":null,"#create()":null,"::create()":null},"entity":{"":null,"#[]":{"()":null,"=()":null},"#assign_names()":null,"::":{"malloc()":null,"new()":null,"size()":null},"#set_ctypes()":null},"::entity_class()":null},"cunion":{"":null,"entity":{"":null,"#set_ctypes()":null,"::":{"malloc()":null,"size()":null}},"::entity_class()":null},"closure":{"":null,"::":{"blockcaller":{"":null,"#call()":null,"::new()":null},"new()":null},"#to_i()":null},"compositehandler":{"":null,"#[]()":null,"#handlers()":null,"::new()":null,"#sym()":null},"function":{"":null,"#call()":null,"::new()":null,"#to_i()":null},"handle":{"":null,"#[]()":null,"#close":{"()":null,"_enabled?()":null},"#disable_close()":null,"#enable_close()":null,"::":{"[]()":null,"new()":null,"sym()":null},"#sym()":null,"#to_i()":null},"importer":{"":null,"#[]()":null,"#bind":{"()":null,"_function()":null},"#create_value()":null,"#dlload()":null,"#extern()":null,"#handler()":null,"#import_":{"function()":null,"symbol()":null,"value()":null},"#parse_bind_options()":null,"#s":{"izeof()":null,"truct()":null},"#typealias()":null,"#union()":null,"#value()":null},"pointer":{"":null,"#+":{"()":null,"@()":null},"#-":{"()":null,"@()":null},"#<=>()":null,"#==()":null,"#[]":{"()":null,"=()":null},"#eql?()":null,"#free":{"()":null,"=()":null},"#inspect()":null,"::":{"[]()":null,"malloc()":null,"new()":null,"to_ptr()":null},"#null?()":null,"#ptr()":null,"#ref()":null,"#size":{"()":null,"=()":null},"#to_":{"i":{"()":null,"nt()":null},"s()":null,"str()":null,"value()":null}},"dl":{"error":null,"open()":null,"unwrap()":null,"wrap()":null},"free()":null,"last_error":{"()":null,"=()":null},"malloc()":null,"realloc()":null,"win32":{"types":null,"_last_error":{"()":null,"=()":null}}}},"le":{"":null,"::":{"absolute_path()":null,"atime()":null,"basename()":null,"birthtime()":null,"blockdev?()":null,"ch":{"ardev?()":null,"mod()":null,"own()":null},"ctime()":null,"delete()":null,"dir":{"ectory?()":null,"name()":null},"empty?()":null,"ex":{"ecutable":{"?()":null,"_real?()":null},"ist":{"?()":null,"s?()":null},"pand_path()":null,"tname()":null},"file":{"::constants":null,"?()":null},"fnmatch":{"()":null,"?()":null},"ftype()":null,"grpowned?()":null,"identical?()":null,"join()":null,"lch":{"mod()":null,"own()":null},"link()":null,"lstat()":null,"lutime()":null,"mkfifo()":null,"mtime()":null,"new()":null,"open()":null,"orig_directory?()":null,"owned?()":null,"path()":null,"pipe?()":null,"re":{"a":{"d":{"able":{"?()":null,"_real?()":null},"link()":null},"ldirpath()":null,"lpath()":null},"name()":null},"set":{"gid?()":null,"uid?()":null},"size":{"()":null,"?()":null},"socket?()":null,"split()":null,"st":{"at":{"":null,"#<=>()":null,"#atime()":null,"#b":{"irthtime()":null,"lksize()":null,"lock":{"dev?()":null,"s()":null}},"#c":{"hardev?()":null,"time()":null},"#d":{"ev":{"()":null,"_m":{"ajor()":null,"inor()":null}},"irectory?()":null},"#executable":{"?()":null,"_real?()":null},"#f":{"ile?()":null,"type()":null},"#g":{"id()":null,"rpowned?()":null},"#in":{"o()":null,"spect()":null},"#m":{"ode()":null,"time()":null},"::new()":null,"#nlink()":null,"#owned?()":null,"#pipe?()":null,"#r":{"dev":{"()":null,"_m":{"ajor()":null,"inor()":null}},"eadable":{"?()":null,"_real?()":null}},"#s":{"et":{"gid?()":null,"uid?()":null},"ize":{"()":null,"?()":null},"ocket?()":null,"ticky?()":null,"ymlink?()":null},"()":null,"#uid()":null,"#w":{"orld_":{"readable?()":null,"writable?()":null},"ritable":{"?()":null,"_real?()":null}},"#zero?()":null},"icky?()":null},"symlink":{"()":null,"?()":null},"truncate()":null,"umask()":null,"unlink()":null,"utime()":null,"world_":{"readable?()":null,"writable?()":null},"writable":{"?()":null,"_real?()":null},"zero?()":null},"formatter":null,"specs":{"":null,"::":{"substring":null,"block_device()":null,"character_device()":null,"configure_types()":null,"directory()":null,"fifo()":null,"make_closer()":null,"normal_file()":null,"socket()":null,"symlink()":null}},"stat":{"":null,"::method_missing()":null},"utils":{"":null,"::":{"dryrun":null,"lowmethods":{"":null,"#_do_nothing()":null,"#name()":null},"nowrite":null,"streamutils_":{"":null,"#fu_":{"blksize()":null,"default_blksize()":null,"stream_blksize()":null,"windows?()":null}},"verbose":null,"cd()":null,"ch":{"dir()":null,"mod":{"()":null,"_r()":null},"own":{"()":null,"_r()":null}},"cmp()":null,"co":{"llect_method()":null,"mmands()":null,"mpare_":{"file()":null,"stream()":null},"py":{"()":null,"_entry()":null,"_file()":null,"_stream()":null}},"cp":{"()":null,"_r()":null},"getwd()":null,"have_option?()":null,"identical?()":null,"install()":null,"link()":null,"ln":{"()":null,"_s":{"()":null,"f()":null}},"makedirs()":null,"mk":{"dir":{"()":null,"_p()":null},"path()":null},"move()":null,"mv()":null,"options":{"()":null,"_of()":null},"pwd()":null,"remove":{"()":null,"_dir()":null,"_entry":{"()":null,"_secure()":null},"_file()":null},"rm":{"()":null,"_f()":null,"_r":{"()":null,"f()":null},"dir()":null,"tree()":null},"safe_unlink()":null,"symlink()":null,"touch()":null,"uptodate?()":null}}},"nd":{"":null,"dirspecs":{"":null,"::":{"create_mock_dirs()":null,"delete_mock_dirs()":null,"expected_paths()":null,"mock_dir":{"()":null,"_files()":null}}},"::":{"find()":null,"prune()":null}},"xnum":null},"float":{"":null,"specs":{"":null,"::cancoerce":{"":null,"#/()":null,"#coerce()":null,"::new()":null}}},"foo":{"":null,"bar":{"":null,"::new()":null},"::":{"unknown":null,"new()":null}},"front":{"":null,"::new()":null},"gc":{"":null,"::":{"profiler":{"":null,"::":{"clear()":null,"disable()":null,"enable":{"()":null,"d?()":null},"raw_data()":null,"re":{"port()":null,"sult()":null},"total_time()":null}},"add_stress_to_class()":null,"count()":null,"disable()":null,"enable()":null,"latest_gc_info()":null,"malloc_allocat":{"ed_size()":null,"ions()":null},"remove_stress_to_class()":null,"st":{"a":{"rt()":null,"t()":null},"ress":{"()":null,"=()":null}},"verify_internal_consistency()":null}},"gdbm":{"":null,"::":{"new()":null,"open()":null}},"ge":{"m":{"":null,"::":{"availableset":{"":null,"#<<()":null,"#a":{"dd()":null,"ll_specs()":null},"#e":{"ach":{"()":null,"_spec()":null},"mpty?()":null},"#find_all()":null,"#inject_into_list()":null,"#match_platform!()":null,"::new()":null,"#p":{"ick_best!()":null,"refetch()":null},"#remove_installed!()":null,"#s":{"ize()":null,"orted()":null,"ource_for()":null},"#to_request_set()":null},"basicspecification":{"":null,"#activated?()":null,"#base_dir()":null,"#contains_requirable_file?()":null,"#d":{"atadir()":null,"efault_gem?()":null},"#extension":{"_dir()":null,"s_dir()":null},"#full_":{"gem_path()":null,"name()":null,"require_paths()":null},"#gem":{"_dir()":null,"s_dir()":null},"#have_":{"extensions?()":null,"file?()":null},"#lib_dirs_glob()":null,"#matches_for_glob()":null,"#name()":null,"::":{"default_specifications_dir()":null,"new()":null},"#platform()":null,"#require_paths()":null,"#s":{"ource_paths()":null,"tubbed?()":null},"#t":{"his()":null,"o_":{"fullpath()":null,"spec()":null}},"#version()":null},"bundlerversionfinder":{"":null,"::":{"bundle":{"_update_bundler_version()":null,"r_version":{"()":null,"_with_reason()":null}},"compatible?()":null,"filter!()":null,"lockfile_":{"contents()":null,"version()":null},"missing_version_message()":null,"without_filtering()":null}},"co":{"mmand":{"":null,"lineerror":null,"manager":{"":null,"#[]()":null,"#command_names()":null,"#find_command":{"()":null,"_possibilities()":null},"#instance()":null,"#load_and_instantiate()":null,"::":{"instance()":null,"new()":null,"reset()":null},"#process_args()":null,"#r":{"egister_command()":null,"un()":null},"#unregister_command()":null},"s":{"":null,"::":{"buildcommand":{"":null,"#execute()":null,"::new()":null},"certcommand":{"":null,"#build()":null,"#certificates_matching()":null,"#execute()":null,"#load_default_":{"cert()":null,"key()":null},"::new()":null,"#sign()":null,"#valid_email?()":null},"checkcommand":{"":null,"#check_gems()":null,"#doctor()":null,"#execute()":null,"::new()":null},"cleanupcommand":{"":null,"#clean_gems()":null,"#execute()":null,"#get_":{"candidate_gems()":null,"gems_to_cleanup()":null,"primary_gems()":null},"::new()":null,"#uninstall_dep()":null},"contentscommand":{"":null,"#execute()":null,"#files_in":{"()":null,"_default_gem()":null,"_gem()":null},"#gem_":{"contents()":null,"install_dir()":null},"::new()":null,"#s":{"how_files()":null,"pec_for()":null}},"dependencycommand":{"":null,"#execute()":null,"#name_pattern()":null,"::new()":null},"environmentcommand":{"":null,"#add_path()":null,"#execute()":null,"::new()":null},"fetchcommand":{"":null,"#execute()":null,"::new()":null},"generateindexcommand":{"":null,"#execute()":null,"::new()":null},"helpcommand":{"":null,"#execute()":null,"::new()":null},"installcommand":{"":null,"#execute()":null,"::new()":null},"listcommand":{"":null,"::new()":null},"lockcommand":{"":null,"#complain()":null,"#execute()":null,"::new()":null,"#spec_path()":null},"mirrorcommand":{"":null,"#execute()":null,"::new()":null},"opencommand":{"":null,"#execute()":null,"#get_env_editor()":null,"::new()":null,"#open_":{"editor()":null,"gem()":null},"#spec_for()":null},"outdatedcommand":{"":null,"#execute()":null,"::new()":null},"ownercommand":{"":null,"#add_owners()":null,"#execute()":null,"#manage_owners()":null,"::new()":null,"#remove_owners()":null,"#show_owners()":null},"pristinecommand":{"":null,"#execute()":null,"::new()":null},"pushcommand":{"":null,"#execute()":null,"::new()":null,"#send_gem()":null},"querycommand":{"":null,"#display_header()":null,"#e":{"ntry_":{"details()":null,"versions()":null},"xecute()":null},"#installed?()":null,"#make_entry()":null,"::new()":null,"#output_":{"query_results()":null,"versions()":null},"#s":{"how_gems()":null,"pec_":{"authors()":null,"homepage()":null,"license()":null,"loaded_from()":null,"platforms()":null,"summary()":null}}},"rdoccommand":{"":null,"#execute()":null,"::new()":null},"se":{"archcommand":{"":null,"::new()":null},"rvercommand":{"":null,"#execute()":null,"::new()":null},"tupcommand":{"":null,"#check_ruby_version()":null,"#execute()":null,"#generate_default_dirs()":null,"#install_":{"default_bundler_gem()":null,"executables()":null,"file()":null,"lib()":null,"rdoc()":null},"#make_destination_dirs()":null,"::new()":null,"#pem_files_in()":null,"#r":{"b_files_in()":null,"egenerate_binstubs()":null,"emove_old_":{"bin_files()":null,"lib_files()":null}},"#show_release_notes()":null,"#template_files":{"()":null,"_in()":null},"#uninstall_old_gemcutter()":null}},"sign":{"incommand":{"":null,"#execute()":null,"::new()":null},"outcommand":{"":null,"#execute()":null,"::new()":null}},"sourcescommand":{"":null,"#execute()":null,"::new()":null},"specificationcommand":{"":null,"#execute()":null,"::new()":null},"stalecommand":{"":null,"#execute()":null,"::new()":null},"un":{"installcommand":{"":null,"#execute()":null,"::new()":null,"#uninstall_":{"all()":null,"specific()":null}},"packcommand":{"":null,"#description()":null,"#execute()":null,"#find_in_cache()":null,"#get_":{"metadata()":null,"path()":null},"::new()":null}},"updatecommand":{"":null,"#execute()":null,"::new()":null,"#rubygems_target_version()":null,"#update_":{"gem":{"()":null,"s()":null},"rubygems()":null},"#which_to_update()":null},"whichcommand":{"":null,"#execute()":null,"#find_paths()":null,"::new()":null},"yankcommand":{"":null,"#execute()":null,"#get_":{"platform_from_requirements()":null,"version_from_requirements()":null},"::new()":null,"#yank_":{"api_request()":null,"gem()":null}}}},"#a":{"dd_":{"extra_args()":null,"option()":null,"parser_run_info()":null},"rguments()":null},"#begins?()":null,"::":{"add_":{"common_option()":null,"specific_extra_args()":null},"build_args":{"()":null,"=()":null},"common_options()":null,"extra_args":{"()":null,"=()":null},"new()":null,"specific_extra_args":{"()":null,"_hash()":null}},"#c":{"onfigure_options()":null,"reate_option_parser()":null},"#de":{"faults_str()":null,"scription()":null},"#execute()":null,"#get_":{"all_gem_names":{"()":null,"_and_versions()":null},"one_":{"gem_name()":null,"optional_argument()":null}},"#handle":{"_options()":null,"s?()":null},"#invoke":{"()":null,"_with_build_args()":null},"#merge_options()":null,"#parser()":null,"#remove_option()":null,"#show_":{"help()":null,"lookup_failure()":null},"#usage()":null,"#w":{"hen_invoked()":null,"rap()":null}},"nf":{"licterror":{"":null,"::new()":null},"ig":{"file":{"":null,"#[]":{"()":null,"=()":null},"#api_keys()":null,"#backtrace()":null,"#c":{"heck_credentials_permissions()":null,"onfig_file_name()":null,"redentials_path()":null},"#each()":null,"#handle_arguments()":null,"#load_":{"api_keys()":null,"file()":null},"::new()":null,"#r":{"eally_verbose()":null,"ubygems_api_key":{"()":null,"=()":null}},"#set_api_key()":null,"#unset_api_key!()":null,"#write()":null},"_file()":null,"uration":{"()":null,"=()":null}}},"nsoleui":{"":null,"::new()":null}},"de":{"pendency":{"":null,"error":null,"installer":{"":null,"#consider_":{"local?()":null,"remote?()":null},"#find_spec_by_name_and_version()":null,"#install()":null,"::new()":null},"list":{"":null,"#a":{"ctive_count()":null,"dd()":null},"#clear()":null,"#dependency_order()":null,"#each()":null,"#find_name()":null,"::":{"from_specs()":null,"new()":null},"#ok":{"?()":null,"_to_remove?()":null},"#remove_":{"by_name()":null,"specs_unsatisfied_by()":null},"#spec_predecessors()":null,"#tsort_each_":{"child()":null,"node()":null},"#why_not_ok?()":null},"re":{"movalexception":null,"solutionerror":{"":null,"#conflicting_dependencies()":null,"::new()":null}},"#<=>()":null,"#=":{"==()":null,"~()":null},"#latest_version?()":null,"#m":{"atch":{"?()":null,"es_spec?()":null,"ing_specs()":null},"erge()":null},"::new()":null,"#prerelease?()":null,"#r":{"equirement":{"()":null,"s_list()":null},"untime?()":null},"#specific?()":null,"#t":{"o_spec":{"()":null,"s()":null},"ype()":null}},"precate":{"":null,"#deprecate()":null,"#skip_during()":null,"::":{"deprecate()":null,"skip_during()":null}},"fault":{"userinteraction":{"":null,"::u":{"i":{"()":null,"=()":null},"se_ui()":null},"#u":{"i":{"()":null,"=()":null},"se_ui()":null}},"_bindir()":null,"_cert_path()":null,"_dir()":null,"_ex":{"ec_format()":null,"t_dir_for()":null},"_gems_use_full_paths?()":null,"_key_path()":null,"_path()":null,"_rubygems_dirs()":null,"_s":{"ources()":null,"pec_cache_dir()":null}},"flate()":null,"tect_gemdeps()":null},"errorreason":null,"ex":{"ception":null,"t":{"":null,"::builder":{"":null,"#build_extensions()":null,"::":{"class_name()":null,"make()":null,"new()":null,"redirector()":null,"run()":null}},"::":{"builderror":null,"cmakebuilder":{"":null,"::build()":null},"configurebuilder":{"":null,"::build()":null},"extconfbuilder":{"":null,"::":{"build()":null,"get_relative_path()":null}},"rakebuilder":{"":null,"::build()":null}}}},"fakefetcher":{"":null,"#api_endpoint()":null,"#cache_update_path()":null,"#download":{"()":null,"_to_cache()":null},"#f":{"etch_":{"path()":null,"size()":null},"ind_data()":null},"::new()":null,"#open_uri_or_path()":null,"#request()":null},"formatexception":null,"gem":{"not":{"foundexception":null,"inhomeexception":null},"runner":{"":null,"#do_configuration()":null,"::new()":null,"#run()":null},"cutterutilities":{"":null,"#a":{"dd_key_option()":null,"pi_key()":null},"#host()":null,"#rubygems_api_request()":null,"#s":{"et_api_key()":null,"ign_in()":null},"#verify_api_key()":null,"#with_response()":null}},"impossibledependencieserror":{"":null,"#dependency()":null,"::new()":null},"in":{"dexer":{"":null,"#build_":{"indices()":null,"marshal_gemspecs()":null,"modern_ind":{"ex()":null,"ices()":null}},"#comp":{"act_specs()":null,"ress":{"()":null,"_indices()":null}},"#g":{"e":{"m_file_list()":null,"nerate_index()":null},"zip()":null},"#install_indices()":null,"#ma":{"ke_temp_directories()":null,"p_gems_to_specs()":null},"::new()":null,"#paranoid()":null,"#update_":{"index()":null,"specs_index()":null}},"stall":{"error":null,"updateoptions":{"":null,"#add_install_update_options()":null,"#install_update_defaults_str()":null},"er":{"":null,"testcase":{"":null,"#setup()":null,"#util_":{"inst":{"_bindir()":null,"aller()":null},"make_exec()":null,"setup_gem()":null}},"#app_script_text()":null,"::":{"fakepackage":{"":null,"#copy_to()":null,"#extract_files()":null,"::new()":null},"at()":null,"exec_format()":null,"for_spec()":null,"new()":null},"#build_extensions()":null,"#d":{"efault_spec_file()":null,"ir()":null},"#e":{"nsure_":{"dependency()":null,"loadable_spec()":null},"xtract_":{"bin()":null,"files()":null}},"#formatted_program_filename()":null,"#ge":{"m_dir()":null,"nerate_":{"bin_s":{"cript()":null,"ymlink()":null},"windows_script()":null}},"#install":{"()":null,"ation_satisfies_dependency?()":null,"ed_specs()":null},"#pre_install_checks()":null,"#s":{"hebang()":null,"pec":{"()":null,"_file()":null}},"#unpack()":null,"#verify_spec_name()":null,"#w":{"indows_stub_script()":null,"rite_":{"build_info_file()":null,"cache_file()":null,"default_spec()":null,"spec()":null}}},"()":null},"validspecificationexception":null,"flate()":null},"li":{"censes":{"":null,"::":{"match?()":null,"suggestions()":null}},"st":{"":null,"#each()":null,"#prepend()":null,"::":{"new()":null,"prepend()":null},"#to_a()":null}},"lo":{"ad":{"error":null,"_env_plugins()":null,"_p":{"ath_insert_index()":null,"lugins()":null},"_yaml()":null},"ca":{"lremoteoptions":{"":null,"#a":{"ccept_uri_http()":null,"dd_":{"bulk_threshold_option()":null,"clear_sources_option()":null,"local_remote_options()":null,"proxy_option()":null,"source_option()":null,"update_sources_option()":null}},"#both?()":null,"#local?()":null,"#remote?()":null},"tion_of_caller()":null}},"missingspec":{"error":{"":null,"#build_message()":null,"::new()":null},"versionerror":{"":null,"#build_message()":null,"::new()":null}},"mockgemui":{"":null,"::":{"inputeoferror":{"":null,"::new()":null},"systemexitexception":null,"tty":{"":null,"#noecho()":null,"#tty?()":null},"termerror":{"":null,"::new()":null},"new()":null},"#ask()":null,"#error()":null,"#input()":null,"#output()":null,"#terminate":{"_interaction()":null,"d?()":null}},"nametuple":{"":null,"#<=>()":null,"#==()":null,"#eql?()":null,"#full_name()":null,"#hash()":null,"#match_platform?()":null,"::":{"from_list()":null,"new()":null,"null()":null,"to_basic()":null},"#prerelease?()":null,"#spec_name()":null,"#to_a()":null},"noaliasyamltree":{"":null,"::create()":null,"#format_time()":null,"#register()":null,"#visit_string()":null},"operationnotsupportederror":null,"pa":{"ckage":{"":null,"::":{"digestio":{"":null,"::":{"new()":null,"wrap()":null},"#write()":null},"error":null,"formaterror":{"":null,"::new()":null},"nonseekableio":null,"old":{"":null,"#contents()":null,"#extract_files()":null,"::new()":null,"#spec()":null,"#verify()":null},"patherror":{"":null,"::new()":null},"tar":{"header":{"":null,"#calculate_checksum()":null,"#empty?()":null,"#header()":null,"::":{"from()":null,"new()":null,"strict_oct()":null},"#oct()":null,"#update_checksum()":null},"invaliderror":null,"reader":{"":null,"::":{"entry":{"":null,"#bytes_read()":null,"#close":{"()":null,"d?()":null},"#directory?()":null,"#eof?()":null,"#f":{"ile?()":null,"ull_name()":null},"#getc()":null,"::new()":null,"#pos()":null,"#re":{"ad":{"()":null,"partial()":null},"wind()":null},"#symlink?()":null},"unexpectedeof":null,"new()":null},"#close()":null,"#each":{"()":null,"_entry()":null},"#rewind()":null,"#seek()":null},"testcase":{"":null,"#sp":{"()":null,"_z()":null},"#z()":null,"#as":{"ciiz()":null,"sert_headers_equal()":null},"#calc_checksum()":null,"#header()":null,"#t":{"ar_":{"dir_header()":null,"file_header()":null,"symlink_header()":null},"o_oct()":null},"#util_":{"dir_entry()":null,"entry()":null,"symlink_entry()":null}},"writer":{"":null,"::":{"boundedstream":{"":null,"::new()":null,"#write()":null},"fileoverflow":null,"restrictedstream":{"":null,"::new()":null,"#write()":null},"new()":null},"#add_":{"file":{"()":null,"_digest()":null,"_si":{"gned()":null,"mple()":null}},"symlink()":null},"#c":{"heck_closed()":null,"lose":{"()":null,"d?()":null}},"#flush()":null,"#mkdir()":null}},"toolongfilename":null,"build()":null,"new()":null},"task":{"":null,"#define()":null,"#init()":null,"::new()":null},"#add_checksums()":null,"#build()":null,"#co":{"ntents()":null,"py_to()":null},"#extract_files()":null,"#gzip_to()":null,"#initialize()":null,"#mkdir_p_safe()":null,"#rea":{"d_checksums()":null,"lpath()":null},"#s":{"etup_signer()":null,"pec()":null},"#verify":{"()":null,"_entry()":null,"_files()":null}},"th":{"support":{"":null,"#default_path()":null,"::new()":null,"#split_gem_path()":null},"()":null,"_separator()":null,"s()":null,"s=()":null}},"platform":{"":null,"mismatch":{"":null,"#add_platform()":null,"::new()":null,"#wordy()":null},"#=":{"=":{"()":null,"=()":null},"~()":null},"#eql?()":null,"#inspect()":null,"::":{"installable?()":null,"local()":null,"match()":null,"new()":null},"_defaults()":null,"s()":null,"s=()":null,"#to_":{"a()":null,"s()":null}},"re":{"qu":{"est":{"":null,"set":{"":null,"::":{"gemdependencyapi":{"":null,"#g":{"em":{"()":null,"spec()":null},"it":{"()":null,"_source()":null},"roup()":null},"#load()":null,"::new()":null,"#p":{"in_gem_source()":null,"latform":{"()":null,"s()":null}},"#ruby()":null,"#source()":null},"lockfile":{"":null,"::":{"parse":{"error":{"":null,"::new()":null},"r":{"":null,"::new()":null,"#parse()":null}},"tokenizer":{"":null,"#empty?()":null,"#make_parser()":null,"::":{"from_file()":null,"new()":null},"#next_token()":null,"#peek()":null,"#s":{"hift()":null,"kip()":null},"#to":{"_a()":null,"kenize()":null},"#unshift()":null},"build()":null,"new()":null},"#add_git()":null,"#requests()":null,"#spec_groups()":null,"#to_s()":null,"#write()":null},"new()":null},"#gem()":null,"#i":{"mport()":null,"nstall":{"()":null,"_from_gemdeps()":null,"_into()":null}},"#load_gemdeps()":null,"#resolve":{"()":null,"_current()":null},"#s":{"orted_requests()":null,"pecs":{"()":null,"_in()":null}}},"#c":{"ert_files()":null,"onnection_for()":null},"#fetch()":null,"::":{"configure_connection_for_https()":null,"get_":{"cert_files()":null,"proxy_from_env()":null},"new()":null,"verify_certificate":{"()":null,"_message()":null}},"#proxy_uri()":null,"#reset()":null,"#user_agent()":null},"irement":{"":null,"#=":{"==()":null,"~()":null},"#concat()":null,"::":{"badrequirementerror":null,"create()":null,"default()":null,"new()":null,"parse()":null},"#exact?()":null,"#none?()":null,"#prerelease?()":null,"#s":{"atisfied_by?()":null,"pecific?()":null}}},"solver":{"":null,"::":{"a":{"pis":{"et":{"":null,"#find_all()":null,"::new()":null,"#prefetch()":null},"pecification":{"":null,"::new()":null}},"ctivationrequest":{"":null,"#d":{"evelopment?()":null,"ownload()":null},"#full_":{"name()":null,"spec()":null},"#installed?()":null,"#name()":null,"::new()":null,"#others_possible?()":null,"#parent()":null,"#to_s()":null,"#version()":null}},"bestset":{"":null,"::new()":null},"co":{"nflict":{"":null,"#conflicting_dependencies()":null,"#expla":{"in()":null,"nation()":null},"#for_spec?()":null,"::new()":null,"#request":{"_path()":null,"er()":null}},"mpose":{"dset":{"":null,"#errors()":null,"#find_all()":null,"::new()":null,"#pre":{"fetch()":null,"release=()":null},"#remote=()":null},"_sets()":null}},"currentset":{"":null,"#find_all()":null},"dependencyrequest":{"":null,"#development?()":null,"#explicit?()":null,"#implicit?()":null,"#match":{"?()":null,"es_spec?()":null},"#name()":null,"::new()":null,"#requ":{"est_context()":null,"irement()":null},"#type()":null},"gits":{"et":{"":null,"#find_all()":null,"#prefetch()":null},"pecification":{"":null,"#install()":null}},"in":{"dexs":{"et":{"":null,"#find_all()":null},"pecification":{"":null,"#dependencies()":null,"::new()":null}},"stalle":{"dspecification":{"":null,"#install":{"()":null,"able_platform?()":null},"#source()":null},"rset":{"":null,"#add_":{"always_install()":null,"local()":null},"#errors()":null,"#find_all()":null,"::new()":null,"#pre":{"fetch()":null,"release=()":null}}}},"loc":{"alspecification":{"":null,"#installable_platform?()":null},"ks":{"et":{"":null,"#find_all()":null,"::new()":null},"pecification":{"":null,"#install()":null,"::new()":null,"#spec()":null}}},"molinillo":{"":null,"::":{"circulardependencyerror":{"":null,"::new()":null},"de":{"legates":{"":null,"::":{"resolutionstate":{"":null,"#activated()":null,"#conflicts()":null,"#depth()":null,"#name()":null,"#possibilities()":null,"#requirement":{"()":null,"s()":null}},"specificationprovider":{"":null,"#allow_missing?()":null,"#dependencies_for()":null,"#name_for":{"()":null,"_explicit_dependency_source()":null,"_locking_dependency_source()":null},"#requirement_satisfied_by?()":null,"#s":{"earch_for()":null,"ort_dependencies()":null},"#with_no_such_dependency_error_handling()":null}}},"pendency":{"graph":{"":null,"::":{"a":{"ction":{"":null,"::action_name()":null,"#down()":null,"#up()":null},"ddedgenocircular":{"":null,"#d":{"elete_first()":null,"own()":null},"#make_edge()":null,"::":{"action_name()":null,"new()":null},"#up()":null}},"de":{"leteedge":{"":null,"#down()":null,"#make_edge()":null,"::":{"action_name()":null,"new()":null},"#up()":null},"tachvertexnamed":{"":null,"#down()":null,"::":{"action_name()":null,"new()":null},"#up()":null}},"log":{"":null,"#add_":{"edge_no_circular()":null,"vertex()":null},"#de":{"lete_edge()":null,"tach_vertex_named()":null},"#each()":null,"::new()":null,"#p":{"op!()":null,"ush_action()":null},"#re":{"verse_each()":null,"wind_to()":null},"#set_payload()":null,"#tag()":null},"tag":{"":null,"#down()":null,"::":{"action_name()":null,"new()":null},"#up()":null},"vertex":{"":null,"#==()":null,"#ancestor?()":null,"#descendent?()":null,"#eql?()":null,"#hash()":null,"#i":{"nspect()":null,"s_reachable_from?()":null},"::new()":null,"#p":{"ath_to?()":null,"redecessors()":null},"#re":{"cursive_":{"predecessors()":null,"successors()":null},"quirements()":null},"#s":{"hallow_eql?()":null,"uccessors()":null}},"new()":null,"tsort()":null},"#==()":null,"#add_":{"child_vertex()":null,"edge":{"()":null,"_no_circular()":null},"vertex()":null},"#de":{"lete_edge()":null,"tach_vertex_named()":null},"#each()":null,"#in":{"itialize_copy()":null,"spect()":null},"#r":{"ewind_to()":null,"oot_vertex_named()":null},"#set_payload()":null,"#t":{"ag()":null,"o_dot()":null,"sort_each_":{"child()":null,"node()":null}},"#vertex_named()":null},"state":{"":null,"#pop_possibility_state()":null}}},"nosuchdependencyerror":{"":null,"#message()":null,"::new()":null},"possibilitystate":null,"resol":{"utionstate":{"":null,"::empty()":null},"ver":{"":null,"error":null,"::":{"resolution":{"":null,"#a":{"ctivate_spec()":null,"ttempt_to_":{"activate":{"()":null,"_existing_spec()":null,"_new_spec()":null},"swap_possibility()":null}},"#create_conflict()":null,"#debug()":null,"#end_resolution()":null,"#fi":{"nd_state_for()":null,"xup_swapped_children()":null},"#handle_missing_or_push_dependency_state()":null,"#in":{"dicate_progress()":null,"itial_state()":null},"#locked_requirement_named()":null,"::new()":null,"#new_spec_satisfied?()":null,"#p":{"arent_of()":null,"ossibility()":null,"rocess_topmost_state()":null,"ush_state_for_requirements()":null},"#re":{"quire":{"_nested_dependencies_for()":null,"ment_":{"for_existing_name()":null,"tree":{"_for()":null,"s()":null}}},"solve()":null},"#sta":{"rt_resolution()":null,"te":{"()":null,"_any?()":null,"_index_for_unwind()":null}},"#unwind_for_conflict()":null},"new()":null},"#resolve()":null}},"specificationprovider":{"":null,"#allow_missing?()":null,"#dependencies_for()":null,"#name_for":{"()":null,"_explicit_dependency_source()":null,"_locking_dependency_source()":null},"#requirement_satisfied_by?()":null,"#s":{"earch_for()":null,"ort_dependencies()":null}},"ui":{"":null,"#after_resolution()":null,"#before_resolution()":null,"#debug":{"()":null,"?()":null},"#indicate_progress()":null,"#output()":null,"#progress_rate()":null},"versionconflict":{"":null,"::new()":null}}},"requirementlist":{"":null,"#add()":null,"#empty?()":null,"::new()":null,"#next5()":null,"#remove()":null,"#size()":null},"set":{"":null,"#find_all()":null,"#prefetch()":null},"sourceset":{"":null,"#add_source_gem()":null,"#get_set()":null,"::new()":null},"spec":{"specification":{"":null,"#dependencies()":null,"#full_name()":null,"#name()":null,"::new()":null,"#platform()":null,"#version()":null},"ification":{"":null,"#full_name()":null,"#install":{"()":null,"able_platform?()":null},"::new()":null}},"stats":{"":null,"#backtracking!()":null,"#display()":null,"#iteration!()":null,"::new()":null,"#re":{"cord_":{"depth()":null,"requirements()":null},"quirement!()":null}},"vendors":{"et":{"":null,"#find_all()":null},"pecification":{"":null,"#install()":null}},"for_current_gems()":null,"new()":null},"#a":{"llow_missing?()":null,"mount_constrained()":null},"#de":{"bug?()":null,"pendencies_for()":null},"#name_for()":null,"#output()":null,"#re":{"quirement_satisfied_by?()":null,"solve()":null},"#s":{"earch_for()":null,"ort_dependencies()":null}},"ad_binary()":null,"fresh()":null,"gister_default_spec()":null,"mo":{"te":{"error":null,"fetcher":{"":null,"::":{"unknownhosterror":null,"fetcher":{"ror":{"":null,"::new()":null},"()":null,"=()":null},"new()":null},"#api_endpoint()":null,"#c":{"ache_update_path()":null,"lose_all()":null,"orrect_for_windows_path()":null},"#download":{"()":null,"_to_cache()":null},"#fetch_":{"file()":null,"http":{"()":null,"s()":null},"path()":null,"s3()":null,"size()":null},"#https?()":null,"#p":{"ools_for()":null,"roxy_for()":null},"#request()":null,"#s":{"3_expiration()":null,"ign_s3_url()":null}},"installation":{"cancelled":null,"skipped":null},"sourceexception":null},"ve_unresolved_default_spec()":null}},"ru":{"ntimerequirementnotmeterror":{"":null,"#message()":null},"by":{"versionmismatch":null,"()":null,"=()":null,"_api_version()":null,"_engine()":null,"_version()":null,"gems_version()":null}},"safeyaml":{"":null,"::":{"load()":null,"safe_load()":null}},"se":{"curity":{"":null,"::":{"exception":null,"policy":{"":null,"#check_":{"c":{"ert()":null,"hain()":null},"data()":null,"key()":null,"root()":null,"trust()":null},"::new()":null,"#verify":{"()":null,"_signatures()":null}},"alt_name_or_x509_entry()":null,"create_":{"cert":{"()":null,"_email()":null,"_self_signed()":null},"key()":null},"email_to_name()":null,"re":{"_sign()":null,"set()":null},"sign":{"er":{"":null,"::new()":null,"#sign()":null},"()":null},"trust":{"dir":{"":null,"#cert_path()":null,"#each_certificate()":null,"#issuer_of()":null,"#load_certificate()":null,"#name_path()":null,"::new()":null,"#trust_cert()":null,"#verify()":null},"_dir()":null,"ed_certificates()":null},"write()":null},"option":{"":null,"#add_security_option()":null}},"rver":{"":null,"#add_date()":null,"#doc_root()":null,"#have_rdoc_4_plus?()":null,"#l":{"a":{"test_specs()":null,"unch()":null},"isten()":null},"#prerelease_specs()":null,"#quick()":null,"#r":{"doc()":null,"oot()":null,"un()":null},"::":{"new()":null,"run()":null},"#s":{"how_rdoc_for_pattern()":null,"pecs()":null},"#uri_encode()":null},"archer=()":null},"silentui":{"":null,"#close()":null,"::new()":null},"source":{"":null,"::":{"git":{"":null,"#<=>()":null,"::new()":null,"#specs()":null},"installed":{"":null,"#<=>()":null,"#download()":null},"loc":{"al":{"":null,"#<=>()":null},"k":{"":null,"#fetch_spec()":null,"::new()":null}},"specificfile":{"":null,"#<=>()":null,"::new()":null},"vendor":{"":null,"#<=>()":null,"::new()":null},"new()":null},"fetchproblem":{"":null,"::new()":null,"#wordy()":null},"list":{"":null,"#<<()":null,"#clear()":null,"#delete()":null,"#e":{"ach":{"()":null,"_source()":null},"mpty?()":null},"#first()":null,"#include?()":null,"::":{"from()":null,"new()":null},"#replace()":null,"#to_a":{"()":null,"ry()":null}},"#<=>()":null,"#cache_dir()":null,"#download()":null,"#fetch_spec()":null,"#load_specs()":null,"s()":null,"s=()":null,"#update_cache?()":null},"spec":{"fetcher":{"":null,"#available_specs()":null,"#detect()":null,"::":{"fetcher()":null,"new()":null},"#s":{"earch_for_dependency()":null,"pec_for_dependency()":null,"uggest_gems_from_name()":null}},"ific":{"gemnotfoundexception":{"":null,"::new()":null},"ation":{"":null,"#_dump()":null,"#a":{"bbreviate()":null,"ctivate":{"()":null,"_dependencies()":null},"dd_":{"bindir()":null,"de":{"pendency":{"()":null,"_with_type()":null},"velopment_dependency()":null},"runtime_dependency()":null,"self_to_load_path()":null},"uthor":{"()":null,"=()":null,"s()":null,"s=()":null}},"::":{"_load()":null,"add_spec":{"()":null,"s()":null},"all":{"()":null,"=()":null,"_names()":null},"array_attributes()":null,"attribute_names()":null,"default_stubs()":null,"dirs":{"()":null,"=()":null},"each()":null,"find_":{"a":{"ctive_stub_by_path()":null,"ll_by_":{"full_name()":null,"name()":null}},"by_":{"name()":null,"path()":null},"in":{"_unresolved":{"()":null,"_tree()":null},"active_by_path()":null}},"from_yaml()":null,"gemspec_stubs_in()":null,"installed_stubs()":null,"latest_specs()":null,"load":{"()":null,"_defaults()":null},"new()":null,"no":{"n_nil_attributes()":null,"rmalize_yaml_input()":null},"outdated":{"()":null,"_and_latest_version()":null},"re":{"move_spec()":null,"quired_attribute":{"?()":null,"s()":null},"set()":null},"sort_by!()":null,"stubs":{"()":null,"_for()":null},"unresolved_deps()":null},"#b":{"ase_dir()":null,"in_":{"dir()":null,"file()":null},"uild_":{"args()":null,"info_":{"dir()":null,"file()":null}},"undled_gem_in_old_ruby?()":null},"#c":{"ache_":{"dir()":null,"file()":null},"onflicts()":null},"#d":{"ate":{"()":null,"=()":null},"efault_value()":null,"ependen":{"cies()":null,"t_":{"gems()":null,"specs()":null}},"escription=()":null,"evelopment_dependencies()":null,"oc_dir()":null},"#ex":{"ecutable":{"()":null,"=()":null,"s()":null,"s=()":null},"tensions":{"()":null,"=()":null},"tra_rdoc_files":{"()":null,"=()":null}},"#f":{"i":{"le":{"_name()":null,"s()":null,"s=()":null},"nd_all_satisfiers()":null},"or_cache()":null,"ull_name()":null},"#gems_dir()":null,"#has_conflicts?()":null,"#in":{"itialize_copy()":null,"validate_memoized_attributes()":null},"#li":{"b_files()":null,"cense":{"()":null,"=()":null,"s()":null,"s=()":null}},"#m":{"ark_version()":null,"issing_extensions?()":null},"#n":{"ame_tuple()":null,"ormalize()":null},"#platform":{"()":null,"=()":null},"#r":{"doc_options":{"()":null,"=()":null},"equire":{"_path":{"()":null,"=()":null,"s=()":null},"d_ruby":{"_version=()":null,"gems_version=()":null},"ments":{"()":null,"=()":null}},"eset_nil_attributes_to_default()":null,"i_dir()":null,"uby_code()":null,"untime_dependencies()":null},"#s":{"a":{"me_attributes?()":null,"nitize":{"()":null,"_string()":null},"tisfies_requirement?()":null},"ort_obj()":null,"pec_":{"dir()":null,"file()":null,"name()":null},"tubbed?()":null,"ummary=()":null},"#t":{"o_":{"ruby":{"()":null,"_for_cache()":null},"spec()":null},"raverse()":null},"#v":{"alidate":{"()":null,"_metadata()":null,"_permissions()":null},"ersion=()":null}}},"_cache_dir()":null},"st":{"reamui":{"":null,"::":{"si":{"lent":{"downloadreporter":{"":null,"#done()":null,"#fetch()":null,"::new()":null,"#update()":null},"progressreporter":{"":null,"#done()":null,"::new()":null,"#updated()":null}},"mpleprogressreporter":{"":null,"#done()":null,"::new()":null,"#updated()":null}},"verbose":{"downloadreporter":{"":null,"#done()":null,"#fetch()":null,"::new()":null,"#update()":null},"progressreporter":{"":null,"#done()":null,"::new()":null,"#updated()":null}},"new()":null},"#_gets_noecho()":null,"#a":{"lert":{"()":null,"_error()":null,"_warning()":null},"sk":{"()":null,"_for_password()":null,"_yes_no()":null}},"#backtrace()":null,"#c":{"hoose_from_list()":null,"lose()":null},"#d":{"ebug()":null,"ownload_reporter()":null},"#progress_reporter()":null,"#require_io_console()":null,"#say()":null,"#t":{"erminate_interaction()":null,"ty?()":null}},"ubspecification":null},"systemexitexception":{"":null,"::new()":null},"te":{"stcase":{"":null,"#a":{"dd_to_fetcher()":null,"ll_spec_names()":null,"sk_if_ok()":null,"ssert_":{"activate()":null,"contains_make_command()":null,"path_exists()":null}},"#build_rake_in()":null,"::":{"s":{"pecfetchersetup":{"":null,"#created_specs()":null,"::declare()":null,"#download()":null,"#gem()":null,"#legacy_platform()":null,"#spec()":null},"taticset":{"":null,"#add()":null,"#find_":{"all()":null,"spec()":null},"#load_spec()":null,"::new()":null}},"cert_path()":null,"key_path()":null,"load_":{"cert()":null,"key()":null},"make_command()":null,"process_based_port()":null,"rubybin()":null,"vc_windows?()":null,"win_platform?()":null},"#c":{"ommon_installer_":{"setup()":null,"teardown()":null},"reate_tmpdir()":null},"#dep":{"()":null,"endency_request()":null},"#enable_shared()":null,"#git_gem()":null,"#have_git?()":null,"#install_":{"default_":{"gems()":null,"specs()":null},"gem":{"()":null,"_user()":null},"specs()":null},"#loaded_spec_names()":null,"#m":{"ake_command()":null,"u_pp()":null},"#n":{"ew_default_spec()":null,"make_found?()":null},"#p":{"arse_make_command_line()":null,"rocess_based_port()":null},"#quick_gem()":null,"#re":{"ad_":{"binary()":null,"cache()":null},"fute_path_exists()":null,"q()":null},"#s":{"ave_":{"gemspec()":null,"loaded_features()":null},"can_make_command_lines()":null,"etup()":null,"pec":{"()":null,"_fetcher()":null}},"#teardown()":null,"#u":{"n":{"install_gem()":null,"resolved_names()":null},"til_":{"build_gem()":null,"clear_gems()":null,"gem()":null,"gzip()":null,"make_gems()":null,"re":{"move_gem()":null,"store_ruby_version()":null},"set":{"_":{"ruby_version()":null,"arch()":null},"up_":{"fake_fetcher()":null,"spec_fetcher()":null}},"spec()":null,"zip()":null}},"#v":{"()":null,"c_windows?()":null,"endor_gem()":null},"#w":{"ait_for_child_process_to_exit()":null,"in_platform?()":null,"rite_file()":null}},"xt":{"":null,"#clean_text()":null,"#format_text()":null,"#levenshtein_distance()":null,"#truncate_text()":null}},"un":{"installer":{"":null,"::new()":null,"#path_ok?()":null,"#remove":{"()":null,"_all()":null,"_executables()":null},"#uninstall":{"()":null,"_gem()":null}},"satisfiabledependencyerror":{"":null,"#name()":null,"::new()":null,"#version()":null},"pack()":null},"uriformatter":{"":null,"#escape()":null,"::new()":null,"#normalize()":null,"#unescape()":null},"util":{"":null,"::":{"g":{"unzip()":null,"zip()":null},"inflate()":null,"popen()":null,"silent_system()":null,"traverse_parents()":null}},"validator":{"":null,"#alien()":null,"#find_files_for_gem()":null,"#verify_gem":{"()":null,"_file()":null}},"ver":{"ificationerror":null,"sion":{"":null,"option":{"":null,"#add_":{"p":{"latform_option()":null,"rerelease_option()":null},"version_option()":null}},"#<=>()":null,"#_":{"s":{"egments()":null,"plit_segments()":null},"version()":null},"#approximate_recommendation()":null,"#bump()":null,"#canonical_segments()":null,"#eql?()":null,"#marshal_":{"dump()":null,"load()":null},"::":{"c":{"orrect?()":null,"reate()":null},"new()":null},"#prerelease?()":null,"#release()":null,"#to_s()":null,"#version()":null}},"bin":{"_path()":null,"ary_mode()":null,"dir()":null},"clear_":{"default_specs()":null,"paths()":null},"datadir()":null,"dir()":null,"do":{"c":{"tor":{"":null,"#doctor()":null,"#gem_repository?()":null,"::new()":null},"umenterror":null},"ne_installing()":null},"en":{"dofyamlexception":null,"sure_":{"default_gem_subdirectories()":null,"gem_subdirectories()":null},"v_requirement()":null},"fi":{"lepermissionerror":{"":null,"::new()":null},"nd_":{"files()":null,"home()":null,"latest_files()":null,"spec_for_exe()":null,"unresolved_default_spec()":null},"nish_resolve()":null},"gunzip()":null,"gzip()":null,"host":{"()":null,"=()":null},"latest_":{"rubygems_version()":null,"spec_for()":null,"version_for()":null},"marshal_version()":null,"needs()":null,"post_":{"build()":null,"install()":null,"reset()":null,"uninstall()":null},"pre":{"_":{"install()":null,"reset()":null,"uninstall()":null},"fix()":null},"suffix":{"_pattern()":null,"es()":null},"time()":null,"try_activate()":null,"ui()":null,"use":{"rinteraction":{"":null,"#a":{"lert":{"()":null,"_error()":null,"_warning()":null},"sk":{"()":null,"_for_password()":null,"_yes_no()":null}},"#choose_from_list()":null,"#say()":null,"#terminate_interaction()":null,"#verbose()":null},"_gemdeps()":null,"_paths()":null,"r_":{"dir()":null,"home()":null}},"win_platform":{"=()":null,"?()":null},"write_binary()":null}},"toptlong":{"":null,"::":{"ambiguousoption":null,"error":null,"invalidoption":null,"missingargument":null,"ne":{"edlessargument":null,"w()":null}}}},"gods":{"":null,"::ruler":{"1()":null,"2()":null}},"hmmspecs":{"":null,"::subclass":{"":null,"#instance_sub_method()":null}},"hp":{"immspecs":{"":null,"::subclass":{"":null,"#p":{"r":{"ivate_sub_method()":null,"otected_sub_method()":null},"ublic_sub_method()":null}}},"mmspecs":{"":null,"::private_method()":null}},"hsmmspecs":{"":null,"::singleton_method()":null},"hash":{"":null,"specs":{"":null,"::":{"by":{"identitykey":{"":null,"#hash()":null},"valuekey":{"":null,"#eql?()":null,"#hash()":null,"::new()":null}},"defaulthash":{"":null,"#default()":null},"keywithprivatehash":null,"my":{"hash":null,"initializerhash":{"":null,"::new()":null}},"newhash":{"":null,"::new()":null},"tohashhash":{"":null,"#to_hash()":null},"empty_frozen_hash()":null,"frozen_hash()":null}},"strings":{"ascii8bit":{"":null,"::literal_hash()":null},"usascii":{"":null,"::literal_hash()":null},"utf8":{"":null,"::literal_hash()":null}},"::":{"[]()":null,"new()":null,"try_convert()":null}},"hi":{"mmspecs":{"":null,"::subclass":{"":null,"#instance_sub_method()":null}},"_exception":{"":null,"::new()":null}},"hoge":{"":null,"::new()":null},"iehandler":{"":null,"::new()":null},"io":{"":null,"::":{"e":{"againwait":{"readable":null,"writable":null},"inprogresswait":{"readable":null,"writable":null},"wouldblockwait":{"readable":null,"writable":null}},"wait":{"readable":null,"writable":null,"_for_single_fd()":null},"generic_":{"readable":{"":null,"#get":{"ch()":null,"pass()":null},"#read":{"_nonblock()":null,"byte()":null,"char()":null,"line()":null,"partial()":null},"#sysread()":null},"writable":{"":null,"#<<()":null,"#p":{"rint":{"()":null,"f()":null},"uts()":null},"#write_nonblock()":null}},"bin":{"read()":null,"write()":null},"co":{"nsole":{"()":null,"_size()":null},"py_stream()":null},"default_console_size()":null,"for":{"_fd()":null,"each()":null},"new()":null,"open()":null,"pipe()":null,"popen()":null,"pread()":null,"read":{"()":null,"lines()":null},"select()":null,"sysopen()":null,"thread_fd_close()":null,"try_convert()":null,"write()":null},"specs":{"":null,"::":{"subio":null,"closed_io()":null,"co":{"pystream":{"":null,"read":{"":null,"partial":{"":null,"::new()":null,"#readpartial()":null,"#send()":null},"::new()":null,"#read()":null,"#send()":null},"::from":{"()":null,"=()":null}},"llector()":null},"io_":{"fixture()":null,"mock()":null},"lines":{"()":null,"_arbitrary_separator()":null,"_empty_separator()":null,"_limit()":null,"_r_separator()":null,"_space_separator":{"()":null,"_limit()":null},"_without_newline_characters()":null},"paragraphs()":null,"pipe_fixture()":null}},"stub":{"":null,"::new()":null}},"ip":{"addr":{"":null,"::":{"addressfamilyerror":null,"error":null,"invalid":{"addresserror":null,"prefixerror":null},"new":{"()":null,"_ntoh()":null},"ntop()":null}},"socket":{"":null,"::":{"getaddress":{"()":null,"_orig()":null},"valid_v6?()":null}}},"irb":{"":null,"::":{"abort":null,"extendcommand":{"":null,"::":{"c":{"hangeworkspace":null,"urrentworkingworkspace":null},"for":{"eground":null,"k":null},"help":null,"irbcommand":null,"jobs":null,"kill":null,"load":null,"nop":null,"popworkspace":null,"pushworkspace":null,"require":null,"source":null,"workspaces":null},"bundle":{"":null,"::":{"def_extend_command()":null,"extend_object()":null,"install_extend_commands()":null},"#i":{"nstall_alias_method()":null,"rb_":{"context()":null,"exit()":null,"load()":null,"require()":null}}}},"fileinputmethod":{"":null,"#e":{"ncoding()":null,"of?()":null},"#gets()":null,"::new()":null},"frame":{"":null,"#bottom()":null,"::":{"bottom()":null,"new()":null,"sender()":null,"top()":null},"#t":{"op()":null,"race_func()":null}},"in":{"putmethod":{"":null,"#gets()":null,"::new()":null,"#readable_after_eof?()":null},"spector":{"":null,"#in":{"it()":null,"spect_value()":null},"::":{"def_inspector()":null,"keys_with_inspector()":null,"new()":null}},"itialize_tracer()":null},"irb":{"":null,"loader":{"":null,"#irb_load()":null,"#load_file()":null,"#source_file()":null},"#eval_input()":null,"#inspect()":null,"()":null,"_a":{"bort()":null,"t_exit()":null},"_exit()":null,"::new()":null,"#run()":null,"#s":{"ignal_":{"handle()":null,"status()":null},"uspend_":{"context()":null,"input_method()":null,"name()":null,"workspace()":null}}},"jobmanager":{"":null,"()":null,"#delete()":null,"#i":{"ns":{"ert()":null,"pect()":null},"rb()":null},"#kill()":null,"#main_":{"irb()":null,"thread()":null},"#n_jobs()":null,"::new()":null,"#s":{"earch()":null,"witch()":null},"#thread()":null},"lo":{"adabort":null,"cale":{"":null,"#each_":{"localized_path()":null,"sublocale()":null},"#f":{"ind()":null,"ormat()":null},"#gets()":null,"#load()":null,"::new()":null,"#p":{"rint":{"()":null,"f()":null},"uts()":null},"#re":{"a":{"dline()":null,"l_load()":null},"quire()":null},"#s":{"tring()":null,"earch_file()":null},"#toplevel_load()":null}},"methodextender":{"":null,"#def_p":{"ost_proc()":null,"re_proc()":null},"#new_alias_name()":null},"notifier":{"":null,"::":{"abstractnotifier":{"":null,"#exec_if()":null,"::new()":null,"#notify?()":null,"#p":{"p":{"()":null,"x()":null},"rint":{"()":null,"f()":null,"n()":null},"uts()":null}},"compositenotifier":{"":null,"#def_notifier()":null,"#level":{"=()":null,"_notifier=()":null},"::new()":null},"levelednotifier":{"":null,"#<=>()":null,"::new()":null,"#notify?()":null},"nomsgnotifier":{"":null,"::new()":null,"#notify?()":null},"def_notifier()":null},"#def_notifier()":null},"outputmethod":{"":null,"#p":{"arse_printf_format()":null,"p()":null,"px()":null,"rint":{"()":null,"f()":null,"n()":null},"uts()":null}},"readlineinputmethod":{"":null,"#e":{"ncoding()":null,"of?()":null},"#gets()":null,"#line()":null,"::new()":null,"#readable_after_eof?()":null},"slex":{"":null,"::node":null},"workspace":{"":null,"#__evaluate__()":null,"#code_around_binding()":null,"#evaluate()":null,"#filter_backtrace()":null,"::new()":null},"currentcontext()":null,"con":{"text":{"":null,"extender":{"":null,"::":{"def_extend_command()":null,"install_extend_commands()":null}},"#_":{"_exit__()":null,"set_last_value()":null},"#change_workspace()":null,"#debug":{"?()":null,"_level=()":null},"#e":{"val_history=()":null,"xit()":null},"#file_input?()":null,"#h":{"istory_file":{"()":null,"=()":null},"ome_workspace()":null},"#i":{"nspect":{"?()":null,"_mode=()":null},"rb_level()":null},"#main()":null,"::new()":null,"#p":{"op_workspace()":null,"rompt":{"_mode=()":null,"ing?()":null},"ush_workspace()":null},"#s":{"ave_history":{"()":null,"=()":null},"et_last_value()":null},"#use_":{"loader":{"()":null,"=()":null,"?()":null},"readline=()":null,"tracer=()":null},"#verbose?()":null,"#workspaces()":null},"f()":null},"default_src_encoding()":null,"print_usage()":null,"st":{"dio":{"inputmethod":{"":null,"#e":{"ncoding()":null,"of?()":null},"#gets()":null,"#line()":null,"::new()":null,"#readable_after_eof?()":null},"outputmethod":{"":null,"#print()":null}},"art()":null},"version()":null}},"ivarmodmock":{"":null,"::class_variables()":null},"in":{"cludematcher":{"":null,"::new()":null},"finitymatcher":{"":null,"::new()":null},"spector":{"":null,"::new()":null},"teger":{"":null,"::":{"each_prime()":null,"from_prime_division()":null,"sqrt()":null,"test_unpack()":null}}},"isect":{"":null,"::new()":null},"itertest":{"":null,"::new()":null},"jisx0208":{"":null,"::char":{"":null,"#==()":null,"#cell()":null,"#hi()":null,"#inspect()":null,"#lo()":null,"::":{"from_sjis()":null,"new()":null},"#row":{"()":null,"_cell_to_code()":null},"#succ()":null,"#to_":{"int()":null,"sjis()":null}}},"json":{"":null,"::":{"circulardatastructure":null,"ext":{"":null,"::":{"generator":{"":null,"::":{"generatormethods":{"":null,"::":{"array":{"":null,"#to_json()":null},"bignum":{"":null,"#to_json()":null},"falseclass":{"":null,"#to_json()":null},"fixnum":{"":null,"#to_json()":null},"float":{"":null,"#to_json()":null},"hash":{"":null,"#to_json()":null},"integer":{"":null,"#to_json()":null},"nilclass":{"":null,"#to_json()":null},"object":{"":null,"#to_json()":null},"string":{"":null,"::":{"extend":{"":null,"#json_create()":null},"included()":null},"#to_json":{"()":null,"_raw":{"()":null,"_object()":null}}},"trueclass":{"":null,"#to_json()":null}}},"state":{"":null,"#[]":{"()":null,"=()":null},"#a":{"llow_nan?()":null,"rray_nl":{"()":null,"=()":null},"scii_only?()":null},"#buffer_initial_length":{"()":null,"=()":null},"#c":{"heck_circular?()":null,"onfigure()":null},"#depth":{"()":null,"=()":null},"#generate()":null,"#in":{"dent":{"()":null,"=()":null},"itialize_copy()":null},"#m":{"ax_nesting":{"()":null,"=()":null},"erge()":null},"::":{"from_state()":null,"new()":null},"#object_nl":{"()":null,"=()":null},"#space":{"()":null,"=()":null,"_before":{"()":null,"=()":null}},"#to_h":{"()":null,"ash()":null}}}},"parser":{"":null,"::new()":null,"#parse()":null,"#source()":null}}},"gener":{"atorerror":null,"icobject":{"":null,"#[]":{"()":null,"=()":null},"#as_json()":null,"::":{"dump()":null,"from_hash()":null,"json_creat":{"able?()":null,"e()":null},"load()":null},"#to_":{"hash()":null,"json()":null},"#|()":null}},"jsonerror":{"":null,"::wrap()":null},"missingunicodesupport":null,"nestingerror":null,"parsererror":null,"unparsererror":null,"[]()":null,"iconv()":null,"restore()":null}},"junitformatter":{"":null,"::new()":null},"ksautoload":{"b":{"":null,"::loaded()":null},"c":{"":null,"::loaded()":null},"d":{"":null,"::loaded()":null}},"kconv":{"":null,"::":{"guess()":null,"is":{"euc()":null,"jis()":null,"sjis()":null,"utf8()":null},"kconv()":null,"to":{"euc()":null,"jis()":null,"locale()":null,"sjis()":null,"utf":{"16()":null,"32()":null,"8()":null}}}},"kernel":{"":null,"specs":{"":null,"::":{"a":{"":null,"ncestor":{"class":null,"module":null},"rray_":{"function()":null,"method()":null},"#p":{"r":{"ivate_method()":null,"otected_method()":null},"ub_method()":null},"#undefed_method()":null},"b":{"":null,"inding":{"":null,"#get_binding()":null,"::new()":null,"#square()":null},"lockgiven":{"":null,"::accept_block":{"()":null,"_as_argument()":null}},"#to_str()":null},"c":{"":null,"alle":{"etest":{"":null,"#f":{"()":null,"rom_":{"class_body()":null,"eval()":null,"send()":null}},"#g()":null,"#in_block()":null},"rlocationstest":{"":null,"::locations()":null},"rtest":{"":null,"::locations()":null}},"hild":null,"lass":{"mm":{"":null,"::method_missing()":null,"#method_missing()":null},"nomm":{"":null,"::method_p":{"r":{"ivate()":null,"otected()":null},"ublic()":null},"#method_p":{"r":{"ivate()":null,"otected()":null},"ublic()":null}}},"lone":{"":null,"#initialize_clone()":null},"ho":{"mp()":null,"p()":null},"::new()":null,"#to_str()":null},"dup":{"":null,"licate":{"":null,"m":{"":null,"#repr()":null},"#initialize_copy()":null,"::new()":null},"#initialize_dup()":null},"evaltest":{"":null,"::":{"call_yield()":null,"eval_yield_with_binding()":null}},"foo":{"":null,"#aka()":null,"#bar()":null,"::bar()":null},"grandchild":null,"kernelblockgiven":{"":null,"::accept_block":{"()":null,"_as_argument()":null}},"kindaclass":{"":null,"::new()":null},"lambda":{"":null,"#inner()":null,"#mp()":null,"#outer()":null},"m":{"":null,"ethod":{"":null,"test":{"":null,"#f":{"()":null,"rom_":{"class_body()":null,"eval()":null,"send()":null}},"#g()":null,"#in_block()":null},"s":{"":null,"::":{"metaclassmethods":{"":null,"#nopeeking()":null,"#peekaboo()":null,"#shoo()":null},"hachi()":null,"ichi()":null,"juu":{"()":null,"_ichi()":null,"_ni()":null},"roku()":null,"san()":null,"shi":{"()":null,"chi()":null}},"#juu_s":{"an()":null,"hi()":null},"#ku()":null,"#ni()":null}},"odule":{"mm":{"":null,"::method_":{"missing()":null,"pr":{"ivate()":null,"otected()":null},"public()":null}},"nomm":{"":null,"::method_p":{"r":{"ivate()":null,"otected()":null},"ublic()":null}}},"yextensionmodule":null,"ymodule":null,"::":{"append_features()":null,"extend":{"_object()":null,"ed()":null}}},"notmatch":{"":null,"#!~()":null},"parent":{"":null,"mixin":{"":null,"#parent_mixin_method()":null},"#another_parent_method()":null,"::parent_class_method()":null,"#parent_method()":null},"private":{"sup":{"":null,"#public_in_sub()":null},"toa":{"":null,"ry":{"":null,"#to_a":{"()":null,"ry()":null}},"#to_a()":null}},"respondviamissing":{"":null,"#method_missing()":null,"#respond_to_missing?()":null},"selfblockgiven":{"":null,"::accept_block":{"()":null,"_as_argument()":null}},"someothermodule":null,"visibilitychange":null,"in":{"stance":{"class":null,"variable":{"":null,"::new()":null}},"teger_":{"function()":null,"method()":null}},"has":{"h_":{"function()":null,"method()":null},"_private_method()":null},"pu":{"blicsub":{"":null,"#public_in_sub()":null},"tc_":{"function()":null,"method()":null}},"run_with_dash_n()":null}},"::":{"uri()":null,"open":{"()":null,"_uri_original_open()":null},"pp()":null}},"lang":{"sendspecs":{"":null,"::":{"attr":{"19set":{"":null,"#[]=()":null},"set":{"":null,"#[]=()":null}},"methodmissing":{"":null,"#method_missing()":null,"::new()":null},"private":{"getter":{"":null,"#call_self_foo":{"()":null,"_or_equals()":null}},"setter":{"":null,"#call_self_foo_equals":{"()":null,"_masgn()":null}}},"to":{"ary":{"":null,"::new()":null,"#to_ary()":null},"proc":{"":null,"::new()":null,"#to_proc()":null}},"twos()":null}},"uagespecs":{"":null,"::":{"blanks()":null,"get_regexp_with_substitution()":null,"non_":{"alphanum_non_space()":null,"paired_delimiters()":null},"paired_delimiters()":null,"punctuations()":null,"white_spaces()":null}}},"leakchecker":{"":null,"::new()":null},"lo":{"_exception":{"":null,"::new()":null},"gger":{"":null,"::":{"formatter":{"":null,"#call()":null,"#format_datetime()":null,"#msg2str()":null,"::new()":null},"logdevice":{"":null,"#add_log_header()":null,"#c":{"heck_shift_log()":null,"lose()":null,"reate_logfile()":null},"#lock_shift_log()":null,"::new()":null,"#open_logfile()":null,"#reopen()":null,"#s":{"et_dev()":null,"hift_log_":{"age()":null,"period()":null}},"#write()":null},"period":{"":null,"#next_rotate_time()":null,"#previous_period_end()":null},"severity":null,"new()":null},"specs":{"":null,"::strip_date()":null}}},"m":{"":null,"d5constants":{"":null,"::klass":null},"osconfig":{"":null,"::new()":null},"spec":{"":null,"main":{"":null,"::new()":null},"option":{"":null,"s":{"":null,"::":{"optionerror":null,"parseerror":null,"new()":null}},"::new()":null},"run":{"":null,"::new()":null},"script":{"":null,"::":{"config()":null,"get()":null,"main()":null,"new()":null,"set()":null}},"tag":{"":null,"::new()":null},"::":{"actions()":null,"clear_":{"current()":null,"expectations()":null,"modes()":null},"current()":null,"de":{"lete_tag":{"()":null,"s()":null},"precate()":null,"scribe()":null},"disable_feature()":null,"each_file()":null,"enable_feature()":null,"ex":{"it_code()":null,"pectation":{"()":null,"?()":null}},"feature_enabled?()":null,"files()":null,"guard":{"()":null,"ed?()":null},"make_tag_dir()":null,"mode?()":null,"pro":{"cess()":null,"tect()":null},"randomize":{"()":null,"?()":null},"re":{"ad_tags()":null,"gister":{"()":null,"_current()":null,"_exit()":null,"_files()":null,"_mode()":null,"_shared()":null,"_tags_patterns()":null},"peat":{"()":null,"=()":null},"trieve":{"()":null,"_shared()":null}},"setup_env()":null,"shuffle()":null,"store()":null,"tags_file()":null,"un":{"guard()":null,"register()":null},"write_tag":{"()":null,"s()":null}}},"ainspecs":{"":null,"::":{"module":null,"wrapincludemodule":null,"call_foo()":null}},"akemakefile":{"":null,"::":{"logging":null,"rbconfig":null,"string_or_failed_format":null}},"apitem":{"":null,"::new()":null},"arshal":{"":null,"spec":{"":null,"::":{"basicobjectsubwithrespondtofalse":{"":null,"#respond_to?()":null},"structwithuserinitialize":{"":null,"::new()":null},"random_data()":null,"reset_swapped_class()":null,"set_swapped_class()":null}},"::":{"dump()":null,"load()":null,"restore()":null}},"at":{"ch":{"filter":{"":null,"::new()":null},"yamlmatcher":{"":null,"::new()":null}},"h":{"":null,"specs":{"":null,"::":{"float":{"":null,"::new()":null,"#to_f()":null},"integer":{"":null,"#to_int()":null},"stringsubclass":null,"userclass":null}},"::":{"domainerror":null,"acos":{"()":null,"h()":null},"asin":{"()":null,"h()":null},"atan":{"()":null,"2()":null,"h()":null},"cbrt()":null,"cos":{"()":null,"h()":null},"erf":{"()":null,"c()":null},"exp()":null,"frexp()":null,"gamma()":null,"hypot()":null,"ldexp()":null,"lgamma()":null,"log":{"()":null,"10()":null,"2()":null},"sin":{"()":null,"h()":null},"sqrt()":null,"tan":{"()":null,"h()":null}}},"rix":{"":null,"::":{"eigenvaluedecomposition":{"":null,"#build_eigenvectors()":null,"#cdiv()":null,"#d":{"()":null,"iagonalize()":null},"#eigenv":{"alue":{"_matrix()":null,"s()":null},"ector":{"_matrix":{"()":null,"_inv()":null},"s()":null}},"#hessenberg_to_real_schur()":null,"::new()":null,"#reduce_to_hessenberg()":null,"#t":{"o_a":{"()":null,"ry()":null},"ridiagonalize()":null},"#v":{"()":null,"_inv()":null}},"lupdecomposition":{"":null,"#det":{"()":null,"erminant()":null},"#l()":null,"::new()":null,"#p()":null,"#s":{"ingular?()":null,"olve()":null},"#to_a":{"()":null,"ry()":null},"#u()":null},"i()":null,"[]()":null,"build()":null,"co":{"lumn":{"_vector()":null,"s()":null},"mbine()":null},"diagonal()":null,"empty()":null,"hstack()":null,"identity()":null,"new()":null,"row":{"_vector()":null,"s()":null},"scalar()":null,"unit()":null,"vstack()":null,"zero()":null},"sub":{"":null,"::ins()":null}}},"doc2man":{"":null,"::":{"mdoc2man()":null,"new()":null}},"et":{"aclassspecs":{"":null,"::":{"a":{"":null,"::cheese()":null},"b":{"":null,"::cheese()":null},"c":{"":null,"::ham()":null},"d":null,"metaclass_of()":null}},"hod":{"":null,"formatter":{"":null,"::new()":null},"matcher":{"":null,"::new()":null},"specs":{"":null,"::":{"a":{"":null,"#baz()":null,"#overridden()":null},"b":{"":null,"etweenbandc":{"":null,"#overridden()":null},"#overridden()":null},"c":{"":null,"#overridden()":null},"d":{"":null,"#bar()":null},"eql":{"2":{"":null,"#same_body()":null},"":null,"#different_body()":null,"#same_body":{"()":null,"_alias()":null,"_private()":null,"_two()":null,"_with_args()":null}},"methods":{"":null,"#bar()":null,"#foo()":null,"#method_missing()":null,"#one_":{"key":{"()":null,"re":{"q()":null,"st()":null}},"opt":{"()":null,"_with_":{"block()":null,"stabby()":null}},"req":{"()":null,"_one_opt":{"()":null,"_with_":{"block()":null,"splat":{"()":null,"_and_block()":null}}},"_two_opt":{"()":null,"_with_":{"block()":null,"splat":{"()":null,"_and_block()":null}}},"_with_":{"block()":null,"splat":{"()":null,"_and_block()":null}}},"splat_":{"one_":{"block()":null,"req":{"()":null,"_with_block()":null}},"two_req()":null},"unnamed_splat()":null},"#respond_to_missing?()":null,"#same_as_foo()":null,"#two_req":{"()":null,"_one_opt":{"()":null,"_with_":{"block()":null,"splat":{"()":null,"_and_block()":null}}},"_with_":{"block()":null,"splat":{"()":null,"_and_block()":null}}},"#zero":{"()":null,"_with_":{"block()":null,"splat":{"()":null,"_and_block()":null}}}},"my":{"mod":{"":null,"#bar()":null},"su":{"b":null,"per":null}},"overrideagain":{"":null,"#overridden()":null},"sourcelocation":{"":null,"#aka()":null,"#original()":null,"::":{"location()":null,"redefined()":null}},"toproc":{"":null,"beta":{"":null,"#method_called()":null,"#to_proc()":null},"#method_called()":null,"#to_proc()":null}}}}},"icrosoft_":{"freethreadedxmldom_1_0":{"":null,"::new()":null},"xml":{"d":{"om_1_0":{"":null,"::new()":null},"so_1_0":{"":null,"::new()":null}},"http_1":{"":null,"::new()":null}}},"ixin":{"":null,"::test()":null},"kspec":{"":null,"::":{"main()":null,"new()":null}},"ock":{"":null,"intobject":{"":null,"::new()":null},"object":{"":null,"::new()":null},"proxy":{"":null,"::new()":null},"::":{"clea":{"nup()":null,"r_replaced()":null},"has_key?()":null,"install_method()":null,"mock":{"_respond_to?()":null,"s()":null},"name_or_inspect()":null,"objects()":null,"re":{"placed":{"?()":null,"_key()":null,"_name()":null},"set()":null},"stubs()":null,"verify_c":{"all()":null,"ount()":null}}},"odule":{"":null,"specs":{"":null,"::":{"a":{"":null,"ddconstant":null,"lias":{"":null,"ing":{"":null,"su":{"bclass":null,"per":{"":null,"::":{"child":{"":null,"#super_call()":null},"parent":{"":null,"#super_call()":null},"redefineafteralias":{"":null,"#alias_super_call()":null,"#super_call()":null},"target":null}}},"::make_alias()":null,"#p":{"r":{"ivate_one()":null,"otected_one()":null},"ublic_":{"one()":null,"two()":null}}},"#publish()":null,"#report()":null},"llonym":null,"lreadyinc":{"":null,"::":{"k":null,"m":{"0":null,"":null}}},"ncestor":{"":null,"#another_method_to_undef()":null,"#method_to_undef()":null},"nonymous":null,"utoload":{"":null,"::":{"dyn":{"class":{"":null,"::c":{"":null,"#loaded()":null}},"module":{"":null,"::d":{"":null,"#loaded()":null}}},"e":{"":null,"x1":{"":null,"::trample":{"1()":null,"2()":null}},"#loaded()":null},"f":{"":null,"romthread":{"":null,"::":{"a":{"":null,"::b":{"":null,"::":{"c":{"":null,"::foo()":null},"foo()":null}}},"d":null}},"::loaded()":null},"g":{"":null,"sub":null,"#loaded()":null},"h":{"":null,"class":null,"#loaded()":null},"khash":null,"loadpath":{"":null,"::loaded()":null},"pp":{"":null,"::qq":null},"q":null,"r":{"":null,"()":null},"s":null,"u":{"":null,"::v":{"":null,"::get_value()":null},"se_ex1()":null},"w":{"":null,"::y":null},"xx":{"":null,"::yy":null},"yy":null,"z":{"":null,"z":null}}},"::cma()":null,"#ma()":null},"b":{"":null,"asic":{"":null,"#p":{"r":{"ivate_module()":null,"otected_module()":null},"ublic_module()":null}},"::cmb()":null,"#mb()":null},"c":{"":null,"vars":{"":null,"::":{"cls()":null,"meta()":null},"#meta()":null},"asecompareonsingleton":{"":null,"::===()":null},"hild":{"2":null,"":null,"privatemethodmadepublic":null,"#p":{"r":{"ivate_child()":null,"otected_child()":null},"ublic_child()":null},"#undefed_child()":null},"lass":{"evaltest":{"":null,"::get_constant_from_scope":{"()":null,"_with_send()":null}},"vars":{"":null,"::":{"a":null,"b":null,"m":null}},"withfoo":{"":null,"#foo()":null}},"ounts":{"child":{"":null,"#p":{"r":{"ivate_1()":null,"otected_1()":null},"ublic_1()":null}},"mixin":{"":null,"#p":{"r":{"ivate_3()":null,"otected_3()":null},"ublic_3()":null}},"parent":{"":null,"#p":{"r":{"ivate_2()":null,"otected_2()":null},"ublic_2()":null}}},"yclic":{"append":{"a":null,"b":null},"barrier":{"":null,"#await()":null,"#disable!()":null,"#enabled?()":null,"::new()":null},"prepend":null}},"detached":null,"extendobject":{"":null,"private":{"":null,"::extend_object()":null},"#test_method()":null},"first":{"":null,"#method_to_remove()":null},"grandchild":null,"in":{"cluded":{"inobject":{"":null,"::includedmodulespecs":null},"module":{"":null,"#foo()":null}},"stancemeth":{"":null,"child":null,"mod":{"":null,"#bar()":null},"#foo()":null},"ternal":null},"lookup":{"":null,"child":null,"mod":{"":null,"inmod":null}},"m":{"1":{"":null,"::":{"a":null,"b":null,"m":null,"u":null,"v":null,"w":null,"x":null,"y":null}},"2":{"":null,"::m":{"1":null,"2":null,"3":null}},"3":{"":null,"::":{"c":{"":null,"#get()":null},"m1":{"":null,"#foo()":null},"m2":{"":null,"#foo()":null},"pm":{"1":{"":null,"#foo()":null},"2":{"":null,"#foo()":null}}},"#get()":null},"":null,"a":null,"b":null,"c":null,"vars":null,"odules":{"":null,"::":{"a":null,"b":null,"c":null,"d":null,"klass":null}},"ultipleincludes":null},"nameencoding":{"":null,"::modulespecs::nameencoding::cß":null,"#name()":null},"nest":{"ed":null,"ing":{"":null,"::":{"nestedclass":{"":null,"::called_from_class_method()":null,"#called_from_inst_method()":null},"[]":{"()":null,"=()":null},"called_from_module_method()":null,"meta()":null}}},"p":{"":null,"arent":{"":null,"privatemethodredef":{"":null,"#private_method_redefined()":null},"#another_":{"method_to_undef()":null,"parent_method()":null},"#method_to_":{"remove()":null,"undef()":null},"#p":{"arent_method()":null,"rivate_parent()":null,"rotected_parent()":null,"ublic_parent()":null},"::p":{"r":{"ivate_method":{"()":null,"_1()":null,"_2()":null},"otected_method_1()":null},"ublic_method":{"()":null,"_1()":null,"_2()":null}},"#undefed_method()":null},"rependedmodule":{"":null,"#foo()":null},"rivconstmodule":null},"re":{"cordincludedmodules":{"":null,"::inherited()":null},"moveclassvariable":null,"openingmodule":{"":null,"#foo":{"()":null,"2()":null},"::foo":{"()":null,"2()":null}}},"second":{"":null,"#method_to_remove()":null},"shadowingouter":{"":null,"::":{"m":null,"n":null}},"singletononmodulecase":{"":null,"::":{"bar":{"":null,"::included_called":{"()":null,"?()":null}},"foo":{"":null,"::included()":null}}},"su":{"b":{"module":{"":null,"::new()":null},"class":{"":null,"spec":null}},"per":{"":null,"::superchild":null,"#p":{"r":{"ivate_super_module()":null,"otected_super_module()":null},"ublic_super_module()":null},"#super_included_method()":null}},"threadsafecounter":{"":null,"#get()":null,"#increment_and_get()":null,"::new()":null},"unboundmethodtest":{"":null,"#foo()":null},"z":null,"without_test_modules()":null}},"::":{"constants()":null,"ne":{"sting()":null,"w()":null},"used_modules()":null}},"onitor":{"":null,"mixin":{"":null,"::":{"conditionvariable":{"":null,"#broadcast()":null,"::":{"timeout":null,"new()":null},"#signal()":null,"#wait":{"()":null,"_until()":null,"_while()":null}},"extend_object()":null,"new()":null}}},"sxml":{"":null,"::new()":null},"ultiformatter":{"":null,"::new()":null},"utex":{"":null,"::new()":null},"yapp":{"":null,"::new()":null},"yclass":{"1forerb_":{"":null,"::new()":null},"4forerb":{"":null,"::new()":null}},"yelem":{"":null,"::new()":null},"::n":null},"nkf":{"":null,"::":{"guess()":null,"nkf()":null}},"name":{"error":{"":null,"specs":{"":null,"::receiverclass":{"":null,"#call_undefined_class_variable()":null}},"::new()":null},"map":{"":null,"specs":{"":null,"::":{"a":{"":null,"::":{"b":{"":null,"#b()":null},"a()":null},"#a()":null,"#c()":null},"error":null,"fixnum":{"":null,"#f()":null},"n()":null}},"::new()":null}},"ne":{"t":{"":null,"::":{"apop":{"":null,"session":null,"#apop?()":null},"ftp":{"":null,"::":{"buffereds":{"slsocket":null,"ocket":null},"mlsxentry":{"":null,"#appendable?()":null,"#creatable?()":null,"#d":{"eletable?()":null,"irectory":{"?()":null,"_makable?()":null}},"#enterable?()":null,"#file?()":null,"#listable?()":null,"::new()":null,"#purgeable?()":null,"#re":{"adable?()":null,"namable?()":null},"#writable?()":null},"nullsocket":null,"default_passive":{"()":null,"=()":null},"new()":null,"open()":null},"connectionerror":null,"error":null,"permerror":null,"protoerror":null,"replyerror":null,"temperror":null,"#a":{"bort()":null,"cct()":null},"#binary=()":null,"#c":{"hdir()":null,"lose":{"()":null,"d?()":null},"onnect()":null},"#d":{"elete()":null,"ir()":null},"#get":{"()":null,"binaryfile()":null,"dir()":null,"textfile()":null},"#help()":null,"#l":{"ist()":null,"ogin()":null,"s()":null},"#m":{"dtm()":null,"kdir()":null,"ls":{"d()":null,"t()":null},"time()":null},"#n":{"lst()":null,"oop()":null},"#p":{"arse_":{"mlsx_entry()":null,"pasv_":{"ipv":{"4_host()":null,"6_host()":null},"port()":null}},"ut":{"()":null,"binaryfile()":null,"textfile()":null},"wd()":null},"#quit()":null,"#r":{"e":{"ad_timeout=()":null,"name()":null,"tr":{"binary()":null,"lines()":null}},"mdir()":null},"#s":{"e":{"ndcmd()":null,"t_socket()":null},"ite()":null,"ize()":null,"ta":{"rt_tls_session()":null,"tus()":null},"tor":{"binary()":null,"lines()":null},"ystem()":null},"#voidcmd()":null},"http":{"":null,"::":{"copy":null,"get":{"":null,"()":null,"_print()":null,"_response()":null},"head":null,"lock":null,"mkcol":null,"move":null,"options":null,"patch":null,"post":{"":null,"()":null,"_form()":null},"put":null,"trace":null,"unlock":null,"pro":{"p":{"find":null,"patch":null},"xy":{"()":null,"_class?()":null}},"de":{"lete":null,"fault_port()":null},"http":{"_default_port()":null,"s_default_port()":null},"is_version_1_2?()":null,"new":{"()":null,"obj()":null},"start()":null,"version_1_2":{"()":null,"?()":null}},"accepted":null,"alreadyreported":null,"bad":{"gateway":null,"re":{"quest":null,"sponse":null}},"clienterror":null,"con":{"flict":null,"tinue":null},"created":null,"error":null,"ex":{"ceptions":null,"pectationfailed":null},"fa":{"ileddependency":null,"talerror":null},"fo":{"rbidden":null,"und":null},"gatewaytimeout":null,"genericrequest":{"":null,"#body":{"=()":null,"_exist?()":null,"_stream=()":null},"#encode_multipart_form_data()":null,"#flush_buffer()":null,"#inspect()":null,"::new()":null,"#quote_string()":null,"#re":{"quest_body_permitted?()":null,"sponse_body_permitted?()":null},"#s":{"end_request_with_body":{"()":null,"_data()":null,"_stream()":null},"upply_default_content_type()":null},"#w":{"ait_for_continue()":null,"rite_header()":null}},"gone":null,"header":{"":null,"syntaxerror":null,"#[]":{"()":null,"=()":null},"#a":{"dd_field()":null,"ppend_field_value()":null},"#basic_":{"auth()":null,"encode()":null},"#c":{"a":{"nonical_each()":null,"pitalize()":null},"hunked?()":null,"on":{"nection_":{"close?()":null,"keep_alive?()":null},"tent_":{"length":{"()":null,"=()":null},"range()":null,"type":{"()":null,"=()":null}}}},"#delete()":null,"#each":{"()":null,"_capitalized":{"()":null,"_name()":null},"_header()":null,"_key()":null,"_name()":null,"_value()":null},"#f":{"etch()":null,"orm_data=()":null},"#get_fields()":null,"#initialize_http_header()":null,"#key?()":null,"#main_type()":null,"#proxy_basic_auth()":null,"#range":{"()":null,"=()":null,"_length()":null},"#s":{"et_":{"content_type()":null,"field()":null,"form":{"()":null,"_data()":null},"range()":null},"ub_type()":null},"#t":{"o_hash()":null,"ype_params()":null}},"imused":null,"in":{"formation":null,"sufficientstorage":null,"ternalservererror":null},"lengthrequired":null,"lo":{"cked":null,"opdetected":null},"methodnotallowed":null,"misdirectedrequest":null,"movedpermanently":null,"multi":{"status":null,"plechoices":null},"networkauthenticationrequired":null,"no":{"content":null,"nauthoritativeinformation":null,"tacceptable":null,"textended":null,"tfound":null,"timplemented":null,"tmodified":null},"ok":null,"pa":{"rtialcontent":null,"ymentrequired":null},"permanentredirect":null,"pr":{"econdition":{"failed":null,"required":null},"ocessing":null,"oxyauthenticationrequired":null},"re":{"direction":null,"quest":{"":null,"entitytoolarge":null,"headerfieldstoolarge":null,"timeout":null,"uritoolong":null,"edrangenotsatisfiable":null,"::new()":null},"setcontent":null,"sponse":{"":null,"#body":{"()":null,"=()":null},"::":{"body_permitted?()":null,"each_response_header()":null,"re":{"ad_status_line()":null,"sponse_class()":null}},"#entity()":null,"#inspect()":null,"#procdest()":null,"#read_body":{"()":null,"_0()":null},"#stream_check()":null,"#value()":null},"triableerror":null},"se":{"eother":null,"rv":{"ere":{"rror":null,"xception":null},"iceunavailable":null}},"success":null,"switchprotocol":null,"temporaryredirect":null,"toomanyrequests":null,"un":{"a":{"uthorized":null,"vailableforlegalreasons":null},"knownresponse":null,"processableentity":null,"supportedmediatype":null},"upgraderequired":null,"useproxy":null,"variantalsonegotiates":null,"versionnotsupported":null,"#a":{"ctive?()":null,"ddr_port()":null},"#begin_transport()":null,"#co":{"n":{"nect()":null,"tinue_timeout=()":null},"py()":null},"#d":{"()":null,"elete()":null,"o_":{"finish()":null,"start()":null}},"#e":{"dit_path()":null,"nd_transport()":null},"#finish()":null,"#get":{"()":null,"2()":null},"#head":{"()":null,"2()":null},"#inspect()":null,"#keep_alive?()":null,"#lock()":null,"#m":{"ax_retries=()":null,"kcol()":null,"ove()":null},"#o":{"n_connect()":null,"ptions()":null},"#p":{"atch()":null,"eer_cert()":null,"ost":{"()":null,"2()":null},"ro":{"p":{"find()":null,"patch()":null},"xy":{"?()":null,"_address()":null,"_from_env?()":null,"_p":{"ass()":null,"ort()":null},"_user()":null,"addr()":null,"port()":null}}},"#re":{"ad_timeout=()":null,"quest":{"()":null,"_get()":null,"_head()":null,"_post()":null}},"#s":{"e":{"nd_":{"entity()":null,"request()":null},"t_debug_output()":null},"spi_auth":{"()":null,"?()":null},"tart":{"()":null,"ed?()":null}},"#tra":{"ce()":null,"nsport_request()":null},"#u":{"nlock()":null,"se_ssl":{"=()":null,"?()":null}}},"imap":{"":null,"::":{"b":{"adresponseerror":null,"odytype":{"attachment":{"":null,"#multipart?()":null},"basic":{"":null,"#m":{"edia_subtype()":null,"ultipart?()":null}},"extension":{"":null,"#multipart?()":null},"message":{"":null,"#m":{"edia_subtype()":null,"ultipart?()":null}},"multipart":{"":null,"#m":{"edia_subtype()":null,"ultipart?()":null}},"text":{"":null,"#m":{"edia_subtype()":null,"ultipart?()":null}}},"yeresponseerror":null},"crammd5authenticator":{"":null,"#hmac_md5()":null,"::new()":null,"#process()":null},"dataformaterror":null,"digestmd5authenticator":{"":null,"#nc()":null,"::new()":null,"#process()":null,"#qdval()":null},"error":null,"flagcounterror":null,"loginauthenticator":{"":null,"::new()":null,"#process()":null},"noresponseerror":null,"numvalidator":{"":null,"::":{"ensure_":{"mod_sequence_value()":null,"number()":null,"nz_number()":null},"valid_":{"mod_sequence_value?()":null,"number?()":null,"nz_number?()":null}}},"plainauthenticator":{"":null,"::new()":null,"#process()":null},"response":{"error":{"":null,"::new()":null},"parseerror":null},"add_authenticator()":null,"de":{"bug":{"()":null,"=()":null},"code_utf7()":null,"fault_":{"imap":{"_port()":null,"s_port()":null},"port()":null,"ssl_port()":null,"tls_port()":null}},"encode_utf7()":null,"format_date":{"()":null,"time()":null},"max_flag_count":{"()":null,"=()":null},"new()":null},"#a":{"dd_response_handler()":null,"ppend()":null,"uthenticate()":null},"#c":{"apability()":null,"heck()":null,"lose()":null,"opy":{"()":null,"_internal()":null},"reate":{"()":null,"_ssl_params()":null}},"#d":{"elete()":null,"isconnect":{"()":null,"ed?()":null}},"#ex":{"amine()":null,"punge()":null},"#fetch":{"()":null,"_internal()":null},"#ge":{"nerate_tag()":null,"t_":{"response()":null,"tagged_response()":null},"tacl()":null,"tquota":{"()":null,"root()":null}},"#idle":{"()":null,"_done()":null},"#l":{"ist()":null,"og":{"in()":null,"out()":null},"sub()":null},"#move()":null,"#no":{"op()":null,"rmalize_searching_criteria()":null},"#put_string()":null,"#re":{"c":{"eive_responses()":null,"ord_response()":null},"move_response_handler()":null,"name()":null},"#s":{"e":{"arch":{"()":null,"_internal()":null},"lect()":null,"nd_":{"command()":null,"data()":null,"li":{"st_data()":null,"teral()":null},"number_data()":null,"quoted_string()":null,"string_data()":null,"symbol_data()":null,"time_data()":null},"tacl()":null,"tquota()":null},"ort":{"()":null,"_internal()":null},"ta":{"rt":{"_tls_session()":null,"tls()":null},"tus()":null},"tore":{"()":null,"_internal()":null},"ubscribe()":null},"#t":{"cp_socket()":null,"hread":{"()":null,"_internal()":null}},"#u":{"id_":{"copy()":null,"fetch()":null,"move()":null,"search()":null,"sort()":null,"store()":null,"thread()":null},"nsubscribe()":null},"#validate_data()":null,"#xlist()":null},"opentimeout":null,"pop":{"3":{"":null,"#a":{"ctive?()":null,"pop?()":null,"uth_only()":null},"::":{"a":{"pop()":null,"uth_only()":null},"certs()":null,"create_ssl_params()":null,"de":{"fault_po":{"p3":{"_port()":null,"s_port()":null},"rt()":null},"lete_all()":null},"disable_ssl()":null,"enable_ssl()":null,"foreach()":null,"new()":null,"ssl_params()":null,"start()":null,"use_ssl?()":null,"verify()":null},"#d":{"elete_all()":null,"isable_ssl()":null},"#e":{"ach":{"()":null,"_mail()":null},"nable_ssl()":null},"#finish()":null,"#inspect()":null,"#logging()":null,"#mails()":null,"#n_":{"bytes()":null,"mails()":null},"#port()":null,"#re":{"ad_timeout=()":null,"set()":null},"#s":{"et_debug_output()":null,"tart":{"()":null,"ed?()":null}},"#use_ssl?()":null},"authenticationerror":null,"badresponse":null,"error":null,"mail":{"":null,"#all()":null,"#delete":{"()":null,"!()":null,"d?()":null},"#header()":null,"#inspect()":null,"#mail()":null,"#pop()":null,"#top()":null,"#u":{"idl()":null,"nique_id()":null}}},"proto":{"autherror":null,"fatalerror":null,"retriableerror":null,"servererror":null,"syntaxerror":null,"unknownerror":null,"cretryerror":null,"co":{"mmanderror":null,"lerror":null}},"readtimeout":null,"smtp":{"":null,"authenticationerror":null,"error":null,"fatalerror":null,"serverbusy":null,"syntaxerror":null,"un":{"knownerror":null,"supportedcommand":null},"#auth":{"_":{"c":{"apable?()":null,"ram_md5()":null},"login()":null,"method()":null,"plain()":null},"enticate()":null},"#base64_encode()":null,"#c":{"apable":{"?()":null,"_auth_types()":null,"_cram_md5_auth?()":null,"_login_auth?()":null,"_plain_auth?()":null,"_starttls?()":null},"heck_":{"auth_":{"args()":null,"continue()":null,"method()":null,"response()":null},"continue()":null,"response()":null},"ram_":{"md5_response()":null,"secret()":null},"ritical()":null},"#d":{"ata()":null,"ebug_output=()":null,"isable_":{"s":{"sl()":null,"tarttls()":null},"tls()":null},"o_":{"finish()":null,"helo()":null,"start()":null}},"::":{"response":{"":null,"#c":{"apabilities()":null,"ontinue?()":null,"ram_md5_challenge()":null},"#exception_class()":null,"#message()":null,"::":{"new()":null,"parse()":null},"#s":{"tatus_type_char()":null,"uccess?()":null}},"default_":{"port()":null,"ssl_":{"context()":null,"port()":null},"submission_port()":null,"tls_port()":null},"new()":null,"start()":null},"#e":{"hlo()":null,"nable_":{"s":{"sl()":null,"tarttls":{"()":null,"_auto()":null}},"tls()":null}},"#finish()":null,"#get":{"_response()":null,"ok()":null},"#helo()":null,"#inspect()":null,"#logging()":null,"#mailfrom()":null,"#new_internet_message_io()":null,"#open_message_stream()":null,"#quit()":null,"#r":{"cptto":{"()":null,"_list()":null},"ead":{"_timeout=()":null,"y()":null},"ecv_response()":null,"set()":null},"#s":{"e":{"nd":{"_m":{"ail()":null,"essage()":null},"mail()":null},"t_debug_output()":null},"sl":{"?()":null,"_socket()":null},"tart":{"()":null,"ed?()":null,"tls":{"()":null,"?()":null,"_a":{"lways?()":null,"uto?()":null}}}},"#t":{"cp_socket()":null,"ls":{"?()":null,"connect()":null}},"#validate_line()":null},"writeadapter":{"":null,"#<<()":null,"#inspect()":null,"::new()":null,"#p":{"rint":{"()":null,"f()":null},"uts()":null},"#write()":null}},"ftpspecs":{"":null,"::dummyftp":{"":null,"#a":{"bor()":null,"cct()":null,"nd_respond()":null,"ppe()":null},"#c":{"dup()":null,"wd()":null},"#dele()":null,"#e":{"prt()":null,"rror_response()":null},"#h":{"andle":{"()":null,"_request()":null},"elp()":null},"#list()":null,"#m":{"dtm()":null,"kd()":null},"::new()":null,"#n":{"lst()":null,"oop()":null},"#p":{"ass()":null,"ort()":null,"wd()":null},"#r":{"e":{"s":{"ponse()":null,"t()":null},"tr()":null},"md()":null,"nfr()":null,"nto()":null},"#s":{"erve_once()":null,"hould_receive()":null,"ite()":null,"ize()":null,"tat()":null,"to":{"p()":null,"r()":null},"yst()":null},"#type()":null,"#user()":null}},"http":{"exceptionsspecs":{"":null,"::simple":null},"headerspecs":{"":null,"::example":{"":null,"::new()":null}},"requestspecs":{"":null,"::testrequest":null},"specs":{"":null,"::":{"nullwriter":{"":null,"#<<()":null,"#p":{"rint":{"()":null,"f()":null},"uts()":null}},"request":{"b":{"asicauthservlet":{"":null,"#reply()":null},"odyservlet":{"":null,"#reply()":null}},"headerservlet":{"":null,"#reply()":null},"servlet":{"":null,"#reply()":null}},"specservlet":{"":null,"#handle()":null},"port()":null,"st":{"art_server()":null,"op_server()":null}}}}},"xtspecs":{"":null,"::":{"block":{"":null,"#method()":null},"loop_":{"next()":null,"within_iter()":null},"until_":{"next()":null,"within_iter()":null},"while_":{"next()":null,"within_iter()":null},"yielding":{"()":null,"_method()":null}}}},"no":{"methoderror":{"":null,"specs":{"":null,"::nomethoderror":{"a":null,"b":null,"c":{"":null,"#a_pr":{"ivate_method()":null,"otected_method()":null}},"d":null}},"::new()":null},"tify":{"":null,"::new()":null}},"nthtoggle":{"":null,"::new()":null},"num":{"2int":{"":null,"::":{"fix2":{"int()":null,"long()":null,"short()":null,"uint()":null,"ulong()":null},"num2":{"int()":null,"ll()":null,"long()":null,"short()":null,"uint()":null,"ul":{"l()":null,"ong()":null},"ushort()":null}}},"eric":{"":null,"mockobject":{"":null,"::new()":null},"specs":{"":null,"::":{"comparison":{"":null,"#<=>()":null},"subclass":{"":null,"#singleton_method_added()":null}}}}},"oleproperty":{"":null,"::new()":null},"ob":{"ject":{"":null,"::":{"c":{"apimodulespecsmodulea":null,"all_foo()":null,"onst":{"antspecs":{"":null,"::container":{"a":{"":null,"::childa":{"":null,"::const20()":null}},"b":{"":null,"::childb":{"":null,"::const211()":null}}}},"_missing()":null}},"importer":null,"parseerror":null,"timeouterror":null,"a_metaclass_eval_method()":null,"allocate()":null,"append_features()":null,"body()":null,"extend":{"_object()":null,"ed()":null},"foo()":null,"get_":{"class":{"()":null,"_name()":null},"result()":null},"in":{"cluded()":null,"herited()":null},"me":{"ssage()":null,"thod_":{"added()":null,"removed()":null,"undefined()":null}},"new()":null,"output=()":null,"prepend":{"_features()":null,"ed()":null},"singleton_method_added()":null,"subclass=()":null,"yaml_tag()":null},"sp":{"ace":{"":null,"::":{"weakmap":{"":null,"#[]":{"()":null,"=()":null},"#each":{"()":null,"_key()":null,"_pair()":null,"_value()":null},"#finalize()":null,"#in":{"clude?()":null,"spect()":null},"#key":{"?()":null,"s()":null},"#length()":null,"#member?()":null,"#size()":null,"#values()":null},"_id2ref()":null,"allocation_":{"class_path()":null,"generation()":null,"method_id()":null,"source":{"file()":null,"line()":null}},"class_name_of()":null,"count_":{"imemo_objects()":null,"nodes()":null,"objects":{"()":null,"_size()":null},"symbols()":null,"tdata_objects()":null},"define_finalizer()":null,"dump":{"()":null,"_all()":null},"each_object()":null,"garbage_collect()":null,"internal":{"objectwrapper":{"":null,"#in":{"spect()":null,"ternal_object_id()":null},"#type()":null},"_class_of()":null,"_super_of()":null},"memsize_of":{"()":null,"_all()":null},"module_refenreces":{"()":null,"_dot()":null,"_image()":null},"object_id_of()":null,"reachable_objects_from":{"()":null,"_root()":null},"trace_object_allocations":{"()":null,"_clear()":null,"_debug_start()":null,"_st":{"art()":null,"op()":null}},"undefine_finalizer()":null},"fixtures":{"":null,"::":{"object":{"tobefound":{"":null,"::new()":null},"withinstancevariable":{"":null,"::new()":null}},"blah()":null,"define_finalizer()":null,"garbage":{"()":null,"_objid()":null},"last_objid()":null,"make_finalizer()":null,"scoped()":null,"to_be_found_symbols()":null}}},"ecdup":{"":null,"initcopy":{"":null,"::new()":null},"::new()":null}},"test":{"":null,"::new()":null}},"servercallbackspecs":{"":null,"::new()":null}},"op":{"en":{"3":{"":null,"::":{"capture":{"2":{"()":null,"e()":null},"3()":null},"pipeline":{"()":null,"_r":{"()":null,"w()":null},"_start()":null,"_w()":null},"popen":{"2":{"()":null,"e()":null},"3()":null}}},"ssl":{"":null,"::":{"asn1":{"":null,"::":{"asn1":{"data":{"":null,"::new()":null,"#to_der()":null},"error":null},"constructive":{"":null,"#each()":null,"::new()":null,"#to_der()":null},"objectid":{"":null,"#l":{"n()":null,"ong_name()":null},"#oid()":null,"::register()":null,"#s":{"hort_name()":null,"n()":null}},"primitive":{"":null,"::new()":null,"#to_der()":null},"decode":{"()":null,"_all()":null},"traverse()":null}},"bn":{"":null,"error":null,"#%()":null,"#*":{"()":null,"*()":null},"#+":{"()":null,"@()":null},"#-":{"()":null,"@()":null},"#/()":null,"#<":{"<()":null,"=>()":null},"#==":{"()":null,"=()":null},"#>>()":null,"#bit_set?()":null,"#c":{"lear_bit!()":null,"mp()":null,"oerce()":null,"opy()":null},"#eql?()":null,"#gcd()":null,"#hash()":null,"#initialize_copy()":null,"#lshift!()":null,"#mod_":{"add()":null,"exp()":null,"inverse()":null,"mul()":null,"sqr()":null,"sub()":null},"::":{"generate_prime()":null,"new()":null},"#n":{"egative?()":null,"um_b":{"its()":null,"ytes()":null}},"#o":{"dd?()":null,"ne?()":null},"#pr":{"etty_print()":null,"ime":{"?()":null,"_fasttest?()":null}},"#rshift!()":null,"#s":{"et_bit!()":null,"qr()":null},"#to_":{"bn()":null,"i()":null,"int()":null,"s()":null},"#ucmp()":null,"#zero?()":null},"buffering":{"":null,"#<<()":null,"#c":{"lose()":null,"onsume_rbuff()":null},"#do_write()":null,"#e":{"ach":{"()":null,"_byte()":null,"_line()":null},"of":{"()":null,"?()":null}},"#f":{"ill_rbuff()":null,"lush()":null},"#get":{"c()":null,"s()":null},"::new()":null,"#p":{"rint":{"()":null,"f()":null},"uts()":null},"#read":{"()":null,"_nonblock()":null,"char()":null,"line":{"()":null,"s()":null},"partial()":null},"#ungetc()":null,"#write":{"()":null,"_nonblock()":null}},"cipher":{"":null,"#auth":{"_":{"data=()":null,"tag":{"()":null,"=()":null,"_len=()":null}},"enticated?()":null},"#block_size()":null,"#decrypt()":null,"#encrypt()":null,"#final()":null,"#i":{"nitialize_copy()":null,"v=()":null,"v_len":{"()":null,"=()":null}},"#key":{"=()":null,"_len":{"()":null,"=()":null}},"#name()":null,"::":{"cipher":{"":null,"error":null,"s()":null},"new()":null},"#p":{"adding=()":null,"kcs5_keyivgen()":null},"#r":{"andom_":{"iv()":null,"key()":null},"eset()":null},"#update()":null},"config":{"":null,"error":null,"#[]":{"()":null,"=()":null},"#add_value()":null,"#check_modify()":null,"#each()":null,"::":{"clear_comments()":null,"extract_reference()":null,"get_":{"definition()":null,"line()":null},"new()":null,"parse":{"()":null,"_config":{"()":null,"_lines()":null}},"unescape_value()":null},"#get_":{"key_string()":null,"value()":null},"#in":{"itialize_copy()":null,"spect()":null},"#sections()":null,"#to_s()":null},"digest":{"":null,"#<<()":null,"()":null,"#block_length()":null,"#digest_length()":null,"#finish()":null,"#initialize_copy()":null,"#name()":null,"::":{"digest":{"error":null,"()":null},"new()":null},"#reset()":null,"#update()":null},"engine":{"":null,"::":{"by_id()":null,"cleanup()":null,"engine":{"error":null,"s()":null},"load()":null},"#c":{"ipher()":null,"mds()":null,"trl_cmd()":null},"#digest()":null,"#finish()":null,"#i":{"d()":null,"nspect()":null},"#load_p":{"rivate_key()":null,"ublic_key()":null},"#name()":null,"#set_default()":null},"extconfig":null,"hmac":{"":null,"error":null,"#<<()":null,"#digest()":null,"::":{"digest()":null,"hexdigest()":null,"new()":null},"#hexdigest()":null,"#in":{"itialize_copy()":null,"spect()":null},"#reset()":null,"#to_s()":null,"#update()":null},"kdf":{"":null,"::":{"kdferror":null,"hkdf()":null,"pbkdf2_hmac()":null,"scrypt()":null}},"netscape":{"":null,"::spki":{"":null,"error":null,"#challenge":{"()":null,"=()":null},"::new()":null,"#public_key":{"()":null,"=()":null},"#sign()":null,"#to_":{"der()":null,"pem()":null,"s()":null,"text()":null},"#verify()":null}},"ocsp":{"":null,"::":{"basicresponse":{"":null,"#add_":{"nonce()":null,"status()":null},"#copy_nonce()":null,"#find_response()":null,"#initialize_copy()":null,"::new()":null,"#responses()":null,"#s":{"ign()":null,"tatus()":null},"#to_der()":null,"#verify()":null},"certificateid":{"":null,"#cmp":{"()":null,"_issuer()":null},"#hash_algorithm()":null,"#i":{"nitialize_copy()":null,"ssuer_":{"key_hash()":null,"name_hash()":null}},"::new()":null,"#serial()":null,"#to_der()":null},"ocsperror":null,"re":{"quest":{"":null,"#add_":{"certid()":null,"nonce()":null},"#c":{"ertid()":null,"heck_nonce()":null},"#initialize_copy()":null,"::new()":null,"#sign":{"()":null,"ed?()":null},"#to_der()":null,"#verify()":null},"sponse":{"":null,"#basic()":null,"#initialize_copy()":null,"::":{"create()":null,"new()":null},"#status":{"()":null,"_string()":null},"#to_der()":null}},"singleresponse":{"":null,"#c":{"ert":{"_status()":null,"id()":null},"heck_validity()":null},"#extensions()":null,"#initialize_copy()":null,"::new()":null,"#next_update()":null,"#revocation_":{"reason()":null,"time()":null},"#t":{"his_update()":null,"o_der()":null}}}},"opensslerror":null,"pk":{"cs":{"5":{"":null,"#pbkdf2_hmac":{"()":null,"_sha1()":null}},"7":{"":null,"::":{"pkcs7error":null,"encrypt()":null,"new()":null,"re":{"cipientinfo":{"":null,"#enc_key()":null,"#issuer()":null,"::new()":null,"#serial()":null},"ad_smime()":null},"sign":{"erinfo":{"":null,"#issuer()":null,"#name()":null,"::new()":null,"#s":{"erial()":null,"igned_time()":null}},"()":null},"write_smime()":null},"#add_":{"c":{"ertificate()":null,"rl()":null},"data()":null,"recipient()":null,"signer()":null},"#c":{"ertificates":{"()":null,"=()":null},"ipher=()":null,"rls":{"()":null,"=()":null}},"#d":{"ata=()":null,"ecrypt()":null,"etached":{"()":null,"=()":null,"?()":null}},"#initialize_copy()":null,"#recipients()":null,"#signers()":null,"#t":{"o_":{"der()":null,"pem()":null,"s()":null},"ype":{"()":null,"=()":null}},"#verify()":null},"12":{"":null,"::":{"pkcs12error":null,"create()":null,"new()":null},"#initialize_copy()":null,"#to_der()":null}},"ey":{"":null,"::":{"d":{"h":{"":null,"error":null,"#compute_key()":null,"#export()":null,"#generate_key!()":null,"#initialize_copy()":null,"::":{"generate()":null,"new()":null},"#p":{"arams":{"()":null,"_ok?()":null},"rivate?()":null,"ublic":{"?()":null,"_key()":null}},"#set_":{"key()":null,"pqg()":null},"#to_":{"der()":null,"pem()":null,"s()":null,"text()":null}},"sa":{"":null,"error":null,"#export()":null,"#initialize_copy()":null,"::":{"generate()":null,"new()":null},"#p":{"arams()":null,"rivate?()":null,"ublic":{"?()":null,"_key()":null}},"#s":{"et_":{"key()":null,"pqg()":null},"ys":{"sign()":null,"verify()":null}},"#to_":{"der()":null,"pem()":null,"s()":null,"text()":null}}},"ec":{"":null,"::":{"group":{"":null,"#==()":null,"#asn1_flag":{"()":null,"=()":null},"#c":{"ofactor()":null,"urve_name()":null},"#degree()":null,"#eql?()":null,"#generator()":null,"#initialize_copy()":null,"::":{"error":null,"new()":null},"#order()":null,"#point_conversion_form":{"()":null,"=()":null},"#se":{"ed":{"()":null,"=()":null},"t_generator()":null},"#to_":{"der()":null,"pem()":null,"text()":null}},"point":{"":null,"#==()":null,"#eql?()":null,"#in":{"finity?()":null,"itialize_copy()":null,"vert!()":null},"#m":{"ake_affine!()":null,"ul()":null},"::":{"error":null,"new()":null},"#on_curve?()":null,"#set_to_infinity!()":null,"#to_":{"bn()":null,"octet_string()":null}},"builtin_curves()":null,"generate()":null,"new()":null},"error":null,"#check_key()":null,"#d":{"h_compute_key()":null,"sa_":{"sign_asn1()":null,"verify_asn1()":null}},"#export()":null,"#g":{"enerate_key":{"()":null,"!()":null},"roup":{"()":null,"=()":null}},"#initialize_copy()":null,"#p":{"rivate":{"?()":null,"_key":{"()":null,"=()":null,"?()":null}},"ublic":{"?()":null,"_key":{"()":null,"=()":null,"?()":null}}},"#to_":{"der()":null,"pem()":null,"text()":null}},"pkey":{"":null,"error":null,"::new()":null,"#sign()":null,"#verify()":null},"rsa":{"":null,"error":null,"#blinding_o":{"ff!()":null,"n!()":null},"#export()":null,"#initialize_copy()":null,"::":{"generate()":null,"new()":null},"#p":{"arams()":null,"rivate":{"?()":null,"_decrypt()":null,"_encrypt()":null},"ublic":{"?()":null,"_decrypt()":null,"_encrypt()":null,"_key()":null}},"#s":{"et_":{"crt_params()":null,"factors()":null,"key()":null},"ign_pss()":null},"#to_":{"der()":null,"pem()":null,"s()":null,"text()":null},"#verify_pss()":null},"read()":null}}},"random":{"":null,"::":{"egd":{"()":null,"_bytes()":null},"load_random_file()":null,"pseudo_bytes()":null,"random":{"error":null,"_add()":null,"_bytes()":null},"seed()":null,"status?()":null,"write_random_file()":null}},"ssl":{"":null,"#verify_certificate_identity()":null,"::":{"s":{"sl":{"context":{"":null,"#add_certificate()":null,"#ciphers":{"()":null,"=()":null},"#e":{"cdh_curves=()":null,"nable_fallback_scsv()":null},"#f":{"lush_sessions()":null,"reeze()":null},"#m":{"ax_version=()":null,"in_version=()":null},"::new()":null,"#options":{"()":null,"=()":null},"#s":{"e":{"curity_level":{"()":null,"=()":null},"ssion_":{"add()":null,"cache_":{"mode":{"()":null,"=()":null},"size":{"()":null,"=()":null},"stats()":null},"remove()":null},"t_":{"minmax_proto_version()":null,"params()":null},"tup()":null},"sl_version=()":null}},"error":{"":null,"wait":{"readable":null,"writable":null}},"server":{"":null,"#accept()":null,"#close()":null,"#listen()":null,"::new()":null,"#shutdown()":null,"#to_io()":null},"socket":{"":null,"#a":{"ccept":{"()":null,"_nonblock()":null},"lpn_protocol()":null},"#c":{"ert()":null,"ipher()":null,"lient_c":{"a()":null,"ert_cb()":null},"onnect":{"()":null,"_nonblock()":null}},"#hostname=()":null,"::new()":null,"#npn_protocol()":null,"#p":{"e":{"er_cert":{"()":null,"_chain()":null},"nding()":null},"ost_connection_check()":null},"#s":{"ession":{"()":null,"=()":null,"_get_cb()":null,"_new_cb()":null,"_reused?()":null},"sl_version()":null,"tate()":null,"top()":null,"ys":{"close()":null,"read":{"()":null,"_nonblock()":null},"write":{"()":null,"_nonblock()":null}}},"#tmp_":{"dh_callback()":null,"ecdh_callback()":null,"key()":null},"#using_anon_cipher?()":null,"#verify_result()":null}},"ession":{"":null,"#==()":null,"#i":{"d()":null,"nitialize_copy()":null},"::":{"sessionerror":null,"new()":null},"#t":{"ime":{"()":null,"=()":null,"out":{"()":null,"=()":null}},"o_":{"der()":null,"pem()":null,"text()":null}}},"ocketforwarder":{"":null,"#addr()":null,"#closed?()":null,"#do_not_reverse_lookup=()":null,"#fcntl()":null,"#getsockopt()":null,"#peeraddr()":null,"#setsockopt()":null}},"verify_certificate_identity()":null}},"x509":{"":null,"::":{"attribute":{"":null,"error":null,"#==()":null,"#initialize_copy()":null,"::new()":null,"#oid":{"()":null,"=()":null},"#to_der()":null,"#value":{"()":null,"=()":null}},"crl":{"":null,"error":null,"#==()":null,"#add_":{"extension()":null,"revoked()":null},"#extensions":{"()":null,"=()":null},"#i":{"nitialize_copy()":null,"ssuer":{"()":null,"=()":null}},"#last_update":{"()":null,"=()":null},"::new()":null,"#next_update":{"()":null,"=()":null},"#revoked":{"()":null,"=()":null},"#sign":{"()":null,"ature_algorithm()":null},"#to_":{"der()":null,"pem()":null,"s()":null,"text()":null},"#ver":{"ify()":null,"sion":{"()":null,"=()":null}}},"certificate":{"":null,"error":null,"#==()":null,"#add_extension()":null,"#check_private_key()":null,"#extensions":{"()":null,"=()":null},"#i":{"n":{"itialize_copy()":null,"spect()":null},"ssuer":{"()":null,"=()":null}},"::new()":null,"#not_":{"after":{"()":null,"=()":null},"before":{"()":null,"=()":null}},"#p":{"retty_print()":null,"ublic_key":{"()":null,"=()":null}},"#s":{"erial":{"()":null,"=()":null},"ign":{"()":null,"ature_algorithm()":null},"ubject":{"()":null,"=()":null}},"#to_":{"der()":null,"pem()":null,"s()":null,"text()":null},"#ver":{"ify()":null,"sion":{"()":null,"=()":null}}},"extension":{"":null,"error":null,"factory":{"":null,"#cr":{"eate_ext":{"()":null,"_from_":{"array()":null,"hash()":null,"string()":null},"ension()":null},"l=()":null},"#issuer_certificate=()":null,"::new()":null,"#subject_":{"certificate=()":null,"request=()":null}},"#==()":null,"#critical":{"=()":null,"?()":null},"#initialize_copy()":null,"::new()":null,"#oid":{"()":null,"=()":null},"#to_":{"a()":null,"der()":null,"h()":null,"s()":null},"#value":{"()":null,"=()":null}},"name":{"":null,"error":null,"#<=>()":null,"#add_entry()":null,"#cmp()":null,"#eql?()":null,"#hash":{"()":null,"_old()":null},"#initialize_copy()":null,"::":{"rfc2253dn":{"":null,"#expand_":{"hexstring()":null,"pair()":null,"value()":null},"#scan()":null},"new()":null,"parse":{"()":null,"_openssl()":null,"_rfc2253()":null}},"#pretty_print()":null,"#to_":{"a()":null,"der()":null,"s()":null,"utf8()":null}},"re":{"quest":{"":null,"error":null,"#==()":null,"#a":{"dd_attribute()":null,"ttributes":{"()":null,"=()":null}},"#initialize_copy()":null,"::new()":null,"#public_key":{"()":null,"=()":null},"#s":{"ign":{"()":null,"ature_algorithm()":null},"ubject":{"()":null,"=()":null}},"#to_":{"der()":null,"pem()":null,"s()":null,"text()":null},"#ver":{"ify()":null,"sion":{"()":null,"=()":null}}},"voked":{"":null,"error":null,"#==()":null,"#add_extension()":null,"#extensions":{"()":null,"=()":null},"#initialize_copy()":null,"::new()":null,"#serial":{"()":null,"=()":null},"#t":{"ime":{"()":null,"=()":null},"o_der()":null}}},"store":{"":null,"context":{"":null,"#c":{"hain()":null,"leanup()":null,"urrent_c":{"ert()":null,"rl()":null}},"#error":{"()":null,"=()":null,"_depth()":null,"_string()":null},"#flags=()":null,"::new()":null,"#purpose=()":null,"#t":{"ime=()":null,"rust=()":null},"#verify()":null},"error":null,"#add_":{"c":{"ert()":null,"rl()":null},"file()":null,"path()":null},"#flags=()":null,"::new()":null,"#orig_add_file()":null,"#purpose=()":null,"#set_default_paths()":null,"#t":{"ime=()":null,"rust=()":null},"#verify":{"()":null,"_callback=()":null}}}},"check_func":{"()":null,"_or_macro()":null},"de":{"bug":{"()":null,"=()":null},"precated_warning_flag()":null},"errors()":null,"fips_mode":{"()":null,"=()":null},"mem_check_start()":null,"print_mem_leaks()":null}},"struct":{"":null,"specs":{"":null,"::openstructsub":null},"::":{"json_create()":null,"new()":null}},"uri":{"":null,"::":{"http":{"error":{"":null,"::new()":null},"redirect":{"":null,"::new()":null}},"meta":{"":null,"#c":{"harset()":null,"ontent_":{"encoding()":null,"type()":null}},"#last_modified()":null},"openread":{"":null,"#open()":null,"#read()":null}}}},"tionparser":{"":null,"::":{"a":{"c":{"":null,"#_":{"ac_arg_enable()":null,"check_ac_args()":null},"#ac_arg_":{"disable()":null,"enable()":null,"with()":null},"cept":{"ables":null,"()":null}},"mbiguous":{"argument":null,"option":null},"rguable":{"":null,"#getopts()":null,"::":{"extend_object()":null,"new()":null},"#o":{"ptions":{"()":null,"=()":null},"rder!()":null},"#p":{"arse!()":null,"ermute!()":null}}},"completi":{"nghash":{"":null,"#match()":null},"on":{"":null,"#c":{"andidate()":null,"omplete()":null,"onvert()":null},"::":{"candidate()":null,"regexp()":null}}},"list":{"":null,"#a":{"ccept()":null,"ppend()":null},"#complete()":null,"#each_option()":null,"::new()":null,"#prepend()":null,"#reject()":null,"#s":{"earch()":null,"ummarize()":null},"#update()":null},"missingargument":null,"optionmap":null,"parseerror":{"":null,"#inspect()":null,"#message()":null,"::":{"filter_backtrace()":null,"new()":null},"#re":{"ason()":null,"cover()":null},"#set_":{"backtrace()":null,"option()":null},"#to_s()":null},"switch":{"":null,"::":{"noargument":{"":null,"#parse()":null,"::":{"incompatible_argument_styles()":null,"pattern()":null}},"optionalargument":{"":null,"#parse()":null},"placedargument":{"":null,"#parse()":null},"requiredargument":{"":null,"#parse()":null},"guess()":null,"incompatible_argument_styles()":null,"new()":null,"pattern()":null},"#conv_arg()":null,"#parse_arg()":null,"#s":{"ummarize()":null,"witch_name()":null}},"each_const()":null,"getopts()":null,"in":{"valid":{"argument":null,"option":null},"c()":null},"ne":{"edlessargument":null,"w()":null},"reject()":null,"search_const()":null,"show_version()":null,"terminate()":null,"top()":null,"with()":null}}},"output":{"matcher":{"":null,"::new()":null},"tofdmatcher":{"":null,"::new()":null}},"pp":{"":null,"::":{"pp":{"methods":{"":null,"#c":{"heck_inspect_key()":null,"omma_breakable()":null},"#guard_inspect_key()":null,"#object_":{"address_group()":null,"group()":null},"#p":{"op_inspect_key()":null,"p()":null,"p_":{"hash()":null,"object()":null},"ush_inspect_key()":null},"#seplist()":null},"()":null},"singleline_pp()":null}},"pty":{"":null,"::":{"ch":{"ildexited":{"":null,"#status()":null},"eck()":null},"getpty()":null,"open()":null,"spawn()":null}},"pa":{"rent":null,"thname":{"":null,"::":{"g":{"etwd()":null,"lob()":null},"new()":null,"pwd()":null}}},"pi":{"digitspigot":{"":null,"::new()":null},"ece":{"":null,"::new()":null}},"pla":{"ne":{"":null,"t":{"":null,"::new()":null},"::new()":null},"tformguard":{"":null,"::":{"implementation?()":null,"new()":null,"os?()":null,"standard?()":null,"windows?()":null,"wordsize?()":null}}},"point":{"":null,"::new()":null},"pr":{"e":{"cedencespecs":{"":null,"::nonunaryoptest":{"":null,"#add_":{"num()":null,"str()":null,"var()":null},"#sub_num()":null}},"ttyprint":{"":null,"::":{"singleline":{"":null,"#breakable()":null,"#first?()":null,"#group()":null,"::new()":null,"_format()":null,"#text()":null},"format()":null,"new()":null}}},"ime":{"":null,"::":{"eratosthenes":{"generator":{"":null,"::new()":null,"#next()":null,"#rewind()":null,"#succ()":null},"sieve":{"":null,"#compute_primes()":null,"#get_nth_prime()":null,"::new()":null}},"generator23":{"":null,"::new()":null,"#next()":null,"#rewind()":null,"#succ()":null},"pseudoprimegenerator":{"":null,"#each()":null,"::new()":null,"#next()":null,"#rewind()":null,"#s":{"ize()":null,"ucc()":null},"#upper_bound":{"()":null,"=()":null},"#with_":{"index()":null,"object()":null}},"trialdivision":{"":null,"generator":{"":null,"::new()":null,"#next()":null,"#rewind()":null,"#succ()":null},"#[]()":null,"#cache()":null,"#primes":{"()":null,"_so_far()":null}}}},"ivate":{"":null,"::":{"a":{"":null,"#bar()":null,"#foo()":null},"b":{"":null,"#bar()":null,"#foo()":null,"::":{"c":{"":null,"#baz()":null},"private_class_method1()":null,"public_":{"class_method1()":null,"defs_method()":null}}},"d":{"":null,"#foo()":null},"e":null,"g":{"":null,"#foo()":null},"h":null}},"oc":{"":null,"specs":{"":null,"::":{"arity":{"":null,"#arity_check()":null},"myproc":{"2":{"":null,"::new()":null},"":null},"sourcelocation":{"":null,"::my_":{"detached_":{"lambda()":null,"proc":{"()":null,"_new()":null}},"lambda()":null,"method()":null,"multiline_":{"lambda()":null,"proc":{"()":null,"_new()":null}},"proc":{"()":null,"_new()":null}}},"toaryasnil":{"":null,"#to_ary()":null},"new_proc_":{"from_amp()":null,"in_method()":null,"subclass_in_method()":null},"proc":{"subclass":null,"_for_1()":null}}},"ess":{"":null,"::":{"gid":{"":null,"::":{"change_privilege()":null,"eid()":null,"from_name()":null,"grant_privilege()":null,"re_exchange":{"()":null,"able?()":null},"rid()":null,"sid_available?()":null,"switch()":null},"()":null,"=()":null},"status":{"":null,"#&()":null,"#==()":null,"#>>()":null,"#coredump?()":null,"#exit":{"ed?()":null,"status()":null},"#inspect()":null,"#pid()":null,"#s":{"ignaled?()":null,"top":{"ped?()":null,"sig()":null},"uccess?()":null},"#t":{"ermsig()":null,"o_":{"i()":null,"s()":null}}},"sys":{"":null,"::":{"get":{"e":{"gid()":null,"uid()":null},"gid()":null,"uid()":null},"issetugid()":null,"set":{"e":{"gid()":null,"uid()":null},"gid()":null,"re":{"gid()":null,"sgid()":null,"suid()":null,"uid()":null},"rgid()":null,"ruid()":null,"uid()":null}}},"uid":{"":null,"::":{"change_privilege()":null,"eid()":null,"from_name()":null,"grant_privilege()":null,"re_exchange":{"()":null,"able?()":null},"rid()":null,"sid_available?()":null,"switch()":null},"()":null,"=()":null},"abort()":null,"argv0()":null,"clock_get":{"res()":null,"time()":null},"daemon()":null,"detach()":null,"egid":{"()":null,"=()":null},"euid":{"()":null,"=()":null},"ex":{"ec()":null,"it":{"()":null,"!()":null}},"fork()":null,"get":{"p":{"g":{"id()":null,"rp()":null},"riority()":null},"rlimit()":null,"sid()":null},"groups":{"()":null,"=()":null},"initgroups()":null,"kill()":null,"last_status()":null,"maxgroups":{"()":null,"=()":null},"pid()":null,"ppid()":null,"set":{"p":{"g":{"id()":null,"rp()":null},"riority()":null,"roctitle()":null},"rlimit()":null,"sid()":null},"spawn()":null,"times()":null,"wait":{"er":{"":null,"#pid()":null},"()":null,"2()":null,"all()":null,"pid":{"()":null,"2()":null}}},"specs":{"":null,"::":{"daemon":{"":null,"izer":{"":null,"#invoke()":null,"::new()":null,"#wait_for_daemon()":null},"#daemon":{"_at_exit()":null,"izing_at_exit()":null},"#keep_stdio_open_":{"f":{"alse_std":{"err()":null,"in()":null,"out()":null},"iles()":null},"true_std":{"err()":null,"in()":null,"out()":null}},"::new()":null,"#p":{"id()":null,"rocess_group()":null},"#r":{"eturn_value()":null,"un()":null},"#stay_in_dir()":null,"#write()":null},"signalizer":{"":null,"#cleanup()":null,"::new()":null,"#result()":null,"#wait_on_result()":null},"use_system_ruby()":null}}},"::new()":null},"ofilef":{"ilter":{"":null,"::new()":null},"ormatter":{"":null,"::new()":null}},"ogress":{"":null,"::":{"rotator":{"":null,"#f":{"ailed_string()":null,"inish_string()":null},"#init_string()":null,"#passed_string()":null},"new()":null}}},"ps":{"tore":{"":null,"::":{"error":null,"new()":null}},"ych":{"":null,"::":{"badalias":null,"classloader":{"":null,"::restricted":{"":null,"#find()":null,"::new()":null,"#symbolize()":null},"#path2class()":null},"coder":{"":null,"#[]":{"()":null,"=()":null},"#add()":null,"#map":{"()":null,"=()":null},"::new()":null,"#represent_":{"map()":null,"object()":null,"scalar()":null,"seq()":null},"#s":{"calar":{"()":null,"=()":null},"eq=()":null}},"disallowedclass":{"":null,"::new()":null},"emitter":{"":null,"#alias()":null,"#canonical":{"()":null,"=()":null},"#end_":{"document()":null,"mapping()":null,"sequence()":null,"stream()":null},"#indentation":{"()":null,"=()":null},"#line_width":{"()":null,"=()":null},"::new()":null,"#s":{"calar()":null,"tart_":{"document()":null,"mapping()":null,"sequence()":null,"stream()":null}}},"exception":null,"handler":{"":null,"::dumperoptions":{"":null,"::new()":null},"s":{"":null,"::recorder":{"":null,"::new()":null}},"#alias()":null,"#e":{"mpty()":null,"nd_":{"document()":null,"mapping()":null,"sequence()":null,"stream()":null},"vent_location()":null},"#s":{"calar()":null,"tart_":{"document()":null,"mapping()":null,"sequence()":null,"stream()":null},"treaming?()":null}},"json":{"":null,"::":{"stream":null,"treebuilder":null}},"nodes":{"":null,"::":{"alias":{"":null,"::new()":null},"document":{"":null,"::new()":null,"#root()":null},"mapping":{"":null,"::new()":null},"node":{"":null,"#each()":null,"::new()":null,"#t":{"o_":{"ruby()":null,"yaml()":null},"ransform()":null},"#yaml()":null},"scalar":{"":null,"::new()":null},"sequence":{"":null,"::new()":null},"stream":{"":null,"::new()":null}}},"omap":null,"scalarscanner":{"":null,"::new()":null,"#parse_":{"int()":null,"time()":null},"#tokenize()":null},"set":null,"stream":{"":null,"ing":{"":null,"::classmethods":{"":null,"#new()":null},"#register()":null,"#start()":null}},"syntaxerror":{"":null,"::new()":null},"treebuilder":{"":null,"#alias()":null,"#e":{"nd_":{"document()":null,"stream()":null},"vent_location()":null},"::new()":null,"#p":{"op()":null,"ush()":null},"#s":{"calar()":null,"et_":{"end_location()":null,"location()":null,"start_location()":null},"tart_":{"document()":null,"stream()":null}}},"visitors":{"":null,"::":{"depthfirst":{"":null,"#nary()":null,"::new()":null,"#terminal()":null,"#visit_psych_nodes_":{"alias()":null,"document()":null,"mapping()":null,"scalar()":null,"sequence()":null,"stream()":null}},"emitter":{"":null,"::new()":null,"#visit_psych_nodes_":{"alias()":null,"document()":null,"mapping()":null,"scalar()":null,"sequence()":null,"stream()":null}},"jsontree":{"":null,"#accept()":null,"::create()":null},"noaliasruby":{"":null,"#visit_psych_nodes_alias()":null},"toruby":{"":null,"#accept()":null,"#build_exception()":null,"#deserialize()":null,"#init_with()":null,"#merge_key()":null,"::":{"create()":null,"new()":null},"#re":{"gister":{"()":null,"_empty()":null},"solve_class()":null,"vive":{"()":null,"_hash()":null}},"#visit_psych_nodes_":{"alias()":null,"document()":null,"mapping()":null,"scalar()":null,"sequence()":null,"stream()":null}},"visitor":{"":null,"#accept()":null,"#visit()":null},"yamltree":{"":null,"#<<()":null,"#accept()":null,"#binary?()":null,"#dump_":{"coder()":null,"ivars()":null,"list()":null},"#emit_coder()":null,"#f":{"inish()":null,"ormat_time()":null},"::":{"create()":null,"new()":null},"#p":{"rivate_iv_get()":null,"ush()":null},"#register()":null,"#start()":null,"#tree()":null,"#visit_":{"basicobject()":null,"bigdecimal()":null,"class()":null,"complex()":null,"date":{"()":null,"time()":null},"delegator()":null,"en":{"coding()":null,"umerator()":null},"exception()":null,"falseclass()":null,"float()":null,"integer()":null,"module()":null,"nameerror()":null,"nilclass()":null,"object()":null,"psych_":{"omap()":null,"set()":null},"ra":{"nge()":null,"tional()":null},"regexp()":null,"str":{"ing()":null,"uct()":null},"symbol()":null,"time()":null,"trueclass()":null,"array":{"()":null,"_subclass()":null},"hash":{"()":null,"_subclass()":null}}}}},"dump":{"()":null,"_stream()":null},"libyaml_version()":null,"load":{"()":null,"_file()":null,"_stream()":null},"parse":{"r":{"":null,"#mark()":null,"::":{"mark":null,"new()":null},"#parse()":null,"()":null},"()":null,"_file()":null,"_stream()":null},"safe_load()":null,"to_json()":null}}},"queue":{"":null,"::new()":null},"rdoc":{"":null,"::":{"a":{"lias":{"":null,"#<=>()":null,"#aref()":null,"#full_old_name()":null,"#html_name()":null,"#name_prefix()":null,"::new()":null,"#pretty_":{"n":{"ame()":null,"ew_name()":null},"old_name()":null}},"nonclass":null,"nymethod":{"":null,"#a":{"dd_alias()":null,"ref_prefix()":null,"rglists()":null},"#call_seq=()":null,"#marshal_":{"dump()":null,"load()":null},"#name()":null,"::new()":null,"#param_":{"list()":null,"seq()":null},"#s":{"tore=()":null,"uperclass_method()":null}},"ttr":{"":null,"#==()":null,"#a":{"dd_alias()":null,"ref_prefix()":null},"#definition()":null,"#marshal_":{"dump()":null,"load()":null},"::new()":null}},"classmodule":{"":null,"#a":{"dd_comment()":null,"ncestors()":null,"ref()":null},"#c":{"lear_comment()":null,"omplete()":null},"#d":{"escription()":null,"irect_ancestors()":null,"ocument":{"_self_or_methods()":null,"ed?()":null}},"#each_ancestor()":null,"#f":{"ind_":{"ancestor_local_symbol()":null,"class_named()":null},"ull_name()":null},"#m":{"erge()":null,"odule?()":null},"::":{"from_module()":null,"new()":null},"#n":{"ame":{"=()":null,"_for_path()":null},"on_aliases()":null},"#pa":{"rse()":null,"th()":null},"#remove_nodoc_children()":null,"#s":{"earch_record()":null,"tore=()":null,"uperclass":{"()":null,"=()":null}},"#type()":null,"#update_":{"aliases()":null,"extends()":null,"includes()":null}},"co":{"deobject":{"":null,"#comment=()":null,"#d":{"isplay?()":null,"ocument":{"_":{"children=()":null,"self=()":null},"ed?()":null},"one_documenting=()":null},"#each_parent()":null,"#f":{"ile_name()":null,"orce_documentation=()":null,"ull_name=()":null},"#ignore":{"()":null,"d?()":null},"::new()":null,"#options()":null,"#parent":{"()":null,"_file_name()":null,"_name()":null},"#record_location()":null,"#s":{"ection()":null,"tart_doc()":null,"to":{"p_doc()":null,"re=()":null},"uppress":{"()":null,"ed?()":null}}},"mment":{"":null,"#e":{"mpty?()":null,"ncode!()":null,"xtract_call_seq()":null},"#format=()":null,"::new()":null,"#normalize()":null,"#parse()":null,"#remove_private()":null,"#t":{"ext=()":null,"omdoc?()":null}},"nstant":{"":null,"#<=>()":null,"#==()":null,"#documented?()":null,"#full_name()":null,"#is_alias_for()":null,"#marshal_":{"dump()":null,"load()":null},"::new()":null,"#path()":null,"#store=()":null},"ntext":{"":null,"#<=>()":null,"#a":{"dd":{"()":null,"_a":{"lias()":null,"ttribute()":null},"_c":{"lass":{"()":null,"_or_module()":null},"onstant()":null},"_extend()":null,"_include()":null,"_m":{"ethod()":null,"odule":{"()":null,"_alias()":null}},"_require()":null,"_section()":null,"_to()":null},"ny_content()":null},"#c":{"hild_name()":null,"lass":{"_":{"attributes()":null,"method_list()":null},"es":{"()":null,"_and_modules()":null,"_hash()":null}},"urrent_section()":null},"#defined_in?()":null,"#each_":{"attribute()":null,"classmodule()":null,"constant()":null,"extend()":null,"include()":null,"method()":null,"section()":null},"#f":{"ind_":{"attribute":{"()":null,"_named()":null},"class_method_named()":null,"constant_named()":null,"enclosing_module_named()":null,"external_alias":{"()":null,"_named()":null},"file_named()":null,"instance_method_named()":null,"local_symbol()":null,"method":{"()":null,"_named()":null},"module_named()":null,"symbol":{"()":null,"_module()":null}},"ull":{"_name()":null,"y_documented?()":null}},"#http_url()":null,"#in":{"itialize_methods_etc()":null,"stance_":{"attributes()":null,"method_list()":null}},"#m":{"ethods_":{"by_type()":null,"matching()":null},"odules":{"()":null,"_hash()":null}},"#name_for_path()":null,"::":{"section":{"":null,"#==()":null,"#a":{"dd_comment()":null,"ref()":null},"#e":{"ql?()":null,"xtract_comment()":null},"#in_files()":null,"#marshal_":{"dump()":null,"load()":null},"::new()":null,"#p":{"arse()":null,"lain_html()":null},"#remove_comment()":null,"#sequence()":null},"new()":null},"#ongoing_visibility=()":null,"#re":{"cord_location()":null,"move_":{"from_documentation?()":null,"invisible()":null},"solve_aliases()":null},"#s":{"e":{"ction":{"_contents()":null,"s()":null},"t_":{"c":{"onstant_visibility_for()":null,"urrent_section()":null},"visibility_for()":null}},"ort_sections()":null},"#top_level()":null,"#upgrade_to_class()":null}},"crossreference":{"":null,"::new()":null,"#resolve()":null},"encoding":{"":null,"::":{"change_encoding()":null,"re":{"ad_file()":null,"move_frozen_string_literal()":null},"set_encoding()":null}},"er":{"b":{"io":{"":null,"::new()":null,"#set_eoutvar()":null},"partial":{"":null,"#set_eoutvar()":null}},"ror":null},"extend":null,"generator":{"":null,"::":{"darkfish":{"":null,"#assemble_template()":null,"#c":{"lass_dir()":null,"opy_static()":null},"#debug_msg()":null,"#file_dir()":null,"#ge":{"n":{"_sub_directories()":null,"erate":{"()":null,"_class":{"()":null,"_files()":null},"_file_files()":null,"_index()":null,"_page()":null,"_servlet_":{"not_found()":null,"root()":null},"_table_of_contents()":null}},"t_s":{"orted_module_list()":null,"vninfo()":null}},"::new()":null,"#render":{"()":null,"_template()":null},"#setup()":null,"#t":{"emplate_":{"for()":null,"result()":null},"ime_delta_string()":null},"#write_style_sheet()":null},"jsonindex":{"":null,"#build_index()":null,"#class_dir()":null,"#debug_msg()":null,"#file_dir()":null,"#generate":{"()":null,"_gzipped()":null},"#index_":{"classes()":null,"methods()":null,"pages()":null},"::new()":null,"#search_string()":null},"markup":{"":null,"#a":{"ref_to()":null,"s_href()":null},"#cvs_url()":null,"#description()":null,"#formatter()":null},"pot":{"":null,"::":{"messageextractor":{"":null,"#e":{"ntry()":null,"xtract":{"()":null,"_from_klass()":null,"_text()":null}},"::new()":null},"po":{"":null,"entry":{"":null,"#escape()":null,"#format_":{"comment()":null,"extracted_comment()":null,"flags()":null,"message()":null,"references()":null,"translator_comment()":null},"#merge":{"()":null,"_array()":null,"_string()":null},"::new()":null,"#to_s()":null},"#add":{"()":null,"_header()":null},"#header_entry()":null,"::new()":null,"#sort_entries()":null,"#to_s()":null}},"#class_dir()":null,"#extract_messages()":null,"#generate()":null,"#initialize()":null},"ri":{"":null,"#generate()":null,"#initialize()":null}}},"ghostmethod":null,"i18n":{"":null,"::":{"locale":{"":null,"#load()":null,"::":{"[]":{"()":null,"=()":null},"new()":null},"#translate()":null},"text":{"":null,"#e":{"ach_line()":null,"mit_":{"empty_line_event()":null,"paragraph_event()":null},"xtract_messages()":null},"::new()":null,"#parse()":null,"#translate()":null}}},"include":null,"mark":{"down":{"":null,"::":{"literals":{"":null,"::":{"memoentry":null,"parseerror":null,"ruleinfo":null}},"memoentry":null,"ruleinfo":null,"extension()":null,"new()":null,"parse":{"error":null,"()":null}},"#break_on_newline()":null,"#css()":null,"#definition_lists()":null,"#e":{"mphasis()":null,"xtension":{"()":null,"?()":null}},"#github()":null,"#html()":null,"#li":{"nk_to()":null,"st_item_from()":null},"#note":{"()":null,"_for()":null,"s()":null},"#orig_initialize()":null,"#p":{"ar":{"agraph()":null,"se()":null},"eg_parse()":null},"#reference()":null,"#str":{"ike()":null,"ong()":null}},"up":{"":null,"::":{"attr":{"changer":null,"span":{"":null,"#[]()":null,"::new()":null,"#set_attrs()":null},"ibute":{"manager":{"":null,"#a":{"dd_":{"html()":null,"special()":null,"word_pair()":null},"ttribute()":null},"#c":{"hange":{"_attribute()":null,"d_attribute_by_name()":null},"onvert_":{"attrs()":null,"html()":null,"specials()":null},"opy_string()":null},"#display_attributes()":null,"#flow()":null,"#mask_protected_sequences()":null,"::new()":null,"#split_into_flow()":null,"#unmask_protected_sequences()":null},"s":{"":null,"#as_string()":null,"#bitmap_for()":null,"#each_name_of()":null,"::new()":null}}},"bl":{"ankline":{"":null,"#accept()":null,"::new()":null},"ockquote":{"":null,"#accept()":null}},"document":{"":null,"#<<()":null,"#accept()":null,"#concat()":null,"#e":{"ach()":null,"mpty?()":null},"#file=()":null,"#merge":{"()":null,"d?()":null},"::new()":null,"#push()":null,"#table_of_contents()":null},"formatter":{"":null,"testcase":{"":null,"::add_visitor_tests()":null,"#setup()":null,"#test_":{"accept_":{"bl":{"ank_line()":null,"ock_quote()":null},"document()":null,"heading":{"()":null,"_1()":null,"_2()":null,"_3()":null,"_4()":null,"_b()":null,"_suppressed_crossref()":null},"list_":{"end_":{"bullet()":null,"la":{"bel()":null,"lpha()":null},"note()":null,"number()":null,"ualpha()":null},"item_":{"end_":{"bullet()":null,"la":{"bel()":null,"lpha()":null},"note()":null,"number()":null,"ualpha()":null},"start_":{"bullet()":null,"la":{"bel()":null,"lpha()":null},"note":{"()":null,"_2()":null,"_multi_":{"description()":null,"label()":null}},"number()":null,"ualpha()":null}},"start_":{"bullet()":null,"la":{"bel()":null,"lpha()":null},"note()":null,"number()":null,"ualpha()":null}},"paragraph":{"()":null,"_b":{"()":null,"r()":null,"reak()":null},"_i()":null,"_plus()":null,"_star()":null,"_underscore()":null},"raw()":null,"rule()":null,"verbatim()":null},"end_accepting()":null,"list_":{"nested()":null,"verbatim()":null},"start_accepting()":null}},"#a":{"ccept_document()":null,"dd_":{"special_":{"rdoclink()":null,"tidylink()":null},"tag()":null},"nnotate()":null},"#convert":{"()":null,"_flow()":null,"_s":{"pecial()":null,"tring()":null}},"#i":{"gnore()":null,"n_tt?()":null},"::":{"gen_relative_url()":null,"new()":null},"#o":{"ff_tags()":null,"n_tags()":null},"#parse_url()":null,"#tt?()":null},"hardbreak":{"":null,"#accept()":null,"::new()":null},"in":{"clude":{"":null,"::new()":null},"dentedparagraph":{"":null,"#accept()":null,"::new()":null,"#text()":null}},"list":{"":null,"item":{"":null,"#<<()":null,"#accept()":null,"#empty?()":null,"#length()":null,"::new()":null,"#push()":null},"#<<()":null,"#accept()":null,"#empty?()":null,"#last()":null,"::new()":null,"#push()":null},"par":{"agraph":{"":null,"#accept()":null,"#text()":null},"se":{"r":{"":null,"::":{"error":null,"new()":null,"parse":{"error":null,"()":null},"tokenize()":null},"#build_":{"heading()":null,"list()":null,"paragraph()":null,"verbatim()":null},"#char_pos()":null,"#get()":null,"#p":{"arse()":null,"eek_token()":null},"#s":{"etup_scanner()":null,"kip()":null},"#token":{"_pos()":null,"ize()":null},"#unget()":null},"()":null}},"preprocess":{"":null,"#find_include_file()":null,"#handle":{"()":null,"_directive()":null},"#include_file()":null,"::":{"new()":null,"post_process":{"()":null,"ors()":null},"re":{"gister":{"()":null,"ed()":null},"set()":null}}},"raw":{"":null,"#<<()":null,"#accept()":null,"#merge()":null,"::new()":null,"#push()":null,"#text()":null},"rule":{"":null,"#accept()":null},"special":{"":null,"#==()":null,"::new()":null},"textformattertestcase":{"":null,"::add_text_tests()":null,"#test_a":{"ccept_":{"heading_indent()":null,"paragraph_":{"indent()":null,"wrap()":null},"rule_indent()":null,"verbatim_":{"big_indent()":null,"indent()":null}},"ttributes()":null}},"to":{"ansi":{"":null,"#accept_list_item_":{"end()":null,"start()":null},"#init_tags()":null,"::new()":null,"#start_accepting()":null},"bs":{"":null,"#a":{"ccept_heading()":null,"nnotate()":null},"#convert_s":{"pecial()":null,"tring()":null},"#init_tags()":null,"::new()":null},"html":{"":null,"crossref":{"":null,"#cross_reference()":null,"#gen_url()":null,"#handle_special_":{"crossref()":null,"hyperlink()":null,"rdoclink()":null},"#link()":null,"::new()":null},"snippet":{"":null,"#a":{"ccept_":{"heading()":null,"list_":{"item_":{"end()":null,"start()":null},"start()":null},"paragraph()":null,"verbatim()":null},"dd_paragraph()":null},"#convert":{"()":null,"_flow()":null},"#gen_url()":null,"#h":{"andle_special_":{"crossref()":null,"hard_break()":null},"tml_list_name()":null},"#list_item_start()":null,"::new()":null,"#o":{"ff_tags()":null,"n_tags()":null},"#start_accepting()":null,"#truncate()":null},"#accept_":{"bl":{"ank_line()":null,"ock_quote()":null},"heading()":null,"list_":{"end()":null,"item_":{"end()":null,"start()":null},"start()":null},"paragraph()":null,"raw()":null,"rule()":null,"verbatim()":null},"#convert_string()":null,"#end_accepting()":null,"#gen_url()":null,"#h":{"andle_special_":{"h":{"ard_break()":null,"yperlink()":null},"rdoclink()":null,"tidylink()":null},"tml_list_name()":null},"#init_tags()":null,"#list_":{"end_for()":null,"item_start()":null},"::new()":null,"#parseable?()":null,"#start_accepting()":null,"#to_html()":null},"joinedparagraph":{"":null,"#accept_paragraph()":null},"label":{"":null,"#convert()":null,"#handle_special_":{"crossref()":null,"tidylink()":null},"::new()":null},"markdown":{"":null,"#accept_":{"list_":{"end()":null,"item_":{"end()":null,"start()":null},"start()":null},"rule()":null,"verbatim()":null},"#gen_url()":null,"#handle_":{"rdoc_link()":null,"special_":{"hard_break()":null,"rdoclink()":null,"tidylink()":null}},"#init_tags()":null,"::new()":null},"rdoc":{"":null,"#a":{"ccept_":{"bl":{"ank_line()":null,"ock_quote()":null},"heading()":null,"indented_paragraph()":null,"list_":{"end()":null,"item_":{"end()":null,"start()":null},"start()":null},"paragraph()":null,"raw()":null,"rule()":null,"verbatim()":null},"ttributes()":null},"#end_accepting()":null,"#handle_special_":{"hard_break()":null,"suppressed_crossref()":null},"#init_tags()":null,"::new()":null,"#start_accepting()":null,"#use_prefix()":null,"#wrap()":null},"tableofcontents":{"":null,"#accept_":{"document()":null,"heading()":null},"#end_accepting()":null,"#s":{"tart_accepting()":null,"uppressed?()":null},"::to_toc()":null},"test":null,"ttonly":{"":null,"#accept_":{"bl":{"ank_line()":null,"ock_quote()":null},"heading()":null,"list_":{"end()":null,"item_":{"end()":null,"start()":null},"start()":null},"paragraph()":null,"raw()":null,"rule()":null,"verbatim()":null},"#do_nothing()":null,"#end_accepting()":null,"::new()":null,"#start_accepting()":null,"#tt_sections()":null}},"verbatim":{"":null,"#accept()":null,"#normalize()":null,"#ruby?()":null,"#text()":null},"new()":null},"#add_":{"html()":null,"special()":null,"word_pair()":null},"#convert()":null}},"met":{"amethod":null,"hodattr":{"":null,"#<=>()":null,"#a":{"dd_":{"alias()":null,"line_numbers()":null},"ref":{"()":null,"_prefix()":null}},"#block_params=()":null,"#documented?()":null,"#full_name()":null,"#html_name()":null,"#markup_code()":null,"#name_prefix()":null,"::new()":null,"#output_name()":null,"#p":{"a":{"rent_name()":null,"th()":null},"retty_name()":null},"#s":{"e":{"arch_record()":null,"e()":null},"tore=()":null},"#type()":null}},"mixin":{"":null,"#<=>()":null,"#full_name()":null,"#module()":null,"::new()":null,"#store=()":null},"normal":{"class":{"":null,"#ancestors()":null,"#d":{"efinition()":null,"irect_ancestors()":null}},"module":{"":null,"#definition()":null,"#module?()":null,"#superclass()":null}},"options":{"":null,"#check_":{"files()":null,"generator()":null},"#default_title=()":null,"#finish":{"()":null,"_page_dir()":null},"#generator_descriptions()":null,"#parse()":null,"#quiet":{"()":null,"=()":null},"#s":{"anitize_path()":null,"etup_generator()":null},"#template_dir_for()":null,"#visibility=()":null,"#w":{"arn()":null,"rite_options()":null}},"parser":{"":null,"::":{"c":{"":null,"hangelog":{"":null,"#c":{"ontinue_entry_body()":null,"reate_":{"document()":null,"entries()":null,"items()":null}},"#group_entries()":null,"#parse_entries()":null,"#scan()":null},"an_parse":{"()":null,"_by_name()":null},"heck_modeline()":null,"#d":{"eduplicate_call_seq()":null,"o_":{"a":{"liases()":null,"ttrs()":null},"boot_defclass()":null,"classes()":null,"constants()":null,"define_":{"class":{"()":null,"_under()":null},"module":{"()":null,"_under()":null}},"includes()":null,"methods()":null,"missing()":null,"modules()":null,"singleton_class()":null,"struct_define_without_accessor()":null}},"#find_":{"a":{"lias_comment()":null,"ttr_comment()":null},"body()":null,"class":{"()":null,"_comment()":null},"const_comment()":null,"modifiers()":null,"override_comment()":null},"#gen_":{"body_table()":null,"const_table()":null},"#handle_":{"attr()":null,"class_module()":null,"constants()":null,"ifdefs_in()":null,"method()":null,"singleton()":null,"tab_width()":null},"#lo":{"ad_variable_map()":null,"ok_for_directives_in()":null},"::new()":null,"#r":{"b_scan_args()":null,"emove_commented_out_lines()":null},"#scan()":null},"markdown":{"":null,"#scan()":null},"rd":{"":null,"#scan()":null},"ruby":{"":null,"tools":{"":null,"#add_token_listener()":null,"#get_tk":{"()":null,"_until()":null,"read()":null},"#peek_":{"read()":null,"tk()":null},"#re":{"move_token_listener()":null,"set()":null},"#skip_tkspace()":null,"#t":{"k_nl?()":null,"oken_listener()":null},"#unget_tk()":null},"#collect_first_comment()":null,"#error()":null,"#get_":{"bool()":null,"class_":{"or_module()":null,"specification()":null},"constant":{"()":null,"_with_optional_parens()":null},"symbol_or_name()":null},"#look_for_directives_in()":null,"#make_message()":null,"::new()":null,"#new_comment()":null,"#parse_":{"a":{"lias()":null,"ttr":{"()":null,"_accessor()":null}},"call_parameters()":null,"class()":null,"co":{"mment":{"()":null,"_tomdoc()":null},"nstant":{"()":null,"_visibility()":null}},"met":{"a_":{"attr()":null,"method()":null},"hod":{"()":null,"_dummy()":null,"_or_yield_parameters()":null,"_param":{"eters()":null,"s_and_body()":null}}},"module()":null,"re":{"quire()":null,"scue()":null},"statements()":null,"symbol_":{"arg()":null,"in_arg()":null},"top_level_statements()":null,"visibility()":null,"yield()":null},"#read_d":{"irective()":null,"ocumentation_modifiers()":null},"#s":{"can()":null,"kip_":{"for_variable()":null,"method()":null,"optional_do_after_expression()":null,"tkspace_comment()":null}},"#tk_nl?()":null,"#warn()":null},"simple":{"":null,"::new()":null,"#remove_":{"coding_comment()":null,"private_comment()":null},"#scan()":null},"text":null,"alias_extension()":null,"binary?()":null,"for()":null,"new()":null,"parse_files_matching()":null,"remove_modeline()":null,"use_markup()":null,"zip?()":null}},"rd":{"":null,"::":{"blockparser":{"":null,"#add_":{"footnote()":null,"label()":null},"#c":{"ontent()":null,"ut_off()":null},"#format_line_num()":null,"#get_included()":null,"#if_current_indent_equal()":null,"#line_index()":null,"::new()":null,"#on_error()":null,"#par":{"agraph()":null,"se":{"()":null,"_subtree()":null}},"#set_term_to_element()":null},"inline":{"":null,"parser":{"":null,"#inline()":null,"#last_line()":null,"::new()":null,"#next_":{"token()":null,"words_on_error()":null},"#on_error()":null,"#p":{"arse()":null,"rev_words_on_error()":null}},"#append()":null,"#initialize()":null,"::new()":null},"parse()":null},"oc":{"":null,"::":{"add_generator()":null,"current":{"()":null,"=()":null},"new()":null},"#document()":null,"#error()":null,"#g":{"ather_files()":null,"enerate()":null},"#handle_pipe()":null,"#install_siginfo_handler()":null,"#l":{"ist_files_in_directory()":null,"oad_options()":null},"#normalized_file_list()":null,"#output_flag_file()":null,"#parse_":{"dot_doc_file()":null,"file":{"()":null,"s()":null}},"#remove_":{"siginfo_handler()":null,"unparseable()":null},"#s":{"etup_output_dir()":null,"tore=()":null},"#update_output_dir()":null}},"ri":{"":null,"::":{"driver":{"":null,"::":{"error":null,"notfounderror":{"":null,"#name()":null},"default_options()":null,"dump()":null,"new()":null,"process_args()":null,"run()":null},"#a":{"dd_":{"also_in()":null,"class()":null,"exten":{"ds()":null,"sion_modules()":null},"from()":null,"includes()":null,"method":{"()":null,"_documentation()":null,"_list()":null}},"ncestors_of()":null},"#c":{"lass":{"_document()":null,"es":{"()":null,"_and_includes_and_extends_for()":null}},"omplete()":null},"#display":{"()":null,"_class()":null,"_method()":null,"_name":{"()":null,"s()":null},"_page":{"()":null,"_list()":null}},"#expand_":{"class()":null,"name()":null},"#f":{"i":{"lter_methods()":null,"nd_":{"methods()":null,"pager_jruby()":null,"store()":null}},"ormatter()":null},"#in":{"_path?()":null,"teractive()":null},"#l":{"ist_":{"known_classes()":null,"methods_matching()":null},"oad_method":{"()":null,"s_matching()":null},"ookup_method()":null},"#method_":{"document()":null,"type()":null},"#name_regexp()":null,"#pa":{"g":{"e()":null,"ing?()":null},"rse_name()":null},"#run()":null,"#s":{"etup_pager()":null,"tart_server()":null}},"error":null,"paths":{"":null,"::":{"each()":null,"gem":{"_dir()":null,"dirs()":null},"home_dir()":null,"path()":null,"raw_path()":null,"site_dir()":null,"system_dir()":null}},"task":{"":null,"#defaults()":null,"::new()":null}},"pperstatelex":{"":null,"::":{"innerstatelex":{"":null,"#each()":null,"::new()":null,"#on_":{"char()":null,"backref()":null,"co":{"mm":{"a()":null,"ent()":null},"nst()":null},"cvar()":null,"default()":null,"float()":null,"gvar()":null,"heredoc_end()":null,"ident()":null,"ignored_":{"nl()":null,"sp()":null},"imaginary()":null,"int()":null,"ivar()":null,"kw()":null,"lbrac":{"e()":null,"ket()":null},"lparen()":null,"nl()":null,"op()":null,"period()":null,"rational()":null,"rbrac":{"e()":null,"ket()":null},"rparen()":null,"sp()":null,"symbeg()":null,"tstring_":{"beg()":null,"end()":null},"variables()":null},"#reset()":null},"end?()":null,"new()":null,"parse()":null},"#get_":{"embdoc_tk()":null,"heredoc_tk()":null,"op_tk()":null,"regexp_tk()":null,"squashed_tk()":null,"string_tk()":null,"symbol_tk()":null,"words_tk()":null},"#heredoc_end?()":null,"#retrieve_heredoc_info()":null}},"require":{"":null,"::new()":null,"#top_level()":null},"rubygemshook":{"":null,"#d":{"elete_legacy_args()":null,"ocument()":null},"#generate()":null,"::":{"generation_hook()":null,"load_rdoc()":null,"new()":null},"#r":{"doc_installed?()":null,"emove()":null,"i_installed?()":null},"#setup()":null},"servlet":{"":null,"#asset()":null,"#do":{"_get()":null,"cumentation_":{"page()":null,"search()":null,"source()":null}},"#error()":null,"#generator_for()":null,"#i":{"f_modified_since()":null,"nstalled_docs()":null},"::new()":null,"#not_found()":null,"#r":{"i_paths()":null,"oot":{"()":null,"_search()":null}},"#s":{"how_documentation()":null,"tore_for()":null}},"singleclass":{"":null,"#ancestors()":null,"#definition()":null},"st":{"ats":{"":null,"::":{"normal":{"":null,"#print_file()":null},"quiet":{"":null,"#begin_adding()":null,"#done_adding()":null,"::new()":null,"#print_":{"a":{"lias()":null,"ttribute()":null},"class()":null,"constant()":null,"file()":null,"method()":null,"module()":null}},"verbose":{"":null,"#nodoc()":null},"new()":null},"#add_":{"a":{"lias()":null,"ttribute()":null},"class()":null,"constant()":null,"file()":null,"method()":null,"module()":null},"#begin_adding()":null,"#c":{"alculate()":null,"overage_level=()":null},"#do":{"c_stats()":null,"ne_adding()":null},"#fully_documented?()":null,"#great_job()":null,"#percent_doc()":null,"#report":{"()":null,"_attributes()":null,"_c":{"lass_module()":null,"onstants()":null},"_methods()":null},"#summary()":null,"#undoc_params()":null},"ore":{"":null,"::":{"error":null,"missingfileerror":{"":null,"::new()":null},"new()":null},"#a":{"dd_":{"c_":{"enclosure()":null,"variables()":null},"file()":null},"ll_":{"classes":{"()":null,"_and_modules()":null},"files()":null,"modules()":null},"ncestors()":null,"ttributes()":null},"#c":{"ache_path()":null,"lass":{"_":{"file()":null,"methods()":null,"path()":null},"es_hash()":null},"omplete()":null},"#f":{"i":{"les_hash()":null,"nd_":{"c":{"_enclosure()":null,"lass_":{"named":{"()":null,"_from()":null},"or_module()":null}},"file_named()":null,"module_named()":null,"text_page()":null,"unique()":null},"x_basic_object_inheritance()":null},"riendly_path()":null},"#instance_methods()":null,"#load_":{"all()":null,"cache()":null,"class":{"()":null,"_data()":null},"method()":null,"page()":null},"#m":{"a":{"in":{"()":null,"=()":null},"ke_variable_map()":null},"ethod_file()":null,"odule":{"_names()":null,"s_hash()":null}},"#page":{"()":null,"_file()":null},"#remove_nodoc()":null,"#s":{"ave":{"()":null,"_c":{"ache()":null,"lass()":null},"_method()":null,"_page()":null},"ource()":null},"#title":{"()":null,"=()":null},"#unique_":{"classes":{"()":null,"_and_modules()":null},"modules()":null}}},"task":{"":null,"#before_running_rdoc()":null,"#c":{"heck_names()":null,"lobber_task_":{"description()":null,"name()":null}},"#def":{"aults()":null,"ine()":null},"::new()":null,"#option_list()":null,"#r":{"doc_ta":{"rget()":null,"sk_":{"description()":null,"name()":null}},"erdoc_task_":{"description()":null,"name()":null}}},"te":{"stcase":{"":null,"#assert_":{"directory()":null,"file()":null},"#bl":{"ank_line()":null,"ock()":null},"#comment()":null,"#doc()":null,"#h":{"ard_break()":null,"ead()":null},"#item()":null,"#list()":null,"#para()":null,"#r":{"aw()":null,"efute_file()":null,"ule()":null},"#setup()":null,"#temp_dir()":null,"#verb":{"()":null,"ose_capture_io()":null}},"xt":{"":null,"::encode_fallback()":null,"#expand_tabs()":null,"#flush_left()":null,"#markup()":null,"#normalize_comment()":null,"#parse()":null,"#s":{"nippet()":null,"trip_":{"hashes()":null,"newlines()":null,"stars()":null}},"#to_html()":null,"#wrap()":null}},"to":{"kenstream":{"":null,"#add_token":{"()":null,"s()":null},"#collect_tokens()":null,"#pop_token()":null,"#start_collecting_tokens()":null,"::to_html()":null,"#token":{"_stream()":null,"s_to_s()":null}},"mdoc":{"":null,"#build_":{"heading()":null,"paragraph()":null,"verbatim()":null},"::":{"new()":null,"parse()":null,"signature()":null},"#tokenize()":null},"plevel":{"":null,"#==()":null,"#add_":{"alias()":null,"constant()":null,"include()":null,"method()":null,"to_classes_or_modules()":null},"#base_name()":null,"#cvs_url()":null,"#display?()":null,"#eql?()":null,"#f":{"ind_":{"class_or_module()":null,"local_symbol()":null,"module_named()":null},"ull_name()":null},"#h":{"ash()":null,"ttp_url()":null},"#last_modified()":null,"#marshal_dump()":null,"::new()":null,"#object_class()":null,"#pa":{"ge_name()":null,"th()":null},"#search_record()":null,"#text?()":null}},"load_yaml()":null}},"rss":{"":null,"::":{"atom":{"":null,"::":{"co":{"mmonmodel":{"":null,"::":{"append_features()":null,"need_parent?()":null,"required_uri()":null}},"ntentmodel":{"":null,"::":{"classmethods":{"":null,"#content_type()":null},"append_features()":null},"#maker_target()":null,"#setup_maker_element":{"()":null,"_writer()":null}}},"dateconstruct":{"":null,"::append_features()":null,"#atom_validate()":null},"duplicatelinkchecker":{"":null,"#validate_duplicate_links()":null},"entry":{"":null,"#atom_validate()":null,"#have_":{"author?()":null,"required_elements?()":null},"#items()":null,"#maker_target()":null,"::new()":null,"#setup_maker()":null},"feed":{"":null,"::":{"author":null,"category":{"":null,"#maker_target()":null},"contributor":null,"entry":{"":null,"::":{"content":{"":null,"#atom_validate()":null,"#empty_content?()":null,"#have_xml_content?()":null,"#inline_":{"html?()":null,"other":{"?()":null,"_base64?()":null,"_text?()":null,"_xml?()":null},"text?()":null,"xhtml?()":null},"#mime_split()":null,"#need_base64_encode?()":null,"#out_of_line?()":null,"#x":{"html()":null,"ml()":null},"::xml_":{"getter()":null,"setter()":null}},"published":null,"source":{"":null,"#have_author?()":null},"summary":null},"#atom_validate()":null,"#have_":{"author?()":null,"required_elements?()":null},"#maker_target()":null},"generator":{"":null,"#setup_maker_attributes()":null},"icon":null,"id":null,"link":{"":null,"#maker_target()":null},"logo":{"":null,"#maker_target()":null,"#setup_maker_element_writer()":null},"rights":null,"subtitle":null,"title":null,"updated":null,"new()":null},"#atom_validate()":null,"#have_":{"author?()":null,"required_elements?()":null},"#maker_target()":null,"#setup_maker_element":{"()":null,"s()":null}},"personconstruct":{"":null,"::":{"email":null,"name":null,"uri":null,"append_features()":null},"#maker_target()":null},"textconstruct":{"":null,"#atom_validate()":null,"#have_xml_content?()":null,"#maker_target()":null,"#setup_maker_attributes()":null,"#xhtml()":null,"::":{"append_features()":null,"xml_":{"getter()":null,"setter()":null}}},"uricontentmodel":{"":null,"::append_features()":null}}},"base":{"dublincoremodel":{"":null,"#append_features()":null},"listener":{"":null,"::":{"available_tags()":null,"class_name()":null,"def_get_text_element()":null,"getter()":null,"install_":{"accessor_base()":null,"class_name()":null,"get_text_element()":null},"raise_for_undefined_entity?()":null,"register_uri()":null,"setter()":null,"uri_registered?()":null}},"model":{"":null,"#boolean_writer()":null,"#c":{"on":{"tent_writer()":null,"vert_attr_reader()":null},"sv_":{"attr_reader()":null,"integer_writer()":null,"writer()":null}},"#d":{"ate_writer()":null,"ef_children_accessor()":null},"#explicit_clean_other_":{"attr_reader()":null,"writer()":null},"#in":{"herit_convert_attr_reader()":null,"stall_":{"date_element()":null,"element()":null,"have_":{"attribute_element()":null,"child":{"_element()":null,"ren_element()":null}},"text_element()":null},"teger_writer()":null},"#positive_integer_writer()":null,"#text_type_writer()":null,"#uri_convert_attr_reader()":null,"#yes_other_":{"attr_reader()":null,"writer()":null}},"parser":{"":null,"#do_validate":{"()":null,"=()":null},"#ignore_unknown_element":{"()":null,"=()":null},"#parse()":null,"::":{"new()":null,"raise_for_undefined_entity?()":null},"#rss()":null},"trackbackmodel":null},"con":{"tentmodel":{"":null,"::append_features()":null},"ver":{"sionerror":{"":null,"::new()":null},"ter":{"":null,"#convert()":null,"#def_":{"convert()":null,"else_enc()":null,"iconv_convert()":null,"same_enc()":null,"to_":{"euc_jp_from_":{"iso_2022_jp()":null,"shift_jis()":null,"utf_8()":null},"iso_":{"2022_jp_from_euc_jp()":null,"8859_1_from_utf_8()":null},"shift_jis_from_":{"euc_jp()":null,"utf_8()":null},"utf_8_from_":{"euc_jp()":null,"iso_8859_1()":null,"shift_jis()":null}},"uconv_convert_if_can()":null},"::new()":null}}},"dublincoremodel":null,"element":{"":null,"#_":{"_validate()":null,"attrs()":null,"tags()":null,"validate()":null},"#c":{"alc_indent()":null,"hildren()":null,"ollect_attrs()":null,"on":{"tent_is_set?()":null,"vert":{"()":null,"er=()":null}}},"::":{"add_":{"have_children_element()":null,"need_initialize_variable()":null,"plural_form()":null,"to_element_method()":null},"content_setup()":null,"def_corresponded_attr_":{"reader()":null,"writer()":null},"get_attributes()":null,"have_c":{"hildren_elements()":null,"ontent?()":null},"in":{"herited":{"()":null,"_base()":null},"stall_":{"get_attribute()":null,"model()":null,"must_call_validator()":null,"ns()":null}},"models()":null,"must_call_validators()":null,"ne":{"ed_":{"initialize_variables()":null,"parent?()":null},"w()":null},"plural_forms()":null,"required_":{"prefix()":null,"uri()":null},"tag_name()":null,"to_element_methods()":null},"#empty_content?()":null,"#full_name()":null,"#have_":{"required_elements?()":null,"xml_content?()":null},"#initialize_":{"have_children_elements()":null,"variables()":null},"#make_start_tag()":null,"#need_base64_encode?()":null,"#set_next_element()":null,"#t":{"ag":{"()":null,"_filter()":null,"_name":{"()":null,"_with_prefix()":null}},"o_s()":null},"#valid":{"?()":null,"ate":{"()":null,"_attribute()":null,"_for_stream()":null}},"#xmled_content()":null},"error":null,"itunes":{"basemodel":null,"channelmodel":{"":null,"::":{"itunes":{"category":{"":null,"#full_name()":null,"#maker_target()":null,"::":{"new()":null,"required_":{"prefix()":null,"uri()":null}},"#setup_maker_":{"attributes()":null,"elements()":null}},"image":{"":null,"#full_name()":null,"#maker_target()":null,"::":{"new()":null,"required_":{"prefix()":null,"uri()":null}},"#setup_maker_attributes()":null},"owner":{"":null,"#full_name()":null,"#maker_target()":null,"::":{"new()":null,"required_":{"prefix()":null,"uri()":null}},"#setup_maker_element()":null}},"append_features()":null}},"itemmodel":{"":null,"::":{"itunesduration":{"":null,"#content=()":null,"#full_name()":null,"#hour=()":null,"#m":{"aker_target()":null,"inute=()":null},"::":{"construct()":null,"new()":null,"parse()":null,"required_":{"prefix()":null,"uri()":null}},"#se":{"cond=()":null,"tup_maker_element()":null},"#update_content()":null,"#value=()":null},"append_features()":null}},"modelutils":{"":null,"#def_":{"class_accessor()":null,"element":{"_class_accessor()":null,"s_class_accessor()":null}}}},"image":{"faviconmodel":{"":null,"::":{"imagefavicon":{"":null,"#full_name()":null,"#image_size=()":null,"#maker_target()":null,"::":{"new()":null,"required_":{"prefix()":null,"uri()":null}},"#s":{"et":{"_size()":null,"up_maker_attributes()":null},"ize=()":null}},"append_features()":null}},"itemmodel":{"":null,"::":{"imageitem":{"":null,"#full_name()":null,"#maker_target()":null,"::":{"new()":null,"required_":{"prefix()":null,"uri()":null}},"#setup_maker_attributes()":null},"append_features()":null}},"modelutils":{"":null,"#validate_one_tag_name()":null}},"invalidrsserror":null,"listenermixin":{"":null,"#_ns()":null,"#c":{"heck_ns()":null,"ollect_attributes()":null},"#in":{"itial_start_":{"rdf()":null,"entry()":null,"feed()":null,"rss()":null},"struction()":null},"#known_class?()":null,"::new()":null,"#parse_pi_content()":null,"#s":{"etup_next_element":{"()":null,"_in_unknown_element()":null},"plit_name()":null,"tart_":{"else_element()":null,"get_text_element()":null,"have_something_element()":null}},"#t":{"ag_":{"end()":null,"start()":null},"ext()":null},"#xmldecl()":null},"maker":{"":null,"::":{"atom":{"":null,"::":{"entry":{"":null,"::":{"channel":{"":null,"::":{"cloud":null,"description":null,"generator":{"":null,"::not_set_name()":null},"skip":{"days":{"":null,"::day":null},"hours":{"":null,"::hour":null}}}},"image":null,"items":{"":null,"::item":{"":null,"#_set_default_values()":null,"#not_set_required_variables()":null,"#required_variable_names()":null,"#to_feed()":null,"#variable":{"_is_set?()":null,"s()":null}},"#to_feed()":null},"textinput":null,"new()":null},"#make_feed()":null,"#setup_elements()":null},"feed":{"":null,"::":{"channel":{"":null,"::":{"c":{"ategories":{"":null,"::category":{"":null,"::not_set_name()":null}},"loud":{"":null,"#to_feed()":null}},"generator":{"":null,"::not_set_name()":null},"links":{"":null,"::link":{"":null,"::not_set_name()":null}},"skip":{"days":{"":null,"::day":null,"#to_feed()":null},"hours":{"":null,"::hour":null,"#to_feed()":null}}},"#_set_default_values()":null,"#have_required_values?()":null,"#not_set_required_variables()":null,"#required_variable_names()":null,"#to_feed()":null,"#variable":{"_is_set?()":null,"s()":null}},"image":{"":null,"#required_variable_names()":null,"#to_feed()":null},"items":{"":null,"::item":{"":null,"::":{"c":{"ategories":{"":null,"::category":{"":null,"::not_set_name()":null}},"ontent":{"":null,"#required_variable_names()":null,"#to_feed()":null,"#variables()":null,"#xml_type?()":null}},"enclosure":{"":null,"#to_feed()":null},"guid":{"":null,"#to_feed()":null},"links":{"":null,"::link":{"":null,"::not_set_name()":null}},"source":{"":null,"::":{"categories":{"":null,"::category":{"":null,"::not_set_name()":null}},"generator":{"":null,"::not_set_name()":null},"icon":{"":null,"#required_variable_names()":null,"#to_feed()":null},"links":{"":null,"::link":{"":null,"::not_set_name()":null}},"logo":{"":null,"::not_set_name()":null}},"#required_variable_names()":null,"#to_feed()":null,"#variables()":null}},"#_set_default_values()":null,"#have_required_values?()":null,"#not_set_required_variables()":null,"#required_variable_names()":null,"#to_feed()":null,"#variables()":null},"#to_feed()":null},"textinput":null,"new()":null},"#make_feed()":null,"#setup_elements()":null}},"category":{"":null,"#required_variable_names()":null,"#to_feed()":null,"#variables()":null},"generator":{"":null,"#required_variable_names()":null,"#to_feed()":null},"link":{"":null,"#required_variable_names()":null,"#to_feed()":null},"logo":{"":null,"#required_variable_names()":null,"#to_feed()":null},"person":{"constructbase":{"":null,"::append_features()":null},"s":{"":null,"#def_atom_persons()":null}},"textconstruct":{"":null,"base":{"":null,"::":{"ensurexmlcontent":{"":null,"#ensure_xml_content()":null,"::included()":null,"#set_xhtml_uri_as_default_uri()":null,"#x":{"html=()":null,"ml_content=()":null}},"append_features()":null}},"::def_atom_text_construct()":null,"#required_variable_names()":null,"#variables()":null}},"base":{"":null,"#_set_default_values()":null,"#current_element()":null,"::":{"add_":{"need_initialize_variable()":null,"other_element()":null},"def_":{"array_element()":null,"classed_element":{"()":null,"_without_accessor()":null,"s()":null},"csv_element()":null,"other_element":{"()":null,"_without_accessor()":null}},"inherited":{"()":null,"_base()":null},"ne":{"ed_initialize_variables()":null,"w()":null},"other_elements()":null},"#have_required_values?()":null,"#initialize_variables()":null,"#not_set_required_variables()":null,"#required_variables_are_set?()":null,"#set":{"_":{"default_values()":null,"parent()":null},"up_":{"other_elements()":null,"values()":null}},"#variable":{"_is_set?()":null,"s()":null}},"channelbase":{"":null,"::":{"authorsbase":{"":null,"::authorbase":null},"categoriesbase":{"":null,"::categorybase":null},"cloudbase":null,"co":{"ntributorsbase":{"":null,"::contributorbase":null},"pyrightbase":null},"descriptionbase":null,"generatorbase":null,"itunes":{"categories":{"":null,"::itunescategory":null},"image":null,"owner":null},"linksbase":{"":null,"::linkbase":null},"skip":{"daysbase":{"":null,"::daybase":null},"hoursbase":{"":null,"::hourbase":null}},"titlebase":null},"#date=()":null,"#icon":{"()":null,"=()":null},"#l":{"astbuilddate=()":null,"ogo":{"()":null,"=()":null}},"#pubdate":{"()":null,"=()":null},"#updated":{"()":null,"=()":null}},"contentmodel":{"":null,"::append_features()":null},"dublincoremodel":{"":null,"::":{"append_features()":null,"install_dublin_core()":null}},"image":{"base":{"":null,"#link()":null},"faviconmodel":{"":null,"::":{"imagefaviconbase":{"":null,"#have_required_values?()":null,"#to_feed()":null},"append_features()":null,"install_image_favicon()":null}},"itemmodel":{"":null,"::":{"imageitembase":{"":null,"#have_required_values?()":null,"#to_feed()":null},"append_features()":null,"install_image_item()":null}}},"it":{"unes":{"basemodel":{"":null,"#def_":{"c":{"lass_accessor()":null,"sv_accessor()":null},"elements_class_accessor()":null,"explicit_clean_other_accessor()":null,"yes_other_accessor()":null}},"channelmodel":{"":null,"::":{"itunes":{"categoriesbase":{"":null,"::itunescategorybase":{"":null,"#have_required_values?()":null,"#to_feed":{"()":null,"_for_categories()":null}}},"imagebase":{"":null,"#to_feed()":null},"ownerbase":{"":null,"#required_variable_names()":null,"#to_feed()":null}},"append_features()":null}},"itemmodel":{"":null,"::":{"itunesdurationbase":{"":null,"#content=()":null,"#hour=()":null,"#minute=()":null,"#second=()":null,"#to_feed()":null,"#update_content()":null},"append_features()":null}}},"emsbase":{"":null,"::":{"itembase":{"":null,"::":{"contentbase":{"":null,"#inline_":{"html?()":null,"other":{"?()":null,"_base64?()":null,"_text?()":null,"_xml?()":null},"text?()":null,"xhtml?()":null},"#out_of_line?()":null,"#xml":{"=()":null,"_content=()":null}},"descriptionbase":null,"enclosurebase":null,"guidbase":{"":null,"#permanent_link":{"=()":null,"?()":null}},"itunesduration":null,"rightsbase":null,"sourcebase":{"":null,"::":{"iconbase":null,"logobase":null,"rightsbase":null,"subtitlebase":null,"titlebase":null},"#date=()":null,"#updated":{"()":null,"=()":null}},"titlebase":null},"#<=>()":null,"#date=()":null,"#pubdate":{"()":null,"=()":null},"#updated":{"()":null,"=()":null}},"new()":null},"#normalize()":null,"#sort_if_need()":null}},"rss":{"10":{"":null,"::":{"channel":{"":null,"::":{"authors":{"":null,"::author":{"":null,"#to_feed()":null},"#to_feed()":null},"categories":{"":null,"::category":null,"#to_feed()":null},"cloud":{"":null,"#to_feed()":null},"co":{"ntributors":{"":null,"::contributor":null,"#to_feed()":null},"pyright":{"":null,"#to_feed()":null}},"description":{"":null,"#required_variable_names()":null,"#to_feed()":null},"generator":{"":null,"#to_feed()":null},"links":{"":null,"::link":{"":null,"#required_variable_names()":null,"#to_feed()":null},"#to_feed()":null},"skip":{"days":{"":null,"::day":null,"#to_feed()":null},"hours":{"":null,"::hour":null,"#to_feed()":null}},"title":{"":null,"#required_variable_names()":null,"#to_feed()":null}},"#not_set_required_variables()":null,"#required_variable_names()":null,"#setup_":{"i":{"mage()":null,"tems()":null},"textinput()":null},"#to_feed()":null},"image":{"":null,"#have_required_values?()":null,"#required_variable_names()":null,"#to_feed()":null,"#variables()":null},"items":{"":null,"::item":{"":null,"::":{"authors":{"":null,"::author":null,"#to_feed()":null},"categories":{"":null,"::category":null,"#to_feed()":null},"cont":{"ent":{"":null,"#to_feed()":null},"ributors":{"":null,"::contributor":null,"#to_feed()":null}},"description":{"":null,"#required_variable_names()":null,"#to_feed()":null},"enclosure":{"":null,"#to_feed()":null},"guid":{"":null,"#to_feed()":null},"links":{"":null,"::link":null,"#to_feed()":null},"rights":{"":null,"#to_feed()":null},"source":{"":null,"::":{"authors":{"":null,"::author":null,"#to_feed()":null},"categories":{"":null,"::category":null,"#to_feed()":null},"contributors":{"":null,"::contributor":null,"#to_feed()":null},"generator":{"":null,"#to_feed()":null},"icon":{"":null,"#to_feed()":null},"links":{"":null,"::link":null,"#to_feed()":null},"logo":{"":null,"#to_feed()":null},"rights":{"":null,"#to_feed()":null},"subtitle":{"":null,"#to_feed()":null},"title":{"":null,"#to_feed()":null}},"#to_feed()":null},"title":{"":null,"#required_variable_names()":null,"#to_feed()":null}},"#not_set_required_variables()":null,"#required_variable_names()":null,"#to_feed()":null,"#variables()":null},"#to_feed()":null},"textinput":{"":null,"#have_required_values?()":null,"#required_variable_names()":null,"#to_feed()":null},"new()":null},"#make_feed()":null,"#setup_elements()":null},"20":{"":null,"::":{"channel":{"":null,"::":{"c":{"ategories":{"":null,"::category":{"":null,"#required_variable_names()":null,"#to_feed()":null},"#to_feed()":null},"loud":{"":null,"#required_variable_names()":null,"#to_feed()":null}},"generator":{"":null,"#required_variable_names()":null,"#to_feed()":null},"skip":{"days":{"":null,"::day":null},"hours":{"":null,"::hour":null}}},"#required_variable_names()":null},"image":{"":null,"#required_element?()":null},"items":{"":null,"::item":{"":null,"::":{"authors":{"":null,"::author":{"":null,"#to_feed()":null},"#to_feed()":null},"categories":{"":null,"::category":{"":null,"#required_variable_names()":null,"#to_feed()":null},"#to_feed()":null},"enclosure":{"":null,"#required_variable_names()":null,"#to_feed()":null},"guid":{"":null,"#required_variable_names()":null,"#to_feed()":null},"source":{"":null,"::links":{"":null,"::link":{"":null,"#to_feed()":null},"#to_feed()":null},"#required_variable_names()":null,"#to_feed()":null}},"#not_set_required_variables()":null,"#required_variable_names()":null,"#variables()":null}},"textinput":null,"new()":null}},"09":{"1":{"":null,"::":{"channel":null,"image":null,"items":{"":null,"::item":null},"textinput":null,"new()":null}},"2":{"":null,"::":{"channel":null,"image":null,"items":{"":null,"::item":null},"textinput":null,"new()":null}},"":null,"::":{"channel":{"":null,"::":{"authors":{"":null,"::author":{"":null,"#to_feed()":null},"#to_feed()":null},"categories":{"":null,"::category":null,"#to_feed()":null},"cloud":{"":null,"#to_feed()":null},"co":{"ntributors":{"":null,"::contributor":null,"#to_feed()":null},"pyright":{"":null,"#required_variable_names()":null,"#to_feed()":null}},"description":{"":null,"#required_variable_names()":null,"#to_feed()":null},"generator":{"":null,"#to_feed()":null},"links":{"":null,"::link":{"":null,"#required_variable_names()":null,"#to_feed()":null},"#to_feed()":null},"skip":{"days":{"":null,"::day":{"":null,"#required_variable_names()":null,"#to_feed()":null},"#to_feed()":null},"hours":{"":null,"::hour":{"":null,"#required_variable_names()":null,"#to_feed()":null},"#to_feed()":null}},"title":{"":null,"#required_variable_names()":null,"#to_feed()":null}},"#not_set_required_variables()":null,"#required_variable_names()":null,"#setup_":{"i":{"mage()":null,"tems()":null},"textinput()":null},"#to_feed()":null,"#variables()":null},"image":{"":null,"#required_":{"element?()":null,"variable_names()":null},"#to_feed()":null},"items":{"":null,"::item":{"":null,"::":{"authors":{"":null,"::author":null,"#to_feed()":null},"categories":{"":null,"::category":null,"#to_feed()":null},"cont":{"ent":{"":null,"#to_feed()":null},"ributors":{"":null,"::contributor":null,"#to_feed()":null}},"description":{"":null,"#required_variable_names()":null,"#to_feed()":null},"enclosure":{"":null,"#to_feed()":null},"guid":{"":null,"#to_feed()":null},"links":{"":null,"::link":{"":null,"#required_variable_names()":null,"#to_feed()":null},"#to_feed()":null},"rights":{"":null,"#to_feed()":null},"source":{"":null,"::":{"authors":{"":null,"::author":null,"#to_feed()":null},"categories":{"":null,"::category":null,"#to_feed()":null},"contributors":{"":null,"::contributor":null,"#to_feed()":null},"generator":{"":null,"#to_feed()":null},"icon":{"":null,"#to_feed()":null},"links":{"":null,"::link":null,"#to_feed()":null},"logo":{"":null,"#to_feed()":null},"rights":{"":null,"#to_feed()":null},"subtitle":{"":null,"#to_feed()":null},"title":{"":null,"#to_feed()":null}},"#to_feed()":null},"title":{"":null,"#required_variable_names()":null,"#to_feed()":null}},"#not_set_required_variables()":null,"#required_variable_names()":null,"#to_feed()":null},"#to_feed()":null},"textinput":{"":null,"#required_variable_names()":null,"#to_feed()":null},"new()":null},"#make_feed()":null,"#setup_elements()":null},"base":{"":null,"#make":{"()":null,"_xml_stylesheets()":null},"::":{"make()":null,"new()":null},"#to_feed()":null}},"setupdefault":{"date":{"":null,"#_":{"parse_date_if_needed()":null,"set_default_values()":null}},"language":{"":null,"#_set_default_values()":null}},"slashmodel":{"":null,"::append_features()":null},"syndicationmodel":{"":null,"::append_features()":null},"taxonomytopic":{"model":{"":null,"::":{"taxonomytopicsbase":{"":null,"::taxonomytopicbase":{"":null,"#have_required_values?()":null}},"append_features()":null,"install_taxo_topic()":null}},"smodel":{"":null,"::":{"taxonomytopicsbase":null,"append_features()":null,"install_taxo_topics()":null}}},"textinputbase":null,"trackbackmodel":{"":null,"::":{"trackbackaboutsbase":{"":null,"::trackbackaboutbase":{"":null,"#have_required_values?()":null,"#to_feed()":null}},"append_features()":null}},"xmlstylesheets":{"":null,"::xmlstylesheet":{"":null,"#guess_type_if_need()":null,"#required_variable_names()":null,"#to_feed()":null}},"[]()":null,"add_maker()":null,"make":{"()":null,"r()":null,"rs()":null},"supported?()":null,"versions()":null}},"missing":{"attributeerror":{"":null,"::new()":null},"tagerror":{"":null,"::new()":null}},"nserror":{"":null,"::new()":null},"not":{"availablevalueerror":{"":null,"::new()":null},"expectedtagerror":{"":null,"::new()":null},"seterror":{"":null,"::new()":null},"validxmlparser":{"":null,"::new()":null},"wellformederror":{"":null,"::new()":null}},"overlappedprefixerror":{"":null,"::new()":null},"parser":{"":null,"#maybe_xml?()":null,"::":{"default_parser":{"()":null,"=()":null},"new()":null,"parse()":null},"#normalize_rss()":null,"#to_uri()":null},"rdf":{"":null,"::":{"bag":{"":null,"#full_name()":null,"::":{"li":null,"new()":null,"required_uri()":null},"#setup_maker()":null},"channel":{"":null,"::":{"i":{"mage":{"":null,"::":{"new()":null,"required_uri()":null}},"tems":{"":null,"::":{"seq":null,"new()":null,"required_uri()":null},"#resources()":null}},"textinput":{"":null,"::":{"new()":null,"required_uri()":null}},"new()":null,"required_uri()":null},"#maker_target()":null,"#setup_maker_attributes()":null},"image":{"":null,"#maker_target()":null,"::":{"new()":null,"required_uri()":null}},"item":{"":null,"#maker_target()":null,"::":{"new()":null,"required_uri()":null}},"li":{"":null,"#full_name()":null,"::":{"new()":null,"required_uri()":null}},"seq":{"":null,"#full_name()":null,"::":{"li":null,"new()":null,"required_uri()":null},"#setup_maker()":null},"textinput":{"":null,"#maker_target()":null,"::":{"new()":null,"required_uri()":null}},"new()":null,"required_uri()":null},"#full_name()":null},"rexml":{"li":{"kexmlparser":{"":null,"#character()":null,"#endelement()":null,"#listener=()":null,"#processinginstruction()":null,"#startelement()":null,"#xmldecl()":null},"stener":{"":null,"::raise_for_undefined_entity?()":null,"#xmldecl()":null}},"parser":{"":null,"#_parse()":null,"::listener()":null}},"rss":{"10":{"":null,"::append_features()":null},"09":{"":null,"::append_features()":null},"#_attrs()":null,"#i":{"mage()":null,"tems()":null},"::":{"channel":{"":null,"::":{"cloud":{"":null,"::new()":null},"image":{"":null,"#maker_target()":null,"::new()":null},"item":{"":null,"::":{"category":{"":null,"#maker_target()":null,"::new()":null,"#setup_maker_attributes()":null},"enclosure":{"":null,"#maker_target()":null,"::new()":null,"#setup_maker_attributes()":null},"guid":{"":null,"#permalink?()":null,"#_permalink?()":null,"#maker_target()":null,"::new()":null,"#setup_maker_attributes()":null},"source":{"":null,"#maker_target()":null,"::new()":null,"#setup_maker_attributes()":null}},"#_setup_maker_element()":null,"#maker_target()":null,"#setup_maker_element()":null},"skip":{"days":{"":null,"::day":{"":null,"::new()":null}},"hours":{"":null,"::hour":{"":null,"::new()":null}}},"textinput":{"":null,"#maker_target()":null,"::new()":null}},"#maker_target()":null,"#not_need_to_call_setup_maker_variables()":null,"#setup_maker_elements()":null},"new()":null},"#setup_maker_elements()":null,"#textinput()":null},"rootelementmixin":{"":null,"#feed_info()":null,"#maker_target()":null,"::new()":null,"#ns_declarations()":null,"#output_encoding=()":null,"#s":{"ame_feed_type?()":null,"etup_maker()":null},"#t":{"ag()":null,"o_":{"atom()":null,"feed()":null,"rss()":null,"xml()":null}},"#xmldecl()":null},"setupmaker":{"":null,"#maker_target()":null,"#not_need_to_call_setup_maker_variables()":null,"#setup_maker":{"()":null,"_attributes()":null,"_element":{"()":null,"s()":null}}},"slashmodel":{"":null,"::append_features()":null},"syndicationmodel":{"":null,"::append_features()":null},"taxonomytopic":{"model":{"":null,"::":{"taxonomytopic":{"":null,"#full_name()":null,"#maker_target()":null,"::":{"new()":null,"required_":{"prefix()":null,"uri()":null}}},"append_features()":null}},"smodel":{"":null,"::":{"taxonomytopics":{"":null,"#full_name()":null,"#maker_target()":null,"::":{"bag":null,"new()":null,"required_":{"prefix()":null,"uri()":null}},"#resources()":null},"append_features()":null}}},"toomuchtagerror":{"":null,"::new()":null},"trackback":{"model":{"10":{"":null,"::trackback":{"about":null,"ping":null}},"20":{"":null,"::trackback":{"about":null,"ping":null}}},"utils":null},"un":{"known":{"conversionmethoderror":{"":null,"::new()":null},"tagerror":{"":null,"::new()":null}},"supportedmakerversionerror":{"":null,"::new()":null}},"utils":{"":null,"::":{"csv":{"":null,"#parse()":null},"explicitcleanother":{"":null,"#parse()":null},"inheritedreader":{"":null,"#inherited_":{"array_reader()":null,"hash_reader()":null,"reader()":null}},"yesother":{"":null,"#parse()":null}},"#element_initialize_arguments?()":null,"#get_file_and_line_from_caller()":null,"#h":{"()":null,"tml_escape()":null},"#new_with_value_if_need()":null,"#to_class_name()":null},"xml":{"":null,"::element":{"":null,"#<<()":null,"#==()":null,"#[]":{"()":null,"=()":null},"#each()":null,"#full_name()":null,"::new()":null,"#to_s()":null},"parser":{"listener":{"":null,"#xmldecl()":null},"notfound":{"":null,"::new()":null},"parser":{"":null,"#_parse()":null,"::listener()":null}},"scan":{"listener":{"":null,"#entity()":null,"#on_":{"attr":{"_":{"charref":{"()":null,"_hex()":null},"entityref()":null,"value()":null},"ibute()":null},"charref":{"()":null,"_hex()":null},"entityref()":null,"etag()":null,"stag":{"()":null,"_end":{"()":null,"_empty()":null}},"xmldecl_":{"en":{"coding()":null,"d()":null},"standalone()":null,"version()":null}}},"parser":{"":null,"#_parse()":null,"::listener()":null}},"stylesheet":{"":null,"mixin":{"":null,"::new()":null,"#xml_stylesheet_pi()":null},"#alternate=()":null,"#guess_type()":null,"#href=()":null,"::new()":null,"#setup_maker()":null,"#to_s()":null}}}},"ra":{"cc":{"":null,"::":{"cparseparams":null,"parse":{"error":null,"r":{"":null,"#_racc_":{"do_":{"parse_":{"c()":null,"rb()":null},"reduce()":null},"evalact()":null,"init_sysvars()":null,"setup()":null,"yyparse_":{"c()":null,"rb()":null}},"#do_parse()":null,"#next_token()":null,"#on_error()":null,"#racc_":{"accept()":null,"e_pop()":null,"next_state()":null,"print_sta":{"cks()":null,"tes()":null},"re":{"ad_token()":null,"duce()":null},"shift()":null,"token2str()":null},"#token_to_str()":null,"#yy":{"accept()":null,"erro":{"k()":null,"r()":null},"parse()":null}}}}},"iseerrormatcher":{"":null,"::new()":null},"ndom":{"":null,"::":{"formatter":{"":null,"#alphanumeric()":null,"#base64()":null,"#choose()":null,"#gen_random()":null,"#hex()":null,"#rand":{"()":null,"om_":{"bytes()":null,"number()":null}},"#u":{"rlsafe_base64()":null,"uid()":null}},"new":{"()":null,"_seed()":null},"rand()":null,"srand()":null,"urandom()":null}},"nge":{"":null,"specs":{"":null,"::":{"custom":{"":null,"#<=>()":null,"#==()":null,"#eql?()":null,"#inspect()":null,"::new()":null},"myrange":null,"tenfoldsucc":{"":null,"#<=>()":null,"::new()":null,"#succ()":null},"xs":{"":null,"#inspect()":null,"#succ()":null},"ys":{"":null,"#inspect()":null,"#succ()":null}}},"::":{"json_create()":null,"new()":null}},"tional":{"":null,"specs":{"":null,"::subnumeric":{"":null,"::new()":null,"#to_r()":null}},"::":{"compatible":null,"json_create()":null}},"y":{"":null,"::new()":null}},"rbinstall":{"":null,"::unpackedinstaller":{"":null,"#app_script_text()":null,"#build_extensions()":null,"#check_executable_overwrite()":null,"#generate_bin_script()":null,"::":{"dirpackage":{"":null,"#extract_files()":null},"new()":null},"#s":{"ame_bin_script?()":null,"hebang()":null},"#write_cache_file()":null}},"re":{"xml":{"":null,"::":{"att":{"listdecl":{"":null,"#[]()":null,"#each()":null,"#include?()":null,"::new()":null,"#node_type()":null,"#write()":null},"ribute":{"":null,"s":{"":null,"#<<()":null,"#[]":{"()":null,"=()":null},"#add()":null,"#delete":{"()":null,"_all()":null},"#each":{"()":null,"_attribute()":null},"#get_attribute":{"()":null,"_ns()":null},"#length()":null,"#namespaces()":null,"::new()":null,"#prefixes()":null,"#size()":null,"#to_a()":null},"#==()":null,"#clone()":null,"#doctype()":null,"#element=()":null,"#hash()":null,"#inspect()":null,"::new()":null,"#n":{"amespace()":null,"ode_type()":null},"#prefix()":null,"#remove()":null,"#to_s":{"()":null,"tring()":null},"#value()":null,"#write()":null,"#xpath()":null}},"cdata":{"":null,"#clone()":null,"::new()":null,"#to_s()":null,"#value()":null,"#write()":null},"child":{"":null,"#bytes()":null,"#document()":null,"::new()":null,"#next_sibling=()":null,"#p":{"arent=()":null,"revious_sibling=()":null},"#re":{"move()":null,"place_with()":null}},"comment":{"":null,"#<=>()":null,"#==()":null,"#clone()":null,"::new()":null,"#node_type()":null,"#write()":null},"dtd":{"":null,"::":{"attlistdecl":null,"elementdecl":{"":null,"::new()":null},"entitydecl":{"":null,"::":{"new()":null,"parse_source()":null},"#to_s()":null,"#write()":null},"notationdecl":{"":null,"::":{"new()":null,"parse_source()":null},"#to_s()":null,"#write()":null},"parser":{"":null,"::parse":{"()":null,"_helper()":null}}}},"declaration":{"":null,"::new()":null,"#to_s()":null,"#write()":null},"doc":{"type":{"":null,"#a":{"dd()":null,"ttribute":{"_of()":null,"s_of()":null}},"#c":{"lone()":null,"ontext()":null},"#entity()":null,"::new()":null,"#no":{"de_type()":null,"tation":{"()":null,"s()":null}},"#public()":null,"#s":{"trip_quotes()":null,"ystem()":null},"#write()":null},"ument":{"":null,"#<<()":null,"#add":{"()":null,"_element()":null},"#build()":null,"#clone()":null,"#doc":{"type()":null,"ument()":null},"#e":{"ncoding()":null,"xpanded_name()":null},"::":{"entity_expansion_":{"limit":{"()":null,"=()":null},"text_limit":{"()":null,"=()":null}},"new()":null,"parse_stream()":null},"#n":{"ame()":null,"ode_type()":null},"#r":{"ecord_entity_expansion()":null,"oot()":null},"#stand_alone?()":null,"#version()":null,"#write()":null,"#xml_decl()":null}},"element":{"":null,"decl":{"":null,"::new()":null},"s":{"":null,"#<<()":null,"#[]":{"()":null,"=()":null},"#add()":null,"#collect()":null,"#delete":{"()":null,"_all()":null},"#e":{"ach()":null,"mpty?()":null},"#in":{"dex()":null,"ject()":null},"#literalize()":null,"::new()":null,"#size()":null,"#to_a()":null},"#[]()":null,"#__to_xpath_helper()":null,"#a":{"dd_":{"attribute":{"()":null,"s()":null},"element()":null,"namespace()":null,"text()":null},"ttribute()":null},"#c":{"datas()":null,"lone()":null,"omments()":null},"#d":{"elete_":{"attribute()":null,"element()":null,"namespace()":null},"ocument()":null},"#each_":{"element":{"()":null,"_with_":{"attribute()":null,"text()":null}},"with_something()":null},"#get_":{"elements()":null,"text()":null},"#has_":{"attributes?()":null,"elements?()":null,"text?()":null},"#i":{"gnore_whitespace_nodes()":null,"ns":{"pect()":null,"tructions()":null}},"::new()":null,"#n":{"amespace":{"()":null,"s()":null},"ext_element()":null,"ode_type()":null},"#pre":{"fixes()":null,"vious_element()":null},"#r":{"aw()":null,"oot":{"()":null,"_node()":null}},"#text":{"()":null,"=()":null,"s()":null},"#w":{"hitespace()":null,"rite()":null},"#xpath()":null},"en":{"coding":{"":null,"#decode()":null,"#encod":{"e()":null,"ing=()":null},"#find_encoding()":null},"tity":{"":null,"const":null,"::":{"matches?()":null,"new()":null},"#normalized()":null,"#to_s()":null,"#unnormalized()":null,"#value()":null,"#write()":null}},"externalentity":{"":null,"::new()":null,"#to_s()":null,"#write()":null},"formatters":{"":null,"::":{"default":{"":null,"::new()":null,"#write":{"()":null,"_c":{"data()":null,"omment()":null},"_document()":null,"_element()":null,"_instruction()":null,"_text()":null}},"pretty":{"":null,"#indent_text()":null,"::new()":null,"#wr":{"ap()":null,"ite_":{"c":{"data()":null,"omment()":null},"document()":null,"element()":null,"text()":null}}},"transitive":{"":null,"::new()":null,"#write_":{"element()":null,"text()":null}}}},"functions":{"":null,"::":{"boolean()":null,"ceiling()":null,"co":{"mpare_language()":null,"ncat()":null,"nt":{"ains()":null,"ext=()":null},"unt()":null},"false()":null,"floor()":null,"get_namespace()":null,"id()":null,"la":{"ng()":null,"st()":null},"local_name()":null,"name":{"()":null,"space_":{"context":{"()":null,"=()":null},"uri()":null}},"no":{"rmalize_space()":null,"t()":null},"number()":null,"position()":null,"processing_instruction()":null,"round()":null,"send()":null,"singleton_method_added()":null,"st":{"arts_with()":null,"ring":{"()":null,"_length()":null,"_value()":null}},"su":{"bstring":{"()":null,"_after()":null,"_before()":null},"m()":null},"text()":null,"tr":{"anslate()":null,"ue()":null},"variables":{"()":null,"=()":null}}},"iosource":{"":null,"#c":{"onsume()":null,"urrent_line()":null},"#e":{"mpty?()":null,"ncoding_updated()":null},"#match()":null,"::new()":null,"#position()":null,"#read":{"()":null,"line()":null},"#scan()":null},"instruction":{"":null,"#==()":null,"#clone()":null,"#inspect()":null,"::new()":null,"#node_type()":null,"#write()":null},"light":{"":null,"::node":{"":null,"#<<()":null,"#=~()":null,"#[]":{"()":null,"=()":null},"#children()":null,"#each()":null,"#has_name?()":null,"#local_name":{"()":null,"=()":null},"::new()":null,"#n":{"ame":{"()":null,"=()":null,"sp":{"ace":{"()":null,"=()":null,"_of()":null},"lit()":null}},"ode_type()":null},"#p":{"arent":{"()":null,"=()":null},"refix":{"()":null,"_of()":null}},"#root()":null,"#size()":null,"#t":{"ext=()":null,"o_s()":null}}},"namespace":{"":null,"#fully_expanded_name()":null,"#has_name?()":null,"#name=()":null},"no":{"de":{"":null,"#each_recursive()":null,"#find_first_recursive()":null,"#inde":{"nt()":null,"x_in_parent()":null},"#next_sibling_node()":null,"#p":{"arent?()":null,"revious_sibling_node()":null},"#to_s()":null},"tationdecl":{"":null,"#name()":null,"::new()":null,"#to_s()":null,"#write()":null}},"output":{"":null,"#<<()":null,"::new()":null,"#to_s()":null},"par":{"ent":{"":null,"#<<()":null,"#[]":{"()":null,"=()":null},"#add()":null,"#children()":null,"#de":{"ep_clone()":null,"lete":{"()":null,"_at()":null,"_if()":null}},"#each":{"()":null,"_child()":null,"_index()":null},"#in":{"dex()":null,"sert_":{"after()":null,"before()":null}},"#length()":null,"::new()":null,"#p":{"arent?()":null,"ush()":null},"#replace_child()":null,"#size()":null,"#to_a()":null,"#unshift()":null},"se":{"exception":{"":null,"#context()":null,"#line()":null,"::new()":null,"#position()":null,"#to_s()":null},"rs":{"":null,"::":{"baseparser":{"":null,"#add_listener()":null,"#e":{"mpty?()":null,"ntity()":null},"#has_next?()":null,"::new()":null,"#n":{"eed_source_encoding_update?()":null,"ormalize()":null},"#p":{"eek()":null,"osition()":null,"ull":{"()":null,"_event()":null}},"#stream=()":null,"#un":{"normalize()":null,"shift()":null}},"lightparser":{"":null,"#add_listener()":null,"::new()":null,"#parse()":null,"#rewind()":null},"pull":{"event":{"":null,"#[]()":null,"#attlistdecl?()":null,"#c":{"data?()":null,"omment?()":null},"#doctype?()":null,"#e":{"lementdecl?()":null,"nd_element?()":null,"ntity":{"?()":null,"decl?()":null},"rror?()":null,"vent_type()":null},"#ins":{"pect()":null,"truction?()":null},"::new()":null,"#notationdecl?()":null,"#start_element?()":null,"#text?()":null,"#xmldecl?()":null},"parser":{"":null,"#add_listener()":null,"#each()":null,"::new()":null,"#p":{"eek()":null,"ull()":null},"#unshift()":null}},"sax2parser":{"":null,"#add":{"()":null,"_listener()":null},"#deafen()":null,"#get_":{"listeners()":null,"namespace()":null,"procs()":null},"#handle":{"()":null,"_entitydecl()":null},"#listen()":null,"::new()":null,"#parse()":null,"#source()":null},"streamparser":{"":null,"#add_listener()":null,"::new()":null,"#parse()":null},"treeparser":{"":null,"#add_listener()":null,"::new()":null,"#parse()":null},"ultralightparser":{"":null,"#add_listener()":null,"::new()":null,"#parse()":null,"#rewind()":null},"xpathparser":{"":null,"#a":{"dditiveexpr()":null,"ndexpr()":null,"bbreviate()":null},"#f":{"ilterexpr()":null,"unctioncall()":null},"#locationpath()":null,"#multiplicativeexpr()":null,"#orexpr()":null,"#p":{"athexpr()":null,"rimaryexpr()":null,"arse":{"()":null,"_args()":null},"redicate":{"()":null,"_to_string()":null}},"#relati":{"onalexpr()":null,"velocationpath()":null},"#un":{"aryexpr()":null,"ionexpr()":null},"#e":{"qualityexpr()":null,"xpand()":null},"#get_group()":null,"#n":{"odetest()":null,"amespaces=()":null}}}}}},"quickpath":{"":null,"::":{"a":{"ttribute()":null,"xe()":null},"each()":null,"fi":{"lter()":null,"rst()":null},"function()":null,"match()":null,"method_missing()":null,"name()":null,"parse_args()":null,"predicate()":null}},"sax2listener":{"":null,"#attlistdecl()":null,"#c":{"data()":null,"haracters()":null,"omment()":null},"#doctype()":null,"#e":{"lementdecl()":null,"nd_":{"document()":null,"element()":null,"prefix_mapping()":null},"ntitydecl()":null},"#notationdecl()":null,"#pro":{"cessing_instruction()":null,"gress()":null},"#start_":{"document()":null,"element()":null,"prefix_mapping()":null},"#xmldecl()":null},"security":{"":null,"::entity_expansion_":{"limit":{"()":null,"=()":null},"text_limit":{"()":null,"=()":null}}},"source":{"":null,"factory":{"":null,"::create_from()":null},"#c":{"onsume()":null,"urrent_line()":null},"#detect_encoding()":null,"#e":{"mpty?()":null,"ncoding":{"=()":null,"_updated()":null}},"#match":{"()":null,"_to":{"()":null,"_consume()":null}},"::new()":null,"#position()":null,"#read()":null,"#scan()":null},"streamlistener":{"":null,"#attlistdecl()":null,"#c":{"data()":null,"omment()":null},"#doctype":{"()":null,"_end()":null},"#e":{"lementdecl()":null,"ntity":{"()":null,"decl()":null}},"#instruction()":null,"#notationdecl()":null,"#t":{"ag_":{"end()":null,"start()":null},"ext()":null},"#xmldecl()":null},"syncenumerator":{"":null,"#each()":null,"#length()":null,"::new()":null,"#size()":null},"text":{"":null,"#<":{"<()":null,"=>()":null},"#cl":{"ear_cache()":null,"one()":null},"#doctype()":null,"#empty?()":null,"::":{"check()":null,"expand()":null,"new()":null,"normalize()":null,"read_with_substitution()":null,"unnormalize()":null},"#in":{"dent_text()":null,"spect()":null},"#node_type()":null,"#parent=()":null,"#to_s()":null,"#value":{"()":null,"=()":null},"#wr":{"ap()":null,"ite":{"()":null,"_with_substitution()":null}},"#xpath()":null},"undefinednamespaceexception":{"":null,"::new()":null},"validation":{"":null,"::":{"choice":{"":null,"#<<()":null,"#add_event_to_arry()":null,"#expected()":null,"#inspect()":null,"#matches?()":null,"::new()":null,"#next()":null,"#reset()":null},"event":{"":null,"#==()":null,"#done?()":null,"#inspect()":null,"#matches?()":null,"::new()":null,"#single?()":null,"#to_s()":null},"interleave":{"":null,"#expected()":null,"#inspect()":null,"#matches?()":null,"::new()":null,"#next":{"()":null,"_current()":null},"#reset()":null},"oneormore":{"":null,"#expected()":null,"#matches?()":null,"::new()":null,"#next()":null,"#reset()":null},"optional":{"":null,"#expected()":null,"#matches?()":null,"#next()":null},"re":{"f":{"":null,"#inspect()":null,"::new()":null,"#to_s()":null},"laxng":{"":null,"::new()":null,"#receive()":null}},"sequence":{"":null,"#matches?()":null},"state":{"":null,"#<<()":null,"#add_event_to_arry()":null,"#exp":{"and_ref_in()":null,"ected()":null},"#generate_event()":null,"#inspect()":null,"::new()":null,"#next()":null,"#previous=()":null,"#reset()":null,"#to_s()":null},"validat":{"ionexception":{"":null,"::new()":null},"or":{"":null,"#dump()":null,"#reset()":null,"#validate()":null}},"zeroormore":{"":null,"#expected()":null,"#next()":null}}},"xml":{"decl":{"":null,"#==()":null,"#c":{"lone()":null,"ontent()":null},"#dowrite()":null,"#encoding=()":null,"#inspect()":null,"::":{"default()":null,"new()":null},"#no":{"de_type()":null,"write()":null},"#old_enc=()":null,"#write()":null,"#xmldecl()":null},"tokens":null},"xpath":{"":null,"parser":{"":null,"#[]=()":null,"#compare()":null,"#d":{"_o_s()":null,"escendant_or_self()":null,"ocument_order()":null},"#e":{"quality_relational_compare()":null,"xpr()":null},"#f":{"irst()":null,"ollowing":{"()":null,"_node_of()":null}},"#get_":{"first()":null,"namespace()":null},"#match()":null,"::new()":null,"#n":{"amespaces=()":null,"ext_sibling_node()":null,"orm()":null},"#p":{"arse()":null,"re":{"ceding":{"()":null,"_node_of()":null},"dicate()":null}},"#recurse()":null,"#variables=()":null},"::":{"each()":null,"first()":null,"match()":null}}}},"adline":{"":null,"::":{"basic_":{"quote_characters":{"()":null,"=()":null},"word_break_characters":{"()":null,"=()":null}},"complet":{"er_":{"quote_characters":{"()":null,"=()":null},"word_break_characters":{"()":null,"=()":null}},"ion_":{"append_character":{"()":null,"=()":null},"case_fold":{"()":null,"=()":null},"proc":{"()":null,"=()":null}}},"delete_text()":null,"emacs_editing_mode":{"()":null,"?()":null},"filename_quote_characters":{"()":null,"=()":null},"get_screen_size()":null,"in":{"put=()":null,"sert_text()":null},"line_buffer()":null,"output=()":null,"point":{"()":null,"=()":null},"pre_input_hook":{"()":null,"=()":null},"quoting_detection_proc":{"()":null,"=()":null},"re":{"adline()":null,"display()":null,"fresh_line()":null},"set_screen_size()":null,"special_prefixes":{"()":null,"=()":null},"vi_editing_mode":{"()":null,"?()":null}}},"dblacktree":{"":null,"::n":{"ilnode":{"":null,"::":{"instance()":null,"new()":null},"#nil?()":null},"ode":{"":null,"#black?()":null,"::new()":null,"#red?()":null},"ew()":null}},"flectspecs":{"":null,"::":{"a":{"":null,"#a_p":{"r":{"i()":null,"o()":null},"ub()":null},"::":{"as_p":{"r":{"i()":null,"o()":null},"ub()":null},"pr":{"i()":null,"o()":null},"pub()":null}},"b":{"":null,"#b_p":{"r":{"i()":null,"o()":null},"ub()":null},"::":{"bs_p":{"r":{"i()":null,"o()":null},"ub()":null},"pr":{"i()":null,"o()":null},"pub()":null}},"c":{"":null,"#c_p":{"r":{"i()":null,"o()":null},"ub()":null},"::":{"cs_p":{"r":{"i()":null,"o()":null},"ub()":null},"pr":{"i()":null,"o()":null},"pub()":null}},"d":{"":null,"#d_p":{"r":{"i()":null,"o()":null},"ub()":null},"::ds_p":{"r":{"i()":null,"o()":null},"ub()":null},"#p":{"r":{"i()":null,"o()":null},"ub()":null}},"e":{"":null,"#e_p":{"r":{"i()":null,"o()":null},"ub()":null},"::es_p":{"r":{"i()":null,"o()":null},"ub()":null},"#p":{"r":{"i()":null,"o()":null},"ub()":null}},"f":{"":null,"#f_p":{"r":{"i()":null,"o()":null},"ub()":null},"::fs_p":{"r":{"i()":null,"o()":null},"ub()":null}},"k":null,"l":{"":null,"#l_p":{"r":{"i()":null,"o()":null},"ub()":null},"::ls_p":{"r":{"i()":null,"o()":null},"ub()":null}},"m":{"":null,"#m_p":{"r":{"i()":null,"o()":null},"ub()":null},"::ms_p":{"r":{"i()":null,"o()":null},"ub()":null},"#p":{"r":{"i()":null,"o()":null},"ub()":null}},"n":{"":null,"#n_p":{"r":{"i()":null,"o()":null},"ub()":null},"::ns_p":{"r":{"i()":null,"o()":null},"ub()":null}},"o":{"":null,"()":null,"e()":null,"ed()":null,"ee()":null,"ei()":null,"s()":null},"p":null}},"gexp":{"":null,"specssubclass":{"":null,"::new()":null},"::":{"compile()":null,"escape()":null,"json_create()":null,"last_match()":null,"new()":null,"quote()":null,"try_convert()":null,"union()":null}},"scuespecs":{"":null,"::begin_else":{"()":null,"_ensure()":null,"_return":{"()":null,"_ensure()":null}}},"solv":{"":null,"::":{"dns":{"":null,"::":{"config":{"":null,"::":{"nxdomain":null,"otherresolverror":null}},"decodeerror":null,"encodeerror":null,"name":{"":null,"#absolute?()":null,"::create()":null,"#subdomain_of?()":null,"#to_s()":null},"query":null,"re":{"quester":{"":null,"::requesterror":null},"source":{"":null,"::":{"any":null,"cname":null,"domainname":{"":null,"::new()":null},"generic":{"":null,"::new()":null},"hinfo":{"":null,"::new()":null},"in":{"":null,"::":{"a":{"":null,"aaa":{"":null,"::new()":null},"::new()":null},"srv":{"":null,"::new()":null},"wks":{"":null,"::new()":null}}},"loc":{"":null,"::new()":null},"minfo":{"":null,"::new()":null},"mx":{"":null,"::new()":null},"ns":null,"ptr":null,"soa":{"":null,"::new()":null},"txt":{"":null,"#data()":null,"::new()":null}}}},"new()":null,"open()":null},"#close()":null,"#each_":{"address()":null,"name()":null,"resource()":null},"#fetch_resource()":null,"#get":{"address":{"()":null,"es()":null},"name":{"()":null,"s()":null},"resource":{"()":null,"s()":null}},"#timeouts=()":null},"hosts":{"":null,"#each_":{"address()":null,"name()":null},"#get":{"address":{"()":null,"es()":null},"name":{"()":null,"s()":null}},"::new()":null},"ipv":{"4":{"":null,"::create()":null,"#to_name()":null},"6":{"":null,"::create()":null,"#to_name()":null}},"loc":{"":null,"::":{"alt":{"":null,"::":{"create()":null,"new()":null}},"coord":{"":null,"::":{"create()":null,"new()":null}},"size":{"":null,"::":{"create()":null,"new()":null}}}},"mdns":{"":null,"#each_address()":null,"::new()":null},"resolv":{"error":null,"timeout":null},"sz":{"":null,"#read_s()":null},"wscontrol":{"":null,"::":{"get_iflist()":null,"wsctl()":null}},"each_":{"address()":null,"name()":null},"get":{"_":{"d":{"hcpinfo":{"()":null,"_9":{"5()":null,"8()":null},"_key()":null},"ns_server_list()":null},"hosts_":{"dir()":null,"path()":null},"info()":null,"resolv_info()":null},"address":{"()":null,"es()":null},"name":{"()":null,"s()":null}},"new()":null}},"spondtomatcher":{"":null,"::new()":null},"turnspecs":{"":null,"::":{"blocks":{"":null,"#enclosing_method()":null,"#yielding_method()":null},"definemethod":{"":null,"#outer()":null},"methodwithblock":{"":null,"#get_ary()":null,"#method":{"1()":null,"2()":null}},"nested":{"blocks":{"":null,"#enclosing_method()":null},"calls":{"":null,"#enclosing_method()":null,"#invoking_method()":null}},"savedinnerblock":{"":null,"#add()":null,"#inner()":null,"#outer()":null,"#start()":null},"throughdefinemethod":{"":null,"#mp()":null,"#outer()":null}}}},"ri":{"n":{"da":{"":null,"::":{"drbobjecttemplate":{"":null,"#===()":null,"::new()":null},"invalidhashtuplekey":null,"notifytemplateentry":{"":null,"#each()":null,"::new()":null,"#notify()":null,"#pop()":null},"request":{"cancelederror":null,"expirederror":null},"rin":{"daerror":null,"gfinger":{"":null,"#each()":null,"#lookup_ring":{"()":null,"_any()":null},"::":{"finger()":null,"new()":null,"primary()":null,"to_a()":null},"#to_a()":null},"gprovider":{"":null,"::new()":null,"#provide()":null},"gserver":{"":null,"#do_":{"reply()":null,"write()":null},"#make_socket()":null,"::new()":null,"#reply_service()":null,"#shutdown()":null,"#write_services()":null}},"simplerenewer":{"":null,"::new()":null,"#renew()":null},"template":{"":null,"entry":{"":null,"#===()":null,"#match()":null},"#===()":null,"#match()":null},"tuple":{"":null,"bag":{"":null,"::tuplebin":{"":null,"#add()":null,"#delete()":null,"#find()":null,"::new()":null},"#bin_":{"for_find()":null,"key()":null},"#delete":{"()":null,"_unless_alive()":null},"#each_entry()":null,"#find":{"()":null,"_all":{"()":null,"_template()":null}},"#has_expires?()":null,"#push()":null},"entry":{"":null,"#[]()":null,"#alive?()":null,"#cancel":{"()":null,"ed?()":null},"#expired?()":null,"#fetch()":null,"#get_renewer()":null,"#make_":{"expires()":null,"tuple()":null},"::new()":null,"#renew()":null,"#size()":null,"#value()":null},"space":{"":null,"proxy":{"":null,"::new()":null,"#notify()":null,"#read":{"()":null,"_all()":null},"#take()":null,"#write()":null},"#create_entry()":null,"#keep_clean()":null,"#move()":null,"::new()":null,"#n":{"eed_keeper?()":null,"otify":{"()":null,"_event()":null}},"#read":{"()":null,"_all()":null},"#start_keeper()":null,"#take()":null,"#write()":null},"#[]()":null,"#each()":null,"#fetch()":null,"#hash?()":null,"#init_with_":{"ary()":null,"hash()":null},"::new()":null,"#size()":null,"#value()":null},"waittemplateentry":{"":null,"#cancel()":null,"::new()":null,"#read()":null,"#signal()":null,"#wait()":null}}},"g":{"":null,"echo":{"":null,"::new()":null},"::new()":null}},"pper":{"":null,"::":{"filter":{"":null,"#column()":null,"#filename()":null,"#lineno()":null,"::new()":null,"#on_default()":null,"#parse()":null,"#state()":null},"lex()":null,"parse()":null,"sexp":{"()":null,"_raw()":null},"slice()":null,"tokenize()":null}}},"rotation":{"":null,"::new()":null},"ruby":{"2html":{"":null,"::compile()":null},"implementation":{"":null,"::new()":null},"token":{"":null,"::t":{"k":{"error":null,"id":null,"node":null,"opasgn":null,"op":null,"unknownchar":null,"val":null},"oken":null}},"vm":{"":null,"::":{"ins":{"nsin":{"cgenerator":{"":null,"#generate()":null},"foincgenerator":{"":null,"#generate()":null,"#max_length()":null,"#op2typesig()":null}},"truction":{"":null,"sequence":{"":null,"::":{"basicstorage":{"":null,"#compile_and_save_iseq()":null,"#extra_data()":null,"#iseq_key_name()":null,"#load_iseq()":null,"::new()":null},"dbmstorage":{"":null,"#compiled_iseq_":{"exist?()":null,"is_younger?()":null},"#date_key_name()":null,"#iseq_key_name()":null,"::new()":null,"#read_compiled_iseq()":null,"#unlink_compiled_iseq()":null,"#write_compiled_iseq()":null},"fs":{"2storage":{"":null,"#iseq_key_name()":null},"storage":{"":null,"#compiled_iseq_":{"exist?()":null,"is_younger?()":null},"#iseq_key_name()":null,"::new()":null,"#read_compiled_iseq()":null,"#unlink_compiled_iseq()":null,"#write_compiled_iseq()":null}},"nullstorage":{"":null,"#compile_and_save_isq()":null,"#load_iseq()":null,"#unlink_compiled_iseq()":null},"compile":{"()":null,"_and_save_iseq()":null,"_file()":null,"_option":{"()":null,"=()":null}},"disas":{"m()":null,"semble()":null},"load_":{"from_binary":{"()":null,"_extra_data()":null},"iseq()":null},"new()":null,"of()":null,"unlink_compiled_iseq()":null},"#absolute_path()":null,"#base_label()":null,"#disas":{"m()":null,"semble()":null},"#e":{"ach_child()":null,"val()":null},"#first_lineno()":null,"#inspect()":null,"#label()":null,"#path()":null,"#t":{"o_":{"a()":null,"binary()":null},"race_points()":null}},"sloader":{"":null,"#[]()":null,"#a":{"dd_":{"insn()":null,"opt_operand()":null,"stack_value()":null},"ll_combination()":null},"#calc_stack()":null,"#each()":null,"#l":{"abel_escape()":null,"oad_":{"insn":{"_unification_def()":null,"s_def()":null},"opt_operand_def()":null,"vm_opts()":null}},"#m":{"ake_":{"insn":{"()":null,"_operand_optimized()":null,"_sc()":null},"stackcaching_insns()":null,"trace_insns()":null,"unified_insn":{"_each()":null,"s()":null}},"k_private_val":{"()":null,"2()":null}},"::":{"complement_name()":null,"new()":null},"#parse_":{"comment()":null,"vars()":null},"#size()":null,"#vm_opt?()":null},"#add_":{"optimized()":null,"sc()":null,"unif()":null},"#inspect()":null,"::new()":null,"#s":{"et_sc()":null,"p_increase_c_expr()":null}}},"minsnsincgenerator":{"":null,"#generate()":null},"opt":{"insnincgenerator":{"":null,"#generate()":null,"#optinsn_inc()":null,"#val_as_type()":null},"scincgenerator":{"":null,"#generate()":null},"unifsincgenerator":{"":null,"#generate()":null}},"sourcecodegenerator":{"":null,"#build_string()":null,"#comm":{"ent()":null,"it()":null},"::":{"build()":null,"def_options()":null,"new()":null},"#generate()":null,"#output_path()":null,"#template()":null,"#use_const?()":null,"#v":{"erbose?()":null,"path()":null}},"vm":{"bodygenerator":{"":null,"#each_footer_stack_val()":null,"#generate":{"()":null,"_from_insnname()":null},"#make_":{"footer":{"()":null,"_default_operands()":null,"_stack_val()":null,"_undefs()":null},"header":{"()":null,"_analysis()":null,"_de":{"bug()":null,"fault_operands()":null,"fines()":null},"_operands()":null,"_p":{"c()":null,"opn()":null,"repare_stack()":null},"_stack_":{"pops()":null,"val()":null},"_temporary_vars()":null},"insn_def()":null}},"tcincgenerator":{"":null,"#generate()":null}},"ya":{"rvdocgenerator":{"":null,"#desc":{"()":null,"_en()":null,"_ja()":null},"#generate()":null},"smdatarbgenerator":{"":null,"#generate()":null}},"stat()":null}}},"s":{"":null,"dbm":{"":null,"::":{"new()":null,"open()":null}},"ha1constants":{"":null,"::klass":null},"canf":{"":null,"::formats":{"pecifier":null,"tring":null}},"cene":{"":null,"::new()":null},"cratchpad":{"":null,"::":{"<<()":null,"clear()":null,"record":{"()":null,"ed()":null}}},"ecurerandom":{"":null,"::":{"bytes()":null,"gen_random":{"()":null,"_openssl()":null,"_urandom()":null}}},"endspecs":{"":null,"::foo":{"":null,"::bar()":null,"#ba":{"r()":null,"z()":null},"#foo()":null}},"eq":{"":null,"::new()":null},"et":{"":null,"::":{"[]()":null,"new()":null}},"hell":{"":null,"::":{"append":{"file":{"":null,"#input=()":null,"::new()":null},"io":{"":null,"#input=()":null,"::new()":null}},"builtincommand":{"":null,"#active?()":null,"#wait?()":null},"cat":{"":null,"#each()":null,"::new()":null},"co":{"mmandprocessor":{"":null,"#[]()":null,"#append()":null,"#c":{"at()":null,"oncat()":null},"::":{"alias_":{"command()":null,"map()":null},"def_system_command()":null,"initialize()":null,"method_added()":null,"new()":null,"run_config()":null,"un":{"alias_command()":null,"def_system_command()":null}},"#e":{"cho()":null,"xpand_path()":null},"#f":{"ind_system_command()":null,"oreach()":null},"#glob()":null,"#mkdir()":null,"#notify()":null,"#o":{"pen()":null,"ut()":null},"#r":{"ehash()":null,"mdir()":null},"#system()":null,"#t":{"e":{"e()":null,"st()":null},"op_level_test()":null,"ransact()":null},"#unlink()":null},"ncat":{"":null,"#each()":null,"::new()":null}},"echo":{"":null,"#each()":null,"::new()":null},"error":null,"filter":{"":null,"#+()":null,"#<()":null,"#>":{"()":null,">()":null},"#each()":null,"#in":{"put=()":null,"spect()":null},"::new()":null,"#to_":{"a()":null,"s()":null},"#|()":null},"glob":{"":null,"#each()":null,"::new()":null},"processcontroller":{"":null,"#a":{"ctive_job":{"?()":null,"s()":null,"s_exist?()":null},"dd_schedule()":null},"::":{"activ":{"ate()":null,"e_process_controllers()":null},"block_output_synchronize()":null,"each_active_object()":null,"inactivate()":null,"new()":null,"wait_to_finish_all_process_controllers()":null},"#jobs":{"()":null,"_exist?()":null},"#kill_job()":null,"#s":{"fork()":null,"tart_job()":null},"#terminate_job()":null,"#wait":{"_all_jobs_execution()":null,"ing_job":{"?()":null,"s()":null,"s_exist?()":null}}},"systemcommand":{"":null,"#active?()":null,"#each()":null,"#flush()":null,"#input=()":null,"#kill()":null,"::new()":null,"#notify()":null,"#s":{"tart":{"()":null,"_export()":null,"_import()":null},"uper_each()":null},"#terminate()":null,"#wait?()":null},"tee":{"":null,"#each()":null,"::new()":null},"void":{"":null,"#each()":null,"::new()":null},"alias_command()":null,"cd()":null,"de":{"bug=()":null,"f_system_command()":null,"fault_":{"record_separator":{"()":null,"=()":null},"system_path":{"()":null,"=()":null}}},"install_system_commands()":null,"new()":null,"notify()":null,"un":{"alias_command()":null,"def_system_command()":null}},"words":{"":null,"::":{"escape()":null,"join()":null,"shell":{"escape()":null,"join()":null,"split()":null,"words()":null},"split()":null}}},"houldspecsmonitor":{"":null,"::new()":null},"ign":{"al":{"":null,"exception":{"":null,"::new()":null},"::":{"list()":null,"signame()":null,"trap()":null}},"edzeromatcher":{"":null,"::new()":null}},"impletuplespace":{"":null,"::new()":null},"ingleton":{"":null,"specs":{"":null,"::":{"myclass":{"":null,"child":null},"newspec":null,"notinstantiated":null}},"::":{"_load()":null,"append_features()":null,"included()":null}},"izedqueue":{"":null,"::new()":null},"ock":{"ssocket":{"":null,"::new()":null},"et":{"":null,"::":{"ancillarydata":{"":null,"#cmsg_is?()":null,"#data()":null,"#family()":null,"#i":{"n":{"spect()":null,"t()":null},"p_pktinfo()":null,"pv6_pktinfo":{"()":null,"_addr()":null,"_ifindex()":null}},"#level()":null,"::":{"i":{"nt()":null,"p_pktinfo()":null,"pv6_pktinfo()":null},"new()":null,"unix_rights()":null},"#t":{"imestamp()":null,"ype()":null},"#unix_rights()":null},"ifaddr":{"":null,"#addr()":null,"#broadaddr()":null,"#dstaddr()":null,"#flags()":null,"#i":{"findex()":null,"nspect()":null},"#n":{"ame()":null,"etmask()":null},"#vhid()":null},"option":{"":null,"#b":{"ool()":null,"yte()":null},"#data()":null,"#family()":null,"::":{"b":{"ool()":null,"yte()":null},"int()":null,"ipv4_multicast_":{"loop()":null,"ttl()":null},"linger()":null,"new()":null},"#i":{"n":{"spect()":null,"t()":null},"pv4_multicast_":{"loop()":null,"ttl()":null}},"#l":{"evel()":null,"inger()":null},"#optname()":null,"#to_s()":null,"#unpack()":null},"accept_loop()":null,"get":{"addrinfo()":null,"host":{"by":{"addr()":null,"name()":null},"name()":null},"ifaddrs()":null,"nameinfo()":null,"servby":{"name()":null,"port()":null}},"ip_address_list()":null,"new()":null,"pa":{"ck_sockaddr_":{"in()":null,"un()":null},"ir()":null},"sock":{"addr_":{"in()":null,"un()":null},"etpair()":null},"tcp":{"()":null,"_server_":{"loop()":null,"sockets()":null}},"udp":{"source":{"":null,"::new()":null,"#reply()":null},"_server_":{"loop":{"()":null,"_on()":null},"recv()":null,"sockets()":null}},"un":{"ix":{"()":null,"_s":{"erver_":{"loop()":null,"socket()":null},"ocket_abstract_name?()":null}},"pack_sockaddr_":{"in()":null,"un()":null}}},"specs":{"":null,"::":{"spectcpserver":{"":null,"#log()":null,"::new()":null,"#s":{"ervice()":null,"hutdown()":null}},"addr()":null,"hostname":{"()":null,"v6()":null},"reserved_unused_port()":null,"rm_socket()":null,"sock":{"addr_in()":null,"et_path()":null}}}}},"ortedset_flattenspecs":{"":null,"::comparablesortedset":{"":null,"#<=>()":null}},"pec":{"e":{"valuate":{"":null,"::":{"desc":{"()":null,"=()":null},"new()":null}},"xpectation":{"":null,"::fail_with()":null}},"guard":{"":null,"::":{"clear":{"()":null,"_guards()":null},"finish()":null,"guards()":null,"new()":null,"report()":null,"ruby_version()":null}},"negativeoperatormatcher":{"":null,"::new()":null},"positiveoperatormatcher":{"":null,"::new()":null},"tag":{"":null,"::new()":null},"version":{"":null,"::new()":null},"s":{"":null,"::kernel":{"":null,"::has":{"equal":{"":null,"#equal?()":null},"none":null,"op":{"equal":{"":null,"#==()":null},"poopequal":{"":null,"#==()":null,"#equal?()":null}}}}}},"phere":{"":null,"::new()":null},"pinnerformatter":{"":null,"::new()":null},"quigglyheredocspecs":{"":null,"::":{"blank()":null,"doublequoted()":null,"least_indented_on_the_last_line()":null,"message()":null,"singlequoted()":null,"unquoted()":null}},"tr":{"ing":{"":null,"io":{"":null,"specs":{"":null,"::build()":null},"::":{"new()":null,"open()":null}},"scanner":{"":null,"::":{"error":null,"must_c_version()":null,"new()":null}},"specs":{"":null,"::":{"i":{"so88599encoding":{"":null,"#ascii_only()":null,"#cedilla()":null,"#source_encoding()":null,"#x_escape()":null},"nitializestring":{"":null,"#initialize_copy()":null,"::new()":null}},"my":{"array":null,"range":null,"string":null},"string":{"module":{"":null,"#repr()":null},"withraisingconstructor":{"":null,"::new()":null}},"substring":{"":null,"::new()":null},"utf8encoding":{"":null,"::":{"egrave()":null,"source_encoding()":null}}}},"::":{"new()":null,"try_convert()":null}},"uct":{"":null,"classes":{"":null,"::":{"apple":null,"honda":{"":null,"::new()":null},"subclassx":{"":null,"::new()":null}}},"::":{"json_create()":null,"new()":null}}},"ub":{"":null,"tracter":{"":null,"::new()":null}},"uper":{"":null,"::":{"a":{"lias":{"1":{"":null,"#name()":null},"2":{"":null,"#name()":null,"::new()":null},"3":null,"withsuper":{"":null,"::":{"as1":{"":null,"#foo()":null},"bs1":{"":null,"#foo()":null},"base":null,"trigger":{"":null,"::foo":{"()":null,"_baz()":null,"_quux()":null}}}}},"nonymousmoduleincludedtwice":{"":null,"base":{"":null,"#a()":null,"::whatever()":null}}},"frombasicobject":{"":null,"#__send__()":null},"in":{"cludes":{"frombasic":{"":null,"#foobar()":null},"intermediate":{"":null,"#foobar()":null}},"termediatebasic":null},"keywords":{"":null,"::":{"arguments":{"":null,"#foo()":null},"optionala":{"ndplaceholderarguments":{"":null,"#foo()":null},"rguments":{"":null,"#foo()":null}},"placeholderarguments":{"":null,"#foo()":null},"requireda":{"nd":{"optionala":{"ndplaceholderarguments":{"":null,"#foo()":null},"rguments":{"":null,"#foo()":null}},"placeholderarguments":{"":null,"#foo()":null}},"rguments":{"":null,"#foo()":null}}}},"mm_":{"a":null,"b":{"":null,"#is_a?()":null,"#method_missing()":null}},"ms":{"1":{"":null,"::":{"a":null,"b":{"":null,"#foo()":null},"mod":{"a":{"":null,"#bar()":null,"#foo()":null},"b":{"":null,"#bar()":null}}}},"2":{"":null,"::":{"a":{"":null,"#baz()":null},"b":null,"c":{"":null,"#baz()":null},"modb":{"":null,"#foo()":null}}},"3":{"":null,"::":{"a":{"":null,"#foo()":null},"b":{"":null,"::":{"bar()":null,"foo()":null}},"moda":{"":null,"#bar()":null,"#foo()":null}}},"4":{"":null,"::":{"a":null,"layer":{"1":{"":null,"#example()":null},"2":{"":null,"#example()":null}}}}},"multisupertargets":{"":null,"::":{"a":null,"b":{"":null,"ase":{"a":{"":null,"#foo()":null},"b":{"":null,"#foo()":null}}},"m":{"":null,"#foo()":null}}},"re":{"gularandkeywords":{"":null,"::":{"arguments":{"":null,"#foo()":null},"optionala":{"ndplaceholderarguments":{"":null,"#foo()":null},"rguments":{"":null,"#foo()":null}},"placeholderarguments":{"":null,"#foo()":null},"requireda":{"nd":{"optionala":{"ndplaceholderarguments":{"":null,"#foo()":null},"rguments":{"":null,"#foo()":null}},"placeholderarguments":{"":null,"#foo()":null}},"rguments":{"":null,"#foo()":null}}}},"stargswithsuper":{"":null,"::":{"a":{"":null,"#a()":null},"b":{"":null,"#a()":null}}}},"s1":{"":null,"::":{"a":{"":null,"#bar()":null,"#foo()":null},"b":{"":null,"#bar()":null,"#foo()":null}}},"s2":{"":null,"::":{"a":{"":null,"#baz()":null},"b":{"":null,"#foo()":null},"c":{"":null,"#baz()":null}}},"s3":{"":null,"::":{"a":{"":null,"#foo()":null,"::":{"bar()":null,"foo()":null}},"b":{"":null,"::":{"bar()":null,"foo()":null}}}},"s4":{"":null,"::":{"a":{"":null,"#foo()":null},"b":{"":null,"#foo()":null}}},"s5":{"":null,"#here()":null},"s6":{"":null,"#here()":null,"#under()":null},"s7":null,"singleton":{"aliascase":{"":null,"::":{"base":{"":null,"#alias_on_singleton()":null,"#foobar()":null},"foo":{"":null,"#foobar()":null}}},"case":{"":null,"::":{"base":{"":null,"#foobar()":null},"foo":{"":null,"#foobar()":null}}}},"splatandkeywords":{"":null,"::a":{"llarguments":{"":null,"#foo()":null},"rguments":{"":null,"#foo()":null}}},"zsuperwith":{"block":{"":null,"::":{"a":{"":null,"#a()":null,"#b()":null,"#c()":null},"b":{"":null,"#a()":null,"#b()":null,"#c()":null}}},"optional":{"":null,"::":{"a":{"":null,"#m()":null},"b":{"":null,"#m()":null},"c":{"":null,"#m()":null}}},"rest":{"":null,"::":{"a":{"":null,"#m":{"()":null,"_modified()":null}},"b":{"":null,"#m":{"()":null,"_modified()":null}}},"andothers":{"":null,"::":{"a":{"":null,"#m":{"()":null,"_modified()":null}},"b":{"":null,"#m":{"()":null,"_modified()":null}}}}},"underscores":{"":null,"::":{"a":{"":null,"#m":{"()":null,"_modified()":null}},"b":{"":null,"#m":{"()":null,"_modified()":null}}}}}}},"ymbol":{"":null,"specs":{"":null,"::myrange":null},"::":{"all_symbols()":null,"json_create()":null}},"yn":{"c_m":{"":null,"::":{"err":{"":null,"::":{"lockmodefailer":{"":null,"::fail()":null},"unknownlocker":{"":null,"::fail()":null},"fail()":null}},"append_features()":null,"define_aliases()":null,"extend_object()":null,"new()":null}},"taxerror":{"":null,"::new()":null}},"ys":{"log":{"":null,"::":{"constants":{"":null,"::included()":null},"facility":{"":null,"()":null},"level":null,"close()":null,"ident()":null,"ins":{"pect()":null,"tance()":null},"log":{"ger":{"":null,"#add()":null,"#debug()":null,"#error()":null,"#fatal()":null,"#info()":null,"::":{"formatter":{"":null,"#c":{"all()":null,"lean()":null}},"make_methods()":null,"new()":null,"syslog":{"()":null,"=()":null}},"#unknown()":null,"#warn()":null},"()":null},"ma":{"cros":{"":null,"#log_":{"mask()":null,"upto()":null},"::included()":null},"sk":{"()":null,"=()":null}},"op":{"tion":{"":null,"s()":null},"en":{"()":null,"!()":null,"ed?()":null}},"reopen()":null}},"tem":{"callerror":{"":null,"::":{"===()":null,"new()":null}},"exit":{"":null,"::new()":null}}},"::new()":null},"tcps":{"erver":{"":null,"::new()":null},"ocket":{"":null,"::":{"gethostbyname()":null,"new()":null}}},"tsort":{"":null,"::":{"cyclic":null,"each_strongly_connected_component":{"()":null,"_from()":null},"strongly_connected_components()":null,"tsort":{"()":null,"_each()":null}}},"ta":{"g":{"action":{"":null,"::new()":null},"filter":{"":null,"::new()":null},"listaction":{"":null,"::new()":null},"purgeaction":{"":null,"::new()":null}},"lly":{"":null,"action":{"":null,"::new()":null},"::new()":null}},"temp":{"io":{"":null,"::new()":null},"file":{"":null,"::":{"remover":null,"create()":null,"new()":null,"open()":null}}},"thread":{"":null,"backtracelocationspecs":{"":null,"::":{"block_location()":null,"locations()":null,"method_location()":null}},"specs":{"":null,"::":{"s":{"tatus":{"":null,"#alive?()":null,"::new()":null,"_of_":{"blocked_thread()":null,"completed_thread()":null,"current_thread()":null,"dying_":{"running_thread()":null,"sleeping_thread()":null,"thread_after_sleep()":null},"killed_thread()":null,"running_thread()":null,"sleeping_thread()":null,"thread_with_uncaught_exception()":null},"#stop?()":null},"ubthread":{"":null,"::new()":null},"leeping_thread()":null,"pin_until_sleeping()":null},"clear_state()":null,"co":{"mpleted_thread()":null,"unter":{"()":null,"=()":null}},"cr":{"eate_":{"and_kill_critical_thread()":null,"critical_thread()":null},"itical_":{"is_reset()":null,"thread":{"1()":null,"2()":null,"_yields_to_main_thread()":null}}},"dying_thread_":{"ensures()":null,"with_outer_ensure()":null},"increment_counter()":null,"join_dying_thread_with_outer_ensure()":null,"main_thread":{"1()":null,"2()":null},"running_thread()":null,"wakeup_dying_sleeping_thread()":null}},"swait":{"":null,"::":{"all_waits()":null,"new()":null}},"::":{"backtrace::location":{"":null,"#absolute_path()":null,"#base_label()":null,"#inspect()":null,"#l":{"abel()":null,"ineno()":null},"#path()":null,"#to_s()":null},"debug":{"()":null,"=()":null},"abort_on_exception":{"()":null,"=()":null},"capi_thread_specs=()":null,"current()":null,"ex":{"clusive()":null,"it()":null},"fork()":null,"handle_interrupt()":null,"kill()":null,"list()":null,"main()":null,"new()":null,"pass()":null,"pending_interrupt?()":null,"report_on_exception":{"()":null,"=()":null},"st":{"art()":null,"op()":null}}},"ti":{"ck":{"":null,"::new()":null},"me":{"":null,"specs":{"":null,"::":{"methodholder":null,"subtime":null}},"out":{"":null,"::":{"error":{"":null,"::catch()":null,"#exception()":null},"timeout":{"error":null,"()":null}}},"::":{"a":{"pply_offset()":null,"t()":null},"force_zone!()":null,"gm()":null,"httpdate()":null,"iso8601()":null,"json_create()":null,"local()":null,"make_time()":null,"mktime()":null,"month_days()":null,"new()":null,"now()":null,"parse()":null,"rfc":{"2822()":null,"822()":null},"strptime()":null,"utc()":null,"w3cdtf()":null,"xmlschema()":null,"zone_":{"offset()":null,"utc?()":null}}}},"toggle":{"":null,"::new()":null},"tra":{"ce":{"point":{"":null,"spec":{"":null,"::":{"a":{"":null,"#bar()":null},"b":{"":null,"#foo()":null},"c":{"":null,"lasswithmethodalias":{"":null,"#m":{"()":null,"_alias()":null}},"#bar()":null,"#foo()":null,"::new()":null},"test()":null}},"::":{"new()":null,"stat()":null,"trace()":null}},"r":{"":null,"::":{"add_filter()":null,"off()":null,"on()":null,"set_get_line_procs()":null}}},"nsformation":{"":null,"::new()":null}},"tuplespace":{"":null,"::":{"template":{"":null,"#match()":null,"::new()":null},"new()":null}},"udpsocket":{"":null,"::new()":null},"uri":{"":null,"::":{"badurierror":null,"error":null,"escape":{"":null,"#decode()":null,"#e":{"ncode()":null,"scape()":null},"#unescape()":null},"ftp":{"":null,"#check_typecode()":null,"::":{"build()":null,"new()":null},"#path()":null,"#set_":{"path()":null,"typecode()":null},"#t":{"o_s()":null,"ypecode=()":null}},"generic":{"":null,"#+()":null,"#-()":null,"#==()":null,"#absolute":{"()":null,"?()":null},"#c":{"heck_":{"host()":null,"opaque()":null,"pa":{"ssword()":null,"th()":null},"port()":null,"scheme()":null,"user":{"()":null,"info()":null}},"oerce()":null,"omponent":{"()":null,"_ary()":null}},"::":{"build":{"()":null,"2()":null},"component()":null,"default_port()":null,"new()":null},"#default_port()":null,"#e":{"ql?()":null,"scape_userpass()":null},"#f":{"ind_proxy()":null,"ragment=()":null},"#h":{"ash()":null,"ierarchical?()":null,"ost":{"=()":null,"name":{"()":null,"=()":null}}},"#inspect()":null,"#merge":{"()":null,"!()":null,"_path()":null},"#normalize":{"()":null,"!()":null},"#opaque=()":null,"#p":{"a":{"rser()":null,"ssword":{"()":null,"=()":null},"th=()":null},"ort=()":null},"#query=()":null,"#r":{"e":{"gistry=()":null,"lative?()":null,"place!()":null},"oute_":{"from()":null,"to()":null}},"#s":{"cheme=()":null,"elect()":null,"et_":{"host()":null,"opaque()":null,"pa":{"ssword()":null,"th()":null},"port()":null,"scheme()":null,"user":{"()":null,"info()":null}},"plit_":{"path()":null,"userinfo()":null}},"#to_s()":null,"#user":{"()":null,"=()":null,"info":{"()":null,"=()":null}}},"http":{"":null,"s":null,"::build()":null,"#request_uri()":null},"invalid":{"componenterror":null,"urierror":null},"ldap":{"":null,"s":null,"#attributes":{"()":null,"=()":null},"#build_path_query()":null,"#dn":{"()":null,"=()":null},"#extensions":{"()":null,"=()":null},"#filter":{"()":null,"=()":null},"#hierarchical?()":null,"::":{"build()":null,"new()":null},"#parse_":{"dn()":null,"query()":null},"#s":{"cope":{"()":null,"=()":null},"et_":{"attributes()":null,"dn()":null,"extensions()":null,"filter()":null,"scope()":null}}},"mailto":{"":null,"#check_":{"headers()":null,"to()":null},"#headers=()":null,"::":{"build()":null,"new()":null},"#set_":{"headers()":null,"to()":null},"#to":{"=()":null,"_mailtext()":null,"_rfc822text()":null,"_s()":null}},"regexp":{"":null,"()":null},"rfc2396_":{"parser":{"":null,"#convert_to_uri()":null,"#e":{"scape()":null,"xtract()":null},"#in":{"itialize_":{"pattern()":null,"regexp()":null},"spect()":null},"#join()":null,"#make_regexp()":null,"::new()":null,"#parse()":null,"#split()":null,"#unescape()":null},"regexp":{"":null,"::pattern":null}},"decode_www_form":{"()":null,"_component()":null},"encode_www_form":{"()":null,"_component()":null},"extract()":null,"join()":null,"parse":{"r":null,"()":null},"scheme_list()":null,"split()":null},"spec":{"":null,"::components()":null}},"un":{"ixs":{"erver":{"":null,"::new()":null},"ocket":{"":null,"::":{"new()":null,"pair()":null,"socketpair()":null}}},"boundmethodspecs":{"":null,"::":{"a":{"":null,"#baz()":null,"#overridden()":null},"b":{"":null,"#overridden()":null},"c":{"":null,"hild":{"1":null,"2":null,"3":null},"#overridden()":null},"methods":{"":null,"#alias_":{"1()":null,"2()":null},"#bar()":null,"#discard_":{"1()":null,"2()":null},"#fo":{"o()":null,"ur()":null},"#identical_body()":null,"#neg_":{"four()":null,"one()":null,"three()":null,"two()":null},"#o":{"ne()":null,"riginal_body()":null},"#t":{"hree()":null,"wo()":null},"#with_block()":null},"mod":{"":null,"#from_mod()":null},"parent":{"":null,"::class_method()":null,"#foo()":null},"sourcelocation":{"":null,"#aka()":null,"#original()":null,"::":{"location()":null,"redefined()":null}}}},"caughtthrowerror":{"":null,"::new()":null},"ifdef":{"":null,"::new()":null}},"user":{"customconstructorstring":{"":null,"::new()":null},"defined":{"":null,"immediate":{"":null,"::_load()":null},"withivar":{"":null,"::":{"_load()":null,"new()":null}},"::":{"_load()":null,"ne":{"sted":{"":null,"#==()":null},"w()":null}}},"hashinitparams":{"":null,"::new()":null},"marshal":{"":null,"with":{"classname":{"":null,"::name()":null},"ivar":{"":null,"::new()":null}},"::new()":null}},"vcs":{"":null,"::":{"git":{"":null,"#after_export()":null,"#branch":{"()":null,"_list()":null},"#c":{"md_":{"pipe()":null,"read()":null},"ommit()":null},"#export":{"()":null,"_changelog()":null},"::":{"cmd_":{"args()":null,"pipe_at()":null,"read_at()":null},"get_revisions()":null,"new()":null},"#grep()":null,"#stable()":null,"#t":{"ag()":null,"runk()":null}},"notfounderror":null,"svn":{"":null,"#after_export()":null,"#branch":{"()":null,"_list()":null},"#commit()":null,"#export":{"()":null,"_changelog()":null},"#g":{"et_info()":null,"rep()":null},"::":{"get_revisions()":null,"search_root()":null},"#t":{"ag()":null,"runk()":null},"#url()":null,"#wcroot()":null},"detect()":null,"local_path?()":null,"new()":null,"register()":null}},"vpath":{"":null,"::new()":null},"variable":{"matcher":{"":null,"::new()":null},"sspecs":{"":null,"::":{"array":{"like":{"":null,"::new()":null,"#to_a()":null},"subclass":null},"chain":{"":null,"::without_parenthesis()":null},"hashalike":{"":null,"#[]":{"()":null,"=()":null}},"opasgn":{"":null,"#do_":{"bool_side_effects()":null,"more_side_effects()":null,"side_effect()":null}},"parasgn":{"":null,"#inc()":null,"::new()":null,"#to_ary()":null},"privatemethods":{"":null,"#to_a":{"()":null,"ry()":null}},"toarynil":{"":null,"#to_ary()":null},"false()":null,"reverse_foo()":null}}},"ve":{"c":{"":null,"tor":{"":null,"::":{"[]()":null,"basis()":null,"elements()":null,"independent?()":null,"new()":null,"zero":{"vectorerror":null,"()":null}}},"::new()":null},"rsionguard":{"":null,"::new()":null}},"win32":{"comgen":{"":null,"::new()":null},"ole":{"":null,"specs":{"":null,"::new_ole()":null},"_event":{"":null,"::":{"message_loop()":null,"new()":null}},"_method":{"":null,"::new()":null},"_param":{"":null,"::new()":null},"_record":{"":null,"::new()":null},"_type":{"":null,"lib":{"":null,"::":{"new()":null,"typelibs()":null}},"::":{"new()":null,"ole_classes()":null,"progids()":null,"typelibs()":null}},"_variant":{"":null,"::":{"array()":null,"new()":null}},"::":{"variant":null,"co":{"depage":{"()":null,"=()":null},"nnect()":null,"nst_load()":null},"create_guid()":null,"locale":{"()":null,"=()":null},"new()":null,"ole_":{"free()":null,"reference_count()":null,"show_help()":null}}},"::":{"re":{"gistry":{"":null,"::":{"api":{"":null,"#c":{"losekey()":null,"reatekey()":null,"heck()":null},"#delete":{"key()":null,"value()":null},"#enum":{"key()":null,"value()":null},"#flushkey()":null,"#openkey()":null,"#query":{"infokey()":null,"value()":null},"#setvalue()":null,"#make_wstr()":null,"#pack":{"dw()":null,"handle()":null,"qw()":null},"#unpack":{"dw()":null,"handle()":null,"qw()":null},"#win64?()":null},"constants":null,"error":{"":null,"::":{"kernel32":null,"new()":null}},"predefinedkey":{"":null,"#cl":{"ass()":null,"ose()":null},"::new()":null},"create()":null,"expand_environ()":null,"new()":null,"open()":null,"time2wtime()":null,"type2name()":null,"wtime2time()":null},"#[]":{"()":null,"=()":null},"#_dump()":null,"#c":{"lose()":null,"reate":{"()":null,"d?()":null}},"#delete":{"()":null,"_key()":null,"_value()":null},"#each":{"()":null,"_key()":null,"_value()":null},"#flush()":null,"#in":{"fo()":null,"spect()":null},"#keys()":null,"#name()":null,"#open":{"()":null,"?()":null},"#read":{"()":null,"_bin()":null,"_i()":null,"_s":{"()":null,"_expand()":null}},"#values()":null,"#write":{"()":null,"_bin()":null,"_i()":null,"_s()":null}},"solv::wscontrol::wsock32":null},"sspi":{"":null,"::":{"api":null,"identity":{"":null,"::new()":null,"#to_p()":null},"negotiateauth":{"":null,"#c":{"lean_up()":null,"omplete_authentication()":null},"#encode_token()":null,"#get_":{"credentials()":null,"initial_token()":null},"::":{"new()":null,"proxy_auth_get()":null}},"sspiresult":{"":null,"#==()":null,"::new()":null,"#ok?()":null,"#to_s()":null},"security":{"buffer":{"":null,"#buffer":{"size()":null,"type()":null},"::new()":null,"#to":{"_p()":null,"ken()":null},"#unpack()":null},"handle":{"":null,"#lower()":null,"#to_p()":null,"#upper()":null}},"timestamp":{"":null,"#to_p()":null}}}},"api":{"":null,"::new()":null}},"warning":{"":null,"::":{"buffer":{"":null,"#write()":null},"warn()":null}},"we":{"brick":{"":null,"::":{"accesslog":{"":null,"::accesslogerror":null,"#escape()":null,"#format()":null,"#setup_params()":null},"basiclog":{"":null,"#<<()":null,"#close()":null,"#debug":{"()":null,"?()":null},"#error":{"()":null,"?()":null},"#f":{"atal":{"()":null,"?()":null},"ormat()":null},"#info":{"()":null,"?()":null},"#log()":null,"::new()":null,"#warn":{"()":null,"?()":null}},"cgi":{"":null,"#[]()":null,"::new()":null,"#s":{"ervice()":null,"tart()":null}},"co":{"nfig":null,"okie":{"":null,"#expires":{"()":null,"=()":null},"::":{"new()":null,"parse":{"()":null,"_set_cookie":{"()":null,"s()":null}}},"#to_s()":null}},"daemon":{"":null,"::start()":null},"genericserver":{"":null,"#[]()":null,"#listen()":null,"::new()":null,"#run()":null,"#s":{"hutdown()":null,"sl_servername_callback()":null,"tart()":null,"top()":null}},"ht":{"mlutils":{"":null,"#escape()":null,"::escape()":null},"tp":{"auth":{"":null,"::":{"authenticator":null,"basicauth":{"":null,"#authenticate()":null,"#challenge()":null,"::":{"make_passwd()":null,"new()":null}},"digestauth":{"":null,"#authenticate()":null,"#challenge()":null,"::":{"make_passwd()":null,"new()":null}},"ht":{"digest":{"":null,"#delete_passwd()":null,"#each()":null,"#flush()":null,"#get_passwd()":null,"::new()":null,"#reload()":null,"#set_passwd()":null},"group":{"":null,"#add()":null,"#flush()":null,"#members()":null,"::new()":null,"#reload()":null},"passwd":{"":null,"#delete_passwd()":null,"#each()":null,"#flush()":null,"#get_passwd()":null,"::new()":null,"#reload()":null,"#set_passwd()":null}},"proxy":{"authenticator":null,"basicauth":null,"digestauth":null},"userdb":{"":null,"#get_passwd()":null,"#make_passwd()":null,"#set_passwd()":null}},"#basic_auth()":null,"#proxy_basic_auth()":null},"proxyserver":{"":null,"::new()":null},"re":{"quest":{"":null,"#[]()":null,"#body()":null,"#content_":{"length()":null,"type()":null},"#each()":null,"#host()":null,"#keep_alive?()":null,"#meta_vars()":null,"::new()":null,"#p":{"arse()":null,"ort()":null},"#query()":null,"#remote_ip()":null,"#s":{"erver_name()":null,"sl?()":null}},"sponse":{"":null,"::":{"chunkedwrapper":null,"invalidheader":null,"new()":null},"#[]":{"()":null,"=()":null},"#c":{"h":{"eck_header()":null,"unked":{"=()":null,"?()":null}},"ontent_":{"length":{"()":null,"=()":null},"type":{"()":null,"=()":null}}},"#each()":null,"#keep_alive?()":null,"#s":{"et_":{"error()":null,"redirect()":null},"tatus":{"=()":null,"_line()":null}}}},"serv":{"er":{"":null,"error":null,"#access_log()":null,"#do_options()":null,"#lookup_server()":null,"#mount":{"()":null,"_proc()":null},"::new()":null,"#run()":null,"#s":{"e":{"arch_servlet()":null,"rvice()":null},"sl_servername_callback()":null},"#u":{"mount()":null,"nmount()":null},"#virtual_host()":null},"let":{"":null,"::":{"abstractservlet":{"":null,"#do_":{"get()":null,"head()":null,"options()":null},"::":{"get_instance()":null,"new()":null},"#redirect_to_directory_uri()":null,"#service()":null},"cgihandler":{"":null,"::new()":null},"defaultfilehandler":{"":null,"::new()":null},"erbhandler":{"":null,"#do_":{"get()":null,"post()":null},"#evaluate()":null,"::new()":null},"filehandler":{"":null,"::":{"add_handler()":null,"new()":null,"remove_handler()":null}},"httpservleterror":null,"prochandler":null}}},"status":{"":null,"::":{"eoferror":null,"error":{"":null,"?()":null},"info":{"":null,"?()":null},"status":{"":null,"#code()":null,"#reason_phrase()":null,"#to_i()":null},"success":{"":null,"?()":null},"[]()":null,"client":{"error":null,"_error?()":null},"re":{"direct":{"":null,"?()":null},"ason_phrase()":null},"server":{"error":null,"_error?()":null}},"#client_error?()":null,"#error?()":null,"#info?()":null,"#re":{"ason_phrase()":null,"direct?()":null},"#s":{"erver_error?()":null,"uccess?()":null}},"utils":{"":null,"#dequote()":null,"::":{"formdata":{"":null,"#<<()":null,"#[]()":null,"#append_data()":null,"#each_data()":null,"#list()":null,"::new()":null,"#to_":{"ary()":null,"s()":null}},"dequote()":null,"load_mime_types()":null,"mime_type()":null,"normalize_path()":null,"parse_":{"form_data()":null,"header()":null,"query()":null,"qvalues()":null,"range_header()":null},"quote()":null,"split_header_value()":null},"#escape":{"()":null,"8bit()":null,"_form()":null,"_path()":null},"#load_mime_types()":null,"#mime_type()":null,"#normalize_path()":null,"#parse_":{"form_data()":null,"header()":null,"query()":null,"qvalues()":null,"range_header()":null},"#quote()":null,"#split_header_value()":null,"#unescape":{"()":null,"_form()":null}},"version":{"":null,"#<=>()":null,"::":{"convert()":null,"new()":null},"#to_s()":null}}},"log":{"":null,"#log()":null,"::new()":null},"snirequest":{"":null,"::new()":null},"servererror":null,"simpleserver":{"":null,"::start()":null},"utils":{"":null,"::":{"create_":{"listeners()":null,"self_signed_cert()":null},"getservername()":null,"random_string()":null,"set_":{"close_on_exec()":null,"non_blocking()":null},"su()":null,"timeout":{"handler":{"":null,"::":{"cancel()":null,"new()":null,"register()":null,"terminate()":null}},"()":null}},"#create_":{"listeners()":null,"self_signed_cert()":null},"#getservername()":null,"#random_string()":null,"#s":{"et_":{"close_on_exec()":null,"non_blocking()":null},"u()":null},"#timeout()":null}}},"akref":{"":null,"spec":{"":null,"s":{"":null,"::":{"delegated_method()":null,"pr":{"ivate_method()":null,"otected_method()":null}}},"::make_":{"dead_weakref()":null,"weakref()":null}},"::":{"referror":null,"new()":null}}},"xm":{"l":{"":null,"::parser":null,"encoding_ja":{"":null,"::sjishandler":null}},"p":{"":null,"::":{"stringinputmethod":{"":null,"#eof?()":null,"#gets()":null,"::new()":null,"#puts()":null},"new()":null}}},"yaml":{"":null,"::":{"dbm":{"":null,"#[]":{"()":null,"=()":null},"#delete":{"()":null,"_if()":null},"#each":{"()":null,"_pair()":null,"_value()":null},"#fetch()":null,"#has_value?()":null,"#in":{"dex()":null,"vert()":null},"#key()":null,"#re":{"ject()":null,"place()":null},"#s":{"elect()":null,"hift()":null,"tore()":null},"#to_":{"a()":null,"hash()":null},"#update()":null,"#values":{"()":null,"_at()":null}},"store":{"":null,"::new()":null},"syck":null},"formatter":{"":null,"::new()":null}},"yieldspecs":{"":null,"::yielder":{"":null,"::define_deep()":null,"#m()":null,"#r":{"()":null,"s()":null},"#s()":null,"#z":{"()":null,"e()":null}}},"zero":{"":null,"::new()":null},"zlib":{"":null,"::":{"buferror":null,"dataerror":null,"deflate":{"":null,"#<<()":null,"()":null,"#deflate()":null,"#flush()":null,"#initialize_copy()":null,"::":{"deflate()":null,"new()":null},"#params()":null,"#set_dictionary()":null},"error":null,"gzip":{"file":{"":null,"::":{"crcerror":null,"error":{"":null,"#inspect()":null},"lengtherror":null,"nofooter":null,"wrap()":null},"#c":{"lose":{"()":null,"d?()":null},"omment()":null,"rc()":null},"#finish()":null,"#level()":null,"#mtime()":null,"#o":{"rig_name()":null,"s_code()":null},"#sync":{"()":null,"=()":null},"#to_io()":null},"reader":{"":null,"#bytes()":null,"#e":{"ach":{"()":null,"_byte()":null,"_char()":null,"_line()":null},"of":{"()":null,"?()":null},"xternal_encoding()":null},"#get":{"byte()":null,"c()":null,"s()":null},"#line":{"no":{"()":null,"=()":null},"s()":null},"::":{"new()":null,"open()":null},"#pos()":null,"#re":{"ad":{"()":null,"byte()":null,"char()":null,"line":{"()":null,"s()":null},"partial()":null},"wind()":null},"#tell()":null,"#un":{"get":{"byte()":null,"c()":null},"used()":null}},"writer":{"":null,"#<<()":null,"#comment=()":null,"#flush()":null,"#mtime=()":null,"::":{"new()":null,"open()":null},"#orig_name=()":null,"#p":{"os()":null,"rint":{"()":null,"f()":null},"ut":{"c()":null,"s()":null}},"#tell()":null,"#write()":null},"()":null},"inflate":{"":null,"#<<()":null,"#add_dictionary()":null,"()":null,"#inflate()":null,"::":{"inflate()":null,"new()":null},"#s":{"et_dictionary()":null,"ync":{"()":null,"_point?()":null}}},"memerror":null,"needdict":null,"streame":{"nd":null,"rror":null},"versionerror":null,"zstream":{"":null,"#a":{"dler()":null,"vail_":{"in()":null,"out":{"()":null,"=()":null}}},"#close":{"()":null,"d?()":null},"#data_type()":null,"#end":{"()":null,"ed?()":null},"#f":{"inish":{"()":null,"ed?()":null},"lush_next_":{"in()":null,"out()":null}},"#reset()":null,"#stream_end?()":null,"#total_":{"in()":null,"out()":null}},"adler32":{"()":null,"_combine()":null},"crc":{"32":{"()":null,"_combine()":null},"_table()":null},"gunzip()":null,"zlib_version()":null}},"nil":{"":null,"::foo":null}}';
const words$1 = getWordsFromTrie$1(JSON.parse(serialized$1));
const RUBY = new CompactPrefixTree$1(Array.from(words$1));
const VERSION = '2.5.1';

const missingFilelMsg = 'Missing file: ';
const couldNotOpenMsg = 'Could Not Open file: ';
const SYMBOL_END = '[^\\w]';
function getConcernsFilePath(lineStartToWord, fileT) {
    console.log(`getConcernsFilePath`, arguments);
    const concern = lineStartToWord.replace(PATTERNS.INCLUDE_DECLARATION, ''), seq = concern.split('::').map(wordsToPath);
    if (seq[0] === 'concerns')
        delete seq[0];
    const sub = seq.slice(0, -1).join(path.sep), name = seq[seq.length - 1], fileType = FileTypeRelPath.get(fileT), filePath = path.join(fileType, sub, name + '.rb');
    return filePath;
}
function findClassInDocumentCallback(name, document) {
    const line = document
        .getText()
        .split('\n')
        .findIndex((line) => new RegExp('^class\\s+(((::)?[A-Za-z]+)*(::)?' + name + ')' + SYMBOL_END).test(line.trim())), definitionInformation = {
        file: document.uri.fsPath,
        line: Math.max(line, 0),
        column: 0,
    };
    console.log('findClassInDocumentCallback name', name);
    console.log('findClassInDocumentCallback document', document);
    return Promise.resolve(definitionInformation);
}
async function getLibFilePath(document, demodulized, name, sub) {
    const root = vscode.workspace.getWorkspaceFolder(document.uri).uri.fsPath;
    const filePathInLib = name ? path.join('lib', sub, name + '.rb') : '', libPath = sub ? path.join(root, 'lib', sub + '.rb') : '', funcOrClass = demodulized.indexOf('.') !== -1 ? demodulized.split('.')[1] : demodulized, regPrefix = PATTERNS.CAPITALIZED.test(funcOrClass)
        ? 'class\\s+'
        : 'def\\s+', reg = new RegExp(regPrefix + funcOrClass + SYMBOL_END);
    console.log(`name:${name} demodulized:${demodulized} funcOrClass:${funcOrClass}`);
    let findInLibUris = [];
    let findInLib = null;
    try {
        findInLibUris = await findFiles(document, filePathInLib, null, 1);
        // tslint:disable-next-line: no-empty
    }
    catch (e) { }
    if (filePathInLib) {
        if (findInLibUris.length > 0) {
            try {
                findInLib = await vscode.workspace
                    .openTextDocument(findInLibUris[0])
                    .then(findClassInDocumentCallback.bind(null, demodulized), () => {
                    return Promise.reject(couldNotOpenMsg + filePathInLib);
                });
            }
            catch (e) {
                return Promise.reject(couldNotOpenMsg + filePathInLib);
            }
        }
        else {
            if (libPath) {
                try {
                    findInLib = await findFunctionOrClassByClassNameInFile(libPath, reg);
                    // tslint:disable-next-line: no-empty
                }
                catch (e) { }
            }
        }
    }
    if (findInLib) {
        return findInLib;
    }
    else {
        return Promise.reject();
    }
}
async function getModelFilePath(document, demodulized, name, sub) {
    const filePathInModels = path.join(REL_MODELS, '**', sub, name + '.rb');
    let uris;
    try {
        uris = await findFiles(document, filePathInModels, null, 1);
    }
    catch (e) { }
    if (!uris.length) {
        return Promise.reject();
    }
    return vscode.workspace
        .openTextDocument(uris[0])
        .then(findClassInDocumentCallback.bind(null, demodulized), () => {
        return Promise.reject(couldNotOpenMsg + filePathInModels);
    });
}
async function getLibOrModelFilePath(document, lineStartToWord, word) {
    console.log(`getLibOrModelFilePath`, arguments);
    const symbol = new RegExp('(((::)?[A-Za-z]+)*(::)?' + word + ')').exec(lineStartToWord)[1];
    console.log(`symbol:${symbol}`);
    const [name, sub] = getSubPathBySymbol(symbol), demodulized = index.demodulize(symbol);
    let result = null;
    try {
        result = await getLibFilePath(document, demodulized, name, sub);
    }
    catch (e) { }
    if (result) {
        return result;
    }
    try {
        result = await getModelFilePath(document, demodulized, name, sub);
    }
    catch (e) { }
    if (result) {
        return result;
    }
    if (!result) {
        return Promise.reject();
    }
}
async function findLocationByWord(document, position, word, lineStartToWord) {
    console.log(`findLocationByWord`, arguments);
    if (PATTERNS.CAPITALIZED.test(word)) {
        return getLibOrModelFilePath(document, lineStartToWord, word);
    }
    else {
        const fileNameWithoutSuffix = path.parse(document.fileName).name, controllerName = index.camelize(fileNameWithoutSuffix);
        return findFunctionOrClassByClassName(document, position, word, controllerName);
    }
}
/**
 * get view glob
 * @returns glob path or null
 */
function findViews(document, position, word, lineStartToWord) {
    console.log(`findViews`, arguments);
    let filePath;
    const lineText = document.lineAt(position.line).text.trim(), match1 = lineStartToWord.match(PATTERNS.RENDER_MATCH), match1id = match1[match1.length - 1], match2 = lineText.match(PATTERNS.RENDER_MATCH), idIndex = match2.findIndex((v) => v.includes(match1id)), id = match2[idIndex], preWord = match2[idIndex - 1];
    console.log(match1, match2, id, preWord);
    if (preWord === 'render' &&
        ['template', 'partial', 'layout', 'json', 'html'].indexOf(id) !== -1) {
        return null;
    }
    const viewPath = path.parse(id).dir + path.sep + '*' + path.parse(id).name + '.*', sub = id.indexOf('/') !== -1
        ? ''
        : vscode.workspace
            .asRelativePath(document.fileName)
            .substring(REL_CONTROLLERS.length + 1)
            .replace('_controller.rb', '');
    if (preWord === 'layout') {
        filePath = path.join(REL_LAYOUTS, viewPath);
    }
    else {
        filePath = path.join(REL_VIEWS, sub, viewPath);
    }
    console.log(preWord, filePath, match1id, id);
    return filePath;
}
function controllerDefinitionLocation(document, position, word, lineStartToWord) {
    console.log(`controllerDefinitionLocation`, JSON.stringify(position), word, lineStartToWord);
    const definitionInformation = {
        file: null,
        line: 0,
        column: 0,
    };
    // if (PATTERNS.CLASS_INHERIT_DECLARATION.test(lineStartToWord)) {
    //   // exclude = REL_CONTROLLERS
    //   // if (parentController === "ActionController::Base") {
    //   // 	//@todo provide rails online doc link
    //   // 	return Promise.reject(missingToolMsg + 'godef');
    //   // }
    //   let filePath = getParentControllerFilePathByDocument(
    //     document,
    //     lineStartToWord
    //   );
    //   definitionInformation.file = filePath;
    // } else
    if (PATTERNS.FUNCTION_DECLARATON.test(lineStartToWord) &&
        !PATTERNS.PARAMS_DECLARATION.test(word)) {
        const sameModuleControllerSub = path.dirname(vscode.workspace
            .asRelativePath(document.fileName)
            .substring(REL_CONTROLLERS.length + 1)), filePath = path.join(REL_VIEWS, sameModuleControllerSub, path.basename(document.fileName).replace(/_controller\.rb$/, ''), word + '.*'), upperText = document.getText(new vscode.Range(new vscode.Position(0, 0), position)), isPrivateMethod = /\s*private/.test(upperText);
        if (isPrivateMethod) {
            return Promise.resolve(null);
        }
        definitionInformation.file = filePath;
    }
    else if (PATTERNS.INCLUDE_DECLARATION.test(lineStartToWord)) {
        definitionInformation.file = getConcernsFilePath(lineStartToWord, FileType.ControllerConcerns);
        // } else if (PATTERNS.CAPITALIZED.test(word)) {
        //   //lib or model combination
        //   return getLibOrModelFilePath(lineStartToWord, word);
    }
    else if (PATTERNS.PARAMS_DECLARATION.test(word)) {
        const filePath = document.fileName, line = document
            .getText()
            .split('\n')
            .findIndex((line) => new RegExp('^def\\s+' + word + SYMBOL_END).test(line.trim()));
        definitionInformation.file = filePath;
        definitionInformation.line = line;
    }
    else if (PATTERNS.LAYOUT_DECLARATION.test(lineStartToWord)) {
        const layoutPath = PATTERNS.LAYOUT_MATCH.exec(lineStartToWord)[2];
        definitionInformation.file = path.join(REL_LAYOUTS, layoutPath + '.*');
    }
    else if (PATTERNS.RENDER_DECLARATION.test(lineStartToWord) ||
        PATTERNS.RENDER_TO_STRING_DECLARATION.test(lineStartToWord)) {
        definitionInformation.file = findViews(document, position, word, lineStartToWord);
    }
    else if (PATTERNS.CONTROLLER_FILTERS.test(lineStartToWord)) {
        const fileNameWithoutSuffix = path.parse(document.fileName).name, controllerName = index.camelize(fileNameWithoutSuffix);
        return findFunctionOrClassByClassName(document, position, word, controllerName);
    }
    else if (PATTERNS.HELPER_METHODS.test(lineStartToWord)) {
        // @todo find in app/helpers
        const fileNameWithoutSuffix = path.parse(document.fileName).name, controllerName = index.camelize(fileNameWithoutSuffix);
        return findFunctionOrClassByClassName(document, position, word, controllerName);
    }
    else {
        return findLocationByWord(document, position, word, lineStartToWord);
    }
    const promise = new Promise(definitionResolver(document, definitionInformation));
    return promise;
}
/**
 *
 * @param relpath
 * @param line
 * @param fileType
 * @return relative file path
 */
function getSymbolPath(relpath, line, fileType) {
    console.log(`getSymbolPath`, arguments);
    let filePath = '';
    const [currentClassRaw, parentClassRaw] = line.split('<'), currentClass = currentClassRaw.trim(), parentClass = parentClassRaw.trim(), relPath = FileTypeRelPath.get(fileType);
    if (currentClass.includes('::') && !parentClass.includes('::')) {
        return path.join(relPath, wordsToPath(parentClass) + '.rb');
    }
    const parent = parentClass.trim(), sameModuleSub = path.dirname(relpath.substring(relPath.length + 1)), seq = parent
        .split('::')
        .map(wordsToPath)
        .filter((v) => v !== ''), sub = !parent.includes('::')
        ? sameModuleSub
        : seq.slice(0, -1).join(path.sep), name = seq[seq.length - 1];
    filePath = path.join(relPath, sub, name + '.rb');
    console.log(`getSymbolPath return`, filePath);
    return filePath;
}
/**
 *
 * @param entryDocument
 * @param line
 * @return parent controller relative path
 */
async function getParentControllerFilePathByDocument(entryDocument, line) {
    console.log(`getParentControllerFilePathByDocument`, arguments);
    const relPath = vscode.workspace.asRelativePath(entryDocument.fileName), filePath = getSymbolPath(relPath, line, FileType.Controller);
    console.log(`getParentControllerFilePathByDocument returns`, filePath);
    return Promise.resolve(findFiles(entryDocument, filePath, null, 1).then((uris) => {
        if (uris.length !== 0) {
            return filePath;
        }
        else {
            return '';
        }
    }, (e) => e));
}
async function getFunctionOrClassInfoInFile(fileAbsPath, reg) {
    console.log(`getFunctionOrClassInfoInFile`, fileAbsPath, reg.toString());
    const definitionInformation = {
        file: null,
        line: -1,
        column: 0,
    };
    const exists = util$1.promisify(fs.exists);
    const existed = await exists(path.normalize(fileAbsPath));
    if (!existed) {
        return Promise.reject();
    }
    const fileStream = fs.createReadStream(path.normalize(fileAbsPath));
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });
    let lineNumber = 0, classDeclaration, lineIndex = -1;
    for await (const lineText of rl) {
        if (PATTERNS.CLASS_INHERIT_DECLARATION.test(lineText)) {
            classDeclaration = lineText;
        }
        if (reg.test(lineText)) {
            lineIndex = lineNumber;
            definitionInformation.file = fileAbsPath;
            definitionInformation.line = lineIndex;
            definitionInformation.column = lineText.length;
            break;
        }
        lineNumber++;
    }
    console.log(`getFunctionOrClassInfoInFile return`, JSON.stringify(definitionInformation), classDeclaration);
    if (!definitionInformation.file) {
        return Promise.reject();
    }
    return [definitionInformation, classDeclaration];
}
async function findFunctionOrClassByClassNameInFile(fileAbsPath, reg) {
    const root = vscode.workspace.getWorkspaceFolder(vscode.Uri.file(fileAbsPath))
        .uri.fsPath;
    console.log(`findFunctionOrClassByClassNameInFile`, fileAbsPath, reg.toString());
    // @todo find in included moduels
    let definitionInformation, classDeclaration;
    try {
        [
            definitionInformation,
            classDeclaration,
        ] = await getFunctionOrClassInfoInFile(fileAbsPath, reg);
    }
    catch (e) {
        return Promise.reject();
    }
    let lineIndex = definitionInformation.line;
    while (-1 === lineIndex) {
        const [, symbol] = classDeclaration.split('<');
        console.log('findFunctionOrClassByClassNameInFile symbol', symbol);
        const parentController = symbol.trim();
        const filePath = getSymbolPath(vscode.workspace.asRelativePath(fileAbsPath), parentController, FileType.Controller);
        const fileAbsPath2 = path.join(root, filePath);
        try {
            [
                definitionInformation,
                classDeclaration,
            ] = await getFunctionOrClassInfoInFile(fileAbsPath2, reg);
        }
        catch (e) {
            return Promise.reject();
        }
        lineIndex = definitionInformation.line;
    }
    if (-1 !== lineIndex) {
        console.log('findFunctionOrClassByClassNameInFile return', JSON.stringify(definitionInformation));
        return definitionInformation;
    }
    else {
        return Promise.reject();
    }
}
async function findFunctionOrClassByClassName(entryDocument, position, funcOrClass, clasName) {
    console.log(`findFunctionOrClassByClassName`, arguments);
    const definitionInformation = {
        file: null,
        line: 0,
        column: 0,
    }, lines = entryDocument.getText().split('\n'), regPrefix = PATTERNS.CAPITALIZED.test(funcOrClass)
        ? 'class\\s+'
        : 'def\\s+', reg = new RegExp(regPrefix + funcOrClass + '(?![A-Za-z0-9_])'), lineIndex = lines.findIndex((line) => reg.test(line.trim()));
    if (-1 !== lineIndex) {
        // same file
        definitionInformation.file = entryDocument.uri.fsPath;
        definitionInformation.line = lineIndex;
        definitionInformation.column = lines[lineIndex].length;
        return Promise.resolve(definitionInformation);
    }
    else {
        const beforeRange = new vscode.Range(new vscode.Position(0, 0), position), beforeText = entryDocument.getText(beforeRange), beforeLines = beforeText.split('\n');
        const line = beforeLines.find((line) => new RegExp('^class\\s+.*' + clasName + SYMBOL_END).test(line.trim()));
        if (!line) {
            return Promise.reject('');
        }
        const filePath = await getParentControllerFilePathByDocument(entryDocument, line);
        console.log('filePath', filePath);
        if (!filePath) {
            return Promise.reject();
        }
        const root = vscode.workspace.getWorkspaceFolder(entryDocument.uri).uri
            .path;
        const fileAbsPath = vscode.Uri.file(path.join(root, filePath)).path;
        return findFunctionOrClassByClassNameInFile(fileAbsPath, reg);
    }
}
function modelDefinitionLocation(document, position, word, lineStartToWord) {
    console.log(`modelDefinitionLocation`, JSON.stringify(position), word, lineStartToWord);
    const definitionInformation = {
        file: null,
        line: 0,
        column: 0,
    };
    const reg = new RegExp('(^has_one|^has_many|^has_and_belongs_to_many|^belongs_to)\\s+:' + word);
    if (reg.test(lineStartToWord)) {
        const name = index.singularize(word);
        definitionInformation.file = path.join(REL_MODELS, '**', name + '.rb');
    }
    else if (PATTERNS.INCLUDE_DECLARATION.test(lineStartToWord)) {
        definitionInformation.file = getConcernsFilePath(lineStartToWord, FileType.ModelConcerns);
    }
    else if (PATTERNS.CAPITALIZED.test(word)) {
        return getLibOrModelFilePath(document, lineStartToWord, word);
    }
    else if (PATTERNS.RENDER_DECLARATION.test(lineStartToWord) ||
        PATTERNS.RENDER_TO_STRING_DECLARATION.test(lineStartToWord)) {
        definitionInformation.file = findViews(document, position, word, lineStartToWord);
    }
    else {
        return findLocationByWord(document, position, word, lineStartToWord);
    }
    const promise = new Promise(definitionResolver(document, definitionInformation));
    return promise;
}
const FileTypeHandlers = new Map([
    [FileType.Controller, controllerDefinitionLocation],
    [FileType.Helper, controllerDefinitionLocation],
    [FileType.Model, modelDefinitionLocation],
]);
function definitionResolver(document, definitionInformation, exclude = null, maxNum = null) {
    return (resolve, reject) => {
        const findPath = path.isAbsolute(definitionInformation.file)
            ? vscode.workspace.asRelativePath(definitionInformation.file)
            : definitionInformation.file;
        findFiles(document, findPath).then((uris) => {
            if (!uris.length) {
                reject(missingFilelMsg + definitionInformation.file);
            }
            else if (uris.length === 1) {
                definitionInformation.file = uris[0].fsPath;
                resolve(definitionInformation);
            }
            else {
                const relativeFileName = vscode.workspace.asRelativePath(document.fileName), rh = new RailsHelper(document, relativeFileName, null);
                rh.showQuickPick(uris.map((uri) => vscode.workspace.asRelativePath(uri)));
                resolve(null);
            }
        }, () => {
            reject(missingFilelMsg + definitionInformation.file);
        });
    };
}
function definitionLocation(document, position, goConfig, token) {
    console.log('definitionLocation', arguments);
    // let context: vscode.ExtensionContext = this;
    if (position.line < 0) {
        return Promise.resolve(null);
    }
    const wordRange = document.getWordRangeAtPosition(position);
    if (!wordRange) {
        return Promise.resolve(null);
    }
    const lineText = document.lineAt(position.line).text.trim();
    const lineStartToWord = document
        .getText(new vscode.Range(new vscode.Position(position.line, 0), wordRange.end))
        .trim();
    const word = document.getText(wordRange);
    //   context.logger.debug(word);
    if (lineText.startsWith('//') || word.match(/^\d+.?\d+$/)) {
        return Promise.resolve(null);
    }
    if (!goConfig) {
        goConfig = vscode.workspace.getConfiguration('rails');
    }
    const symbol = new RegExp('(((::)?[A-Za-z]+)*(::)?' + word + ')').exec(lineStartToWord)[1];
    if (RAILS.prefix(symbol.toLowerCase()).isProper ||
        RUBY.prefix(symbol.toLowerCase()).isProper) {
        console.log('rails symbols:' + symbol);
        return Promise.resolve(null);
    }
    const fileType = dectFileType(document.fileName);
    if (FileType.Unkown === fileType) {
        return Promise.resolve(null);
    }
    // let exclude;
    const handle = FileTypeHandlers.get(fileType);
    if (!handle) {
        return Promise.resolve(null);
    }
    return handle(document, position, word, lineStartToWord);
}
class RailsDefinitionProvider {
    //   private context: vscode.ExtensionContext;
    constructor(
    // context: vscode.ExtensionContext,
    goConfig) {
        this.goConfig = null;
        this.goConfig = goConfig;
        // this.context = context;
    }
    provideDefinition(document, position, token) {
        return definitionLocation(document, position, this.goConfig, token).then((definitionInfo) => {
            if (definitionInfo === null || definitionInfo.file === null)
                return null;
            if (definitionInfo.line < 0) {
                return null;
            }
            const definitionResource = vscode.Uri.file(definitionInfo.file);
            const pos = new vscode.Position(definitionInfo.line, definitionInfo.column || 0 // required here otherwise raise "Invalid arguments"
            );
            return new vscode.Location(definitionResource, pos);
        }, (err) => {
            if (err) {
                // Prompt for missing tool is located here so that the
                // prompts dont show up on hover or signature help
                if (typeof err === 'string' && err.startsWith(missingFilelMsg)) ;
                else {
                    return Promise.reject(err);
                }
            }
            return Promise.resolve(null);
        });
    }
}

var utils = createCommonjsModule(function (module, exports) {

exports.isInteger = num => {
  if (typeof num === 'number') {
    return Number.isInteger(num);
  }
  if (typeof num === 'string' && num.trim() !== '') {
    return Number.isInteger(Number(num));
  }
  return false;
};

/**
 * Find a node of the given type
 */

exports.find = (node, type) => node.nodes.find(node => node.type === type);

/**
 * Find a node of the given type
 */

exports.exceedsLimit = (min, max, step = 1, limit) => {
  if (limit === false) return false;
  if (!exports.isInteger(min) || !exports.isInteger(max)) return false;
  return ((Number(max) - Number(min)) / Number(step)) >= limit;
};

/**
 * Escape the given node with '\\' before node.value
 */

exports.escapeNode = (block, n = 0, type) => {
  let node = block.nodes[n];
  if (!node) return;

  if ((type && node.type === type) || node.type === 'open' || node.type === 'close') {
    if (node.escaped !== true) {
      node.value = '\\' + node.value;
      node.escaped = true;
    }
  }
};

/**
 * Returns true if the given brace node should be enclosed in literal braces
 */

exports.encloseBrace = node => {
  if (node.type !== 'brace') return false;
  if ((node.commas >> 0 + node.ranges >> 0) === 0) {
    node.invalid = true;
    return true;
  }
  return false;
};

/**
 * Returns true if a brace node is invalid.
 */

exports.isInvalidBrace = block => {
  if (block.type !== 'brace') return false;
  if (block.invalid === true || block.dollar) return true;
  if ((block.commas >> 0 + block.ranges >> 0) === 0) {
    block.invalid = true;
    return true;
  }
  if (block.open !== true || block.close !== true) {
    block.invalid = true;
    return true;
  }
  return false;
};

/**
 * Returns true if a node is an open or close node
 */

exports.isOpenOrClose = node => {
  if (node.type === 'open' || node.type === 'close') {
    return true;
  }
  return node.open === true || node.close === true;
};

/**
 * Reduce an array of text nodes.
 */

exports.reduce = nodes => nodes.reduce((acc, node) => {
  if (node.type === 'text') acc.push(node.value);
  if (node.type === 'range') node.type = 'text';
  return acc;
}, []);

/**
 * Flatten an array
 */

exports.flatten = (...args) => {
  const result = [];
  const flat = arr => {
    for (let i = 0; i < arr.length; i++) {
      let ele = arr[i];
      Array.isArray(ele) ? flat(ele) : ele !== void 0 && result.push(ele);
    }
    return result;
  };
  flat(args);
  return result;
};
});

var stringify = (ast, options = {}) => {
  let stringify = (node, parent = {}) => {
    let invalidBlock = options.escapeInvalid && utils.isInvalidBrace(parent);
    let invalidNode = node.invalid === true && options.escapeInvalid === true;
    let output = '';

    if (node.value) {
      if ((invalidBlock || invalidNode) && utils.isOpenOrClose(node)) {
        return '\\' + node.value;
      }
      return node.value;
    }

    if (node.value) {
      return node.value;
    }

    if (node.nodes) {
      for (let child of node.nodes) {
        output += stringify(child);
      }
    }
    return output;
  };

  return stringify(ast);
};

/*!
 * is-number <https://github.com/jonschlinkert/is-number>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Released under the MIT License.
 */

var isNumber = function(num) {
  if (typeof num === 'number') {
    return num - num === 0;
  }
  if (typeof num === 'string' && num.trim() !== '') {
    return Number.isFinite ? Number.isFinite(+num) : isFinite(+num);
  }
  return false;
};

const toRegexRange = (min, max, options) => {
  if (isNumber(min) === false) {
    throw new TypeError('toRegexRange: expected the first argument to be a number');
  }

  if (max === void 0 || min === max) {
    return String(min);
  }

  if (isNumber(max) === false) {
    throw new TypeError('toRegexRange: expected the second argument to be a number.');
  }

  let opts = { relaxZeros: true, ...options };
  if (typeof opts.strictZeros === 'boolean') {
    opts.relaxZeros = opts.strictZeros === false;
  }

  let relax = String(opts.relaxZeros);
  let shorthand = String(opts.shorthand);
  let capture = String(opts.capture);
  let wrap = String(opts.wrap);
  let cacheKey = min + ':' + max + '=' + relax + shorthand + capture + wrap;

  if (toRegexRange.cache.hasOwnProperty(cacheKey)) {
    return toRegexRange.cache[cacheKey].result;
  }

  let a = Math.min(min, max);
  let b = Math.max(min, max);

  if (Math.abs(a - b) === 1) {
    let result = min + '|' + max;
    if (opts.capture) {
      return `(${result})`;
    }
    if (opts.wrap === false) {
      return result;
    }
    return `(?:${result})`;
  }

  let isPadded = hasPadding(min) || hasPadding(max);
  let state = { min, max, a, b };
  let positives = [];
  let negatives = [];

  if (isPadded) {
    state.isPadded = isPadded;
    state.maxLen = String(state.max).length;
  }

  if (a < 0) {
    let newMin = b < 0 ? Math.abs(b) : 1;
    negatives = splitToPatterns(newMin, Math.abs(a), state, opts);
    a = state.a = 0;
  }

  if (b >= 0) {
    positives = splitToPatterns(a, b, state, opts);
  }

  state.negatives = negatives;
  state.positives = positives;
  state.result = collatePatterns(negatives, positives);

  if (opts.capture === true) {
    state.result = `(${state.result})`;
  } else if (opts.wrap !== false && (positives.length + negatives.length) > 1) {
    state.result = `(?:${state.result})`;
  }

  toRegexRange.cache[cacheKey] = state;
  return state.result;
};

function collatePatterns(neg, pos, options) {
  let onlyNegative = filterPatterns(neg, pos, '-', false) || [];
  let onlyPositive = filterPatterns(pos, neg, '', false) || [];
  let intersected = filterPatterns(neg, pos, '-?', true) || [];
  let subpatterns = onlyNegative.concat(intersected).concat(onlyPositive);
  return subpatterns.join('|');
}

function splitToRanges(min, max) {
  let nines = 1;
  let zeros = 1;

  let stop = countNines(min, nines);
  let stops = new Set([max]);

  while (min <= stop && stop <= max) {
    stops.add(stop);
    nines += 1;
    stop = countNines(min, nines);
  }

  stop = countZeros(max + 1, zeros) - 1;

  while (min < stop && stop <= max) {
    stops.add(stop);
    zeros += 1;
    stop = countZeros(max + 1, zeros) - 1;
  }

  stops = [...stops];
  stops.sort(compare);
  return stops;
}

/**
 * Convert a range to a regex pattern
 * @param {Number} `start`
 * @param {Number} `stop`
 * @return {String}
 */

function rangeToPattern(start, stop, options) {
  if (start === stop) {
    return { pattern: start, count: [], digits: 0 };
  }

  let zipped = zip(start, stop);
  let digits = zipped.length;
  let pattern = '';
  let count = 0;

  for (let i = 0; i < digits; i++) {
    let [startDigit, stopDigit] = zipped[i];

    if (startDigit === stopDigit) {
      pattern += startDigit;

    } else if (startDigit !== '0' || stopDigit !== '9') {
      pattern += toCharacterClass(startDigit, stopDigit);

    } else {
      count++;
    }
  }

  if (count) {
    pattern += options.shorthand === true ? '\\d' : '[0-9]';
  }

  return { pattern, count: [count], digits };
}

function splitToPatterns(min, max, tok, options) {
  let ranges = splitToRanges(min, max);
  let tokens = [];
  let start = min;
  let prev;

  for (let i = 0; i < ranges.length; i++) {
    let max = ranges[i];
    let obj = rangeToPattern(String(start), String(max), options);
    let zeros = '';

    if (!tok.isPadded && prev && prev.pattern === obj.pattern) {
      if (prev.count.length > 1) {
        prev.count.pop();
      }

      prev.count.push(obj.count[0]);
      prev.string = prev.pattern + toQuantifier(prev.count);
      start = max + 1;
      continue;
    }

    if (tok.isPadded) {
      zeros = padZeros(max, tok, options);
    }

    obj.string = zeros + obj.pattern + toQuantifier(obj.count);
    tokens.push(obj);
    start = max + 1;
    prev = obj;
  }

  return tokens;
}

function filterPatterns(arr, comparison, prefix, intersection, options) {
  let result = [];

  for (let ele of arr) {
    let { string } = ele;

    // only push if _both_ are negative...
    if (!intersection && !contains(comparison, 'string', string)) {
      result.push(prefix + string);
    }

    // or _both_ are positive
    if (intersection && contains(comparison, 'string', string)) {
      result.push(prefix + string);
    }
  }
  return result;
}

/**
 * Zip strings
 */

function zip(a, b) {
  let arr = [];
  for (let i = 0; i < a.length; i++) arr.push([a[i], b[i]]);
  return arr;
}

function compare(a, b) {
  return a > b ? 1 : b > a ? -1 : 0;
}

function contains(arr, key, val) {
  return arr.some(ele => ele[key] === val);
}

function countNines(min, len) {
  return Number(String(min).slice(0, -len) + '9'.repeat(len));
}

function countZeros(integer, zeros) {
  return integer - (integer % Math.pow(10, zeros));
}

function toQuantifier(digits) {
  let [start = 0, stop = ''] = digits;
  if (stop || start > 1) {
    return `{${start + (stop ? ',' + stop : '')}}`;
  }
  return '';
}

function toCharacterClass(a, b, options) {
  return `[${a}${(b - a === 1) ? '' : '-'}${b}]`;
}

function hasPadding(str) {
  return /^-?(0+)\d/.test(str);
}

function padZeros(value, tok, options) {
  if (!tok.isPadded) {
    return value;
  }

  let diff = Math.abs(tok.maxLen - String(value).length);
  let relax = options.relaxZeros !== false;

  switch (diff) {
    case 0:
      return '';
    case 1:
      return relax ? '0?' : '0';
    case 2:
      return relax ? '0{0,2}' : '00';
    default: {
      return relax ? `0{0,${diff}}` : `0{${diff}}`;
    }
  }
}

/**
 * Cache
 */

toRegexRange.cache = {};
toRegexRange.clearCache = () => (toRegexRange.cache = {});

/**
 * Expose `toRegexRange`
 */

var toRegexRange_1 = toRegexRange;

const isObject = val => val !== null && typeof val === 'object' && !Array.isArray(val);

const transform = toNumber => {
  return value => toNumber === true ? Number(value) : String(value);
};

const isValidValue = value => {
  return typeof value === 'number' || (typeof value === 'string' && value !== '');
};

const isNumber$1 = num => Number.isInteger(+num);

const zeros = input => {
  let value = `${input}`;
  let index = -1;
  if (value[0] === '-') value = value.slice(1);
  if (value === '0') return false;
  while (value[++index] === '0');
  return index > 0;
};

const stringify$1 = (start, end, options) => {
  if (typeof start === 'string' || typeof end === 'string') {
    return true;
  }
  return options.stringify === true;
};

const pad = (input, maxLength, toNumber) => {
  if (maxLength > 0) {
    let dash = input[0] === '-' ? '-' : '';
    if (dash) input = input.slice(1);
    input = (dash + input.padStart(dash ? maxLength - 1 : maxLength, '0'));
  }
  if (toNumber === false) {
    return String(input);
  }
  return input;
};

const toMaxLen = (input, maxLength) => {
  let negative = input[0] === '-' ? '-' : '';
  if (negative) {
    input = input.slice(1);
    maxLength--;
  }
  while (input.length < maxLength) input = '0' + input;
  return negative ? ('-' + input) : input;
};

const toSequence = (parts, options) => {
  parts.negatives.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
  parts.positives.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);

  let prefix = options.capture ? '' : '?:';
  let positives = '';
  let negatives = '';
  let result;

  if (parts.positives.length) {
    positives = parts.positives.join('|');
  }

  if (parts.negatives.length) {
    negatives = `-(${prefix}${parts.negatives.join('|')})`;
  }

  if (positives && negatives) {
    result = `${positives}|${negatives}`;
  } else {
    result = positives || negatives;
  }

  if (options.wrap) {
    return `(${prefix}${result})`;
  }

  return result;
};

const toRange = (a, b, isNumbers, options) => {
  if (isNumbers) {
    return toRegexRange_1(a, b, { wrap: false, ...options });
  }

  let start = String.fromCharCode(a);
  if (a === b) return start;

  let stop = String.fromCharCode(b);
  return `[${start}-${stop}]`;
};

const toRegex = (start, end, options) => {
  if (Array.isArray(start)) {
    let wrap = options.wrap === true;
    let prefix = options.capture ? '' : '?:';
    return wrap ? `(${prefix}${start.join('|')})` : start.join('|');
  }
  return toRegexRange_1(start, end, options);
};

const rangeError = (...args) => {
  return new RangeError('Invalid range arguments: ' + util$1__default.inspect(...args));
};

const invalidRange = (start, end, options) => {
  if (options.strictRanges === true) throw rangeError([start, end]);
  return [];
};

const invalidStep = (step, options) => {
  if (options.strictRanges === true) {
    throw new TypeError(`Expected step "${step}" to be a number`);
  }
  return [];
};

const fillNumbers = (start, end, step = 1, options = {}) => {
  let a = Number(start);
  let b = Number(end);

  if (!Number.isInteger(a) || !Number.isInteger(b)) {
    if (options.strictRanges === true) throw rangeError([start, end]);
    return [];
  }

  // fix negative zero
  if (a === 0) a = 0;
  if (b === 0) b = 0;

  let descending = a > b;
  let startString = String(start);
  let endString = String(end);
  let stepString = String(step);
  step = Math.max(Math.abs(step), 1);

  let padded = zeros(startString) || zeros(endString) || zeros(stepString);
  let maxLen = padded ? Math.max(startString.length, endString.length, stepString.length) : 0;
  let toNumber = padded === false && stringify$1(start, end, options) === false;
  let format = options.transform || transform(toNumber);

  if (options.toRegex && step === 1) {
    return toRange(toMaxLen(start, maxLen), toMaxLen(end, maxLen), true, options);
  }

  let parts = { negatives: [], positives: [] };
  let push = num => parts[num < 0 ? 'negatives' : 'positives'].push(Math.abs(num));
  let range = [];
  let index = 0;

  while (descending ? a >= b : a <= b) {
    if (options.toRegex === true && step > 1) {
      push(a);
    } else {
      range.push(pad(format(a, index), maxLen, toNumber));
    }
    a = descending ? a - step : a + step;
    index++;
  }

  if (options.toRegex === true) {
    return step > 1
      ? toSequence(parts, options)
      : toRegex(range, null, { wrap: false, ...options });
  }

  return range;
};

const fillLetters = (start, end, step = 1, options = {}) => {
  if ((!isNumber$1(start) && start.length > 1) || (!isNumber$1(end) && end.length > 1)) {
    return invalidRange(start, end, options);
  }


  let format = options.transform || (val => String.fromCharCode(val));
  let a = `${start}`.charCodeAt(0);
  let b = `${end}`.charCodeAt(0);

  let descending = a > b;
  let min = Math.min(a, b);
  let max = Math.max(a, b);

  if (options.toRegex && step === 1) {
    return toRange(min, max, false, options);
  }

  let range = [];
  let index = 0;

  while (descending ? a >= b : a <= b) {
    range.push(format(a, index));
    a = descending ? a - step : a + step;
    index++;
  }

  if (options.toRegex === true) {
    return toRegex(range, null, { wrap: false, options });
  }

  return range;
};

const fill = (start, end, step, options = {}) => {
  if (end == null && isValidValue(start)) {
    return [start];
  }

  if (!isValidValue(start) || !isValidValue(end)) {
    return invalidRange(start, end, options);
  }

  if (typeof step === 'function') {
    return fill(start, end, 1, { transform: step });
  }

  if (isObject(step)) {
    return fill(start, end, 0, step);
  }

  let opts = { ...options };
  if (opts.capture === true) opts.wrap = true;
  step = step || opts.step || 1;

  if (!isNumber$1(step)) {
    if (step != null && !isObject(step)) return invalidStep(step, opts);
    return fill(start, end, 1, step);
  }

  if (isNumber$1(start) && isNumber$1(end)) {
    return fillNumbers(start, end, step, opts);
  }

  return fillLetters(start, end, Math.max(Math.abs(step), 1), opts);
};

var fillRange = fill;

const compile = (ast, options = {}) => {
  let walk = (node, parent = {}) => {
    let invalidBlock = utils.isInvalidBrace(parent);
    let invalidNode = node.invalid === true && options.escapeInvalid === true;
    let invalid = invalidBlock === true || invalidNode === true;
    let prefix = options.escapeInvalid === true ? '\\' : '';
    let output = '';

    if (node.isOpen === true) {
      return prefix + node.value;
    }
    if (node.isClose === true) {
      return prefix + node.value;
    }

    if (node.type === 'open') {
      return invalid ? (prefix + node.value) : '(';
    }

    if (node.type === 'close') {
      return invalid ? (prefix + node.value) : ')';
    }

    if (node.type === 'comma') {
      return node.prev.type === 'comma' ? '' : (invalid ? node.value : '|');
    }

    if (node.value) {
      return node.value;
    }

    if (node.nodes && node.ranges > 0) {
      let args = utils.reduce(node.nodes);
      let range = fillRange(...args, { ...options, wrap: false, toRegex: true });

      if (range.length !== 0) {
        return args.length > 1 && range.length > 1 ? `(${range})` : range;
      }
    }

    if (node.nodes) {
      for (let child of node.nodes) {
        output += walk(child, node);
      }
    }
    return output;
  };

  return walk(ast);
};

var compile_1 = compile;

const append = (queue = '', stash = '', enclose = false) => {
  let result = [];

  queue = [].concat(queue);
  stash = [].concat(stash);

  if (!stash.length) return queue;
  if (!queue.length) {
    return enclose ? utils.flatten(stash).map(ele => `{${ele}}`) : stash;
  }

  for (let item of queue) {
    if (Array.isArray(item)) {
      for (let value of item) {
        result.push(append(value, stash, enclose));
      }
    } else {
      for (let ele of stash) {
        if (enclose === true && typeof ele === 'string') ele = `{${ele}}`;
        result.push(Array.isArray(ele) ? append(item, ele, enclose) : (item + ele));
      }
    }
  }
  return utils.flatten(result);
};

const expand = (ast, options = {}) => {
  let rangeLimit = options.rangeLimit === void 0 ? 1000 : options.rangeLimit;

  let walk = (node, parent = {}) => {
    node.queue = [];

    let p = parent;
    let q = parent.queue;

    while (p.type !== 'brace' && p.type !== 'root' && p.parent) {
      p = p.parent;
      q = p.queue;
    }

    if (node.invalid || node.dollar) {
      q.push(append(q.pop(), stringify(node, options)));
      return;
    }

    if (node.type === 'brace' && node.invalid !== true && node.nodes.length === 2) {
      q.push(append(q.pop(), ['{}']));
      return;
    }

    if (node.nodes && node.ranges > 0) {
      let args = utils.reduce(node.nodes);

      if (utils.exceedsLimit(...args, options.step, rangeLimit)) {
        throw new RangeError('expanded array length exceeds range limit. Use options.rangeLimit to increase or disable the limit.');
      }

      let range = fillRange(...args, options);
      if (range.length === 0) {
        range = stringify(node, options);
      }

      q.push(append(q.pop(), range));
      node.nodes = [];
      return;
    }

    let enclose = utils.encloseBrace(node);
    let queue = node.queue;
    let block = node;

    while (block.type !== 'brace' && block.type !== 'root' && block.parent) {
      block = block.parent;
      queue = block.queue;
    }

    for (let i = 0; i < node.nodes.length; i++) {
      let child = node.nodes[i];

      if (child.type === 'comma' && node.type === 'brace') {
        if (i === 1) queue.push('');
        queue.push('');
        continue;
      }

      if (child.type === 'close') {
        q.push(append(q.pop(), queue, enclose));
        continue;
      }

      if (child.value && child.type !== 'open') {
        queue.push(append(queue.pop(), child.value));
        continue;
      }

      if (child.nodes) {
        walk(child, node);
      }
    }

    return queue;
  };

  return utils.flatten(walk(ast));
};

var expand_1 = expand;

var constants = {
  MAX_LENGTH: 1024 * 64,

  // Digits
  CHAR_0: '0', /* 0 */
  CHAR_9: '9', /* 9 */

  // Alphabet chars.
  CHAR_UPPERCASE_A: 'A', /* A */
  CHAR_LOWERCASE_A: 'a', /* a */
  CHAR_UPPERCASE_Z: 'Z', /* Z */
  CHAR_LOWERCASE_Z: 'z', /* z */

  CHAR_LEFT_PARENTHESES: '(', /* ( */
  CHAR_RIGHT_PARENTHESES: ')', /* ) */

  CHAR_ASTERISK: '*', /* * */

  // Non-alphabetic chars.
  CHAR_AMPERSAND: '&', /* & */
  CHAR_AT: '@', /* @ */
  CHAR_BACKSLASH: '\\', /* \ */
  CHAR_BACKTICK: '`', /* ` */
  CHAR_CARRIAGE_RETURN: '\r', /* \r */
  CHAR_CIRCUMFLEX_ACCENT: '^', /* ^ */
  CHAR_COLON: ':', /* : */
  CHAR_COMMA: ',', /* , */
  CHAR_DOLLAR: '$', /* . */
  CHAR_DOT: '.', /* . */
  CHAR_DOUBLE_QUOTE: '"', /* " */
  CHAR_EQUAL: '=', /* = */
  CHAR_EXCLAMATION_MARK: '!', /* ! */
  CHAR_FORM_FEED: '\f', /* \f */
  CHAR_FORWARD_SLASH: '/', /* / */
  CHAR_HASH: '#', /* # */
  CHAR_HYPHEN_MINUS: '-', /* - */
  CHAR_LEFT_ANGLE_BRACKET: '<', /* < */
  CHAR_LEFT_CURLY_BRACE: '{', /* { */
  CHAR_LEFT_SQUARE_BRACKET: '[', /* [ */
  CHAR_LINE_FEED: '\n', /* \n */
  CHAR_NO_BREAK_SPACE: '\u00A0', /* \u00A0 */
  CHAR_PERCENT: '%', /* % */
  CHAR_PLUS: '+', /* + */
  CHAR_QUESTION_MARK: '?', /* ? */
  CHAR_RIGHT_ANGLE_BRACKET: '>', /* > */
  CHAR_RIGHT_CURLY_BRACE: '}', /* } */
  CHAR_RIGHT_SQUARE_BRACKET: ']', /* ] */
  CHAR_SEMICOLON: ';', /* ; */
  CHAR_SINGLE_QUOTE: '\'', /* ' */
  CHAR_SPACE: ' ', /*   */
  CHAR_TAB: '\t', /* \t */
  CHAR_UNDERSCORE: '_', /* _ */
  CHAR_VERTICAL_LINE: '|', /* | */
  CHAR_ZERO_WIDTH_NOBREAK_SPACE: '\uFEFF' /* \uFEFF */
};

/**
 * Constants
 */

const {
  MAX_LENGTH,
  CHAR_BACKSLASH, /* \ */
  CHAR_BACKTICK, /* ` */
  CHAR_COMMA, /* , */
  CHAR_DOT, /* . */
  CHAR_LEFT_PARENTHESES, /* ( */
  CHAR_RIGHT_PARENTHESES, /* ) */
  CHAR_LEFT_CURLY_BRACE, /* { */
  CHAR_RIGHT_CURLY_BRACE, /* } */
  CHAR_LEFT_SQUARE_BRACKET, /* [ */
  CHAR_RIGHT_SQUARE_BRACKET, /* ] */
  CHAR_DOUBLE_QUOTE, /* " */
  CHAR_SINGLE_QUOTE, /* ' */
  CHAR_NO_BREAK_SPACE,
  CHAR_ZERO_WIDTH_NOBREAK_SPACE
} = constants;

/**
 * parse
 */

const parse = (input, options = {}) => {
  if (typeof input !== 'string') {
    throw new TypeError('Expected a string');
  }

  let opts = options || {};
  let max = typeof opts.maxLength === 'number' ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
  if (input.length > max) {
    throw new SyntaxError(`Input length (${input.length}), exceeds max characters (${max})`);
  }

  let ast = { type: 'root', input, nodes: [] };
  let stack = [ast];
  let block = ast;
  let prev = ast;
  let brackets = 0;
  let length = input.length;
  let index = 0;
  let depth = 0;
  let value;

  /**
   * Helpers
   */

  const advance = () => input[index++];
  const push = node => {
    if (node.type === 'text' && prev.type === 'dot') {
      prev.type = 'text';
    }

    if (prev && prev.type === 'text' && node.type === 'text') {
      prev.value += node.value;
      return;
    }

    block.nodes.push(node);
    node.parent = block;
    node.prev = prev;
    prev = node;
    return node;
  };

  push({ type: 'bos' });

  while (index < length) {
    block = stack[stack.length - 1];
    value = advance();

    /**
     * Invalid chars
     */

    if (value === CHAR_ZERO_WIDTH_NOBREAK_SPACE || value === CHAR_NO_BREAK_SPACE) {
      continue;
    }

    /**
     * Escaped chars
     */

    if (value === CHAR_BACKSLASH) {
      push({ type: 'text', value: (options.keepEscaping ? value : '') + advance() });
      continue;
    }

    /**
     * Right square bracket (literal): ']'
     */

    if (value === CHAR_RIGHT_SQUARE_BRACKET) {
      push({ type: 'text', value: '\\' + value });
      continue;
    }

    /**
     * Left square bracket: '['
     */

    if (value === CHAR_LEFT_SQUARE_BRACKET) {
      brackets++;
      let next;

      while (index < length && (next = advance())) {
        value += next;

        if (next === CHAR_LEFT_SQUARE_BRACKET) {
          brackets++;
          continue;
        }

        if (next === CHAR_BACKSLASH) {
          value += advance();
          continue;
        }

        if (next === CHAR_RIGHT_SQUARE_BRACKET) {
          brackets--;

          if (brackets === 0) {
            break;
          }
        }
      }

      push({ type: 'text', value });
      continue;
    }

    /**
     * Parentheses
     */

    if (value === CHAR_LEFT_PARENTHESES) {
      block = push({ type: 'paren', nodes: [] });
      stack.push(block);
      push({ type: 'text', value });
      continue;
    }

    if (value === CHAR_RIGHT_PARENTHESES) {
      if (block.type !== 'paren') {
        push({ type: 'text', value });
        continue;
      }
      block = stack.pop();
      push({ type: 'text', value });
      block = stack[stack.length - 1];
      continue;
    }

    /**
     * Quotes: '|"|`
     */

    if (value === CHAR_DOUBLE_QUOTE || value === CHAR_SINGLE_QUOTE || value === CHAR_BACKTICK) {
      let open = value;
      let next;

      if (options.keepQuotes !== true) {
        value = '';
      }

      while (index < length && (next = advance())) {
        if (next === CHAR_BACKSLASH) {
          value += next + advance();
          continue;
        }

        if (next === open) {
          if (options.keepQuotes === true) value += next;
          break;
        }

        value += next;
      }

      push({ type: 'text', value });
      continue;
    }

    /**
     * Left curly brace: '{'
     */

    if (value === CHAR_LEFT_CURLY_BRACE) {
      depth++;

      let dollar = prev.value && prev.value.slice(-1) === '$' || block.dollar === true;
      let brace = {
        type: 'brace',
        open: true,
        close: false,
        dollar,
        depth,
        commas: 0,
        ranges: 0,
        nodes: []
      };

      block = push(brace);
      stack.push(block);
      push({ type: 'open', value });
      continue;
    }

    /**
     * Right curly brace: '}'
     */

    if (value === CHAR_RIGHT_CURLY_BRACE) {
      if (block.type !== 'brace') {
        push({ type: 'text', value });
        continue;
      }

      let type = 'close';
      block = stack.pop();
      block.close = true;

      push({ type, value });
      depth--;

      block = stack[stack.length - 1];
      continue;
    }

    /**
     * Comma: ','
     */

    if (value === CHAR_COMMA && depth > 0) {
      if (block.ranges > 0) {
        block.ranges = 0;
        let open = block.nodes.shift();
        block.nodes = [open, { type: 'text', value: stringify(block) }];
      }

      push({ type: 'comma', value });
      block.commas++;
      continue;
    }

    /**
     * Dot: '.'
     */

    if (value === CHAR_DOT && depth > 0 && block.commas === 0) {
      let siblings = block.nodes;

      if (depth === 0 || siblings.length === 0) {
        push({ type: 'text', value });
        continue;
      }

      if (prev.type === 'dot') {
        block.range = [];
        prev.value += value;
        prev.type = 'range';

        if (block.nodes.length !== 3 && block.nodes.length !== 5) {
          block.invalid = true;
          block.ranges = 0;
          prev.type = 'text';
          continue;
        }

        block.ranges++;
        block.args = [];
        continue;
      }

      if (prev.type === 'range') {
        siblings.pop();

        let before = siblings[siblings.length - 1];
        before.value += prev.value + value;
        prev = before;
        block.ranges--;
        continue;
      }

      push({ type: 'dot', value });
      continue;
    }

    /**
     * Text
     */

    push({ type: 'text', value });
  }

  // Mark imbalanced braces and brackets as invalid
  do {
    block = stack.pop();

    if (block.type !== 'root') {
      block.nodes.forEach(node => {
        if (!node.nodes) {
          if (node.type === 'open') node.isOpen = true;
          if (node.type === 'close') node.isClose = true;
          if (!node.nodes) node.type = 'text';
          node.invalid = true;
        }
      });

      // get the location of the block on parent.nodes (block's siblings)
      let parent = stack[stack.length - 1];
      let index = parent.nodes.indexOf(block);
      // replace the (invalid) block with it's nodes
      parent.nodes.splice(index, 1, ...block.nodes);
    }
  } while (stack.length > 0);

  push({ type: 'eos' });
  return ast;
};

var parse_1 = parse;

/**
 * Expand the given pattern or create a regex-compatible string.
 *
 * ```js
 * const braces = require('braces');
 * console.log(braces('{a,b,c}', { compile: true })); //=> ['(a|b|c)']
 * console.log(braces('{a,b,c}')); //=> ['a', 'b', 'c']
 * ```
 * @param {String} `str`
 * @param {Object} `options`
 * @return {String}
 * @api public
 */

const braces = (input, options = {}) => {
  let output = [];

  if (Array.isArray(input)) {
    for (let pattern of input) {
      let result = braces.create(pattern, options);
      if (Array.isArray(result)) {
        output.push(...result);
      } else {
        output.push(result);
      }
    }
  } else {
    output = [].concat(braces.create(input, options));
  }

  if (options && options.expand === true && options.nodupes === true) {
    output = [...new Set(output)];
  }
  return output;
};

/**
 * Parse the given `str` with the given `options`.
 *
 * ```js
 * // braces.parse(pattern, [, options]);
 * const ast = braces.parse('a/{b,c}/d');
 * console.log(ast);
 * ```
 * @param {String} pattern Brace pattern to parse
 * @param {Object} options
 * @return {Object} Returns an AST
 * @api public
 */

braces.parse = (input, options = {}) => parse_1(input, options);

/**
 * Creates a braces string from an AST, or an AST node.
 *
 * ```js
 * const braces = require('braces');
 * let ast = braces.parse('foo/{a,b}/bar');
 * console.log(stringify(ast.nodes[2])); //=> '{a,b}'
 * ```
 * @param {String} `input` Brace pattern or AST.
 * @param {Object} `options`
 * @return {Array} Returns an array of expanded values.
 * @api public
 */

braces.stringify = (input, options = {}) => {
  if (typeof input === 'string') {
    return stringify(braces.parse(input, options), options);
  }
  return stringify(input, options);
};

/**
 * Compiles a brace pattern into a regex-compatible, optimized string.
 * This method is called by the main [braces](#braces) function by default.
 *
 * ```js
 * const braces = require('braces');
 * console.log(braces.compile('a/{b,c}/d'));
 * //=> ['a/(b|c)/d']
 * ```
 * @param {String} `input` Brace pattern or AST.
 * @param {Object} `options`
 * @return {Array} Returns an array of expanded values.
 * @api public
 */

braces.compile = (input, options = {}) => {
  if (typeof input === 'string') {
    input = braces.parse(input, options);
  }
  return compile_1(input, options);
};

/**
 * Expands a brace pattern into an array. This method is called by the
 * main [braces](#braces) function when `options.expand` is true. Before
 * using this method it's recommended that you read the [performance notes](#performance))
 * and advantages of using [.compile](#compile) instead.
 *
 * ```js
 * const braces = require('braces');
 * console.log(braces.expand('a/{b,c}/d'));
 * //=> ['a/b/d', 'a/c/d'];
 * ```
 * @param {String} `pattern` Brace pattern
 * @param {Object} `options`
 * @return {Array} Returns an array of expanded values.
 * @api public
 */

braces.expand = (input, options = {}) => {
  if (typeof input === 'string') {
    input = braces.parse(input, options);
  }

  let result = expand_1(input, options);

  // filter out empty strings if specified
  if (options.noempty === true) {
    result = result.filter(Boolean);
  }

  // filter out duplicates if specified
  if (options.nodupes === true) {
    result = [...new Set(result)];
  }

  return result;
};

/**
 * Processes a brace pattern and returns either an expanded array
 * (if `options.expand` is true), a highly optimized regex-compatible string.
 * This method is called by the main [braces](#braces) function.
 *
 * ```js
 * const braces = require('braces');
 * console.log(braces.create('user-{200..300}/project-{a,b,c}-{1..10}'))
 * //=> 'user-(20[0-9]|2[1-9][0-9]|300)/project-(a|b|c)-([1-9]|10)'
 * ```
 * @param {String} `pattern` Brace pattern
 * @param {Object} `options`
 * @return {Array} Returns an array of expanded values.
 * @api public
 */

braces.create = (input, options = {}) => {
  if (input === '' || input.length < 3) {
    return [input];
  }

 return options.expand !== true
    ? braces.compile(input, options)
    : braces.expand(input, options);
};

/**
 * Expose "braces"
 */

var braces_1 = braces;

const WIN_SLASH = '\\\\/';
const WIN_NO_SLASH = `[^${WIN_SLASH}]`;

/**
 * Posix glob regex
 */

const DOT_LITERAL = '\\.';
const PLUS_LITERAL = '\\+';
const QMARK_LITERAL = '\\?';
const SLASH_LITERAL = '\\/';
const ONE_CHAR = '(?=.)';
const QMARK = '[^/]';
const END_ANCHOR = `(?:${SLASH_LITERAL}|$)`;
const START_ANCHOR = `(?:^|${SLASH_LITERAL})`;
const DOTS_SLASH = `${DOT_LITERAL}{1,2}${END_ANCHOR}`;
const NO_DOT = `(?!${DOT_LITERAL})`;
const NO_DOTS = `(?!${START_ANCHOR}${DOTS_SLASH})`;
const NO_DOT_SLASH = `(?!${DOT_LITERAL}{0,1}${END_ANCHOR})`;
const NO_DOTS_SLASH = `(?!${DOTS_SLASH})`;
const QMARK_NO_DOT = `[^.${SLASH_LITERAL}]`;
const STAR = `${QMARK}*?`;

const POSIX_CHARS = {
  DOT_LITERAL,
  PLUS_LITERAL,
  QMARK_LITERAL,
  SLASH_LITERAL,
  ONE_CHAR,
  QMARK,
  END_ANCHOR,
  DOTS_SLASH,
  NO_DOT,
  NO_DOTS,
  NO_DOT_SLASH,
  NO_DOTS_SLASH,
  QMARK_NO_DOT,
  STAR,
  START_ANCHOR
};

/**
 * Windows glob regex
 */

const WINDOWS_CHARS = {
  ...POSIX_CHARS,

  SLASH_LITERAL: `[${WIN_SLASH}]`,
  QMARK: WIN_NO_SLASH,
  STAR: `${WIN_NO_SLASH}*?`,
  DOTS_SLASH: `${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$)`,
  NO_DOT: `(?!${DOT_LITERAL})`,
  NO_DOTS: `(?!(?:^|[${WIN_SLASH}])${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
  NO_DOT_SLASH: `(?!${DOT_LITERAL}{0,1}(?:[${WIN_SLASH}]|$))`,
  NO_DOTS_SLASH: `(?!${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
  QMARK_NO_DOT: `[^.${WIN_SLASH}]`,
  START_ANCHOR: `(?:^|[${WIN_SLASH}])`,
  END_ANCHOR: `(?:[${WIN_SLASH}]|$)`
};

/**
 * POSIX Bracket Regex
 */

const POSIX_REGEX_SOURCE = {
  alnum: 'a-zA-Z0-9',
  alpha: 'a-zA-Z',
  ascii: '\\x00-\\x7F',
  blank: ' \\t',
  cntrl: '\\x00-\\x1F\\x7F',
  digit: '0-9',
  graph: '\\x21-\\x7E',
  lower: 'a-z',
  print: '\\x20-\\x7E ',
  punct: '\\-!"#$%&\'()\\*+,./:;<=>?@[\\]^_`{|}~',
  space: ' \\t\\r\\n\\v\\f',
  upper: 'A-Z',
  word: 'A-Za-z0-9_',
  xdigit: 'A-Fa-f0-9'
};

var constants$1 = {
  MAX_LENGTH: 1024 * 64,
  POSIX_REGEX_SOURCE,

  // regular expressions
  REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
  REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
  REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
  REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
  REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
  REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,

  // Replace globs with equivalent patterns to reduce parsing time.
  REPLACEMENTS: {
    '***': '*',
    '**/**': '**',
    '**/**/**': '**'
  },

  // Digits
  CHAR_0: 48, /* 0 */
  CHAR_9: 57, /* 9 */

  // Alphabet chars.
  CHAR_UPPERCASE_A: 65, /* A */
  CHAR_LOWERCASE_A: 97, /* a */
  CHAR_UPPERCASE_Z: 90, /* Z */
  CHAR_LOWERCASE_Z: 122, /* z */

  CHAR_LEFT_PARENTHESES: 40, /* ( */
  CHAR_RIGHT_PARENTHESES: 41, /* ) */

  CHAR_ASTERISK: 42, /* * */

  // Non-alphabetic chars.
  CHAR_AMPERSAND: 38, /* & */
  CHAR_AT: 64, /* @ */
  CHAR_BACKWARD_SLASH: 92, /* \ */
  CHAR_CARRIAGE_RETURN: 13, /* \r */
  CHAR_CIRCUMFLEX_ACCENT: 94, /* ^ */
  CHAR_COLON: 58, /* : */
  CHAR_COMMA: 44, /* , */
  CHAR_DOT: 46, /* . */
  CHAR_DOUBLE_QUOTE: 34, /* " */
  CHAR_EQUAL: 61, /* = */
  CHAR_EXCLAMATION_MARK: 33, /* ! */
  CHAR_FORM_FEED: 12, /* \f */
  CHAR_FORWARD_SLASH: 47, /* / */
  CHAR_GRAVE_ACCENT: 96, /* ` */
  CHAR_HASH: 35, /* # */
  CHAR_HYPHEN_MINUS: 45, /* - */
  CHAR_LEFT_ANGLE_BRACKET: 60, /* < */
  CHAR_LEFT_CURLY_BRACE: 123, /* { */
  CHAR_LEFT_SQUARE_BRACKET: 91, /* [ */
  CHAR_LINE_FEED: 10, /* \n */
  CHAR_NO_BREAK_SPACE: 160, /* \u00A0 */
  CHAR_PERCENT: 37, /* % */
  CHAR_PLUS: 43, /* + */
  CHAR_QUESTION_MARK: 63, /* ? */
  CHAR_RIGHT_ANGLE_BRACKET: 62, /* > */
  CHAR_RIGHT_CURLY_BRACE: 125, /* } */
  CHAR_RIGHT_SQUARE_BRACKET: 93, /* ] */
  CHAR_SEMICOLON: 59, /* ; */
  CHAR_SINGLE_QUOTE: 39, /* ' */
  CHAR_SPACE: 32, /*   */
  CHAR_TAB: 9, /* \t */
  CHAR_UNDERSCORE: 95, /* _ */
  CHAR_VERTICAL_LINE: 124, /* | */
  CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279, /* \uFEFF */

  SEP: path__default.sep,

  /**
   * Create EXTGLOB_CHARS
   */

  extglobChars(chars) {
    return {
      '!': { type: 'negate', open: '(?:(?!(?:', close: `))${chars.STAR})` },
      '?': { type: 'qmark', open: '(?:', close: ')?' },
      '+': { type: 'plus', open: '(?:', close: ')+' },
      '*': { type: 'star', open: '(?:', close: ')*' },
      '@': { type: 'at', open: '(?:', close: ')' }
    };
  },

  /**
   * Create GLOB_CHARS
   */

  globChars(win32) {
    return win32 === true ? WINDOWS_CHARS : POSIX_CHARS;
  }
};

var utils$1 = createCommonjsModule(function (module, exports) {


const win32 = process.platform === 'win32';
const {
  REGEX_BACKSLASH,
  REGEX_REMOVE_BACKSLASH,
  REGEX_SPECIAL_CHARS,
  REGEX_SPECIAL_CHARS_GLOBAL
} = constants$1;

exports.isObject = val => val !== null && typeof val === 'object' && !Array.isArray(val);
exports.hasRegexChars = str => REGEX_SPECIAL_CHARS.test(str);
exports.isRegexChar = str => str.length === 1 && exports.hasRegexChars(str);
exports.escapeRegex = str => str.replace(REGEX_SPECIAL_CHARS_GLOBAL, '\\$1');
exports.toPosixSlashes = str => str.replace(REGEX_BACKSLASH, '/');

exports.removeBackslashes = str => {
  return str.replace(REGEX_REMOVE_BACKSLASH, match => {
    return match === '\\' ? '' : match;
  });
};

exports.supportsLookbehinds = () => {
  const segs = process.version.slice(1).split('.').map(Number);
  if (segs.length === 3 && segs[0] >= 9 || (segs[0] === 8 && segs[1] >= 10)) {
    return true;
  }
  return false;
};

exports.isWindows = options => {
  if (options && typeof options.windows === 'boolean') {
    return options.windows;
  }
  return win32 === true || path__default.sep === '\\';
};

exports.escapeLast = (input, char, lastIdx) => {
  const idx = input.lastIndexOf(char, lastIdx);
  if (idx === -1) return input;
  if (input[idx - 1] === '\\') return exports.escapeLast(input, char, idx - 1);
  return `${input.slice(0, idx)}\\${input.slice(idx)}`;
};

exports.removePrefix = (input, state = {}) => {
  let output = input;
  if (output.startsWith('./')) {
    output = output.slice(2);
    state.prefix = './';
  }
  return output;
};

exports.wrapOutput = (input, state = {}, options = {}) => {
  const prepend = options.contains ? '' : '^';
  const append = options.contains ? '' : '$';

  let output = `${prepend}(?:${input})${append}`;
  if (state.negated === true) {
    output = `(?:^(?!${output}).*$)`;
  }
  return output;
};
});

const {
  CHAR_ASTERISK,             /* * */
  CHAR_AT,                   /* @ */
  CHAR_BACKWARD_SLASH,       /* \ */
  CHAR_COMMA: CHAR_COMMA$1,                /* , */
  CHAR_DOT: CHAR_DOT$1,                  /* . */
  CHAR_EXCLAMATION_MARK,     /* ! */
  CHAR_FORWARD_SLASH,        /* / */
  CHAR_LEFT_CURLY_BRACE: CHAR_LEFT_CURLY_BRACE$1,     /* { */
  CHAR_LEFT_PARENTHESES: CHAR_LEFT_PARENTHESES$1,     /* ( */
  CHAR_LEFT_SQUARE_BRACKET: CHAR_LEFT_SQUARE_BRACKET$1,  /* [ */
  CHAR_PLUS,                 /* + */
  CHAR_QUESTION_MARK,        /* ? */
  CHAR_RIGHT_CURLY_BRACE: CHAR_RIGHT_CURLY_BRACE$1,    /* } */
  CHAR_RIGHT_PARENTHESES: CHAR_RIGHT_PARENTHESES$1,    /* ) */
  CHAR_RIGHT_SQUARE_BRACKET: CHAR_RIGHT_SQUARE_BRACKET$1  /* ] */
} = constants$1;

const isPathSeparator = code => {
  return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
};

const depth = token => {
  if (token.isPrefix !== true) {
    token.depth = token.isGlobstar ? Infinity : 1;
  }
};

/**
 * Quickly scans a glob pattern and returns an object with a handful of
 * useful properties, like `isGlob`, `path` (the leading non-glob, if it exists),
 * `glob` (the actual pattern), and `negated` (true if the path starts with `!`).
 *
 * ```js
 * const pm = require('picomatch');
 * console.log(pm.scan('foo/bar/*.js'));
 * { isGlob: true, input: 'foo/bar/*.js', base: 'foo/bar', glob: '*.js' }
 * ```
 * @param {String} `str`
 * @param {Object} `options`
 * @return {Object} Returns an object with tokens and regex source string.
 * @api public
 */

const scan = (input, options) => {
  const opts = options || {};

  const length = input.length - 1;
  const scanToEnd = opts.parts === true || opts.scanToEnd === true;
  const slashes = [];
  const tokens = [];
  const parts = [];

  let str = input;
  let index = -1;
  let start = 0;
  let lastIndex = 0;
  let isBrace = false;
  let isBracket = false;
  let isGlob = false;
  let isExtglob = false;
  let isGlobstar = false;
  let braceEscaped = false;
  let backslashes = false;
  let negated = false;
  let finished = false;
  let braces = 0;
  let prev;
  let code;
  let token = { value: '', depth: 0, isGlob: false };

  const eos = () => index >= length;
  const peek = () => str.charCodeAt(index + 1);
  const advance = () => {
    prev = code;
    return str.charCodeAt(++index);
  };

  while (index < length) {
    code = advance();
    let next;

    if (code === CHAR_BACKWARD_SLASH) {
      backslashes = token.backslashes = true;
      code = advance();

      if (code === CHAR_LEFT_CURLY_BRACE$1) {
        braceEscaped = true;
      }
      continue;
    }

    if (braceEscaped === true || code === CHAR_LEFT_CURLY_BRACE$1) {
      braces++;

      while (eos() !== true && (code = advance())) {
        if (code === CHAR_BACKWARD_SLASH) {
          backslashes = token.backslashes = true;
          advance();
          continue;
        }

        if (code === CHAR_LEFT_CURLY_BRACE$1) {
          braces++;
          continue;
        }

        if (braceEscaped !== true && code === CHAR_DOT$1 && (code = advance()) === CHAR_DOT$1) {
          isBrace = token.isBrace = true;
          isGlob = token.isGlob = true;
          finished = true;

          if (scanToEnd === true) {
            continue;
          }

          break;
        }

        if (braceEscaped !== true && code === CHAR_COMMA$1) {
          isBrace = token.isBrace = true;
          isGlob = token.isGlob = true;
          finished = true;

          if (scanToEnd === true) {
            continue;
          }

          break;
        }

        if (code === CHAR_RIGHT_CURLY_BRACE$1) {
          braces--;

          if (braces === 0) {
            braceEscaped = false;
            isBrace = token.isBrace = true;
            finished = true;
            break;
          }
        }
      }

      if (scanToEnd === true) {
        continue;
      }

      break;
    }

    if (code === CHAR_FORWARD_SLASH) {
      slashes.push(index);
      tokens.push(token);
      token = { value: '', depth: 0, isGlob: false };

      if (finished === true) continue;
      if (prev === CHAR_DOT$1 && index === (start + 1)) {
        start += 2;
        continue;
      }

      lastIndex = index + 1;
      continue;
    }

    if (opts.noext !== true) {
      const isExtglobChar = code === CHAR_PLUS
        || code === CHAR_AT
        || code === CHAR_ASTERISK
        || code === CHAR_QUESTION_MARK
        || code === CHAR_EXCLAMATION_MARK;

      if (isExtglobChar === true && peek() === CHAR_LEFT_PARENTHESES$1) {
        isGlob = token.isGlob = true;
        isExtglob = token.isExtglob = true;
        finished = true;

        if (scanToEnd === true) {
          while (eos() !== true && (code = advance())) {
            if (code === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = true;
              code = advance();
              continue;
            }

            if (code === CHAR_RIGHT_PARENTHESES$1) {
              isGlob = token.isGlob = true;
              finished = true;
              break;
            }
          }
          continue;
        }
        break;
      }
    }

    if (code === CHAR_ASTERISK) {
      if (prev === CHAR_ASTERISK) isGlobstar = token.isGlobstar = true;
      isGlob = token.isGlob = true;
      finished = true;

      if (scanToEnd === true) {
        continue;
      }
      break;
    }

    if (code === CHAR_QUESTION_MARK) {
      isGlob = token.isGlob = true;
      finished = true;

      if (scanToEnd === true) {
        continue;
      }
      break;
    }

    if (code === CHAR_LEFT_SQUARE_BRACKET$1) {
      while (eos() !== true && (next = advance())) {
        if (next === CHAR_BACKWARD_SLASH) {
          backslashes = token.backslashes = true;
          advance();
          continue;
        }

        if (next === CHAR_RIGHT_SQUARE_BRACKET$1) {
          isBracket = token.isBracket = true;
          isGlob = token.isGlob = true;
          finished = true;

          if (scanToEnd === true) {
            continue;
          }
          break;
        }
      }
    }

    if (opts.nonegate !== true && code === CHAR_EXCLAMATION_MARK && index === start) {
      negated = token.negated = true;
      start++;
      continue;
    }

    if (opts.noparen !== true && code === CHAR_LEFT_PARENTHESES$1) {
      isGlob = token.isGlob = true;

      if (scanToEnd === true) {
        while (eos() !== true && (code = advance())) {
          if (code === CHAR_LEFT_PARENTHESES$1) {
            backslashes = token.backslashes = true;
            code = advance();
            continue;
          }

          if (code === CHAR_RIGHT_PARENTHESES$1) {
            finished = true;
            break;
          }
        }
        continue;
      }
      break;
    }

    if (isGlob === true) {
      finished = true;

      if (scanToEnd === true) {
        continue;
      }

      break;
    }
  }

  if (opts.noext === true) {
    isExtglob = false;
    isGlob = false;
  }

  let base = str;
  let prefix = '';
  let glob = '';

  if (start > 0) {
    prefix = str.slice(0, start);
    str = str.slice(start);
    lastIndex -= start;
  }

  if (base && isGlob === true && lastIndex > 0) {
    base = str.slice(0, lastIndex);
    glob = str.slice(lastIndex);
  } else if (isGlob === true) {
    base = '';
    glob = str;
  } else {
    base = str;
  }

  if (base && base !== '' && base !== '/' && base !== str) {
    if (isPathSeparator(base.charCodeAt(base.length - 1))) {
      base = base.slice(0, -1);
    }
  }

  if (opts.unescape === true) {
    if (glob) glob = utils$1.removeBackslashes(glob);

    if (base && backslashes === true) {
      base = utils$1.removeBackslashes(base);
    }
  }

  const state = {
    prefix,
    input,
    start,
    base,
    glob,
    isBrace,
    isBracket,
    isGlob,
    isExtglob,
    isGlobstar,
    negated
  };

  if (opts.tokens === true) {
    state.maxDepth = 0;
    if (!isPathSeparator(code)) {
      tokens.push(token);
    }
    state.tokens = tokens;
  }

  if (opts.parts === true || opts.tokens === true) {
    let prevIndex;

    for (let idx = 0; idx < slashes.length; idx++) {
      const n = prevIndex ? prevIndex + 1 : start;
      const i = slashes[idx];
      const value = input.slice(n, i);
      if (opts.tokens) {
        if (idx === 0 && start !== 0) {
          tokens[idx].isPrefix = true;
          tokens[idx].value = prefix;
        } else {
          tokens[idx].value = value;
        }
        depth(tokens[idx]);
        state.maxDepth += tokens[idx].depth;
      }
      if (idx !== 0 || value !== '') {
        parts.push(value);
      }
      prevIndex = i;
    }

    if (prevIndex && prevIndex + 1 < input.length) {
      const value = input.slice(prevIndex + 1);
      parts.push(value);

      if (opts.tokens) {
        tokens[tokens.length - 1].value = value;
        depth(tokens[tokens.length - 1]);
        state.maxDepth += tokens[tokens.length - 1].depth;
      }
    }

    state.slashes = slashes;
    state.parts = parts;
  }

  return state;
};

var scan_1 = scan;

/**
 * Constants
 */

const {
  MAX_LENGTH: MAX_LENGTH$1,
  POSIX_REGEX_SOURCE: POSIX_REGEX_SOURCE$1,
  REGEX_NON_SPECIAL_CHARS,
  REGEX_SPECIAL_CHARS_BACKREF,
  REPLACEMENTS
} = constants$1;

/**
 * Helpers
 */

const expandRange = (args, options) => {
  if (typeof options.expandRange === 'function') {
    return options.expandRange(...args, options);
  }

  args.sort();
  const value = `[${args.join('-')}]`;

  try {
    /* eslint-disable-next-line no-new */
    new RegExp(value);
  } catch (ex) {
    return args.map(v => utils$1.escapeRegex(v)).join('..');
  }

  return value;
};

/**
 * Create the message for a syntax error
 */

const syntaxError = (type, char) => {
  return `Missing ${type}: "${char}" - use "\\\\${char}" to match literal characters`;
};

/**
 * Parse the given input string.
 * @param {String} input
 * @param {Object} options
 * @return {Object}
 */

const parse$1 = (input, options) => {
  if (typeof input !== 'string') {
    throw new TypeError('Expected a string');
  }

  input = REPLACEMENTS[input] || input;

  const opts = { ...options };
  const max = typeof opts.maxLength === 'number' ? Math.min(MAX_LENGTH$1, opts.maxLength) : MAX_LENGTH$1;

  let len = input.length;
  if (len > max) {
    throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
  }

  const bos = { type: 'bos', value: '', output: opts.prepend || '' };
  const tokens = [bos];

  const capture = opts.capture ? '' : '?:';
  const win32 = utils$1.isWindows(options);

  // create constants based on platform, for windows or posix
  const PLATFORM_CHARS = constants$1.globChars(win32);
  const EXTGLOB_CHARS = constants$1.extglobChars(PLATFORM_CHARS);

  const {
    DOT_LITERAL,
    PLUS_LITERAL,
    SLASH_LITERAL,
    ONE_CHAR,
    DOTS_SLASH,
    NO_DOT,
    NO_DOT_SLASH,
    NO_DOTS_SLASH,
    QMARK,
    QMARK_NO_DOT,
    STAR,
    START_ANCHOR
  } = PLATFORM_CHARS;

  const globstar = (opts) => {
    return `(${capture}(?:(?!${START_ANCHOR}${opts.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
  };

  const nodot = opts.dot ? '' : NO_DOT;
  const qmarkNoDot = opts.dot ? QMARK : QMARK_NO_DOT;
  let star = opts.bash === true ? globstar(opts) : STAR;

  if (opts.capture) {
    star = `(${star})`;
  }

  // minimatch options support
  if (typeof opts.noext === 'boolean') {
    opts.noextglob = opts.noext;
  }

  const state = {
    input,
    index: -1,
    start: 0,
    dot: opts.dot === true,
    consumed: '',
    output: '',
    prefix: '',
    backtrack: false,
    negated: false,
    brackets: 0,
    braces: 0,
    parens: 0,
    quotes: 0,
    globstar: false,
    tokens
  };

  input = utils$1.removePrefix(input, state);
  len = input.length;

  const extglobs = [];
  const braces = [];
  const stack = [];
  let prev = bos;
  let value;

  /**
   * Tokenizing helpers
   */

  const eos = () => state.index === len - 1;
  const peek = state.peek = (n = 1) => input[state.index + n];
  const advance = state.advance = () => input[++state.index];
  const remaining = () => input.slice(state.index + 1);
  const consume = (value = '', num = 0) => {
    state.consumed += value;
    state.index += num;
  };
  const append = token => {
    state.output += token.output != null ? token.output : token.value;
    consume(token.value);
  };

  const negate = () => {
    let count = 1;

    while (peek() === '!' && (peek(2) !== '(' || peek(3) === '?')) {
      advance();
      state.start++;
      count++;
    }

    if (count % 2 === 0) {
      return false;
    }

    state.negated = true;
    state.start++;
    return true;
  };

  const increment = type => {
    state[type]++;
    stack.push(type);
  };

  const decrement = type => {
    state[type]--;
    stack.pop();
  };

  /**
   * Push tokens onto the tokens array. This helper speeds up
   * tokenizing by 1) helping us avoid backtracking as much as possible,
   * and 2) helping us avoid creating extra tokens when consecutive
   * characters are plain text. This improves performance and simplifies
   * lookbehinds.
   */

  const push = tok => {
    if (prev.type === 'globstar') {
      const isBrace = state.braces > 0 && (tok.type === 'comma' || tok.type === 'brace');
      const isExtglob = tok.extglob === true || (extglobs.length && (tok.type === 'pipe' || tok.type === 'paren'));

      if (tok.type !== 'slash' && tok.type !== 'paren' && !isBrace && !isExtglob) {
        state.output = state.output.slice(0, -prev.output.length);
        prev.type = 'star';
        prev.value = '*';
        prev.output = star;
        state.output += prev.output;
      }
    }

    if (extglobs.length && tok.type !== 'paren' && !EXTGLOB_CHARS[tok.value]) {
      extglobs[extglobs.length - 1].inner += tok.value;
    }

    if (tok.value || tok.output) append(tok);
    if (prev && prev.type === 'text' && tok.type === 'text') {
      prev.value += tok.value;
      prev.output = (prev.output || '') + tok.value;
      return;
    }

    tok.prev = prev;
    tokens.push(tok);
    prev = tok;
  };

  const extglobOpen = (type, value) => {
    const token = { ...EXTGLOB_CHARS[value], conditions: 1, inner: '' };

    token.prev = prev;
    token.parens = state.parens;
    token.output = state.output;
    const output = (opts.capture ? '(' : '') + token.open;

    increment('parens');
    push({ type, value, output: state.output ? '' : ONE_CHAR });
    push({ type: 'paren', extglob: true, value: advance(), output });
    extglobs.push(token);
  };

  const extglobClose = token => {
    let output = token.close + (opts.capture ? ')' : '');

    if (token.type === 'negate') {
      let extglobStar = star;

      if (token.inner && token.inner.length > 1 && token.inner.includes('/')) {
        extglobStar = globstar(opts);
      }

      if (extglobStar !== star || eos() || /^\)+$/.test(remaining())) {
        output = token.close = `)$))${extglobStar}`;
      }

      if (token.prev.type === 'bos' && eos()) {
        state.negatedExtglob = true;
      }
    }

    push({ type: 'paren', extglob: true, value, output });
    decrement('parens');
  };

  /**
   * Fast paths
   */

  if (opts.fastpaths !== false && !/(^[*!]|[/()[\]{}"])/.test(input)) {
    let backslashes = false;

    let output = input.replace(REGEX_SPECIAL_CHARS_BACKREF, (m, esc, chars, first, rest, index) => {
      if (first === '\\') {
        backslashes = true;
        return m;
      }

      if (first === '?') {
        if (esc) {
          return esc + first + (rest ? QMARK.repeat(rest.length) : '');
        }
        if (index === 0) {
          return qmarkNoDot + (rest ? QMARK.repeat(rest.length) : '');
        }
        return QMARK.repeat(chars.length);
      }

      if (first === '.') {
        return DOT_LITERAL.repeat(chars.length);
      }

      if (first === '*') {
        if (esc) {
          return esc + first + (rest ? star : '');
        }
        return star;
      }
      return esc ? m : `\\${m}`;
    });

    if (backslashes === true) {
      if (opts.unescape === true) {
        output = output.replace(/\\/g, '');
      } else {
        output = output.replace(/\\+/g, m => {
          return m.length % 2 === 0 ? '\\\\' : (m ? '\\' : '');
        });
      }
    }

    if (output === input && opts.contains === true) {
      state.output = input;
      return state;
    }

    state.output = utils$1.wrapOutput(output, state, options);
    return state;
  }

  /**
   * Tokenize input until we reach end-of-string
   */

  while (!eos()) {
    value = advance();

    if (value === '\u0000') {
      continue;
    }

    /**
     * Escaped characters
     */

    if (value === '\\') {
      const next = peek();

      if (next === '/' && opts.bash !== true) {
        continue;
      }

      if (next === '.' || next === ';') {
        continue;
      }

      if (!next) {
        value += '\\';
        push({ type: 'text', value });
        continue;
      }

      // collapse slashes to reduce potential for exploits
      const match = /^\\+/.exec(remaining());
      let slashes = 0;

      if (match && match[0].length > 2) {
        slashes = match[0].length;
        state.index += slashes;
        if (slashes % 2 !== 0) {
          value += '\\';
        }
      }

      if (opts.unescape === true) {
        value = advance() || '';
      } else {
        value += advance() || '';
      }

      if (state.brackets === 0) {
        push({ type: 'text', value });
        continue;
      }
    }

    /**
     * If we're inside a regex character class, continue
     * until we reach the closing bracket.
     */

    if (state.brackets > 0 && (value !== ']' || prev.value === '[' || prev.value === '[^')) {
      if (opts.posix !== false && value === ':') {
        const inner = prev.value.slice(1);
        if (inner.includes('[')) {
          prev.posix = true;

          if (inner.includes(':')) {
            const idx = prev.value.lastIndexOf('[');
            const pre = prev.value.slice(0, idx);
            const rest = prev.value.slice(idx + 2);
            const posix = POSIX_REGEX_SOURCE$1[rest];
            if (posix) {
              prev.value = pre + posix;
              state.backtrack = true;
              advance();

              if (!bos.output && tokens.indexOf(prev) === 1) {
                bos.output = ONE_CHAR;
              }
              continue;
            }
          }
        }
      }

      if ((value === '[' && peek() !== ':') || (value === '-' && peek() === ']')) {
        value = `\\${value}`;
      }

      if (value === ']' && (prev.value === '[' || prev.value === '[^')) {
        value = `\\${value}`;
      }

      if (opts.posix === true && value === '!' && prev.value === '[') {
        value = '^';
      }

      prev.value += value;
      append({ value });
      continue;
    }

    /**
     * If we're inside a quoted string, continue
     * until we reach the closing double quote.
     */

    if (state.quotes === 1 && value !== '"') {
      value = utils$1.escapeRegex(value);
      prev.value += value;
      append({ value });
      continue;
    }

    /**
     * Double quotes
     */

    if (value === '"') {
      state.quotes = state.quotes === 1 ? 0 : 1;
      if (opts.keepQuotes === true) {
        push({ type: 'text', value });
      }
      continue;
    }

    /**
     * Parentheses
     */

    if (value === '(') {
      increment('parens');
      push({ type: 'paren', value });
      continue;
    }

    if (value === ')') {
      if (state.parens === 0 && opts.strictBrackets === true) {
        throw new SyntaxError(syntaxError('opening', '('));
      }

      const extglob = extglobs[extglobs.length - 1];
      if (extglob && state.parens === extglob.parens + 1) {
        extglobClose(extglobs.pop());
        continue;
      }

      push({ type: 'paren', value, output: state.parens ? ')' : '\\)' });
      decrement('parens');
      continue;
    }

    /**
     * Square brackets
     */

    if (value === '[') {
      if (opts.nobracket === true || !remaining().includes(']')) {
        if (opts.nobracket !== true && opts.strictBrackets === true) {
          throw new SyntaxError(syntaxError('closing', ']'));
        }

        value = `\\${value}`;
      } else {
        increment('brackets');
      }

      push({ type: 'bracket', value });
      continue;
    }

    if (value === ']') {
      if (opts.nobracket === true || (prev && prev.type === 'bracket' && prev.value.length === 1)) {
        push({ type: 'text', value, output: `\\${value}` });
        continue;
      }

      if (state.brackets === 0) {
        if (opts.strictBrackets === true) {
          throw new SyntaxError(syntaxError('opening', '['));
        }

        push({ type: 'text', value, output: `\\${value}` });
        continue;
      }

      decrement('brackets');

      const prevValue = prev.value.slice(1);
      if (prev.posix !== true && prevValue[0] === '^' && !prevValue.includes('/')) {
        value = `/${value}`;
      }

      prev.value += value;
      append({ value });

      // when literal brackets are explicitly disabled
      // assume we should match with a regex character class
      if (opts.literalBrackets === false || utils$1.hasRegexChars(prevValue)) {
        continue;
      }

      const escaped = utils$1.escapeRegex(prev.value);
      state.output = state.output.slice(0, -prev.value.length);

      // when literal brackets are explicitly enabled
      // assume we should escape the brackets to match literal characters
      if (opts.literalBrackets === true) {
        state.output += escaped;
        prev.value = escaped;
        continue;
      }

      // when the user specifies nothing, try to match both
      prev.value = `(${capture}${escaped}|${prev.value})`;
      state.output += prev.value;
      continue;
    }

    /**
     * Braces
     */

    if (value === '{' && opts.nobrace !== true) {
      increment('braces');

      const open = {
        type: 'brace',
        value,
        output: '(',
        outputIndex: state.output.length,
        tokensIndex: state.tokens.length
      };

      braces.push(open);
      push(open);
      continue;
    }

    if (value === '}') {
      const brace = braces[braces.length - 1];

      if (opts.nobrace === true || !brace) {
        push({ type: 'text', value, output: value });
        continue;
      }

      let output = ')';

      if (brace.dots === true) {
        const arr = tokens.slice();
        const range = [];

        for (let i = arr.length - 1; i >= 0; i--) {
          tokens.pop();
          if (arr[i].type === 'brace') {
            break;
          }
          if (arr[i].type !== 'dots') {
            range.unshift(arr[i].value);
          }
        }

        output = expandRange(range, opts);
        state.backtrack = true;
      }

      if (brace.comma !== true && brace.dots !== true) {
        const out = state.output.slice(0, brace.outputIndex);
        const toks = state.tokens.slice(brace.tokensIndex);
        brace.value = brace.output = '\\{';
        value = output = '\\}';
        state.output = out;
        for (const t of toks) {
          state.output += (t.output || t.value);
        }
      }

      push({ type: 'brace', value, output });
      decrement('braces');
      braces.pop();
      continue;
    }

    /**
     * Pipes
     */

    if (value === '|') {
      if (extglobs.length > 0) {
        extglobs[extglobs.length - 1].conditions++;
      }
      push({ type: 'text', value });
      continue;
    }

    /**
     * Commas
     */

    if (value === ',') {
      let output = value;

      const brace = braces[braces.length - 1];
      if (brace && stack[stack.length - 1] === 'braces') {
        brace.comma = true;
        output = '|';
      }

      push({ type: 'comma', value, output });
      continue;
    }

    /**
     * Slashes
     */

    if (value === '/') {
      // if the beginning of the glob is "./", advance the start
      // to the current index, and don't add the "./" characters
      // to the state. This greatly simplifies lookbehinds when
      // checking for BOS characters like "!" and "." (not "./")
      if (prev.type === 'dot' && state.index === state.start + 1) {
        state.start = state.index + 1;
        state.consumed = '';
        state.output = '';
        tokens.pop();
        prev = bos; // reset "prev" to the first token
        continue;
      }

      push({ type: 'slash', value, output: SLASH_LITERAL });
      continue;
    }

    /**
     * Dots
     */

    if (value === '.') {
      if (state.braces > 0 && prev.type === 'dot') {
        if (prev.value === '.') prev.output = DOT_LITERAL;
        const brace = braces[braces.length - 1];
        prev.type = 'dots';
        prev.output += value;
        prev.value += value;
        brace.dots = true;
        continue;
      }

      if ((state.braces + state.parens) === 0 && prev.type !== 'bos' && prev.type !== 'slash') {
        push({ type: 'text', value, output: DOT_LITERAL });
        continue;
      }

      push({ type: 'dot', value, output: DOT_LITERAL });
      continue;
    }

    /**
     * Question marks
     */

    if (value === '?') {
      const isGroup = prev && prev.value === '(';
      if (!isGroup && opts.noextglob !== true && peek() === '(' && peek(2) !== '?') {
        extglobOpen('qmark', value);
        continue;
      }

      if (prev && prev.type === 'paren') {
        const next = peek();
        let output = value;

        if (next === '<' && !utils$1.supportsLookbehinds()) {
          throw new Error('Node.js v10 or higher is required for regex lookbehinds');
        }

        if ((prev.value === '(' && !/[!=<:]/.test(next)) || (next === '<' && !/<([!=]|\w+>)/.test(remaining()))) {
          output = `\\${value}`;
        }

        push({ type: 'text', value, output });
        continue;
      }

      if (opts.dot !== true && (prev.type === 'slash' || prev.type === 'bos')) {
        push({ type: 'qmark', value, output: QMARK_NO_DOT });
        continue;
      }

      push({ type: 'qmark', value, output: QMARK });
      continue;
    }

    /**
     * Exclamation
     */

    if (value === '!') {
      if (opts.noextglob !== true && peek() === '(') {
        if (peek(2) !== '?' || !/[!=<:]/.test(peek(3))) {
          extglobOpen('negate', value);
          continue;
        }
      }

      if (opts.nonegate !== true && state.index === 0) {
        negate();
        continue;
      }
    }

    /**
     * Plus
     */

    if (value === '+') {
      if (opts.noextglob !== true && peek() === '(' && peek(2) !== '?') {
        extglobOpen('plus', value);
        continue;
      }

      if ((prev && prev.value === '(') || opts.regex === false) {
        push({ type: 'plus', value, output: PLUS_LITERAL });
        continue;
      }

      if ((prev && (prev.type === 'bracket' || prev.type === 'paren' || prev.type === 'brace')) || state.parens > 0) {
        push({ type: 'plus', value });
        continue;
      }

      push({ type: 'plus', value: PLUS_LITERAL });
      continue;
    }

    /**
     * Plain text
     */

    if (value === '@') {
      if (opts.noextglob !== true && peek() === '(' && peek(2) !== '?') {
        push({ type: 'at', extglob: true, value, output: '' });
        continue;
      }

      push({ type: 'text', value });
      continue;
    }

    /**
     * Plain text
     */

    if (value !== '*') {
      if (value === '$' || value === '^') {
        value = `\\${value}`;
      }

      const match = REGEX_NON_SPECIAL_CHARS.exec(remaining());
      if (match) {
        value += match[0];
        state.index += match[0].length;
      }

      push({ type: 'text', value });
      continue;
    }

    /**
     * Stars
     */

    if (prev && (prev.type === 'globstar' || prev.star === true)) {
      prev.type = 'star';
      prev.star = true;
      prev.value += value;
      prev.output = star;
      state.backtrack = true;
      state.globstar = true;
      consume(value);
      continue;
    }

    let rest = remaining();
    if (opts.noextglob !== true && /^\([^?]/.test(rest)) {
      extglobOpen('star', value);
      continue;
    }

    if (prev.type === 'star') {
      if (opts.noglobstar === true) {
        consume(value);
        continue;
      }

      const prior = prev.prev;
      const before = prior.prev;
      const isStart = prior.type === 'slash' || prior.type === 'bos';
      const afterStar = before && (before.type === 'star' || before.type === 'globstar');

      if (opts.bash === true && (!isStart || (rest[0] && rest[0] !== '/'))) {
        push({ type: 'star', value, output: '' });
        continue;
      }

      const isBrace = state.braces > 0 && (prior.type === 'comma' || prior.type === 'brace');
      const isExtglob = extglobs.length && (prior.type === 'pipe' || prior.type === 'paren');
      if (!isStart && prior.type !== 'paren' && !isBrace && !isExtglob) {
        push({ type: 'star', value, output: '' });
        continue;
      }

      // strip consecutive `/**/`
      while (rest.slice(0, 3) === '/**') {
        const after = input[state.index + 4];
        if (after && after !== '/') {
          break;
        }
        rest = rest.slice(3);
        consume('/**', 3);
      }

      if (prior.type === 'bos' && eos()) {
        prev.type = 'globstar';
        prev.value += value;
        prev.output = globstar(opts);
        state.output = prev.output;
        state.globstar = true;
        consume(value);
        continue;
      }

      if (prior.type === 'slash' && prior.prev.type !== 'bos' && !afterStar && eos()) {
        state.output = state.output.slice(0, -(prior.output + prev.output).length);
        prior.output = `(?:${prior.output}`;

        prev.type = 'globstar';
        prev.output = globstar(opts) + (opts.strictSlashes ? ')' : '|$)');
        prev.value += value;
        state.globstar = true;
        state.output += prior.output + prev.output;
        consume(value);
        continue;
      }

      if (prior.type === 'slash' && prior.prev.type !== 'bos' && rest[0] === '/') {
        const end = rest[1] !== void 0 ? '|$' : '';

        state.output = state.output.slice(0, -(prior.output + prev.output).length);
        prior.output = `(?:${prior.output}`;

        prev.type = 'globstar';
        prev.output = `${globstar(opts)}${SLASH_LITERAL}|${SLASH_LITERAL}${end})`;
        prev.value += value;

        state.output += prior.output + prev.output;
        state.globstar = true;

        consume(value + advance());

        push({ type: 'slash', value: '/', output: '' });
        continue;
      }

      if (prior.type === 'bos' && rest[0] === '/') {
        prev.type = 'globstar';
        prev.value += value;
        prev.output = `(?:^|${SLASH_LITERAL}|${globstar(opts)}${SLASH_LITERAL})`;
        state.output = prev.output;
        state.globstar = true;
        consume(value + advance());
        push({ type: 'slash', value: '/', output: '' });
        continue;
      }

      // remove single star from output
      state.output = state.output.slice(0, -prev.output.length);

      // reset previous token to globstar
      prev.type = 'globstar';
      prev.output = globstar(opts);
      prev.value += value;

      // reset output with globstar
      state.output += prev.output;
      state.globstar = true;
      consume(value);
      continue;
    }

    const token = { type: 'star', value, output: star };

    if (opts.bash === true) {
      token.output = '.*?';
      if (prev.type === 'bos' || prev.type === 'slash') {
        token.output = nodot + token.output;
      }
      push(token);
      continue;
    }

    if (prev && (prev.type === 'bracket' || prev.type === 'paren') && opts.regex === true) {
      token.output = value;
      push(token);
      continue;
    }

    if (state.index === state.start || prev.type === 'slash' || prev.type === 'dot') {
      if (prev.type === 'dot') {
        state.output += NO_DOT_SLASH;
        prev.output += NO_DOT_SLASH;

      } else if (opts.dot === true) {
        state.output += NO_DOTS_SLASH;
        prev.output += NO_DOTS_SLASH;

      } else {
        state.output += nodot;
        prev.output += nodot;
      }

      if (peek() !== '*') {
        state.output += ONE_CHAR;
        prev.output += ONE_CHAR;
      }
    }

    push(token);
  }

  while (state.brackets > 0) {
    if (opts.strictBrackets === true) throw new SyntaxError(syntaxError('closing', ']'));
    state.output = utils$1.escapeLast(state.output, '[');
    decrement('brackets');
  }

  while (state.parens > 0) {
    if (opts.strictBrackets === true) throw new SyntaxError(syntaxError('closing', ')'));
    state.output = utils$1.escapeLast(state.output, '(');
    decrement('parens');
  }

  while (state.braces > 0) {
    if (opts.strictBrackets === true) throw new SyntaxError(syntaxError('closing', '}'));
    state.output = utils$1.escapeLast(state.output, '{');
    decrement('braces');
  }

  if (opts.strictSlashes !== true && (prev.type === 'star' || prev.type === 'bracket')) {
    push({ type: 'maybe_slash', value: '', output: `${SLASH_LITERAL}?` });
  }

  // rebuild the output if we had to backtrack at any point
  if (state.backtrack === true) {
    state.output = '';

    for (const token of state.tokens) {
      state.output += token.output != null ? token.output : token.value;

      if (token.suffix) {
        state.output += token.suffix;
      }
    }
  }

  return state;
};

/**
 * Fast paths for creating regular expressions for common glob patterns.
 * This can significantly speed up processing and has very little downside
 * impact when none of the fast paths match.
 */

parse$1.fastpaths = (input, options) => {
  const opts = { ...options };
  const max = typeof opts.maxLength === 'number' ? Math.min(MAX_LENGTH$1, opts.maxLength) : MAX_LENGTH$1;
  const len = input.length;
  if (len > max) {
    throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
  }

  input = REPLACEMENTS[input] || input;
  const win32 = utils$1.isWindows(options);

  // create constants based on platform, for windows or posix
  const {
    DOT_LITERAL,
    SLASH_LITERAL,
    ONE_CHAR,
    DOTS_SLASH,
    NO_DOT,
    NO_DOTS,
    NO_DOTS_SLASH,
    STAR,
    START_ANCHOR
  } = constants$1.globChars(win32);

  const nodot = opts.dot ? NO_DOTS : NO_DOT;
  const slashDot = opts.dot ? NO_DOTS_SLASH : NO_DOT;
  const capture = opts.capture ? '' : '?:';
  const state = { negated: false, prefix: '' };
  let star = opts.bash === true ? '.*?' : STAR;

  if (opts.capture) {
    star = `(${star})`;
  }

  const globstar = (opts) => {
    if (opts.noglobstar === true) return star;
    return `(${capture}(?:(?!${START_ANCHOR}${opts.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
  };

  const create = str => {
    switch (str) {
      case '*':
        return `${nodot}${ONE_CHAR}${star}`;

      case '.*':
        return `${DOT_LITERAL}${ONE_CHAR}${star}`;

      case '*.*':
        return `${nodot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;

      case '*/*':
        return `${nodot}${star}${SLASH_LITERAL}${ONE_CHAR}${slashDot}${star}`;

      case '**':
        return nodot + globstar(opts);

      case '**/*':
        return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${ONE_CHAR}${star}`;

      case '**/*.*':
        return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;

      case '**/.*':
        return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${DOT_LITERAL}${ONE_CHAR}${star}`;

      default: {
        const match = /^(.*?)\.(\w+)$/.exec(str);
        if (!match) return;

        const source = create(match[1]);
        if (!source) return;

        return source + DOT_LITERAL + match[2];
      }
    }
  };

  const output = utils$1.removePrefix(input, state);
  let source = create(output);

  if (source && opts.strictSlashes !== true) {
    source += `${SLASH_LITERAL}?`;
  }

  return source;
};

var parse_1$1 = parse$1;

const isObject$1 = val => val && typeof val === 'object' && !Array.isArray(val);

/**
 * Creates a matcher function from one or more glob patterns. The
 * returned function takes a string to match as its first argument,
 * and returns true if the string is a match. The returned matcher
 * function also takes a boolean as the second argument that, when true,
 * returns an object with additional information.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch(glob[, options]);
 *
 * const isMatch = picomatch('*.!(*a)');
 * console.log(isMatch('a.a')); //=> false
 * console.log(isMatch('a.b')); //=> true
 * ```
 * @name picomatch
 * @param {String|Array} `globs` One or more glob patterns.
 * @param {Object=} `options`
 * @return {Function=} Returns a matcher function.
 * @api public
 */

const picomatch = (glob, options, returnState = false) => {
  if (Array.isArray(glob)) {
    const fns = glob.map(input => picomatch(input, options, returnState));
    const arrayMatcher = str => {
      for (const isMatch of fns) {
        const state = isMatch(str);
        if (state) return state;
      }
      return false;
    };
    return arrayMatcher;
  }

  const isState = isObject$1(glob) && glob.tokens && glob.input;

  if (glob === '' || (typeof glob !== 'string' && !isState)) {
    throw new TypeError('Expected pattern to be a non-empty string');
  }

  const opts = options || {};
  const posix = utils$1.isWindows(options);
  const regex = isState
    ? picomatch.compileRe(glob, options)
    : picomatch.makeRe(glob, options, false, true);

  const state = regex.state;
  delete regex.state;

  let isIgnored = () => false;
  if (opts.ignore) {
    const ignoreOpts = { ...options, ignore: null, onMatch: null, onResult: null };
    isIgnored = picomatch(opts.ignore, ignoreOpts, returnState);
  }

  const matcher = (input, returnObject = false) => {
    const { isMatch, match, output } = picomatch.test(input, regex, options, { glob, posix });
    const result = { glob, state, regex, posix, input, output, match, isMatch };

    if (typeof opts.onResult === 'function') {
      opts.onResult(result);
    }

    if (isMatch === false) {
      result.isMatch = false;
      return returnObject ? result : false;
    }

    if (isIgnored(input)) {
      if (typeof opts.onIgnore === 'function') {
        opts.onIgnore(result);
      }
      result.isMatch = false;
      return returnObject ? result : false;
    }

    if (typeof opts.onMatch === 'function') {
      opts.onMatch(result);
    }
    return returnObject ? result : true;
  };

  if (returnState) {
    matcher.state = state;
  }

  return matcher;
};

/**
 * Test `input` with the given `regex`. This is used by the main
 * `picomatch()` function to test the input string.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch.test(input, regex[, options]);
 *
 * console.log(picomatch.test('foo/bar', /^(?:([^/]*?)\/([^/]*?))$/));
 * // { isMatch: true, match: [ 'foo/', 'foo', 'bar' ], output: 'foo/bar' }
 * ```
 * @param {String} `input` String to test.
 * @param {RegExp} `regex`
 * @return {Object} Returns an object with matching info.
 * @api public
 */

picomatch.test = (input, regex, options, { glob, posix } = {}) => {
  if (typeof input !== 'string') {
    throw new TypeError('Expected input to be a string');
  }

  if (input === '') {
    return { isMatch: false, output: '' };
  }

  const opts = options || {};
  const format = opts.format || (posix ? utils$1.toPosixSlashes : null);
  let match = input === glob;
  let output = (match && format) ? format(input) : input;

  if (match === false) {
    output = format ? format(input) : input;
    match = output === glob;
  }

  if (match === false || opts.capture === true) {
    if (opts.matchBase === true || opts.basename === true) {
      match = picomatch.matchBase(input, regex, options, posix);
    } else {
      match = regex.exec(output);
    }
  }

  return { isMatch: Boolean(match), match, output };
};

/**
 * Match the basename of a filepath.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch.matchBase(input, glob[, options]);
 * console.log(picomatch.matchBase('foo/bar.js', '*.js'); // true
 * ```
 * @param {String} `input` String to test.
 * @param {RegExp|String} `glob` Glob pattern or regex created by [.makeRe](#makeRe).
 * @return {Boolean}
 * @api public
 */

picomatch.matchBase = (input, glob, options, posix = utils$1.isWindows(options)) => {
  const regex = glob instanceof RegExp ? glob : picomatch.makeRe(glob, options);
  return regex.test(path__default.basename(input));
};

/**
 * Returns true if **any** of the given glob `patterns` match the specified `string`.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch.isMatch(string, patterns[, options]);
 *
 * console.log(picomatch.isMatch('a.a', ['b.*', '*.a'])); //=> true
 * console.log(picomatch.isMatch('a.a', 'b.*')); //=> false
 * ```
 * @param {String|Array} str The string to test.
 * @param {String|Array} patterns One or more glob patterns to use for matching.
 * @param {Object} [options] See available [options](#options).
 * @return {Boolean} Returns true if any patterns match `str`
 * @api public
 */

picomatch.isMatch = (str, patterns, options) => picomatch(patterns, options)(str);

/**
 * Parse a glob pattern to create the source string for a regular
 * expression.
 *
 * ```js
 * const picomatch = require('picomatch');
 * const result = picomatch.parse(pattern[, options]);
 * ```
 * @param {String} `pattern`
 * @param {Object} `options`
 * @return {Object} Returns an object with useful properties and output to be used as a regex source string.
 * @api public
 */

picomatch.parse = (pattern, options) => {
  if (Array.isArray(pattern)) return pattern.map(p => picomatch.parse(p, options));
  return parse_1$1(pattern, { ...options, fastpaths: false });
};

/**
 * Scan a glob pattern to separate the pattern into segments.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch.scan(input[, options]);
 *
 * const result = picomatch.scan('!./foo/*.js');
 * console.log(result);
 * { prefix: '!./',
 *   input: '!./foo/*.js',
 *   start: 3,
 *   base: 'foo',
 *   glob: '*.js',
 *   isBrace: false,
 *   isBracket: false,
 *   isGlob: true,
 *   isExtglob: false,
 *   isGlobstar: false,
 *   negated: true }
 * ```
 * @param {String} `input` Glob pattern to scan.
 * @param {Object} `options`
 * @return {Object} Returns an object with
 * @api public
 */

picomatch.scan = (input, options) => scan_1(input, options);

/**
 * Create a regular expression from a parsed glob pattern.
 *
 * ```js
 * const picomatch = require('picomatch');
 * const state = picomatch.parse('*.js');
 * // picomatch.compileRe(state[, options]);
 *
 * console.log(picomatch.compileRe(state));
 * //=> /^(?:(?!\.)(?=.)[^/]*?\.js)$/
 * ```
 * @param {String} `state` The object returned from the `.parse` method.
 * @param {Object} `options`
 * @return {RegExp} Returns a regex created from the given pattern.
 * @api public
 */

picomatch.compileRe = (parsed, options, returnOutput = false, returnState = false) => {
  if (returnOutput === true) {
    return parsed.output;
  }

  const opts = options || {};
  const prepend = opts.contains ? '' : '^';
  const append = opts.contains ? '' : '$';

  let source = `${prepend}(?:${parsed.output})${append}`;
  if (parsed && parsed.negated === true) {
    source = `^(?!${source}).*$`;
  }

  const regex = picomatch.toRegex(source, options);
  if (returnState === true) {
    regex.state = parsed;
  }

  return regex;
};

picomatch.makeRe = (input, options, returnOutput = false, returnState = false) => {
  if (!input || typeof input !== 'string') {
    throw new TypeError('Expected a non-empty string');
  }

  const opts = options || {};
  let parsed = { negated: false, fastpaths: true };
  let prefix = '';
  let output;

  if (input.startsWith('./')) {
    input = input.slice(2);
    prefix = parsed.prefix = './';
  }

  if (opts.fastpaths !== false && (input[0] === '.' || input[0] === '*')) {
    output = parse_1$1.fastpaths(input, options);
  }

  if (output === undefined) {
    parsed = parse_1$1(input, options);
    parsed.prefix = prefix + (parsed.prefix || '');
  } else {
    parsed.output = output;
  }

  return picomatch.compileRe(parsed, options, returnOutput, returnState);
};

/**
 * Create a regular expression from the given regex source string.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch.toRegex(source[, options]);
 *
 * const { output } = picomatch.parse('*.js');
 * console.log(picomatch.toRegex(output));
 * //=> /^(?:(?!\.)(?=.)[^/]*?\.js)$/
 * ```
 * @param {String} `source` Regular expression source string.
 * @param {Object} `options`
 * @return {RegExp}
 * @api public
 */

picomatch.toRegex = (source, options) => {
  try {
    const opts = options || {};
    return new RegExp(source, opts.flags || (opts.nocase ? 'i' : ''));
  } catch (err) {
    if (options && options.debug === true) throw err;
    return /$^/;
  }
};

/**
 * Picomatch constants.
 * @return {Object}
 */

picomatch.constants = constants$1;

/**
 * Expose "picomatch"
 */

var picomatch_1 = picomatch;

var picomatch$1 = picomatch_1;

const isEmptyString = val => typeof val === 'string' && (val === '' || val === './');

/**
 * Returns an array of strings that match one or more glob patterns.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm(list, patterns[, options]);
 *
 * console.log(mm(['a.js', 'a.txt'], ['*.js']));
 * //=> [ 'a.js' ]
 * ```
 * @param {String|Array<string>} list List of strings to match.
 * @param {String|Array<string>} patterns One or more glob patterns to use for matching.
 * @param {Object} options See available [options](#options)
 * @return {Array} Returns an array of matches
 * @summary false
 * @api public
 */

const micromatch = (list, patterns, options) => {
  patterns = [].concat(patterns);
  list = [].concat(list);

  let omit = new Set();
  let keep = new Set();
  let items = new Set();
  let negatives = 0;

  let onResult = state => {
    items.add(state.output);
    if (options && options.onResult) {
      options.onResult(state);
    }
  };

  for (let i = 0; i < patterns.length; i++) {
    let isMatch = picomatch$1(String(patterns[i]), { ...options, onResult }, true);
    let negated = isMatch.state.negated || isMatch.state.negatedExtglob;
    if (negated) negatives++;

    for (let item of list) {
      let matched = isMatch(item, true);

      let match = negated ? !matched.isMatch : matched.isMatch;
      if (!match) continue;

      if (negated) {
        omit.add(matched.output);
      } else {
        omit.delete(matched.output);
        keep.add(matched.output);
      }
    }
  }

  let result = negatives === patterns.length ? [...items] : [...keep];
  let matches = result.filter(item => !omit.has(item));

  if (options && matches.length === 0) {
    if (options.failglob === true) {
      throw new Error(`No matches found for "${patterns.join(', ')}"`);
    }

    if (options.nonull === true || options.nullglob === true) {
      return options.unescape ? patterns.map(p => p.replace(/\\/g, '')) : patterns;
    }
  }

  return matches;
};

/**
 * Backwards compatibility
 */

micromatch.match = micromatch;

/**
 * Returns a matcher function from the given glob `pattern` and `options`.
 * The returned function takes a string to match as its only argument and returns
 * true if the string is a match.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm.matcher(pattern[, options]);
 *
 * const isMatch = mm.matcher('*.!(*a)');
 * console.log(isMatch('a.a')); //=> false
 * console.log(isMatch('a.b')); //=> true
 * ```
 * @param {String} `pattern` Glob pattern
 * @param {Object} `options`
 * @return {Function} Returns a matcher function.
 * @api public
 */

micromatch.matcher = (pattern, options) => picomatch$1(pattern, options);

/**
 * Returns true if **any** of the given glob `patterns` match the specified `string`.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm.isMatch(string, patterns[, options]);
 *
 * console.log(mm.isMatch('a.a', ['b.*', '*.a'])); //=> true
 * console.log(mm.isMatch('a.a', 'b.*')); //=> false
 * ```
 * @param {String} str The string to test.
 * @param {String|Array} patterns One or more glob patterns to use for matching.
 * @param {Object} [options] See available [options](#options).
 * @return {Boolean} Returns true if any patterns match `str`
 * @api public
 */

micromatch.isMatch = (str, patterns, options) => picomatch$1(patterns, options)(str);

/**
 * Backwards compatibility
 */

micromatch.any = micromatch.isMatch;

/**
 * Returns a list of strings that _**do not match any**_ of the given `patterns`.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm.not(list, patterns[, options]);
 *
 * console.log(mm.not(['a.a', 'b.b', 'c.c'], '*.a'));
 * //=> ['b.b', 'c.c']
 * ```
 * @param {Array} `list` Array of strings to match.
 * @param {String|Array} `patterns` One or more glob pattern to use for matching.
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Array} Returns an array of strings that **do not match** the given patterns.
 * @api public
 */

micromatch.not = (list, patterns, options = {}) => {
  patterns = [].concat(patterns).map(String);
  let result = new Set();
  let items = [];

  let onResult = state => {
    if (options.onResult) options.onResult(state);
    items.push(state.output);
  };

  let matches = micromatch(list, patterns, { ...options, onResult });

  for (let item of items) {
    if (!matches.includes(item)) {
      result.add(item);
    }
  }
  return [...result];
};

/**
 * Returns true if the given `string` contains the given pattern. Similar
 * to [.isMatch](#isMatch) but the pattern can match any part of the string.
 *
 * ```js
 * var mm = require('micromatch');
 * // mm.contains(string, pattern[, options]);
 *
 * console.log(mm.contains('aa/bb/cc', '*b'));
 * //=> true
 * console.log(mm.contains('aa/bb/cc', '*d'));
 * //=> false
 * ```
 * @param {String} `str` The string to match.
 * @param {String|Array} `patterns` Glob pattern to use for matching.
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Boolean} Returns true if the patter matches any part of `str`.
 * @api public
 */

micromatch.contains = (str, pattern, options) => {
  if (typeof str !== 'string') {
    throw new TypeError(`Expected a string: "${util$1__default.inspect(str)}"`);
  }

  if (Array.isArray(pattern)) {
    return pattern.some(p => micromatch.contains(str, p, options));
  }

  if (typeof pattern === 'string') {
    if (isEmptyString(str) || isEmptyString(pattern)) {
      return false;
    }

    if (str.includes(pattern) || (str.startsWith('./') && str.slice(2).includes(pattern))) {
      return true;
    }
  }

  return micromatch.isMatch(str, pattern, { ...options, contains: true });
};

/**
 * Filter the keys of the given object with the given `glob` pattern
 * and `options`. Does not attempt to match nested keys. If you need this feature,
 * use [glob-object][] instead.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm.matchKeys(object, patterns[, options]);
 *
 * const obj = { aa: 'a', ab: 'b', ac: 'c' };
 * console.log(mm.matchKeys(obj, '*b'));
 * //=> { ab: 'b' }
 * ```
 * @param {Object} `object` The object with keys to filter.
 * @param {String|Array} `patterns` One or more glob patterns to use for matching.
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Object} Returns an object with only keys that match the given patterns.
 * @api public
 */

micromatch.matchKeys = (obj, patterns, options) => {
  if (!utils$1.isObject(obj)) {
    throw new TypeError('Expected the first argument to be an object');
  }
  let keys = micromatch(Object.keys(obj), patterns, options);
  let res = {};
  for (let key of keys) res[key] = obj[key];
  return res;
};

/**
 * Returns true if some of the strings in the given `list` match any of the given glob `patterns`.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm.some(list, patterns[, options]);
 *
 * console.log(mm.some(['foo.js', 'bar.js'], ['*.js', '!foo.js']));
 * // true
 * console.log(mm.some(['foo.js'], ['*.js', '!foo.js']));
 * // false
 * ```
 * @param {String|Array} `list` The string or array of strings to test. Returns as soon as the first match is found.
 * @param {String|Array} `patterns` One or more glob patterns to use for matching.
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Boolean} Returns true if any patterns match `str`
 * @api public
 */

micromatch.some = (list, patterns, options) => {
  let items = [].concat(list);

  for (let pattern of [].concat(patterns)) {
    let isMatch = picomatch$1(String(pattern), options);
    if (items.some(item => isMatch(item))) {
      return true;
    }
  }
  return false;
};

/**
 * Returns true if every string in the given `list` matches
 * any of the given glob `patterns`.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm.every(list, patterns[, options]);
 *
 * console.log(mm.every('foo.js', ['foo.js']));
 * // true
 * console.log(mm.every(['foo.js', 'bar.js'], ['*.js']));
 * // true
 * console.log(mm.every(['foo.js', 'bar.js'], ['*.js', '!foo.js']));
 * // false
 * console.log(mm.every(['foo.js'], ['*.js', '!foo.js']));
 * // false
 * ```
 * @param {String|Array} `list` The string or array of strings to test.
 * @param {String|Array} `patterns` One or more glob patterns to use for matching.
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Boolean} Returns true if any patterns match `str`
 * @api public
 */

micromatch.every = (list, patterns, options) => {
  let items = [].concat(list);

  for (let pattern of [].concat(patterns)) {
    let isMatch = picomatch$1(String(pattern), options);
    if (!items.every(item => isMatch(item))) {
      return false;
    }
  }
  return true;
};

/**
 * Returns true if **all** of the given `patterns` match
 * the specified string.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm.all(string, patterns[, options]);
 *
 * console.log(mm.all('foo.js', ['foo.js']));
 * // true
 *
 * console.log(mm.all('foo.js', ['*.js', '!foo.js']));
 * // false
 *
 * console.log(mm.all('foo.js', ['*.js', 'foo.js']));
 * // true
 *
 * console.log(mm.all('foo.js', ['*.js', 'f*', '*o*', '*o.js']));
 * // true
 * ```
 * @param {String|Array} `str` The string to test.
 * @param {String|Array} `patterns` One or more glob patterns to use for matching.
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Boolean} Returns true if any patterns match `str`
 * @api public
 */

micromatch.all = (str, patterns, options) => {
  if (typeof str !== 'string') {
    throw new TypeError(`Expected a string: "${util$1__default.inspect(str)}"`);
  }

  return [].concat(patterns).every(p => picomatch$1(p, options)(str));
};

/**
 * Returns an array of matches captured by `pattern` in `string, or `null` if the pattern did not match.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm.capture(pattern, string[, options]);
 *
 * console.log(mm.capture('test/*.js', 'test/foo.js'));
 * //=> ['foo']
 * console.log(mm.capture('test/*.js', 'foo/bar.css'));
 * //=> null
 * ```
 * @param {String} `glob` Glob pattern to use for matching.
 * @param {String} `input` String to match
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Boolean} Returns an array of captures if the input matches the glob pattern, otherwise `null`.
 * @api public
 */

micromatch.capture = (glob, input, options) => {
  let posix = utils$1.isWindows(options);
  let regex = picomatch$1.makeRe(String(glob), { ...options, capture: true });
  let match = regex.exec(posix ? utils$1.toPosixSlashes(input) : input);

  if (match) {
    return match.slice(1).map(v => v === void 0 ? '' : v);
  }
};

/**
 * Create a regular expression from the given glob `pattern`.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm.makeRe(pattern[, options]);
 *
 * console.log(mm.makeRe('*.js'));
 * //=> /^(?:(\.[\\\/])?(?!\.)(?=.)[^\/]*?\.js)$/
 * ```
 * @param {String} `pattern` A glob pattern to convert to regex.
 * @param {Object} `options`
 * @return {RegExp} Returns a regex created from the given pattern.
 * @api public
 */

micromatch.makeRe = (...args) => picomatch$1.makeRe(...args);

/**
 * Scan a glob pattern to separate the pattern into segments. Used
 * by the [split](#split) method.
 *
 * ```js
 * const mm = require('micromatch');
 * const state = mm.scan(pattern[, options]);
 * ```
 * @param {String} `pattern`
 * @param {Object} `options`
 * @return {Object} Returns an object with
 * @api public
 */

micromatch.scan = (...args) => picomatch$1.scan(...args);

/**
 * Parse a glob pattern to create the source string for a regular
 * expression.
 *
 * ```js
 * const mm = require('micromatch');
 * const state = mm(pattern[, options]);
 * ```
 * @param {String} `glob`
 * @param {Object} `options`
 * @return {Object} Returns an object with useful properties and output to be used as regex source string.
 * @api public
 */

micromatch.parse = (patterns, options) => {
  let res = [];
  for (let pattern of [].concat(patterns || [])) {
    for (let str of braces_1(String(pattern), options)) {
      res.push(picomatch$1.parse(str, options));
    }
  }
  return res;
};

/**
 * Process the given brace `pattern`.
 *
 * ```js
 * const { braces } = require('micromatch');
 * console.log(braces('foo/{a,b,c}/bar'));
 * //=> [ 'foo/(a|b|c)/bar' ]
 *
 * console.log(braces('foo/{a,b,c}/bar', { expand: true }));
 * //=> [ 'foo/a/bar', 'foo/b/bar', 'foo/c/bar' ]
 * ```
 * @param {String} `pattern` String with brace pattern to process.
 * @param {Object} `options` Any [options](#options) to change how expansion is performed. See the [braces][] library for all available options.
 * @return {Array}
 * @api public
 */

micromatch.braces = (pattern, options) => {
  if (typeof pattern !== 'string') throw new TypeError('Expected a string');
  if ((options && options.nobrace === true) || !/\{.*\}/.test(pattern)) {
    return [pattern];
  }
  return braces_1(pattern, options);
};

/**
 * Expand braces
 */

micromatch.braceExpand = (pattern, options) => {
  if (typeof pattern !== 'string') throw new TypeError('Expected a string');
  return micromatch.braces(pattern, { ...options, expand: true });
};

/**
 * Expose micromatch
 */

var micromatch_1 = micromatch;

const QUERY_METHODS = [
    'find_by',
    'first',
    'last',
    'take',
    'find',
    'find_each',
    'find_in_batches',
    'create_with',
    'distinct',
    'eager_load',
    'extending',
    'from',
    'group',
    'having',
    'includes',
    'joins',
    'left_outer_joins',
    'limit',
    'lock',
    'none',
    'offset',
    'order',
    'preload',
    'readonly',
    'references',
    'reorder',
    'reverse_order',
    'select',
    'where',
    'all',
];
var TriggerCharacter;
(function (TriggerCharacter) {
    TriggerCharacter[TriggerCharacter["dot"] = 0] = "dot";
    TriggerCharacter[TriggerCharacter["quote"] = 1] = "quote";
    TriggerCharacter[TriggerCharacter["colon"] = 2] = "colon";
})(TriggerCharacter || (TriggerCharacter = {}));
function modelQueryInterface() {
    const suggestions = [];
    QUERY_METHODS.forEach((value) => {
        const item = new vscode.CompletionItem(value);
        item.insertText = value;
        item.kind = vscode.CompletionItemKind.Method;
        suggestions.push(item);
    });
    return suggestions;
}
async function getCols(fileAbsPath, position, triggerCharacter, prefix) {
    const fileStream = fs.createReadStream(fileAbsPath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });
    const cols = [];
    for await (const lineText of rl) {
        if (/^#\s+([a-z0-9_]+)/.test(lineText)) {
            const col = /^#\s+([a-z0-9_]+)/.exec(lineText)[1];
            const name = prefix ? prefix + col : col;
            const item = new vscode.CompletionItem(name);
            item.insertText = name;
            item.kind = vscode.CompletionItemKind.Field;
            // @todo? move cusor next to quote eg. Client.where('locked' => true) :id=>
            cols.push(item);
        }
    }
    return cols;
}
async function getMethods(fileAbsPath) {
    const methods = [];
    let markAsStart = false, markAsEnd = false;
    const fileStream = fs.createReadStream(fileAbsPath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });
    for await (const lineText of rl) {
        if (/^class\s+<<\s+self/.test(lineText)) {
            markAsStart = true;
            markAsEnd = false;
        }
        if (/^private$/.test(lineText)) {
            markAsEnd = true;
        }
        if (markAsEnd)
            continue;
        if (markAsStart && PATTERNS.FUNCTION_DECLARATON.test(lineText)) {
            const func = lineText.replace(PATTERNS.FUNCTION_DECLARATON, '');
            const item = new vscode.CompletionItem(func);
            item.insertText = func;
            item.kind = vscode.CompletionItemKind.Method;
            methods.push(item);
        }
    }
    return methods;
}
class RailsCompletionItemProvider {
    // private pkgsList = new Map<string, string>();
    provideCompletionItems(document, position, token) {
        return this.provideCompletionItemsInternal(document, position, token, vscode.workspace.getConfiguration('rails', document.uri));
    }
    provideCompletionItemsInternal(document, position, token, config) {
        return new Promise(async (resolve, reject) => {
            const suggestions = [];
            const filename = document.fileName;
            const lineText = document.lineAt(position.line).text;
            const lineTillCurrentPosition = lineText.substr(0, position.character);
            console.log(`lineTillCurrentPosition:${lineTillCurrentPosition}`);
            const character = lineTillCurrentPosition[lineTillCurrentPosition.length - 1];
            // let autocompleteUnimportedPackages = config['autocompleteUnimportedPackages'] === true && !lineText.match(/^(\s)*(import|package)(\s)+/);
            if (lineText.match(/^\s*\/\//)) {
                return resolve([]);
            }
            let triggerCharacter;
            switch (character) {
                case '.':
                    triggerCharacter = TriggerCharacter.dot;
                    break;
                case '"':
                case "'":
                    triggerCharacter = TriggerCharacter.quote;
                    break;
                case ':':
                    triggerCharacter = TriggerCharacter.colon;
            }
            console.log(`triggerCharacter:${triggerCharacter}`);
            // let inString = isPositionInString(document, position);
            // if (!inString && lineTillCurrentPosition.endsWith('\"')) {
            //     return resolve([]);
            // }
            // get current word
            let position2 = new vscode.Position(position.line, position.character - 1);
            if (triggerCharacter === TriggerCharacter.dot &&
                PATTERNS.CLASS_STATIC_METHOD_CALL.test(lineTillCurrentPosition)) {
                const [, id, model] = PATTERNS.CLASS_STATIC_METHOD_CALL.exec(lineTillCurrentPosition);
                position2 = new vscode.Position(position.line, lineText.indexOf(id));
            }
            const wordAtPosition = document.getWordRangeAtPosition(position2);
            if (!wordAtPosition) {
                return resolve(null);
            }
            const word = document.getText(wordAtPosition);
            let currentWord = '';
            if (wordAtPosition &&
                wordAtPosition.start.character < position.character) {
                currentWord = word.substr(0, position.character - wordAtPosition.start.character);
            }
            if (currentWord.match(/^\d+$/)) {
                return resolve([]);
            }
            console.log(wordAtPosition, currentWord, character);
            if (triggerCharacter === TriggerCharacter.dot) {
                let info, fileType;
                try {
                    info = await definitionLocation(document, position2);
                    fileType = dectFileType(info.file);
                }
                catch (e) {
                    console.error(e);
                    reject(e);
                }
                switch (fileType) {
                    case FileType.Model: // model static methods
                        suggestions.push(...modelQueryInterface());
                        const methods = await getMethods(info.file);
                        suggestions.push(...methods);
                        const cols = await getCols(info.file, position, triggerCharacter, 'find_by_');
                        suggestions.push(...cols);
                        break;
                }
            }
            else if (triggerCharacter === TriggerCharacter.colon ||
                triggerCharacter === TriggerCharacter.quote) {
                if (PATTERNS.CLASS_STATIC_METHOD_CALL.test(lineTillCurrentPosition)) {
                    const [, id, model] = PATTERNS.CLASS_STATIC_METHOD_CALL.exec(lineTillCurrentPosition);
                    const position2 = new vscode.Position(position.line, lineText.indexOf(id));
                    let info, fileType;
                    try {
                        info = await definitionLocation(document, position2);
                        fileType = dectFileType(info.file);
                    }
                    catch (e) {
                        console.error(e);
                        reject(e);
                    }
                    switch (fileType) {
                        case FileType.Model: // model field suggestion
                            const cols = await getCols(info.file);
                            suggestions.push(...cols);
                            break;
                    }
                }
                else if (PATTERNS.RENDER_DECLARATION.test(lineTillCurrentPosition.trim()) ||
                    PATTERNS.RENDER_TO_STRING_DECLARATION.test(lineTillCurrentPosition.trim()) ||
                    PATTERNS.LAYOUT_DECLARATION.test(lineTillCurrentPosition.trim())) {
                    const matches = lineTillCurrentPosition.match(/([a-z]+)/g), id = matches.pop();
                    console.log('render type:' + id);
                    switch (id) {
                        case 'partial': // @todo if it is not controller related partial
                            {
                                const relativeFileName = vscode.workspace.asRelativePath(document.fileName), rh = new RailsHelper(document, relativeFileName, null);
                                const paths = rh.searchPaths().filter((v) => {
                                    return (v.startsWith(REL_LAYOUTS) === false &&
                                        v.startsWith(REL_VIEWS) === true);
                                });
                                console.log(`paths:${paths}`);
                                const items = await rh.generateList(paths).then((list) => {
                                    const partials = list
                                        .map((v) => path.parse(v).name.split('.')[0])
                                        .filter((v) => {
                                        return v.startsWith('_');
                                    });
                                    console.log(`partials:${partials}`);
                                    const items = partials.map((v) => {
                                        const name = v.substring(1);
                                        const item = new vscode.CompletionItem(name);
                                        item.insertText =
                                            triggerCharacter === TriggerCharacter.colon
                                                ? " '" + name + "'"
                                                : name;
                                        item.kind = vscode.CompletionItemKind.File;
                                        return item;
                                    });
                                    return items;
                                });
                                suggestions.push(...items);
                            }
                            break;
                        case 'template': // @todo if it is base application controller or helper suggest all views
                            {
                                const relativeFileName = vscode.workspace.asRelativePath(document.fileName), rh = new RailsHelper(document, relativeFileName, null);
                                const paths = rh.searchPaths().filter((v) => {
                                    return (v.startsWith(REL_LAYOUTS) === false &&
                                        v.startsWith(REL_VIEWS) === true);
                                });
                                const items = await rh.generateList(paths).then((list) => {
                                    const templates = list
                                        .map((v) => path.basename(v.substring(REL_VIEWS.length + 1).split('.')[0]))
                                        .filter((v) => path.basename(v).startsWith('_') === false);
                                    const items = templates.map((v) => {
                                        const name = v;
                                        const item = new vscode.CompletionItem(name);
                                        item.insertText =
                                            triggerCharacter === TriggerCharacter.colon
                                                ? " '" + name + "'"
                                                : name;
                                        item.kind = vscode.CompletionItemKind.File;
                                        return item;
                                    });
                                    return items;
                                });
                                suggestions.push(...items);
                                if (TriggerCharacter.quote === triggerCharacter) {
                                    const views = await findFiles(document, path.join(REL_VIEWS, '**'), REL_LAYOUTS).then((res) => {
                                        return res
                                            .filter((v) => {
                                            const p = vscode.workspace.asRelativePath(v);
                                            return (paths.some((v2) => {
                                                return !micromatch_1(p, v2);
                                            }) || path.basename(p).startsWith('_'));
                                        })
                                            .map((i) => {
                                            const name = vscode.workspace
                                                .asRelativePath(i)
                                                .substring(REL_VIEWS.length + 1)
                                                .split('.')[0], item = new vscode.CompletionItem(name);
                                            item.insertText =
                                                triggerCharacter === TriggerCharacter.colon
                                                    ? " '" + name + "'"
                                                    : name;
                                            item.kind = vscode.CompletionItemKind.File;
                                            return item;
                                        });
                                    });
                                    suggestions.push(...views);
                                }
                            }
                            break;
                        case 'layout':
                            {
                                const views = await findFiles(document, path.join(REL_LAYOUTS, '**'), null).then((res) => {
                                    return res.map((i) => {
                                        const name = vscode.workspace
                                            .asRelativePath(i)
                                            .substring(REL_LAYOUTS.length + 1)
                                            .split('.')[0], item = new vscode.CompletionItem(name);
                                        item.insertText =
                                            triggerCharacter === TriggerCharacter.colon
                                                ? " '" + name + "'"
                                                : name;
                                        item.kind = vscode.CompletionItemKind.File;
                                        return item;
                                    });
                                });
                                suggestions.push(...views);
                            }
                            break;
                    }
                }
            }
            resolve(suggestions);
        });
    }
}

const missingFilelMsg$1 = 'Missing file: ';
// const couldNotOpenMsg = 'Could Not Open file: ';
// const SYMBOL_END = '[^\\w]';
const NO_DEFINITION = 'No definition found!';
/**
 * narrow view finding path
 * @param _path parts after app/views
 * @param fileType
 * @param viewType
 * @returns promised view glob path
 */
function findViews$1(document, position, _path, fileType = '', viewType = 'partial' // partial or template
) {
    console.log(`findViews`, arguments);
    let filePath;
    const isSameDirPartial = /^[a-zA-Z0-9_-]+$/.test(_path), isViewsRelativePath = _path.indexOf('/') !== -1, ext = path.parse(_path).ext, _underscore = viewType.endsWith('partial') ? '_' : '', // viewType could be "json.partial"
    definitionInformation = {
        file: null,
        line: 0,
        column: 0,
    };
    if (isSameDirPartial) {
        const fileName = vscode.workspace.asRelativePath(document.fileName), dir = path.dirname(fileName);
        filePath = path.join(dir, `${_underscore}${_path}${fileType}.*`);
        definitionInformation.file = filePath;
    }
    else if (ext) {
        filePath = path.join(REL_VIEWS, _path);
        definitionInformation.file = filePath;
    }
    else if (isViewsRelativePath) {
        filePath = path.join(REL_VIEWS, path.dirname(_path), `${_underscore}${path.basename(_path)}${fileType}.*`);
        definitionInformation.file = filePath;
    }
    else {
        return Promise.reject('not a view');
    }
    console.log(viewType, filePath, isViewsRelativePath, isSameDirPartial);
    const promise = new Promise(definitionResolver$1(document, definitionInformation));
    return promise;
}
/**
 *
 * @returns Promise callback resolved glob path(exact path)
 */
function definitionResolver$1(document, definitionInformation, exclude = null, maxNum = null) {
    console.log(`definitionResolver`, arguments);
    return (resolve, reject) => {
        findFiles(document, vscode.workspace.asRelativePath(definitionInformation.file)).then((uris) => {
            if (!uris.length) {
                reject(missingFilelMsg$1 + definitionInformation.file);
            }
            else if (uris.length === 1) {
                definitionInformation.file = uris[0].fsPath;
                resolve(definitionInformation);
            }
            else {
                reject(NO_DEFINITION);
            }
        }, () => {
            reject(missingFilelMsg$1 + definitionInformation.file);
        });
    };
}
/**
 * interaction with provideDefinition
 * @returns Thenable<RailsDefinitionInformation>
 */
function definitionLocation$1(document, position, goConfig, token) {
    console.log(`definitionLocation`, arguments);
    const wordRange = document.getWordRangeAtPosition(position, /([A-Za-z\/0-9_-]+)(\.[A-Za-z0-9]+)*/);
    if (!wordRange) {
        return Promise.resolve(null);
    }
    const lineText = document.lineAt(position.line).text.trim();
    const lineStartToWord = document
        .getText(new vscode.Range(new vscode.Position(position.line, 0), wordRange.end))
        .trim();
    const lineStartToWordStart = document
        .getText(new vscode.Range(new vscode.Position(position.line, 0), wordRange.start))
        .trim();
    const matched = lineStartToWordStart.match(PATTERNS.RENDER_MATCH), preWord = matched && matched[matched.length - 1], viewType = preWord && !preWord.includes('render') ? preWord : 'partial';
    console.log(`viewType:${viewType}`);
    const word = document.getText(wordRange);
    console.log(word);
    // if (lineText.startsWith("/") || word.match(/^\d+.?\d+$/)) {
    //   return Promise.resolve(null);
    // }
    if (!goConfig) {
        goConfig = vscode.workspace.getConfiguration('rails');
    }
    const symbol = new RegExp('(((::)?[A-Za-z]+)*(::)?' + word + ')').exec(lineStartToWord)[1];
    if (RAILS.prefix(symbol.toLowerCase()).isProper) {
        return Promise.reject('Rails symbols');
    }
    const renderMatched = lineText.match(VIEWS_PATTERNS.RENDER_PATTERN);
    if (renderMatched) {
        console.log(renderMatched);
        return findViews$1(document, position, word, '', viewType);
    }
    else {
        return findViews$1(document, position, word, '', viewType);
    }
}
class ViewDefinitionProvider {
    constructor(goConfig) {
        this.goConfig = null;
        this.goConfig = goConfig;
    }
    provideDefinition(document, position, token) {
        return definitionLocation$1(document, position, this.goConfig, token).then((definitionInfo) => {
            if (definitionInfo === null || definitionInfo.file === null) {
                return null;
            }
            const definitionResource = vscode.Uri.file(definitionInfo.file);
            const pos = new vscode.Position(definitionInfo.line, definitionInfo.column || 0 // required here otherwise rais "Invalid arguments."
            );
            return new vscode.Location(definitionResource, pos);
        }, (err) => {
            if (err) {
                // Prompt for missing tool is located here so that the
                // prompts dont show up on hover or signature help
                if (typeof err === 'string' && err.startsWith(missingFilelMsg$1)) ;
                else {
                    return Promise.reject(NO_DEFINITION);
                }
            }
            return Promise.reject(NO_DEFINITION);
        });
    }
}

var bind = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber$2(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject$2(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject$2(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

var utils$2 = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber$2,
  isObject: isObject$2,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
var buildURL = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils$2.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils$2.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils$2.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils$2.forEach(val, function parseValue(v) {
        if (utils$2.isDate(v)) {
          v = v.toISOString();
        } else if (utils$2.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils$2.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

var InterceptorManager_1 = InterceptorManager;

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
var transformData = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils$2.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};

var isCancel = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

var normalizeHeaderName = function normalizeHeaderName(headers, normalizedName) {
  utils$2.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
var enhanceError = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
var createError = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
var settle = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};

var cookies = (
  utils$2.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils$2.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils$2.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils$2.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
var isAbsoluteURL = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
var combineURLs = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
var buildFullPath = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
var parseHeaders = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils$2.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils$2.trim(line.substr(0, i)).toLowerCase();
    val = utils$2.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};

var isURLSameOrigin = (
  utils$2.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils$2.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);

var xhr = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils$2.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils$2.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils$2.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils$2.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

var ms = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse$2(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse$2(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') ||
    plural(ms, h, 'hour') ||
    plural(ms, m, 'minute') ||
    plural(ms, s, 'second') ||
    ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}

var debug = createCommonjsModule(function (module, exports) {
/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = ms;

/**
 * Active `debug` instances.
 */
exports.instances = [];

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  var prevTime;

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);
  debug.destroy = destroy;

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  exports.instances.push(debug);

  return debug;
}

function destroy () {
  var index = exports.instances.indexOf(this);
  if (index !== -1) {
    exports.instances.splice(index, 1);
    return true;
  } else {
    return false;
  }
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var i;
  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }

  for (i = 0; i < exports.instances.length; i++) {
    var instance = exports.instances[i];
    instance.enabled = exports.enabled(instance.namespace);
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  if (name[name.length - 1] === '*') {
    return true;
  }
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}
});

var browser = createCommonjsModule(function (module, exports) {
/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = debug;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  '#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC',
  '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF',
  '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC',
  '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF',
  '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC',
  '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033',
  '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366',
  '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933',
  '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC',
  '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF',
  '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // Internet Explorer and Edge do not support colors.
  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit');

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}
});

var hasFlag = (flag, argv) => {
	argv = argv || process.argv;
	const prefix = flag.startsWith('-') ? '' : (flag.length === 1 ? '-' : '--');
	const pos = argv.indexOf(prefix + flag);
	const terminatorPos = argv.indexOf('--');
	return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
};

const env = process.env;

let forceColor;
if (hasFlag('no-color') ||
	hasFlag('no-colors') ||
	hasFlag('color=false')) {
	forceColor = false;
} else if (hasFlag('color') ||
	hasFlag('colors') ||
	hasFlag('color=true') ||
	hasFlag('color=always')) {
	forceColor = true;
}
if ('FORCE_COLOR' in env) {
	forceColor = env.FORCE_COLOR.length === 0 || parseInt(env.FORCE_COLOR, 10) !== 0;
}

function translateLevel(level) {
	if (level === 0) {
		return false;
	}

	return {
		level,
		hasBasic: true,
		has256: level >= 2,
		has16m: level >= 3
	};
}

function supportsColor(stream) {
	if (forceColor === false) {
		return 0;
	}

	if (hasFlag('color=16m') ||
		hasFlag('color=full') ||
		hasFlag('color=truecolor')) {
		return 3;
	}

	if (hasFlag('color=256')) {
		return 2;
	}

	if (stream && !stream.isTTY && forceColor !== true) {
		return 0;
	}

	const min = forceColor ? 1 : 0;

	if (process.platform === 'win32') {
		// Node.js 7.5.0 is the first version of Node.js to include a patch to
		// libuv that enables 256 color output on Windows. Anything earlier and it
		// won't work. However, here we target Node.js 8 at minimum as it is an LTS
		// release, and Node.js 7 is not. Windows 10 build 10586 is the first Windows
		// release that supports 256 colors. Windows 10 build 14931 is the first release
		// that supports 16m/TrueColor.
		const osRelease = os.release().split('.');
		if (
			Number(process.versions.node.split('.')[0]) >= 8 &&
			Number(osRelease[0]) >= 10 &&
			Number(osRelease[2]) >= 10586
		) {
			return Number(osRelease[2]) >= 14931 ? 3 : 2;
		}

		return 1;
	}

	if ('CI' in env) {
		if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI'].some(sign => sign in env) || env.CI_NAME === 'codeship') {
			return 1;
		}

		return min;
	}

	if ('TEAMCITY_VERSION' in env) {
		return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
	}

	if (env.COLORTERM === 'truecolor') {
		return 3;
	}

	if ('TERM_PROGRAM' in env) {
		const version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

		switch (env.TERM_PROGRAM) {
			case 'iTerm.app':
				return version >= 3 ? 3 : 2;
			case 'Apple_Terminal':
				return 2;
			// No default
		}
	}

	if (/-256(color)?$/i.test(env.TERM)) {
		return 2;
	}

	if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
		return 1;
	}

	if ('COLORTERM' in env) {
		return 1;
	}

	if (env.TERM === 'dumb') {
		return min;
	}

	return min;
}

function getSupportLevel(stream) {
	const level = supportsColor(stream);
	return translateLevel(level);
}

var supportsColor_1 = {
	supportsColor: getSupportLevel,
	stdout: getSupportLevel(process.stdout),
	stderr: getSupportLevel(process.stderr)
};

var node = createCommonjsModule(function (module, exports) {
/**
 * Module dependencies.
 */




/**
 * This is the Node.js implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = debug;
exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;

/**
 * Colors.
 */

exports.colors = [ 6, 2, 3, 4, 5, 1 ];

try {
  var supportsColor = supportsColor_1;
  if (supportsColor && supportsColor.level >= 2) {
    exports.colors = [
      20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68,
      69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128, 129, 134,
      135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171,
      172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204,
      205, 206, 207, 208, 209, 214, 215, 220, 221
    ];
  }
} catch (err) {
  // swallow - we only care if `supports-color` is available; it doesn't have to be.
}

/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */

exports.inspectOpts = Object.keys(process.env).filter(function (key) {
  return /^debug_/i.test(key);
}).reduce(function (obj, key) {
  // camel-case
  var prop = key
    .substring(6)
    .toLowerCase()
    .replace(/_([a-z])/g, function (_, k) { return k.toUpperCase() });

  // coerce string value into JS value
  var val = process.env[key];
  if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
  else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
  else if (val === 'null') val = null;
  else val = Number(val);

  obj[prop] = val;
  return obj;
}, {});

/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
  return 'colors' in exports.inspectOpts
    ? Boolean(exports.inspectOpts.colors)
    : tty.isatty(process.stderr.fd);
}

/**
 * Map %o to `util.inspect()`, all on a single line.
 */

exports.formatters.o = function(v) {
  this.inspectOpts.colors = this.useColors;
  return util$1__default.inspect(v, this.inspectOpts)
    .split('\n').map(function(str) {
      return str.trim()
    }).join(' ');
};

/**
 * Map %o to `util.inspect()`, allowing multiple lines if needed.
 */

exports.formatters.O = function(v) {
  this.inspectOpts.colors = this.useColors;
  return util$1__default.inspect(v, this.inspectOpts);
};

/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var name = this.namespace;
  var useColors = this.useColors;

  if (useColors) {
    var c = this.color;
    var colorCode = '\u001b[3' + (c < 8 ? c : '8;5;' + c);
    var prefix = '  ' + colorCode + ';1m' + name + ' ' + '\u001b[0m';

    args[0] = prefix + args[0].split('\n').join('\n' + prefix);
    args.push(colorCode + 'm+' + exports.humanize(this.diff) + '\u001b[0m');
  } else {
    args[0] = getDate() + name + ' ' + args[0];
  }
}

function getDate() {
  if (exports.inspectOpts.hideDate) {
    return '';
  } else {
    return new Date().toISOString() + ' ';
  }
}

/**
 * Invokes `util.format()` with the specified arguments and writes to stderr.
 */

function log() {
  return process.stderr.write(util$1__default.format.apply(util$1__default, arguments) + '\n');
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  if (null == namespaces) {
    // If you set a process.env field to null or undefined, it gets cast to the
    // string 'null' or 'undefined'. Just delete instead.
    delete process.env.DEBUG;
  } else {
    process.env.DEBUG = namespaces;
  }
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  return process.env.DEBUG;
}

/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */

function init (debug) {
  debug.inspectOpts = {};

  var keys = Object.keys(exports.inspectOpts);
  for (var i = 0; i < keys.length; i++) {
    debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
  }
}

/**
 * Enable namespaces listed in `process.env.DEBUG` initially.
 */

exports.enable(load());
});

var src = createCommonjsModule(function (module) {
/**
 * Detect Electron renderer process, which is node, but we should
 * treat as a browser.
 */

if (typeof process === 'undefined' || process.type === 'renderer') {
  module.exports = browser;
} else {
  module.exports = node;
}
});

var debug$1;
try {
  /* eslint global-require: off */
  debug$1 = src("follow-redirects");
}
catch (error) {
  debug$1 = function () { /* */ };
}
var debug_1 = debug$1;

var URL = url.URL;


var Writable = stream.Writable;



// Create handlers that pass events from native requests
var eventHandlers = Object.create(null);
["abort", "aborted", "connect", "error", "socket", "timeout"].forEach(function (event) {
  eventHandlers[event] = function (arg1, arg2, arg3) {
    this._redirectable.emit(event, arg1, arg2, arg3);
  };
});

// Error types with codes
var RedirectionError = createErrorType(
  "ERR_FR_REDIRECTION_FAILURE",
  ""
);
var TooManyRedirectsError = createErrorType(
  "ERR_FR_TOO_MANY_REDIRECTS",
  "Maximum number of redirects exceeded"
);
var MaxBodyLengthExceededError = createErrorType(
  "ERR_FR_MAX_BODY_LENGTH_EXCEEDED",
  "Request body larger than maxBodyLength limit"
);
var WriteAfterEndError = createErrorType(
  "ERR_STREAM_WRITE_AFTER_END",
  "write after end"
);

// An HTTP(S) request that can be redirected
function RedirectableRequest(options, responseCallback) {
  // Initialize the request
  Writable.call(this);
  this._sanitizeOptions(options);
  this._options = options;
  this._ended = false;
  this._ending = false;
  this._redirectCount = 0;
  this._redirects = [];
  this._requestBodyLength = 0;
  this._requestBodyBuffers = [];

  // Attach a callback if passed
  if (responseCallback) {
    this.on("response", responseCallback);
  }

  // React to responses of native requests
  var self = this;
  this._onNativeResponse = function (response) {
    self._processResponse(response);
  };

  // Perform the first request
  this._performRequest();
}
RedirectableRequest.prototype = Object.create(Writable.prototype);

// Writes buffered data to the current native request
RedirectableRequest.prototype.write = function (data, encoding, callback) {
  // Writing is not allowed if end has been called
  if (this._ending) {
    throw new WriteAfterEndError();
  }

  // Validate input and shift parameters if necessary
  if (!(typeof data === "string" || typeof data === "object" && ("length" in data))) {
    throw new TypeError("data should be a string, Buffer or Uint8Array");
  }
  if (typeof encoding === "function") {
    callback = encoding;
    encoding = null;
  }

  // Ignore empty buffers, since writing them doesn't invoke the callback
  // https://github.com/nodejs/node/issues/22066
  if (data.length === 0) {
    if (callback) {
      callback();
    }
    return;
  }
  // Only write when we don't exceed the maximum body length
  if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
    this._requestBodyLength += data.length;
    this._requestBodyBuffers.push({ data: data, encoding: encoding });
    this._currentRequest.write(data, encoding, callback);
  }
  // Error when we exceed the maximum body length
  else {
    this.emit("error", new MaxBodyLengthExceededError());
    this.abort();
  }
};

// Ends the current native request
RedirectableRequest.prototype.end = function (data, encoding, callback) {
  // Shift parameters if necessary
  if (typeof data === "function") {
    callback = data;
    data = encoding = null;
  }
  else if (typeof encoding === "function") {
    callback = encoding;
    encoding = null;
  }

  // Write data if needed and end
  if (!data) {
    this._ended = this._ending = true;
    this._currentRequest.end(null, null, callback);
  }
  else {
    var self = this;
    var currentRequest = this._currentRequest;
    this.write(data, encoding, function () {
      self._ended = true;
      currentRequest.end(null, null, callback);
    });
    this._ending = true;
  }
};

// Sets a header value on the current native request
RedirectableRequest.prototype.setHeader = function (name, value) {
  this._options.headers[name] = value;
  this._currentRequest.setHeader(name, value);
};

// Clears a header value on the current native request
RedirectableRequest.prototype.removeHeader = function (name) {
  delete this._options.headers[name];
  this._currentRequest.removeHeader(name);
};

// Global timeout for all underlying requests
RedirectableRequest.prototype.setTimeout = function (msecs, callback) {
  if (callback) {
    this.once("timeout", callback);
  }

  if (this.socket) {
    startTimer(this, msecs);
  }
  else {
    var self = this;
    this._currentRequest.once("socket", function () {
      startTimer(self, msecs);
    });
  }

  this.once("response", clearTimer);
  this.once("error", clearTimer);

  return this;
};

function startTimer(request, msecs) {
  clearTimeout(request._timeout);
  request._timeout = setTimeout(function () {
    request.emit("timeout");
  }, msecs);
}

function clearTimer() {
  clearTimeout(this._timeout);
}

// Proxy all other public ClientRequest methods
[
  "abort", "flushHeaders", "getHeader",
  "setNoDelay", "setSocketKeepAlive",
].forEach(function (method) {
  RedirectableRequest.prototype[method] = function (a, b) {
    return this._currentRequest[method](a, b);
  };
});

// Proxy all public ClientRequest properties
["aborted", "connection", "socket"].forEach(function (property) {
  Object.defineProperty(RedirectableRequest.prototype, property, {
    get: function () { return this._currentRequest[property]; },
  });
});

RedirectableRequest.prototype._sanitizeOptions = function (options) {
  // Ensure headers are always present
  if (!options.headers) {
    options.headers = {};
  }

  // Since http.request treats host as an alias of hostname,
  // but the url module interprets host as hostname plus port,
  // eliminate the host property to avoid confusion.
  if (options.host) {
    // Use hostname if set, because it has precedence
    if (!options.hostname) {
      options.hostname = options.host;
    }
    delete options.host;
  }

  // Complete the URL object when necessary
  if (!options.pathname && options.path) {
    var searchPos = options.path.indexOf("?");
    if (searchPos < 0) {
      options.pathname = options.path;
    }
    else {
      options.pathname = options.path.substring(0, searchPos);
      options.search = options.path.substring(searchPos);
    }
  }
};


// Executes the next native request (initial or redirect)
RedirectableRequest.prototype._performRequest = function () {
  // Load the native protocol
  var protocol = this._options.protocol;
  var nativeProtocol = this._options.nativeProtocols[protocol];
  if (!nativeProtocol) {
    this.emit("error", new TypeError("Unsupported protocol " + protocol));
    return;
  }

  // If specified, use the agent corresponding to the protocol
  // (HTTP and HTTPS use different types of agents)
  if (this._options.agents) {
    var scheme = protocol.substr(0, protocol.length - 1);
    this._options.agent = this._options.agents[scheme];
  }

  // Create the native request
  var request = this._currentRequest =
        nativeProtocol.request(this._options, this._onNativeResponse);
  this._currentUrl = url.format(this._options);

  // Set up event handlers
  request._redirectable = this;
  for (var event in eventHandlers) {
    /* istanbul ignore else */
    if (event) {
      request.on(event, eventHandlers[event]);
    }
  }

  // End a redirected request
  // (The first request must be ended explicitly with RedirectableRequest#end)
  if (this._isRedirect) {
    // Write the request entity and end.
    var i = 0;
    var self = this;
    var buffers = this._requestBodyBuffers;
    (function writeNext(error) {
      // Only write if this request has not been redirected yet
      /* istanbul ignore else */
      if (request === self._currentRequest) {
        // Report any write errors
        /* istanbul ignore if */
        if (error) {
          self.emit("error", error);
        }
        // Write the next buffer if there are still left
        else if (i < buffers.length) {
          var buffer = buffers[i++];
          /* istanbul ignore else */
          if (!request.finished) {
            request.write(buffer.data, buffer.encoding, writeNext);
          }
        }
        // End the request if `end` has been called on us
        else if (self._ended) {
          request.end();
        }
      }
    }());
  }
};

// Processes a response from the current native request
RedirectableRequest.prototype._processResponse = function (response) {
  // Store the redirected response
  var statusCode = response.statusCode;
  if (this._options.trackRedirects) {
    this._redirects.push({
      url: this._currentUrl,
      headers: response.headers,
      statusCode: statusCode,
    });
  }

  // RFC7231§6.4: The 3xx (Redirection) class of status code indicates
  // that further action needs to be taken by the user agent in order to
  // fulfill the request. If a Location header field is provided,
  // the user agent MAY automatically redirect its request to the URI
  // referenced by the Location field value,
  // even if the specific status code is not understood.
  var location = response.headers.location;
  if (location && this._options.followRedirects !== false &&
      statusCode >= 300 && statusCode < 400) {
    // Abort the current request
    this._currentRequest.removeAllListeners();
    this._currentRequest.on("error", noop);
    this._currentRequest.abort();
    // Discard the remainder of the response to avoid waiting for data
    response.destroy();

    // RFC7231§6.4: A client SHOULD detect and intervene
    // in cyclical redirections (i.e., "infinite" redirection loops).
    if (++this._redirectCount > this._options.maxRedirects) {
      this.emit("error", new TooManyRedirectsError());
      return;
    }

    // RFC7231§6.4: Automatic redirection needs to done with
    // care for methods not known to be safe, […]
    // RFC7231§6.4.2–3: For historical reasons, a user agent MAY change
    // the request method from POST to GET for the subsequent request.
    if ((statusCode === 301 || statusCode === 302) && this._options.method === "POST" ||
        // RFC7231§6.4.4: The 303 (See Other) status code indicates that
        // the server is redirecting the user agent to a different resource […]
        // A user agent can perform a retrieval request targeting that URI
        // (a GET or HEAD request if using HTTP) […]
        (statusCode === 303) && !/^(?:GET|HEAD)$/.test(this._options.method)) {
      this._options.method = "GET";
      // Drop a possible entity and headers related to it
      this._requestBodyBuffers = [];
      removeMatchingHeaders(/^content-/i, this._options.headers);
    }

    // Drop the Host header, as the redirect might lead to a different host
    var previousHostName = removeMatchingHeaders(/^host$/i, this._options.headers) ||
      url.parse(this._currentUrl).hostname;

    // Create the redirected request
    var redirectUrl = url.resolve(this._currentUrl, location);
    debug_1("redirecting to", redirectUrl);
    this._isRedirect = true;
    var redirectUrlParts = url.parse(redirectUrl);
    Object.assign(this._options, redirectUrlParts);

    // Drop the Authorization header if redirecting to another host
    if (redirectUrlParts.hostname !== previousHostName) {
      removeMatchingHeaders(/^authorization$/i, this._options.headers);
    }

    // Evaluate the beforeRedirect callback
    if (typeof this._options.beforeRedirect === "function") {
      var responseDetails = { headers: response.headers };
      try {
        this._options.beforeRedirect.call(null, this._options, responseDetails);
      }
      catch (err) {
        this.emit("error", err);
        return;
      }
      this._sanitizeOptions(this._options);
    }

    // Perform the redirected request
    try {
      this._performRequest();
    }
    catch (cause) {
      var error = new RedirectionError("Redirected request failed: " + cause.message);
      error.cause = cause;
      this.emit("error", error);
    }
  }
  else {
    // The response is not a redirect; return it as-is
    response.responseUrl = this._currentUrl;
    response.redirects = this._redirects;
    this.emit("response", response);

    // Clean up
    this._requestBodyBuffers = [];
  }
};

// Wraps the key/value object of protocols with redirect functionality
function wrap(protocols) {
  // Default settings
  var exports = {
    maxRedirects: 21,
    maxBodyLength: 10 * 1024 * 1024,
  };

  // Wrap each protocol
  var nativeProtocols = {};
  Object.keys(protocols).forEach(function (scheme) {
    var protocol = scheme + ":";
    var nativeProtocol = nativeProtocols[protocol] = protocols[scheme];
    var wrappedProtocol = exports[scheme] = Object.create(nativeProtocol);

    // Executes a request, following redirects
    function request(input, options, callback) {
      // Parse parameters
      if (typeof input === "string") {
        var urlStr = input;
        try {
          input = urlToOptions(new URL(urlStr));
        }
        catch (err) {
          /* istanbul ignore next */
          input = url.parse(urlStr);
        }
      }
      else if (URL && (input instanceof URL)) {
        input = urlToOptions(input);
      }
      else {
        callback = options;
        options = input;
        input = { protocol: protocol };
      }
      if (typeof options === "function") {
        callback = options;
        options = null;
      }

      // Set defaults
      options = Object.assign({
        maxRedirects: exports.maxRedirects,
        maxBodyLength: exports.maxBodyLength,
      }, input, options);
      options.nativeProtocols = nativeProtocols;

      assert.equal(options.protocol, protocol, "protocol mismatch");
      debug_1("options", options);
      return new RedirectableRequest(options, callback);
    }

    // Executes a GET request, following redirects
    function get(input, options, callback) {
      var wrappedRequest = wrappedProtocol.request(input, options, callback);
      wrappedRequest.end();
      return wrappedRequest;
    }

    // Expose the properties on the wrapped protocol
    Object.defineProperties(wrappedProtocol, {
      request: { value: request, configurable: true, enumerable: true, writable: true },
      get: { value: get, configurable: true, enumerable: true, writable: true },
    });
  });
  return exports;
}

/* istanbul ignore next */
function noop() { /* empty */ }

// from https://github.com/nodejs/node/blob/master/lib/internal/url.js
function urlToOptions(urlObject) {
  var options = {
    protocol: urlObject.protocol,
    hostname: urlObject.hostname.startsWith("[") ?
      /* istanbul ignore next */
      urlObject.hostname.slice(1, -1) :
      urlObject.hostname,
    hash: urlObject.hash,
    search: urlObject.search,
    pathname: urlObject.pathname,
    path: urlObject.pathname + urlObject.search,
    href: urlObject.href,
  };
  if (urlObject.port !== "") {
    options.port = Number(urlObject.port);
  }
  return options;
}

function removeMatchingHeaders(regex, headers) {
  var lastValue;
  for (var header in headers) {
    if (regex.test(header)) {
      lastValue = headers[header];
      delete headers[header];
    }
  }
  return lastValue;
}

function createErrorType(code, defaultMessage) {
  function CustomError(message) {
    Error.captureStackTrace(this, this.constructor);
    this.message = message || defaultMessage;
  }
  CustomError.prototype = new Error();
  CustomError.prototype.constructor = CustomError;
  CustomError.prototype.name = "Error [" + code + "]";
  CustomError.prototype.code = code;
  return CustomError;
}

// Exports
var followRedirects = wrap({ http: http, https: https });
var wrap_1 = wrap;
followRedirects.wrap = wrap_1;

var name = "axios";
var version = "0.21.1";
var description = "Promise based HTTP client for the browser and node.js";
var main = "index.js";
var scripts = {
	test: "grunt test && bundlesize",
	start: "node ./sandbox/server.js",
	build: "NODE_ENV=production grunt build",
	preversion: "npm test",
	version: "npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json",
	postversion: "git push && git push --tags",
	examples: "node ./examples/server.js",
	coveralls: "cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js",
	fix: "eslint --fix lib/**/*.js"
};
var repository = {
	type: "git",
	url: "https://github.com/axios/axios.git"
};
var keywords = [
	"xhr",
	"http",
	"ajax",
	"promise",
	"node"
];
var author = "Matt Zabriskie";
var license = "MIT";
var bugs = {
	url: "https://github.com/axios/axios/issues"
};
var homepage = "https://github.com/axios/axios";
var devDependencies = {
	bundlesize: "^0.17.0",
	coveralls: "^3.0.0",
	"es6-promise": "^4.2.4",
	grunt: "^1.0.2",
	"grunt-banner": "^0.6.0",
	"grunt-cli": "^1.2.0",
	"grunt-contrib-clean": "^1.1.0",
	"grunt-contrib-watch": "^1.0.0",
	"grunt-eslint": "^20.1.0",
	"grunt-karma": "^2.0.0",
	"grunt-mocha-test": "^0.13.3",
	"grunt-ts": "^6.0.0-beta.19",
	"grunt-webpack": "^1.0.18",
	"istanbul-instrumenter-loader": "^1.0.0",
	"jasmine-core": "^2.4.1",
	karma: "^1.3.0",
	"karma-chrome-launcher": "^2.2.0",
	"karma-coverage": "^1.1.1",
	"karma-firefox-launcher": "^1.1.0",
	"karma-jasmine": "^1.1.1",
	"karma-jasmine-ajax": "^0.1.13",
	"karma-opera-launcher": "^1.0.0",
	"karma-safari-launcher": "^1.0.0",
	"karma-sauce-launcher": "^1.2.0",
	"karma-sinon": "^1.0.5",
	"karma-sourcemap-loader": "^0.3.7",
	"karma-webpack": "^1.7.0",
	"load-grunt-tasks": "^3.5.2",
	minimist: "^1.2.0",
	mocha: "^5.2.0",
	sinon: "^4.5.0",
	typescript: "^2.8.1",
	"url-search-params": "^0.10.0",
	webpack: "^1.13.1",
	"webpack-dev-server": "^1.14.1"
};
var browser$1 = {
	"./lib/adapters/http.js": "./lib/adapters/xhr.js"
};
var jsdelivr = "dist/axios.min.js";
var unpkg = "dist/axios.min.js";
var typings = "./index.d.ts";
var dependencies = {
	"follow-redirects": "^1.10.0"
};
var bundlesize = [
	{
		path: "./dist/axios.min.js",
		threshold: "5kB"
	}
];
var _package = {
	name: name,
	version: version,
	description: description,
	main: main,
	scripts: scripts,
	repository: repository,
	keywords: keywords,
	author: author,
	license: license,
	bugs: bugs,
	homepage: homepage,
	devDependencies: devDependencies,
	browser: browser$1,
	jsdelivr: jsdelivr,
	unpkg: unpkg,
	typings: typings,
	dependencies: dependencies,
	bundlesize: bundlesize
};

var _package$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name,
  version: version,
  description: description,
  main: main,
  scripts: scripts,
  repository: repository,
  keywords: keywords,
  author: author,
  license: license,
  bugs: bugs,
  homepage: homepage,
  devDependencies: devDependencies,
  browser: browser$1,
  jsdelivr: jsdelivr,
  unpkg: unpkg,
  typings: typings,
  dependencies: dependencies,
  bundlesize: bundlesize,
  'default': _package
});

var pkg = getCjsExportFromNamespace(_package$1);

var httpFollow = followRedirects.http;
var httpsFollow = followRedirects.https;






var isHttps = /https:?/;

/**
 *
 * @param {http.ClientRequestArgs} options
 * @param {AxiosProxyConfig} proxy
 * @param {string} location
 */
function setProxy(options, proxy, location) {
  options.hostname = proxy.host;
  options.host = proxy.host;
  options.port = proxy.port;
  options.path = location;

  // Basic proxy authorization
  if (proxy.auth) {
    var base64 = Buffer.from(proxy.auth.username + ':' + proxy.auth.password, 'utf8').toString('base64');
    options.headers['Proxy-Authorization'] = 'Basic ' + base64;
  }

  // If a proxy is used, any redirects must also pass through the proxy
  options.beforeRedirect = function beforeRedirect(redirection) {
    redirection.headers.host = redirection.host;
    setProxy(redirection, proxy, redirection.href);
  };
}

/*eslint consistent-return:0*/
var http_1 = function httpAdapter(config) {
  return new Promise(function dispatchHttpRequest(resolvePromise, rejectPromise) {
    var resolve = function resolve(value) {
      resolvePromise(value);
    };
    var reject = function reject(value) {
      rejectPromise(value);
    };
    var data = config.data;
    var headers = config.headers;

    // Set User-Agent (required by some servers)
    // Only set header if it hasn't been set in config
    // See https://github.com/axios/axios/issues/69
    if (!headers['User-Agent'] && !headers['user-agent']) {
      headers['User-Agent'] = 'axios/' + pkg.version;
    }

    if (data && !utils$2.isStream(data)) {
      if (Buffer.isBuffer(data)) ; else if (utils$2.isArrayBuffer(data)) {
        data = Buffer.from(new Uint8Array(data));
      } else if (utils$2.isString(data)) {
        data = Buffer.from(data, 'utf-8');
      } else {
        return reject(createError(
          'Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream',
          config
        ));
      }

      // Add Content-Length header if data exists
      headers['Content-Length'] = data.length;
    }

    // HTTP basic authentication
    var auth = undefined;
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      auth = username + ':' + password;
    }

    // Parse url
    var fullPath = buildFullPath(config.baseURL, config.url);
    var parsed = url.parse(fullPath);
    var protocol = parsed.protocol || 'http:';

    if (!auth && parsed.auth) {
      var urlAuth = parsed.auth.split(':');
      var urlUsername = urlAuth[0] || '';
      var urlPassword = urlAuth[1] || '';
      auth = urlUsername + ':' + urlPassword;
    }

    if (auth) {
      delete headers.Authorization;
    }

    var isHttpsRequest = isHttps.test(protocol);
    var agent = isHttpsRequest ? config.httpsAgent : config.httpAgent;

    var options = {
      path: buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, ''),
      method: config.method.toUpperCase(),
      headers: headers,
      agent: agent,
      agents: { http: config.httpAgent, https: config.httpsAgent },
      auth: auth
    };

    if (config.socketPath) {
      options.socketPath = config.socketPath;
    } else {
      options.hostname = parsed.hostname;
      options.port = parsed.port;
    }

    var proxy = config.proxy;
    if (!proxy && proxy !== false) {
      var proxyEnv = protocol.slice(0, -1) + '_proxy';
      var proxyUrl = process.env[proxyEnv] || process.env[proxyEnv.toUpperCase()];
      if (proxyUrl) {
        var parsedProxyUrl = url.parse(proxyUrl);
        var noProxyEnv = process.env.no_proxy || process.env.NO_PROXY;
        var shouldProxy = true;

        if (noProxyEnv) {
          var noProxy = noProxyEnv.split(',').map(function trim(s) {
            return s.trim();
          });

          shouldProxy = !noProxy.some(function proxyMatch(proxyElement) {
            if (!proxyElement) {
              return false;
            }
            if (proxyElement === '*') {
              return true;
            }
            if (proxyElement[0] === '.' &&
                parsed.hostname.substr(parsed.hostname.length - proxyElement.length) === proxyElement) {
              return true;
            }

            return parsed.hostname === proxyElement;
          });
        }

        if (shouldProxy) {
          proxy = {
            host: parsedProxyUrl.hostname,
            port: parsedProxyUrl.port,
            protocol: parsedProxyUrl.protocol
          };

          if (parsedProxyUrl.auth) {
            var proxyUrlAuth = parsedProxyUrl.auth.split(':');
            proxy.auth = {
              username: proxyUrlAuth[0],
              password: proxyUrlAuth[1]
            };
          }
        }
      }
    }

    if (proxy) {
      options.headers.host = parsed.hostname + (parsed.port ? ':' + parsed.port : '');
      setProxy(options, proxy, protocol + '//' + parsed.hostname + (parsed.port ? ':' + parsed.port : '') + options.path);
    }

    var transport;
    var isHttpsProxy = isHttpsRequest && (proxy ? isHttps.test(proxy.protocol) : true);
    if (config.transport) {
      transport = config.transport;
    } else if (config.maxRedirects === 0) {
      transport = isHttpsProxy ? https : http;
    } else {
      if (config.maxRedirects) {
        options.maxRedirects = config.maxRedirects;
      }
      transport = isHttpsProxy ? httpsFollow : httpFollow;
    }

    if (config.maxBodyLength > -1) {
      options.maxBodyLength = config.maxBodyLength;
    }

    // Create the request
    var req = transport.request(options, function handleResponse(res) {
      if (req.aborted) return;

      // uncompress the response body transparently if required
      var stream = res;

      // return the last request in case of redirects
      var lastRequest = res.req || req;


      // if no content, is HEAD request or decompress disabled we should not decompress
      if (res.statusCode !== 204 && lastRequest.method !== 'HEAD' && config.decompress !== false) {
        switch (res.headers['content-encoding']) {
        /*eslint default-case:0*/
        case 'gzip':
        case 'compress':
        case 'deflate':
        // add the unzipper to the body stream processing pipeline
          stream = stream.pipe(zlib.createUnzip());

          // remove the content-encoding in order to not confuse downstream operations
          delete res.headers['content-encoding'];
          break;
        }
      }

      var response = {
        status: res.statusCode,
        statusText: res.statusMessage,
        headers: res.headers,
        config: config,
        request: lastRequest
      };

      if (config.responseType === 'stream') {
        response.data = stream;
        settle(resolve, reject, response);
      } else {
        var responseBuffer = [];
        stream.on('data', function handleStreamData(chunk) {
          responseBuffer.push(chunk);

          // make sure the content length is not over the maxContentLength if specified
          if (config.maxContentLength > -1 && Buffer.concat(responseBuffer).length > config.maxContentLength) {
            stream.destroy();
            reject(createError('maxContentLength size of ' + config.maxContentLength + ' exceeded',
              config, null, lastRequest));
          }
        });

        stream.on('error', function handleStreamError(err) {
          if (req.aborted) return;
          reject(enhanceError(err, config, null, lastRequest));
        });

        stream.on('end', function handleStreamEnd() {
          var responseData = Buffer.concat(responseBuffer);
          if (config.responseType !== 'arraybuffer') {
            responseData = responseData.toString(config.responseEncoding);
            if (!config.responseEncoding || config.responseEncoding === 'utf8') {
              responseData = utils$2.stripBOM(responseData);
            }
          }

          response.data = responseData;
          settle(resolve, reject, response);
        });
      }
    });

    // Handle errors
    req.on('error', function handleRequestError(err) {
      if (req.aborted && err.code !== 'ERR_FR_TOO_MANY_REDIRECTS') return;
      reject(enhanceError(err, config, null, req));
    });

    // Handle request timeout
    if (config.timeout) {
      // Sometime, the response will be very slow, and does not respond, the connect event will be block by event loop system.
      // And timer callback will be fired, and abort() will be invoked before connection, then get "socket hang up" and code ECONNRESET.
      // At this time, if we have a large number of request, nodejs will hang up some socket on background. and the number will up and up.
      // And then these socket which be hang up will devoring CPU little by little.
      // ClientRequest.setTimeout will be fired on the specify milliseconds, and can make sure that abort() will be fired after connect.
      req.setTimeout(config.timeout, function handleRequestTimeout() {
        req.abort();
        reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED', req));
      });
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (req.aborted) return;

        req.abort();
        reject(cancel);
      });
    }

    // Send the request
    if (utils$2.isStream(data)) {
      data.on('error', function handleStreamError(err) {
        reject(enhanceError(err, config, null, req));
      }).pipe(req);
    } else {
      req.end(data);
    }
  });
};

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils$2.isUndefined(headers) && utils$2.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = xhr;
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = http_1;
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils$2.isFormData(data) ||
      utils$2.isArrayBuffer(data) ||
      utils$2.isBuffer(data) ||
      utils$2.isStream(data) ||
      utils$2.isFile(data) ||
      utils$2.isBlob(data)
    ) {
      return data;
    }
    if (utils$2.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils$2.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils$2.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils$2.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils$2.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils$2.merge(DEFAULT_CONTENT_TYPE);
});

var defaults_1 = defaults;

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
var dispatchRequest = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils$2.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils$2.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults_1.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
var mergeConfig = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
  var defaultToConfig2Keys = [
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
    'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'
  ];
  var directMergeKeys = ['validateStatus'];

  function getMergedValue(target, source) {
    if (utils$2.isPlainObject(target) && utils$2.isPlainObject(source)) {
      return utils$2.merge(target, source);
    } else if (utils$2.isPlainObject(source)) {
      return utils$2.merge({}, source);
    } else if (utils$2.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  function mergeDeepProperties(prop) {
    if (!utils$2.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils$2.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }

  utils$2.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils$2.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });

  utils$2.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);

  utils$2.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils$2.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    } else if (!utils$2.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  utils$2.forEach(directMergeKeys, function merge(prop) {
    if (prop in config2) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys)
    .concat(directMergeKeys);

  var otherKeys = Object
    .keys(config1)
    .concat(Object.keys(config2))
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils$2.forEach(otherKeys, mergeDeepProperties);

  return config;
};

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager_1(),
    response: new InterceptorManager_1()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils$2.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils$2.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

var Axios_1 = Axios;

/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

var Cancel_1 = Cancel;

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel_1(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

var CancelToken_1 = CancelToken;

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
var spread = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
var isAxiosError = function isAxiosError(payload) {
  return (typeof payload === 'object') && (payload.isAxiosError === true);
};

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios_1(defaultConfig);
  var instance = bind(Axios_1.prototype.request, context);

  // Copy axios.prototype to instance
  utils$2.extend(instance, Axios_1.prototype, context);

  // Copy context to instance
  utils$2.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults_1);

// Expose Axios class to allow class inheritance
axios.Axios = Axios_1;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = Cancel_1;
axios.CancelToken = CancelToken_1;
axios.isCancel = isCancel;

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = spread;

// Expose isAxiosError
axios.isAxiosError = isAxiosError;

var axios_1 = axios;

// Allow use of default import syntax in TypeScript
var _default = axios;
axios_1.default = _default;

var axios$1 = axios_1;

// Track currently webview panel
// var currentPanel: vscode.WebviewPanel | undefined = undefined;
function injectBase(html, base) {
    const policy = `<meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src vscode-resource: http:; script-src vscode-resource: http: 'unsafe-inline' ; style-src vscode-resource: http: 'unsafe-inline';">`;
    const _base = path.dirname(base) + '/';
    // Remove any <base> elements inside <head>
    let _html = html.replace(/(<[^>/]*head[^>]*>)[\s\S]*?(<[^>/]*base[^>]*>)[\s\S]*?(<[^>]*head[^>]*>)/gim, '$1 $3');
    // Add <base> just before </head>
    _html = _html.replace(/<head>/gim, `<head><base href="${_base}">\n${policy}\n<style> body{margin:20px;}</style>`);
    return _html;
}
const CancelToken$1 = axios$1.CancelToken;
const source = CancelToken$1.source();
function showSide(symbol, html, context) {
    // const columnToShowIn = vscode.window.activeTextEditor
    //   ? vscode.window.activeTextEditor.viewColumn
    //   : undefined;
    // if (currentPanel) {
    //   // If we already have a panel, show it in the target column
    //   currentPanel.webview.html = html;
    //   currentPanel.title = `Document ${symbol}`;
    //   currentPanel.reveal(columnToShowIn);
    // } else {
    const currentPanel = vscode.window.createWebviewPanel('Document', `Document ${symbol}`, vscode.ViewColumn.Two, {
        // Enable scripts in the webview
        enableScripts: true,
        retainContextWhenHidden: true,
    });
    currentPanel.webview.html = html;
    // Reset when the current panel is closed
    // currentPanel.onDidDispose(
    //   () => {
    //     currentPanel = undefined;
    //     source.cancel('request canceled as WebviewPanel Disposed.');
    //   },
    //   null,
    //   context.subscriptions
    // );
}
function doRequest(_url, symbol) {
    const request = axios$1({
        url: _url,
        timeout: 5e3,
        cancelToken: source.token,
    })
        .then((r) => {
        if (typeof r.data === 'string') {
            const html = injectBase(r.data, _url);
            showSide(symbol, html);
        }
        else {
            const html = 'No valid response content.';
            showSide(symbol, html);
        }
    })
        .catch((err) => {
        console.error(err);
        showSide(symbol, err.toString());
    });
}
function viewDoc() {
    const document = vscode.window.activeTextEditor.document;
    const position = vscode.window.activeTextEditor.selection.active;
    const symbol = getSymbol(document, position);
    if (typeof symbol === 'undefined') {
        showSide('word range not found', "Can't find word range from your active editor selection.");
        return;
    }
    let endpoint = '';
    const lowerSymbol = symbol.toLowerCase();
    const isRailsSymbol = RAILS.prefix(lowerSymbol).prefix.length;
    const isRubySymbol = RUBY.prefix(lowerSymbol).prefix.length;
    console.log(`symbol:${lowerSymbol} isRailsSymbol:${isRailsSymbol},isRubySymbol:${isRubySymbol}`);
    if (symbol && (isRailsSymbol || isRubySymbol)) {
        endpoint = symbol.replace('::', '/');
    }
    else {
        showSide('symbol not found', `symbol:${symbol} neither ruby nor rails symbol`);
        return;
    }
    console.log(`symbol:${lowerSymbol},endpoint:${endpoint}`);
    if (endpoint === null) {
        return;
    }
    let url = '';
    if (isRailsSymbol > isRubySymbol) {
        url = `https://api.rubyonrails.org/classes/${endpoint}.html`;
    }
    else if (isRubySymbol) {
        url = `https://docs.rubydocs.org/ruby-${VERSION.replace(/\./g, '-')}/classes/${endpoint}.html`;
    }
    else {
        showSide(symbol, 'No matched symbol on extension side.');
        return;
    }
    console.log(`doc url:${url}`);
    // let info = vscode.window.showInformationMessage("Rails:Document-loading...")
    doRequest.call(this, url, symbol);
}

/*jshint node:true */

function OutputLine(parent) {
  this.__parent = parent;
  this.__character_count = 0;
  // use indent_count as a marker for this.__lines that have preserved indentation
  this.__indent_count = -1;
  this.__alignment_count = 0;
  this.__wrap_point_index = 0;
  this.__wrap_point_character_count = 0;
  this.__wrap_point_indent_count = -1;
  this.__wrap_point_alignment_count = 0;

  this.__items = [];
}

OutputLine.prototype.clone_empty = function() {
  var line = new OutputLine(this.__parent);
  line.set_indent(this.__indent_count, this.__alignment_count);
  return line;
};

OutputLine.prototype.item = function(index) {
  if (index < 0) {
    return this.__items[this.__items.length + index];
  } else {
    return this.__items[index];
  }
};

OutputLine.prototype.has_match = function(pattern) {
  for (var lastCheckedOutput = this.__items.length - 1; lastCheckedOutput >= 0; lastCheckedOutput--) {
    if (this.__items[lastCheckedOutput].match(pattern)) {
      return true;
    }
  }
  return false;
};

OutputLine.prototype.set_indent = function(indent, alignment) {
  if (this.is_empty()) {
    this.__indent_count = indent || 0;
    this.__alignment_count = alignment || 0;
    this.__character_count = this.__parent.get_indent_size(this.__indent_count, this.__alignment_count);
  }
};

OutputLine.prototype._set_wrap_point = function() {
  if (this.__parent.wrap_line_length) {
    this.__wrap_point_index = this.__items.length;
    this.__wrap_point_character_count = this.__character_count;
    this.__wrap_point_indent_count = this.__parent.next_line.__indent_count;
    this.__wrap_point_alignment_count = this.__parent.next_line.__alignment_count;
  }
};

OutputLine.prototype._should_wrap = function() {
  return this.__wrap_point_index &&
    this.__character_count > this.__parent.wrap_line_length &&
    this.__wrap_point_character_count > this.__parent.next_line.__character_count;
};

OutputLine.prototype._allow_wrap = function() {
  if (this._should_wrap()) {
    this.__parent.add_new_line();
    var next = this.__parent.current_line;
    next.set_indent(this.__wrap_point_indent_count, this.__wrap_point_alignment_count);
    next.__items = this.__items.slice(this.__wrap_point_index);
    this.__items = this.__items.slice(0, this.__wrap_point_index);

    next.__character_count += this.__character_count - this.__wrap_point_character_count;
    this.__character_count = this.__wrap_point_character_count;

    if (next.__items[0] === " ") {
      next.__items.splice(0, 1);
      next.__character_count -= 1;
    }
    return true;
  }
  return false;
};

OutputLine.prototype.is_empty = function() {
  return this.__items.length === 0;
};

OutputLine.prototype.last = function() {
  if (!this.is_empty()) {
    return this.__items[this.__items.length - 1];
  } else {
    return null;
  }
};

OutputLine.prototype.push = function(item) {
  this.__items.push(item);
  var last_newline_index = item.lastIndexOf('\n');
  if (last_newline_index !== -1) {
    this.__character_count = item.length - last_newline_index;
  } else {
    this.__character_count += item.length;
  }
};

OutputLine.prototype.pop = function() {
  var item = null;
  if (!this.is_empty()) {
    item = this.__items.pop();
    this.__character_count -= item.length;
  }
  return item;
};


OutputLine.prototype._remove_indent = function() {
  if (this.__indent_count > 0) {
    this.__indent_count -= 1;
    this.__character_count -= this.__parent.indent_size;
  }
};

OutputLine.prototype._remove_wrap_indent = function() {
  if (this.__wrap_point_indent_count > 0) {
    this.__wrap_point_indent_count -= 1;
  }
};
OutputLine.prototype.trim = function() {
  while (this.last() === ' ') {
    this.__items.pop();
    this.__character_count -= 1;
  }
};

OutputLine.prototype.toString = function() {
  var result = '';
  if (this.is_empty()) {
    if (this.__parent.indent_empty_lines) {
      result = this.__parent.get_indent_string(this.__indent_count);
    }
  } else {
    result = this.__parent.get_indent_string(this.__indent_count, this.__alignment_count);
    result += this.__items.join('');
  }
  return result;
};

function IndentStringCache(options, baseIndentString) {
  this.__cache = [''];
  this.__indent_size = options.indent_size;
  this.__indent_string = options.indent_char;
  if (!options.indent_with_tabs) {
    this.__indent_string = new Array(options.indent_size + 1).join(options.indent_char);
  }

  // Set to null to continue support for auto detection of base indent
  baseIndentString = baseIndentString || '';
  if (options.indent_level > 0) {
    baseIndentString = new Array(options.indent_level + 1).join(this.__indent_string);
  }

  this.__base_string = baseIndentString;
  this.__base_string_length = baseIndentString.length;
}

IndentStringCache.prototype.get_indent_size = function(indent, column) {
  var result = this.__base_string_length;
  column = column || 0;
  if (indent < 0) {
    result = 0;
  }
  result += indent * this.__indent_size;
  result += column;
  return result;
};

IndentStringCache.prototype.get_indent_string = function(indent_level, column) {
  var result = this.__base_string;
  column = column || 0;
  if (indent_level < 0) {
    indent_level = 0;
    result = '';
  }
  column += indent_level * this.__indent_size;
  this.__ensure_cache(column);
  result += this.__cache[column];
  return result;
};

IndentStringCache.prototype.__ensure_cache = function(column) {
  while (column >= this.__cache.length) {
    this.__add_column();
  }
};

IndentStringCache.prototype.__add_column = function() {
  var column = this.__cache.length;
  var indent = 0;
  var result = '';
  if (this.__indent_size && column >= this.__indent_size) {
    indent = Math.floor(column / this.__indent_size);
    column -= indent * this.__indent_size;
    result = new Array(indent + 1).join(this.__indent_string);
  }
  if (column) {
    result += new Array(column + 1).join(' ');
  }

  this.__cache.push(result);
};

function Output(options, baseIndentString) {
  this.__indent_cache = new IndentStringCache(options, baseIndentString);
  this.raw = false;
  this._end_with_newline = options.end_with_newline;
  this.indent_size = options.indent_size;
  this.wrap_line_length = options.wrap_line_length;
  this.indent_empty_lines = options.indent_empty_lines;
  this.__lines = [];
  this.previous_line = null;
  this.current_line = null;
  this.next_line = new OutputLine(this);
  this.space_before_token = false;
  this.non_breaking_space = false;
  this.previous_token_wrapped = false;
  // initialize
  this.__add_outputline();
}

Output.prototype.__add_outputline = function() {
  this.previous_line = this.current_line;
  this.current_line = this.next_line.clone_empty();
  this.__lines.push(this.current_line);
};

Output.prototype.get_line_number = function() {
  return this.__lines.length;
};

Output.prototype.get_indent_string = function(indent, column) {
  return this.__indent_cache.get_indent_string(indent, column);
};

Output.prototype.get_indent_size = function(indent, column) {
  return this.__indent_cache.get_indent_size(indent, column);
};

Output.prototype.is_empty = function() {
  return !this.previous_line && this.current_line.is_empty();
};

Output.prototype.add_new_line = function(force_newline) {
  // never newline at the start of file
  // otherwise, newline only if we didn't just add one or we're forced
  if (this.is_empty() ||
    (!force_newline && this.just_added_newline())) {
    return false;
  }

  // if raw output is enabled, don't print additional newlines,
  // but still return True as though you had
  if (!this.raw) {
    this.__add_outputline();
  }
  return true;
};

Output.prototype.get_code = function(eol) {
  this.trim(true);

  // handle some edge cases where the last tokens
  // has text that ends with newline(s)
  var last_item = this.current_line.pop();
  if (last_item) {
    if (last_item[last_item.length - 1] === '\n') {
      last_item = last_item.replace(/\n+$/g, '');
    }
    this.current_line.push(last_item);
  }

  if (this._end_with_newline) {
    this.__add_outputline();
  }

  var sweet_code = this.__lines.join('\n');

  if (eol !== '\n') {
    sweet_code = sweet_code.replace(/[\n]/g, eol);
  }
  return sweet_code;
};

Output.prototype.set_wrap_point = function() {
  this.current_line._set_wrap_point();
};

Output.prototype.set_indent = function(indent, alignment) {
  indent = indent || 0;
  alignment = alignment || 0;

  // Next line stores alignment values
  this.next_line.set_indent(indent, alignment);

  // Never indent your first output indent at the start of the file
  if (this.__lines.length > 1) {
    this.current_line.set_indent(indent, alignment);
    return true;
  }

  this.current_line.set_indent();
  return false;
};

Output.prototype.add_raw_token = function(token) {
  for (var x = 0; x < token.newlines; x++) {
    this.__add_outputline();
  }
  this.current_line.set_indent(-1);
  this.current_line.push(token.whitespace_before);
  this.current_line.push(token.text);
  this.space_before_token = false;
  this.non_breaking_space = false;
  this.previous_token_wrapped = false;
};

Output.prototype.add_token = function(printable_token) {
  this.__add_space_before_token();
  this.current_line.push(printable_token);
  this.space_before_token = false;
  this.non_breaking_space = false;
  this.previous_token_wrapped = this.current_line._allow_wrap();
};

Output.prototype.__add_space_before_token = function() {
  if (this.space_before_token && !this.just_added_newline()) {
    if (!this.non_breaking_space) {
      this.set_wrap_point();
    }
    this.current_line.push(' ');
  }
};

Output.prototype.remove_indent = function(index) {
  var output_length = this.__lines.length;
  while (index < output_length) {
    this.__lines[index]._remove_indent();
    index++;
  }
  this.current_line._remove_wrap_indent();
};

Output.prototype.trim = function(eat_newlines) {
  eat_newlines = (eat_newlines === undefined) ? false : eat_newlines;

  this.current_line.trim();

  while (eat_newlines && this.__lines.length > 1 &&
    this.current_line.is_empty()) {
    this.__lines.pop();
    this.current_line = this.__lines[this.__lines.length - 1];
    this.current_line.trim();
  }

  this.previous_line = this.__lines.length > 1 ?
    this.__lines[this.__lines.length - 2] : null;
};

Output.prototype.just_added_newline = function() {
  return this.current_line.is_empty();
};

Output.prototype.just_added_blankline = function() {
  return this.is_empty() ||
    (this.current_line.is_empty() && this.previous_line.is_empty());
};

Output.prototype.ensure_empty_line_above = function(starts_with, ends_with) {
  var index = this.__lines.length - 2;
  while (index >= 0) {
    var potentialEmptyLine = this.__lines[index];
    if (potentialEmptyLine.is_empty()) {
      break;
    } else if (potentialEmptyLine.item(0).indexOf(starts_with) !== 0 &&
      potentialEmptyLine.item(-1) !== ends_with) {
      this.__lines.splice(index + 1, 0, new OutputLine(this));
      this.previous_line = this.__lines[this.__lines.length - 2];
      break;
    }
    index--;
  }
};

var Output_1 = Output;

var output = {
	Output: Output_1
};

/*jshint node:true */

function Token(type, text, newlines, whitespace_before) {
  this.type = type;
  this.text = text;

  // comments_before are
  // comments that have a new line before them
  // and may or may not have a newline after
  // this is a set of comments before
  this.comments_before = null; /* inline comment*/


  // this.comments_after =  new TokenStream(); // no new line before and newline after
  this.newlines = newlines || 0;
  this.whitespace_before = whitespace_before || '';
  this.parent = null;
  this.next = null;
  this.previous = null;
  this.opened = null;
  this.closed = null;
  this.directives = null;
}


var Token_1 = Token;

var token = {
	Token: Token_1
};

var acorn = createCommonjsModule(function (module, exports) {

// acorn used char codes to squeeze the last bit of performance out
// Beautifier is okay without that, so we're using regex
// permit # (23), $ (36), and @ (64). @ is used in ES7 decorators.
// 65 through 91 are uppercase letters.
// permit _ (95).
// 97 through 123 are lowercase letters.
var baseASCIIidentifierStartChars = "\\x23\\x24\\x40\\x41-\\x5a\\x5f\\x61-\\x7a";

// inside an identifier @ is not allowed but 0-9 are.
var baseASCIIidentifierChars = "\\x24\\x30-\\x39\\x41-\\x5a\\x5f\\x61-\\x7a";

// Big ugly regular expressions that match characters in the
// whitespace, identifier, and identifier-start categories. These
// are only applied when a character is found to actually have a
// code point above 128.
var nonASCIIidentifierStartChars = "\\xaa\\xb5\\xba\\xc0-\\xd6\\xd8-\\xf6\\xf8-\\u02c1\\u02c6-\\u02d1\\u02e0-\\u02e4\\u02ec\\u02ee\\u0370-\\u0374\\u0376\\u0377\\u037a-\\u037d\\u0386\\u0388-\\u038a\\u038c\\u038e-\\u03a1\\u03a3-\\u03f5\\u03f7-\\u0481\\u048a-\\u0527\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u05d0-\\u05ea\\u05f0-\\u05f2\\u0620-\\u064a\\u066e\\u066f\\u0671-\\u06d3\\u06d5\\u06e5\\u06e6\\u06ee\\u06ef\\u06fa-\\u06fc\\u06ff\\u0710\\u0712-\\u072f\\u074d-\\u07a5\\u07b1\\u07ca-\\u07ea\\u07f4\\u07f5\\u07fa\\u0800-\\u0815\\u081a\\u0824\\u0828\\u0840-\\u0858\\u08a0\\u08a2-\\u08ac\\u0904-\\u0939\\u093d\\u0950\\u0958-\\u0961\\u0971-\\u0977\\u0979-\\u097f\\u0985-\\u098c\\u098f\\u0990\\u0993-\\u09a8\\u09aa-\\u09b0\\u09b2\\u09b6-\\u09b9\\u09bd\\u09ce\\u09dc\\u09dd\\u09df-\\u09e1\\u09f0\\u09f1\\u0a05-\\u0a0a\\u0a0f\\u0a10\\u0a13-\\u0a28\\u0a2a-\\u0a30\\u0a32\\u0a33\\u0a35\\u0a36\\u0a38\\u0a39\\u0a59-\\u0a5c\\u0a5e\\u0a72-\\u0a74\\u0a85-\\u0a8d\\u0a8f-\\u0a91\\u0a93-\\u0aa8\\u0aaa-\\u0ab0\\u0ab2\\u0ab3\\u0ab5-\\u0ab9\\u0abd\\u0ad0\\u0ae0\\u0ae1\\u0b05-\\u0b0c\\u0b0f\\u0b10\\u0b13-\\u0b28\\u0b2a-\\u0b30\\u0b32\\u0b33\\u0b35-\\u0b39\\u0b3d\\u0b5c\\u0b5d\\u0b5f-\\u0b61\\u0b71\\u0b83\\u0b85-\\u0b8a\\u0b8e-\\u0b90\\u0b92-\\u0b95\\u0b99\\u0b9a\\u0b9c\\u0b9e\\u0b9f\\u0ba3\\u0ba4\\u0ba8-\\u0baa\\u0bae-\\u0bb9\\u0bd0\\u0c05-\\u0c0c\\u0c0e-\\u0c10\\u0c12-\\u0c28\\u0c2a-\\u0c33\\u0c35-\\u0c39\\u0c3d\\u0c58\\u0c59\\u0c60\\u0c61\\u0c85-\\u0c8c\\u0c8e-\\u0c90\\u0c92-\\u0ca8\\u0caa-\\u0cb3\\u0cb5-\\u0cb9\\u0cbd\\u0cde\\u0ce0\\u0ce1\\u0cf1\\u0cf2\\u0d05-\\u0d0c\\u0d0e-\\u0d10\\u0d12-\\u0d3a\\u0d3d\\u0d4e\\u0d60\\u0d61\\u0d7a-\\u0d7f\\u0d85-\\u0d96\\u0d9a-\\u0db1\\u0db3-\\u0dbb\\u0dbd\\u0dc0-\\u0dc6\\u0e01-\\u0e30\\u0e32\\u0e33\\u0e40-\\u0e46\\u0e81\\u0e82\\u0e84\\u0e87\\u0e88\\u0e8a\\u0e8d\\u0e94-\\u0e97\\u0e99-\\u0e9f\\u0ea1-\\u0ea3\\u0ea5\\u0ea7\\u0eaa\\u0eab\\u0ead-\\u0eb0\\u0eb2\\u0eb3\\u0ebd\\u0ec0-\\u0ec4\\u0ec6\\u0edc-\\u0edf\\u0f00\\u0f40-\\u0f47\\u0f49-\\u0f6c\\u0f88-\\u0f8c\\u1000-\\u102a\\u103f\\u1050-\\u1055\\u105a-\\u105d\\u1061\\u1065\\u1066\\u106e-\\u1070\\u1075-\\u1081\\u108e\\u10a0-\\u10c5\\u10c7\\u10cd\\u10d0-\\u10fa\\u10fc-\\u1248\\u124a-\\u124d\\u1250-\\u1256\\u1258\\u125a-\\u125d\\u1260-\\u1288\\u128a-\\u128d\\u1290-\\u12b0\\u12b2-\\u12b5\\u12b8-\\u12be\\u12c0\\u12c2-\\u12c5\\u12c8-\\u12d6\\u12d8-\\u1310\\u1312-\\u1315\\u1318-\\u135a\\u1380-\\u138f\\u13a0-\\u13f4\\u1401-\\u166c\\u166f-\\u167f\\u1681-\\u169a\\u16a0-\\u16ea\\u16ee-\\u16f0\\u1700-\\u170c\\u170e-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176c\\u176e-\\u1770\\u1780-\\u17b3\\u17d7\\u17dc\\u1820-\\u1877\\u1880-\\u18a8\\u18aa\\u18b0-\\u18f5\\u1900-\\u191c\\u1950-\\u196d\\u1970-\\u1974\\u1980-\\u19ab\\u19c1-\\u19c7\\u1a00-\\u1a16\\u1a20-\\u1a54\\u1aa7\\u1b05-\\u1b33\\u1b45-\\u1b4b\\u1b83-\\u1ba0\\u1bae\\u1baf\\u1bba-\\u1be5\\u1c00-\\u1c23\\u1c4d-\\u1c4f\\u1c5a-\\u1c7d\\u1ce9-\\u1cec\\u1cee-\\u1cf1\\u1cf5\\u1cf6\\u1d00-\\u1dbf\\u1e00-\\u1f15\\u1f18-\\u1f1d\\u1f20-\\u1f45\\u1f48-\\u1f4d\\u1f50-\\u1f57\\u1f59\\u1f5b\\u1f5d\\u1f5f-\\u1f7d\\u1f80-\\u1fb4\\u1fb6-\\u1fbc\\u1fbe\\u1fc2-\\u1fc4\\u1fc6-\\u1fcc\\u1fd0-\\u1fd3\\u1fd6-\\u1fdb\\u1fe0-\\u1fec\\u1ff2-\\u1ff4\\u1ff6-\\u1ffc\\u2071\\u207f\\u2090-\\u209c\\u2102\\u2107\\u210a-\\u2113\\u2115\\u2119-\\u211d\\u2124\\u2126\\u2128\\u212a-\\u212d\\u212f-\\u2139\\u213c-\\u213f\\u2145-\\u2149\\u214e\\u2160-\\u2188\\u2c00-\\u2c2e\\u2c30-\\u2c5e\\u2c60-\\u2ce4\\u2ceb-\\u2cee\\u2cf2\\u2cf3\\u2d00-\\u2d25\\u2d27\\u2d2d\\u2d30-\\u2d67\\u2d6f\\u2d80-\\u2d96\\u2da0-\\u2da6\\u2da8-\\u2dae\\u2db0-\\u2db6\\u2db8-\\u2dbe\\u2dc0-\\u2dc6\\u2dc8-\\u2dce\\u2dd0-\\u2dd6\\u2dd8-\\u2dde\\u2e2f\\u3005-\\u3007\\u3021-\\u3029\\u3031-\\u3035\\u3038-\\u303c\\u3041-\\u3096\\u309d-\\u309f\\u30a1-\\u30fa\\u30fc-\\u30ff\\u3105-\\u312d\\u3131-\\u318e\\u31a0-\\u31ba\\u31f0-\\u31ff\\u3400-\\u4db5\\u4e00-\\u9fcc\\ua000-\\ua48c\\ua4d0-\\ua4fd\\ua500-\\ua60c\\ua610-\\ua61f\\ua62a\\ua62b\\ua640-\\ua66e\\ua67f-\\ua697\\ua6a0-\\ua6ef\\ua717-\\ua71f\\ua722-\\ua788\\ua78b-\\ua78e\\ua790-\\ua793\\ua7a0-\\ua7aa\\ua7f8-\\ua801\\ua803-\\ua805\\ua807-\\ua80a\\ua80c-\\ua822\\ua840-\\ua873\\ua882-\\ua8b3\\ua8f2-\\ua8f7\\ua8fb\\ua90a-\\ua925\\ua930-\\ua946\\ua960-\\ua97c\\ua984-\\ua9b2\\ua9cf\\uaa00-\\uaa28\\uaa40-\\uaa42\\uaa44-\\uaa4b\\uaa60-\\uaa76\\uaa7a\\uaa80-\\uaaaf\\uaab1\\uaab5\\uaab6\\uaab9-\\uaabd\\uaac0\\uaac2\\uaadb-\\uaadd\\uaae0-\\uaaea\\uaaf2-\\uaaf4\\uab01-\\uab06\\uab09-\\uab0e\\uab11-\\uab16\\uab20-\\uab26\\uab28-\\uab2e\\uabc0-\\uabe2\\uac00-\\ud7a3\\ud7b0-\\ud7c6\\ud7cb-\\ud7fb\\uf900-\\ufa6d\\ufa70-\\ufad9\\ufb00-\\ufb06\\ufb13-\\ufb17\\ufb1d\\ufb1f-\\ufb28\\ufb2a-\\ufb36\\ufb38-\\ufb3c\\ufb3e\\ufb40\\ufb41\\ufb43\\ufb44\\ufb46-\\ufbb1\\ufbd3-\\ufd3d\\ufd50-\\ufd8f\\ufd92-\\ufdc7\\ufdf0-\\ufdfb\\ufe70-\\ufe74\\ufe76-\\ufefc\\uff21-\\uff3a\\uff41-\\uff5a\\uff66-\\uffbe\\uffc2-\\uffc7\\uffca-\\uffcf\\uffd2-\\uffd7\\uffda-\\uffdc";
var nonASCIIidentifierChars = "\\u0300-\\u036f\\u0483-\\u0487\\u0591-\\u05bd\\u05bf\\u05c1\\u05c2\\u05c4\\u05c5\\u05c7\\u0610-\\u061a\\u0620-\\u0649\\u0672-\\u06d3\\u06e7-\\u06e8\\u06fb-\\u06fc\\u0730-\\u074a\\u0800-\\u0814\\u081b-\\u0823\\u0825-\\u0827\\u0829-\\u082d\\u0840-\\u0857\\u08e4-\\u08fe\\u0900-\\u0903\\u093a-\\u093c\\u093e-\\u094f\\u0951-\\u0957\\u0962-\\u0963\\u0966-\\u096f\\u0981-\\u0983\\u09bc\\u09be-\\u09c4\\u09c7\\u09c8\\u09d7\\u09df-\\u09e0\\u0a01-\\u0a03\\u0a3c\\u0a3e-\\u0a42\\u0a47\\u0a48\\u0a4b-\\u0a4d\\u0a51\\u0a66-\\u0a71\\u0a75\\u0a81-\\u0a83\\u0abc\\u0abe-\\u0ac5\\u0ac7-\\u0ac9\\u0acb-\\u0acd\\u0ae2-\\u0ae3\\u0ae6-\\u0aef\\u0b01-\\u0b03\\u0b3c\\u0b3e-\\u0b44\\u0b47\\u0b48\\u0b4b-\\u0b4d\\u0b56\\u0b57\\u0b5f-\\u0b60\\u0b66-\\u0b6f\\u0b82\\u0bbe-\\u0bc2\\u0bc6-\\u0bc8\\u0bca-\\u0bcd\\u0bd7\\u0be6-\\u0bef\\u0c01-\\u0c03\\u0c46-\\u0c48\\u0c4a-\\u0c4d\\u0c55\\u0c56\\u0c62-\\u0c63\\u0c66-\\u0c6f\\u0c82\\u0c83\\u0cbc\\u0cbe-\\u0cc4\\u0cc6-\\u0cc8\\u0cca-\\u0ccd\\u0cd5\\u0cd6\\u0ce2-\\u0ce3\\u0ce6-\\u0cef\\u0d02\\u0d03\\u0d46-\\u0d48\\u0d57\\u0d62-\\u0d63\\u0d66-\\u0d6f\\u0d82\\u0d83\\u0dca\\u0dcf-\\u0dd4\\u0dd6\\u0dd8-\\u0ddf\\u0df2\\u0df3\\u0e34-\\u0e3a\\u0e40-\\u0e45\\u0e50-\\u0e59\\u0eb4-\\u0eb9\\u0ec8-\\u0ecd\\u0ed0-\\u0ed9\\u0f18\\u0f19\\u0f20-\\u0f29\\u0f35\\u0f37\\u0f39\\u0f41-\\u0f47\\u0f71-\\u0f84\\u0f86-\\u0f87\\u0f8d-\\u0f97\\u0f99-\\u0fbc\\u0fc6\\u1000-\\u1029\\u1040-\\u1049\\u1067-\\u106d\\u1071-\\u1074\\u1082-\\u108d\\u108f-\\u109d\\u135d-\\u135f\\u170e-\\u1710\\u1720-\\u1730\\u1740-\\u1750\\u1772\\u1773\\u1780-\\u17b2\\u17dd\\u17e0-\\u17e9\\u180b-\\u180d\\u1810-\\u1819\\u1920-\\u192b\\u1930-\\u193b\\u1951-\\u196d\\u19b0-\\u19c0\\u19c8-\\u19c9\\u19d0-\\u19d9\\u1a00-\\u1a15\\u1a20-\\u1a53\\u1a60-\\u1a7c\\u1a7f-\\u1a89\\u1a90-\\u1a99\\u1b46-\\u1b4b\\u1b50-\\u1b59\\u1b6b-\\u1b73\\u1bb0-\\u1bb9\\u1be6-\\u1bf3\\u1c00-\\u1c22\\u1c40-\\u1c49\\u1c5b-\\u1c7d\\u1cd0-\\u1cd2\\u1d00-\\u1dbe\\u1e01-\\u1f15\\u200c\\u200d\\u203f\\u2040\\u2054\\u20d0-\\u20dc\\u20e1\\u20e5-\\u20f0\\u2d81-\\u2d96\\u2de0-\\u2dff\\u3021-\\u3028\\u3099\\u309a\\ua640-\\ua66d\\ua674-\\ua67d\\ua69f\\ua6f0-\\ua6f1\\ua7f8-\\ua800\\ua806\\ua80b\\ua823-\\ua827\\ua880-\\ua881\\ua8b4-\\ua8c4\\ua8d0-\\ua8d9\\ua8f3-\\ua8f7\\ua900-\\ua909\\ua926-\\ua92d\\ua930-\\ua945\\ua980-\\ua983\\ua9b3-\\ua9c0\\uaa00-\\uaa27\\uaa40-\\uaa41\\uaa4c-\\uaa4d\\uaa50-\\uaa59\\uaa7b\\uaae0-\\uaae9\\uaaf2-\\uaaf3\\uabc0-\\uabe1\\uabec\\uabed\\uabf0-\\uabf9\\ufb20-\\ufb28\\ufe00-\\ufe0f\\ufe20-\\ufe26\\ufe33\\ufe34\\ufe4d-\\ufe4f\\uff10-\\uff19\\uff3f";
//var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
//var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");

var identifierStart = "(?:\\\\u[0-9a-fA-F]{4}|[" + baseASCIIidentifierStartChars + nonASCIIidentifierStartChars + "])";
var identifierChars = "(?:\\\\u[0-9a-fA-F]{4}|[" + baseASCIIidentifierChars + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "])*";

exports.identifier = new RegExp(identifierStart + identifierChars, 'g');
exports.identifierStart = new RegExp(identifierStart);
exports.identifierMatch = new RegExp("(?:\\\\u[0-9a-fA-F]{4}|[" + baseASCIIidentifierChars + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "])+");

// Whether a single character denotes a newline.

exports.newline = /[\n\r\u2028\u2029]/;

// Matches a whole line break (where CRLF is considered a single
// line break). Used to count lines.

// in javascript, these two differ
// in python they are the same, different methods are called on them
exports.lineBreak = new RegExp('\r\n|' + exports.newline.source);
exports.allLineBreaks = new RegExp(exports.lineBreak.source, 'g');
});

/*jshint node:true */

function Options(options, merge_child_field) {
  this.raw_options = _mergeOpts(options, merge_child_field);

  // Support passing the source text back with no change
  this.disabled = this._get_boolean('disabled');

  this.eol = this._get_characters('eol', 'auto');
  this.end_with_newline = this._get_boolean('end_with_newline');
  this.indent_size = this._get_number('indent_size', 4);
  this.indent_char = this._get_characters('indent_char', ' ');
  this.indent_level = this._get_number('indent_level');

  this.preserve_newlines = this._get_boolean('preserve_newlines', true);
  this.max_preserve_newlines = this._get_number('max_preserve_newlines', 32786);
  if (!this.preserve_newlines) {
    this.max_preserve_newlines = 0;
  }

  this.indent_with_tabs = this._get_boolean('indent_with_tabs', this.indent_char === '\t');
  if (this.indent_with_tabs) {
    this.indent_char = '\t';

    // indent_size behavior changed after 1.8.6
    // It used to be that indent_size would be
    // set to 1 for indent_with_tabs. That is no longer needed and
    // actually doesn't make sense - why not use spaces? Further,
    // that might produce unexpected behavior - tabs being used
    // for single-column alignment. So, when indent_with_tabs is true
    // and indent_size is 1, reset indent_size to 4.
    if (this.indent_size === 1) {
      this.indent_size = 4;
    }
  }

  // Backwards compat with 1.3.x
  this.wrap_line_length = this._get_number('wrap_line_length', this._get_number('max_char'));

  this.indent_empty_lines = this._get_boolean('indent_empty_lines');

  // valid templating languages ['django', 'erb', 'handlebars', 'php']
  // For now, 'auto' = all off for javascript, all on for html (and inline javascript).
  // other values ignored
  this.templating = this._get_selection_list('templating', ['auto', 'none', 'django', 'erb', 'handlebars', 'php'], ['auto']);
}

Options.prototype._get_array = function(name, default_value) {
  var option_value = this.raw_options[name];
  var result = default_value || [];
  if (typeof option_value === 'object') {
    if (option_value !== null && typeof option_value.concat === 'function') {
      result = option_value.concat();
    }
  } else if (typeof option_value === 'string') {
    result = option_value.split(/[^a-zA-Z0-9_\/\-]+/);
  }
  return result;
};

Options.prototype._get_boolean = function(name, default_value) {
  var option_value = this.raw_options[name];
  var result = option_value === undefined ? !!default_value : !!option_value;
  return result;
};

Options.prototype._get_characters = function(name, default_value) {
  var option_value = this.raw_options[name];
  var result = default_value || '';
  if (typeof option_value === 'string') {
    result = option_value.replace(/\\r/, '\r').replace(/\\n/, '\n').replace(/\\t/, '\t');
  }
  return result;
};

Options.prototype._get_number = function(name, default_value) {
  var option_value = this.raw_options[name];
  default_value = parseInt(default_value, 10);
  if (isNaN(default_value)) {
    default_value = 0;
  }
  var result = parseInt(option_value, 10);
  if (isNaN(result)) {
    result = default_value;
  }
  return result;
};

Options.prototype._get_selection = function(name, selection_list, default_value) {
  var result = this._get_selection_list(name, selection_list, default_value);
  if (result.length !== 1) {
    throw new Error(
      "Invalid Option Value: The option '" + name + "' can only be one of the following values:\n" +
      selection_list + "\nYou passed in: '" + this.raw_options[name] + "'");
  }

  return result[0];
};


Options.prototype._get_selection_list = function(name, selection_list, default_value) {
  if (!selection_list || selection_list.length === 0) {
    throw new Error("Selection list cannot be empty.");
  }

  default_value = default_value || [selection_list[0]];
  if (!this._is_valid_selection(default_value, selection_list)) {
    throw new Error("Invalid Default Value!");
  }

  var result = this._get_array(name, default_value);
  if (!this._is_valid_selection(result, selection_list)) {
    throw new Error(
      "Invalid Option Value: The option '" + name + "' can contain only the following values:\n" +
      selection_list + "\nYou passed in: '" + this.raw_options[name] + "'");
  }

  return result;
};

Options.prototype._is_valid_selection = function(result, selection_list) {
  return result.length && selection_list.length &&
    !result.some(function(item) { return selection_list.indexOf(item) === -1; });
};


// merges child options up with the parent options object
// Example: obj = {a: 1, b: {a: 2}}
//          mergeOpts(obj, 'b')
//
//          Returns: {a: 2}
function _mergeOpts(allOptions, childFieldName) {
  var finalOpts = {};
  allOptions = _normalizeOpts(allOptions);
  var name;

  for (name in allOptions) {
    if (name !== childFieldName) {
      finalOpts[name] = allOptions[name];
    }
  }

  //merge in the per type settings for the childFieldName
  if (childFieldName && allOptions[childFieldName]) {
    for (name in allOptions[childFieldName]) {
      finalOpts[name] = allOptions[childFieldName][name];
    }
  }
  return finalOpts;
}

function _normalizeOpts(options) {
  var convertedOpts = {};
  var key;

  for (key in options) {
    var newKey = key.replace(/-/g, "_");
    convertedOpts[newKey] = options[key];
  }
  return convertedOpts;
}

var Options_1 = Options;
var normalizeOpts = _normalizeOpts;
var mergeOpts = _mergeOpts;

var options = {
	Options: Options_1,
	normalizeOpts: normalizeOpts,
	mergeOpts: mergeOpts
};

var BaseOptions = options.Options;

var validPositionValues = ['before-newline', 'after-newline', 'preserve-newline'];

function Options$1(options) {
  BaseOptions.call(this, options, 'js');

  // compatibility, re
  var raw_brace_style = this.raw_options.brace_style || null;
  if (raw_brace_style === "expand-strict") { //graceful handling of deprecated option
    this.raw_options.brace_style = "expand";
  } else if (raw_brace_style === "collapse-preserve-inline") { //graceful handling of deprecated option
    this.raw_options.brace_style = "collapse,preserve-inline";
  } else if (this.raw_options.braces_on_own_line !== undefined) { //graceful handling of deprecated option
    this.raw_options.brace_style = this.raw_options.braces_on_own_line ? "expand" : "collapse";
    // } else if (!raw_brace_style) { //Nothing exists to set it
    //   raw_brace_style = "collapse";
  }

  //preserve-inline in delimited string will trigger brace_preserve_inline, everything
  //else is considered a brace_style and the last one only will have an effect

  var brace_style_split = this._get_selection_list('brace_style', ['collapse', 'expand', 'end-expand', 'none', 'preserve-inline']);

  this.brace_preserve_inline = false; //Defaults in case one or other was not specified in meta-option
  this.brace_style = "collapse";

  for (var bs = 0; bs < brace_style_split.length; bs++) {
    if (brace_style_split[bs] === "preserve-inline") {
      this.brace_preserve_inline = true;
    } else {
      this.brace_style = brace_style_split[bs];
    }
  }

  this.unindent_chained_methods = this._get_boolean('unindent_chained_methods');
  this.break_chained_methods = this._get_boolean('break_chained_methods');
  this.space_in_paren = this._get_boolean('space_in_paren');
  this.space_in_empty_paren = this._get_boolean('space_in_empty_paren');
  this.jslint_happy = this._get_boolean('jslint_happy');
  this.space_after_anon_function = this._get_boolean('space_after_anon_function');
  this.space_after_named_function = this._get_boolean('space_after_named_function');
  this.keep_array_indentation = this._get_boolean('keep_array_indentation');
  this.space_before_conditional = this._get_boolean('space_before_conditional', true);
  this.unescape_strings = this._get_boolean('unescape_strings');
  this.e4x = this._get_boolean('e4x');
  this.comma_first = this._get_boolean('comma_first');
  this.operator_position = this._get_selection('operator_position', validPositionValues);

  // For testing of beautify preserve:start directive
  this.test_output_raw = this._get_boolean('test_output_raw');

  // force this._options.space_after_anon_function to true if this._options.jslint_happy
  if (this.jslint_happy) {
    this.space_after_anon_function = true;
  }

}
Options$1.prototype = new BaseOptions();



var Options_1$1 = Options$1;

var options$1 = {
	Options: Options_1$1
};

/*jshint node:true */

var regexp_has_sticky = RegExp.prototype.hasOwnProperty('sticky');

function InputScanner(input_string) {
  this.__input = input_string || '';
  this.__input_length = this.__input.length;
  this.__position = 0;
}

InputScanner.prototype.restart = function() {
  this.__position = 0;
};

InputScanner.prototype.back = function() {
  if (this.__position > 0) {
    this.__position -= 1;
  }
};

InputScanner.prototype.hasNext = function() {
  return this.__position < this.__input_length;
};

InputScanner.prototype.next = function() {
  var val = null;
  if (this.hasNext()) {
    val = this.__input.charAt(this.__position);
    this.__position += 1;
  }
  return val;
};

InputScanner.prototype.peek = function(index) {
  var val = null;
  index = index || 0;
  index += this.__position;
  if (index >= 0 && index < this.__input_length) {
    val = this.__input.charAt(index);
  }
  return val;
};

// This is a JavaScript only helper function (not in python)
// Javascript doesn't have a match method
// and not all implementation support "sticky" flag.
// If they do not support sticky then both this.match() and this.test() method
// must get the match and check the index of the match.
// If sticky is supported and set, this method will use it.
// Otherwise it will check that global is set, and fall back to the slower method.
InputScanner.prototype.__match = function(pattern, index) {
  pattern.lastIndex = index;
  var pattern_match = pattern.exec(this.__input);

  if (pattern_match && !(regexp_has_sticky && pattern.sticky)) {
    if (pattern_match.index !== index) {
      pattern_match = null;
    }
  }

  return pattern_match;
};

InputScanner.prototype.test = function(pattern, index) {
  index = index || 0;
  index += this.__position;

  if (index >= 0 && index < this.__input_length) {
    return !!this.__match(pattern, index);
  } else {
    return false;
  }
};

InputScanner.prototype.testChar = function(pattern, index) {
  // test one character regex match
  var val = this.peek(index);
  pattern.lastIndex = 0;
  return val !== null && pattern.test(val);
};

InputScanner.prototype.match = function(pattern) {
  var pattern_match = this.__match(pattern, this.__position);
  if (pattern_match) {
    this.__position += pattern_match[0].length;
  } else {
    pattern_match = null;
  }
  return pattern_match;
};

InputScanner.prototype.read = function(starting_pattern, until_pattern, until_after) {
  var val = '';
  var match;
  if (starting_pattern) {
    match = this.match(starting_pattern);
    if (match) {
      val += match[0];
    }
  }
  if (until_pattern && (match || !starting_pattern)) {
    val += this.readUntil(until_pattern, until_after);
  }
  return val;
};

InputScanner.prototype.readUntil = function(pattern, until_after) {
  var val = '';
  var match_index = this.__position;
  pattern.lastIndex = this.__position;
  var pattern_match = pattern.exec(this.__input);
  if (pattern_match) {
    match_index = pattern_match.index;
    if (until_after) {
      match_index += pattern_match[0].length;
    }
  } else {
    match_index = this.__input_length;
  }

  val = this.__input.substring(this.__position, match_index);
  this.__position = match_index;
  return val;
};

InputScanner.prototype.readUntilAfter = function(pattern) {
  return this.readUntil(pattern, true);
};

InputScanner.prototype.get_regexp = function(pattern, match_from) {
  var result = null;
  var flags = 'g';
  if (match_from && regexp_has_sticky) {
    flags = 'y';
  }
  // strings are converted to regexp
  if (typeof pattern === "string" && pattern !== '') {
    // result = new RegExp(pattern.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), flags);
    result = new RegExp(pattern, flags);
  } else if (pattern) {
    result = new RegExp(pattern.source, flags);
  }
  return result;
};

InputScanner.prototype.get_literal_regexp = function(literal_string) {
  return RegExp(literal_string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
};

/* css beautifier legacy helpers */
InputScanner.prototype.peekUntilAfter = function(pattern) {
  var start = this.__position;
  var val = this.readUntilAfter(pattern);
  this.__position = start;
  return val;
};

InputScanner.prototype.lookBack = function(testVal) {
  var start = this.__position - 1;
  return start >= testVal.length && this.__input.substring(start - testVal.length, start)
    .toLowerCase() === testVal;
};

var InputScanner_1 = InputScanner;

var inputscanner = {
	InputScanner: InputScanner_1
};

/*jshint node:true */

function TokenStream(parent_token) {
  // private
  this.__tokens = [];
  this.__tokens_length = this.__tokens.length;
  this.__position = 0;
  this.__parent_token = parent_token;
}

TokenStream.prototype.restart = function() {
  this.__position = 0;
};

TokenStream.prototype.isEmpty = function() {
  return this.__tokens_length === 0;
};

TokenStream.prototype.hasNext = function() {
  return this.__position < this.__tokens_length;
};

TokenStream.prototype.next = function() {
  var val = null;
  if (this.hasNext()) {
    val = this.__tokens[this.__position];
    this.__position += 1;
  }
  return val;
};

TokenStream.prototype.peek = function(index) {
  var val = null;
  index = index || 0;
  index += this.__position;
  if (index >= 0 && index < this.__tokens_length) {
    val = this.__tokens[index];
  }
  return val;
};

TokenStream.prototype.add = function(token) {
  if (this.__parent_token) {
    token.parent = this.__parent_token;
  }
  this.__tokens.push(token);
  this.__tokens_length += 1;
};

var TokenStream_1 = TokenStream;

var tokenstream = {
	TokenStream: TokenStream_1
};

/*jshint node:true */

function Pattern(input_scanner, parent) {
  this._input = input_scanner;
  this._starting_pattern = null;
  this._match_pattern = null;
  this._until_pattern = null;
  this._until_after = false;

  if (parent) {
    this._starting_pattern = this._input.get_regexp(parent._starting_pattern, true);
    this._match_pattern = this._input.get_regexp(parent._match_pattern, true);
    this._until_pattern = this._input.get_regexp(parent._until_pattern);
    this._until_after = parent._until_after;
  }
}

Pattern.prototype.read = function() {
  var result = this._input.read(this._starting_pattern);
  if (!this._starting_pattern || result) {
    result += this._input.read(this._match_pattern, this._until_pattern, this._until_after);
  }
  return result;
};

Pattern.prototype.read_match = function() {
  return this._input.match(this._match_pattern);
};

Pattern.prototype.until_after = function(pattern) {
  var result = this._create();
  result._until_after = true;
  result._until_pattern = this._input.get_regexp(pattern);
  result._update();
  return result;
};

Pattern.prototype.until = function(pattern) {
  var result = this._create();
  result._until_after = false;
  result._until_pattern = this._input.get_regexp(pattern);
  result._update();
  return result;
};

Pattern.prototype.starting_with = function(pattern) {
  var result = this._create();
  result._starting_pattern = this._input.get_regexp(pattern, true);
  result._update();
  return result;
};

Pattern.prototype.matching = function(pattern) {
  var result = this._create();
  result._match_pattern = this._input.get_regexp(pattern, true);
  result._update();
  return result;
};

Pattern.prototype._create = function() {
  return new Pattern(this._input, this);
};

Pattern.prototype._update = function() {};

var Pattern_1 = Pattern;

var pattern = {
	Pattern: Pattern_1
};

var Pattern$1 = pattern.Pattern;

function WhitespacePattern(input_scanner, parent) {
  Pattern$1.call(this, input_scanner, parent);
  if (parent) {
    this._line_regexp = this._input.get_regexp(parent._line_regexp);
  } else {
    this.__set_whitespace_patterns('', '');
  }

  this.newline_count = 0;
  this.whitespace_before_token = '';
}
WhitespacePattern.prototype = new Pattern$1();

WhitespacePattern.prototype.__set_whitespace_patterns = function(whitespace_chars, newline_chars) {
  whitespace_chars += '\\t ';
  newline_chars += '\\n\\r';

  this._match_pattern = this._input.get_regexp(
    '[' + whitespace_chars + newline_chars + ']+', true);
  this._newline_regexp = this._input.get_regexp(
    '\\r\\n|[' + newline_chars + ']');
};

WhitespacePattern.prototype.read = function() {
  this.newline_count = 0;
  this.whitespace_before_token = '';

  var resulting_string = this._input.read(this._match_pattern);
  if (resulting_string === ' ') {
    this.whitespace_before_token = ' ';
  } else if (resulting_string) {
    var matches = this.__split(this._newline_regexp, resulting_string);
    this.newline_count = matches.length - 1;
    this.whitespace_before_token = matches[this.newline_count];
  }

  return resulting_string;
};

WhitespacePattern.prototype.matching = function(whitespace_chars, newline_chars) {
  var result = this._create();
  result.__set_whitespace_patterns(whitespace_chars, newline_chars);
  result._update();
  return result;
};

WhitespacePattern.prototype._create = function() {
  return new WhitespacePattern(this._input, this);
};

WhitespacePattern.prototype.__split = function(regexp, input_string) {
  regexp.lastIndex = 0;
  var start_index = 0;
  var result = [];
  var next_match = regexp.exec(input_string);
  while (next_match) {
    result.push(input_string.substring(start_index, next_match.index));
    start_index = next_match.index + next_match[0].length;
    next_match = regexp.exec(input_string);
  }

  if (start_index < input_string.length) {
    result.push(input_string.substring(start_index, input_string.length));
  } else {
    result.push('');
  }

  return result;
};



var WhitespacePattern_1 = WhitespacePattern;

var whitespacepattern = {
	WhitespacePattern: WhitespacePattern_1
};

var InputScanner$1 = inputscanner.InputScanner;
var Token$1 = token.Token;
var TokenStream$1 = tokenstream.TokenStream;
var WhitespacePattern$1 = whitespacepattern.WhitespacePattern;

var TOKEN = {
  START: 'TK_START',
  RAW: 'TK_RAW',
  EOF: 'TK_EOF'
};

var Tokenizer = function(input_string, options) {
  this._input = new InputScanner$1(input_string);
  this._options = options || {};
  this.__tokens = null;

  this._patterns = {};
  this._patterns.whitespace = new WhitespacePattern$1(this._input);
};

Tokenizer.prototype.tokenize = function() {
  this._input.restart();
  this.__tokens = new TokenStream$1();

  this._reset();

  var current;
  var previous = new Token$1(TOKEN.START, '');
  var open_token = null;
  var open_stack = [];
  var comments = new TokenStream$1();

  while (previous.type !== TOKEN.EOF) {
    current = this._get_next_token(previous, open_token);
    while (this._is_comment(current)) {
      comments.add(current);
      current = this._get_next_token(previous, open_token);
    }

    if (!comments.isEmpty()) {
      current.comments_before = comments;
      comments = new TokenStream$1();
    }

    current.parent = open_token;

    if (this._is_opening(current)) {
      open_stack.push(open_token);
      open_token = current;
    } else if (open_token && this._is_closing(current, open_token)) {
      current.opened = open_token;
      open_token.closed = current;
      open_token = open_stack.pop();
      current.parent = open_token;
    }

    current.previous = previous;
    previous.next = current;

    this.__tokens.add(current);
    previous = current;
  }

  return this.__tokens;
};


Tokenizer.prototype._is_first_token = function() {
  return this.__tokens.isEmpty();
};

Tokenizer.prototype._reset = function() {};

Tokenizer.prototype._get_next_token = function(previous_token, open_token) { // jshint unused:false
  this._readWhitespace();
  var resulting_string = this._input.read(/.+/g);
  if (resulting_string) {
    return this._create_token(TOKEN.RAW, resulting_string);
  } else {
    return this._create_token(TOKEN.EOF, '');
  }
};

Tokenizer.prototype._is_comment = function(current_token) { // jshint unused:false
  return false;
};

Tokenizer.prototype._is_opening = function(current_token) { // jshint unused:false
  return false;
};

Tokenizer.prototype._is_closing = function(current_token, open_token) { // jshint unused:false
  return false;
};

Tokenizer.prototype._create_token = function(type, text) {
  var token = new Token$1(type, text,
    this._patterns.whitespace.newline_count,
    this._patterns.whitespace.whitespace_before_token);
  return token;
};

Tokenizer.prototype._readWhitespace = function() {
  return this._patterns.whitespace.read();
};



var Tokenizer_1 = Tokenizer;
var TOKEN_1 = TOKEN;

var tokenizer = {
	Tokenizer: Tokenizer_1,
	TOKEN: TOKEN_1
};

/*jshint node:true */

function Directives(start_block_pattern, end_block_pattern) {
  start_block_pattern = typeof start_block_pattern === 'string' ? start_block_pattern : start_block_pattern.source;
  end_block_pattern = typeof end_block_pattern === 'string' ? end_block_pattern : end_block_pattern.source;
  this.__directives_block_pattern = new RegExp(start_block_pattern + / beautify( \w+[:]\w+)+ /.source + end_block_pattern, 'g');
  this.__directive_pattern = / (\w+)[:](\w+)/g;

  this.__directives_end_ignore_pattern = new RegExp(start_block_pattern + /\sbeautify\signore:end\s/.source + end_block_pattern, 'g');
}

Directives.prototype.get_directives = function(text) {
  if (!text.match(this.__directives_block_pattern)) {
    return null;
  }

  var directives = {};
  this.__directive_pattern.lastIndex = 0;
  var directive_match = this.__directive_pattern.exec(text);

  while (directive_match) {
    directives[directive_match[1]] = directive_match[2];
    directive_match = this.__directive_pattern.exec(text);
  }

  return directives;
};

Directives.prototype.readIgnored = function(input) {
  return input.readUntilAfter(this.__directives_end_ignore_pattern);
};


var Directives_1 = Directives;

var directives = {
	Directives: Directives_1
};

var Pattern$2 = pattern.Pattern;


var template_names = {
  django: false,
  erb: false,
  handlebars: false,
  php: false
};

// This lets templates appear anywhere we would do a readUntil
// The cost is higher but it is pay to play.
function TemplatablePattern(input_scanner, parent) {
  Pattern$2.call(this, input_scanner, parent);
  this.__template_pattern = null;
  this._disabled = Object.assign({}, template_names);
  this._excluded = Object.assign({}, template_names);

  if (parent) {
    this.__template_pattern = this._input.get_regexp(parent.__template_pattern);
    this._excluded = Object.assign(this._excluded, parent._excluded);
    this._disabled = Object.assign(this._disabled, parent._disabled);
  }
  var pattern = new Pattern$2(input_scanner);
  this.__patterns = {
    handlebars_comment: pattern.starting_with(/{{!--/).until_after(/--}}/),
    handlebars_unescaped: pattern.starting_with(/{{{/).until_after(/}}}/),
    handlebars: pattern.starting_with(/{{/).until_after(/}}/),
    php: pattern.starting_with(/<\?(?:[=]|php)/).until_after(/\?>/),
    erb: pattern.starting_with(/<%[^%]/).until_after(/[^%]%>/),
    // django coflicts with handlebars a bit.
    django: pattern.starting_with(/{%/).until_after(/%}/),
    django_value: pattern.starting_with(/{{/).until_after(/}}/),
    django_comment: pattern.starting_with(/{#/).until_after(/#}/)
  };
}
TemplatablePattern.prototype = new Pattern$2();

TemplatablePattern.prototype._create = function() {
  return new TemplatablePattern(this._input, this);
};

TemplatablePattern.prototype._update = function() {
  this.__set_templated_pattern();
};

TemplatablePattern.prototype.disable = function(language) {
  var result = this._create();
  result._disabled[language] = true;
  result._update();
  return result;
};

TemplatablePattern.prototype.read_options = function(options) {
  var result = this._create();
  for (var language in template_names) {
    result._disabled[language] = options.templating.indexOf(language) === -1;
  }
  result._update();
  return result;
};

TemplatablePattern.prototype.exclude = function(language) {
  var result = this._create();
  result._excluded[language] = true;
  result._update();
  return result;
};

TemplatablePattern.prototype.read = function() {
  var result = '';
  if (this._match_pattern) {
    result = this._input.read(this._starting_pattern);
  } else {
    result = this._input.read(this._starting_pattern, this.__template_pattern);
  }
  var next = this._read_template();
  while (next) {
    if (this._match_pattern) {
      next += this._input.read(this._match_pattern);
    } else {
      next += this._input.readUntil(this.__template_pattern);
    }
    result += next;
    next = this._read_template();
  }

  if (this._until_after) {
    result += this._input.readUntilAfter(this._until_pattern);
  }
  return result;
};

TemplatablePattern.prototype.__set_templated_pattern = function() {
  var items = [];

  if (!this._disabled.php) {
    items.push(this.__patterns.php._starting_pattern.source);
  }
  if (!this._disabled.handlebars) {
    items.push(this.__patterns.handlebars._starting_pattern.source);
  }
  if (!this._disabled.erb) {
    items.push(this.__patterns.erb._starting_pattern.source);
  }
  if (!this._disabled.django) {
    items.push(this.__patterns.django._starting_pattern.source);
    items.push(this.__patterns.django_value._starting_pattern.source);
    items.push(this.__patterns.django_comment._starting_pattern.source);
  }

  if (this._until_pattern) {
    items.push(this._until_pattern.source);
  }
  this.__template_pattern = this._input.get_regexp('(?:' + items.join('|') + ')');
};

TemplatablePattern.prototype._read_template = function() {
  var resulting_string = '';
  var c = this._input.peek();
  if (c === '<') {
    var peek1 = this._input.peek(1);
    //if we're in a comment, do something special
    // We treat all comments as literals, even more than preformatted tags
    // we just look for the appropriate close tag
    if (!this._disabled.php && !this._excluded.php && peek1 === '?') {
      resulting_string = resulting_string ||
        this.__patterns.php.read();
    }
    if (!this._disabled.erb && !this._excluded.erb && peek1 === '%') {
      resulting_string = resulting_string ||
        this.__patterns.erb.read();
    }
  } else if (c === '{') {
    if (!this._disabled.handlebars && !this._excluded.handlebars) {
      resulting_string = resulting_string ||
        this.__patterns.handlebars_comment.read();
      resulting_string = resulting_string ||
        this.__patterns.handlebars_unescaped.read();
      resulting_string = resulting_string ||
        this.__patterns.handlebars.read();
    }
    if (!this._disabled.django) {
      // django coflicts with handlebars a bit.
      if (!this._excluded.django && !this._excluded.handlebars) {
        resulting_string = resulting_string ||
          this.__patterns.django_value.read();
      }
      if (!this._excluded.django) {
        resulting_string = resulting_string ||
          this.__patterns.django_comment.read();
        resulting_string = resulting_string ||
          this.__patterns.django.read();
      }
    }
  }
  return resulting_string;
};


var TemplatablePattern_1 = TemplatablePattern;

var templatablepattern = {
	TemplatablePattern: TemplatablePattern_1
};

var InputScanner$2 = inputscanner.InputScanner;
var BaseTokenizer = tokenizer.Tokenizer;
var BASETOKEN = tokenizer.TOKEN;
var Directives$1 = directives.Directives;

var Pattern$3 = pattern.Pattern;
var TemplatablePattern$1 = templatablepattern.TemplatablePattern;


function in_array(what, arr) {
  return arr.indexOf(what) !== -1;
}


var TOKEN$1 = {
  START_EXPR: 'TK_START_EXPR',
  END_EXPR: 'TK_END_EXPR',
  START_BLOCK: 'TK_START_BLOCK',
  END_BLOCK: 'TK_END_BLOCK',
  WORD: 'TK_WORD',
  RESERVED: 'TK_RESERVED',
  SEMICOLON: 'TK_SEMICOLON',
  STRING: 'TK_STRING',
  EQUALS: 'TK_EQUALS',
  OPERATOR: 'TK_OPERATOR',
  COMMA: 'TK_COMMA',
  BLOCK_COMMENT: 'TK_BLOCK_COMMENT',
  COMMENT: 'TK_COMMENT',
  DOT: 'TK_DOT',
  UNKNOWN: 'TK_UNKNOWN',
  START: BASETOKEN.START,
  RAW: BASETOKEN.RAW,
  EOF: BASETOKEN.EOF
};


var directives_core = new Directives$1(/\/\*/, /\*\//);

var number_pattern = /0[xX][0123456789abcdefABCDEF]*|0[oO][01234567]*|0[bB][01]*|\d+n|(?:\.\d+|\d+\.?\d*)(?:[eE][+-]?\d+)?/;

var digit = /[0-9]/;

// Dot "." must be distinguished from "..." and decimal
var dot_pattern = /[^\d\.]/;

var positionable_operators = (
  ">>> === !== " +
  "<< && >= ** != == <= >> || |> " +
  "< / - + > : & % ? ^ | *").split(' ');

// IMPORTANT: this must be sorted longest to shortest or tokenizing many not work.
// Also, you must update possitionable operators separately from punct
var punct =
  ">>>= " +
  "... >>= <<= === >>> !== **= " +
  "=> ^= :: /= << <= == && -= >= >> != -- += ** || ++ %= &= *= |= |> " +
  "= ! ? > < : / ^ - + * & % ~ |";

punct = punct.replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&");
// ?. but not if followed by a number 
punct = '\\?\\.(?!\\d) ' + punct;
punct = punct.replace(/ /g, '|');

var punct_pattern = new RegExp(punct);

// words which should always start on new line.
var line_starters = 'continue,try,throw,return,var,let,const,if,switch,case,default,for,while,break,function,import,export'.split(',');
var reserved_words = line_starters.concat(['do', 'in', 'of', 'else', 'get', 'set', 'new', 'catch', 'finally', 'typeof', 'yield', 'async', 'await', 'from', 'as']);
var reserved_word_pattern = new RegExp('^(?:' + reserved_words.join('|') + ')$');

// var template_pattern = /(?:(?:<\?php|<\?=)[\s\S]*?\?>)|(?:<%[\s\S]*?%>)/g;

var in_html_comment;

var Tokenizer$1 = function(input_string, options) {
  BaseTokenizer.call(this, input_string, options);

  this._patterns.whitespace = this._patterns.whitespace.matching(
    /\u00A0\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff/.source,
    /\u2028\u2029/.source);

  var pattern_reader = new Pattern$3(this._input);
  var templatable = new TemplatablePattern$1(this._input)
    .read_options(this._options);

  this.__patterns = {
    template: templatable,
    identifier: templatable.starting_with(acorn.identifier).matching(acorn.identifierMatch),
    number: pattern_reader.matching(number_pattern),
    punct: pattern_reader.matching(punct_pattern),
    // comment ends just before nearest linefeed or end of file
    comment: pattern_reader.starting_with(/\/\//).until(/[\n\r\u2028\u2029]/),
    //  /* ... */ comment ends with nearest */ or end of file
    block_comment: pattern_reader.starting_with(/\/\*/).until_after(/\*\//),
    html_comment_start: pattern_reader.matching(/<!--/),
    html_comment_end: pattern_reader.matching(/-->/),
    include: pattern_reader.starting_with(/#include/).until_after(acorn.lineBreak),
    shebang: pattern_reader.starting_with(/#!/).until_after(acorn.lineBreak),
    xml: pattern_reader.matching(/[\s\S]*?<(\/?)([-a-zA-Z:0-9_.]+|{[\s\S]+?}|!\[CDATA\[[\s\S]*?\]\])(\s+{[\s\S]+?}|\s+[-a-zA-Z:0-9_.]+|\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{[\s\S]+?}))*\s*(\/?)\s*>/),
    single_quote: templatable.until(/['\\\n\r\u2028\u2029]/),
    double_quote: templatable.until(/["\\\n\r\u2028\u2029]/),
    template_text: templatable.until(/[`\\$]/),
    template_expression: templatable.until(/[`}\\]/)
  };

};
Tokenizer$1.prototype = new BaseTokenizer();

Tokenizer$1.prototype._is_comment = function(current_token) {
  return current_token.type === TOKEN$1.COMMENT || current_token.type === TOKEN$1.BLOCK_COMMENT || current_token.type === TOKEN$1.UNKNOWN;
};

Tokenizer$1.prototype._is_opening = function(current_token) {
  return current_token.type === TOKEN$1.START_BLOCK || current_token.type === TOKEN$1.START_EXPR;
};

Tokenizer$1.prototype._is_closing = function(current_token, open_token) {
  return (current_token.type === TOKEN$1.END_BLOCK || current_token.type === TOKEN$1.END_EXPR) &&
    (open_token && (
      (current_token.text === ']' && open_token.text === '[') ||
      (current_token.text === ')' && open_token.text === '(') ||
      (current_token.text === '}' && open_token.text === '{')));
};

Tokenizer$1.prototype._reset = function() {
  in_html_comment = false;
};

Tokenizer$1.prototype._get_next_token = function(previous_token, open_token) { // jshint unused:false
  var token = null;
  this._readWhitespace();
  var c = this._input.peek();

  if (c === null) {
    return this._create_token(TOKEN$1.EOF, '');
  }

  token = token || this._read_non_javascript(c);
  token = token || this._read_string(c);
  token = token || this._read_word(previous_token);
  token = token || this._read_singles(c);
  token = token || this._read_comment(c);
  token = token || this._read_regexp(c, previous_token);
  token = token || this._read_xml(c, previous_token);
  token = token || this._read_punctuation();
  token = token || this._create_token(TOKEN$1.UNKNOWN, this._input.next());

  return token;
};

Tokenizer$1.prototype._read_word = function(previous_token) {
  var resulting_string;
  resulting_string = this.__patterns.identifier.read();
  if (resulting_string !== '') {
    resulting_string = resulting_string.replace(acorn.allLineBreaks, '\n');
    if (!(previous_token.type === TOKEN$1.DOT ||
        (previous_token.type === TOKEN$1.RESERVED && (previous_token.text === 'set' || previous_token.text === 'get'))) &&
      reserved_word_pattern.test(resulting_string)) {
      if (resulting_string === 'in' || resulting_string === 'of') { // hack for 'in' and 'of' operators
        return this._create_token(TOKEN$1.OPERATOR, resulting_string);
      }
      return this._create_token(TOKEN$1.RESERVED, resulting_string);
    }
    return this._create_token(TOKEN$1.WORD, resulting_string);
  }

  resulting_string = this.__patterns.number.read();
  if (resulting_string !== '') {
    return this._create_token(TOKEN$1.WORD, resulting_string);
  }
};

Tokenizer$1.prototype._read_singles = function(c) {
  var token = null;
  if (c === '(' || c === '[') {
    token = this._create_token(TOKEN$1.START_EXPR, c);
  } else if (c === ')' || c === ']') {
    token = this._create_token(TOKEN$1.END_EXPR, c);
  } else if (c === '{') {
    token = this._create_token(TOKEN$1.START_BLOCK, c);
  } else if (c === '}') {
    token = this._create_token(TOKEN$1.END_BLOCK, c);
  } else if (c === ';') {
    token = this._create_token(TOKEN$1.SEMICOLON, c);
  } else if (c === '.' && dot_pattern.test(this._input.peek(1))) {
    token = this._create_token(TOKEN$1.DOT, c);
  } else if (c === ',') {
    token = this._create_token(TOKEN$1.COMMA, c);
  }

  if (token) {
    this._input.next();
  }
  return token;
};

Tokenizer$1.prototype._read_punctuation = function() {
  var resulting_string = this.__patterns.punct.read();

  if (resulting_string !== '') {
    if (resulting_string === '=') {
      return this._create_token(TOKEN$1.EQUALS, resulting_string);
    } else if (resulting_string === '?.') {
      return this._create_token(TOKEN$1.DOT, resulting_string);
    } else {
      return this._create_token(TOKEN$1.OPERATOR, resulting_string);
    }
  }
};

Tokenizer$1.prototype._read_non_javascript = function(c) {
  var resulting_string = '';

  if (c === '#') {
    if (this._is_first_token()) {
      resulting_string = this.__patterns.shebang.read();

      if (resulting_string) {
        return this._create_token(TOKEN$1.UNKNOWN, resulting_string.trim() + '\n');
      }
    }

    // handles extendscript #includes
    resulting_string = this.__patterns.include.read();

    if (resulting_string) {
      return this._create_token(TOKEN$1.UNKNOWN, resulting_string.trim() + '\n');
    }

    c = this._input.next();

    // Spidermonkey-specific sharp variables for circular references. Considered obsolete.
    var sharp = '#';
    if (this._input.hasNext() && this._input.testChar(digit)) {
      do {
        c = this._input.next();
        sharp += c;
      } while (this._input.hasNext() && c !== '#' && c !== '=');
      if (c === '#') ; else if (this._input.peek() === '[' && this._input.peek(1) === ']') {
        sharp += '[]';
        this._input.next();
        this._input.next();
      } else if (this._input.peek() === '{' && this._input.peek(1) === '}') {
        sharp += '{}';
        this._input.next();
        this._input.next();
      }
      return this._create_token(TOKEN$1.WORD, sharp);
    }

    this._input.back();

  } else if (c === '<' && this._is_first_token()) {
    resulting_string = this.__patterns.html_comment_start.read();
    if (resulting_string) {
      while (this._input.hasNext() && !this._input.testChar(acorn.newline)) {
        resulting_string += this._input.next();
      }
      in_html_comment = true;
      return this._create_token(TOKEN$1.COMMENT, resulting_string);
    }
  } else if (in_html_comment && c === '-') {
    resulting_string = this.__patterns.html_comment_end.read();
    if (resulting_string) {
      in_html_comment = false;
      return this._create_token(TOKEN$1.COMMENT, resulting_string);
    }
  }

  return null;
};

Tokenizer$1.prototype._read_comment = function(c) {
  var token = null;
  if (c === '/') {
    var comment = '';
    if (this._input.peek(1) === '*') {
      // peek for comment /* ... */
      comment = this.__patterns.block_comment.read();
      var directives = directives_core.get_directives(comment);
      if (directives && directives.ignore === 'start') {
        comment += directives_core.readIgnored(this._input);
      }
      comment = comment.replace(acorn.allLineBreaks, '\n');
      token = this._create_token(TOKEN$1.BLOCK_COMMENT, comment);
      token.directives = directives;
    } else if (this._input.peek(1) === '/') {
      // peek for comment // ...
      comment = this.__patterns.comment.read();
      token = this._create_token(TOKEN$1.COMMENT, comment);
    }
  }
  return token;
};

Tokenizer$1.prototype._read_string = function(c) {
  if (c === '`' || c === "'" || c === '"') {
    var resulting_string = this._input.next();
    this.has_char_escapes = false;

    if (c === '`') {
      resulting_string += this._read_string_recursive('`', true, '${');
    } else {
      resulting_string += this._read_string_recursive(c);
    }

    if (this.has_char_escapes && this._options.unescape_strings) {
      resulting_string = unescape_string(resulting_string);
    }

    if (this._input.peek() === c) {
      resulting_string += this._input.next();
    }

    resulting_string = resulting_string.replace(acorn.allLineBreaks, '\n');

    return this._create_token(TOKEN$1.STRING, resulting_string);
  }

  return null;
};

Tokenizer$1.prototype._allow_regexp_or_xml = function(previous_token) {
  // regex and xml can only appear in specific locations during parsing
  return (previous_token.type === TOKEN$1.RESERVED && in_array(previous_token.text, ['return', 'case', 'throw', 'else', 'do', 'typeof', 'yield'])) ||
    (previous_token.type === TOKEN$1.END_EXPR && previous_token.text === ')' &&
      previous_token.opened.previous.type === TOKEN$1.RESERVED && in_array(previous_token.opened.previous.text, ['if', 'while', 'for'])) ||
    (in_array(previous_token.type, [TOKEN$1.COMMENT, TOKEN$1.START_EXPR, TOKEN$1.START_BLOCK, TOKEN$1.START,
      TOKEN$1.END_BLOCK, TOKEN$1.OPERATOR, TOKEN$1.EQUALS, TOKEN$1.EOF, TOKEN$1.SEMICOLON, TOKEN$1.COMMA
    ]));
};

Tokenizer$1.prototype._read_regexp = function(c, previous_token) {

  if (c === '/' && this._allow_regexp_or_xml(previous_token)) {
    // handle regexp
    //
    var resulting_string = this._input.next();
    var esc = false;

    var in_char_class = false;
    while (this._input.hasNext() &&
      ((esc || in_char_class || this._input.peek() !== c) &&
        !this._input.testChar(acorn.newline))) {
      resulting_string += this._input.peek();
      if (!esc) {
        esc = this._input.peek() === '\\';
        if (this._input.peek() === '[') {
          in_char_class = true;
        } else if (this._input.peek() === ']') {
          in_char_class = false;
        }
      } else {
        esc = false;
      }
      this._input.next();
    }

    if (this._input.peek() === c) {
      resulting_string += this._input.next();

      // regexps may have modifiers /regexp/MOD , so fetch those, too
      // Only [gim] are valid, but if the user puts in garbage, do what we can to take it.
      resulting_string += this._input.read(acorn.identifier);
    }
    return this._create_token(TOKEN$1.STRING, resulting_string);
  }
  return null;
};

Tokenizer$1.prototype._read_xml = function(c, previous_token) {

  if (this._options.e4x && c === "<" && this._allow_regexp_or_xml(previous_token)) {
    var xmlStr = '';
    var match = this.__patterns.xml.read_match();
    // handle e4x xml literals
    //
    if (match) {
      // Trim root tag to attempt to
      var rootTag = match[2].replace(/^{\s+/, '{').replace(/\s+}$/, '}');
      var isCurlyRoot = rootTag.indexOf('{') === 0;
      var depth = 0;
      while (match) {
        var isEndTag = !!match[1];
        var tagName = match[2];
        var isSingletonTag = (!!match[match.length - 1]) || (tagName.slice(0, 8) === "![CDATA[");
        if (!isSingletonTag &&
          (tagName === rootTag || (isCurlyRoot && tagName.replace(/^{\s+/, '{').replace(/\s+}$/, '}')))) {
          if (isEndTag) {
            --depth;
          } else {
            ++depth;
          }
        }
        xmlStr += match[0];
        if (depth <= 0) {
          break;
        }
        match = this.__patterns.xml.read_match();
      }
      // if we didn't close correctly, keep unformatted.
      if (!match) {
        xmlStr += this._input.match(/[\s\S]*/g)[0];
      }
      xmlStr = xmlStr.replace(acorn.allLineBreaks, '\n');
      return this._create_token(TOKEN$1.STRING, xmlStr);
    }
  }

  return null;
};

function unescape_string(s) {
  // You think that a regex would work for this
  // return s.replace(/\\x([0-9a-f]{2})/gi, function(match, val) {
  //         return String.fromCharCode(parseInt(val, 16));
  //     })
  // However, dealing with '\xff', '\\xff', '\\\xff' makes this more fun.
  var out = '',
    escaped = 0;

  var input_scan = new InputScanner$2(s);
  var matched = null;

  while (input_scan.hasNext()) {
    // Keep any whitespace, non-slash characters
    // also keep slash pairs.
    matched = input_scan.match(/([\s]|[^\\]|\\\\)+/g);

    if (matched) {
      out += matched[0];
    }

    if (input_scan.peek() === '\\') {
      input_scan.next();
      if (input_scan.peek() === 'x') {
        matched = input_scan.match(/x([0-9A-Fa-f]{2})/g);
      } else if (input_scan.peek() === 'u') {
        matched = input_scan.match(/u([0-9A-Fa-f]{4})/g);
      } else {
        out += '\\';
        if (input_scan.hasNext()) {
          out += input_scan.next();
        }
        continue;
      }

      // If there's some error decoding, return the original string
      if (!matched) {
        return s;
      }

      escaped = parseInt(matched[1], 16);

      if (escaped > 0x7e && escaped <= 0xff && matched[0].indexOf('x') === 0) {
        // we bail out on \x7f..\xff,
        // leaving whole string escaped,
        // as it's probably completely binary
        return s;
      } else if (escaped >= 0x00 && escaped < 0x20) {
        // leave 0x00...0x1f escaped
        out += '\\' + matched[0];
        continue;
      } else if (escaped === 0x22 || escaped === 0x27 || escaped === 0x5c) {
        // single-quote, apostrophe, backslash - escape these
        out += '\\' + String.fromCharCode(escaped);
      } else {
        out += String.fromCharCode(escaped);
      }
    }
  }

  return out;
}

// handle string
//
Tokenizer$1.prototype._read_string_recursive = function(delimiter, allow_unescaped_newlines, start_sub) {
  var current_char;
  var pattern;
  if (delimiter === '\'') {
    pattern = this.__patterns.single_quote;
  } else if (delimiter === '"') {
    pattern = this.__patterns.double_quote;
  } else if (delimiter === '`') {
    pattern = this.__patterns.template_text;
  } else if (delimiter === '}') {
    pattern = this.__patterns.template_expression;
  }

  var resulting_string = pattern.read();
  var next = '';
  while (this._input.hasNext()) {
    next = this._input.next();
    if (next === delimiter ||
      (!allow_unescaped_newlines && acorn.newline.test(next))) {
      this._input.back();
      break;
    } else if (next === '\\' && this._input.hasNext()) {
      current_char = this._input.peek();

      if (current_char === 'x' || current_char === 'u') {
        this.has_char_escapes = true;
      } else if (current_char === '\r' && this._input.peek(1) === '\n') {
        this._input.next();
      }
      next += this._input.next();
    } else if (start_sub) {
      if (start_sub === '${' && next === '$' && this._input.peek() === '{') {
        next += this._input.next();
      }

      if (start_sub === next) {
        if (delimiter === '`') {
          next += this._read_string_recursive('}', allow_unescaped_newlines, '`');
        } else {
          next += this._read_string_recursive('`', allow_unescaped_newlines, '${');
        }
        if (this._input.hasNext()) {
          next += this._input.next();
        }
      }
    }
    next += pattern.read();
    resulting_string += next;
  }

  return resulting_string;
};

var Tokenizer_1$1 = Tokenizer$1;
var TOKEN_1$1 = TOKEN$1;
var positionable_operators_1 = positionable_operators.slice();
var line_starters_1 = line_starters.slice();

var tokenizer$1 = {
	Tokenizer: Tokenizer_1$1,
	TOKEN: TOKEN_1$1,
	positionable_operators: positionable_operators_1,
	line_starters: line_starters_1
};

var Output$1 = output.Output;
var Token$2 = token.Token;

var Options$2 = options$1.Options;
var Tokenizer$2 = tokenizer$1.Tokenizer;
var line_starters$1 = tokenizer$1.line_starters;
var positionable_operators$1 = tokenizer$1.positionable_operators;
var TOKEN$2 = tokenizer$1.TOKEN;


function in_array$1(what, arr) {
  return arr.indexOf(what) !== -1;
}

function ltrim(s) {
  return s.replace(/^\s+/g, '');
}

function generateMapFromStrings(list) {
  var result = {};
  for (var x = 0; x < list.length; x++) {
    // make the mapped names underscored instead of dash
    result[list[x].replace(/-/g, '_')] = list[x];
  }
  return result;
}

function reserved_word(token, word) {
  return token && token.type === TOKEN$2.RESERVED && token.text === word;
}

function reserved_array(token, words) {
  return token && token.type === TOKEN$2.RESERVED && in_array$1(token.text, words);
}
// Unsure of what they mean, but they work. Worth cleaning up in future.
var special_words = ['case', 'return', 'do', 'if', 'throw', 'else', 'await', 'break', 'continue', 'async'];

var validPositionValues$1 = ['before-newline', 'after-newline', 'preserve-newline'];

// Generate map from array
var OPERATOR_POSITION = generateMapFromStrings(validPositionValues$1);

var OPERATOR_POSITION_BEFORE_OR_PRESERVE = [OPERATOR_POSITION.before_newline, OPERATOR_POSITION.preserve_newline];

var MODE = {
  BlockStatement: 'BlockStatement', // 'BLOCK'
  Statement: 'Statement', // 'STATEMENT'
  ObjectLiteral: 'ObjectLiteral', // 'OBJECT',
  ArrayLiteral: 'ArrayLiteral', //'[EXPRESSION]',
  ForInitializer: 'ForInitializer', //'(FOR-EXPRESSION)',
  Conditional: 'Conditional', //'(COND-EXPRESSION)',
  Expression: 'Expression' //'(EXPRESSION)'
};

function remove_redundant_indentation(output, frame) {
  // This implementation is effective but has some issues:
  //     - can cause line wrap to happen too soon due to indent removal
  //           after wrap points are calculated
  // These issues are minor compared to ugly indentation.

  if (frame.multiline_frame ||
    frame.mode === MODE.ForInitializer ||
    frame.mode === MODE.Conditional) {
    return;
  }

  // remove one indent from each line inside this section
  output.remove_indent(frame.start_line_index);
}

// we could use just string.split, but
// IE doesn't like returning empty strings
function split_linebreaks(s) {
  //return s.split(/\x0d\x0a|\x0a/);

  s = s.replace(acorn.allLineBreaks, '\n');
  var out = [],
    idx = s.indexOf("\n");
  while (idx !== -1) {
    out.push(s.substring(0, idx));
    s = s.substring(idx + 1);
    idx = s.indexOf("\n");
  }
  if (s.length) {
    out.push(s);
  }
  return out;
}

function is_array(mode) {
  return mode === MODE.ArrayLiteral;
}

function is_expression(mode) {
  return in_array$1(mode, [MODE.Expression, MODE.ForInitializer, MODE.Conditional]);
}

function all_lines_start_with(lines, c) {
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i].trim();
    if (line.charAt(0) !== c) {
      return false;
    }
  }
  return true;
}

function each_line_matches_indent(lines, indent) {
  var i = 0,
    len = lines.length,
    line;
  for (; i < len; i++) {
    line = lines[i];
    // allow empty lines to pass through
    if (line && line.indexOf(indent) !== 0) {
      return false;
    }
  }
  return true;
}


function Beautifier(source_text, options) {
  options = options || {};
  this._source_text = source_text || '';

  this._output = null;
  this._tokens = null;
  this._last_last_text = null;
  this._flags = null;
  this._previous_flags = null;

  this._flag_store = null;
  this._options = new Options$2(options);
}

Beautifier.prototype.create_flags = function(flags_base, mode) {
  var next_indent_level = 0;
  if (flags_base) {
    next_indent_level = flags_base.indentation_level;
    if (!this._output.just_added_newline() &&
      flags_base.line_indent_level > next_indent_level) {
      next_indent_level = flags_base.line_indent_level;
    }
  }

  var next_flags = {
    mode: mode,
    parent: flags_base,
    last_token: flags_base ? flags_base.last_token : new Token$2(TOKEN$2.START_BLOCK, ''), // last token text
    last_word: flags_base ? flags_base.last_word : '', // last TOKEN.WORD passed
    declaration_statement: false,
    declaration_assignment: false,
    multiline_frame: false,
    inline_frame: false,
    if_block: false,
    else_block: false,
    do_block: false,
    do_while: false,
    import_block: false,
    in_case_statement: false, // switch(..){ INSIDE HERE }
    in_case: false, // we're on the exact line with "case 0:"
    case_body: false, // the indented case-action block
    indentation_level: next_indent_level,
    alignment: 0,
    line_indent_level: flags_base ? flags_base.line_indent_level : next_indent_level,
    start_line_index: this._output.get_line_number(),
    ternary_depth: 0
  };
  return next_flags;
};

Beautifier.prototype._reset = function(source_text) {
  var baseIndentString = source_text.match(/^[\t ]*/)[0];

  this._last_last_text = ''; // pre-last token text
  this._output = new Output$1(this._options, baseIndentString);

  // If testing the ignore directive, start with output disable set to true
  this._output.raw = this._options.test_output_raw;


  // Stack of parsing/formatting states, including MODE.
  // We tokenize, parse, and output in an almost purely a forward-only stream of token input
  // and formatted output.  This makes the beautifier less accurate than full parsers
  // but also far more tolerant of syntax errors.
  //
  // For example, the default mode is MODE.BlockStatement. If we see a '{' we push a new frame of type
  // MODE.BlockStatement on the the stack, even though it could be object literal.  If we later
  // encounter a ":", we'll switch to to MODE.ObjectLiteral.  If we then see a ";",
  // most full parsers would die, but the beautifier gracefully falls back to
  // MODE.BlockStatement and continues on.
  this._flag_store = [];
  this.set_mode(MODE.BlockStatement);
  var tokenizer = new Tokenizer$2(source_text, this._options);
  this._tokens = tokenizer.tokenize();
  return source_text;
};

Beautifier.prototype.beautify = function() {
  // if disabled, return the input unchanged.
  if (this._options.disabled) {
    return this._source_text;
  }

  var sweet_code;
  var source_text = this._reset(this._source_text);

  var eol = this._options.eol;
  if (this._options.eol === 'auto') {
    eol = '\n';
    if (source_text && acorn.lineBreak.test(source_text || '')) {
      eol = source_text.match(acorn.lineBreak)[0];
    }
  }

  var current_token = this._tokens.next();
  while (current_token) {
    this.handle_token(current_token);

    this._last_last_text = this._flags.last_token.text;
    this._flags.last_token = current_token;

    current_token = this._tokens.next();
  }

  sweet_code = this._output.get_code(eol);

  return sweet_code;
};

Beautifier.prototype.handle_token = function(current_token, preserve_statement_flags) {
  if (current_token.type === TOKEN$2.START_EXPR) {
    this.handle_start_expr(current_token);
  } else if (current_token.type === TOKEN$2.END_EXPR) {
    this.handle_end_expr(current_token);
  } else if (current_token.type === TOKEN$2.START_BLOCK) {
    this.handle_start_block(current_token);
  } else if (current_token.type === TOKEN$2.END_BLOCK) {
    this.handle_end_block(current_token);
  } else if (current_token.type === TOKEN$2.WORD) {
    this.handle_word(current_token);
  } else if (current_token.type === TOKEN$2.RESERVED) {
    this.handle_word(current_token);
  } else if (current_token.type === TOKEN$2.SEMICOLON) {
    this.handle_semicolon(current_token);
  } else if (current_token.type === TOKEN$2.STRING) {
    this.handle_string(current_token);
  } else if (current_token.type === TOKEN$2.EQUALS) {
    this.handle_equals(current_token);
  } else if (current_token.type === TOKEN$2.OPERATOR) {
    this.handle_operator(current_token);
  } else if (current_token.type === TOKEN$2.COMMA) {
    this.handle_comma(current_token);
  } else if (current_token.type === TOKEN$2.BLOCK_COMMENT) {
    this.handle_block_comment(current_token, preserve_statement_flags);
  } else if (current_token.type === TOKEN$2.COMMENT) {
    this.handle_comment(current_token, preserve_statement_flags);
  } else if (current_token.type === TOKEN$2.DOT) {
    this.handle_dot(current_token);
  } else if (current_token.type === TOKEN$2.EOF) {
    this.handle_eof(current_token);
  } else if (current_token.type === TOKEN$2.UNKNOWN) {
    this.handle_unknown(current_token, preserve_statement_flags);
  } else {
    this.handle_unknown(current_token, preserve_statement_flags);
  }
};

Beautifier.prototype.handle_whitespace_and_comments = function(current_token, preserve_statement_flags) {
  var newlines = current_token.newlines;
  var keep_whitespace = this._options.keep_array_indentation && is_array(this._flags.mode);

  if (current_token.comments_before) {
    var comment_token = current_token.comments_before.next();
    while (comment_token) {
      // The cleanest handling of inline comments is to treat them as though they aren't there.
      // Just continue formatting and the behavior should be logical.
      // Also ignore unknown tokens.  Again, this should result in better behavior.
      this.handle_whitespace_and_comments(comment_token, preserve_statement_flags);
      this.handle_token(comment_token, preserve_statement_flags);
      comment_token = current_token.comments_before.next();
    }
  }

  if (keep_whitespace) {
    for (var i = 0; i < newlines; i += 1) {
      this.print_newline(i > 0, preserve_statement_flags);
    }
  } else {
    if (this._options.max_preserve_newlines && newlines > this._options.max_preserve_newlines) {
      newlines = this._options.max_preserve_newlines;
    }

    if (this._options.preserve_newlines) {
      if (newlines > 1) {
        this.print_newline(false, preserve_statement_flags);
        for (var j = 1; j < newlines; j += 1) {
          this.print_newline(true, preserve_statement_flags);
        }
      }
    }
  }

};

var newline_restricted_tokens = ['async', 'break', 'continue', 'return', 'throw', 'yield'];

Beautifier.prototype.allow_wrap_or_preserved_newline = function(current_token, force_linewrap) {
  force_linewrap = (force_linewrap === undefined) ? false : force_linewrap;

  // Never wrap the first token on a line
  if (this._output.just_added_newline()) {
    return;
  }

  var shouldPreserveOrForce = (this._options.preserve_newlines && current_token.newlines) || force_linewrap;
  var operatorLogicApplies = in_array$1(this._flags.last_token.text, positionable_operators$1) ||
    in_array$1(current_token.text, positionable_operators$1);

  if (operatorLogicApplies) {
    var shouldPrintOperatorNewline = (
        in_array$1(this._flags.last_token.text, positionable_operators$1) &&
        in_array$1(this._options.operator_position, OPERATOR_POSITION_BEFORE_OR_PRESERVE)
      ) ||
      in_array$1(current_token.text, positionable_operators$1);
    shouldPreserveOrForce = shouldPreserveOrForce && shouldPrintOperatorNewline;
  }

  if (shouldPreserveOrForce) {
    this.print_newline(false, true);
  } else if (this._options.wrap_line_length) {
    if (reserved_array(this._flags.last_token, newline_restricted_tokens)) {
      // These tokens should never have a newline inserted
      // between them and the following expression.
      return;
    }
    this._output.set_wrap_point();
  }
};

Beautifier.prototype.print_newline = function(force_newline, preserve_statement_flags) {
  if (!preserve_statement_flags) {
    if (this._flags.last_token.text !== ';' && this._flags.last_token.text !== ',' && this._flags.last_token.text !== '=' && (this._flags.last_token.type !== TOKEN$2.OPERATOR || this._flags.last_token.text === '--' || this._flags.last_token.text === '++')) {
      var next_token = this._tokens.peek();
      while (this._flags.mode === MODE.Statement &&
        !(this._flags.if_block && reserved_word(next_token, 'else')) &&
        !this._flags.do_block) {
        this.restore_mode();
      }
    }
  }

  if (this._output.add_new_line(force_newline)) {
    this._flags.multiline_frame = true;
  }
};

Beautifier.prototype.print_token_line_indentation = function(current_token) {
  if (this._output.just_added_newline()) {
    if (this._options.keep_array_indentation &&
      current_token.newlines &&
      (current_token.text === '[' || is_array(this._flags.mode))) {
      this._output.current_line.set_indent(-1);
      this._output.current_line.push(current_token.whitespace_before);
      this._output.space_before_token = false;
    } else if (this._output.set_indent(this._flags.indentation_level, this._flags.alignment)) {
      this._flags.line_indent_level = this._flags.indentation_level;
    }
  }
};

Beautifier.prototype.print_token = function(current_token) {
  if (this._output.raw) {
    this._output.add_raw_token(current_token);
    return;
  }

  if (this._options.comma_first && current_token.previous && current_token.previous.type === TOKEN$2.COMMA &&
    this._output.just_added_newline()) {
    if (this._output.previous_line.last() === ',') {
      var popped = this._output.previous_line.pop();
      // if the comma was already at the start of the line,
      // pull back onto that line and reprint the indentation
      if (this._output.previous_line.is_empty()) {
        this._output.previous_line.push(popped);
        this._output.trim(true);
        this._output.current_line.pop();
        this._output.trim();
      }

      // add the comma in front of the next token
      this.print_token_line_indentation(current_token);
      this._output.add_token(',');
      this._output.space_before_token = true;
    }
  }

  this.print_token_line_indentation(current_token);
  this._output.non_breaking_space = true;
  this._output.add_token(current_token.text);
  if (this._output.previous_token_wrapped) {
    this._flags.multiline_frame = true;
  }
};

Beautifier.prototype.indent = function() {
  this._flags.indentation_level += 1;
  this._output.set_indent(this._flags.indentation_level, this._flags.alignment);
};

Beautifier.prototype.deindent = function() {
  if (this._flags.indentation_level > 0 &&
    ((!this._flags.parent) || this._flags.indentation_level > this._flags.parent.indentation_level)) {
    this._flags.indentation_level -= 1;
    this._output.set_indent(this._flags.indentation_level, this._flags.alignment);
  }
};

Beautifier.prototype.set_mode = function(mode) {
  if (this._flags) {
    this._flag_store.push(this._flags);
    this._previous_flags = this._flags;
  } else {
    this._previous_flags = this.create_flags(null, mode);
  }

  this._flags = this.create_flags(this._previous_flags, mode);
  this._output.set_indent(this._flags.indentation_level, this._flags.alignment);
};


Beautifier.prototype.restore_mode = function() {
  if (this._flag_store.length > 0) {
    this._previous_flags = this._flags;
    this._flags = this._flag_store.pop();
    if (this._previous_flags.mode === MODE.Statement) {
      remove_redundant_indentation(this._output, this._previous_flags);
    }
    this._output.set_indent(this._flags.indentation_level, this._flags.alignment);
  }
};

Beautifier.prototype.start_of_object_property = function() {
  return this._flags.parent.mode === MODE.ObjectLiteral && this._flags.mode === MODE.Statement && (
    (this._flags.last_token.text === ':' && this._flags.ternary_depth === 0) || (reserved_array(this._flags.last_token, ['get', 'set'])));
};

Beautifier.prototype.start_of_statement = function(current_token) {
  var start = false;
  start = start || reserved_array(this._flags.last_token, ['var', 'let', 'const']) && current_token.type === TOKEN$2.WORD;
  start = start || reserved_word(this._flags.last_token, 'do');
  start = start || (!(this._flags.parent.mode === MODE.ObjectLiteral && this._flags.mode === MODE.Statement)) && reserved_array(this._flags.last_token, newline_restricted_tokens) && !current_token.newlines;
  start = start || reserved_word(this._flags.last_token, 'else') &&
    !(reserved_word(current_token, 'if') && !current_token.comments_before);
  start = start || (this._flags.last_token.type === TOKEN$2.END_EXPR && (this._previous_flags.mode === MODE.ForInitializer || this._previous_flags.mode === MODE.Conditional));
  start = start || (this._flags.last_token.type === TOKEN$2.WORD && this._flags.mode === MODE.BlockStatement &&
    !this._flags.in_case &&
    !(current_token.text === '--' || current_token.text === '++') &&
    this._last_last_text !== 'function' &&
    current_token.type !== TOKEN$2.WORD && current_token.type !== TOKEN$2.RESERVED);
  start = start || (this._flags.mode === MODE.ObjectLiteral && (
    (this._flags.last_token.text === ':' && this._flags.ternary_depth === 0) || reserved_array(this._flags.last_token, ['get', 'set'])));

  if (start) {
    this.set_mode(MODE.Statement);
    this.indent();

    this.handle_whitespace_and_comments(current_token, true);

    // Issue #276:
    // If starting a new statement with [if, for, while, do], push to a new line.
    // if (a) if (b) if(c) d(); else e(); else f();
    if (!this.start_of_object_property()) {
      this.allow_wrap_or_preserved_newline(current_token,
        reserved_array(current_token, ['do', 'for', 'if', 'while']));
    }
    return true;
  }
  return false;
};

Beautifier.prototype.handle_start_expr = function(current_token) {
  // The conditional starts the statement if appropriate.
  if (!this.start_of_statement(current_token)) {
    this.handle_whitespace_and_comments(current_token);
  }

  var next_mode = MODE.Expression;
  if (current_token.text === '[') {

    if (this._flags.last_token.type === TOKEN$2.WORD || this._flags.last_token.text === ')') {
      // this is array index specifier, break immediately
      // a[x], fn()[x]
      if (reserved_array(this._flags.last_token, line_starters$1)) {
        this._output.space_before_token = true;
      }
      this.print_token(current_token);
      this.set_mode(next_mode);
      this.indent();
      if (this._options.space_in_paren) {
        this._output.space_before_token = true;
      }
      return;
    }

    next_mode = MODE.ArrayLiteral;
    if (is_array(this._flags.mode)) {
      if (this._flags.last_token.text === '[' ||
        (this._flags.last_token.text === ',' && (this._last_last_text === ']' || this._last_last_text === '}'))) {
        // ], [ goes to new line
        // }, [ goes to new line
        if (!this._options.keep_array_indentation) {
          this.print_newline();
        }
      }
    }

    if (!in_array$1(this._flags.last_token.type, [TOKEN$2.START_EXPR, TOKEN$2.END_EXPR, TOKEN$2.WORD, TOKEN$2.OPERATOR])) {
      this._output.space_before_token = true;
    }
  } else {
    if (this._flags.last_token.type === TOKEN$2.RESERVED) {
      if (this._flags.last_token.text === 'for') {
        this._output.space_before_token = this._options.space_before_conditional;
        next_mode = MODE.ForInitializer;
      } else if (in_array$1(this._flags.last_token.text, ['if', 'while'])) {
        this._output.space_before_token = this._options.space_before_conditional;
        next_mode = MODE.Conditional;
      } else if (in_array$1(this._flags.last_word, ['await', 'async'])) {
        // Should be a space between await and an IIFE, or async and an arrow function
        this._output.space_before_token = true;
      } else if (this._flags.last_token.text === 'import' && current_token.whitespace_before === '') {
        this._output.space_before_token = false;
      } else if (in_array$1(this._flags.last_token.text, line_starters$1) || this._flags.last_token.text === 'catch') {
        this._output.space_before_token = true;
      }
    } else if (this._flags.last_token.type === TOKEN$2.EQUALS || this._flags.last_token.type === TOKEN$2.OPERATOR) {
      // Support of this kind of newline preservation.
      // a = (b &&
      //     (c || d));
      if (!this.start_of_object_property()) {
        this.allow_wrap_or_preserved_newline(current_token);
      }
    } else if (this._flags.last_token.type === TOKEN$2.WORD) {
      this._output.space_before_token = false;

      // function name() vs function name ()
      // function* name() vs function* name ()
      // async name() vs async name ()
      // In ES6, you can also define the method properties of an object
      // var obj = {a: function() {}}
      // It can be abbreviated
      // var obj = {a() {}}
      // var obj = { a() {}} vs var obj = { a () {}}
      // var obj = { * a() {}} vs var obj = { * a () {}}
      var peek_back_two = this._tokens.peek(-3);
      if (this._options.space_after_named_function && peek_back_two) {
        // peek starts at next character so -1 is current token
        var peek_back_three = this._tokens.peek(-4);
        if (reserved_array(peek_back_two, ['async', 'function']) ||
          (peek_back_two.text === '*' && reserved_array(peek_back_three, ['async', 'function']))) {
          this._output.space_before_token = true;
        } else if (this._flags.mode === MODE.ObjectLiteral) {
          if ((peek_back_two.text === '{' || peek_back_two.text === ',') ||
            (peek_back_two.text === '*' && (peek_back_three.text === '{' || peek_back_three.text === ','))) {
            this._output.space_before_token = true;
          }
        }
      }
    } else {
      // Support preserving wrapped arrow function expressions
      // a.b('c',
      //     () => d.e
      // )
      this.allow_wrap_or_preserved_newline(current_token);
    }

    // function() vs function ()
    // yield*() vs yield* ()
    // function*() vs function* ()
    if ((this._flags.last_token.type === TOKEN$2.RESERVED && (this._flags.last_word === 'function' || this._flags.last_word === 'typeof')) ||
      (this._flags.last_token.text === '*' &&
        (in_array$1(this._last_last_text, ['function', 'yield']) ||
          (this._flags.mode === MODE.ObjectLiteral && in_array$1(this._last_last_text, ['{', ',']))))) {
      this._output.space_before_token = this._options.space_after_anon_function;
    }
  }

  if (this._flags.last_token.text === ';' || this._flags.last_token.type === TOKEN$2.START_BLOCK) {
    this.print_newline();
  } else if (this._flags.last_token.type === TOKEN$2.END_EXPR || this._flags.last_token.type === TOKEN$2.START_EXPR || this._flags.last_token.type === TOKEN$2.END_BLOCK || this._flags.last_token.text === '.' || this._flags.last_token.type === TOKEN$2.COMMA) {
    // do nothing on (( and )( and ][ and ]( and .(
    // TODO: Consider whether forcing this is required.  Review failing tests when removed.
    this.allow_wrap_or_preserved_newline(current_token, current_token.newlines);
  }

  this.print_token(current_token);
  this.set_mode(next_mode);
  if (this._options.space_in_paren) {
    this._output.space_before_token = true;
  }

  // In all cases, if we newline while inside an expression it should be indented.
  this.indent();
};

Beautifier.prototype.handle_end_expr = function(current_token) {
  // statements inside expressions are not valid syntax, but...
  // statements must all be closed when their container closes
  while (this._flags.mode === MODE.Statement) {
    this.restore_mode();
  }

  this.handle_whitespace_and_comments(current_token);

  if (this._flags.multiline_frame) {
    this.allow_wrap_or_preserved_newline(current_token,
      current_token.text === ']' && is_array(this._flags.mode) && !this._options.keep_array_indentation);
  }

  if (this._options.space_in_paren) {
    if (this._flags.last_token.type === TOKEN$2.START_EXPR && !this._options.space_in_empty_paren) {
      // () [] no inner space in empty parens like these, ever, ref #320
      this._output.trim();
      this._output.space_before_token = false;
    } else {
      this._output.space_before_token = true;
    }
  }
  this.deindent();
  this.print_token(current_token);
  this.restore_mode();

  remove_redundant_indentation(this._output, this._previous_flags);

  // do {} while () // no statement required after
  if (this._flags.do_while && this._previous_flags.mode === MODE.Conditional) {
    this._previous_flags.mode = MODE.Expression;
    this._flags.do_block = false;
    this._flags.do_while = false;

  }
};

Beautifier.prototype.handle_start_block = function(current_token) {
  this.handle_whitespace_and_comments(current_token);

  // Check if this is should be treated as a ObjectLiteral
  var next_token = this._tokens.peek();
  var second_token = this._tokens.peek(1);
  if (this._flags.last_word === 'switch' && this._flags.last_token.type === TOKEN$2.END_EXPR) {
    this.set_mode(MODE.BlockStatement);
    this._flags.in_case_statement = true;
  } else if (this._flags.case_body) {
    this.set_mode(MODE.BlockStatement);
  } else if (second_token && (
      (in_array$1(second_token.text, [':', ',']) && in_array$1(next_token.type, [TOKEN$2.STRING, TOKEN$2.WORD, TOKEN$2.RESERVED])) ||
      (in_array$1(next_token.text, ['get', 'set', '...']) && in_array$1(second_token.type, [TOKEN$2.WORD, TOKEN$2.RESERVED]))
    )) {
    // We don't support TypeScript,but we didn't break it for a very long time.
    // We'll try to keep not breaking it.
    if (!in_array$1(this._last_last_text, ['class', 'interface'])) {
      this.set_mode(MODE.ObjectLiteral);
    } else {
      this.set_mode(MODE.BlockStatement);
    }
  } else if (this._flags.last_token.type === TOKEN$2.OPERATOR && this._flags.last_token.text === '=>') {
    // arrow function: (param1, paramN) => { statements }
    this.set_mode(MODE.BlockStatement);
  } else if (in_array$1(this._flags.last_token.type, [TOKEN$2.EQUALS, TOKEN$2.START_EXPR, TOKEN$2.COMMA, TOKEN$2.OPERATOR]) ||
    reserved_array(this._flags.last_token, ['return', 'throw', 'import', 'default'])
  ) {
    // Detecting shorthand function syntax is difficult by scanning forward,
    //     so check the surrounding context.
    // If the block is being returned, imported, export default, passed as arg,
    //     assigned with = or assigned in a nested object, treat as an ObjectLiteral.
    this.set_mode(MODE.ObjectLiteral);
  } else {
    this.set_mode(MODE.BlockStatement);
  }

  var empty_braces = !next_token.comments_before && next_token.text === '}';
  var empty_anonymous_function = empty_braces && this._flags.last_word === 'function' &&
    this._flags.last_token.type === TOKEN$2.END_EXPR;

  if (this._options.brace_preserve_inline) // check for inline, set inline_frame if so
  {
    // search forward for a newline wanted inside this block
    var index = 0;
    var check_token = null;
    this._flags.inline_frame = true;
    do {
      index += 1;
      check_token = this._tokens.peek(index - 1);
      if (check_token.newlines) {
        this._flags.inline_frame = false;
        break;
      }
    } while (check_token.type !== TOKEN$2.EOF &&
      !(check_token.type === TOKEN$2.END_BLOCK && check_token.opened === current_token));
  }

  if ((this._options.brace_style === "expand" ||
      (this._options.brace_style === "none" && current_token.newlines)) &&
    !this._flags.inline_frame) {
    if (this._flags.last_token.type !== TOKEN$2.OPERATOR &&
      (empty_anonymous_function ||
        this._flags.last_token.type === TOKEN$2.EQUALS ||
        (reserved_array(this._flags.last_token, special_words) && this._flags.last_token.text !== 'else'))) {
      this._output.space_before_token = true;
    } else {
      this.print_newline(false, true);
    }
  } else { // collapse || inline_frame
    if (is_array(this._previous_flags.mode) && (this._flags.last_token.type === TOKEN$2.START_EXPR || this._flags.last_token.type === TOKEN$2.COMMA)) {
      if (this._flags.last_token.type === TOKEN$2.COMMA || this._options.space_in_paren) {
        this._output.space_before_token = true;
      }

      if (this._flags.last_token.type === TOKEN$2.COMMA || (this._flags.last_token.type === TOKEN$2.START_EXPR && this._flags.inline_frame)) {
        this.allow_wrap_or_preserved_newline(current_token);
        this._previous_flags.multiline_frame = this._previous_flags.multiline_frame || this._flags.multiline_frame;
        this._flags.multiline_frame = false;
      }
    }
    if (this._flags.last_token.type !== TOKEN$2.OPERATOR && this._flags.last_token.type !== TOKEN$2.START_EXPR) {
      if (this._flags.last_token.type === TOKEN$2.START_BLOCK && !this._flags.inline_frame) {
        this.print_newline();
      } else {
        this._output.space_before_token = true;
      }
    }
  }
  this.print_token(current_token);
  this.indent();

  // Except for specific cases, open braces are followed by a new line.
  if (!empty_braces && !(this._options.brace_preserve_inline && this._flags.inline_frame)) {
    this.print_newline();
  }
};

Beautifier.prototype.handle_end_block = function(current_token) {
  // statements must all be closed when their container closes
  this.handle_whitespace_and_comments(current_token);

  while (this._flags.mode === MODE.Statement) {
    this.restore_mode();
  }

  var empty_braces = this._flags.last_token.type === TOKEN$2.START_BLOCK;

  if (this._flags.inline_frame && !empty_braces) { // try inline_frame (only set if this._options.braces-preserve-inline) first
    this._output.space_before_token = true;
  } else if (this._options.brace_style === "expand") {
    if (!empty_braces) {
      this.print_newline();
    }
  } else {
    // skip {}
    if (!empty_braces) {
      if (is_array(this._flags.mode) && this._options.keep_array_indentation) {
        // we REALLY need a newline here, but newliner would skip that
        this._options.keep_array_indentation = false;
        this.print_newline();
        this._options.keep_array_indentation = true;

      } else {
        this.print_newline();
      }
    }
  }
  this.restore_mode();
  this.print_token(current_token);
};

Beautifier.prototype.handle_word = function(current_token) {
  if (current_token.type === TOKEN$2.RESERVED) {
    if (in_array$1(current_token.text, ['set', 'get']) && this._flags.mode !== MODE.ObjectLiteral) {
      current_token.type = TOKEN$2.WORD;
    } else if (current_token.text === 'import' && this._tokens.peek().text === '(') {
      current_token.type = TOKEN$2.WORD;
    } else if (in_array$1(current_token.text, ['as', 'from']) && !this._flags.import_block) {
      current_token.type = TOKEN$2.WORD;
    } else if (this._flags.mode === MODE.ObjectLiteral) {
      var next_token = this._tokens.peek();
      if (next_token.text === ':') {
        current_token.type = TOKEN$2.WORD;
      }
    }
  }

  if (this.start_of_statement(current_token)) {
    // The conditional starts the statement if appropriate.
    if (reserved_array(this._flags.last_token, ['var', 'let', 'const']) && current_token.type === TOKEN$2.WORD) {
      this._flags.declaration_statement = true;
    }
  } else if (current_token.newlines && !is_expression(this._flags.mode) &&
    (this._flags.last_token.type !== TOKEN$2.OPERATOR || (this._flags.last_token.text === '--' || this._flags.last_token.text === '++')) &&
    this._flags.last_token.type !== TOKEN$2.EQUALS &&
    (this._options.preserve_newlines || !reserved_array(this._flags.last_token, ['var', 'let', 'const', 'set', 'get']))) {
    this.handle_whitespace_and_comments(current_token);
    this.print_newline();
  } else {
    this.handle_whitespace_and_comments(current_token);
  }

  if (this._flags.do_block && !this._flags.do_while) {
    if (reserved_word(current_token, 'while')) {
      // do {} ## while ()
      this._output.space_before_token = true;
      this.print_token(current_token);
      this._output.space_before_token = true;
      this._flags.do_while = true;
      return;
    } else {
      // do {} should always have while as the next word.
      // if we don't see the expected while, recover
      this.print_newline();
      this._flags.do_block = false;
    }
  }

  // if may be followed by else, or not
  // Bare/inline ifs are tricky
  // Need to unwind the modes correctly: if (a) if (b) c(); else d(); else e();
  if (this._flags.if_block) {
    if (!this._flags.else_block && reserved_word(current_token, 'else')) {
      this._flags.else_block = true;
    } else {
      while (this._flags.mode === MODE.Statement) {
        this.restore_mode();
      }
      this._flags.if_block = false;
      this._flags.else_block = false;
    }
  }

  if (this._flags.in_case_statement && reserved_array(current_token, ['case', 'default'])) {
    this.print_newline();
    if (this._flags.last_token.type !== TOKEN$2.END_BLOCK && (this._flags.case_body || this._options.jslint_happy)) {
      // switch cases following one another
      this.deindent();
    }
    this._flags.case_body = false;

    this.print_token(current_token);
    this._flags.in_case = true;
    return;
  }

  if (this._flags.last_token.type === TOKEN$2.COMMA || this._flags.last_token.type === TOKEN$2.START_EXPR || this._flags.last_token.type === TOKEN$2.EQUALS || this._flags.last_token.type === TOKEN$2.OPERATOR) {
    if (!this.start_of_object_property()) {
      this.allow_wrap_or_preserved_newline(current_token);
    }
  }

  if (reserved_word(current_token, 'function')) {
    if (in_array$1(this._flags.last_token.text, ['}', ';']) ||
      (this._output.just_added_newline() && !(in_array$1(this._flags.last_token.text, ['(', '[', '{', ':', '=', ',']) || this._flags.last_token.type === TOKEN$2.OPERATOR))) {
      // make sure there is a nice clean space of at least one blank line
      // before a new function definition
      if (!this._output.just_added_blankline() && !current_token.comments_before) {
        this.print_newline();
        this.print_newline(true);
      }
    }
    if (this._flags.last_token.type === TOKEN$2.RESERVED || this._flags.last_token.type === TOKEN$2.WORD) {
      if (reserved_array(this._flags.last_token, ['get', 'set', 'new', 'export']) ||
        reserved_array(this._flags.last_token, newline_restricted_tokens)) {
        this._output.space_before_token = true;
      } else if (reserved_word(this._flags.last_token, 'default') && this._last_last_text === 'export') {
        this._output.space_before_token = true;
      } else if (this._flags.last_token.text === 'declare') {
        // accomodates Typescript declare function formatting
        this._output.space_before_token = true;
      } else {
        this.print_newline();
      }
    } else if (this._flags.last_token.type === TOKEN$2.OPERATOR || this._flags.last_token.text === '=') {
      // foo = function
      this._output.space_before_token = true;
    } else if (!this._flags.multiline_frame && (is_expression(this._flags.mode) || is_array(this._flags.mode))) ; else {
      this.print_newline();
    }

    this.print_token(current_token);
    this._flags.last_word = current_token.text;
    return;
  }

  var prefix = 'NONE';

  if (this._flags.last_token.type === TOKEN$2.END_BLOCK) {

    if (this._previous_flags.inline_frame) {
      prefix = 'SPACE';
    } else if (!reserved_array(current_token, ['else', 'catch', 'finally', 'from'])) {
      prefix = 'NEWLINE';
    } else {
      if (this._options.brace_style === "expand" ||
        this._options.brace_style === "end-expand" ||
        (this._options.brace_style === "none" && current_token.newlines)) {
        prefix = 'NEWLINE';
      } else {
        prefix = 'SPACE';
        this._output.space_before_token = true;
      }
    }
  } else if (this._flags.last_token.type === TOKEN$2.SEMICOLON && this._flags.mode === MODE.BlockStatement) {
    // TODO: Should this be for STATEMENT as well?
    prefix = 'NEWLINE';
  } else if (this._flags.last_token.type === TOKEN$2.SEMICOLON && is_expression(this._flags.mode)) {
    prefix = 'SPACE';
  } else if (this._flags.last_token.type === TOKEN$2.STRING) {
    prefix = 'NEWLINE';
  } else if (this._flags.last_token.type === TOKEN$2.RESERVED || this._flags.last_token.type === TOKEN$2.WORD ||
    (this._flags.last_token.text === '*' &&
      (in_array$1(this._last_last_text, ['function', 'yield']) ||
        (this._flags.mode === MODE.ObjectLiteral && in_array$1(this._last_last_text, ['{', ',']))))) {
    prefix = 'SPACE';
  } else if (this._flags.last_token.type === TOKEN$2.START_BLOCK) {
    if (this._flags.inline_frame) {
      prefix = 'SPACE';
    } else {
      prefix = 'NEWLINE';
    }
  } else if (this._flags.last_token.type === TOKEN$2.END_EXPR) {
    this._output.space_before_token = true;
    prefix = 'NEWLINE';
  }

  if (reserved_array(current_token, line_starters$1) && this._flags.last_token.text !== ')') {
    if (this._flags.inline_frame || this._flags.last_token.text === 'else' || this._flags.last_token.text === 'export') {
      prefix = 'SPACE';
    } else {
      prefix = 'NEWLINE';
    }

  }

  if (reserved_array(current_token, ['else', 'catch', 'finally'])) {
    if ((!(this._flags.last_token.type === TOKEN$2.END_BLOCK && this._previous_flags.mode === MODE.BlockStatement) ||
        this._options.brace_style === "expand" ||
        this._options.brace_style === "end-expand" ||
        (this._options.brace_style === "none" && current_token.newlines)) &&
      !this._flags.inline_frame) {
      this.print_newline();
    } else {
      this._output.trim(true);
      var line = this._output.current_line;
      // If we trimmed and there's something other than a close block before us
      // put a newline back in.  Handles '} // comment' scenario.
      if (line.last() !== '}') {
        this.print_newline();
      }
      this._output.space_before_token = true;
    }
  } else if (prefix === 'NEWLINE') {
    if (reserved_array(this._flags.last_token, special_words)) {
      // no newline between 'return nnn'
      this._output.space_before_token = true;
    } else if (this._flags.last_token.text === 'declare' && reserved_array(current_token, ['var', 'let', 'const'])) {
      // accomodates Typescript declare formatting
      this._output.space_before_token = true;
    } else if (this._flags.last_token.type !== TOKEN$2.END_EXPR) {
      if ((this._flags.last_token.type !== TOKEN$2.START_EXPR || !reserved_array(current_token, ['var', 'let', 'const'])) && this._flags.last_token.text !== ':') {
        // no need to force newline on 'var': for (var x = 0...)
        if (reserved_word(current_token, 'if') && reserved_word(current_token.previous, 'else')) {
          // no newline for } else if {
          this._output.space_before_token = true;
        } else {
          this.print_newline();
        }
      }
    } else if (reserved_array(current_token, line_starters$1) && this._flags.last_token.text !== ')') {
      this.print_newline();
    }
  } else if (this._flags.multiline_frame && is_array(this._flags.mode) && this._flags.last_token.text === ',' && this._last_last_text === '}') {
    this.print_newline(); // }, in lists get a newline treatment
  } else if (prefix === 'SPACE') {
    this._output.space_before_token = true;
  }
  if (current_token.previous && (current_token.previous.type === TOKEN$2.WORD || current_token.previous.type === TOKEN$2.RESERVED)) {
    this._output.space_before_token = true;
  }
  this.print_token(current_token);
  this._flags.last_word = current_token.text;

  if (current_token.type === TOKEN$2.RESERVED) {
    if (current_token.text === 'do') {
      this._flags.do_block = true;
    } else if (current_token.text === 'if') {
      this._flags.if_block = true;
    } else if (current_token.text === 'import') {
      this._flags.import_block = true;
    } else if (this._flags.import_block && reserved_word(current_token, 'from')) {
      this._flags.import_block = false;
    }
  }
};

Beautifier.prototype.handle_semicolon = function(current_token) {
  if (this.start_of_statement(current_token)) {
    // The conditional starts the statement if appropriate.
    // Semicolon can be the start (and end) of a statement
    this._output.space_before_token = false;
  } else {
    this.handle_whitespace_and_comments(current_token);
  }

  var next_token = this._tokens.peek();
  while (this._flags.mode === MODE.Statement &&
    !(this._flags.if_block && reserved_word(next_token, 'else')) &&
    !this._flags.do_block) {
    this.restore_mode();
  }

  // hacky but effective for the moment
  if (this._flags.import_block) {
    this._flags.import_block = false;
  }
  this.print_token(current_token);
};

Beautifier.prototype.handle_string = function(current_token) {
  if (this.start_of_statement(current_token)) {
    // The conditional starts the statement if appropriate.
    // One difference - strings want at least a space before
    this._output.space_before_token = true;
  } else {
    this.handle_whitespace_and_comments(current_token);
    if (this._flags.last_token.type === TOKEN$2.RESERVED || this._flags.last_token.type === TOKEN$2.WORD || this._flags.inline_frame) {
      this._output.space_before_token = true;
    } else if (this._flags.last_token.type === TOKEN$2.COMMA || this._flags.last_token.type === TOKEN$2.START_EXPR || this._flags.last_token.type === TOKEN$2.EQUALS || this._flags.last_token.type === TOKEN$2.OPERATOR) {
      if (!this.start_of_object_property()) {
        this.allow_wrap_or_preserved_newline(current_token);
      }
    } else {
      this.print_newline();
    }
  }
  this.print_token(current_token);
};

Beautifier.prototype.handle_equals = function(current_token) {
  if (this.start_of_statement(current_token)) ; else {
    this.handle_whitespace_and_comments(current_token);
  }

  if (this._flags.declaration_statement) {
    // just got an '=' in a var-line, different formatting/line-breaking, etc will now be done
    this._flags.declaration_assignment = true;
  }
  this._output.space_before_token = true;
  this.print_token(current_token);
  this._output.space_before_token = true;
};

Beautifier.prototype.handle_comma = function(current_token) {
  this.handle_whitespace_and_comments(current_token, true);

  this.print_token(current_token);
  this._output.space_before_token = true;
  if (this._flags.declaration_statement) {
    if (is_expression(this._flags.parent.mode)) {
      // do not break on comma, for(var a = 1, b = 2)
      this._flags.declaration_assignment = false;
    }

    if (this._flags.declaration_assignment) {
      this._flags.declaration_assignment = false;
      this.print_newline(false, true);
    } else if (this._options.comma_first) {
      // for comma-first, we want to allow a newline before the comma
      // to turn into a newline after the comma, which we will fixup later
      this.allow_wrap_or_preserved_newline(current_token);
    }
  } else if (this._flags.mode === MODE.ObjectLiteral ||
    (this._flags.mode === MODE.Statement && this._flags.parent.mode === MODE.ObjectLiteral)) {
    if (this._flags.mode === MODE.Statement) {
      this.restore_mode();
    }

    if (!this._flags.inline_frame) {
      this.print_newline();
    }
  } else if (this._options.comma_first) {
    // EXPR or DO_BLOCK
    // for comma-first, we want to allow a newline before the comma
    // to turn into a newline after the comma, which we will fixup later
    this.allow_wrap_or_preserved_newline(current_token);
  }
};

Beautifier.prototype.handle_operator = function(current_token) {
  var isGeneratorAsterisk = current_token.text === '*' &&
    (reserved_array(this._flags.last_token, ['function', 'yield']) ||
      (in_array$1(this._flags.last_token.type, [TOKEN$2.START_BLOCK, TOKEN$2.COMMA, TOKEN$2.END_BLOCK, TOKEN$2.SEMICOLON]))
    );
  var isUnary = in_array$1(current_token.text, ['-', '+']) && (
    in_array$1(this._flags.last_token.type, [TOKEN$2.START_BLOCK, TOKEN$2.START_EXPR, TOKEN$2.EQUALS, TOKEN$2.OPERATOR]) ||
    in_array$1(this._flags.last_token.text, line_starters$1) ||
    this._flags.last_token.text === ','
  );

  if (this.start_of_statement(current_token)) ; else {
    var preserve_statement_flags = !isGeneratorAsterisk;
    this.handle_whitespace_and_comments(current_token, preserve_statement_flags);
  }

  if (reserved_array(this._flags.last_token, special_words)) {
    // "return" had a special handling in TK_WORD. Now we need to return the favor
    this._output.space_before_token = true;
    this.print_token(current_token);
    return;
  }

  // hack for actionscript's import .*;
  if (current_token.text === '*' && this._flags.last_token.type === TOKEN$2.DOT) {
    this.print_token(current_token);
    return;
  }

  if (current_token.text === '::') {
    // no spaces around exotic namespacing syntax operator
    this.print_token(current_token);
    return;
  }

  // Allow line wrapping between operators when operator_position is
  //   set to before or preserve
  if (this._flags.last_token.type === TOKEN$2.OPERATOR && in_array$1(this._options.operator_position, OPERATOR_POSITION_BEFORE_OR_PRESERVE)) {
    this.allow_wrap_or_preserved_newline(current_token);
  }

  if (current_token.text === ':' && this._flags.in_case) {
    this.print_token(current_token);

    this._flags.in_case = false;
    this._flags.case_body = true;
    if (this._tokens.peek().type !== TOKEN$2.START_BLOCK) {
      this.indent();
      this.print_newline();
    } else {
      this._output.space_before_token = true;
    }
    return;
  }

  var space_before = true;
  var space_after = true;
  var in_ternary = false;
  if (current_token.text === ':') {
    if (this._flags.ternary_depth === 0) {
      // Colon is invalid javascript outside of ternary and object, but do our best to guess what was meant.
      space_before = false;
    } else {
      this._flags.ternary_depth -= 1;
      in_ternary = true;
    }
  } else if (current_token.text === '?') {
    this._flags.ternary_depth += 1;
  }

  // let's handle the operator_position option prior to any conflicting logic
  if (!isUnary && !isGeneratorAsterisk && this._options.preserve_newlines && in_array$1(current_token.text, positionable_operators$1)) {
    var isColon = current_token.text === ':';
    var isTernaryColon = (isColon && in_ternary);
    var isOtherColon = (isColon && !in_ternary);

    switch (this._options.operator_position) {
      case OPERATOR_POSITION.before_newline:
        // if the current token is : and it's not a ternary statement then we set space_before to false
        this._output.space_before_token = !isOtherColon;

        this.print_token(current_token);

        if (!isColon || isTernaryColon) {
          this.allow_wrap_or_preserved_newline(current_token);
        }

        this._output.space_before_token = true;
        return;

      case OPERATOR_POSITION.after_newline:
        // if the current token is anything but colon, or (via deduction) it's a colon and in a ternary statement,
        //   then print a newline.

        this._output.space_before_token = true;

        if (!isColon || isTernaryColon) {
          if (this._tokens.peek().newlines) {
            this.print_newline(false, true);
          } else {
            this.allow_wrap_or_preserved_newline(current_token);
          }
        } else {
          this._output.space_before_token = false;
        }

        this.print_token(current_token);

        this._output.space_before_token = true;
        return;

      case OPERATOR_POSITION.preserve_newline:
        if (!isOtherColon) {
          this.allow_wrap_or_preserved_newline(current_token);
        }

        // if we just added a newline, or the current token is : and it's not a ternary statement,
        //   then we set space_before to false
        space_before = !(this._output.just_added_newline() || isOtherColon);

        this._output.space_before_token = space_before;
        this.print_token(current_token);
        this._output.space_before_token = true;
        return;
    }
  }

  if (isGeneratorAsterisk) {
    this.allow_wrap_or_preserved_newline(current_token);
    space_before = false;
    var next_token = this._tokens.peek();
    space_after = next_token && in_array$1(next_token.type, [TOKEN$2.WORD, TOKEN$2.RESERVED]);
  } else if (current_token.text === '...') {
    this.allow_wrap_or_preserved_newline(current_token);
    space_before = this._flags.last_token.type === TOKEN$2.START_BLOCK;
    space_after = false;
  } else if (in_array$1(current_token.text, ['--', '++', '!', '~']) || isUnary) {
    // unary operators (and binary +/- pretending to be unary) special cases
    if (this._flags.last_token.type === TOKEN$2.COMMA || this._flags.last_token.type === TOKEN$2.START_EXPR) {
      this.allow_wrap_or_preserved_newline(current_token);
    }

    space_before = false;
    space_after = false;

    // http://www.ecma-international.org/ecma-262/5.1/#sec-7.9.1
    // if there is a newline between -- or ++ and anything else we should preserve it.
    if (current_token.newlines && (current_token.text === '--' || current_token.text === '++')) {
      this.print_newline(false, true);
    }

    if (this._flags.last_token.text === ';' && is_expression(this._flags.mode)) {
      // for (;; ++i)
      //        ^^^
      space_before = true;
    }

    if (this._flags.last_token.type === TOKEN$2.RESERVED) {
      space_before = true;
    } else if (this._flags.last_token.type === TOKEN$2.END_EXPR) {
      space_before = !(this._flags.last_token.text === ']' && (current_token.text === '--' || current_token.text === '++'));
    } else if (this._flags.last_token.type === TOKEN$2.OPERATOR) {
      // a++ + ++b;
      // a - -b
      space_before = in_array$1(current_token.text, ['--', '-', '++', '+']) && in_array$1(this._flags.last_token.text, ['--', '-', '++', '+']);
      // + and - are not unary when preceeded by -- or ++ operator
      // a-- + b
      // a * +b
      // a - -b
      if (in_array$1(current_token.text, ['+', '-']) && in_array$1(this._flags.last_token.text, ['--', '++'])) {
        space_after = true;
      }
    }


    if (((this._flags.mode === MODE.BlockStatement && !this._flags.inline_frame) || this._flags.mode === MODE.Statement) &&
      (this._flags.last_token.text === '{' || this._flags.last_token.text === ';')) {
      // { foo; --i }
      // foo(); --bar;
      this.print_newline();
    }
  }

  this._output.space_before_token = this._output.space_before_token || space_before;
  this.print_token(current_token);
  this._output.space_before_token = space_after;
};

Beautifier.prototype.handle_block_comment = function(current_token, preserve_statement_flags) {
  if (this._output.raw) {
    this._output.add_raw_token(current_token);
    if (current_token.directives && current_token.directives.preserve === 'end') {
      // If we're testing the raw output behavior, do not allow a directive to turn it off.
      this._output.raw = this._options.test_output_raw;
    }
    return;
  }

  if (current_token.directives) {
    this.print_newline(false, preserve_statement_flags);
    this.print_token(current_token);
    if (current_token.directives.preserve === 'start') {
      this._output.raw = true;
    }
    this.print_newline(false, true);
    return;
  }

  // inline block
  if (!acorn.newline.test(current_token.text) && !current_token.newlines) {
    this._output.space_before_token = true;
    this.print_token(current_token);
    this._output.space_before_token = true;
    return;
  } else {
    this.print_block_commment(current_token, preserve_statement_flags);
  }
};

Beautifier.prototype.print_block_commment = function(current_token, preserve_statement_flags) {
  var lines = split_linebreaks(current_token.text);
  var j; // iterator for this case
  var javadoc = false;
  var starless = false;
  var lastIndent = current_token.whitespace_before;
  var lastIndentLength = lastIndent.length;

  // block comment starts with a new line
  this.print_newline(false, preserve_statement_flags);

  // first line always indented
  this.print_token_line_indentation(current_token);
  this._output.add_token(lines[0]);
  this.print_newline(false, preserve_statement_flags);


  if (lines.length > 1) {
    lines = lines.slice(1);
    javadoc = all_lines_start_with(lines, '*');
    starless = each_line_matches_indent(lines, lastIndent);

    if (javadoc) {
      this._flags.alignment = 1;
    }

    for (j = 0; j < lines.length; j++) {
      if (javadoc) {
        // javadoc: reformat and re-indent
        this.print_token_line_indentation(current_token);
        this._output.add_token(ltrim(lines[j]));
      } else if (starless && lines[j]) {
        // starless: re-indent non-empty content, avoiding trim
        this.print_token_line_indentation(current_token);
        this._output.add_token(lines[j].substring(lastIndentLength));
      } else {
        // normal comments output raw
        this._output.current_line.set_indent(-1);
        this._output.add_token(lines[j]);
      }

      // for comments on their own line or  more than one line, make sure there's a new line after
      this.print_newline(false, preserve_statement_flags);
    }

    this._flags.alignment = 0;
  }
};


Beautifier.prototype.handle_comment = function(current_token, preserve_statement_flags) {
  if (current_token.newlines) {
    this.print_newline(false, preserve_statement_flags);
  } else {
    this._output.trim(true);
  }

  this._output.space_before_token = true;
  this.print_token(current_token);
  this.print_newline(false, preserve_statement_flags);
};

Beautifier.prototype.handle_dot = function(current_token) {
  if (this.start_of_statement(current_token)) ; else {
    this.handle_whitespace_and_comments(current_token, true);
  }

  if (reserved_array(this._flags.last_token, special_words)) {
    this._output.space_before_token = false;
  } else {
    // allow preserved newlines before dots in general
    // force newlines on dots after close paren when break_chained - for bar().baz()
    this.allow_wrap_or_preserved_newline(current_token,
      this._flags.last_token.text === ')' && this._options.break_chained_methods);
  }

  // Only unindent chained method dot if this dot starts a new line.
  // Otherwise the automatic extra indentation removal will handle the over indent
  if (this._options.unindent_chained_methods && this._output.just_added_newline()) {
    this.deindent();
  }

  this.print_token(current_token);
};

Beautifier.prototype.handle_unknown = function(current_token, preserve_statement_flags) {
  this.print_token(current_token);

  if (current_token.text[current_token.text.length - 1] === '\n') {
    this.print_newline(false, preserve_statement_flags);
  }
};

Beautifier.prototype.handle_eof = function(current_token) {
  // Unwind any open statements
  while (this._flags.mode === MODE.Statement) {
    this.restore_mode();
  }
  this.handle_whitespace_and_comments(current_token);
};

var Beautifier_1 = Beautifier;

var beautifier = {
	Beautifier: Beautifier_1
};

var Beautifier$1 = beautifier.Beautifier,
  Options$3 = options$1.Options;

function js_beautify(js_source_text, options) {
  var beautifier = new Beautifier$1(js_source_text, options);
  return beautifier.beautify();
}

var javascript = js_beautify;
var defaultOptions = function() {
  return new Options$3();
};
javascript.defaultOptions = defaultOptions;

var BaseOptions$1 = options.Options;

function Options$4(options) {
  BaseOptions$1.call(this, options, 'css');

  this.selector_separator_newline = this._get_boolean('selector_separator_newline', true);
  this.newline_between_rules = this._get_boolean('newline_between_rules', true);
  var space_around_selector_separator = this._get_boolean('space_around_selector_separator');
  this.space_around_combinator = this._get_boolean('space_around_combinator') || space_around_selector_separator;

}
Options$4.prototype = new BaseOptions$1();



var Options_1$2 = Options$4;

var options$2 = {
	Options: Options_1$2
};

var Options$5 = options$2.Options;
var Output$2 = output.Output;
var InputScanner$3 = inputscanner.InputScanner;
var Directives$2 = directives.Directives;

var directives_core$1 = new Directives$2(/\/\*/, /\*\//);

var lineBreak = /\r\n|[\r\n]/;
var allLineBreaks = /\r\n|[\r\n]/g;

// tokenizer
var whitespaceChar = /\s/;
var whitespacePattern = /(?:\s|\n)+/g;
var block_comment_pattern = /\/\*(?:[\s\S]*?)((?:\*\/)|$)/g;
var comment_pattern = /\/\/(?:[^\n\r\u2028\u2029]*)/g;

function Beautifier$2(source_text, options) {
  this._source_text = source_text || '';
  // Allow the setting of language/file-type specific options
  // with inheritance of overall settings
  this._options = new Options$5(options);
  this._ch = null;
  this._input = null;

  // https://developer.mozilla.org/en-US/docs/Web/CSS/At-rule
  this.NESTED_AT_RULE = {
    "@page": true,
    "@font-face": true,
    "@keyframes": true,
    // also in CONDITIONAL_GROUP_RULE below
    "@media": true,
    "@supports": true,
    "@document": true
  };
  this.CONDITIONAL_GROUP_RULE = {
    "@media": true,
    "@supports": true,
    "@document": true
  };

}

Beautifier$2.prototype.eatString = function(endChars) {
  var result = '';
  this._ch = this._input.next();
  while (this._ch) {
    result += this._ch;
    if (this._ch === "\\") {
      result += this._input.next();
    } else if (endChars.indexOf(this._ch) !== -1 || this._ch === "\n") {
      break;
    }
    this._ch = this._input.next();
  }
  return result;
};

// Skips any white space in the source text from the current position.
// When allowAtLeastOneNewLine is true, will output new lines for each
// newline character found; if the user has preserve_newlines off, only
// the first newline will be output
Beautifier$2.prototype.eatWhitespace = function(allowAtLeastOneNewLine) {
  var result = whitespaceChar.test(this._input.peek());
  var isFirstNewLine = true;

  while (whitespaceChar.test(this._input.peek())) {
    this._ch = this._input.next();
    if (allowAtLeastOneNewLine && this._ch === '\n') {
      if (this._options.preserve_newlines || isFirstNewLine) {
        isFirstNewLine = false;
        this._output.add_new_line(true);
      }
    }
  }
  return result;
};

// Nested pseudo-class if we are insideRule
// and the next special character found opens
// a new block
Beautifier$2.prototype.foundNestedPseudoClass = function() {
  var openParen = 0;
  var i = 1;
  var ch = this._input.peek(i);
  while (ch) {
    if (ch === "{") {
      return true;
    } else if (ch === '(') {
      // pseudoclasses can contain ()
      openParen += 1;
    } else if (ch === ')') {
      if (openParen === 0) {
        return false;
      }
      openParen -= 1;
    } else if (ch === ";" || ch === "}") {
      return false;
    }
    i++;
    ch = this._input.peek(i);
  }
  return false;
};

Beautifier$2.prototype.print_string = function(output_string) {
  this._output.set_indent(this._indentLevel);
  this._output.non_breaking_space = true;
  this._output.add_token(output_string);
};

Beautifier$2.prototype.preserveSingleSpace = function(isAfterSpace) {
  if (isAfterSpace) {
    this._output.space_before_token = true;
  }
};

Beautifier$2.prototype.indent = function() {
  this._indentLevel++;
};

Beautifier$2.prototype.outdent = function() {
  if (this._indentLevel > 0) {
    this._indentLevel--;
  }
};

/*_____________________--------------------_____________________*/

Beautifier$2.prototype.beautify = function() {
  if (this._options.disabled) {
    return this._source_text;
  }

  var source_text = this._source_text;
  var eol = this._options.eol;
  if (eol === 'auto') {
    eol = '\n';
    if (source_text && lineBreak.test(source_text || '')) {
      eol = source_text.match(lineBreak)[0];
    }
  }


  // HACK: newline parsing inconsistent. This brute force normalizes the this._input.
  source_text = source_text.replace(allLineBreaks, '\n');

  // reset
  var baseIndentString = source_text.match(/^[\t ]*/)[0];

  this._output = new Output$2(this._options, baseIndentString);
  this._input = new InputScanner$3(source_text);
  this._indentLevel = 0;
  this._nestedLevel = 0;

  this._ch = null;
  var parenLevel = 0;

  var insideRule = false;
  // This is the value side of a property value pair (blue in the following ex)
  // label { content: blue }
  var insidePropertyValue = false;
  var enteringConditionalGroup = false;
  var insideAtExtend = false;
  var insideAtImport = false;
  var topCharacter = this._ch;
  var whitespace;
  var isAfterSpace;
  var previous_ch;

  while (true) {
    whitespace = this._input.read(whitespacePattern);
    isAfterSpace = whitespace !== '';
    previous_ch = topCharacter;
    this._ch = this._input.next();
    if (this._ch === '\\' && this._input.hasNext()) {
      this._ch += this._input.next();
    }
    topCharacter = this._ch;

    if (!this._ch) {
      break;
    } else if (this._ch === '/' && this._input.peek() === '*') {
      // /* css comment */
      // Always start block comments on a new line.
      // This handles scenarios where a block comment immediately
      // follows a property definition on the same line or where
      // minified code is being beautified.
      this._output.add_new_line();
      this._input.back();

      var comment = this._input.read(block_comment_pattern);

      // Handle ignore directive
      var directives = directives_core$1.get_directives(comment);
      if (directives && directives.ignore === 'start') {
        comment += directives_core$1.readIgnored(this._input);
      }

      this.print_string(comment);

      // Ensures any new lines following the comment are preserved
      this.eatWhitespace(true);

      // Block comments are followed by a new line so they don't
      // share a line with other properties
      this._output.add_new_line();
    } else if (this._ch === '/' && this._input.peek() === '/') {
      // // single line comment
      // Preserves the space before a comment
      // on the same line as a rule
      this._output.space_before_token = true;
      this._input.back();
      this.print_string(this._input.read(comment_pattern));

      // Ensures any new lines following the comment are preserved
      this.eatWhitespace(true);
    } else if (this._ch === '@') {
      this.preserveSingleSpace(isAfterSpace);

      // deal with less propery mixins @{...}
      if (this._input.peek() === '{') {
        this.print_string(this._ch + this.eatString('}'));
      } else {
        this.print_string(this._ch);

        // strip trailing space, if present, for hash property checks
        var variableOrRule = this._input.peekUntilAfter(/[: ,;{}()[\]\/='"]/g);

        if (variableOrRule.match(/[ :]$/)) {
          // we have a variable or pseudo-class, add it and insert one space before continuing
          variableOrRule = this.eatString(": ").replace(/\s$/, '');
          this.print_string(variableOrRule);
          this._output.space_before_token = true;
        }

        variableOrRule = variableOrRule.replace(/\s$/, '');

        if (variableOrRule === 'extend') {
          insideAtExtend = true;
        } else if (variableOrRule === 'import') {
          insideAtImport = true;
        }

        // might be a nesting at-rule
        if (variableOrRule in this.NESTED_AT_RULE) {
          this._nestedLevel += 1;
          if (variableOrRule in this.CONDITIONAL_GROUP_RULE) {
            enteringConditionalGroup = true;
          }
          // might be less variable
        } else if (!insideRule && parenLevel === 0 && variableOrRule.indexOf(':') !== -1) {
          insidePropertyValue = true;
          this.indent();
        }
      }
    } else if (this._ch === '#' && this._input.peek() === '{') {
      this.preserveSingleSpace(isAfterSpace);
      this.print_string(this._ch + this.eatString('}'));
    } else if (this._ch === '{') {
      if (insidePropertyValue) {
        insidePropertyValue = false;
        this.outdent();
      }
      this.indent();
      this._output.space_before_token = true;
      this.print_string(this._ch);

      // when entering conditional groups, only rulesets are allowed
      if (enteringConditionalGroup) {
        enteringConditionalGroup = false;
        insideRule = (this._indentLevel > this._nestedLevel);
      } else {
        // otherwise, declarations are also allowed
        insideRule = (this._indentLevel >= this._nestedLevel);
      }
      if (this._options.newline_between_rules && insideRule) {
        if (this._output.previous_line && this._output.previous_line.item(-1) !== '{') {
          this._output.ensure_empty_line_above('/', ',');
        }
      }
      this.eatWhitespace(true);
      this._output.add_new_line();
    } else if (this._ch === '}') {
      this.outdent();
      this._output.add_new_line();
      if (previous_ch === '{') {
        this._output.trim(true);
      }
      insideAtImport = false;
      insideAtExtend = false;
      if (insidePropertyValue) {
        this.outdent();
        insidePropertyValue = false;
      }
      this.print_string(this._ch);
      insideRule = false;
      if (this._nestedLevel) {
        this._nestedLevel--;
      }

      this.eatWhitespace(true);
      this._output.add_new_line();

      if (this._options.newline_between_rules && !this._output.just_added_blankline()) {
        if (this._input.peek() !== '}') {
          this._output.add_new_line(true);
        }
      }
    } else if (this._ch === ":") {
      if ((insideRule || enteringConditionalGroup) && !(this._input.lookBack("&") || this.foundNestedPseudoClass()) && !this._input.lookBack("(") && !insideAtExtend && parenLevel === 0) {
        // 'property: value' delimiter
        // which could be in a conditional group query
        this.print_string(':');
        if (!insidePropertyValue) {
          insidePropertyValue = true;
          this._output.space_before_token = true;
          this.eatWhitespace(true);
          this.indent();
        }
      } else {
        // sass/less parent reference don't use a space
        // sass nested pseudo-class don't use a space

        // preserve space before pseudoclasses/pseudoelements, as it means "in any child"
        if (this._input.lookBack(" ")) {
          this._output.space_before_token = true;
        }
        if (this._input.peek() === ":") {
          // pseudo-element
          this._ch = this._input.next();
          this.print_string("::");
        } else {
          // pseudo-class
          this.print_string(':');
        }
      }
    } else if (this._ch === '"' || this._ch === '\'') {
      this.preserveSingleSpace(isAfterSpace);
      this.print_string(this._ch + this.eatString(this._ch));
      this.eatWhitespace(true);
    } else if (this._ch === ';') {
      if (parenLevel === 0) {
        if (insidePropertyValue) {
          this.outdent();
          insidePropertyValue = false;
        }
        insideAtExtend = false;
        insideAtImport = false;
        this.print_string(this._ch);
        this.eatWhitespace(true);

        // This maintains single line comments on the same
        // line. Block comments are also affected, but
        // a new line is always output before one inside
        // that section
        if (this._input.peek() !== '/') {
          this._output.add_new_line();
        }
      } else {
        this.print_string(this._ch);
        this.eatWhitespace(true);
        this._output.space_before_token = true;
      }
    } else if (this._ch === '(') { // may be a url
      if (this._input.lookBack("url")) {
        this.print_string(this._ch);
        this.eatWhitespace();
        parenLevel++;
        this.indent();
        this._ch = this._input.next();
        if (this._ch === ')' || this._ch === '"' || this._ch === '\'') {
          this._input.back();
        } else if (this._ch) {
          this.print_string(this._ch + this.eatString(')'));
          if (parenLevel) {
            parenLevel--;
            this.outdent();
          }
        }
      } else {
        this.preserveSingleSpace(isAfterSpace);
        this.print_string(this._ch);
        this.eatWhitespace();
        parenLevel++;
        this.indent();
      }
    } else if (this._ch === ')') {
      if (parenLevel) {
        parenLevel--;
        this.outdent();
      }
      this.print_string(this._ch);
    } else if (this._ch === ',') {
      this.print_string(this._ch);
      this.eatWhitespace(true);
      if (this._options.selector_separator_newline && !insidePropertyValue && parenLevel === 0 && !insideAtImport) {
        this._output.add_new_line();
      } else {
        this._output.space_before_token = true;
      }
    } else if ((this._ch === '>' || this._ch === '+' || this._ch === '~') && !insidePropertyValue && parenLevel === 0) {
      //handle combinator spacing
      if (this._options.space_around_combinator) {
        this._output.space_before_token = true;
        this.print_string(this._ch);
        this._output.space_before_token = true;
      } else {
        this.print_string(this._ch);
        this.eatWhitespace();
        // squash extra whitespace
        if (this._ch && whitespaceChar.test(this._ch)) {
          this._ch = '';
        }
      }
    } else if (this._ch === ']') {
      this.print_string(this._ch);
    } else if (this._ch === '[') {
      this.preserveSingleSpace(isAfterSpace);
      this.print_string(this._ch);
    } else if (this._ch === '=') { // no whitespace before or after
      this.eatWhitespace();
      this.print_string('=');
      if (whitespaceChar.test(this._ch)) {
        this._ch = '';
      }
    } else if (this._ch === '!' && !this._input.lookBack("\\")) { // !important
      this.print_string(' ');
      this.print_string(this._ch);
    } else {
      this.preserveSingleSpace(isAfterSpace);
      this.print_string(this._ch);
    }
  }

  var sweetCode = this._output.get_code(eol);

  return sweetCode;
};

var Beautifier_1$1 = Beautifier$2;

var beautifier$1 = {
	Beautifier: Beautifier_1$1
};

var Beautifier$3 = beautifier$1.Beautifier,
  Options$6 = options$2.Options;

function css_beautify(source_text, options) {
  var beautifier = new Beautifier$3(source_text, options);
  return beautifier.beautify();
}

var css = css_beautify;
var defaultOptions$1 = function() {
  return new Options$6();
};
css.defaultOptions = defaultOptions$1;

var BaseOptions$2 = options.Options;

function Options$7(options) {
  BaseOptions$2.call(this, options, 'html');
  if (this.templating.length === 1 && this.templating[0] === 'auto') {
    this.templating = ['django', 'erb', 'handlebars', 'php'];
  }

  this.indent_inner_html = this._get_boolean('indent_inner_html');
  this.indent_body_inner_html = this._get_boolean('indent_body_inner_html', true);
  this.indent_head_inner_html = this._get_boolean('indent_head_inner_html', true);

  this.indent_handlebars = this._get_boolean('indent_handlebars', true);
  this.wrap_attributes = this._get_selection('wrap_attributes',
    ['auto', 'force', 'force-aligned', 'force-expand-multiline', 'aligned-multiple', 'preserve', 'preserve-aligned']);
  this.wrap_attributes_indent_size = this._get_number('wrap_attributes_indent_size', this.indent_size);
  this.extra_liners = this._get_array('extra_liners', ['head', 'body', '/html']);

  // Block vs inline elements
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Inline_elements
  // https://www.w3.org/TR/html5/dom.html#phrasing-content
  this.inline = this._get_array('inline', [
    'a', 'abbr', 'area', 'audio', 'b', 'bdi', 'bdo', 'br', 'button', 'canvas', 'cite',
    'code', 'data', 'datalist', 'del', 'dfn', 'em', 'embed', 'i', 'iframe', 'img',
    'input', 'ins', 'kbd', 'keygen', 'label', 'map', 'mark', 'math', 'meter', 'noscript',
    'object', 'output', 'progress', 'q', 'ruby', 's', 'samp', /* 'script', */ 'select', 'small',
    'span', 'strong', 'sub', 'sup', 'svg', 'template', 'textarea', 'time', 'u', 'var',
    'video', 'wbr', 'text',
    // obsolete inline tags
    'acronym', 'big', 'strike', 'tt'
  ]);
  this.void_elements = this._get_array('void_elements', [
    // HTLM void elements - aka self-closing tags - aka singletons
    // https://www.w3.org/html/wg/drafts/html/master/syntax.html#void-elements
    'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'keygen',
    'link', 'menuitem', 'meta', 'param', 'source', 'track', 'wbr',
    // NOTE: Optional tags are too complex for a simple list
    // they are hard coded in _do_optional_end_element

    // Doctype and xml elements
    '!doctype', '?xml',

    // obsolete tags
    // basefont: https://www.computerhope.com/jargon/h/html-basefont-tag.htm
    // isndex: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/isindex
    'basefont', 'isindex'
  ]);
  this.unformatted = this._get_array('unformatted', []);
  this.content_unformatted = this._get_array('content_unformatted', [
    'pre', 'textarea'
  ]);
  this.unformatted_content_delimiter = this._get_characters('unformatted_content_delimiter');
  this.indent_scripts = this._get_selection('indent_scripts', ['normal', 'keep', 'separate']);

}
Options$7.prototype = new BaseOptions$2();



var Options_1$3 = Options$7;

var options$3 = {
	Options: Options_1$3
};

var BaseTokenizer$1 = tokenizer.Tokenizer;
var BASETOKEN$1 = tokenizer.TOKEN;
var Directives$3 = directives.Directives;
var TemplatablePattern$2 = templatablepattern.TemplatablePattern;
var Pattern$4 = pattern.Pattern;

var TOKEN$3 = {
  TAG_OPEN: 'TK_TAG_OPEN',
  TAG_CLOSE: 'TK_TAG_CLOSE',
  ATTRIBUTE: 'TK_ATTRIBUTE',
  EQUALS: 'TK_EQUALS',
  VALUE: 'TK_VALUE',
  COMMENT: 'TK_COMMENT',
  TEXT: 'TK_TEXT',
  UNKNOWN: 'TK_UNKNOWN',
  START: BASETOKEN$1.START,
  RAW: BASETOKEN$1.RAW,
  EOF: BASETOKEN$1.EOF
};

var directives_core$2 = new Directives$3(/<\!--/, /-->/);

var Tokenizer$3 = function(input_string, options) {
  BaseTokenizer$1.call(this, input_string, options);
  this._current_tag_name = '';

  // Words end at whitespace or when a tag starts
  // if we are indenting handlebars, they are considered tags
  var templatable_reader = new TemplatablePattern$2(this._input).read_options(this._options);
  var pattern_reader = new Pattern$4(this._input);

  this.__patterns = {
    word: templatable_reader.until(/[\n\r\t <]/),
    single_quote: templatable_reader.until_after(/'/),
    double_quote: templatable_reader.until_after(/"/),
    attribute: templatable_reader.until(/[\n\r\t =>]|\/>/),
    element_name: templatable_reader.until(/[\n\r\t >\/]/),

    handlebars_comment: pattern_reader.starting_with(/{{!--/).until_after(/--}}/),
    handlebars: pattern_reader.starting_with(/{{/).until_after(/}}/),
    handlebars_open: pattern_reader.until(/[\n\r\t }]/),
    handlebars_raw_close: pattern_reader.until(/}}/),
    comment: pattern_reader.starting_with(/<!--/).until_after(/-->/),
    cdata: pattern_reader.starting_with(/<!\[CDATA\[/).until_after(/]]>/),
    // https://en.wikipedia.org/wiki/Conditional_comment
    conditional_comment: pattern_reader.starting_with(/<!\[/).until_after(/]>/),
    processing: pattern_reader.starting_with(/<\?/).until_after(/\?>/)
  };

  if (this._options.indent_handlebars) {
    this.__patterns.word = this.__patterns.word.exclude('handlebars');
  }

  this._unformatted_content_delimiter = null;

  if (this._options.unformatted_content_delimiter) {
    var literal_regexp = this._input.get_literal_regexp(this._options.unformatted_content_delimiter);
    this.__patterns.unformatted_content_delimiter =
      pattern_reader.matching(literal_regexp)
      .until_after(literal_regexp);
  }
};
Tokenizer$3.prototype = new BaseTokenizer$1();

Tokenizer$3.prototype._is_comment = function(current_token) { // jshint unused:false
  return false; //current_token.type === TOKEN.COMMENT || current_token.type === TOKEN.UNKNOWN;
};

Tokenizer$3.prototype._is_opening = function(current_token) {
  return current_token.type === TOKEN$3.TAG_OPEN;
};

Tokenizer$3.prototype._is_closing = function(current_token, open_token) {
  return current_token.type === TOKEN$3.TAG_CLOSE &&
    (open_token && (
      ((current_token.text === '>' || current_token.text === '/>') && open_token.text[0] === '<') ||
      (current_token.text === '}}' && open_token.text[0] === '{' && open_token.text[1] === '{')));
};

Tokenizer$3.prototype._reset = function() {
  this._current_tag_name = '';
};

Tokenizer$3.prototype._get_next_token = function(previous_token, open_token) { // jshint unused:false
  var token = null;
  this._readWhitespace();
  var c = this._input.peek();

  if (c === null) {
    return this._create_token(TOKEN$3.EOF, '');
  }

  token = token || this._read_open_handlebars(c, open_token);
  token = token || this._read_attribute(c, previous_token, open_token);
  token = token || this._read_raw_content(c, previous_token, open_token);
  token = token || this._read_close(c, open_token);
  token = token || this._read_content_word(c);
  token = token || this._read_comment_or_cdata(c);
  token = token || this._read_processing(c);
  token = token || this._read_open(c, open_token);
  token = token || this._create_token(TOKEN$3.UNKNOWN, this._input.next());

  return token;
};

Tokenizer$3.prototype._read_comment_or_cdata = function(c) { // jshint unused:false
  var token = null;
  var resulting_string = null;
  var directives = null;

  if (c === '<') {
    var peek1 = this._input.peek(1);
    // We treat all comments as literals, even more than preformatted tags
    // we only look for the appropriate closing marker
    if (peek1 === '!') {
      resulting_string = this.__patterns.comment.read();

      // only process directive on html comments
      if (resulting_string) {
        directives = directives_core$2.get_directives(resulting_string);
        if (directives && directives.ignore === 'start') {
          resulting_string += directives_core$2.readIgnored(this._input);
        }
      } else {
        resulting_string = this.__patterns.cdata.read();
      }
    }

    if (resulting_string) {
      token = this._create_token(TOKEN$3.COMMENT, resulting_string);
      token.directives = directives;
    }
  }

  return token;
};

Tokenizer$3.prototype._read_processing = function(c) { // jshint unused:false
  var token = null;
  var resulting_string = null;
  var directives = null;

  if (c === '<') {
    var peek1 = this._input.peek(1);
    if (peek1 === '!' || peek1 === '?') {
      resulting_string = this.__patterns.conditional_comment.read();
      resulting_string = resulting_string || this.__patterns.processing.read();
    }

    if (resulting_string) {
      token = this._create_token(TOKEN$3.COMMENT, resulting_string);
      token.directives = directives;
    }
  }

  return token;
};

Tokenizer$3.prototype._read_open = function(c, open_token) {
  var resulting_string = null;
  var token = null;
  if (!open_token) {
    if (c === '<') {

      resulting_string = this._input.next();
      if (this._input.peek() === '/') {
        resulting_string += this._input.next();
      }
      resulting_string += this.__patterns.element_name.read();
      token = this._create_token(TOKEN$3.TAG_OPEN, resulting_string);
    }
  }
  return token;
};

Tokenizer$3.prototype._read_open_handlebars = function(c, open_token) {
  var resulting_string = null;
  var token = null;
  if (!open_token) {
    if (this._options.indent_handlebars && c === '{' && this._input.peek(1) === '{') {
      if (this._input.peek(2) === '!') {
        resulting_string = this.__patterns.handlebars_comment.read();
        resulting_string = resulting_string || this.__patterns.handlebars.read();
        token = this._create_token(TOKEN$3.COMMENT, resulting_string);
      } else {
        resulting_string = this.__patterns.handlebars_open.read();
        token = this._create_token(TOKEN$3.TAG_OPEN, resulting_string);
      }
    }
  }
  return token;
};


Tokenizer$3.prototype._read_close = function(c, open_token) {
  var resulting_string = null;
  var token = null;
  if (open_token) {
    if (open_token.text[0] === '<' && (c === '>' || (c === '/' && this._input.peek(1) === '>'))) {
      resulting_string = this._input.next();
      if (c === '/') { //  for close tag "/>"
        resulting_string += this._input.next();
      }
      token = this._create_token(TOKEN$3.TAG_CLOSE, resulting_string);
    } else if (open_token.text[0] === '{' && c === '}' && this._input.peek(1) === '}') {
      this._input.next();
      this._input.next();
      token = this._create_token(TOKEN$3.TAG_CLOSE, '}}');
    }
  }

  return token;
};

Tokenizer$3.prototype._read_attribute = function(c, previous_token, open_token) {
  var token = null;
  var resulting_string = '';
  if (open_token && open_token.text[0] === '<') {

    if (c === '=') {
      token = this._create_token(TOKEN$3.EQUALS, this._input.next());
    } else if (c === '"' || c === "'") {
      var content = this._input.next();
      if (c === '"') {
        content += this.__patterns.double_quote.read();
      } else {
        content += this.__patterns.single_quote.read();
      }
      token = this._create_token(TOKEN$3.VALUE, content);
    } else {
      resulting_string = this.__patterns.attribute.read();

      if (resulting_string) {
        if (previous_token.type === TOKEN$3.EQUALS) {
          token = this._create_token(TOKEN$3.VALUE, resulting_string);
        } else {
          token = this._create_token(TOKEN$3.ATTRIBUTE, resulting_string);
        }
      }
    }
  }
  return token;
};

Tokenizer$3.prototype._is_content_unformatted = function(tag_name) {
  // void_elements have no content and so cannot have unformatted content
  // script and style tags should always be read as unformatted content
  // finally content_unformatted and unformatted element contents are unformatted
  return this._options.void_elements.indexOf(tag_name) === -1 &&
    (this._options.content_unformatted.indexOf(tag_name) !== -1 ||
      this._options.unformatted.indexOf(tag_name) !== -1);
};


Tokenizer$3.prototype._read_raw_content = function(c, previous_token, open_token) { // jshint unused:false
  var resulting_string = '';
  if (open_token && open_token.text[0] === '{') {
    resulting_string = this.__patterns.handlebars_raw_close.read();
  } else if (previous_token.type === TOKEN$3.TAG_CLOSE && (previous_token.opened.text[0] === '<')) {
    var tag_name = previous_token.opened.text.substr(1).toLowerCase();
    if (tag_name === 'script' || tag_name === 'style') {
      // Script and style tags are allowed to have comments wrapping their content
      // or just have regular content.
      var token = this._read_comment_or_cdata(c);
      if (token) {
        token.type = TOKEN$3.TEXT;
        return token;
      }
      resulting_string = this._input.readUntil(new RegExp('</' + tag_name + '[\\n\\r\\t ]*?>', 'ig'));
    } else if (this._is_content_unformatted(tag_name)) {
      resulting_string = this._input.readUntil(new RegExp('</' + tag_name + '[\\n\\r\\t ]*?>', 'ig'));
    }
  }

  if (resulting_string) {
    return this._create_token(TOKEN$3.TEXT, resulting_string);
  }

  return null;
};

Tokenizer$3.prototype._read_content_word = function(c) {
  var resulting_string = '';
  if (this._options.unformatted_content_delimiter) {
    if (c === this._options.unformatted_content_delimiter[0]) {
      resulting_string = this.__patterns.unformatted_content_delimiter.read();
    }
  }

  if (!resulting_string) {
    resulting_string = this.__patterns.word.read();
  }
  if (resulting_string) {
    return this._create_token(TOKEN$3.TEXT, resulting_string);
  }
};

var Tokenizer_1$2 = Tokenizer$3;
var TOKEN_1$2 = TOKEN$3;

var tokenizer$2 = {
	Tokenizer: Tokenizer_1$2,
	TOKEN: TOKEN_1$2
};

var Options$8 = options$3.Options;
var Output$3 = output.Output;
var Tokenizer$4 = tokenizer$2.Tokenizer;
var TOKEN$4 = tokenizer$2.TOKEN;

var lineBreak$1 = /\r\n|[\r\n]/;
var allLineBreaks$1 = /\r\n|[\r\n]/g;

var Printer = function(options, base_indent_string) { //handles input/output and some other printing functions

  this.indent_level = 0;
  this.alignment_size = 0;
  this.max_preserve_newlines = options.max_preserve_newlines;
  this.preserve_newlines = options.preserve_newlines;

  this._output = new Output$3(options, base_indent_string);

};

Printer.prototype.current_line_has_match = function(pattern) {
  return this._output.current_line.has_match(pattern);
};

Printer.prototype.set_space_before_token = function(value, non_breaking) {
  this._output.space_before_token = value;
  this._output.non_breaking_space = non_breaking;
};

Printer.prototype.set_wrap_point = function() {
  this._output.set_indent(this.indent_level, this.alignment_size);
  this._output.set_wrap_point();
};


Printer.prototype.add_raw_token = function(token) {
  this._output.add_raw_token(token);
};

Printer.prototype.print_preserved_newlines = function(raw_token) {
  var newlines = 0;
  if (raw_token.type !== TOKEN$4.TEXT && raw_token.previous.type !== TOKEN$4.TEXT) {
    newlines = raw_token.newlines ? 1 : 0;
  }

  if (this.preserve_newlines) {
    newlines = raw_token.newlines < this.max_preserve_newlines + 1 ? raw_token.newlines : this.max_preserve_newlines + 1;
  }
  for (var n = 0; n < newlines; n++) {
    this.print_newline(n > 0);
  }

  return newlines !== 0;
};

Printer.prototype.traverse_whitespace = function(raw_token) {
  if (raw_token.whitespace_before || raw_token.newlines) {
    if (!this.print_preserved_newlines(raw_token)) {
      this._output.space_before_token = true;
    }
    return true;
  }
  return false;
};

Printer.prototype.previous_token_wrapped = function() {
  return this._output.previous_token_wrapped;
};

Printer.prototype.print_newline = function(force) {
  this._output.add_new_line(force);
};

Printer.prototype.print_token = function(token) {
  if (token.text) {
    this._output.set_indent(this.indent_level, this.alignment_size);
    this._output.add_token(token.text);
  }
};

Printer.prototype.indent = function() {
  this.indent_level++;
};

Printer.prototype.get_full_indent = function(level) {
  level = this.indent_level + (level || 0);
  if (level < 1) {
    return '';
  }

  return this._output.get_indent_string(level);
};

var get_type_attribute = function(start_token) {
  var result = null;
  var raw_token = start_token.next;

  // Search attributes for a type attribute
  while (raw_token.type !== TOKEN$4.EOF && start_token.closed !== raw_token) {
    if (raw_token.type === TOKEN$4.ATTRIBUTE && raw_token.text === 'type') {
      if (raw_token.next && raw_token.next.type === TOKEN$4.EQUALS &&
        raw_token.next.next && raw_token.next.next.type === TOKEN$4.VALUE) {
        result = raw_token.next.next.text;
      }
      break;
    }
    raw_token = raw_token.next;
  }

  return result;
};

var get_custom_beautifier_name = function(tag_check, raw_token) {
  var typeAttribute = null;
  var result = null;

  if (!raw_token.closed) {
    return null;
  }

  if (tag_check === 'script') {
    typeAttribute = 'text/javascript';
  } else if (tag_check === 'style') {
    typeAttribute = 'text/css';
  }

  typeAttribute = get_type_attribute(raw_token) || typeAttribute;

  // For script and style tags that have a type attribute, only enable custom beautifiers for matching values
  // For those without a type attribute use default;
  if (typeAttribute.search('text/css') > -1) {
    result = 'css';
  } else if (typeAttribute.search(/module|((text|application|dojo)\/(x-)?(javascript|ecmascript|jscript|livescript|(ld\+)?json|method|aspect))/) > -1) {
    result = 'javascript';
  } else if (typeAttribute.search(/(text|application|dojo)\/(x-)?(html)/) > -1) {
    result = 'html';
  } else if (typeAttribute.search(/test\/null/) > -1) {
    // Test only mime-type for testing the beautifier when null is passed as beautifing function
    result = 'null';
  }

  return result;
};

function in_array$2(what, arr) {
  return arr.indexOf(what) !== -1;
}

function TagFrame(parent, parser_token, indent_level) {
  this.parent = parent || null;
  this.tag = parser_token ? parser_token.tag_name : '';
  this.indent_level = indent_level || 0;
  this.parser_token = parser_token || null;
}

function TagStack(printer) {
  this._printer = printer;
  this._current_frame = null;
}

TagStack.prototype.get_parser_token = function() {
  return this._current_frame ? this._current_frame.parser_token : null;
};

TagStack.prototype.record_tag = function(parser_token) { //function to record a tag and its parent in this.tags Object
  var new_frame = new TagFrame(this._current_frame, parser_token, this._printer.indent_level);
  this._current_frame = new_frame;
};

TagStack.prototype._try_pop_frame = function(frame) { //function to retrieve the opening tag to the corresponding closer
  var parser_token = null;

  if (frame) {
    parser_token = frame.parser_token;
    this._printer.indent_level = frame.indent_level;
    this._current_frame = frame.parent;
  }

  return parser_token;
};

TagStack.prototype._get_frame = function(tag_list, stop_list) { //function to retrieve the opening tag to the corresponding closer
  var frame = this._current_frame;

  while (frame) { //till we reach '' (the initial value);
    if (tag_list.indexOf(frame.tag) !== -1) { //if this is it use it
      break;
    } else if (stop_list && stop_list.indexOf(frame.tag) !== -1) {
      frame = null;
      break;
    }
    frame = frame.parent;
  }

  return frame;
};

TagStack.prototype.try_pop = function(tag, stop_list) { //function to retrieve the opening tag to the corresponding closer
  var frame = this._get_frame([tag], stop_list);
  return this._try_pop_frame(frame);
};

TagStack.prototype.indent_to_tag = function(tag_list) {
  var frame = this._get_frame(tag_list);
  if (frame) {
    this._printer.indent_level = frame.indent_level;
  }
};

function Beautifier$4(source_text, options, js_beautify, css_beautify) {
  //Wrapper function to invoke all the necessary constructors and deal with the output.
  this._source_text = source_text || '';
  options = options || {};
  this._js_beautify = js_beautify;
  this._css_beautify = css_beautify;
  this._tag_stack = null;

  // Allow the setting of language/file-type specific options
  // with inheritance of overall settings
  var optionHtml = new Options$8(options, 'html');

  this._options = optionHtml;

  this._is_wrap_attributes_force = this._options.wrap_attributes.substr(0, 'force'.length) === 'force';
  this._is_wrap_attributes_force_expand_multiline = (this._options.wrap_attributes === 'force-expand-multiline');
  this._is_wrap_attributes_force_aligned = (this._options.wrap_attributes === 'force-aligned');
  this._is_wrap_attributes_aligned_multiple = (this._options.wrap_attributes === 'aligned-multiple');
  this._is_wrap_attributes_preserve = this._options.wrap_attributes.substr(0, 'preserve'.length) === 'preserve';
  this._is_wrap_attributes_preserve_aligned = (this._options.wrap_attributes === 'preserve-aligned');
}

Beautifier$4.prototype.beautify = function() {

  // if disabled, return the input unchanged.
  if (this._options.disabled) {
    return this._source_text;
  }

  var source_text = this._source_text;
  var eol = this._options.eol;
  if (this._options.eol === 'auto') {
    eol = '\n';
    if (source_text && lineBreak$1.test(source_text)) {
      eol = source_text.match(lineBreak$1)[0];
    }
  }

  // HACK: newline parsing inconsistent. This brute force normalizes the input.
  source_text = source_text.replace(allLineBreaks$1, '\n');

  var baseIndentString = source_text.match(/^[\t ]*/)[0];

  var last_token = {
    text: '',
    type: ''
  };

  var last_tag_token = new TagOpenParserToken();

  var printer = new Printer(this._options, baseIndentString);
  var tokens = new Tokenizer$4(source_text, this._options).tokenize();

  this._tag_stack = new TagStack(printer);

  var parser_token = null;
  var raw_token = tokens.next();
  while (raw_token.type !== TOKEN$4.EOF) {

    if (raw_token.type === TOKEN$4.TAG_OPEN || raw_token.type === TOKEN$4.COMMENT) {
      parser_token = this._handle_tag_open(printer, raw_token, last_tag_token, last_token);
      last_tag_token = parser_token;
    } else if ((raw_token.type === TOKEN$4.ATTRIBUTE || raw_token.type === TOKEN$4.EQUALS || raw_token.type === TOKEN$4.VALUE) ||
      (raw_token.type === TOKEN$4.TEXT && !last_tag_token.tag_complete)) {
      parser_token = this._handle_inside_tag(printer, raw_token, last_tag_token, tokens);
    } else if (raw_token.type === TOKEN$4.TAG_CLOSE) {
      parser_token = this._handle_tag_close(printer, raw_token, last_tag_token);
    } else if (raw_token.type === TOKEN$4.TEXT) {
      parser_token = this._handle_text(printer, raw_token, last_tag_token);
    } else {
      // This should never happen, but if it does. Print the raw token
      printer.add_raw_token(raw_token);
    }

    last_token = parser_token;

    raw_token = tokens.next();
  }
  var sweet_code = printer._output.get_code(eol);

  return sweet_code;
};

Beautifier$4.prototype._handle_tag_close = function(printer, raw_token, last_tag_token) {
  var parser_token = {
    text: raw_token.text,
    type: raw_token.type
  };
  printer.alignment_size = 0;
  last_tag_token.tag_complete = true;

  printer.set_space_before_token(raw_token.newlines || raw_token.whitespace_before !== '', true);
  if (last_tag_token.is_unformatted) {
    printer.add_raw_token(raw_token);
  } else {
    if (last_tag_token.tag_start_char === '<') {
      printer.set_space_before_token(raw_token.text[0] === '/', true); // space before />, no space before >
      if (this._is_wrap_attributes_force_expand_multiline && last_tag_token.has_wrapped_attrs) {
        printer.print_newline(false);
      }
    }
    printer.print_token(raw_token);

  }

  if (last_tag_token.indent_content &&
    !(last_tag_token.is_unformatted || last_tag_token.is_content_unformatted)) {
    printer.indent();

    // only indent once per opened tag
    last_tag_token.indent_content = false;
  }

  if (!last_tag_token.is_inline_element &&
    !(last_tag_token.is_unformatted || last_tag_token.is_content_unformatted)) {
    printer.set_wrap_point();
  }

  return parser_token;
};

Beautifier$4.prototype._handle_inside_tag = function(printer, raw_token, last_tag_token, tokens) {
  var wrapped = last_tag_token.has_wrapped_attrs;
  var parser_token = {
    text: raw_token.text,
    type: raw_token.type
  };

  printer.set_space_before_token(raw_token.newlines || raw_token.whitespace_before !== '', true);
  if (last_tag_token.is_unformatted) {
    printer.add_raw_token(raw_token);
  } else if (last_tag_token.tag_start_char === '{' && raw_token.type === TOKEN$4.TEXT) {
    // For the insides of handlebars allow newlines or a single space between open and contents
    if (printer.print_preserved_newlines(raw_token)) {
      raw_token.newlines = 0;
      printer.add_raw_token(raw_token);
    } else {
      printer.print_token(raw_token);
    }
  } else {
    if (raw_token.type === TOKEN$4.ATTRIBUTE) {
      printer.set_space_before_token(true);
      last_tag_token.attr_count += 1;
    } else if (raw_token.type === TOKEN$4.EQUALS) { //no space before =
      printer.set_space_before_token(false);
    } else if (raw_token.type === TOKEN$4.VALUE && raw_token.previous.type === TOKEN$4.EQUALS) { //no space before value
      printer.set_space_before_token(false);
    }

    if (raw_token.type === TOKEN$4.ATTRIBUTE && last_tag_token.tag_start_char === '<') {
      if (this._is_wrap_attributes_preserve || this._is_wrap_attributes_preserve_aligned) {
        printer.traverse_whitespace(raw_token);
        wrapped = wrapped || raw_token.newlines !== 0;
      }


      if (this._is_wrap_attributes_force) {
        var force_attr_wrap = last_tag_token.attr_count > 1;
        if (this._is_wrap_attributes_force_expand_multiline && last_tag_token.attr_count === 1) {
          var is_only_attribute = true;
          var peek_index = 0;
          var peek_token;
          do {
            peek_token = tokens.peek(peek_index);
            if (peek_token.type === TOKEN$4.ATTRIBUTE) {
              is_only_attribute = false;
              break;
            }
            peek_index += 1;
          } while (peek_index < 4 && peek_token.type !== TOKEN$4.EOF && peek_token.type !== TOKEN$4.TAG_CLOSE);

          force_attr_wrap = !is_only_attribute;
        }

        if (force_attr_wrap) {
          printer.print_newline(false);
          wrapped = true;
        }
      }
    }
    printer.print_token(raw_token);
    wrapped = wrapped || printer.previous_token_wrapped();
    last_tag_token.has_wrapped_attrs = wrapped;
  }
  return parser_token;
};

Beautifier$4.prototype._handle_text = function(printer, raw_token, last_tag_token) {
  var parser_token = {
    text: raw_token.text,
    type: 'TK_CONTENT'
  };
  if (last_tag_token.custom_beautifier_name) { //check if we need to format javascript
    this._print_custom_beatifier_text(printer, raw_token, last_tag_token);
  } else if (last_tag_token.is_unformatted || last_tag_token.is_content_unformatted) {
    printer.add_raw_token(raw_token);
  } else {
    printer.traverse_whitespace(raw_token);
    printer.print_token(raw_token);
  }
  return parser_token;
};

Beautifier$4.prototype._print_custom_beatifier_text = function(printer, raw_token, last_tag_token) {
  var local = this;
  if (raw_token.text !== '') {

    var text = raw_token.text,
      _beautifier,
      script_indent_level = 1,
      pre = '',
      post = '';
    if (last_tag_token.custom_beautifier_name === 'javascript' && typeof this._js_beautify === 'function') {
      _beautifier = this._js_beautify;
    } else if (last_tag_token.custom_beautifier_name === 'css' && typeof this._css_beautify === 'function') {
      _beautifier = this._css_beautify;
    } else if (last_tag_token.custom_beautifier_name === 'html') {
      _beautifier = function(html_source, options) {
        var beautifier = new Beautifier$4(html_source, options, local._js_beautify, local._css_beautify);
        return beautifier.beautify();
      };
    }

    if (this._options.indent_scripts === "keep") {
      script_indent_level = 0;
    } else if (this._options.indent_scripts === "separate") {
      script_indent_level = -printer.indent_level;
    }

    var indentation = printer.get_full_indent(script_indent_level);

    // if there is at least one empty line at the end of this text, strip it
    // we'll be adding one back after the text but before the containing tag.
    text = text.replace(/\n[ \t]*$/, '');

    // Handle the case where content is wrapped in a comment or cdata.
    if (last_tag_token.custom_beautifier_name !== 'html' &&
      text[0] === '<' && text.match(/^(<!--|<!\[CDATA\[)/)) {
      var matched = /^(<!--[^\n]*|<!\[CDATA\[)(\n?)([ \t\n]*)([\s\S]*)(-->|]]>)$/.exec(text);

      // if we start to wrap but don't finish, print raw
      if (!matched) {
        printer.add_raw_token(raw_token);
        return;
      }

      pre = indentation + matched[1] + '\n';
      text = matched[4];
      if (matched[5]) {
        post = indentation + matched[5];
      }

      // if there is at least one empty line at the end of this text, strip it
      // we'll be adding one back after the text but before the containing tag.
      text = text.replace(/\n[ \t]*$/, '');

      if (matched[2] || matched[3].indexOf('\n') !== -1) {
        // if the first line of the non-comment text has spaces
        // use that as the basis for indenting in null case.
        matched = matched[3].match(/[ \t]+$/);
        if (matched) {
          raw_token.whitespace_before = matched[0];
        }
      }
    }

    if (text) {
      if (_beautifier) {

        // call the Beautifier if avaliable
        var Child_options = function() {
          this.eol = '\n';
        };
        Child_options.prototype = this._options.raw_options;
        var child_options = new Child_options();
        text = _beautifier(indentation + text, child_options);
      } else {
        // simply indent the string otherwise
        var white = raw_token.whitespace_before;
        if (white) {
          text = text.replace(new RegExp('\n(' + white + ')?', 'g'), '\n');
        }

        text = indentation + text.replace(/\n/g, '\n' + indentation);
      }
    }

    if (pre) {
      if (!text) {
        text = pre + post;
      } else {
        text = pre + text + '\n' + post;
      }
    }

    printer.print_newline(false);
    if (text) {
      raw_token.text = text;
      raw_token.whitespace_before = '';
      raw_token.newlines = 0;
      printer.add_raw_token(raw_token);
      printer.print_newline(true);
    }
  }
};

Beautifier$4.prototype._handle_tag_open = function(printer, raw_token, last_tag_token, last_token) {
  var parser_token = this._get_tag_open_token(raw_token);

  if ((last_tag_token.is_unformatted || last_tag_token.is_content_unformatted) &&
    raw_token.type === TOKEN$4.TAG_OPEN && raw_token.text.indexOf('</') === 0) {
    // End element tags for unformatted or content_unformatted elements
    // are printed raw to keep any newlines inside them exactly the same.
    printer.add_raw_token(raw_token);
    parser_token.start_tag_token = this._tag_stack.try_pop(parser_token.tag_name);
  } else {
    printer.traverse_whitespace(raw_token);
    this._set_tag_position(printer, raw_token, parser_token, last_tag_token, last_token);
    if (!parser_token.is_inline_element) {
      printer.set_wrap_point();
    }
    printer.print_token(raw_token);
  }

  //indent attributes an auto, forced, aligned or forced-align line-wrap
  if (this._is_wrap_attributes_force_aligned || this._is_wrap_attributes_aligned_multiple || this._is_wrap_attributes_preserve_aligned) {
    parser_token.alignment_size = raw_token.text.length + 1;
  }

  if (!parser_token.tag_complete && !parser_token.is_unformatted) {
    printer.alignment_size = parser_token.alignment_size;
  }

  return parser_token;
};

var TagOpenParserToken = function(parent, raw_token) {
  this.parent = parent || null;
  this.text = '';
  this.type = 'TK_TAG_OPEN';
  this.tag_name = '';
  this.is_inline_element = false;
  this.is_unformatted = false;
  this.is_content_unformatted = false;
  this.is_empty_element = false;
  this.is_start_tag = false;
  this.is_end_tag = false;
  this.indent_content = false;
  this.multiline_content = false;
  this.custom_beautifier_name = null;
  this.start_tag_token = null;
  this.attr_count = 0;
  this.has_wrapped_attrs = false;
  this.alignment_size = 0;
  this.tag_complete = false;
  this.tag_start_char = '';
  this.tag_check = '';

  if (!raw_token) {
    this.tag_complete = true;
  } else {
    var tag_check_match;

    this.tag_start_char = raw_token.text[0];
    this.text = raw_token.text;

    if (this.tag_start_char === '<') {
      tag_check_match = raw_token.text.match(/^<([^\s>]*)/);
      this.tag_check = tag_check_match ? tag_check_match[1] : '';
    } else {
      tag_check_match = raw_token.text.match(/^{{(?:[\^]|#\*?)?([^\s}]+)/);
      this.tag_check = tag_check_match ? tag_check_match[1] : '';

      // handle "{{#> myPartial}}
      if (raw_token.text === '{{#>' && this.tag_check === '>' && raw_token.next !== null) {
        this.tag_check = raw_token.next.text;
      }
    }
    this.tag_check = this.tag_check.toLowerCase();

    if (raw_token.type === TOKEN$4.COMMENT) {
      this.tag_complete = true;
    }

    this.is_start_tag = this.tag_check.charAt(0) !== '/';
    this.tag_name = !this.is_start_tag ? this.tag_check.substr(1) : this.tag_check;
    this.is_end_tag = !this.is_start_tag ||
      (raw_token.closed && raw_token.closed.text === '/>');

    // handlebars tags that don't start with # or ^ are single_tags, and so also start and end.
    this.is_end_tag = this.is_end_tag ||
      (this.tag_start_char === '{' && (this.text.length < 3 || (/[^#\^]/.test(this.text.charAt(2)))));
  }
};

Beautifier$4.prototype._get_tag_open_token = function(raw_token) { //function to get a full tag and parse its type
  var parser_token = new TagOpenParserToken(this._tag_stack.get_parser_token(), raw_token);

  parser_token.alignment_size = this._options.wrap_attributes_indent_size;

  parser_token.is_end_tag = parser_token.is_end_tag ||
    in_array$2(parser_token.tag_check, this._options.void_elements);

  parser_token.is_empty_element = parser_token.tag_complete ||
    (parser_token.is_start_tag && parser_token.is_end_tag);

  parser_token.is_unformatted = !parser_token.tag_complete && in_array$2(parser_token.tag_check, this._options.unformatted);
  parser_token.is_content_unformatted = !parser_token.is_empty_element && in_array$2(parser_token.tag_check, this._options.content_unformatted);
  parser_token.is_inline_element = in_array$2(parser_token.tag_name, this._options.inline) || parser_token.tag_start_char === '{';

  return parser_token;
};

Beautifier$4.prototype._set_tag_position = function(printer, raw_token, parser_token, last_tag_token, last_token) {

  if (!parser_token.is_empty_element) {
    if (parser_token.is_end_tag) { //this tag is a double tag so check for tag-ending
      parser_token.start_tag_token = this._tag_stack.try_pop(parser_token.tag_name); //remove it and all ancestors
    } else { // it's a start-tag
      // check if this tag is starting an element that has optional end element
      // and do an ending needed
      if (this._do_optional_end_element(parser_token)) {
        if (!parser_token.is_inline_element) {
          if (parser_token.parent) {
            parser_token.parent.multiline_content = true;
          }
          printer.print_newline(false);
        }

      }

      this._tag_stack.record_tag(parser_token); //push it on the tag stack

      if ((parser_token.tag_name === 'script' || parser_token.tag_name === 'style') &&
        !(parser_token.is_unformatted || parser_token.is_content_unformatted)) {
        parser_token.custom_beautifier_name = get_custom_beautifier_name(parser_token.tag_check, raw_token);
      }
    }
  }

  if (in_array$2(parser_token.tag_check, this._options.extra_liners)) { //check if this double needs an extra line
    printer.print_newline(false);
    if (!printer._output.just_added_blankline()) {
      printer.print_newline(true);
    }
  }

  if (parser_token.is_empty_element) { //if this tag name is a single tag type (either in the list or has a closing /)

    // if you hit an else case, reset the indent level if you are inside an:
    // 'if', 'unless', or 'each' block.
    if (parser_token.tag_start_char === '{' && parser_token.tag_check === 'else') {
      this._tag_stack.indent_to_tag(['if', 'unless', 'each']);
      parser_token.indent_content = true;
      // Don't add a newline if opening {{#if}} tag is on the current line
      var foundIfOnCurrentLine = printer.current_line_has_match(/{{#if/);
      if (!foundIfOnCurrentLine) {
        printer.print_newline(false);
      }
    }

    // Don't add a newline before elements that should remain where they are.
    if (parser_token.tag_name === '!--' && last_token.type === TOKEN$4.TAG_CLOSE &&
      last_tag_token.is_end_tag && parser_token.text.indexOf('\n') === -1) ; else if (!parser_token.is_inline_element && !parser_token.is_unformatted) {
      printer.print_newline(false);
    }
  } else if (parser_token.is_unformatted || parser_token.is_content_unformatted) {
    if (!parser_token.is_inline_element && !parser_token.is_unformatted) {
      printer.print_newline(false);
    }
  } else if (parser_token.is_end_tag) { //this tag is a double tag so check for tag-ending
    if ((parser_token.start_tag_token && parser_token.start_tag_token.multiline_content) ||
      !(parser_token.is_inline_element ||
        (last_tag_token.is_inline_element) ||
        (last_token.type === TOKEN$4.TAG_CLOSE &&
          parser_token.start_tag_token === last_tag_token) ||
        (last_token.type === 'TK_CONTENT')
      )) {
      printer.print_newline(false);
    }
  } else { // it's a start-tag
    parser_token.indent_content = !parser_token.custom_beautifier_name;

    if (parser_token.tag_start_char === '<') {
      if (parser_token.tag_name === 'html') {
        parser_token.indent_content = this._options.indent_inner_html;
      } else if (parser_token.tag_name === 'head') {
        parser_token.indent_content = this._options.indent_head_inner_html;
      } else if (parser_token.tag_name === 'body') {
        parser_token.indent_content = this._options.indent_body_inner_html;
      }
    }

    if (!parser_token.is_inline_element && last_token.type !== 'TK_CONTENT') {
      if (parser_token.parent) {
        parser_token.parent.multiline_content = true;
      }
      printer.print_newline(false);
    }
  }
};

//To be used for <p> tag special case:
var p_closers = ['address', 'article', 'aside', 'blockquote', 'details', 'div', 'dl', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hr', 'main', 'nav', 'ol', 'p', 'pre', 'section', 'table', 'ul'];
var p_parent_excludes = ['a', 'audio', 'del', 'ins', 'map', 'noscript', 'video'];

Beautifier$4.prototype._do_optional_end_element = function(parser_token) {
  var result = null;
  // NOTE: cases of "if there is no more content in the parent element"
  // are handled automatically by the beautifier.
  // It assumes parent or ancestor close tag closes all children.
  // https://www.w3.org/TR/html5/syntax.html#optional-tags
  if (parser_token.is_empty_element || !parser_token.is_start_tag || !parser_token.parent) {
    return;

  }

  if (parser_token.tag_name === 'body') {
    // A head element’s end tag may be omitted if the head element is not immediately followed by a space character or a comment.
    result = result || this._tag_stack.try_pop('head');

    //} else if (parser_token.tag_name === 'body') {
    // DONE: A body element’s end tag may be omitted if the body element is not immediately followed by a comment.

  } else if (parser_token.tag_name === 'li') {
    // An li element’s end tag may be omitted if the li element is immediately followed by another li element or if there is no more content in the parent element.
    result = result || this._tag_stack.try_pop('li', ['ol', 'ul']);

  } else if (parser_token.tag_name === 'dd' || parser_token.tag_name === 'dt') {
    // A dd element’s end tag may be omitted if the dd element is immediately followed by another dd element or a dt element, or if there is no more content in the parent element.
    // A dt element’s end tag may be omitted if the dt element is immediately followed by another dt element or a dd element.
    result = result || this._tag_stack.try_pop('dt', ['dl']);
    result = result || this._tag_stack.try_pop('dd', ['dl']);


  } else if (parser_token.parent.tag_name === 'p' && p_closers.indexOf(parser_token.tag_name) !== -1) {
    // IMPORTANT: this else-if works because p_closers has no overlap with any other element we look for in this method
    // check for the parent element is an HTML element that is not an <a>, <audio>, <del>, <ins>, <map>, <noscript>, or <video> element,  or an autonomous custom element.
    // To do this right, this needs to be coded as an inclusion of the inverse of the exclusion above.
    // But to start with (if we ignore "autonomous custom elements") the exclusion would be fine.
    var p_parent = parser_token.parent.parent;
    if (!p_parent || p_parent_excludes.indexOf(p_parent.tag_name) === -1) {
      result = result || this._tag_stack.try_pop('p');
    }
  } else if (parser_token.tag_name === 'rp' || parser_token.tag_name === 'rt') {
    // An rt element’s end tag may be omitted if the rt element is immediately followed by an rt or rp element, or if there is no more content in the parent element.
    // An rp element’s end tag may be omitted if the rp element is immediately followed by an rt or rp element, or if there is no more content in the parent element.
    result = result || this._tag_stack.try_pop('rt', ['ruby', 'rtc']);
    result = result || this._tag_stack.try_pop('rp', ['ruby', 'rtc']);

  } else if (parser_token.tag_name === 'optgroup') {
    // An optgroup element’s end tag may be omitted if the optgroup element is immediately followed by another optgroup element, or if there is no more content in the parent element.
    // An option element’s end tag may be omitted if the option element is immediately followed by another option element, or if it is immediately followed by an optgroup element, or if there is no more content in the parent element.
    result = result || this._tag_stack.try_pop('optgroup', ['select']);
    //result = result || this._tag_stack.try_pop('option', ['select']);

  } else if (parser_token.tag_name === 'option') {
    // An option element’s end tag may be omitted if the option element is immediately followed by another option element, or if it is immediately followed by an optgroup element, or if there is no more content in the parent element.
    result = result || this._tag_stack.try_pop('option', ['select', 'datalist', 'optgroup']);

  } else if (parser_token.tag_name === 'colgroup') {
    // DONE: A colgroup element’s end tag may be omitted if the colgroup element is not immediately followed by a space character or a comment.
    // A caption element's end tag may be ommitted if a colgroup, thead, tfoot, tbody, or tr element is started.
    result = result || this._tag_stack.try_pop('caption', ['table']);

  } else if (parser_token.tag_name === 'thead') {
    // A colgroup element's end tag may be ommitted if a thead, tfoot, tbody, or tr element is started.
    // A caption element's end tag may be ommitted if a colgroup, thead, tfoot, tbody, or tr element is started.
    result = result || this._tag_stack.try_pop('caption', ['table']);
    result = result || this._tag_stack.try_pop('colgroup', ['table']);

    //} else if (parser_token.tag_name === 'caption') {
    // DONE: A caption element’s end tag may be omitted if the caption element is not immediately followed by a space character or a comment.

  } else if (parser_token.tag_name === 'tbody' || parser_token.tag_name === 'tfoot') {
    // A thead element’s end tag may be omitted if the thead element is immediately followed by a tbody or tfoot element.
    // A tbody element’s end tag may be omitted if the tbody element is immediately followed by a tbody or tfoot element, or if there is no more content in the parent element.
    // A colgroup element's end tag may be ommitted if a thead, tfoot, tbody, or tr element is started.
    // A caption element's end tag may be ommitted if a colgroup, thead, tfoot, tbody, or tr element is started.
    result = result || this._tag_stack.try_pop('caption', ['table']);
    result = result || this._tag_stack.try_pop('colgroup', ['table']);
    result = result || this._tag_stack.try_pop('thead', ['table']);
    result = result || this._tag_stack.try_pop('tbody', ['table']);

    //} else if (parser_token.tag_name === 'tfoot') {
    // DONE: A tfoot element’s end tag may be omitted if there is no more content in the parent element.

  } else if (parser_token.tag_name === 'tr') {
    // A tr element’s end tag may be omitted if the tr element is immediately followed by another tr element, or if there is no more content in the parent element.
    // A colgroup element's end tag may be ommitted if a thead, tfoot, tbody, or tr element is started.
    // A caption element's end tag may be ommitted if a colgroup, thead, tfoot, tbody, or tr element is started.
    result = result || this._tag_stack.try_pop('caption', ['table']);
    result = result || this._tag_stack.try_pop('colgroup', ['table']);
    result = result || this._tag_stack.try_pop('tr', ['table', 'thead', 'tbody', 'tfoot']);

  } else if (parser_token.tag_name === 'th' || parser_token.tag_name === 'td') {
    // A td element’s end tag may be omitted if the td element is immediately followed by a td or th element, or if there is no more content in the parent element.
    // A th element’s end tag may be omitted if the th element is immediately followed by a td or th element, or if there is no more content in the parent element.
    result = result || this._tag_stack.try_pop('td', ['table', 'thead', 'tbody', 'tfoot', 'tr']);
    result = result || this._tag_stack.try_pop('th', ['table', 'thead', 'tbody', 'tfoot', 'tr']);
  }

  // Start element omission not handled currently
  // A head element’s start tag may be omitted if the element is empty, or if the first thing inside the head element is an element.
  // A tbody element’s start tag may be omitted if the first thing inside the tbody element is a tr element, and if the element is not immediately preceded by a tbody, thead, or tfoot element whose end tag has been omitted. (It can’t be omitted if the element is empty.)
  // A colgroup element’s start tag may be omitted if the first thing inside the colgroup element is a col element, and if the element is not immediately preceded by another colgroup element whose end tag has been omitted. (It can’t be omitted if the element is empty.)

  // Fix up the parent of the parser token
  parser_token.parent = this._tag_stack.get_parser_token();

  return result;
};

var Beautifier_1$2 = Beautifier$4;

var beautifier$2 = {
	Beautifier: Beautifier_1$2
};

var Beautifier$5 = beautifier$2.Beautifier,
  Options$9 = options$3.Options;

function style_html(html_source, options, js_beautify, css_beautify) {
  var beautifier = new Beautifier$5(html_source, options, js_beautify, css_beautify);
  return beautifier.beautify();
}

var html = style_html;
var defaultOptions$2 = function() {
  return new Options$9();
};
html.defaultOptions = defaultOptions$2;

function style_html$1(html_source, options, js, css$1) {
  js = js || javascript;
  css$1 = css$1 || css;
  return html(html_source, options, js, css$1);
}
style_html$1.defaultOptions = html.defaultOptions;

var js = javascript;
var css$1 = css;
var html$1 = style_html$1;

var src$1 = {
	js: js,
	css: css$1,
	html: html$1
};

var js$1 = createCommonjsModule(function (module) {

/**
The following batches are equivalent:

var beautify_js = require('js-beautify');
var beautify_js = require('js-beautify').js;
var beautify_js = require('js-beautify').js_beautify;

var beautify_css = require('js-beautify').css;
var beautify_css = require('js-beautify').css_beautify;

var beautify_html = require('js-beautify').html;
var beautify_html = require('js-beautify').html_beautify;

All methods returned accept two arguments, the source string and an options object.
**/

function get_beautify(js_beautify, css_beautify, html_beautify) {
  // the default is js
  var beautify = function(src, config) {
    return js_beautify.js_beautify(src, config);
  };

  // short aliases
  beautify.js = js_beautify.js_beautify;
  beautify.css = css_beautify.css_beautify;
  beautify.html = html_beautify.html_beautify;

  // legacy aliases
  beautify.js_beautify = js_beautify.js_beautify;
  beautify.css_beautify = css_beautify.css_beautify;
  beautify.html_beautify = html_beautify.html_beautify;

  return beautify;
}

{
  (function(mod) {
    var beautifier = src$1;
    beautifier.js_beautify = beautifier.js;
    beautifier.css_beautify = beautifier.css;
    beautifier.html_beautify = beautifier.html;

    mod.exports = get_beautify(beautifier, beautifier, beautifier);

  })(module);
}
});

function format(document, range) {
    if (range === null) {
        const start = new vscode.Position(0, 0);
        const end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
        range = new vscode.Range(start, end);
    }
    const result = [];
    const content = document.getText(range);
    const formatted = beatify(content, document.languageId);
    const isFormatted = !!formatted && formatted !== content;
    if (isFormatted) {
        result.push(new vscode.TextEdit(range, formatted));
    }
    return result;
}
function beatify(documentContent, languageId) {
    let beatiFunc = null;
    switch (languageId) {
        case 'scss.erb':
            languageId = 'css';
            beatiFunc = js$1.css;
        case 'css.erb':
            beatiFunc = js$1.css;
            break;
        // case 'json':
        //     languageId = 'javascript';
        case 'js.erb':
            languageId = 'javascript';
            beatiFunc = js$1.js;
            break;
        case 'html.erb':
            beatiFunc = js$1.html;
            break;
        default:
            showMesage('Sorry, this language is not supported. Only support Javascript, CSS and HTML.');
            break;
    }
    if (!beatiFunc)
        return;
    let tabSize = null;
    const beutifyOptions = {};
    const prefix = languageId.split('.')[0];
    const config = vscode.workspace.getConfiguration('');
    try {
        tabSize = config[`[${prefix}`][`erb]`]['editor.tabSize'];
    }
    catch (e) {
        tabSize = vscode.workspace.getConfiguration('editor').get('tabSize');
    }
    if (tabSize != null) {
        beutifyOptions.indent_size = tabSize;
    }
    return beatiFunc(documentContent, beutifyOptions);
}
class Formatter {
    beautify() {
        // Create as needed
        const window = vscode.window;
        let range;
        // Get the current text editor
        const activeEditor = window.activeTextEditor;
        if (!activeEditor) {
            return;
        }
        const document = activeEditor.document;
        if (range === null) {
            const start = new vscode.Position(0, 0);
            const end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
            range = new vscode.Range(start, end);
        }
        // var result: vscode.TextEdit[] = [];
        const content = document.getText(range);
        const formatted = beatify(content, document.languageId);
        const isFormatted = !!formatted && formatted !== content;
        if (isFormatted) {
            return activeEditor.edit((editor) => {
                const start = new vscode.Position(0, 0);
                const end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
                range = new vscode.Range(start, end);
                return editor.replace(range, formatted);
            });
        }
    }
    registerBeautify(range) {
        // Create as needed
        const window = vscode.window;
        // Get the current text editor
        const editor = window.activeTextEditor;
        if (!editor) {
            return;
        }
        const document = editor.document;
        return format(document, range);
    }
    onSave(e) {
        const { document } = e;
        const docType = ['css.erb', 'scss.erb', 'html.erb'];
        if (docType.indexOf(document.languageId) === -1) {
            return;
        }
        let onSave = false;
        const prefix = document.languageId.split('.')[0];
        const conf = vscode.workspace.getConfiguration('rails.editor');
        let confPrefixFormatOnSave;
        try {
            confPrefixFormatOnSave =
                conf[`[${prefix}`][`erb]`]['editor.formatOnSave'];
        }
        catch (e) { }
        if (confPrefixFormatOnSave === false) {
            return;
        }
        const confFormatOnSave = conf.get('formatOnSave');
        if (confFormatOnSave === false) {
            return;
        }
        const config = vscode.workspace.getConfiguration('', e.document);
        try {
            onSave = config[`[${prefix}`][`erb]`]['editor.formatOnSave'];
        }
        catch (e) {
            onSave = vscode.workspace.getConfiguration('editor').get('formatOnSave');
        }
        if (!onSave) {
            return;
        }
        const start = new vscode.Position(0, 0);
        const end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
        let range = new vscode.Range(start, end);
        // var result: vscode.TextEdit[] = [];
        const content = document.getText(range);
        const formatted = beatify(content, document.languageId);
        const isFormatted = !!formatted && formatted !== content;
        if (isFormatted) {
            const start = new vscode.Position(0, 0);
            const end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
            range = new vscode.Range(start, end);
            const edit = vscode.TextEdit.replace(range, formatted);
            e.waitUntil(Promise.resolve([edit]));
        }
    }
}
function showMesage(msg) {
    vscode.window.showInformationMessage(msg);
}

// Checks whether a pattern is probably not a path e.g. a file.
function isFile$1(pattern) {
    return (pattern == '*' || pattern.indexOf('.') !== -1);
}

// Prepare removes blank lines and comments.
function prepare(patterns) {
    return patterns.filter(function(pattern) {
        pattern = pattern.trim();
        return pattern.charAt(0) !== '#' && pattern !== '';
    });
}

// Map transforms .gitignore patterns into globs.
function map(patterns) {
    // Account for files and directories.
    patterns = patterns.map(function(pattern) {
        if (!isFile$1(pattern)) {
            var suffix = (pattern.slice(-1) == '*') ? '*' : '/**';
            if (pattern.slice(-1) === '/') {
              pattern = [pattern + suffix];
            } else {
              // Create pair of globs.
                pattern = [pattern, pattern + suffix];
            }
        }
        return pattern;
    });

    // Flatten previously created glob pairs.
    // TODO: Find a combined solution.
    patterns = Array.prototype.concat.apply([], patterns);

    // Account for subdirectories.
    patterns = patterns.map(function(pattern) {
        if (!isFile$1(pattern)) {
            if (pattern.charAt(0) !== '/') {
                return '**/' + pattern;
            }
        }
        return pattern;
    });

    return patterns;
}

// Negate turns a glob into an excluding glob and vice-versa.
function negate(globs) {
    return globs.map(function(glob) {
        return (glob.charAt(0) == '!') ? glob.substring(1) : '!' + glob;
    });
}

// Parse a .gitignore file and return its glob patterns as an array.
function parse$3(file, options) {
    var file = file || '.gitignore';
    var options = options || {};
    options.negate = options.negate || false;

    var content = fs__default.readFileSync(file).toString();
    var patterns = content.split('\n');

    patterns = prepare(patterns);
    var globs = map(patterns);
    if (options.negate) {
        globs = negate(globs);
    }

    return globs;
}

var gitignoreGlobs = parse$3;

var _map = map;
var _prepare = prepare;
var _negate = negate;
var _isFile = isFile$1;
gitignoreGlobs._map = _map;
gitignoreGlobs._prepare = _prepare;
gitignoreGlobs._negate = _negate;
gitignoreGlobs._isFile = _isFile;

// original taken from https://github.com/luca-montaigut/SkeemaParser/blob/main/js/skeemaParser.js
class SkeemaParser {
    constructor(schema, skipTimestamps = true, skipActiveStorage = true) {
        this.parse = () => {
            const allLines = this.schema.split(/\r\n|\n/);
            if (!this.isSchemaDotRbFile(allLines)) {
                console.error('Not a "schema.rb" file');
                return false;
            }
            allLines.forEach((line) => {
                this.processLine(line);
            });
            return this.result;
        };
        this.isSchemaDotRbFile = (allLines) => {
            return Boolean(allLines.find((line) => line.trim().match(/ActiveRecord::Schema/)));
        };
        this.processLine = (line) => {
            this.table ? this.parseTableLine(line) : this.findNewTable(line);
        };
        this.parseTableLine = (line) => {
            if (line.trim().match(/^end$/)) {
                return this.endTable();
            }
            const columnName = this.extractColumnName(line);
            const columnType = this.extractColumnType(line);
            if (columnType === 'index') {
                this.addIndex(columnType, columnName);
            }
            else if ((columnName === 'created_at' && this.skipTimestamps) ||
                (columnName === 'updated_at' && this.skipTimestamps)) {
                return;
            }
            else {
                this.addColumn(columnType, columnName);
            }
        };
        this.findNewTable = (line) => {
            this.table = this.extractTableName(line);
            if (this.table) {
                this.startTable(this.table);
            }
        };
        this.extractTableName = (line) => {
            let tableName;
            if (line.trim().match(/create_table (\S+)/)) {
                tableName = line.split('"')[1];
            }
            if ((tableName === 'active_storage_attachments' && this.skipActiveStorage) ||
                (tableName === 'active_storage_blobs' && this.skipActiveStorage)) {
                return false;
            }
            return tableName;
        };
        this.extractColumnName = (column) => {
            return column.trim().split(' ')[1].split('"')[1];
        };
        this.extractColumnType = (column) => {
            return column.trim().split(' ')[0].split('.')[1];
        };
        this.startTable = (tableName) => {
            this.result[tableName] = {};
        };
        this.endTable = () => {
            this.table = '';
        };
        this.addColumn = (type, name) => {
            this.result[this.table][name] = type;
        };
        this.addIndex = (type, name) => {
            if (!this.result[this.table][type]) {
                this.result[this.table][type] = [];
            }
            this.result[this.table][type].push(name);
        };
        this.schema = schema;
        this.skipTimestamps = skipTimestamps;
        this.skipActiveStorage = skipActiveStorage;
        this.table = '';
        this.result = {};
    }
}
// Parser for schema.rb file Rails 5+ (maybe before but untested)
// return {tableName: {columnName: columnType, ... , index: [columnName, ...]} ...}
// Based on : https://github.com/rubysolo/skeema

/*!
 * repeat-string <https://github.com/jonschlinkert/repeat-string>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

/**
 * Results cache
 */

var res = '';
var cache;

/**
 * Expose `repeat`
 */

var repeatString = repeat;

/**
 * Repeat the given `string` the specified `number`
 * of times.
 *
 * **Example:**
 *
 * ```js
 * var repeat = require('repeat-string');
 * repeat('A', 5);
 * //=> AAAAA
 * ```
 *
 * @param {String} `string` The string to repeat
 * @param {Number} `number` The number of times to repeat the string
 * @return {String} Repeated string
 * @api public
 */

function repeat(str, num) {
  if (typeof str !== 'string') {
    throw new TypeError('expected a string');
  }

  // cover common, quick use cases
  if (num === 1) return str;
  if (num === 2) return str + str;

  var max = str.length * num;
  if (cache !== str || typeof cache === 'undefined') {
    cache = str;
    res = '';
  } else if (res.length >= max) {
    return res.substr(0, max);
  }

  while (max > res.length && num > 1) {
    if (num & 1) {
      res += str;
    }

    num >>= 1;
    str += str;
  }

  res += str;
  res = res.substr(0, max);
  return res;
}

/**
 * @typedef MarkdownTableOptions
 * @property {string|string[]} [align]
 * @property {boolean} [padding=true]
 * @property {boolean} [delimiterStart=true]
 * @property {boolean} [delimiterStart=true]
 * @property {boolean} [delimiterEnd=true]
 * @property {boolean} [alignDelimiters=true]
 * @property {(value: string) => number} [stringLength]
 */
/**
 * Create a table from a matrix of strings.
 *
 * @param {string[][]} table
 * @param {MarkdownTableOptions} [options]
 * @returns {string}
 */
function markdownTable(table, options) {
    const settings = options || {};
    const align = (settings.align || []).concat();
    const stringLength = settings.stringLength || defaultStringLength;
    /** @type {number[]} Character codes as symbols for alignment per column. */
    const alignments = [];
    let rowIndex = -1;
    /** @type {string[][]} Cells per row. */
    const cellMatrix = [];
    /** @type {number[][]} Sizes of each cell per row. */
    const sizeMatrix = [];
    /** @type {number[]} */
    const longestCellByColumn = [];
    let mostCellsPerRow = 0;
    /** @type {number} */
    let columnIndex;
    /** @type {string[]} Cells of current row */
    let row;
    /** @type {number[]} Sizes of current row */
    let sizes;
    /** @type {number} Sizes of current cell */
    let size;
    /** @type {string} Current cell */
    let cell;
    /** @type {string[]} */
    let lines;
    /** @type {string[]} Chunks of current line. */
    let line;
    /** @type {string} */
    let before;
    /** @type {string} */
    let after;
    /** @type {number} */
    let code;
    // This is a superfluous loop if we don’t align delimiters, but otherwise we’d
    // do superfluous work when aligning, so optimize for aligning.
    while (++rowIndex < table.length) {
        columnIndex = -1;
        row = [];
        sizes = [];
        if (table[rowIndex].length > mostCellsPerRow) {
            mostCellsPerRow = table[rowIndex].length;
        }
        while (++columnIndex < table[rowIndex].length) {
            cell = serialize(table[rowIndex][columnIndex]);
            if (settings.alignDelimiters !== false) {
                size = stringLength(cell);
                sizes[columnIndex] = size;
                if (longestCellByColumn[columnIndex] === undefined ||
                    size > longestCellByColumn[columnIndex]) {
                    longestCellByColumn[columnIndex] = size;
                }
            }
            row.push(cell);
        }
        cellMatrix[rowIndex] = row;
        sizeMatrix[rowIndex] = sizes;
    }
    // Figure out which alignments to use.
    columnIndex = -1;
    if (typeof align === 'object' && 'length' in align) {
        while (++columnIndex < mostCellsPerRow) {
            alignments[columnIndex] = toAlignment(align[columnIndex]);
        }
    }
    else {
        code = toAlignment(align);
        while (++columnIndex < mostCellsPerRow) {
            alignments[columnIndex] = code;
        }
    }
    // Inject the alignment row.
    columnIndex = -1;
    row = [];
    sizes = [];
    while (++columnIndex < mostCellsPerRow) {
        code = alignments[columnIndex];
        before = '';
        after = '';
        if (code === 99 /* `c` */) {
            before = ':';
            after = ':';
        }
        else if (code === 108 /* `l` */) {
            before = ':';
        }
        else if (code === 114 /* `r` */) {
            after = ':';
        }
        // There *must* be at least one hyphen-minus in each alignment cell.
        size =
            settings.alignDelimiters === false
                ? 1
                : Math.max(1, longestCellByColumn[columnIndex] - before.length - after.length);
        cell = before + repeatString('-', size) + after;
        if (settings.alignDelimiters !== false) {
            size = before.length + size + after.length;
            if (size > longestCellByColumn[columnIndex]) {
                longestCellByColumn[columnIndex] = size;
            }
            sizes[columnIndex] = size;
        }
        row[columnIndex] = cell;
    }
    // Inject the alignment row.
    cellMatrix.splice(1, 0, row);
    sizeMatrix.splice(1, 0, sizes);
    rowIndex = -1;
    lines = [];
    while (++rowIndex < cellMatrix.length) {
        row = cellMatrix[rowIndex];
        sizes = sizeMatrix[rowIndex];
        columnIndex = -1;
        line = [];
        while (++columnIndex < mostCellsPerRow) {
            cell = row[columnIndex] || '';
            before = '';
            after = '';
            if (settings.alignDelimiters !== false) {
                size = longestCellByColumn[columnIndex] - (sizes[columnIndex] || 0);
                code = alignments[columnIndex];
                if (code === 114 /* `r` */) {
                    before = repeatString(' ', size);
                }
                else if (code === 99 /* `c` */) {
                    if (size % 2) {
                        before = repeatString(' ', size / 2 + 0.5);
                        after = repeatString(' ', size / 2 - 0.5);
                    }
                    else {
                        before = repeatString(' ', size / 2);
                        after = before;
                    }
                }
                else {
                    after = repeatString(' ', size);
                }
            }
            if (settings.delimiterStart !== false && !columnIndex) {
                line.push('|');
            }
            if (settings.padding !== false &&
                // Don’t add the opening space if we’re not aligning and the cell is
                // empty: there will be a closing space.
                !(settings.alignDelimiters === false && cell === '') &&
                (settings.delimiterStart !== false || columnIndex)) {
                line.push(' ');
            }
            if (settings.alignDelimiters !== false) {
                line.push(before);
            }
            line.push(cell);
            if (settings.alignDelimiters !== false) {
                line.push(after);
            }
            if (settings.padding !== false) {
                line.push(' ');
            }
            if (settings.delimiterEnd !== false ||
                columnIndex !== mostCellsPerRow - 1) {
                line.push('|');
            }
        }
        lines.push(settings.delimiterEnd === false
            ? line.join('').replace(/ +$/, '')
            : line.join(''));
    }
    return lines.join('\n');
}
/**
 * @param {string|null|undefined} [value]
 * @returns {string}
 */
function serialize(value) {
    return value === null || value === undefined ? '' : String(value);
}
/**
 * @param {string} value
 * @returns {number}
 */
function defaultStringLength(value) {
    return value.length;
}
/**
 * @param {string} value
 * @returns {number}
 */
function toAlignment(value) {
    const code = typeof value === 'string' ? value.charCodeAt(0) : 0;
    return code === 67 /* `C` */ || code === 99 /* `c` */
        ? 99 /* `c` */
        : code === 76 /* `L` */ || code === 108 /* `l` */
            ? 108 /* `l` */
            : code === 82 /* `R` */ || code === 114 /* `r` */
                ? 114 /* `r` */
                : 0;
}

const {promisify} = util$1__default;

const pAccess = promisify(fs__default.access);

var pathExists = async path => {
	try {
		await pAccess(path);
		return true;
	} catch (_) {
		return false;
	}
};

var sync = path => {
	try {
		fs__default.accessSync(path);
		return true;
	} catch (_) {
		return false;
	}
};
pathExists.sync = sync;

const files = {};
function readFile(path, options = {}, fn) {
    let _fn = fn;
    if (2 === arguments.length) {
        // @ts-ignore
        _fn = options;
        options = {};
    }
    if (!files[path])
        files[path] = {};
    const file = files[path];
    fs__default.stat(path, (err, stats) => {
        if (err)
            return _fn(err);
        else if (file.mtime >= stats.mtime) {
            return _fn(null, file.content);
        }
        fs__default.readFile(path, options, (err, buf) => {
            if (err)
                return _fn(err);
            const parser = new SkeemaParser(buf.toString());
            const tables = parser.parse();
            files[path] = {
                mtime: stats.mtime,
                content: tables,
            };
            _fn(null, tables);
        });
    });
}
const _readFile = util$1.promisify(readFile);
class RailsHover {
    provideHover(document, position, token) {
        const symbol = getSymbol(document, position);
        if (!symbol) {
            return undefined;
        }
        const demodulized = index.demodulize(symbol);
        if (PATTERNS.CAPITALIZED.test(demodulized)) {
            const tableName = index.tableize(symbol);
            const root = vscode.workspace.getWorkspaceFolder(document.uri).uri.fsPath;
            const schemaPath = path.join(root, 'db', 'schema.rb');
            if (!files[schemaPath] && !pathExists.sync(schemaPath)) {
                return undefined;
            }
            return _readFile(schemaPath, {}).then((tables) => {
                if (typeof tables !== 'undefined') {
                    if (tableName in tables) {
                        const table = tables[tableName];
                        const tablemd = [['Field', 'Type']];
                        Object.entries(table).forEach(([key, val]) => {
                            tablemd.push([
                                `<span style="color:#008000;">${key}</span>`,
                                `<span style="color:#cc0000;">${val.toString()}</span>`,
                            ]);
                        });
                        const md = markdownTable(tablemd);
                        const mds = new vscode.MarkdownString(md);
                        mds.isTrusted = true;
                        return new vscode.Hover(mds);
                    }
                }
            });
        }
    }
}

const RAILS_MODE = { language: 'ruby', scheme: 'file' };
const VIEW_MODE = {
    pattern: '**/views/**',
    scheme: 'file',
};
let gitignoreWatcher;
function railsNavigation() {
    if (!vscode.window.activeTextEditor) {
        return;
    }
    const relativeFileName = vscode.workspace.asRelativePath(vscode.window.activeTextEditor.document.fileName);
    const line = vscode.window.activeTextEditor.document
        .lineAt(vscode.window.activeTextEditor.selection.active.line)
        .text.trim();
    const rh = new RailsHelper(vscode.window.activeTextEditor.document, relativeFileName, line);
    rh.showFileList();
}
function registerFormatter(context) {
    console.log('registerFormatter');
    const docType = ['css.erb', 'scss.erb', 'html.erb'];
    for (let i = 0, l = docType.length; i < l; i++) {
        registerDocType(docType[i]);
    }
    const formatter = new Formatter();
    context.subscriptions.push(vscode.commands.registerCommand('erb.formatting', () => {
        formatter.beautify();
    }));
    context.subscriptions.push(vscode.workspace.onWillSaveTextDocument((e) => {
        formatter.onSave(e);
    }));
    function registerDocType(type) {
        // context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider(type, {
        //   provideDocumentFormattingEdits: (document, options, token) => {
        //     return formatter.registerBeautify(null)
        //   }
        // }));
        // Note: A document range provider is also a document formatter
        // which means there is no need to register a document formatter when also registering a range provider.
        context.subscriptions.push(vscode.languages.registerDocumentRangeFormattingEditProvider(type, {
            provideDocumentRangeFormattingEdits: (document, range, options, token) => {
                const start = new vscode.Position(0, 0);
                const end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
                return formatter.registerBeautify(new vscode.Range(start, end));
            },
        }));
    }
}
function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand('Rails:Navigation', railsNavigation));
    context.subscriptions.push(vscode.languages.registerDefinitionProvider(RAILS_MODE, new RailsDefinitionProvider()));
    context.subscriptions.push(vscode.languages.registerHoverProvider(RAILS_MODE, new RailsHover()));
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider({ scheme: 'file' }, new RailsCompletionItemProvider(), '.', '"', ':', "'"));
    // since VIEW_MODE use glob pattern ,must make sure work on a rails project
    function registerViewDefinitionProvider() {
        context.subscriptions.push(vscode.languages.registerDefinitionProvider(VIEW_MODE, new ViewDefinitionProvider()));
    }
    function registerViewDocCommand() {
        context.subscriptions.push(vscode.commands.registerCommand('Rails:Document', viewDoc, context));
    }
    vscode.workspace
        .findFiles('Gemfile', LocalBundle, vscode.workspace.workspaceFolders.length)
        .then(async (uris) => {
        if (uris.length >= 1) {
            for (const uri of uris) {
                const fileAbsPath = uri.fsPath;
                const fileStream = fs.createReadStream(fileAbsPath);
                const rl = readline.createInterface({
                    input: fileStream,
                    crlfDelay: Infinity,
                });
                for await (const lineText of rl) {
                    if (/gem\s+['"]rails['"]/.test(lineText)) {
                        registerViewDefinitionProvider();
                        registerViewDocCommand();
                        registerFormatter(context);
                        console.log('Project Gemfile contains rails');
                        break;
                    }
                }
            }
        }
    });
    // initial gitignore glob
    vscode.workspace.workspaceFolders.map((f) => {
        const ws = vscode.workspace.getWorkspaceFolder(f.uri);
        const wsName = ws.name;
        const file = path__default.join(ws.uri.fsPath, '.gitignore');
        if (fs.existsSync(file)) {
            gitignores[wsName] = gitignoreGlobs(file);
        }
    });
    gitignoreWatcher = vscode.workspace.createFileSystemWatcher('.gitignore', false, false, false);
    context.subscriptions.push(gitignoreWatcher.onDidChange((uri) => {
        const ws = vscode.workspace.getWorkspaceFolder(uri);
        const wsName = ws.name;
        gitignores[wsName] = gitignoreGlobs(uri.fsPath);
    }));
}
// this method is called when your extension is deactivated
function deactivate() { }

exports.activate = activate;
exports.deactivate = deactivate;
