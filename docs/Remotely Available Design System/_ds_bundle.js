/* @ds-bundle: {"format":3,"namespace":"RemotelyAvailableDesignSystem_66c958","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"Stat","sourcePath":"components/core/Stat.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"3bdedfcdbe94","components/core/Button.jsx":"898f5da596a1","components/core/Card.jsx":"baab525be673","components/core/Eyebrow.jsx":"73bce386d7c9","components/core/Stat.jsx":"86421af3cff1","components/forms/Input.jsx":"555e022561c1"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.RemotelyAvailableDesignSystem_66c958 = window.RemotelyAvailableDesignSystem_66c958 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Badge / Tag — small status or category label.
 * tone: copper | lavender | neutral | success | warning | danger
 * variant: soft (tinted) | solid | outline
 */
function Badge({
  tone = 'neutral',
  variant = 'soft',
  children,
  dot = false,
  style,
  ...rest
}) {
  const map = {
    copper: {
      hue: 'var(--ra-copper)',
      soft: 'var(--ra-copper-16)',
      solidText: 'var(--ra-base)'
    },
    lavender: {
      hue: 'var(--ra-lavender)',
      soft: 'rgba(110,119,203,0.18)',
      solidText: 'var(--ra-cream)'
    },
    neutral: {
      hue: 'var(--ra-cream-70)',
      soft: 'var(--ra-cream-08)',
      solidText: 'var(--ra-base)'
    },
    success: {
      hue: 'var(--ra-success)',
      soft: 'rgba(79,157,107,0.18)',
      solidText: 'var(--ra-cream)'
    },
    warning: {
      hue: 'var(--ra-warning)',
      soft: 'rgba(227,176,53,0.18)',
      solidText: 'var(--ra-base)'
    },
    danger: {
      hue: 'var(--ra-danger)',
      soft: 'rgba(210,96,74,0.18)',
      solidText: 'var(--ra-cream)'
    }
  };
  const c = map[tone] || map.neutral;
  const variants = {
    soft: {
      background: c.soft,
      color: c.hue,
      border: '1px solid transparent'
    },
    solid: {
      background: c.hue,
      color: c.solidText,
      border: '1px solid transparent'
    },
    outline: {
      background: 'transparent',
      color: c.hue,
      border: `1px solid ${c.hue}`
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      fontWeight: 700,
      padding: '4px 10px',
      borderRadius: 'var(--radius-pill)',
      ...variants[variant],
      ...style
    }
  }, rest), dot ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: 'currentColor'
    }
  }) : null, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Remotely Available — Button
 * Variants: primary (copper), secondary (lavender), ghost, outline.
 * Sizes: sm, md, lg. Optional leading/trailing slots.
 */
function Button({
  variant = 'primary',
  size = 'md',
  children,
  leading,
  trailing,
  disabled = false,
  type = 'button',
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const sizes = {
    sm: {
      padding: '8px 14px',
      fontSize: 13
    },
    md: {
      padding: '11px 20px',
      fontSize: 14
    },
    lg: {
      padding: '15px 28px',
      fontSize: 16
    }
  };
  const variants = {
    primary: {
      base: {
        background: 'var(--ra-copper)',
        color: 'var(--ra-base)',
        border: '1px solid transparent'
      },
      hover: {
        background: 'var(--ra-copper-bright)'
      },
      active: {
        background: 'var(--ra-copper-deep)'
      }
    },
    secondary: {
      base: {
        background: 'var(--ra-lavender)',
        color: 'var(--ra-cream)',
        border: '1px solid transparent'
      },
      hover: {
        background: 'var(--ra-lavender-bright)'
      },
      active: {
        background: 'var(--ra-lavender-deep)'
      }
    },
    outline: {
      base: {
        background: 'transparent',
        color: 'var(--ra-cream)',
        border: '1px solid var(--border-strong)'
      },
      hover: {
        background: 'var(--ra-cream-08)',
        border: '1px solid var(--ra-copper)'
      },
      active: {
        background: 'var(--ra-cream-12)'
      }
    },
    ghost: {
      base: {
        background: 'transparent',
        color: 'var(--ra-cream-70)',
        border: '1px solid transparent'
      },
      hover: {
        background: 'var(--ra-cream-08)',
        color: 'var(--ra-cream)'
      },
      active: {
        background: 'var(--ra-cream-12)'
      }
    }
  };
  const v = variants[variant] || variants.primary;
  const composed = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    fontFamily: 'var(--font-sans)',
    fontWeight: 600,
    lineHeight: 1,
    borderRadius: 'var(--radius-pill)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    transition: 'background var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-standard)',
    transform: active && !disabled ? 'scale(0.97)' : 'scale(1)',
    ...sizes[size],
    ...v.base,
    ...(hover && !disabled ? v.hover : null),
    ...(active && !disabled ? v.active : null),
    ...style
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false),
    style: composed
  }, rest), leading ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex'
    }
  }, leading) : null, children, trailing ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex'
    }
  }, trailing) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Surface card. Variants: default (flat surface), glow (copper ring + glow),
 * outline (hairline only). Optional hover lift.
 */
function Card({
  variant = 'default',
  interactive = false,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const variants = {
    default: {
      background: 'var(--ra-surface)',
      border: '1px solid var(--border-subtle)',
      boxShadow: 'var(--shadow-md)'
    },
    glow: {
      background: 'var(--ra-surface)',
      border: '1px solid var(--border-copper)',
      boxShadow: 'var(--glow-copper)'
    },
    outline: {
      background: 'transparent',
      border: '1px solid var(--border-subtle)',
      boxShadow: 'none'
    }
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      borderRadius: 'var(--radius-md)',
      padding: 'var(--space-5)',
      color: 'var(--text-primary)',
      transition: 'transform var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard)',
      ...variants[variant],
      ...(interactive && hover ? {
        transform: 'translateY(-3px)',
        boxShadow: 'var(--shadow-lg)'
      } : null),
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Mono eyebrow / kicker label — the signature "// section" technical label.
 */
function Eyebrow({
  children,
  prefix = '//',
  tone = 'copper',
  as = 'div',
  style,
  ...rest
}) {
  const Tag = as;
  const color = tone === 'muted' ? 'var(--ra-cream-40)' : tone === 'lavender' ? 'var(--ra-lavender)' : 'var(--ra-copper)';
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-label)',
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      ...style
    }
  }, rest), prefix ? /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.7
    }
  }, prefix) : null, children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/core/Stat.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Stat / metric — big serif number with a mono label and optional delta.
 * The signature way Remotely Available presents outcomes.
 */
function Stat({
  value,
  label,
  delta,
  deltaTone = 'success',
  align = 'left',
  style,
  ...rest
}) {
  const deltaColor = deltaTone === 'danger' ? 'var(--ra-danger)' : deltaTone === 'lavender' ? 'var(--ra-lavender)' : 'var(--ra-success)';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      textAlign: align,
      ...style
    }
  }, rest), label ? /*#__PURE__*/React.createElement(__ds_scope.Eyebrow, {
    style: {
      marginBottom: 10,
      justifyContent: align === 'center' ? 'center' : 'flex-start'
    }
  }, label) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 'var(--fs-h1)',
      lineHeight: 1,
      color: 'var(--ra-cream)',
      letterSpacing: '-0.02em'
    }
  }, value), delta ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: deltaColor,
      marginTop: 8,
      letterSpacing: '0.04em'
    }
  }, delta) : null);
}
Object.assign(__ds_scope, { Stat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Stat.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Text input with mono label. Dark well surface, copper focus ring.
 */
function Input({
  label,
  hint,
  error,
  leading,
  trailing,
  id,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || (label ? `in-${String(label).toLowerCase().replace(/\s+/g, '-')}` : undefined);
  const ring = error ? 'var(--ra-danger)' : focus ? 'var(--ra-copper)' : 'var(--border-subtle)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      ...style
    }
  }, label ? /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--ra-cream-55)'
    }
  }, label) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      background: 'var(--ra-ink)',
      border: `1px solid ${ring}`,
      borderRadius: 'var(--radius-sm)',
      padding: '0 14px',
      boxShadow: focus && !error ? '0 0 0 3px var(--ra-copper-16)' : 'none',
      transition: 'border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard)'
    }
  }, leading ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      color: 'var(--ra-cream-40)'
    }
  }, leading) : null, /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    onFocus: e => {
      setFocus(true);
      rest.onFocus?.(e);
    },
    onBlur: e => {
      setFocus(false);
      rest.onBlur?.(e);
    }
  }, rest, {
    style: {
      flex: 1,
      background: 'transparent',
      border: 'none',
      outline: 'none',
      color: 'var(--ra-cream)',
      fontFamily: 'var(--font-sans)',
      fontSize: 15,
      padding: '12px 0'
    }
  })), trailing ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      color: 'var(--ra-cream-40)'
    }
  }, trailing) : null), error ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      color: 'var(--ra-danger)'
    }
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      color: 'var(--ra-cream-40)'
    }
  }, hint) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.Stat = __ds_scope.Stat;

__ds_ns.Input = __ds_scope.Input;

})();
