// When loaded via Babel standalone + UMD, React is already global
const { useState, useEffect, useRef } = React;

// ─── Axiom Design Tokens ───
// Mapped from Gorgias Axiom design system (design-system.gorgias.com)
// Using semantic tokens (light theme) wherever possible
const t = {
  // Elevation (page layers)
  pageBg: "#f6f7f9",           // --elevation-neutral-bg (grey-50)
  surface: "#ffffff",           // --elevation-neutral-default
  surfaceRaised: "#ffffff",     // --elevation-neutral-high
  surfaceMuted: "#f6f7f9",     // --surface-neutral-primary (grey-50)
  surfaceInset: "#ebedf1",     // --surface-neutral-secondary (grey-100)
  surfaceTertiary: "#dfe2e7",  // --surface-neutral-tertiary (grey-200)

  // Sidebar (light, matching Gorgias product)
  sidebarBg: "#ffffff",         // white surface
  sidebarText: "#5f6672",       // grey-600 (secondary text)
  sidebarTextActive: "#5b3fc4", // purple-700 (active nav item)
  sidebarActiveBg: "#f1ecff",   // purple-50 (active nav background)
  sidebarAccent: "#7c5cfc",     // purple-500 (accent icon)
  sidebarHover: "#f6f7f9",      // grey-50 (hover bg)
  sidebarDivider: "#ebedf1",    // grey-100 (light divider)

  // Borders
  border: "#00000014",          // --border-neutral-default
  borderStrong: "#000a298f",    // --border-neutral-secondary
  borderLight: "#0000000a",     // lighter variant

  // Content (text hierarchy)
  text900: "#1e242e",           // --content-neutral-default (--black)
  text700: "#5f6672",           // --content-neutral-secondary (grey-600)
  text500: "#828994",           // --content-neutral-tertiary (grey-500)
  text400: "#a4aab3",           // grey-400
  text300: "#c8ccd2",           // grey-300

  // Brand / Accent (purple)
  brand: "#1e242e",             // --black (primary action = dark, Gorgias pattern)
  brandText: "#ffffff",
  brandHover: "#343a44",        // grey-800
  accent: "#7c5cfc",            // --surface-accent-primary (purple-500)
  accentLight: "#f1ecff",       // --surface-accent-default (purple-50)
  accentText: "#5b3fc4",        // --content-accent-default (purple-700)

  // Status: Success (green)
  green: "#1a7a5a",             // --content-success-default (green-800)
  greenBg: "#e9fbf5",           // --surface-success-default (green-50)
  greenBorder: "#6dd4a8",       // --border-success-default (green-300)

  // Status: Error (red)
  red: "#c4314b",               // --content-error-default (red-700)
  redBg: "#ffecef",             // --surface-error-default (red-50)
  redBorder: "#c4314b",         // --border-error-default (red-700)

  // Status: Warning (orange)
  amber: "#b35c00",             // --content-warning-default (orange-800)
  amberBg: "#fff5ee",           // --surface-warning-default (orange-50)
  amberBorder: "#ffa54c",       // --border-warning-default (orange-300)

  // Status: Info (blue)
  blue: "#3b6fcf",              // blue-600
  blueBg: "#f5f9ff",            // blue-50
  blueBorder: "#92bbf5",        // blue-300

  // Effects
  shadowContainer: "0px 2px 20px 0px #0000000a",  // --effects-shadow-container
  shadowComponent: "0px 2px 3px 0px #0000000d",    // --effects-shadow-component

  // Interaction
  hover: "#1b233208",           // --hover-default
  focus: "#7c5cfc",             // --focus (purple-500)
};

// ─── Axiom Icons (SVG paths extracted from Axiom Components library) ───
const iconPaths = {
  ai: ["M8.84863 2.27905C9.14456 2.33987 9.36719 2.60185 9.36719 2.91577C9.36705 3.22961 9.14453 3.49174 8.84863 3.55249L8.71777 3.56616H4.17969C3.4341 3.56616 2.83008 4.17019 2.83008 4.91577V10.1433C2.83023 10.8888 3.4342 11.4939 4.17969 11.4939H5.17969C5.64333 11.4941 6.08594 11.6894 6.39844 12.032L7.27148 12.989C7.41168 13.1424 7.65414 13.1407 7.79199 12.9851L8.62012 12.0496C8.93323 11.696 9.38318 11.494 9.85547 11.4939H10.8467C11.5919 11.4936 12.1961 10.8886 12.1963 10.1433V6.87085C12.1963 6.51186 12.4877 6.22046 12.8467 6.22046C13.2054 6.22072 13.4961 6.51203 13.4961 6.87085V10.1433C13.4959 11.6066 12.3099 12.7934 10.8467 12.7937H9.85547C9.75535 12.7938 9.66013 12.8369 9.59375 12.9119L8.76562 13.8474C8.11555 14.5813 6.97244 14.5891 6.31152 13.865L5.4375 12.908C5.37133 12.8355 5.27782 12.7939 5.17969 12.7937H4.17969C2.71623 12.7937 1.52945 11.6067 1.5293 10.1433V4.91577C1.5293 3.45222 2.71613 2.26538 4.17969 2.26538H8.71777L8.84863 2.27905ZM9.92676 8.4939C10.2228 8.55454 10.4452 8.81669 10.4453 9.13062C10.4451 9.44442 10.2227 9.70666 9.92676 9.76733L9.7959 9.78101H5.12891C4.77026 9.7808 4.47878 9.48925 4.47852 9.13062C4.47869 8.77191 4.77021 8.48141 5.12891 8.4812H9.7959L9.92676 8.4939ZM9.92676 5.50562C10.2229 5.5663 10.4453 5.82829 10.4453 6.14233C10.4451 6.45616 10.2227 6.7184 9.92676 6.77905L9.7959 6.79272H5.12891C4.77026 6.79251 4.47878 6.50097 4.47852 6.14233C4.47852 5.78348 4.7701 5.49215 5.12891 5.49194H9.7959L9.92676 5.50562ZM12.3457 1.69214C12.3938 1.56605 12.6041 1.56616 12.6523 1.69214C12.7859 2.04397 13.0018 2.51619 13.2773 2.79175C13.5529 3.06705 14.0244 3.28229 14.376 3.41577C14.5018 3.46406 14.5019 3.67419 14.376 3.72241C14.0242 3.85594 13.553 4.07192 13.2773 4.34741C13.0018 4.62298 12.7859 5.09421 12.6523 5.44604C12.6044 5.57242 12.3939 5.57224 12.3457 5.44604C12.2122 5.09442 11.997 4.623 11.7217 4.34741C11.4462 4.07191 10.9739 3.85598 10.6221 3.72241C10.4961 3.67414 10.4959 3.46386 10.6221 3.41577C10.9739 3.28221 11.4462 3.06727 11.7217 2.79175C11.9972 2.5161 12.2122 2.04392 12.3457 1.69214Z"],
  home: ["M13.5399 11.581V7.73902C13.5399 7.36899 13.5395 7.18387 13.4946 7.01168C13.4547 6.85909 13.3892 6.71469 13.3007 6.5842C13.2007 6.43696 13.0617 6.31485 12.7832 6.07118L9.4592 3.16264C8.94217 2.71023 8.68365 2.48415 8.39271 2.39811C8.13635 2.32229 7.8631 2.32229 7.60674 2.39811C7.31602 2.48408 7.05787 2.70996 6.54162 3.16168L3.21647 6.07118C2.93799 6.31485 2.79908 6.43696 2.69912 6.5842C2.61054 6.71469 2.54458 6.85909 2.50471 7.01168C2.45972 7.18387 2.45972 7.36898 2.45972 7.73902V11.581C2.45972 12.2264 2.45972 12.5489 2.56515 12.8034C2.70572 13.1428 2.97516 13.4128 3.31453 13.5533C3.56906 13.6588 3.89173 13.6588 4.53707 13.6588C5.1824 13.6588 5.50543 13.6588 5.75996 13.5533C6.09933 13.4128 6.3687 13.1429 6.50927 12.8035C6.6147 12.549 6.61477 12.2263 6.61477 11.581V10.8884C6.61477 10.1235 7.23487 9.50343 7.99979 9.50343C8.76472 9.50343 9.38481 10.1235 9.38481 10.8884V11.581C9.38481 12.2263 9.38481 12.549 9.49024 12.8035C9.63081 13.1429 9.90026 13.4128 10.2396 13.5533C10.4942 13.6588 10.8168 13.6588 11.4622 13.6588C12.1075 13.6588 12.4305 13.6588 12.6851 13.5533C13.0244 13.4128 13.2938 13.1428 13.4344 12.8034C13.5398 12.5489 13.5399 12.2264 13.5399 11.581Z"],
  search: ["M9.89008 9.89002L13.6701 13.67M6.74008 11.15C4.3045 11.15 2.33008 9.17559 2.33008 6.74002C2.33008 4.30444 4.3045 2.33002 6.74008 2.33002C9.17565 2.33002 11.1501 4.30444 11.1501 6.74002C11.1501 9.17559 9.17565 11.15 6.74008 11.15Z"],
  settings: ["M8.92618 13.2522L12.0859 11.4279C12.4232 11.2332 12.5915 11.1358 12.7142 10.9996C12.8227 10.879 12.9048 10.7371 12.9549 10.5828C13.0114 10.4089 13.0114 10.2145 13.0114 9.82688V6.17302C13.0114 5.78536 13.0114 5.59102 12.9549 5.41709C12.9048 5.26284 12.8227 5.12075 12.7142 5.00022C12.5921 4.86459 12.4241 4.76763 12.0897 4.57456L8.92562 2.74777C8.58831 2.55303 8.42 2.45586 8.2407 2.41775C8.08205 2.38403 7.91803 2.38403 7.75939 2.41775C7.58009 2.45586 7.41121 2.55303 7.07391 2.74777L3.91359 4.57238C3.57668 4.7669 3.40836 4.86408 3.28578 5.00022C3.17725 5.12075 3.09529 5.26284 3.04517 5.41709C2.98853 5.59143 2.98853 5.78627 2.98853 6.17576V9.82429C2.98853 10.2138 2.98853 10.4085 3.04517 10.5828C3.09529 10.7371 3.17725 10.879 3.28578 10.9996C3.40843 11.1358 3.57688 11.2332 3.91418 11.4279L7.07391 13.2522C7.4112 13.4469 7.58009 13.5442 7.75939 13.5823C7.91803 13.616 8.08205 13.616 8.2407 13.5823C8.42 13.5442 8.58888 13.4469 8.92618 13.2522Z", "M6.26393 7.99995C6.26393 8.95873 7.04118 9.73598 7.99996 9.73598C8.95874 9.73598 9.73599 8.95873 9.73599 7.99995C9.73599 7.04116 8.95874 6.26391 7.99996 6.26391C7.04118 6.26391 6.26393 7.04116 6.26393 7.99995Z"],
  star: ["M2.44802 7.00758C2.26809 6.84118 2.36583 6.54037 2.6092 6.51151L6.05767 6.10249C6.15686 6.09073 6.24302 6.02844 6.28485 5.93774L7.73937 2.78439C7.84202 2.56185 8.15839 2.5618 8.26104 2.78435L9.71556 5.93767C9.7574 6.02837 9.84299 6.09083 9.94218 6.10259L13.3908 6.51151C13.6342 6.54037 13.7317 6.84127 13.5517 7.00766L11.0025 9.36557C10.9292 9.43339 10.8965 9.53433 10.916 9.6323L11.5925 13.0383C11.6403 13.2787 11.3845 13.465 11.1706 13.3452L8.14046 11.6487C8.0533 11.5999 7.94741 11.6001 7.86025 11.6489L4.82977 13.3448C4.61592 13.4645 4.35962 13.2787 4.40739 13.0383L5.08406 9.63251C5.10353 9.53455 5.07096 9.43337 4.99763 9.36556L2.44802 7.00758Z"],
  gift: ["M7.99996 4.24062V5.80704M7.99996 4.24062C7.99996 3.37551 8.70127 2.67419 9.56638 2.67419C10.4315 2.67419 11.1328 3.37551 11.1328 4.24062C11.1328 5.10573 10.4315 5.80704 9.56638 5.80704M7.99996 4.24062C7.99996 3.37551 7.29865 2.67419 6.43354 2.67419C5.56843 2.67419 4.86711 3.37551 4.86711 4.24062C4.86711 5.10573 5.56843 5.80704 6.43354 5.80704M7.99996 5.80704H9.56638M7.99996 5.80704H6.43354M7.99996 5.80704V9.56645M9.56638 5.80704H11.6342C12.336 5.80704 12.6864 5.80704 12.9545 5.94362C13.1903 6.06376 13.3825 6.25533 13.5026 6.49112C13.6391 6.75892 13.6391 7.10967 13.6391 7.81012V9.56645M6.43354 5.80704H4.36598C3.66416 5.80704 3.31299 5.80704 3.04493 5.94362C2.80913 6.06376 2.61757 6.25533 2.49742 6.49112C2.36084 6.75918 2.36084 7.11036 2.36084 7.81218V9.56645M2.36084 9.56645V11.321C2.36084 12.0228 2.36084 12.3735 2.49742 12.6416C2.61757 12.8774 2.80913 13.0693 3.04493 13.1894C3.31272 13.3259 3.66347 13.3259 4.36392 13.3259H7.99996M2.36084 9.56645H7.99996M7.99996 9.56645V13.3259M7.99996 9.56645H13.6391M7.99996 13.3259H11.636C12.3364 13.3259 12.6867 13.3259 12.9545 13.1894C13.1903 13.0693 13.3825 12.8774 13.5026 12.6416C13.6391 12.3738 13.6391 12.0235 13.6391 11.3231V9.56645"],
  bookmark: ["M3.95386 4.67461V11.071C3.95386 11.9888 3.95386 12.4476 4.09151 12.7285C4.34663 13.249 4.90576 13.5481 5.48038 13.4717C5.7904 13.4304 6.17224 13.1759 6.93592 12.6668L6.93775 12.6655C7.24045 12.4637 7.39182 12.3628 7.55016 12.3069C7.84098 12.2041 8.1583 12.2041 8.44912 12.3069C8.60778 12.3629 8.75974 12.4643 9.06366 12.6669C9.82734 13.176 10.2096 13.4303 10.5196 13.4716C11.0942 13.548 11.6534 13.249 11.9085 12.7285C12.0461 12.4477 12.0461 11.9887 12.0461 11.071V4.67239C12.0461 3.91852 12.0461 3.54102 11.8993 3.2528C11.77 2.99902 11.5631 2.79285 11.3093 2.66354C11.0208 2.51654 10.6437 2.51654 9.88831 2.51654H6.11192C5.35658 2.51654 4.97862 2.51654 4.69012 2.66354C4.43634 2.79285 4.23016 2.99902 4.10086 3.2528C3.95386 3.5413 3.95386 3.91926 3.95386 4.67461Z"],
  suitcase: ["M5.50929 5.50917H4.38854C3.69104 5.50917 3.34203 5.50917 3.07562 5.64492C2.84128 5.76432 2.6509 5.95471 2.53149 6.18905C2.39575 6.45545 2.39575 6.80446 2.39575 7.50196V10.9891C2.39575 11.6866 2.39575 12.0352 2.53149 12.3016C2.6509 12.5359 2.84128 12.7267 3.07562 12.8461C3.34177 12.9817 3.69036 12.9817 4.38649 12.9817H11.6138C12.3099 12.9817 12.658 12.9817 12.9241 12.846C13.1585 12.7267 13.3495 12.5359 13.4689 12.3016C13.6045 12.0355 13.6045 11.6874 13.6045 10.9912V7.49992C13.6045 6.80378 13.6045 6.45519 13.4689 6.18905C13.3495 5.95471 13.1585 5.76432 12.9241 5.64492C12.6577 5.50917 12.3095 5.50917 11.612 5.50917H10.491M5.50929 5.50917H10.491M5.50929 5.50917C5.50929 4.13353 6.62448 3.01834 8.00013 3.01834C9.37578 3.01834 10.491 4.13353 10.491 5.50917"],
  warning: ["M8 6.11427V8.62861M3.2095 10.0114C2.63785 11.0015 2.3521 11.4968 2.3948 11.903C2.43204 12.2573 2.61801 12.5793 2.90626 12.7887C3.23661 13.0287 3.80791 13.0287 4.95045 13.0287H11.0496C12.1921 13.0287 12.7633 13.0287 13.0937 12.7887C13.3819 12.5793 13.568 12.2573 13.6052 11.903C13.6479 11.4968 13.3622 11.0015 12.7906 10.0114L9.74211 4.73126C9.17046 3.74113 8.8845 3.24614 8.51134 3.08C8.18585 2.93508 7.81394 2.93508 7.48845 3.08C7.11545 3.24608 6.82967 3.74106 6.25849 4.73037L3.2095 10.0114ZM8.03192 10.5144V10.5772L7.96869 10.5773V10.5144H8.03192Z"],
  shopping_bag: ["M6.132 5.50914C6.132 6.54088 6.96839 7.37727 8.00013 7.37727C9.03186 7.37727 9.86825 6.54088 9.86825 5.50914M2.39575 10.9891V5.0111C2.39575 4.3136 2.39575 3.96459 2.53149 3.69818C2.6509 3.46384 2.84128 3.27346 3.07562 3.15405C3.34203 3.01831 3.69104 3.01831 4.38854 3.01831H11.612C12.3095 3.01831 12.6577 3.01831 12.9241 3.15405C13.1585 3.27346 13.3495 3.46384 13.4689 3.69818C13.6045 3.96433 13.6045 4.31292 13.6045 5.00905V10.9912C13.6045 11.6873 13.6045 12.0354 13.4689 12.3016C13.3495 12.5359 13.1585 12.7266 12.9241 12.846C12.658 12.9816 12.3099 12.9816 11.6138 12.9816H4.38649C3.69036 12.9816 3.34177 12.9816 3.07562 12.846C2.84128 12.7266 2.6509 12.5359 2.53149 12.3016C2.39575 12.0352 2.39575 11.6866 2.39575 10.9891Z"],
  money: ["M5.66659 9.77776C5.66659 10.6369 6.36303 11.3333 7.22214 11.3333H8.66658C9.58706 11.3333 10.3333 10.5871 10.3333 9.66665C10.3333 8.74617 9.58706 7.99998 8.66658 7.99998H7.33325C6.41278 7.99998 5.66659 7.25379 5.66659 6.33331C5.66659 5.41284 6.41278 4.66665 7.33325 4.66665H8.7777C9.63681 4.66665 10.3333 5.36309 10.3333 6.2222M7.99992 3.66665V4.66665M7.99992 11.3333V12.3333M14.6666 7.99998C14.6666 11.6819 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6819 1.33325 7.99998C1.33325 4.31808 4.31802 1.33331 7.99992 1.33331C11.6818 1.33331 14.6666 4.31808 14.6666 7.99998Z"],
  mail: ["M3.09331 4.32L6.83933 7.14886L6.84058 7.14989C7.25653 7.45492 7.46462 7.60752 7.69255 7.66648C7.89401 7.71858 8.10578 7.71858 8.30725 7.66648C8.53538 7.60747 8.74408 7.45442 9.16076 7.14886C9.16076 7.14886 11.5635 5.30497 12.9066 4.32M2.47998 10.3308V5.66945C2.47998 4.98245 2.47998 4.6387 2.61368 4.3763C2.73128 4.14549 2.9188 3.95797 3.14962 3.84036C3.41201 3.70667 3.75577 3.70667 4.44277 3.70667H11.5574C12.2444 3.70667 12.5875 3.70667 12.8499 3.84036C13.0807 3.95797 13.2688 4.14549 13.3864 4.3763C13.52 4.63844 13.52 4.98178 13.52 5.66744V10.3329C13.52 11.0185 13.52 11.3614 13.3864 11.6235C13.2688 11.8543 13.0807 12.0422 12.8499 12.1598C12.5877 12.2933 12.2449 12.2933 11.5592 12.2933H4.44075C3.7551 12.2933 3.41176 12.2933 3.14962 12.1598C2.9188 12.0422 2.73128 11.8543 2.61368 11.6235C2.47998 11.3611 2.47998 11.0178 2.47998 10.3308Z"],
  route: ["M3.99997 4.66672V11.3334C3.99997 12.438 4.8954 13.3334 5.99997 13.3334C7.10454 13.3334 7.99997 12.438 7.99997 11.3334V5.00005C7.99997 3.89548 8.8954 3.00005 9.99997 3.00005C11.1045 3.00005 12 3.89548 12 5.00005V11.3334M3.99997 4.66672C4.75764 4.66672 5.37183 4.05314 5.37183 3.29547C5.37183 2.5378 4.75761 1.92358 3.99994 1.92358C3.24227 1.92358 2.62805 2.5378 2.62805 3.29547C2.62805 4.05314 3.2423 4.66672 3.99997 4.66672ZM12 11.3334C11.2423 11.3334 10.6281 11.9476 10.6281 12.7053C10.6281 13.463 11.2424 14.0766 12.0001 14.0766C12.7577 14.0766 13.3719 13.463 13.3719 12.7053C13.3719 11.9476 12.7576 11.3334 12 11.3334Z"],
  receipt: ["M2.66675 5.2C2.66675 4.0799 2.66675 3.51984 2.88474 3.09202C3.07648 2.71569 3.38244 2.40973 3.75877 2.21799C4.18659 2 4.74664 2 5.86675 2H10.1334C11.2535 2 11.8136 2 12.2414 2.21799C12.6177 2.40973 12.9237 2.71569 13.1154 3.09202C13.3334 3.51984 13.3334 4.0799 13.3334 5.2V14L11.5001 12.6667L9.83341 14L8.00008 12.6667L6.16675 14L4.50008 12.6667L2.66675 14V5.2Z"],
  truck: ["M9.33325 4.66669H10.8914C11.0545 4.66669 11.136 4.66669 11.2127 4.68511C11.2808 4.70144 11.3458 4.72837 11.4054 4.76493C11.4727 4.80615 11.5304 4.86381 11.6457 4.97911L14.3542 7.6876C14.4695 7.8029 14.5271 7.86055 14.5683 7.92783C14.6049 7.98748 14.6318 8.05251 14.6482 8.12053C14.6666 8.19726 14.6666 8.27879 14.6666 8.44185V10.3334C14.6666 10.644 14.6666 10.7993 14.6158 10.9218C14.5482 11.0852 14.4184 11.2149 14.255 11.2826C14.1325 11.3334 13.9772 11.3334 13.6666 11.3334M10.3333 11.3334H9.33325M9.33325 11.3334V4.80002C9.33325 4.05328 9.33325 3.67992 9.18793 3.3947C9.0601 3.14382 8.85612 2.93984 8.60524 2.81201C8.32002 2.66669 7.94665 2.66669 7.19992 2.66669H3.46659C2.71985 2.66669 2.34648 2.66669 2.06126 2.81201C1.81038 2.93984 1.60641 3.14382 1.47858 3.3947C1.33325 3.67992 1.33325 4.05328 1.33325 4.80002V10C1.33325 10.7364 1.93021 11.3334 2.66659 11.3334M9.33325 11.3334H6.66658M6.66658 11.3334C6.66658 12.4379 5.77115 13.3334 4.66659 13.3334C3.56202 13.3334 2.66659 12.4379 2.66659 11.3334M6.66658 11.3334C6.66658 10.2288 5.77115 9.33335 4.66659 9.33335C3.56202 9.33335 2.66659 10.2288 2.66659 11.3334M13.6666 11.6667C13.6666 12.5872 12.9204 13.3334 11.9999 13.3334C11.0794 13.3334 10.3333 12.5872 10.3333 11.6667C10.3333 10.7462 11.0794 10 11.9999 10C12.9204 10 13.6666 10.7462 13.6666 11.6667Z"],
  grid: ["M12.05 12.86C12.05 13.3073 12.4127 13.67 12.86 13.67C13.3074 13.67 13.67 13.3073 13.67 12.86C13.67 12.4126 13.3074 12.05 12.86 12.05C12.4127 12.05 12.05 12.4126 12.05 12.86ZM7.19 12.86C7.19 13.3073 7.55265 13.67 8 13.67C8.44735 13.67 8.81 13.3073 8.81 12.86C8.81 12.4126 8.44735 12.05 8 12.05C7.55265 12.05 7.19 12.4126 7.19 12.86ZM2.33 12.86C2.33 13.3073 2.69265 13.67 3.14 13.67C3.58735 13.67 3.95 13.3073 3.95 12.86C3.95 12.4126 3.58735 12.05 3.14 12.05C2.69265 12.05 2.33 12.4126 2.33 12.86ZM12.05 7.99996C12.05 8.44731 12.4127 8.80996 12.86 8.80996C13.3074 8.80996 13.67 8.44731 13.67 7.99996C13.67 7.55261 13.3074 7.18996 12.86 7.18996C12.4127 7.18996 12.05 7.55261 12.05 7.99996ZM7.19 7.99996C7.19 8.44731 7.55265 8.80996 8 8.80996C8.44735 8.80996 8.81 8.44731 8.81 7.99996C8.81 7.55261 8.44735 7.18996 8 7.18996C7.55265 7.18996 7.19 7.55261 7.19 7.99996ZM2.33 7.99996C2.33 8.44731 2.69265 8.80996 3.14 8.80996C3.58735 8.80996 3.95 8.44731 3.95 7.99996C3.95 7.55261 3.58735 7.18996 3.14 7.18996C2.69265 7.18996 2.33 7.55261 2.33 7.99996ZM12.05 3.13996C12.05 3.58731 12.4127 3.94996 12.86 3.94996C13.3074 3.94996 13.67 3.58731 13.67 3.13996C13.67 2.69261 13.3074 2.32996 12.86 2.32996C12.4127 2.32996 12.05 2.69261 12.05 3.13996ZM7.19 3.13996C7.19 3.58731 7.55265 3.94996 8 3.94996C8.44735 3.94996 8.81 3.58731 8.81 3.13996C8.81 2.69261 8.44735 2.32996 8 2.32996C7.55265 2.32996 7.19 2.69261 7.19 3.13996ZM2.33 3.13996C2.33 3.58731 2.69265 3.94996 3.14 3.94996C3.58735 3.94996 3.95 3.58731 3.95 3.13996C3.95 2.69261 3.58735 2.32996 3.14 2.32996C2.69265 2.32996 2.33 2.69261 2.33 3.13996Z"],
  layers: ["M13.0502 7.99999L7.99972 11.367L2.94922 7.99999M13.0502 10.2447L7.99972 13.6117L2.94922 10.2447M13.0502 5.75532L7.99972 9.12232L2.94922 5.75532L7.99972 2.38832L13.0502 5.75532Z"],
  wrench: ["M3.99159 12.6724L4.94601 11.9089L4.95303 11.9035C5.15201 11.7443 5.25241 11.664 5.36443 11.6067C5.46494 11.5554 5.57211 11.518 5.68266 11.4953C5.80727 11.4697 5.93707 11.4697 6.19762 11.4697H11.6343C12.3344 11.4697 12.6849 11.4697 12.9526 11.3334C13.1883 11.2133 13.38 11.0215 13.5001 10.7858C13.6365 10.5181 13.6365 10.168 13.6365 9.46791V4.70405C13.6365 4.00393 13.6365 3.65334 13.5001 3.38567C13.38 3.14999 13.1879 2.95851 12.9522 2.83842C12.6843 2.7019 12.334 2.7019 11.6325 2.7019H4.36773C3.66623 2.7019 3.31523 2.7019 3.04729 2.83842C2.81161 2.95851 2.62013 3.14999 2.50005 3.38567C2.36353 3.6536 2.36353 4.00461 2.36353 4.70611V11.8901C2.36353 12.5575 2.36353 12.8912 2.50034 13.0626C2.61932 13.2116 2.79969 13.2983 2.99041 13.2981C3.20972 13.2979 3.47043 13.0893 3.99159 12.6724Z"],
  bar_chart: ["M2.33008 11.1719H13.6701M8.00008 2.32996V10.88M5.66675 4.5H4.33341V10.88H5.66675M12.3333 6.67652V10.88H11V6.67652"],
  trending_up: ["M2.33008 13.67H13.6701M2.33008 11.3334L5.33008 8.0835L8.33008 10.88L13.6701 5.20163"],
  document: ["M10.3326 13.52L4.44075 13.52C3.7551 13.52 3.41176 13.52 3.14962 13.3864C2.9188 13.2422 2.73128 13.0543 2.61368 12.8235C2.47998 12.5611 2.47998 12.2178 2.47998 11.5308V4.43242C2.47998 3.7454 2.47998 3.40165 2.61368 3.12625C2.73128 2.89543 2.9188 2.70791 3.14962 2.59031C3.41176 2.45662 3.7551 2.45662 4.44251 2.45662H8.61333C8.78842 2.45662 8.89875 2.45831 9.00453 2.48371C9.12961 2.51376 9.24968 2.56332 9.35953 2.63044C9.48328 2.70627 9.58964 2.81253 9.80166 3.02469L11.7186 4.94165C11.9308 5.1538 12.0363 5.25959 12.1121 5.3833C12.1794 5.49315 12.2291 5.61282 12.2592 5.738C12.2846 5.84385 12.2911 5.95471 12.2927 6.12969M10.3326 2.45662L10.3326 5.95991C10.3326 6.64691 10.3326 6.99028 10.4663 7.25268C10.5839 7.48349 10.7714 7.67128 11.0022 7.78896C11.2644 7.92265 11.6078 7.92265 12.2934 7.92265H13.67"],
  user: ["M12.9816 13.6044C12.9816 11.8848 10.7513 10.4908 7.99998 10.4908C5.24868 10.4908 3.01831 11.8848 3.01831 13.6044M7.99998 8.62271C6.28042 8.62271 4.88644 7.22873 4.88644 5.50917C4.88644 3.78961 6.28042 2.39563 7.99998 2.39563C9.71954 2.39563 11.1135 3.78961 11.1135 5.50917C11.1135 7.22873 9.71954 8.62271 7.99998 8.62271Z"],
  help: ["M2.33008 8.00001C2.33008 4.31811 5.31485 1.33334 8.00008 1.33334C10.6849 1.33334 13.67 4.31811 13.67 8.00001C13.67 11.6819 10.6849 14.6666 8.00008 14.6666C5.31485 14.6666 2.33008 11.6819 2.33008 8.00001ZM8 6.11427V8.62861M8.03133 11.1718V11.2348L7.96858 11.236V11.1718H8.03133Z"],
  phone: ["M3.33008 3.38667C3.33008 2.45977 4.09355 1.70313 5.04175 1.70313H6.34525C7.29344 1.70313 8.05691 2.45977 8.05691 3.38667C8.05691 4.67305 7.49883 7.40098 9.77805 9.69336C12.0536 11.9868 14.7898 11.4276 16.0793 11.4276C16.9686 11.4276 17.7321 12.1933 17.7321 13.1214V14.4272C17.7321 15.3551 16.9686 16.1208 16.0793 16.1208C11.5949 16.1208 5.32684 10.7476 3.99305 5.54395C3.65948 4.35391 3.33008 3.98242 3.33008 3.38667Z"],
  trash: ["M5.87371 11.7363H10.1263M4.39502 4.86914H11.605M6.13535 8.29941V10.2411M7.99996 8.29941V10.2411M9.86474 8.29941V10.2411M3.99994 4.86914L4.43545 13.0157C4.47152 13.7309 4.96606 14.3016 5.68675 14.3016H10.3126C11.0333 14.3016 11.5278 13.7309 11.5639 13.0157L12.0006 4.86914M6.77676 4.86914V3.4336C6.77676 3.05964 7.07742 2.75898 7.45138 2.75898H8.54861C8.92258 2.75898 9.22324 3.05964 9.22324 3.4336V4.86914"],
  edit_pencil: ["M8.15066 4.93913L2.33008 10.7597V13.67L5.24037 13.67L11.0609 7.84941M8.15066 4.93913L10.2378 2.85198L10.2391 2.85074C10.5264 2.56343 10.6703 2.41953 10.8362 2.36563C10.9823 2.31815 11.1397 2.31815 11.2858 2.36563C11.4516 2.41949 11.5953 2.56323 11.8822 2.85013L13.1481 4.11596C13.4362 4.40409 13.5803 4.54822 13.6343 4.71435C13.6818 4.86048 13.6818 5.01788 13.6343 5.16401C13.5804 5.33002 13.4364 5.47393 13.1487 5.76165L13.1481 5.76227L11.0609 7.84941M8.15066 4.93913L11.0609 7.84941"],
  comments: ["M3.99159 12.6724L4.94601 11.9089L4.95303 11.9035C5.15201 11.7443 5.25241 11.664 5.36443 11.6067C5.46494 11.5554 5.57211 11.518 5.68266 11.4953C5.80727 11.4697 5.93707 11.4697 6.19762 11.4697H11.6343C12.3344 11.4697 12.6849 11.4697 12.9526 11.3334C13.1883 11.2133 13.38 11.0215 13.5001 10.7858C13.6365 10.5181 13.6365 10.168 13.6365 9.46791V4.70405C13.6365 4.00393 13.6365 3.65334 13.5001 3.38567C13.38 3.14999 13.1879 2.95851 12.9522 2.83842C12.6843 2.7019 12.334 2.7019 11.6325 2.7019H4.36773C3.66623 2.7019 3.31523 2.7019 3.04729 2.83842C2.81161 2.95851 2.62013 3.14999 2.50005 3.38567C2.36353 3.6536 2.36353 4.00461 2.36353 4.70611V11.8901C2.36353 12.5575 2.36353 12.8912 2.50034 13.0626C2.61932 13.2116 2.79969 13.2983 2.99041 13.2981C3.20972 13.2979 3.47043 13.0893 3.99159 12.6724Z"],
};

const Icon = ({ name, size = 16, color = "currentColor", style = {} }) => {
  const icon = iconPaths[name];
  if (!icon) return null;
  const isFilled = name === "ai";
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, ...style }}>
      {icon.map((d, i) => (
        isFilled
          ? <path key={i} d={d} fill={color} />
          : <path key={i} d={d} stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      ))}
    </svg>
  );
};

// ─── Sidebar Navigation Component ───
const SidebarIcon = ({ icon, label, active, onClick, indent }) => (
  <div
    onClick={(e) => { e.stopPropagation(); if (onClick) onClick(); }}
    style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "6px 12px",
      margin: "1px 8px",
      marginLeft: indent ? "40px" : "8px",
      borderRadius: "6px",
      cursor: "pointer",
      backgroundColor: active ? t.sidebarActiveBg : "transparent",
      transition: "all 0.15s ease",
      color: active ? t.sidebarTextActive : t.sidebarText,
      fontSize: "14px",
      fontWeight: active ? "500" : "400",
      userSelect: "none",
    }}
    onMouseEnter={(e) => {
      if (!active) e.currentTarget.style.backgroundColor = t.sidebarHover;
    }}
    onMouseLeave={(e) => {
      if (!active) e.currentTarget.style.backgroundColor = "transparent";
    }}
  >
    {icon && typeof icon === 'string' && icon.length === 1 ? (
      <span style={{ fontSize: "15px", width: "18px", display: "flex", alignItems: "center", justifyContent: "center" }}>{icon}</span>
    ) : icon ? (
      <div style={{ width: "18px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon name={icon} size={16} color={active ? t.sidebarTextActive : t.sidebarText} />
      </div>
    ) : null}
    <span style={{ flex: 1 }}>{label}</span>
  </div>
);

const CollapsibleSection = ({ icon, label, active, defaultOpen, onToggle, children }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (onToggle) onToggle(!isOpen);
  };

  return (
    <div>
      <div
        onClick={handleToggle}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "6px 12px",
          margin: "1px 8px",
          borderRadius: "6px",
          cursor: "pointer",
          backgroundColor: active ? t.sidebarActiveBg : "transparent",
          transition: "all 0.15s ease",
          color: active ? t.sidebarTextActive : t.sidebarText,
          fontSize: "14px",
          fontWeight: active ? "500" : "400",
          userSelect: "none",
        }}
        onMouseEnter={(e) => {
          if (!active) e.currentTarget.style.backgroundColor = t.sidebarHover;
        }}
        onMouseLeave={(e) => {
          if (!active) e.currentTarget.style.backgroundColor = "transparent";
        }}
      >
        {icon && typeof icon === 'string' && icon.length === 1 ? (
          <span style={{ fontSize: "15px", width: "18px", display: "flex", alignItems: "center", justifyContent: "center" }}>{icon}</span>
        ) : icon ? (
          <div style={{ width: "18px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name={icon} size={16} color={active ? t.sidebarTextActive : t.sidebarText} />
          </div>
        ) : null}
        <span style={{ flex: 1 }}>{label}</span>
        <span style={{ fontSize: "14px", transition: "transform 0.2s" }}>∨</span>
      </div>
      {isOpen && children}
    </div>
  );
};

// ─── Sidebar Component ───
const Sidebar = ({ currentView, setCurrentView }) => {
  const [expandedSection, setExpandedSection] = useState({
    train: true,
    evaluate: true,
  });

  return (
    <div style={{
      width: "220px",
      backgroundColor: t.sidebarBg,
      borderRight: `1px solid ${t.sidebarDivider}`,
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      fontFamily: "Inter, sans-serif",
    }}>
      {/* Header Row: Diamond icon + AI Agent + search + grid */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "12px 16px",
        borderBottom: `1px solid ${t.sidebarDivider}`,
      }}>
        <Icon name="ai" size={16} color={t.sidebarAccent} />
        <span style={{ fontSize: "14px", fontWeight: "500", color: t.text900, flex: 1 }}>AI Agent</span>
        <span style={{ fontSize: "14px", color: t.sidebarText, cursor: "pointer" }}>∨</span>
        <Icon name="search" size={16} color={t.sidebarText} style={{ cursor: "pointer" }} />
        <Icon name="grid" size={16} color={t.sidebarText} style={{ cursor: "pointer" }} />
      </div>

      {/* Brand Row: Avatar + Brand Name + dropdown */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "12px 16px",
        borderBottom: `1px solid ${t.sidebarDivider}`,
      }}>
        <div style={{
          width: "24px",
          height: "24px",
          borderRadius: "6px",
          backgroundColor: "#ff8c00",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "12px",
          fontWeight: "600",
          color: "#ffffff",
        }}>
          U
        </div>
        <span style={{ fontSize: "14px", fontWeight: "500", color: t.text900, flex: 1 }}>Urban Stems</span>
        <span style={{ fontSize: "14px", color: t.sidebarText }}>∨</span>
      </div>

      {/* Navigation Items */}
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 0" }}>
        {/* Home */}
        <SidebarIcon
          icon="home"
          label="Home"
          active={currentView === "home"}
          onClick={() => setCurrentView("home")}
        />

        {/* Context */}
        <SidebarIcon
          icon="grid"
          label="Context"
          active={currentView === "context"}
          onClick={() => setCurrentView("context")}
        />

        {/* Train Section (Collapsible) */}
        <CollapsibleSection
          icon="layers"
          label="Train"
          active={currentView === "skills" || currentView === "tools"}
          defaultOpen={true}
          onToggle={(isOpen) => setExpandedSection({ ...expandedSection, train: isOpen })}
        >
          <SidebarIcon
            icon="settings"
            label="Skills"
            indent
            active={currentView === "skills"}
            onClick={() => setCurrentView("skills")}
          />
          <SidebarIcon
            icon="wrench"
            label="Tools"
            indent
            active={currentView === "tools"}
            onClick={() => setCurrentView("tools")}
          />
        </CollapsibleSection>

        {/* Campaigns */}
        <SidebarIcon
          icon="trending_up"
          label="Campaigns"
          active={currentView === "campaigns"}
          onClick={() => setCurrentView("campaigns")}
        />

        {/* Evaluate Section (Collapsible) */}
        <CollapsibleSection
          icon="bar_chart"
          label="Evaluate"
          active={currentView === "evaluations" || currentView === "monitoring" || currentView === "logs"}
          defaultOpen={true}
          onToggle={(isOpen) => setExpandedSection({ ...expandedSection, evaluate: isOpen })}
        >
          <SidebarIcon
            icon="trending_up"
            label="Evaluations"
            indent
            active={currentView === "evaluations"}
            onClick={() => setCurrentView("evaluations")}
          />
          <SidebarIcon
            icon="search"
            label="Monitoring"
            indent
            active={currentView === "monitoring"}
            onClick={() => setCurrentView("monitoring")}
          />
          <SidebarIcon
            icon="document"
            label="Logs"
            indent
            active={currentView === "logs"}
            onClick={() => setCurrentView("logs")}
          />
        </CollapsibleSection>
      </div>

      {/* Footer */}
      <div style={{
        borderTop: `1px solid ${t.sidebarDivider}`,
        padding: "12px 16px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}>
        <div style={{
          width: "28px",
          height: "28px",
          borderRadius: "6px",
          backgroundColor: "#d0d5dd",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "12px",
          fontWeight: "600",
          color: "#ffffff",
        }}>
          NP
        </div>
        <Icon name="help" size={14} color={t.text500} style={{ cursor: "pointer" }} />
        <Icon name="help" size={14} color={t.text500} style={{ cursor: "pointer" }} />
        <div style={{ fontSize: "14px", cursor: "pointer", position: "relative" }}>
          <Icon name="phone" size={14} color={t.text500} />
          <span style={{
            position: "absolute",
            top: "-8px",
            right: "-8px",
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            backgroundColor: t.red,
            color: "#ffffff",
            fontSize: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "600",
          }}>
            30
          </span>
        </div>
      </div>
    </div>
  );
};

// ─── Skills Page Components ───

const PerformanceCard = () => (
  <div style={{
    backgroundColor: t.surface,
    border: `1px solid ${t.sidebarDivider}`,
    borderRadius: "8px",
    padding: "24px",
    marginBottom: "20px",
  }}>
    <div style={{ fontSize: "16px", fontWeight: "600", color: t.text900, marginBottom: "12px" }}>
      Performance
    </div>
    <div style={{ fontSize: "12px", color: t.text500, marginBottom: "8px" }}>Coverage</div>
    {/* Stacked bar */}
    <div style={{
      display: "flex",
      height: "8px",
      borderRadius: "4px",
      overflow: "hidden",
      marginBottom: "12px",
      gap: "0",
    }}>
      <div style={{ flex: "3495", backgroundColor: t.accent }}></div>
      <div style={{ flex: "982", backgroundColor: "#d4c5f9" }}></div>
      <div style={{ flex: "202", backgroundColor: t.sidebarDivider }}></div>
    </div>
    {/* Legend */}
    <div style={{
      display: "flex",
      gap: "24px",
      fontSize: "12px",
      color: t.text700,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: t.accent }}></div>
        Using skills 3,495
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#d4c5f9" }}></div>
        Using knowledge 982
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: t.sidebarDivider }}></div>
        Handover 202
      </div>
    </div>
  </div>
);

const SkillsPage = ({ onSelectSkill }) => {
  const [sortBy, setSortBy] = useState("ticket-volume");
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const skills = [
    {
      id: 1,
      name: "Order status, tracking or delivery timing",
      stage: "Post-purchase",
      intents: ["Order / Status"],
      ticketVolume: 3495,
      handover: "12%",
      csat: 4.2,
      status: "Enabled",
    },
    {
      id: 2,
      name: "Order cancellation or return",
      stage: "Post-purchase",
      intents: ["Order / Cancel", "Order / Return"],
      ticketVolume: 2104,
      handover: "8%",
      csat: 4.1,
      status: "Enabled",
    },
    {
      id: 3,
      name: "Product recommendations",
      stage: "Consideration",
      intents: ["Product / Recommendation"],
      ticketVolume: 1850,
      handover: "5%",
      csat: 4.3,
      status: "Enabled",
    },
    {
      id: 4,
      name: "Shipping address changes",
      stage: "Post-purchase",
      intents: ["Order / Edit"],
      ticketVolume: 892,
      handover: "20%",
      csat: 3.9,
      status: "Enabled",
    },
    {
      id: 5,
      name: "Payment issues",
      stage: "Conversion",
      intents: ["Payment / Error"],
      ticketVolume: 623,
      handover: "15%",
      csat: 4.0,
      status: "Enabled",
    },
    {
      id: 6,
      name: "Coupon or discount codes",
      stage: "Conversion",
      intents: ["Promotion / Code"],
      ticketVolume: 445,
      handover: "3%",
      csat: 4.4,
      status: "Enabled",
    },
    {
      id: 7,
      name: "Subscription management",
      stage: "Retention",
      intents: ["Subscription / Manage"],
      ticketVolume: 334,
      handover: "18%",
      csat: 3.8,
      status: "Enabled",
    },
    {
      id: 8,
      name: "Account settings",
      stage: "Post-purchase",
      intents: ["Account / Settings"],
      ticketVolume: 223,
      handover: "7%",
      csat: 4.2,
      status: "Disabled",
    },
    {
      id: 9,
      name: "Warranty information",
      stage: "Post-purchase",
      intents: ["Product / Warranty"],
      ticketVolume: 156,
      handover: "10%",
      csat: 4.1,
      status: "Enabled",
    },
    {
      id: 10,
      name: "Plant care tips",
      stage: "Consideration",
      intents: ["Product / Care"],
      ticketVolume: 98,
      handover: "2%",
      csat: 4.5,
      status: "Enabled",
    },
  ];

  const stageColor = (s) => ({
    "Awareness": { bg: "#f5f9ff", text: "#3b6fcf", border: "#92bbf5" },
    "Consideration": { bg: "#f1ecff", text: "#5b3fc4", border: "#d4c5f9" },
    "Conversion": { bg: "#e9fbf5", text: "#1a7a5a", border: "#6dd4a8" },
    "Post-purchase": { bg: "#fff5ee", text: "#b35c00", border: "#ffa54c" },
    "Retention": { bg: "#ffecef", text: "#c4314b", border: "#c4314b" },
  })[s] || { bg: "#f6f7f9", text: "#5f6672", border: "#ebedf1" };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", backgroundColor: t.pageBg, fontFamily: "Inter, sans-serif", minHeight: 0, overflow: "hidden" }}>
      {/* Page Header */}
      <div style={{
        backgroundColor: t.surface,
        borderBottom: `1px solid ${t.sidebarDivider}`,
        padding: "24px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <h1 style={{ fontSize: "24px", fontWeight: "700", color: t.text900, margin: 0 }}>Skills</h1>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <a href="#" style={{ fontSize: "14px", color: t.text700, textDecoration: "none", cursor: "pointer" }}>
            Learning resources ↗
          </a>
          <button style={{
            backgroundColor: t.surface,
            border: `1px solid ${t.sidebarDivider}`,
            padding: "8px 16px",
            borderRadius: "6px",
            fontSize: "14px",
            cursor: "pointer",
            color: t.text700,
          }}>
            View intents
          </button>
          <button style={{
            backgroundColor: t.brand,
            color: t.brandText,
            border: "none",
            padding: "8px 16px",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
          }}>
            Create skill ▾
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "24px 32px" }}>
        <PerformanceCard />

        {/* Search and Filter Bar */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: t.surface,
            border: `1px solid ${t.sidebarDivider}`,
            borderRadius: "6px",
            padding: "8px 12px",
            width: "280px",
          }}>
            <Icon name="search" size={16} color={t.text400} />
            <input
              type="text"
              placeholder="Search..."
              style={{
                border: "none",
                outline: "none",
                flex: 1,
                fontSize: "14px",
                fontFamily: "Inter, sans-serif",
              }}
            />
          </div>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <span style={{ fontSize: "12px", color: t.text500 }}>Showing 10 of 10 skills</span>
            <Icon name="settings" size={14} color={t.text500} style={{ cursor: "pointer" }} />
            <span style={{ fontSize: "12px", color: t.text400 }}>Metrics from last 28 days</span>
          </div>
        </div>

        {/* Table */}
        <div style={{
          backgroundColor: t.surface,
          border: `1px solid ${t.sidebarDivider}`,
          borderRadius: "8px",
          overflow: "hidden",
        }}>
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "14px",
          }}>
            <thead>
              <tr style={{
                borderBottom: `1px solid ${t.sidebarDivider}`,
                backgroundColor: t.surface,
              }}>
                <th style={{
                  padding: "12px 16px",
                  textAlign: "left",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: t.text500,
                  fontVariant: "normal",
                }}>Name</th>
                <th style={{
                  padding: "12px 16px",
                  textAlign: "left",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: t.text500,
                }}>Stage</th>
                <th style={{
                  padding: "12px 16px",
                  textAlign: "left",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: t.text500,
                  fontVariant: "normal",
                }}>Intents ⓘ</th>
                <th style={{
                  padding: "12px 16px",
                  textAlign: "right",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: t.text500,
                  fontVariant: "normal",
                }}>Ticket volume ↓</th>
                <th style={{
                  padding: "12px 16px",
                  textAlign: "right",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: t.text500,
                  fontVariant: "normal",
                }}>Handover</th>
                <th style={{
                  padding: "12px 16px",
                  textAlign: "right",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: t.text500,
                  fontVariant: "normal",
                }}>Average CSAT</th>
                <th style={{
                  padding: "12px 16px",
                  textAlign: "right",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: t.text500,
                  fontVariant: "normal",
                }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill, idx) => (
                <tr
                  key={skill.id}
                  style={{
                    borderBottom: idx < skills.length - 1 ? `1px solid ${t.sidebarDivider}` : "none",
                    cursor: "pointer",
                  }}
                  onClick={() => onSelectSkill(skill)}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = t.surfaceMuted}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                >
                  <td style={{
                    padding: "12px 16px",
                    color: t.text900,
                    fontSize: "14px",
                  }}>
                    {skill.name}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    {(() => { const sc = stageColor(skill.stage); return (
                      <span style={{ backgroundColor: sc.bg, color: sc.text, fontSize: "12px", fontWeight: "500", padding: "2px 8px", borderRadius: "4px", whiteSpace: "nowrap" }}>{skill.stage}</span>
                    ); })()}
                  </td>
                  <td style={{
                    padding: "12px 16px",
                  }}>
                    <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                      {skill.intents.slice(0, 1).map((intent, i) => (
                        <div
                          key={i}
                          style={{
                            backgroundColor: t.surfaceInset,
                            border: `1px solid ${t.sidebarDivider}`,
                            borderRadius: "4px",
                            padding: "2px 8px",
                            fontSize: "12px",
                            color: t.text700,
                          }}
                        >
                          {intent}
                        </div>
                      ))}
                      {skill.intents.length > 1 && (
                        <div
                          style={{
                            backgroundColor: t.surfaceInset,
                            border: `1px solid ${t.sidebarDivider}`,
                            borderRadius: "4px",
                            padding: "2px 8px",
                            fontSize: "12px",
                            color: t.text400,
                          }}
                        >
                          +{skill.intents.length - 1}
                        </div>
                      )}
                    </div>
                  </td>
                  <td style={{
                    padding: "12px 16px",
                    textAlign: "right",
                    color: t.text700,
                    fontSize: "14px",
                  }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                      <div>{skill.ticketVolume}</div>
                      <div
                        style={{
                          width: "40px",
                          height: "4px",
                          backgroundColor: t.accentLight,
                          borderRadius: "2px",
                          marginTop: "2px",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            backgroundColor: t.accent,
                            width: `${Math.min(skill.ticketVolume / 100, 100)}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td style={{
                    padding: "12px 16px",
                    textAlign: "right",
                    color: t.text700,
                    fontSize: "14px",
                  }}>
                    {skill.handover}
                  </td>
                  <td style={{
                    padding: "12px 16px",
                    textAlign: "right",
                    color: t.text700,
                    fontSize: "14px",
                  }}>
                    {skill.csat}
                  </td>
                  <td style={{
                    padding: "12px 16px",
                    textAlign: "right",
                    color: skill.status === "Enabled" ? t.green : t.text400,
                    fontSize: "14px",
                    fontWeight: skill.status === "Enabled" ? "500" : "400",
                  }}>
                    {skill.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "12px",
          marginTop: "16px",
          fontSize: "12px",
          color: t.text500,
        }}>
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            style={{
              backgroundColor: t.surface,
              border: `1px solid ${t.sidebarDivider}`,
              borderRadius: "4px",
              padding: "4px 8px",
              fontSize: "12px",
              cursor: "pointer",
              color: t.text500,
            }}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <span>items/page</span>
          <button style={{
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
            color: t.text500,
          }}>‹</button>
          <button style={{
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
            color: t.text500,
          }}>›</button>
        </div>
      </div>
    </div>
  );
};

// ─── Skill Editor Page ───

const SkillEditor = ({ skill, onBack }) => {
  const [instructions, setInstructions] = useState(`1. Order identification
IF customer provides order number or email address
THEN retrieve order details from system

2. Status determination
IF order status is "shipped"
THEN provide tracking information with link
ELSE IF order status is "processing"
THEN provide estimated ship date
ELSE IF order status is "delivered"
THEN confirm delivery and offer assistance

3. Knowledge integration
THEN append relevant knowledge about [Product: Name] and seasonal shipping times

4. Resolution
IF customer satisfied
THEN close conversation
ELSE
THEN escalate to support [Support / Shipping]`);

  return (
    <div style={{ flex: 1, display: "flex", backgroundColor: t.pageBg, fontFamily: "Inter, sans-serif" }}>
      {/* Top Bar */}
      <div style={{
        position: "absolute",
        top: 0,
        left: "220px",
        right: 0,
        backgroundColor: t.surface,
        borderBottom: `1px solid ${t.sidebarDivider}`,
        padding: "12px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "56px",
        zIndex: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            onClick={onBack}
            style={{
              backgroundColor: "transparent",
              border: "none",
              fontSize: "18px",
              cursor: "pointer",
              color: t.text500,
            }}
          >
            ←
          </button>
          <h2 style={{ fontSize: "16px", fontWeight: "600", color: t.text900, margin: 0 }}>
            {skill.name}
          </h2>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button style={{
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}>
            <Icon name="trash" size={16} color={t.text400} />
          </button>
          <button style={{
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}>
            <Icon name="clock" size={16} color={t.text400} />
          </button>
          <button style={{
            backgroundColor: t.accent,
            color: t.brandText,
            border: "none",
            padding: "8px 16px",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
          }}>
            Disable
          </button>
          <button style={{
            backgroundColor: t.surface,
            border: `1px solid ${t.sidebarDivider}`,
            padding: "8px 16px",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            color: t.text700,
          }}>
            Test
          </button>
        </div>
      </div>

      {/* Main Content (with top padding for fixed header) */}
      <div style={{ flex: 1, display: "flex", marginTop: "56px", overflow: "hidden" }}>
        {/* Left Panel: Editor */}
        <div style={{ flex: 1, overflowY: "auto", padding: "32px 40px", backgroundColor: t.pageBg }}>
          <div style={{ fontSize: "14px", fontWeight: "600", color: t.text900, marginBottom: "4px" }}>
            Instructions
          </div>
          <div style={{ fontSize: "12px", color: t.text400, marginBottom: "16px", lineHeight: "1.5" }}>
            Describe the steps AI Agent should follow in clear, specific phrases.<br />
            Type '/' or '@' to insert variables and actions.
          </div>

          {/* Editor */}
          <div style={{
            border: `1px solid ${t.sidebarDivider}`,
            borderRadius: "8px",
            backgroundColor: t.surface,
            minHeight: "420px",
            display: "flex",
            flexDirection: "column",
          }}>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              style={{
                flex: 1,
                padding: "24px 28px",
                border: "none",
                outline: "none",
                fontSize: "14px",
                color: t.text700,
                lineHeight: "1.7",
                fontFamily: "Inter, sans-serif",
                resize: "none",
              }}
            />

            {/* Bottom Toolbar */}
            <div style={{
              borderTop: `1px solid ${t.sidebarDivider}`,
              padding: "8px 16px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: t.surface,
            }}>
              <button style={{
                width: "28px",
                height: "28px",
                border: "none",
                backgroundColor: "transparent",
                cursor: "pointer",
                fontSize: "16px",
                color: t.text500,
              }}>B</button>
              <button style={{
                width: "28px",
                height: "28px",
                border: "none",
                backgroundColor: "transparent",
                cursor: "pointer",
                fontSize: "16px",
                color: t.text500,
              }}>I</button>
              <button style={{
                width: "28px",
                height: "28px",
                border: "none",
                backgroundColor: "transparent",
                cursor: "pointer",
                fontSize: "16px",
                color: t.text500,
              }}>U</button>
              <button style={{
                width: "28px",
                height: "28px",
                border: "none",
                backgroundColor: "transparent",
                cursor: "pointer",
                fontSize: "16px",
                color: t.text500,
              }}>≡</button>
              <button style={{
                width: "28px",
                height: "28px",
                border: "none",
                backgroundColor: "transparent",
                cursor: "pointer",
                fontSize: "16px",
                color: t.text500,
              }}>⊕</button>

              <div style={{ flex: 1 }}></div>

              <span style={{ fontSize: "12px", color: t.text300 }}>0/5000</span>

              <button style={{
                fontSize: "12px",
                border: `1px solid ${t.sidebarDivider}`,
                backgroundColor: t.surface,
                borderRadius: "4px",
                padding: "3px 10px",
                cursor: "pointer",
                color: t.text500,
                backgroundColor: "transparent",
              }}>Actions ∨</button>

              <button style={{
                fontSize: "12px",
                border: `1px solid ${t.sidebarDivider}`,
                backgroundColor: t.surface,
                borderRadius: "4px",
                padding: "3px 10px",
                cursor: "pointer",
                color: t.text500,
                backgroundColor: "transparent",
              }}>⊕ Variables ∨</button>
            </div>
          </div>
        </div>

        {/* Right Panel: Info Sidebar */}
        <div style={{
          width: "300px",
          borderLeft: `1px solid ${t.sidebarDivider}`,
          backgroundColor: t.surface,
          padding: "24px",
          overflowY: "auto",
        }}>
          <div style={{ fontSize: "15px", fontWeight: "600", color: t.text900, marginBottom: "20px" }}>
            Info
          </div>

          {/* Details Section */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{ fontSize: "14px", fontWeight: "600", color: t.text900, marginBottom: "12px" }}>
              Details
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
              <span style={{ color: t.text500 }}>Status</span>
              <span style={{ color: t.green, fontWeight: "500", display: "flex", alignItems: "center", gap: "4px" }}>
                Enabled <Icon name="edit_pencil" size={11} color={t.green} />
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
              <span style={{ color: t.text500 }}>Created</span>
              <span style={{ color: t.text900 }}>March 3, 2026</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
              <span style={{ color: t.text500 }}>Last updated</span>
              <span style={{ color: t.text900 }}>A few seconds ago</span>
            </div>
          </div>

          <div style={{ height: "1px", backgroundColor: t.sidebarDivider, marginBottom: "20px" }}></div>

          {/* Intents Section */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{ fontSize: "14px", fontWeight: "600", color: t.text900, marginBottom: "8px" }}>
              Intents <span style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "20px",
                height: "20px",
                borderRadius: "4px",
                backgroundColor: t.surfaceInset,
                fontSize: "12px",
                color: t.text500,
              }}>2</span>
            </div>
            <div style={{ fontSize: "12px", color: t.text400, marginBottom: "12px" }}>
              Link intents to enable the AI Agent to recognize and respond to them.
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "12px" }}>
              {["Order / Status", "Order / Cancel"].map((intent, i) => (
                <div
                  key={i}
                  style={{
                    border: `1px solid ${t.sidebarDivider}`,
                    borderRadius: "6px",
                    padding: "5px 10px",
                    fontSize: "12px",
                    color: t.text700,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>{intent}</span>
                  <span style={{ cursor: "pointer" }}>×</span>
                </div>
              ))}
            </div>
            <a href="#" style={{ fontSize: "12px", color: t.text700, textDecoration: "none" }}>
              + Link intents
            </a>
          </div>

          <div style={{ height: "1px", backgroundColor: t.sidebarDivider, marginBottom: "20px" }}></div>

          {/* Knowledge Section */}
          <div>
            <div style={{ fontSize: "14px", fontWeight: "600", color: t.text900, marginBottom: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              Knowledge
              <div style={{
                width: "36px",
                height: "20px",
                borderRadius: "10px",
                backgroundColor: t.accent,
                cursor: "pointer",
                position: "relative",
              }}>
                <div style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  backgroundColor: "#ffffff",
                  position: "absolute",
                  right: "2px",
                  top: "2px",
                }}></div>
              </div>
            </div>
            <div style={{ fontSize: "12px", color: t.text400, marginBottom: "12px" }}>
              The AI Agent can use knowledge to provide more accurate responses.
            </div>
            <div style={{ fontSize: "12px", fontWeight: "600", color: t.text900, marginBottom: "4px" }}>
              Top knowledge used
            </div>
            <div style={{ fontSize: "12px", color: t.text400, marginBottom: "12px" }}>
              Last 28 days
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {["Shipping Times", "Return Policy"].map((item, i) => (
                <div
                  key={i}
                  style={{
                    border: `1px solid ${t.sidebarDivider}`,
                    borderRadius: "6px",
                    padding: "8px 10px",
                    fontSize: "12px",
                    color: t.text700,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Icon name="document" size={14} color={t.text500} /> {item}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Icon name="comments" size={14} color={t.text500} /> 1,337</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Home Page ───

const HomePage = () => {
  const [showDrillIn, setShowDrillIn] = useState(false);
  const [fixApplied, setFixApplied] = useState(false);
  const [expandedInsight, setExpandedInsight] = useState(null);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", backgroundColor: t.pageBg, fontFamily: "Inter, sans-serif", minHeight: 0, overflow: "hidden" }}>
      {/* Page Header */}
      <div style={{ backgroundColor: t.surface, borderBottom: `1px solid ${t.sidebarDivider}`, padding: "24px 32px", flexShrink: 0 }}>
        <h1 style={{ fontSize: "24px", fontWeight: "700", color: t.text900, margin: 0 }}>Home</h1>
        <div style={{ fontSize: "14px", color: t.text500, marginTop: "4px" }}>AI Agent health · Skills · Business Intelligence</div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "24px 32px", minHeight: 0 }}>
        {/* Top Stats Bar - 4 Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
          <div style={{ backgroundColor: t.surface, border: `1px solid ${t.sidebarDivider}`, borderRadius: "8px", padding: "24px" }}>
            <div style={{ fontSize: "14px", color: t.text700, marginBottom: "8px" }}>Automation rate</div>
            <div style={{ fontSize: "28px", fontWeight: "700", color: t.green }}>80%</div>
          </div>
          <div style={{ backgroundColor: t.surface, border: `1px solid ${t.sidebarDivider}`, borderRadius: "8px", padding: "24px" }}>
            <div style={{ fontSize: "14px", color: t.text700, marginBottom: "8px" }}>Conversations</div>
            <div style={{ fontSize: "28px", fontWeight: "700", color: t.text900 }}>4,679</div>
            <div style={{ fontSize: "12px", color: t.text500 }}>this week</div>
          </div>
          <div style={{ backgroundColor: t.surface, border: `1px solid ${t.sidebarDivider}`, borderRadius: "8px", padding: "24px" }}>
            <div style={{ fontSize: "14px", color: t.text700, marginBottom: "8px" }}>Insights requiring attention</div>
            <div style={{ fontSize: "28px", fontWeight: "700", color: t.text900 }}>3</div>
          </div>
          <div style={{ backgroundColor: t.surface, border: `1px solid ${t.sidebarDivider}`, borderRadius: "8px", padding: "24px" }}>
            <div style={{ fontSize: "14px", color: t.text700, marginBottom: "8px" }}>Skill alerts</div>
            <div style={{ fontSize: "28px", fontWeight: "700", color: t.amber }}>1</div>
          </div>
        </div>

        {/* Alert Banner (amber) - Journey 1 */}
        <div style={{
          backgroundColor: fixApplied ? t.greenBg : "#fefbf3",
          border: `1px solid ${fixApplied ? t.greenBorder : t.amberBorder}`,
          borderRadius: "8px",
          padding: "24px",
          marginBottom: "24px"
        }}>
          {!fixApplied ? (
            <>
            <div style={{ display: "flex", gap: "16px" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "14px", fontWeight: "600", color: t.text900, marginBottom: "8px" }}>
                  Order Support — Answer Completeness ↓ 18% this week
                </div>
                <div style={{ fontSize: "14px", color: t.text700, lineHeight: "1.6", marginBottom: "12px" }}>
                  When shoppers send multi-question messages, the agent answers only the highest-confidence question and drops the rest. 47 affected conversations detected.
                </div>
                <div style={{ display: "flex", gap: "12px" }}>
                  <button onClick={() => setShowDrillIn(!showDrillIn)} style={{
                    backgroundColor: "transparent",
                    border: "none",
                    color: t.accentText,
                    cursor: "pointer",
                    fontSize: "14px",
                    textDecoration: "none",
                    fontWeight: "600",
                    padding: 0,
                  }}>
                    {showDrillIn ? "Hide details" : "View details"} →
                  </button>
                  <button onClick={() => setFixApplied(true)} style={{
                    backgroundColor: t.green,
                    color: "#ffffff",
                    border: "none",
                    padding: "6px 14px",
                    borderRadius: "6px",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}>
                    Apply suggested fix
                  </button>
                </div>
              </div>
            </div>

            {/* Drill-in Panel */}
            {showDrillIn && (
              <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: `1px solid ${t.amberBorder}` }}>
                <div style={{ fontSize: "14px", fontWeight: "600", color: t.text900, marginBottom: "12px" }}>Evidence:</div>
                {[
                  {
                    shopper: "Is this bouquet pet-safe? Can it arrive by Friday? Can you deliver to a hospital?",
                    agent: "Agent only answered pet-safety",
                    missed: ["Delivery timing", "hospital delivery"],
                  },
                  {
                    shopper: "I need to change my address AND cancel the add-on vase",
                    agent: "Agent changed address only",
                    missed: ["Vase cancellation"],
                  },
                  {
                    shopper: "What's the status of order #4521? Also, can I add a card message?",
                    agent: "Agent gave status",
                    missed: ["Card message"],
                  },
                ].map((example, idx) => (
                  <div key={idx} style={{ marginBottom: "16px", paddingBottom: "16px", borderBottom: idx < 2 ? `1px solid ${t.surfaceInset}` : "none" }}>
                    <div style={{ fontSize: "12px", color: t.text700, marginBottom: "8px", borderLeft: `3px solid ${t.accent}`, paddingLeft: "12px" }}>
                      <strong>Shopper:</strong> {example.shopper}
                    </div>
                    <div style={{ fontSize: "12px", color: t.text700, marginBottom: "8px", backgroundColor: t.surfaceInset, padding: "8px", borderRadius: "4px" }}>
                      <strong>Agent response:</strong> {example.agent}
                    </div>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {example.missed.map((missed, midx) => (
                        <span key={midx} style={{ backgroundColor: t.redBg, color: t.red, fontSize: "12px", padding: "2px 8px", borderRadius: "4px" }}>
                          {missed}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}

                <div style={{ backgroundColor: t.greenBg, border: `1px solid ${t.greenBorder}`, borderRadius: "6px", padding: "12px", marginTop: "12px" }}>
                  <div style={{ fontSize: "14px", fontWeight: "600", color: t.green, marginBottom: "8px" }}>Suggested fix:</div>
                  <div style={{ fontSize: "12px", color: t.text700, marginBottom: "8px" }}>
                    When a message contains multiple questions, acknowledge all of them before answering each in order of priority.
                  </div>
                  <div style={{ fontSize: "12px", color: t.green, fontWeight: "600", marginBottom: "8px" }}>
                    Impact: 73% of affected conversations (34 of 47)
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button onClick={() => setFixApplied(true)} style={{
                      backgroundColor: t.green,
                      color: "#ffffff",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      fontSize: "12px",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}>
                      Apply guidance update
                    </button>
                    <button style={{
                      backgroundColor: t.surface,
                      border: `1px solid ${t.sidebarDivider}`,
                      padding: "6px 12px",
                      borderRadius: "6px",
                      fontSize: "12px",
                      cursor: "pointer",
                      color: t.text700,
                    }}>
                      Edit first
                    </button>
                  </div>
                </div>

                <div style={{ fontSize: "12px", fontStyle: "italic", color: t.text700, marginTop: "12px" }}>
                  Gorgias detected this pattern proactively. Traditional monitors require you to define what to watch — this was found automatically.
                </div>
              </div>
            )}
            </>
          ) : (
            <div style={{ display: "flex", gap: "16px" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "14px", fontWeight: "600", color: t.green, marginBottom: "8px" }}>
                  ✓ Order Support — Guidance update applied. Monitoring for improvement over the next 48 hours.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Success State */}
        {fixApplied && (
          <div style={{ backgroundColor: t.greenBg, border: `1px solid ${t.greenBorder}`, borderRadius: "8px", padding: "16px", marginBottom: "24px", display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "16px", color: t.green }}>✓</span>
            <span style={{ fontSize: "14px", color: t.green, fontWeight: "600" }}>Guidance applied — monitoring for improvement</span>
          </div>
        )}

        {/* Skills Health - Journey 1 (4 cards) */}
        <div style={{ marginBottom: "24px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "600", color: t.text900, marginBottom: "12px" }}>Skills Health</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
            {[
              { name: "Order Support", confidence: 91, delta: "+2%", sparkline: [85, 87, 88, 90, 89, 91], status: "Healthy" },
              { name: "Pet Safety Advisor", confidence: 94, delta: "+4%", sparkline: [88, 89, 90, 93, 93, 94], status: "Healthy" },
              { name: "Gifting Assistant", confidence: 88, delta: "→0%", sparkline: [88, 88, 88, 88, 88, 88], status: "Healthy" },
              { name: "Subscription Manager", confidence: 96, delta: "+1%", sparkline: [94, 94, 95, 95, 96, 96], status: "Healthy" },
            ].map((skill, i) => (
              <div key={i} style={{ backgroundColor: t.surface, border: `1px solid ${t.sidebarDivider}`, borderRadius: "8px", padding: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "12px" }}>
                  <div style={{ fontSize: "14px", fontWeight: "600", color: t.text900 }}>{skill.name}</div>
                  <span style={{ backgroundColor: t.greenBg, color: t.green, fontSize: "10px", fontWeight: "600", padding: "2px 6px", borderRadius: "3px" }}>
                    {skill.status}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "12px" }}>
                  <div style={{ fontSize: "28px", fontWeight: "700", color: t.text900 }}>{skill.confidence}%</div>
                  <div style={{ fontSize: "12px", color: t.green, fontWeight: "600" }}>{skill.delta}</div>
                </div>
                <div style={{ display: "flex", gap: "2px", height: "20px", alignItems: "flex-end" }}>
                  {skill.sparkline.map((v, j) => (
                    <div key={j} style={{
                      flex: 1,
                      height: `${(v / 100) * 20}px`,
                      backgroundColor: t.accent,
                      borderRadius: "2px",
                    }}></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Business Intelligence - Journey 3 */}
        <div>
          <h3 style={{ fontSize: "16px", fontWeight: "600", color: t.text900, marginBottom: "4px" }}>Business Intelligence</h3>
          <div style={{ fontSize: "14px", color: t.text500, marginBottom: "16px" }}>Signals from your conversation data — ranked by business impact</div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              {
                title: "Sympathy gifting demand surge",
                severity: "High",
                team: "Ecommerce",
                finding: "340 contacts asked about sympathy/funeral gifting this week — up 40%. No dedicated collection exists.",
                action: "Create a Sympathy collection — estimated 80+ incremental conversions",
                button: "Route to ecommerce team",
              },
              {
                title: "Subscription vs. order confusion",
                severity: "High",
                team: "Ecommerce",
                finding: "Subscription cancellation intent in 12% of 'cancel order' conversations — likely UX labeling issue, not true churn.",
                action: "Flag for ecommerce team — potential to recover $4.2K monthly ARR",
                button: "Flag issue",
              },
              {
                title: "VIP post-resolution churn risk",
                severity: "Medium",
                team: "Marketing",
                finding: "VIP shoppers (LTV $500+) who contacted support have 34% lower repeat purchase rate.",
                action: "Trigger post-resolution retention flow via Klaviyo",
                button: "One-click activate",
              },
            ].map((insight, i) => (
              <div key={i} style={{ backgroundColor: t.surface, border: `1px solid ${t.sidebarDivider}`, borderRadius: "8px", overflow: "hidden" }}>
                <div onClick={() => setExpandedInsight(expandedInsight === i ? null : i)} style={{
                  padding: "16px",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "6px" }}>
                      <span style={{
                        backgroundColor: insight.severity === "High" ? t.redBg : t.amberBg,
                        color: insight.severity === "High" ? t.red : t.amber,
                        fontSize: "10px",
                        fontWeight: "600",
                        padding: "2px 6px",
                        borderRadius: "3px",
                      }}>
                        {insight.severity}
                      </span>
                      {insight.team && (
                        <span style={{
                          backgroundColor: t.surfaceInset,
                          color: t.text700,
                          fontSize: "12px",
                          padding: "2px 8px",
                          borderRadius: "4px",
                        }}>
                          {insight.team}
                        </span>
                      )}
                      <span style={{ fontSize: "14px", fontWeight: "600", color: t.text900 }}>{insight.title}</span>
                    </div>
                    <div style={{ fontSize: "12px", color: t.text700, lineHeight: "1.5" }}>{insight.finding}</div>
                  </div>
                  <span style={{ fontSize: "18px", marginLeft: "12px" }}>{expandedInsight === i ? "▲" : "▼"}</span>
                </div>

                {expandedInsight === i && (
                  <div style={{ borderTop: `1px solid ${t.sidebarDivider}`, padding: "16px", backgroundColor: t.surfaceMuted }}>
                    <div style={{ backgroundColor: t.accentLight, border: `1px solid ${t.accent}`, borderRadius: "6px", padding: "12px", marginBottom: "12px" }}>
                      <div style={{ fontSize: "12px", color: t.accentText, fontWeight: "600", marginBottom: "4px" }}>Recommended action:</div>
                      <div style={{ fontSize: "12px", color: t.text700 }}>{insight.action}</div>
                    </div>
                    <button style={{
                      backgroundColor: t.accent,
                      color: "#ffffff",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "6px",
                      fontSize: "14px",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}>
                      {insight.button}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Context Page (Knowledge Freshness) ───

const ContextPage = () => {
  const [reviewMode, setReviewMode] = useState(false);
  const [syncApproved, setSyncApproved] = useState(false);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", backgroundColor: t.pageBg, fontFamily: "Inter, sans-serif", minHeight: 0, overflow: "hidden" }}>
      {/* Page Header */}
      <div style={{ backgroundColor: t.surface, borderBottom: `1px solid ${t.sidebarDivider}`, padding: "24px 32px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "700", color: t.text900, margin: 0 }}>Context</h1>
        <div style={{ fontSize: "14px", color: t.text500, marginTop: "4px" }}>Knowledge sync · Data freshness · Product intelligence</div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "24px 32px" }}>
        {/* Knowledge Freshness Alert - top banner */}
        {!syncApproved && (
          <div style={{ backgroundColor: "#fefbf3", border: `1px solid ${t.amberBorder}`, borderRadius: "8px", padding: "16px", marginBottom: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <div style={{ fontSize: "14px", fontWeight: "600", color: t.text900 }}>
                3 products updated in Shopify since last sync — 1 affects pet safety guidance
              </div>
              <button onClick={() => setReviewMode(!reviewMode)} style={{
                backgroundColor: t.surface,
                border: `1px solid ${t.sidebarDivider}`,
                padding: "6px 12px",
                borderRadius: "6px",
                fontSize: "14px",
                cursor: "pointer",
                color: t.text700,
              }}>
                {reviewMode ? "Hide updates" : "Review updates"}
              </button>
            </div>
            <div style={{ fontSize: "12px", color: t.text700 }}>
              Last sync: 2 hours ago · Next scheduled: in 22 minutes
            </div>
          </div>
        )}

        {/* Diff View - shown when reviewMode */}
        {reviewMode && !syncApproved && (
          <div style={{ backgroundColor: t.surface, border: `1px solid ${t.sidebarDivider}`, borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
            <div style={{ fontSize: "14px", fontWeight: "600", color: t.text900, marginBottom: "16px" }}>Product updates:</div>

            {/* Main product with change */}
            <div style={{ marginBottom: "20px" }}>
              <div style={{ fontSize: "14px", fontWeight: "600", color: t.text900, marginBottom: "12px" }}>
                Valentine's Day Luxe Bouquet
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "12px" }}>
                <div style={{ backgroundColor: t.redBg, padding: "12px", borderRadius: "6px" }}>
                  <div style={{ fontSize: "12px", fontWeight: "500", color: t.text500, marginBottom: "6px" }}>Previous composition</div>
                  <div style={{ fontSize: "14px", color: t.red, textDecoration: "line-through" }}>
                    Red roses, baby's breath, eucalyptus
                  </div>
                </div>
                <div style={{ backgroundColor: t.greenBg, padding: "12px", borderRadius: "6px" }}>
                  <div style={{ fontSize: "12px", fontWeight: "500", color: t.text500, marginBottom: "6px" }}>New composition</div>
                  <div style={{ fontSize: "14px", color: t.green }}>
                    Red roses, white lilies, baby's breath, eucalyptus
                  </div>
                </div>
              </div>

              <div style={{ backgroundColor: t.redBg, border: `1px solid ${t.redBorder}`, borderRadius: "6px", padding: "12px" }}>
                <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "16px", marginTop: "2px" }}>⚠️</span>
                  <div>
                    <div style={{ fontSize: "12px", fontWeight: "600", color: t.red, marginBottom: "4px" }}>Pet Safety Flag</div>
                    <div style={{ fontSize: "12px", color: t.text700 }}>
                      Lilies are toxic to cats. This product was previously marked as pet-safe. The Pet Safety Advisor skill will need to update its guidance.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Other updates - smaller */}
            <div style={{ paddingTop: "16px", borderTop: `1px solid ${t.sidebarDivider}` }}>
              <div style={{ fontSize: "12px", color: t.text700, marginBottom: "12px" }}>
                <span style={{ fontWeight: "600" }}>Spring Garden Mix</span> — Price updated: <span style={{ textDecoration: "line-through", color: t.text500 }}>$69</span> → $75
              </div>
              <div style={{ fontSize: "12px", color: t.text700 }}>
                <span style={{ fontWeight: "600" }}>Succulent Trio</span> — Back in stock
              </div>
            </div>

            <div style={{ display: "flex", gap: "8px", marginTop: "16px", paddingTop: "16px", borderTop: `1px solid ${t.sidebarDivider}` }}>
              <button onClick={() => { setSyncApproved(true); setReviewMode(false); }} style={{
                backgroundColor: t.green,
                color: "#ffffff",
                border: "none",
                padding: "8px 16px",
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
              }}>
                Approve sync
              </button>
              <button style={{
                backgroundColor: t.surface,
                border: `1px solid ${t.sidebarDivider}`,
                padding: "8px 16px",
                borderRadius: "6px",
                fontSize: "14px",
                cursor: "pointer",
                color: t.text700,
              }}>
                Review individually
              </button>
            </div>
          </div>
        )}

        {/* Post-Sync State */}
        {syncApproved && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
            <div style={{ backgroundColor: t.greenBg, border: `1px solid ${t.greenBorder}`, borderRadius: "8px", padding: "16px", display: "flex", gap: "12px", alignItems: "center" }}>
              <span style={{ fontSize: "18px" }}>✓</span>
              <span style={{ fontSize: "14px", color: t.green, fontWeight: "600" }}>Knowledge sync complete — 3 products updated</span>
            </div>

            <div style={{ backgroundColor: t.surface, border: `1px solid ${t.sidebarDivider}`, borderRadius: "8px", padding: "16px" }}>
              <div style={{ fontSize: "14px", fontWeight: "600", color: t.text900, marginBottom: "8px" }}>Pet Safety Advisor confidence updated</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
                <span style={{ fontSize: "12px", color: t.text700 }}>94% →</span>
                <span style={{ fontSize: "24px", fontWeight: "700", color: t.green }}>98%</span>
              </div>
            </div>

            <div style={{ backgroundColor: t.accentLight, border: `1px solid ${t.accent}`, borderRadius: "8px", padding: "16px" }}>
              <div style={{ fontSize: "14px", fontWeight: "600", color: t.accentText, marginBottom: "8px" }}>Proactive suggestion</div>
              <div style={{ fontSize: "12px", color: t.text700, marginBottom: "12px" }}>
                Consider adding a 'pet-safe filter' to the Shopping Assistant — 12% of recent gifting conversations mentioned pets
              </div>
              <button style={{
                backgroundColor: t.accent,
                color: "#ffffff",
                border: "none",
                padding: "6px 12px",
                borderRadius: "6px",
                fontSize: "12px",
                fontWeight: "600",
                cursor: "pointer",
              }}>
                Add filter
              </button>
            </div>
          </div>
        )}

        {/* Knowledge Sources Section */}
        <div>
          <h3 style={{ fontSize: "16px", fontWeight: "600", color: t.text900, marginBottom: "12px" }}>Knowledge sources</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
            {[
              { name: "Shopify Catalog", items: "2,341 products", lastSync: "2 hours ago" },
              { name: "Help Center", items: "45 articles", lastSync: "1 day ago" },
              { name: "Order Policies", items: "12 rules", lastSync: "3 days ago" },
              { name: "Brand Guidelines", items: "1 document", lastSync: "5 days ago" },
            ].map((source, i) => (
              <div key={i} style={{ backgroundColor: t.surface, border: `1px solid ${t.sidebarDivider}`, borderRadius: "8px", padding: "16px" }}>
                <div style={{ fontSize: "14px", fontWeight: "600", color: t.text900, marginBottom: "8px" }}>{source.name}</div>
                <div style={{ fontSize: "12px", color: t.text700, marginBottom: "6px" }}>{source.items}</div>
                <div style={{ fontSize: "12px", color: t.text500 }}>Synced {source.lastSync}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Tools Page ───

const ToolsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStore, setFilterStore] = useState("All");
  const [showToast, setShowToast] = useState(true);

  // App types with icons (matching screenshot: blue circle = Loop Returns, yellow/brown = Shopify, chain = ShipMonk)
  const appTypes = {
    "Loop Returns": { color: "#3b82f6", letter: "L" },
    "Shopify": { color: "#95bf47", letter: "S" },
    "ShipMonk": { color: "#6b7280", letter: "⛓" },
  };

  const stores = [
    { id: "steve-madden-us", name: "steve-madden-us", icon: "S", color: "#95bf47" },
    { id: "steve-madden-uk", name: "steve-madden-uk", icon: "S", color: "#95bf47" },
    { id: "steve-madden-ca", name: "steve-madden-ca", icon: "S", color: "#95bf47" },
    { id: "steve-madden-eu", name: "steve-madden-eu", icon: "S", color: "#95bf47" },
  ];

  const actions = [
    { id: 1, app: "Loop Returns", action: "Returns and exchanges", stores: ["steve-madden-us", "steve-madden-uk", "steve-madden-ca"], enabled: true, totalTickets: 1204, successRate: 45 },
    { id: 2, app: "Loop Returns", action: "Returns and exchanges", stores: ["steve-madden-us"], enabled: true, totalTickets: 1103, successRate: 55 },
    { id: 3, app: "Loop Returns", action: "Send return portal link", stores: ["steve-madden-us", "steve-madden-uk"], enabled: true, totalTickets: 230, successRate: 76 },
    { id: 4, app: "Loop Returns", action: "Send return portal link", stores: ["steve-madden-us"], enabled: true, totalTickets: 220, successRate: 45 },
    { id: 5, app: "Loop Returns", action: "Send return portal link", stores: ["steve-madden-uk"], enabled: true, totalTickets: 210, successRate: 87 },
    { id: 6, app: "Shopify", action: "Update stock", stores: ["steve-madden-us"], enabled: true, totalTickets: null, successRate: null },
    { id: 7, app: "Shopify", action: "Remove item from stock", stores: ["steve-madden-us"], enabled: true, totalTickets: null, successRate: null },
    { id: 8, app: "Shopify", action: "Get order info", stores: ["steve-madden-us"], enabled: true, totalTickets: null, successRate: null },
    { id: 9, app: "Shopify", action: "Cancel order", stores: ["steve-madden-us"], enabled: true, totalTickets: null, successRate: null },
    { id: 10, app: "Shopify", action: "Return item from an order in Shopify", stores: ["steve-madden-us"], enabled: true, totalTickets: null, successRate: null },
    { id: 11, app: "Shopify", action: "Update shipping address", stores: ["steve-madden-us"], enabled: true, totalTickets: null, successRate: null },
    { id: 12, app: "Shopify", action: "Update inventory", stores: ["steve-madden-us"], enabled: true, totalTickets: null, successRate: null },
    { id: 13, app: "ShipMonk", action: "Get restock details", stores: ["steve-madden-us", "steve-madden-uk", "steve-madden-ca", "steve-madden-eu"], enabled: true, totalTickets: null, successRate: null },
    { id: 14, app: "ShipMonk", action: "Get product weight or dimensions", stores: ["steve-madden-us", "steve-madden-uk", "steve-madden-ca", "steve-madden-eu"], enabled: true, totalTickets: null, successRate: null },
  ];

  const filtered = actions.filter(a => {
    if (searchQuery && !a.action.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (filterStore !== "All" && !a.stores.includes(filterStore)) return false;
    return true;
  });

  const totalActions = 23;

  const AppIcon = ({ app }) => {
    const cfg = appTypes[app] || { color: "#9ca3af", letter: "?" };
    return (
      <div style={{ width: "28px", height: "28px", borderRadius: "6px", backgroundColor: cfg.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "700", color: "#fff", flexShrink: 0 }}>
        {cfg.letter}
      </div>
    );
  };

  const Toggle = ({ enabled }) => (
    <div style={{ width: "36px", height: "20px", borderRadius: "10px", backgroundColor: enabled ? "#7c5cfc" : t.surfaceTertiary, position: "relative", cursor: "pointer", flexShrink: 0 }}>
      <div style={{ width: "16px", height: "16px", borderRadius: "50%", backgroundColor: "#fff", position: "absolute", top: "2px", left: enabled ? "18px" : "2px", transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
    </div>
  );

  const StoresBadge = ({ storeIds }) => {
    if (storeIds.length > 1) {
      return (
        <span style={{ backgroundColor: t.surfaceMuted, border: `1px solid ${t.sidebarDivider}`, borderRadius: "4px", padding: "3px 10px", fontSize: "12px", color: t.text700, fontWeight: "500", whiteSpace: "nowrap" }}>
          {storeIds.length} stores
        </span>
      );
    }
    const store = stores.find(s => s.id === storeIds[0]);
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <div style={{ width: "18px", height: "18px", borderRadius: "4px", backgroundColor: store?.color || "#95bf47", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "700", color: "#fff", flexShrink: 0 }}>
          {store?.icon || "S"}
        </div>
        <span style={{ fontSize: "14px", color: t.text700 }}>{store?.name || storeIds[0]}</span>
      </div>
    );
  };

  const FilterPill = ({ label, onRemove }) => (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: "#eef2ff", border: "1px solid #c7d2fe", borderRadius: "4px", padding: "4px 10px", fontSize: "12px", color: "#4338ca" }}>
      <span>{label}</span>
      <span onClick={onRemove} style={{ cursor: "pointer", fontSize: "14px", lineHeight: 1, color: "#6366f1" }}>×</span>
    </div>
  );

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", backgroundColor: t.pageBg, fontFamily: "Inter, sans-serif", minHeight: 0, overflow: "hidden" }}>
        {/* Header */}
        <div style={{ backgroundColor: t.surface, borderBottom: `1px solid ${t.sidebarDivider}`, padding: "24px 32px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h1 style={{ fontSize: "24px", fontWeight: "700", color: t.text900, margin: "0 0 4px 0" }}>Tools</h1>
            <div style={{ fontSize: "14px", color: t.text500 }}>Manage your library of tools across AI Agent and Helpdesk.</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <a href="#" style={{ fontSize: "14px", color: t.text700, textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}>
              Learning resources
              <span style={{ fontSize: "12px" }}>↗</span>
            </a>
            <button style={{ backgroundColor: t.brand, color: t.brandText, border: "none", padding: "8px 16px", borderRadius: "6px", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>
              Create tool
            </button>
          </div>
        </div>

        {/* Search + Filters */}
        <div style={{ backgroundColor: t.surface, padding: "0 40px 16px" }}>
          {/* Search row */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1, maxWidth: "320px", backgroundColor: t.surface, border: `1px solid ${t.sidebarDivider}`, borderRadius: "6px", padding: "8px 12px" }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5" stroke={t.text400} strokeWidth="1.5"/><path d="M11 11l3.5 3.5" stroke={t.text400} strokeWidth="1.5" strokeLinecap="round"/></svg>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ border: "none", outline: "none", fontSize: "14px", fontFamily: "Inter, sans-serif", flex: 1, backgroundColor: "transparent", color: t.text900 }}
              />
            </div>
            <button style={{ display: "flex", alignItems: "center", gap: "4px", backgroundColor: "transparent", border: "none", fontSize: "14px", color: t.text700, cursor: "pointer", fontFamily: "Inter, sans-serif", fontWeight: "500" }}>
              Add filter <span style={{ fontSize: "10px" }}>▾</span>
            </button>
          </div>

          {/* Active filters */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
            <FilterPill label="Date from 01/03/2026 to 13/03/2026" onRemove={() => {}} />
            <FilterPill label={`Store is ${filterStore}`} onRemove={() => setFilterStore("All")} />
            <span onClick={() => setFilterStore("All")} style={{ fontSize: "14px", color: t.text700, cursor: "pointer", fontWeight: "500" }}>Clear</span>
          </div>

          {/* Count + Edit table */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "14px", color: t.text500 }}>Showing {filtered.length} of {totalActions} items</span>
            <button style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: "transparent", border: "none", fontSize: "14px", color: t.text700, cursor: "pointer", fontFamily: "Inter, sans-serif", fontWeight: "500" }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="5" height="5" rx="1" stroke={t.text500} strokeWidth="1.5"/><rect x="9" y="2" width="5" height="5" rx="1" stroke={t.text500} strokeWidth="1.5"/><rect x="2" y="9" width="5" height="5" rx="1" stroke={t.text500} strokeWidth="1.5"/><rect x="9" y="9" width="5" height="5" rx="1" stroke={t.text500} strokeWidth="1.5"/></svg>
              Edit table
            </button>
          </div>
        </div>

        {/* Actions Table */}
        <div style={{ flex: 1, overflowY: "auto", padding: "0 40px 24px" }}>
          <div style={{ backgroundColor: t.surface, border: `1px solid ${t.sidebarDivider}`, borderRadius: "8px", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${t.sidebarDivider}` }}>
                  <th style={{ padding: "10px 12px", textAlign: "center", fontWeight: "400", color: t.text500, width: "40px" }}>
                    <input type="checkbox" style={{ width: "14px", height: "14px", cursor: "pointer", accentColor: t.accent }} />
                  </th>
                  <th style={{ padding: "10px 12px", textAlign: "left", fontWeight: "500", color: t.text700, fontSize: "12px", width: "50px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>App <span style={{ fontSize: "10px" }}>↓</span></div>
                  </th>
                  <th style={{ padding: "10px 12px", textAlign: "left", fontWeight: "500", color: t.text700, fontSize: "12px" }}>Action</th>
                  <th style={{ padding: "10px 12px", textAlign: "left", fontWeight: "500", color: t.text700, fontSize: "12px" }}>Stores</th>
                  <th style={{ padding: "10px 12px", textAlign: "left", fontWeight: "500", color: t.text700, fontSize: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>Status <span style={{ fontSize: "12px", color: t.text400 }}>ⓘ</span></div>
                  </th>
                  <th style={{ padding: "10px 12px", textAlign: "left", fontWeight: "500", color: t.text700, fontSize: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>Total tickets <span style={{ fontSize: "12px", color: t.text400 }}>ⓘ</span></div>
                  </th>
                  <th style={{ padding: "10px 12px", textAlign: "left", fontWeight: "500", color: t.text700, fontSize: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>Success rate <span style={{ fontSize: "12px", color: t.text400 }}>ⓘ</span></div>
                  </th>
                  <th style={{ padding: "10px 12px", width: "40px" }}></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((action, i) => (
                  <tr key={action.id} style={{ borderBottom: i < filtered.length - 1 ? `1px solid ${t.sidebarDivider}` : "none", cursor: "pointer" }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = t.surfaceMuted}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                  >
                    <td style={{ padding: "10px 12px", textAlign: "center" }}>
                      <input type="checkbox" style={{ width: "14px", height: "14px", cursor: "pointer", accentColor: t.accent }} />
                    </td>
                    <td style={{ padding: "10px 12px" }}>
                      <AppIcon app={action.app} />
                    </td>
                    <td style={{ padding: "10px 12px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <Toggle enabled={action.enabled} />
                        <span style={{ fontSize: "14px", color: t.text900, fontWeight: "400" }}>{action.action}</span>
                      </div>
                    </td>
                    <td style={{ padding: "10px 12px" }}>
                      <StoresBadge storeIds={action.stores} />
                    </td>
                    <td style={{ padding: "10px 12px" }}>
                      <span style={{ backgroundColor: "#e9fbf5", color: "#1a7a5a", fontSize: "12px", fontWeight: "500", padding: "3px 10px", borderRadius: "4px" }}>Enabled</span>
                    </td>
                    <td style={{ padding: "10px 12px", fontSize: "14px", color: action.totalTickets ? t.text900 : t.text400, fontVariantNumeric: "tabular-nums" }}>
                      {action.totalTickets ? action.totalTickets.toLocaleString() : "–"}
                    </td>
                    <td style={{ padding: "10px 12px", fontSize: "14px", color: action.successRate ? t.text900 : t.text400, fontVariantNumeric: "tabular-nums" }}>
                      {action.successRate ? `${action.successRate}%` : "–"}
                    </td>
                    <td style={{ padding: "10px 12px", textAlign: "center" }}>
                      <span style={{ fontSize: "16px", color: t.text400, cursor: "pointer", letterSpacing: "1px" }}>⋯</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Toast notification */}
        {showToast && (
          <div style={{ position: "fixed", bottom: "24px", right: "24px", backgroundColor: t.surface, border: `1px solid ${t.sidebarDivider}`, borderRadius: "8px", padding: "14px 18px", boxShadow: "0 4px 16px rgba(0,0,0,0.12)", maxWidth: "360px", zIndex: 50, display: "flex", alignItems: "flex-start", gap: "12px" }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "14px", fontWeight: "600", color: t.text900, marginBottom: "4px" }}>ShipMonk integration 1 connected to steve-madden-us</div>
              <div style={{ fontSize: "12px", color: t.text500 }}>Enable tools you want to use.</div>
            </div>
            <button onClick={() => setShowToast(false)} style={{ border: "none", backgroundColor: "transparent", color: t.text400, fontSize: "16px", cursor: "pointer", padding: "0", lineHeight: 1, flexShrink: 0 }}>×</button>
          </div>
        )}
    </div>
  );
};

// ─── Evaluations Page (with New Eval drawer + Live Results) ───

const EvaluationsPage = () => {
  const [selectedRun, setSelectedRun] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerStep, setDrawerStep] = useState(1);
  const [evalSkill, setEvalSkill] = useState("");
  const [evalTicketCount, setEvalTicketCount] = useState(80);
  const [evalTicketSource, setEvalTicketSource] = useState("7d");
  const [evalScorer, setEvalScorer] = useState("");
  const [evalName, setEvalName] = useState("eval-043");
  const [liveResults, setLiveResults] = useState(null);
  const [liveProgress, setLiveProgress] = useState(0);
  const [liveThreads, setLiveThreads] = useState([]);
  const [liveScores, setLiveScores] = useState({ accuracy: null, brand: null, resolution: null, overall: null });
  const [liveDone, setLiveDone] = useState(false);
  const [expandedThread, setExpandedThread] = useState(null);

  const evalConfig = {
    task: "Order status, tracking or delivery timing",
    dataset: "Recent tickets (last 7d, n=150)",
    scorers: ["The Rushed Gift-Giver", "The Plant Parent", "The Complaint Handler"],
  };

  const runs = [
    { id: "eval-042", date: "Mar 24, 2026", skill: "Order status", dataset: "150 tickets", scores: { accuracy: 94, brand: 88, resolution: 91 }, overall: 91, status: "Passed", duration: "4m 12s" },
    { id: "eval-041", date: "Mar 23, 2026", skill: "Order cancellation", dataset: "120 tickets", scores: { accuracy: 89, brand: 85, resolution: 82 }, overall: 85, status: "Passed", duration: "3m 48s" },
    { id: "eval-040", date: "Mar 22, 2026", skill: "Product recommendations", dataset: "90 tickets", scores: { accuracy: 92, brand: 94, resolution: 88 }, overall: 91, status: "Passed", duration: "2m 55s" },
    { id: "eval-039", date: "Mar 21, 2026", skill: "Shipping address changes", dataset: "80 tickets", scores: { accuracy: 78, brand: 82, resolution: 71 }, overall: 77, status: "Failed", duration: "2m 30s" },
    { id: "eval-038", date: "Mar 20, 2026", skill: "Payment issues", dataset: "65 tickets", scores: { accuracy: 86, brand: 80, resolution: 84 }, overall: 83, status: "Passed", duration: "2m 10s" },
    { id: "eval-037", date: "Mar 19, 2026", skill: "Subscription management", dataset: "50 tickets", scores: { accuracy: 72, brand: 78, resolution: 68 }, overall: 73, status: "Failed", duration: "1m 55s" },
  ];

  const skillOptions = [
    { id: "order-status", name: "Order status", desc: "Handles inquiries about order tracking, delivery estimates, and shipment status updates.", tickets: 142 },
    { id: "order-cancel", name: "Order cancellation", desc: "Processes cancellation requests, checks eligibility windows, and handles partial cancellations.", tickets: 98 },
    { id: "product-recs", name: "Product recommendations", desc: "Suggests products based on occasion, budget, and recipient preferences.", tickets: 74 },
    { id: "shipping-address", name: "Shipping address changes", desc: "Handles address modification requests for pending orders.", tickets: 63 },
    { id: "payment-issues", name: "Payment issues", desc: "Troubleshoots failed payments, processes refunds, and assists with payment method updates.", tickets: 55 },
    { id: "subscription", name: "Subscription management", desc: "Manages recurring delivery subscriptions — pause, skip, modify, or cancel.", tickets: 41 },
    { id: "returns", name: "Returns & refunds", desc: "Guides customers through return eligibility, generates labels, and processes refunds.", tickets: 88 },
  ];

  const scorerOptions = [
    { id: "rushed-gift-giver", name: "The Rushed Gift-Giver", desc: "Impatient, needs fast answers about delivery timing. Judges speed, clarity, and proactive alternatives.", type: "Persona", icon: "gift", uses: 12 },
    { id: "plant-parent", name: "The Plant Parent", desc: "Detail-oriented, cares about care instructions and packaging. Judges thoroughness, empathy, and product knowledge.", type: "Persona", icon: "bookmark", uses: 8 },
    { id: "complaint-handler", name: "The Complaint Handler", desc: "Escalation-prone, tests de-escalation ability. Judges tone, resolution offered, and composure under pressure.", type: "Persona", icon: "warning", uses: 6 },
    { id: "brand-voice", name: "Brand Voice Compliance", desc: "Evaluates whether responses match Urban Stems' warm, approachable tone. Checks for banned phrases.", type: "Custom", icon: "edit_pencil", uses: 4 },
    { id: "resolution-rate", name: "First-Contact Resolution", desc: "Measures whether the agent fully resolves the issue without follow-up. Strict pass/fail.", type: "Custom", icon: "trending_up", uses: 3 },
  ];

  const sampleThreads = [
    { id: "TK-29481", subject: "Where is my order? It says processing", accuracy: 96, brand: 92, resolution: 94, messages: [
      { sender: "customer", text: "Hi! I placed an order 3 days ago for my mom's birthday and it still says \"processing.\" Her birthday is tomorrow — is it going to arrive in time?" },
      { sender: "agent", text: "I totally understand the urgency — birthday deliveries are so important! Let me look that up for you right now.\n\nI found your order #US-48291. Great news: it's already been shipped and is with FedEx (tracking: 7291038). It's currently in transit and is scheduled for delivery tomorrow by 2pm.\n\nWould you like me to send you the tracking link so you can follow it in real time?" },
    ], feedback: "Strong response. Acknowledged urgency immediately, provided specific details (order number, carrier, tracking, ETA), and offered a proactive next step. Tone matches the situation — warm but efficient." },
    { id: "TK-29483", subject: "My flowers arrived wilted", accuracy: 88, brand: 85, resolution: 82, messages: [
      { sender: "customer", text: "Really disappointed. Spent $75 on a bouquet for my anniversary and the flowers arrived completely wilted. This is embarrassing." },
      { sender: "agent", text: "I'm so sorry to hear that — that's definitely not the experience we want for such a special occasion.\n\nI've gone ahead and issued a full refund of $75 to your original payment method. You should see it within 3-5 business days. I'd also love to send a complimentary replacement bouquet — would tomorrow work for delivery?" },
    ], feedback: "Good empathy and fast resolution. Could improve by asking for a photo first (quality documentation). The replacement offer is a strong recovery move." },
    { id: "TK-29487", subject: "Can I change delivery address?", accuracy: 91, brand: 90, resolution: 88, messages: [
      { sender: "customer", text: "Hey, I need to change the delivery address on my order. I accidentally put my old apartment. New address is 445 Pine St Apt 3B." },
      { sender: "agent", text: "No worries, happy to help with that! Let me check on your order.\n\nI found order #US-48302. It hasn't been picked up by the carrier yet, so we're in good shape. I've updated the delivery address to 445 Pine St, Apt 3B.\n\nJust to confirm — is the city and zip code the same as before, or do those need updating too?" },
    ], feedback: "Good catch asking about city/zip since the customer only provided the street address. Confirmed the order status to set expectations. Friendly, efficient tone." },
    { id: "TK-29490", subject: "Subscription — skip next month", accuracy: 93, brand: 91, resolution: 95, messages: [
      { sender: "customer", text: "I want to skip my next flower delivery. Going on vacation and nobody will be home." },
      { sender: "agent", text: "Makes total sense — enjoy your vacation! I've skipped your next delivery (scheduled for April 2nd). Your subscription will automatically resume on May 2nd.\n\nIf your plans change, you can always un-skip from your account page, or just let me know. Have a great trip!" },
    ], feedback: "Excellent. Handled the request immediately, confirmed the specific date being skipped AND when it resumes, and offered an easy way to undo. The closing feels natural, not scripted." },
    { id: "TK-29495", subject: "Wrong item received", accuracy: 79, brand: 78, resolution: 71, messages: [
      { sender: "customer", text: "I ordered the Classic Rose Bouquet but received some random succulent arrangement instead. This was supposed to be a sympathy gift for a friend who lost her mother." },
      { sender: "agent", text: "I apologize for the mix-up with your order. Let me look into this.\n\nI can see order #US-48310 — it looks like there was a fulfillment error. I'll arrange for the correct Classic Rose Bouquet to be sent out as a priority delivery tomorrow. You don't need to return the succulent arrangement.\n\nIs there anything else I can help with?" },
    ], feedback: "Resolution mechanics are fine (priority reship, no return needed), but misses the emotional weight. \"I apologize for the mix-up\" is too generic for a sympathy gift gone wrong. Should have acknowledged the distress before jumping to logistics." },
  ];

  const scoreColor = (s) => s >= 90 ? t.green : s >= 80 ? t.text900 : s >= 70 ? t.amber : t.red;
  const scoreBg = (s) => s >= 90 ? t.greenBg : s >= 80 ? "transparent" : s >= 70 ? t.amberBg : t.redBg;

  const selectedSkillData = skillOptions.find(s => s.id === evalSkill);
  const selectedScorerData = scorerOptions.find(s => s.id === evalScorer);
  const maxTickets = selectedSkillData ? selectedSkillData.tickets : 150;

  const intervalRef = useRef(null);

  // Cleanup interval on unmount or when navigating away
  useEffect(() => {
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const openDrawer = () => { setDrawerStep(1); setEvalSkill(""); setEvalTicketCount(80); setEvalTicketSource("7d"); setEvalScorer(""); setEvalName("eval-043"); setDrawerOpen(true); };
  const closeDrawer = () => setDrawerOpen(false);
  const canContinue = () => { if (drawerStep === 1) return !!evalSkill; if (drawerStep === 3) return !!evalScorer; return true; };
  const nextStep = () => { if (drawerStep === 4) { runEval(); return; } setDrawerStep(Math.min(drawerStep + 1, 4)); };
  const prevStep = () => setDrawerStep(Math.max(drawerStep - 1, 1));

  const runEval = () => {
    // Clear any previous interval
    if (intervalRef.current) clearInterval(intervalRef.current);
    closeDrawer(); setLiveProgress(0); setLiveThreads([]); setLiveScores({ accuracy: null, brand: null, resolution: null, overall: null }); setLiveDone(false); setExpandedThread(null);
    setLiveResults({ name: evalName, skill: selectedSkillData?.name || "", tickets: evalTicketCount, scorer: selectedScorerData?.name || "" });
    let step = 0; let threadIdx = 0;
    const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    intervalRef.current = setInterval(() => {
      step++;
      setLiveProgress(Math.min(Math.round((step / 8) * 100), 100));
      if (step >= 2) setLiveScores(prev => ({ ...prev, accuracy: rand(85, 96) }));
      if (step >= 3) setLiveScores(prev => ({ ...prev, brand: rand(82, 92) }));
      if (step >= 4) setLiveScores(prev => ({ ...prev, resolution: rand(80, 94) }));
      if (step >= 2) setLiveScores(prev => { const v = [prev.accuracy, prev.brand, prev.resolution].filter(x => x !== null); return { ...prev, overall: v.length ? Math.round(v.reduce((a, b) => a + b, 0) / v.length) : null }; });
      if (threadIdx < sampleThreads.length) { setLiveThreads(prev => [...prev, sampleThreads[threadIdx]]); threadIdx++; }
      if (step >= 8) { clearInterval(intervalRef.current); intervalRef.current = null; setLiveDone(true); }
    }, 900);
  };

  // Stepper sub-components
  const StepDot = ({ num, label }) => {
    const isActive = drawerStep === num, isComplete = drawerStep > num;
    return (<div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
      <div style={{ width: "26px", height: "26px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700", flexShrink: 0, border: `2px solid ${isComplete ? t.green : isActive ? t.accent : t.surfaceTertiary}`, backgroundColor: isComplete ? t.green : isActive ? t.accent : t.surface, color: isComplete || isActive ? "#fff" : t.text400 }}>{isComplete ? "✓" : num}</div>
      <span style={{ fontSize: "12px", fontWeight: isActive ? "600" : "400", color: isComplete ? t.green : isActive ? t.accentText : t.text400, whiteSpace: "nowrap" }}>{label}</span>
    </div>);
  };
  const StepLine = ({ afterStep }) => (<div style={{ flex: 1, height: "2px", backgroundColor: drawerStep > afterStep ? t.green : t.surfaceTertiary, margin: "0 6px", alignSelf: "center", minWidth: "16px" }} />);

  // Scorer card sub-component
  const ScorerCard = ({ scorer }) => {
    const sel = evalScorer === scorer.id;
    return (<div onClick={() => setEvalScorer(scorer.id)} style={{ border: `2px solid ${sel ? t.accent : t.surfaceTertiary}`, borderRadius: "8px", padding: "12px 14px", marginBottom: "8px", cursor: "pointer", backgroundColor: sel ? t.accentLight : t.surface, display: "flex", alignItems: "flex-start", gap: "12px", transition: "all 0.15s" }} onMouseEnter={e => { if (!sel) e.currentTarget.style.borderColor = t.text300; }} onMouseLeave={e => { if (!sel) e.currentTarget.style.borderColor = sel ? t.accent : t.surfaceTertiary; }}>
      <div style={{ width: "18px", height: "18px", borderRadius: "50%", flexShrink: 0, marginTop: "2px", border: `2px solid ${sel ? t.accent : t.text300}`, display: "flex", alignItems: "center", justifyContent: "center" }}>{sel && <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: t.accent }} />}</div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}><Icon name={scorer.icon} size={14} color={t.text700} /><span style={{ fontSize: "14px", fontWeight: "600", color: t.text900 }}>{scorer.name}</span></div>
        <div style={{ fontSize: "12px", color: t.text700, lineHeight: "1.5", marginTop: "4px" }}>{scorer.desc}</div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "6px" }}>
          <span style={{ padding: "1px 7px", borderRadius: "4px", fontSize: "10px", fontWeight: "600", textTransform: "uppercase", backgroundColor: scorer.type === "Persona" ? t.amberBg : t.blueBg, color: scorer.type === "Persona" ? t.amber : t.blue }}>{scorer.type}</span>
          <span style={{ fontSize: "12px", color: t.text400 }}>Used in {scorer.uses} evals</span>
        </div>
      </div>
    </div>);
  };

  // Thread card for live results
  const ThreadCard = ({ thread, index }) => {
    const isExp = expandedThread === index;
    return (<div style={{ backgroundColor: t.surface, border: `1px solid ${isExp ? t.accent : t.sidebarDivider}`, borderRadius: "8px", marginBottom: "10px", overflow: "hidden", cursor: "pointer", transition: "all 0.2s" }}
      onClick={() => setExpandedThread(isExp ? null : index)} onMouseEnter={e => { if (!isExp) e.currentTarget.style.borderColor = t.text300; }} onMouseLeave={e => { e.currentTarget.style.borderColor = isExp ? t.accent : t.sidebarDivider; }}>
      <div style={{ padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "14px", fontWeight: "600", color: t.accentText }}>{thread.id}</span>
          <span style={{ fontSize: "14px", color: t.text700 }}>{thread.subject}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <span style={{ fontSize: "12px", color: t.text400 }}>Acc <span style={{ fontWeight: "700", color: scoreColor(thread.accuracy) }}>{thread.accuracy}</span></span>
          <span style={{ fontSize: "12px", color: t.text400 }}>Brand <span style={{ fontWeight: "700", color: scoreColor(thread.brand) }}>{thread.brand}</span></span>
          <span style={{ fontSize: "12px", color: t.text400 }}>Res <span style={{ fontWeight: "700", color: scoreColor(thread.resolution) }}>{thread.resolution}</span></span>
          <span style={{ fontSize: "16px", color: t.text400, transition: "transform 0.2s", transform: isExp ? "rotate(180deg)" : "rotate(0deg)" }}>▾</span>
        </div>
      </div>
      {isExp && (<div style={{ borderTop: `1px solid ${t.sidebarDivider}`, padding: "16px" }}>
        {thread.messages.map((msg, mi) => (<div key={mi} style={{ padding: "10px 12px", borderRadius: "8px", marginBottom: "10px", backgroundColor: msg.sender === "customer" ? t.surfaceMuted : t.accentLight }}>
          <div style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.3px", marginBottom: "4px", color: msg.sender === "customer" ? t.text500 : t.accentText }}>{msg.sender === "customer" ? "Customer" : "AI Agent"}</div>
          <div style={{ fontSize: "14px", lineHeight: "1.6", color: t.text900, whiteSpace: "pre-line" }}>{msg.text}</div>
        </div>))}
        <div style={{ padding: "10px 12px", backgroundColor: t.amberBg, border: `1px solid ${t.amberBorder}`, borderRadius: "8px", marginTop: "4px" }}>
          <div style={{ fontSize: "12px", fontWeight: "700", color: t.amber, textTransform: "uppercase", letterSpacing: "0.3px", marginBottom: "4px" }}>Scorer feedback — {liveResults?.scorer || "The Rushed Gift-Giver"}</div>
          <div style={{ fontSize: "14px", color: "#78350f", lineHeight: "1.5" }}>{thread.feedback}</div>
        </div>
      </div>)}
    </div>);
  };

  // ═══════ LIVE RESULTS VIEW ═══════
  if (liveResults) {
    return (<div style={{ flex: 1, display: "flex", flexDirection: "column", backgroundColor: t.pageBg, fontFamily: "Inter, sans-serif", minHeight: 0, overflow: "hidden" }}>
      <div style={{ backgroundColor: t.surface, borderBottom: `1px solid ${t.sidebarDivider}`, padding: "24px 32px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button onClick={() => { if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; } setLiveResults(null); }} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "16px", color: t.text500, padding: 0 }}>←</button>
            <h1 style={{ fontSize: "24px", fontWeight: "700", color: t.text900, margin: 0 }}>{liveResults.name}</h1>
            {liveDone && <span style={{ backgroundColor: (liveScores.overall || 0) >= 85 ? t.greenBg : t.redBg, color: (liveScores.overall || 0) >= 85 ? t.green : t.red, fontSize: "12px", fontWeight: "600", padding: "2px 10px", borderRadius: "4px" }}>{(liveScores.overall || 0) >= 85 ? "Passed" : "Failed"}</span>}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {!liveDone && <div style={{ width: "16px", height: "16px", border: `2.5px solid ${t.surfaceTertiary}`, borderTopColor: t.accent, borderRadius: "50%", animation: "evalspin 0.8s linear infinite" }} />}
            <span style={{ fontSize: "14px", fontWeight: "500", color: liveDone ? t.green : t.accentText }}>{liveDone ? "Completed" : "Running evaluation..."}</span>
          </div>
        </div>
        <div style={{ fontSize: "14px", color: t.text500 }}>{liveResults.skill} · {liveResults.tickets} tickets · {liveResults.scorer} · Started just now</div>
        <div style={{ height: "6px", backgroundColor: t.surfaceInset, borderRadius: "3px", marginTop: "16px", overflow: "hidden" }}>
          <div style={{ height: "100%", background: `linear-gradient(90deg, ${t.accent}, #a78bfa)`, borderRadius: "3px", width: `${liveProgress}%`, transition: "width 0.5s ease" }} />
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "24px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
          {[{ label: "Accuracy", value: liveScores.accuracy }, { label: "Brand voice", value: liveScores.brand }, { label: "Resolution", value: liveScores.resolution }, { label: "Overall", value: liveScores.overall }].map((s, i) => (
            <div key={i} style={{ backgroundColor: t.surface, border: `1px solid ${t.sidebarDivider}`, borderRadius: "8px", padding: "24px", textAlign: "center" }}>
              <div style={{ fontSize: "12px", fontWeight: "600", color: t.text500, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px" }}>{s.label}</div>
              <div style={{ fontSize: "28px", fontWeight: "700", color: s.value !== null ? scoreColor(s.value) : t.text300 }}>{s.value !== null ? s.value : "—"}</div>
              <div style={{ fontSize: "12px", color: t.text400, marginTop: "2px" }}>{s.value !== null ? (liveDone ? (i === 3 ? ((s.value || 0) >= 85 ? "Passed" : "Failed") : "+2 vs last run") : `${Math.round(liveProgress)}% scored`) : "waiting..."}</div>
            </div>))}
        </div>
        <div style={{ fontSize: "16px", fontWeight: "600", color: t.text900, marginBottom: "14px" }}>Simulated ticket threads</div>
        {liveThreads.map((thread, i) => <ThreadCard key={i} thread={thread} index={i} />)}
        {!liveDone && <div style={{ padding: "14px 16px", backgroundColor: t.surface, border: `1px solid ${t.sidebarDivider}`, borderRadius: "8px" }}>{[40, 70, 55].map((w, i) => <div key={i} style={{ height: "12px", width: `${w}%`, backgroundColor: t.surfaceInset, borderRadius: "4px", marginBottom: i < 2 ? "8px" : 0 }} />)}</div>}
      </div>
    </div>);
  }

  if (selectedRun) {
    const run = runs.find(r => r.id === selectedRun);
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", backgroundColor: t.pageBg, fontFamily: "Inter, sans-serif", minHeight: 0, overflow: "hidden" }}>
        <div style={{ backgroundColor: t.surface, borderBottom: `1px solid ${t.sidebarDivider}`, padding: "24px 32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
            <button onClick={() => setSelectedRun(null)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "16px", color: t.text500, padding: 0 }}>←</button>
            <h1 style={{ fontSize: "24px", fontWeight: "700", color: t.text900, margin: 0 }}>{run.id}</h1>
            <span style={{ backgroundColor: run.status === "Passed" ? t.greenBg : t.redBg, color: run.status === "Passed" ? t.green : t.red, fontSize: "12px", fontWeight: "600", padding: "2px 10px", borderRadius: "4px" }}>{run.status}</span>
          </div>
          <div style={{ fontSize: "14px", color: t.text500 }}>{run.skill} · {run.dataset} · {run.date} · {run.duration}</div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 32px" }}>
          {/* Score cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
            {[
              { label: "Overall", value: run.overall },
              { label: "Accuracy", value: run.scores.accuracy },
              { label: "Brand voice", value: run.scores.brand },
              { label: "Resolution", value: run.scores.resolution },
            ].map((s, i) => (
              <div key={i} style={{ backgroundColor: t.surface, border: `1px solid ${t.sidebarDivider}`, borderRadius: "8px", padding: "24px" }}>
                <div style={{ fontSize: "12px", color: t.text500, marginBottom: "8px" }}>{s.label}</div>
                <div style={{ fontSize: "32px", fontWeight: "700", color: scoreColor(s.value) }}>{s.value}</div>
                <div style={{ height: "4px", backgroundColor: t.surfaceInset, borderRadius: "2px", marginTop: "8px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${s.value}%`, backgroundColor: scoreColor(s.value), borderRadius: "2px" }}></div>
                </div>
              </div>
            ))}
          </div>
          {/* Scorer breakdown */}
          <div style={{ backgroundColor: t.surface, border: `1px solid ${t.sidebarDivider}`, borderRadius: "8px", overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: `1px solid ${t.sidebarDivider}` }}>
              <div style={{ fontSize: "16px", fontWeight: "600", color: t.text900 }}>Scorer breakdown</div>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${t.sidebarDivider}` }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: "500", color: t.text500 }}>Persona</th>
                  <th style={{ padding: "12px 16px", textAlign: "right", fontWeight: "500", color: t.text500 }}>Accuracy</th>
                  <th style={{ padding: "12px 16px", textAlign: "right", fontWeight: "500", color: t.text500 }}>Brand voice</th>
                  <th style={{ padding: "12px 16px", textAlign: "right", fontWeight: "500", color: t.text500 }}>Resolution</th>
                  <th style={{ padding: "12px 16px", textAlign: "right", fontWeight: "500", color: t.text500 }}>Overall</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { persona: "The Rushed Gift-Giver", accuracy: 96, brand: 84, resolution: 93, overall: 91 },
                  { persona: "The Plant Parent", accuracy: 93, brand: 95, resolution: 90, overall: 93 },
                  { persona: "The Complaint Handler", accuracy: 92, brand: 86, resolution: 89, overall: 89 },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: i < 2 ? `1px solid ${t.sidebarDivider}` : "none" }}>
                    <td style={{ padding: "12px 16px", color: t.text900 }}>{row.persona}</td>
                    <td style={{ padding: "12px 16px", textAlign: "right", color: scoreColor(row.accuracy) }}>{row.accuracy}</td>
                    <td style={{ padding: "12px 16px", textAlign: "right", color: scoreColor(row.brand) }}>{row.brand}</td>
                    <td style={{ padding: "12px 16px", textAlign: "right", color: scoreColor(row.resolution) }}>{row.resolution}</td>
                    <td style={{ padding: "12px 16px", textAlign: "right", fontWeight: "600", color: scoreColor(row.overall) }}>{row.overall}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", backgroundColor: t.pageBg, fontFamily: "Inter, sans-serif", minHeight: 0, overflow: "hidden" }}>
      <div style={{ backgroundColor: t.surface, borderBottom: `1px solid ${t.sidebarDivider}`, padding: "24px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "700", color: t.text900, margin: 0 }}>Evaluations</h1>
          <div style={{ fontSize: "14px", color: t.text500, marginTop: "4px" }}>Test skill performance against real ticket data and persona scorers</div>
        </div>
        <button onClick={openDrawer} style={{ backgroundColor: t.brand, color: t.brandText, border: "none", padding: "8px 16px", borderRadius: "6px", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>
          New evaluation
        </button>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "24px 32px" }}>
        {/* Eval Config Card (Braintrust model) */}
        <div style={{ backgroundColor: t.surface, border: `1px solid ${t.sidebarDivider}`, borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
          <div style={{ fontSize: "16px", fontWeight: "600", color: t.text900, marginBottom: "16px" }}>Evaluation framework</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
            <div style={{ backgroundColor: t.surfaceMuted, borderRadius: "6px", padding: "16px" }}>
              <div style={{ fontSize: "12px", fontWeight: "600", color: t.text500, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px" }}>Task = Skill</div>
              <div style={{ fontSize: "14px", color: t.text900, fontWeight: "500" }}>{evalConfig.task}</div>
              <div style={{ fontSize: "12px", color: t.text500, marginTop: "4px" }}>The skill being evaluated</div>
            </div>
            <div style={{ backgroundColor: t.surfaceMuted, borderRadius: "6px", padding: "16px" }}>
              <div style={{ fontSize: "12px", fontWeight: "600", color: t.text500, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px" }}>Dataset = Tickets</div>
              <div style={{ fontSize: "14px", color: t.text900, fontWeight: "500" }}>{evalConfig.dataset}</div>
              <div style={{ fontSize: "12px", color: t.text500, marginTop: "4px" }}>Real conversations for testing</div>
            </div>
            <div style={{ backgroundColor: t.surfaceMuted, borderRadius: "6px", padding: "16px" }}>
              <div style={{ fontSize: "12px", fontWeight: "600", color: t.text500, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px" }}>Scorer = Persona</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                {evalConfig.scorers.map((s, i) => (
                  <span key={i} style={{ backgroundColor: t.accentLight, color: t.accentText, fontSize: "12px", padding: "2px 8px", borderRadius: "4px" }}>{s}</span>
                ))}
              </div>
              <div style={{ fontSize: "12px", color: t.text500, marginTop: "4px" }}>AI personas judge quality</div>
            </div>
          </div>
        </div>

        {/* Runs Table */}
        <div style={{ backgroundColor: t.surface, border: `1px solid ${t.sidebarDivider}`, borderRadius: "8px", overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: `1px solid ${t.sidebarDivider}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: "16px", fontWeight: "600", color: t.text900 }}>Recent runs</div>
            <span style={{ fontSize: "12px", color: t.text500 }}>Showing {runs.length} runs</span>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${t.sidebarDivider}` }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: "500", color: t.text500 }}>Run</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: "500", color: t.text500 }}>Skill</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: "500", color: t.text500 }}>Dataset</th>
                <th style={{ padding: "12px 16px", textAlign: "right", fontWeight: "500", color: t.text500 }}>Accuracy</th>
                <th style={{ padding: "12px 16px", textAlign: "right", fontWeight: "500", color: t.text500 }}>Brand</th>
                <th style={{ padding: "12px 16px", textAlign: "right", fontWeight: "500", color: t.text500 }}>Resolution</th>
                <th style={{ padding: "12px 16px", textAlign: "right", fontWeight: "500", color: t.text500 }}>Overall</th>
                <th style={{ padding: "12px 16px", textAlign: "right", fontWeight: "500", color: t.text500 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {runs.map((run, i) => (
                <tr key={run.id} style={{ borderBottom: i < runs.length - 1 ? `1px solid ${t.sidebarDivider}` : "none", cursor: "pointer" }}
                  onClick={() => setSelectedRun(run.id)}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = t.surfaceMuted}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                >
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ color: t.accentText, fontWeight: "500" }}>{run.id}</div>
                    <div style={{ fontSize: "12px", color: t.text500 }}>{run.date}</div>
                  </td>
                  <td style={{ padding: "12px 16px", color: t.text900 }}>{run.skill}</td>
                  <td style={{ padding: "12px 16px", color: t.text700 }}>{run.dataset}</td>
                  <td style={{ padding: "12px 16px", textAlign: "right", color: scoreColor(run.scores.accuracy) }}>{run.scores.accuracy}</td>
                  <td style={{ padding: "12px 16px", textAlign: "right", color: scoreColor(run.scores.brand) }}>{run.scores.brand}</td>
                  <td style={{ padding: "12px 16px", textAlign: "right", color: scoreColor(run.scores.resolution) }}>{run.scores.resolution}</td>
                  <td style={{ padding: "12px 16px", textAlign: "right" }}>
                    <span style={{ backgroundColor: scoreBg(run.overall), color: scoreColor(run.overall), fontWeight: "600", padding: "2px 8px", borderRadius: "4px" }}>{run.overall}</span>
                  </td>
                  <td style={{ padding: "12px 16px", textAlign: "right" }}>
                    <span style={{ color: run.status === "Passed" ? t.green : t.red, fontWeight: "500" }}>{run.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ════════ DRAWER OVERLAY ════════ */}
      {drawerOpen && <div onClick={closeDrawer} style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.25)", zIndex: 100 }} />}

      {/* ════════ SIDE DRAWER ════════ */}
      <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: "520px", backgroundColor: t.surface, zIndex: 101, boxShadow: drawerOpen ? "-8px 0 30px rgba(0,0,0,0.1)" : "none", transform: drawerOpen ? "translateX(0)" : "translateX(100%)", transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)", display: "flex", flexDirection: "column", fontFamily: "Inter, sans-serif" }}>
        <div style={{ padding: "18px 24px", borderBottom: `1px solid ${t.sidebarDivider}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "700", color: t.text900, margin: 0 }}>New evaluation</h2>
          <button onClick={closeDrawer} style={{ width: "30px", height: "30px", border: "none", backgroundColor: t.surfaceMuted, borderRadius: "6px", cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center", color: t.text500 }}>×</button>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
          {/* Stepper */}
          <div style={{ display: "flex", alignItems: "center", marginBottom: "28px" }}>
            <StepDot num={1} label="Skill" /><StepLine afterStep={1} /><StepDot num={2} label="Tickets" /><StepLine afterStep={2} /><StepDot num={3} label="Scorer" /><StepLine afterStep={3} /><StepDot num={4} label="Review" />
          </div>

          {/* Step 1: Select Skill */}
          {drawerStep === 1 && (<div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: t.text900, marginBottom: "8px" }}>Which skill do you want to evaluate?</label>
            <select value={evalSkill} onChange={e => { setEvalSkill(e.target.value); const sk = skillOptions.find(s => s.id === e.target.value); if (sk && evalTicketCount > sk.tickets) setEvalTicketCount(sk.tickets); }}
              style={{ width: "100%", padding: "9px 14px", border: `1px solid ${t.surfaceTertiary}`, borderRadius: "6px", fontSize: "14px", color: t.text900, backgroundColor: t.surface, cursor: "pointer", appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23828994' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center" }}>
              <option value="">Choose a skill...</option>
              {skillOptions.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
            <div style={{ fontSize: "12px", color: t.text400, marginTop: "6px" }}>Select the skill you've been training and want to test.</div>
            {selectedSkillData && (<div style={{ backgroundColor: t.surfaceMuted, border: `1px solid ${t.sidebarDivider}`, borderRadius: "8px", padding: "14px 16px", marginTop: "14px" }}>
              <div style={{ fontSize: "14px", fontWeight: "600", color: t.text900, marginBottom: "4px" }}>{selectedSkillData.name}</div>
              <div style={{ fontSize: "12px", color: t.text700, lineHeight: "1.5" }}>{selectedSkillData.desc}</div>
              <div style={{ display: "flex", gap: "12px", marginTop: "10px" }}>
                <span style={{ fontSize: "12px", color: t.text400, display: "flex", alignItems: "center", gap: "4px" }}><span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: t.green }} /> Active</span>
                <span style={{ fontSize: "12px", color: t.text400 }}>Last edited 2h ago</span>
                <span style={{ fontSize: "12px", color: t.text400 }}>{selectedSkillData.tickets} relevant tickets (7d)</span>
              </div>
            </div>)}
          </div>)}

          {/* Step 2: Ticket Count */}
          {drawerStep === 2 && (<div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: t.text900, marginBottom: "6px" }}>How many tickets should we test against?</label>
            <div style={{ fontSize: "12px", color: t.text500, marginBottom: "16px" }}>We found <strong style={{ color: t.text900 }}>{maxTickets}</strong> relevant tickets from the last 7 days for this skill.</div>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <input type="range" min="10" max={maxTickets} step="10" value={evalTicketCount} onChange={e => setEvalTicketCount(Number(e.target.value))} style={{ flex: 1, accentColor: t.accent, height: "6px", cursor: "pointer" }} />
              <div style={{ minWidth: "70px", textAlign: "center", fontSize: "24px", fontWeight: "700", color: t.accentText }}>{evalTicketCount}</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: t.text400, marginTop: "4px" }}><span>10 (quick)</span><span>{maxTickets} (thorough)</span></div>
            <div style={{ marginTop: "24px" }}>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: t.text900, marginBottom: "8px" }}>Ticket source</label>
              <select value={evalTicketSource} onChange={e => setEvalTicketSource(e.target.value)}
                style={{ width: "100%", padding: "9px 14px", border: `1px solid ${t.surfaceTertiary}`, borderRadius: "6px", fontSize: "14px", color: t.text900, backgroundColor: t.surface, cursor: "pointer", appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23828994' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center" }}>
                <option value="7d">Recent tickets (last 7 days)</option>
                <option value="14d">Last 14 days</option>
                <option value="30d">Last 30 days</option>
                <option value="custom">Custom date range</option>
              </select>
              <div style={{ fontSize: "12px", color: t.text400, marginTop: "6px" }}>Tickets are automatically filtered to match the selected skill's intent.</div>
            </div>
          </div>)}

          {/* Step 3: Select Scorer */}
          {drawerStep === 3 && (<div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: t.text900, marginBottom: "4px" }}>Who should judge the responses?</label>
            <div style={{ fontSize: "12px", color: t.text500, marginBottom: "16px" }}>Choose a persona or a custom scorer to evaluate the AI agent's replies.</div>
            <div style={{ fontSize: "12px", fontWeight: "600", color: t.text400, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px" }}>Shopper personas</div>
            {scorerOptions.filter(s => s.type === "Persona").map(s => <ScorerCard key={s.id} scorer={s} />)}
            <div style={{ fontSize: "12px", fontWeight: "600", color: t.text400, textTransform: "uppercase", letterSpacing: "0.5px", marginTop: "18px", marginBottom: "8px" }}>Custom scorers</div>
            {scorerOptions.filter(s => s.type === "Custom").map(s => <ScorerCard key={s.id} scorer={s} />)}
          </div>)}

          {/* Step 4: Review & Run */}
          {drawerStep === 4 && (<div>
            <div style={{ marginBottom: "18px" }}>
              <label style={{ fontSize: "14px", fontWeight: "600", color: t.text900 }}>Review your evaluation</label>
              <div style={{ fontSize: "12px", color: t.text500, marginTop: "4px" }}>Confirm the details below, then run your evaluation.</div>
            </div>
            <div style={{ backgroundColor: t.surfaceMuted, borderRadius: "8px", padding: "14px 16px", marginBottom: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span style={{ fontSize: "12px", fontWeight: "600", color: t.text400, textTransform: "uppercase", letterSpacing: "0.5px" }}>Skill</span>
                <span onClick={() => setDrawerStep(1)} style={{ fontSize: "12px", color: t.accentText, cursor: "pointer", fontWeight: "500" }}>Edit</span>
              </div>
              <div style={{ fontSize: "14px", fontWeight: "500", color: t.text900 }}>{selectedSkillData?.name || "—"}</div>
            </div>
            <div style={{ backgroundColor: t.surfaceMuted, borderRadius: "8px", padding: "14px 16px", marginBottom: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span style={{ fontSize: "12px", fontWeight: "600", color: t.text400, textTransform: "uppercase", letterSpacing: "0.5px" }}>Dataset</span>
                <span onClick={() => setDrawerStep(2)} style={{ fontSize: "12px", color: t.accentText, cursor: "pointer", fontWeight: "500" }}>Edit</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}><span style={{ fontSize: "14px", color: t.text700 }}>Ticket count</span><span style={{ fontSize: "14px", fontWeight: "600", color: t.text900 }}>{evalTicketCount} tickets</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}><span style={{ fontSize: "14px", color: t.text700 }}>Source</span><span style={{ fontSize: "14px", fontWeight: "600", color: t.text900 }}>{{ "7d": "Last 7 days", "14d": "Last 14 days", "30d": "Last 30 days", "custom": "Custom range" }[evalTicketSource]}</span></div>
            </div>
            <div style={{ backgroundColor: t.surfaceMuted, borderRadius: "8px", padding: "14px 16px", marginBottom: "18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span style={{ fontSize: "12px", fontWeight: "600", color: t.text400, textTransform: "uppercase", letterSpacing: "0.5px" }}>Scorer</span>
                <span onClick={() => setDrawerStep(3)} style={{ fontSize: "12px", color: t.accentText, cursor: "pointer", fontWeight: "500" }}>Edit</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}><span style={{ fontSize: "14px", color: t.text700 }}>Name</span><span style={{ fontSize: "14px", fontWeight: "600", color: t.text900 }}>{selectedScorerData?.name || "—"}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}><span style={{ fontSize: "14px", color: t.text700 }}>Type</span><span style={{ fontSize: "14px", fontWeight: "600", color: t.text900 }}>{selectedScorerData?.type || "—"}</span></div>
            </div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: t.text900, marginBottom: "8px" }}>Evaluation name (optional)</label>
            <input type="text" value={evalName} onChange={e => setEvalName(e.target.value)} placeholder="eval-043" style={{ width: "100%", padding: "9px 14px", border: `1px solid ${t.surfaceTertiary}`, borderRadius: "6px", fontSize: "14px", color: t.text900, backgroundColor: t.surface, boxSizing: "border-box" }} />
            <div style={{ fontSize: "12px", color: t.text400, marginTop: "6px" }}>Auto-generated, but you can customize it.</div>
          </div>)}
        </div>
        {/* Drawer footer */}
        <div style={{ padding: "14px 24px", borderTop: `1px solid ${t.sidebarDivider}`, display: "flex", justifyContent: "flex-end", gap: "12px" }}>
          {drawerStep > 1 && <button onClick={prevStep} style={{ backgroundColor: t.surface, color: t.text700, border: `1px solid ${t.surfaceTertiary}`, padding: "8px 18px", borderRadius: "6px", fontSize: "14px", fontWeight: "500", cursor: "pointer" }}>Back</button>}
          <button onClick={canContinue() ? nextStep : undefined} style={{ backgroundColor: drawerStep === 4 ? t.green : t.brand, color: "#fff", border: "none", padding: "8px 18px", borderRadius: "6px", fontSize: "14px", fontWeight: "600", cursor: canContinue() ? "pointer" : "not-allowed", opacity: canContinue() ? 1 : 0.5 }}>
            {drawerStep === 4 ? "Run evaluation" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Monitoring Page ───

const MonitoringPage = () => {
  const [activeTab, setActiveTab] = useState("monitors");
  const [selectedMonitor, setSelectedMonitor] = useState(null);
  const [selectedScorecard, setSelectedScorecard] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerStep, setDrawerStep] = useState(1);
  const [monitorName, setMonitorName] = useState("");
  const [monitorType, setMonitorType] = useState("continuous");
  const [selectedScorecardForMonitor, setSelectedScorecardForMonitor] = useState("shopper-satisfaction");
  const [flagPrompt, setFlagPrompt] = useState("");
  const [includedConversations, setIncludedConversations] = useState("ai-involved");
  const [reviewFilter, setReviewFilter] = useState("all");
  const [scoreboardDrawerOpen, setScoreboardDrawerOpen] = useState(false);
  const [scorecardStep, setScorecardStep] = useState(1);
  const [newScorecardName, setNewScorecardName] = useState("");

  const monitors = [
    { id: "monitor-001", name: "All AI conversations", type: "Continuous", scorecard: "Shopper satisfaction", conversations: 157, passRate: 84, avgScore: 87.3, needsReview: 12 },
    { id: "monitor-002", name: "High-value order handling", type: "Scheduled", scorecard: "Order handling quality", conversations: 89, passRate: 78, avgScore: 82.5, needsReview: 8 },
    { id: "monitor-003", name: "Return & refund quality", type: "Continuous", scorecard: "Return process quality", conversations: 42, passRate: 91, avgScore: 89.1, needsReview: 3 },
    { id: "monitor-004", name: "Gift order monitoring", type: "Scheduled", scorecard: "Escalation effectiveness", conversations: 18, passRate: 88, avgScore: 86.2, needsReview: 2 },
    { id: "monitor-005", name: "Frustrated shopper detection", type: "Continuous", scorecard: "Brand voice compliance", conversations: 23, passRate: 74, avgScore: 76.8, needsReview: 6 },
    { id: "monitor-006", name: "Weekly random sample", type: "Scheduled", scorecard: "Shopper satisfaction", conversations: 31, passRate: 85, avgScore: 85.9, needsReview: 4 },
  ];

  const scorecards = [
    { id: "shopper-satisfaction", name: "Shopper satisfaction", type: "Template", threshold: 70, criteria: ["Empathy & Tone", "Resolution Accuracy", "Product Knowledge", "Escalation Appropriateness", "Brand Voice Match"], monitors: 4 },
    { id: "order-handling", name: "Order handling quality", type: "Custom", threshold: 75, criteria: ["Order Accuracy", "Timeline Confirmation", "Proactive Solutions"], monitors: 2 },
    { id: "return-quality", name: "Return process quality", type: "Custom", threshold: 80, criteria: ["Policy Compliance", "Resolution Accuracy", "Empathy & Tone", "Proactive Suggestions"], monitors: 1 },
    { id: "escalation", name: "Escalation effectiveness", type: "Built-in", threshold: 70, criteria: ["Issue Summary", "Context Preservation", "Hand-off Clarity"], monitors: 2 },
    { id: "brand-voice", name: "Brand voice compliance", type: "Template", threshold: 75, criteria: ["Brand Voice Match", "Tone Appropriateness", "Message Clarity"], monitors: 1 },
  ];

  const sampleConversations = [
    {
      id: 1,
      user: "Emily R.",
      date: "2d ago",
      score: 89,
      reviewStatus: "AI scored",
      reviewer: "AI",
      monitor: "All AI conversations",
      thread: [
        { sender: "customer", text: "Hi, I ordered a gift and it needs to arrive by Friday. Can you check if it will be on time?" },
        { sender: "ai", text: "Of course! Let me check your order status. I found your order - it's currently in transit and should arrive by Thursday. You'll be all set for your deadline." },
        { sender: "customer", text: "Perfect! Thank you so much, that's a relief." },
      ],
      criteria: { empathy: "pass", resolution: "pass", knowledge: "pass" }
    },
    {
      id: 2,
      user: "James K.",
      date: "3d ago",
      score: 72,
      reviewStatus: "Needs review",
      reviewer: "Unassigned",
      monitor: "High-value order handling",
      thread: [
        { sender: "customer", text: "I received the wrong size for my order. This is really frustrating as I need it this week." },
        { sender: "ai", text: "I apologize for the mix-up. I can process a return right away. Would you like us to ship a replacement or get a refund?" },
        { sender: "customer", text: "I need a replacement ASAP. Can you expedite shipping?" },
        { sender: "ai", text: "Yes, I can mark it for expedited shipping at no extra charge. Your replacement will arrive in 2-3 business days." },
      ],
      criteria: { empathy: "pass", resolution: "warn", knowledge: "pass" }
    },
    {
      id: 3,
      user: "Sarah M.",
      date: "4d ago",
      score: 91,
      reviewStatus: "Reviewed",
      reviewer: "Michael T.",
      monitor: "Return & refund quality",
      thread: [
        { sender: "customer", text: "The jacket arrived but it's not what I expected. Can I return it?" },
        { sender: "ai", text: "Absolutely, we want you to be happy with your purchase. Returns are free within 30 days. Would you like me to initiate the return process?" },
        { sender: "customer", text: "Yes please, and maybe suggest similar styles?" },
        { sender: "ai", text: "I'll start the return now. For the return shipping, check your email for the label. I found similar jackets you might like - let me send those suggestions." },
      ],
      criteria: { empathy: "pass", resolution: "pass", knowledge: "pass" }
    },
  ];

  const scorecardsData = {
    "shopper-satisfaction": {
      name: "Shopper satisfaction",
      threshold: 70,
      criteria: [
        { name: "Empathy & Tone", weight: 20, critical: true },
        { name: "Resolution Accuracy", weight: 25, critical: true },
        { name: "Product Knowledge", weight: 20, critical: false },
        { name: "Escalation Appropriateness", weight: 20, critical: false },
        { name: "Brand Voice Match", weight: 15, critical: false },
      ]
    },
  };

  const closeDrawer = () => setDrawerOpen(false);
  const closeScoreboardDrawer = () => setScoreboardDrawerOpen(false);

  const canContinue = () => {
    if (drawerStep === 1) return !!monitorName && !!flagPrompt;
    return true;
  };

  const nextStep = () => {
    if (drawerStep === 4) {
      closeDrawer();
      return;
    }
    setDrawerStep(Math.min(drawerStep + 1, 4));
  };

  const prevStep = () => setDrawerStep(Math.max(drawerStep - 1, 1));

  const StepDot = ({ num, label }) => {
    const isActive = drawerStep === num, isComplete = drawerStep > num;
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <div style={{ width: "26px", height: "26px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700", flexShrink: 0, border: `2px solid ${isComplete ? t.green : isActive ? t.accent : t.surfaceTertiary}`, backgroundColor: isComplete ? t.green : isActive ? t.accent : t.surface, color: isComplete || isActive ? "#fff" : t.text400 }}>
          {isComplete ? "✓" : num}
        </div>
        <span style={{ fontSize: "12px", fontWeight: isActive ? "600" : "400", color: isComplete ? t.green : isActive ? t.accentText : t.text400, whiteSpace: "nowrap" }}>
          {label}
        </span>
      </div>
    );
  };

  const StepLine = ({ afterStep }) => (
    <div style={{ flex: 1, height: "2px", backgroundColor: drawerStep > afterStep ? t.green : t.surfaceTertiary, margin: "0 6px", alignSelf: "center", minWidth: "16px" }} />
  );

  // Scorecard Detail View
  if (selectedScorecard && activeTab === "scorecards") {
    const scorecard = scorecards.find(s => s.id === selectedScorecard);
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", backgroundColor: t.pageBg, fontFamily: "Inter, sans-serif", minHeight: 0, overflow: "hidden" }}>
        <div style={{ backgroundColor: t.surface, borderBottom: `1px solid ${t.sidebarDivider}`, padding: "24px 32px", display: "flex", alignItems: "center", gap: "16px" }}>
          <button onClick={() => setSelectedScorecard(null)} style={{ width: "32px", height: "32px", border: "none", backgroundColor: t.surfaceMuted, borderRadius: "6px", cursor: "pointer", fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center", color: t.text500 }}>←</button>
          <h1 style={{ fontSize: "24px", fontWeight: "700", color: t.text900, margin: 0 }}>{scorecard?.name}</h1>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 32px" }}>
          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: t.text900, marginBottom: "8px" }}>Pass threshold: {scorecard?.threshold}%</label>
            <input type="range" min="0" max="100" defaultValue={scorecard?.threshold} style={{ width: "300px" }} />
          </div>
          <div style={{ backgroundColor: t.surface, border: `1px solid ${t.sidebarDivider}`, borderRadius: "8px", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${t.sidebarDivider}` }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: "500", color: t.text500 }}>Criterion</th>
                  <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: "500", color: t.text500 }}>Weight (%)</th>
                  <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: "500", color: t.text500 }}>Critical</th>
                  <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: "500", color: t.text500 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {scorecard?.criteria.map((c, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${t.sidebarDivider}` }}>
                    <td style={{ padding: "12px 16px", color: t.text900 }}>{c}</td>
                    <td style={{ padding: "12px 16px", textAlign: "center", color: t.text700 }}>20</td>
                    <td style={{ padding: "12px 16px", textAlign: "center" }}>
                      <input type="checkbox" defaultChecked style={{ cursor: "pointer" }} />
                    </td>
                    <td style={{ padding: "12px 16px", textAlign: "center" }}>
                      <button style={{ backgroundColor: t.redBg, color: t.red, border: "none", borderRadius: "4px", padding: "4px 8px", fontSize: "12px", cursor: "pointer" }}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button style={{ backgroundColor: t.brand, color: t.brandText, border: "none", padding: "8px 14px", borderRadius: "6px", fontSize: "14px", fontWeight: "600", cursor: "pointer", marginTop: "16px" }}>
            + Add criterion
          </button>
        </div>
      </div>
    );
  }

  // Monitor Detail View
  if (selectedMonitor && activeTab === "monitors") {
    const monitor = monitors.find(m => m.id === selectedMonitor);
    const filteredConversations = reviewFilter === "all" ? sampleConversations : sampleConversations.filter(c => c.reviewStatus.toLowerCase().includes(reviewFilter));

    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", backgroundColor: t.pageBg, fontFamily: "Inter, sans-serif", minHeight: 0, overflow: "hidden" }}>
        <div style={{ backgroundColor: t.surface, borderBottom: `1px solid ${t.sidebarDivider}`, padding: "24px 32px", display: "flex", alignItems: "center", gap: "16px" }}>
          <button onClick={() => setSelectedMonitor(null)} style={{ width: "32px", height: "32px", border: "none", backgroundColor: t.surfaceMuted, borderRadius: "6px", cursor: "pointer", fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center", color: t.text500 }}>←</button>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <h1 style={{ fontSize: "24px", fontWeight: "700", color: t.text900, margin: 0 }}>{monitor?.name}</h1>
              <span style={{ fontSize: "12px", fontWeight: "600", backgroundColor: t.accentLight, color: t.accentText, padding: "2px 8px", borderRadius: "4px" }}>{monitor?.type}</span>
            </div>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "24px 32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
            {[
              { label: "Conversations scored", value: monitor?.conversations },
              { label: "Average score", value: monitor?.avgScore.toFixed(1) },
              { label: "Pass rate", value: monitor?.passRate + "%" },
              { label: "Needs review", value: monitor?.needsReview },
            ].map((stat, i) => (
              <div key={i} style={{ backgroundColor: t.surface, border: `1px solid ${t.sidebarDivider}`, borderRadius: "8px", padding: "24px" }}>
                <div style={{ fontSize: "12px", color: t.text500, marginBottom: "8px" }}>{stat.label}</div>
                <div style={{ fontSize: "28px", fontWeight: "700", color: t.text900 }}>{stat.value}</div>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: "16px", display: "flex", gap: "8px" }}>
            {["all", "needs-review", "reviewed", "failing"].map((f) => (
              <button key={f} onClick={() => setReviewFilter(f)} style={{ backgroundColor: reviewFilter === f ? t.accent : t.surface, color: reviewFilter === f ? "#fff" : t.text900, border: `1px solid ${reviewFilter === f ? t.accent : t.sidebarDivider}`, padding: "6px 12px", borderRadius: "4px", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}>
                {f === "all" ? "All" : f === "needs-review" ? "Needs review" : f === "reviewed" ? "Reviewed" : "Failing"}
              </button>
            ))}
          </div>

          <div style={{ backgroundColor: t.surface, border: `1px solid ${t.sidebarDivider}`, borderRadius: "8px", overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: `1px solid ${t.sidebarDivider}` }}>
              <div style={{ fontSize: "16px", fontWeight: "600", color: t.text900 }}>Scored conversations</div>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${t.sidebarDivider}` }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: "500", color: t.text500 }}>Conversation</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: "500", color: t.text500 }}>Date</th>
                  <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: "500", color: t.text500 }}>Score</th>
                  <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: "500", color: t.text500 }}>Status</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: "500", color: t.text500 }}>Reviewer</th>
                </tr>
              </thead>
              <tbody>
                {filteredConversations.map((conv, i) => (
                  <tr key={conv.id} onClick={() => setSelectedConversation(conv)} style={{ borderBottom: i < filteredConversations.length - 1 ? `1px solid ${t.sidebarDivider}` : "none", cursor: "pointer", backgroundColor: "transparent" }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = t.surfaceMuted}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                  >
                    <td style={{ padding: "12px 16px", color: t.text900, fontWeight: "500" }}>{conv.user}</td>
                    <td style={{ padding: "12px 16px", color: t.text700 }}>{conv.date}</td>
                    <td style={{ padding: "12px 16px", textAlign: "center" }}>
                      <span style={{ backgroundColor: conv.score >= 80 ? t.greenBg : conv.score >= 70 ? t.amberBg : t.redBg, color: conv.score >= 80 ? t.green : conv.score >= 70 ? t.amber : t.red, fontSize: "12px", fontWeight: "600", padding: "2px 8px", borderRadius: "4px" }}>
                        {conv.score}%
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px", textAlign: "center" }}>
                      <span style={{ backgroundColor: conv.reviewStatus === "AI scored" ? t.accentLight : conv.reviewStatus === "Reviewed" ? t.greenBg : t.amberBg, color: conv.reviewStatus === "AI scored" ? t.accentText : conv.reviewStatus === "Reviewed" ? t.green : t.amber, fontSize: "12px", fontWeight: "600", padding: "2px 8px", borderRadius: "4px" }}>
                        {conv.reviewStatus}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px", color: t.text700 }}>{conv.reviewer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // Conversation Review Panel
  if (selectedConversation) {
    return (
      <div style={{ flex: 1, display: "flex", backgroundColor: t.pageBg, fontFamily: "Inter, sans-serif" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ backgroundColor: t.surface, borderBottom: `1px solid ${t.sidebarDivider}`, padding: "24px 32px", display: "flex", alignItems: "center", gap: "16px" }}>
            <button onClick={() => setSelectedConversation(null)} style={{ width: "32px", height: "32px", border: "none", backgroundColor: t.surfaceMuted, borderRadius: "6px", cursor: "pointer", fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center", color: t.text500 }}>←</button>
            <h1 style={{ fontSize: "20px", fontWeight: "700", color: t.text900, margin: 0 }}>Conversation with {selectedConversation.user}</h1>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "24px 32px", display: "flex", flexDirection: "column", gap: "12px" }}>
            {selectedConversation.thread.map((msg, i) => (
              <div key={i} style={{ display: "flex", justifyContent: msg.sender === "customer" ? "flex-start" : "flex-end" }}>
                <div style={{ backgroundColor: msg.sender === "customer" ? t.surface : t.accentLight, border: `1px solid ${msg.sender === "customer" ? t.sidebarDivider : t.accent}`, borderRadius: "8px", padding: "12px 16px", maxWidth: "60%", color: t.text900, fontSize: "14px" }}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ width: "600px", backgroundColor: t.surface, borderLeft: `1px solid ${t.sidebarDivider}`, display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "24px", borderBottom: `1px solid ${t.sidebarDivider}` }}>
            <h3 style={{ fontSize: "14px", fontWeight: "600", color: t.text900, margin: "0 0 12px 0" }}>Shopper satisfaction</h3>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              { name: "Empathy & Tone", weight: 20, status: "pass" },
              { name: "Resolution Accuracy", weight: 25, status: "pass" },
              { name: "Product Knowledge", weight: 20, status: "pass" },
            ].map((c, i) => (
              <div key={i} style={{ borderBottom: `1px solid ${t.sidebarDivider}`, paddingBottom: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                  <span style={{ fontSize: "12px", fontWeight: "600", color: t.text900 }}>{c.name}</span>
                  <span style={{ fontSize: "12px", backgroundColor: t.accentLight, color: t.accentText, padding: "2px 6px", borderRadius: "3px" }}>{c.weight}%</span>
                </div>
                <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                  <span style={{ backgroundColor: t.greenBg, color: t.green, fontSize: "12px", fontWeight: "600", padding: "2px 8px", borderRadius: "4px" }}>✓ Pass</span>
                  <span style={{ fontSize: "12px", color: t.text500 }}>Scored by AI</span>
                </div>
              </div>
            ))}
            <div style={{ backgroundColor: t.greenBg, border: `1px solid ${t.greenBorder}`, borderRadius: "6px", padding: "12px", marginTop: "12px" }}>
              <div style={{ fontSize: "12px", color: t.green, fontWeight: "600", marginBottom: "4px" }}>Overall Score: 91%</div>
              <div style={{ fontSize: "12px", color: t.text700 }}>Passes threshold (70%)</div>
            </div>
          </div>
          <div style={{ padding: "16px 20px", borderTop: `1px solid ${t.sidebarDivider}`, display: "flex", gap: "8px" }}>
            <button onClick={() => setSelectedConversation(null)} style={{ flex: 1, backgroundColor: t.surfaceMuted, color: t.text900, border: "none", padding: "8px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}>
              Back
            </button>
            <button style={{ flex: 1, backgroundColor: t.brand, color: t.brandText, border: "none", padding: "8px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}>
              Submit review
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main View
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", backgroundColor: t.pageBg, fontFamily: "Inter, sans-serif", minHeight: 0, overflow: "hidden" }}>
      <div style={{ backgroundColor: t.surface, borderBottom: `1px solid ${t.sidebarDivider}`, padding: "24px 32px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <div>
            <h1 style={{ fontSize: "24px", fontWeight: "700", color: t.text900, margin: 0 }}>Monitoring</h1>
            <div style={{ fontSize: "14px", color: t.text500, marginTop: "4px" }}>Manage monitors and scorecards to evaluate conversation quality</div>
          </div>
          <button onClick={() => activeTab === "monitors" ? (setDrawerStep(1), setDrawerOpen(true)) : setScoreboardDrawerOpen(true)} style={{ backgroundColor: t.brand, color: t.brandText, border: "none", padding: "8px 16px", borderRadius: "6px", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>
            {activeTab === "monitors" ? "New monitor" : "New scorecard"}
          </button>
        </div>

        <div style={{ display: "flex", gap: "16px", borderTop: `1px solid ${t.sidebarDivider}`, paddingTop: "16px" }}>
          <button onClick={() => setActiveTab("monitors")} style={{ backgroundColor: "transparent", border: "none", padding: "8px 0", fontSize: "14px", fontWeight: "600", cursor: "pointer", borderBottom: activeTab === "monitors" ? `2px solid ${t.accent}` : "none", color: activeTab === "monitors" ? t.accent : t.text500 }}>
            Monitors
          </button>
          <button onClick={() => setActiveTab("scorecards")} style={{ backgroundColor: "transparent", border: "none", padding: "8px 0", fontSize: "14px", fontWeight: "600", cursor: "pointer", borderBottom: activeTab === "scorecards" ? `2px solid ${t.accent}` : "none", color: activeTab === "scorecards" ? t.accent : t.text500 }}>
            Scorecards
          </button>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "24px 32px" }}>
        {activeTab === "monitors" && (
          <div>
            <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
              <button style={{ backgroundColor: t.surface, border: `1px solid ${t.sidebarDivider}`, borderRadius: "6px", padding: "10px 16px", fontSize: "14px", fontWeight: "600", cursor: "pointer", color: t.text900 }}>
                Needs review <span style={{ color: t.accent }}>12</span>
              </button>
              <button style={{ backgroundColor: t.surface, border: `1px solid ${t.sidebarDivider}`, borderRadius: "6px", padding: "10px 16px", fontSize: "14px", fontWeight: "600", cursor: "pointer", color: t.text900 }}>
                Failing <span style={{ color: t.red }}>3</span>
              </button>
            </div>

            <div>
              <h2 style={{ fontSize: "16px", fontWeight: "600", color: t.text900, margin: "0 0 16px 0" }}>Active monitors</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
                {monitors.map((monitor) => (
                  <div key={monitor.id} onClick={() => setSelectedMonitor(monitor.id)} style={{ backgroundColor: t.surface, border: `1px solid ${t.sidebarDivider}`, borderRadius: "8px", padding: "16px", cursor: "pointer", transition: "all 0.2s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = t.accent; e.currentTarget.style.boxShadow = "0 4px 12px rgba(124, 92, 252, 0.1)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = t.sidebarDivider; e.currentTarget.style.boxShadow = "none"; }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                      <div>
                        <h3 style={{ fontSize: "14px", fontWeight: "600", color: t.text900, margin: "0 0 4px 0" }}>{monitor.name}</h3>
                        <span style={{ fontSize: "12px", fontWeight: "600", backgroundColor: t.accentLight, color: t.accentText, padding: "2px 6px", borderRadius: "3px", display: "inline-block", marginBottom: "4px" }}>{monitor.type}</span>
                        <div style={{ fontSize: "12px", color: t.text500, marginTop: "4px" }}>Scorecard: {monitor.scorecard}</div>
                      </div>
                      <button style={{ width: "24px", height: "24px", border: "none", backgroundColor: "transparent", cursor: "pointer", fontSize: "16px", color: t.text400 }}>⋯</button>
                    </div>

                    <div style={{ display: "flex", gap: "4px", height: "24px", marginBottom: "12px", alignItems: "flex-end" }}>
                      <div style={{ flex: monitor.passRate / 100, backgroundColor: t.green, borderRadius: "2px" }} />
                      <div style={{ flex: (100 - monitor.passRate) / 100 * 0.8, backgroundColor: t.amber, borderRadius: "2px" }} />
                      <div style={{ flex: 0.2, backgroundColor: t.red, borderRadius: "2px" }} />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", fontSize: "12px", color: t.text700 }}>
                      <span>Matched: <span style={{ fontWeight: "600", color: t.text900 }}>{monitor.conversations}</span></span>
                      <span>Pass rate: <span style={{ fontWeight: "600", color: t.text900 }}>{monitor.passRate}%</span></span>
                      <span>Avg score: <span style={{ fontWeight: "600", color: t.text900 }}>{monitor.avgScore.toFixed(1)}</span></span>
                      <span>Review: <span style={{ fontWeight: "600", color: t.text900 }}>{monitor.needsReview}</span></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "scorecards" && (
          <div>
            <h2 style={{ fontSize: "16px", fontWeight: "600", color: t.text900, margin: "0 0 16px 0" }}>Scorecards</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
              {scorecards.map((sc) => (
                <div key={sc.id} onClick={() => setSelectedScorecard(sc.id)} style={{ backgroundColor: t.surface, border: `1px solid ${t.sidebarDivider}`, borderRadius: "8px", padding: "16px", cursor: "pointer", transition: "all 0.2s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = t.accent; e.currentTarget.style.boxShadow = "0 4px 12px rgba(124, 92, 252, 0.1)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = t.sidebarDivider; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                    <h3 style={{ fontSize: "14px", fontWeight: "600", color: t.text900, margin: 0 }}>{sc.name}</h3>
                    <span style={{ fontSize: "12px", fontWeight: "600", backgroundColor: t.accentLight, color: t.accentText, padding: "2px 6px", borderRadius: "3px" }}>{sc.type}</span>
                  </div>
                  <div style={{ fontSize: "12px", color: t.text700, marginBottom: "8px" }}>
                    {sc.criteria.length} criteria • {sc.threshold}% threshold
                  </div>
                  <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", marginBottom: "8px" }}>
                    {sc.criteria.map((c, i) => (
                      <span key={i} style={{ fontSize: "12px", backgroundColor: t.surfaceMuted, color: t.text700, padding: "2px 6px", borderRadius: "3px" }}>
                        {c}
                      </span>
                    ))}
                  </div>
                  <div style={{ fontSize: "12px", color: t.text500 }}>Used by {sc.monitors} monitor{sc.monitors !== 1 ? "s" : ""}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ════════ MONITOR DRAWER ════════ */}
      {drawerOpen && <div onClick={closeDrawer} style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.25)", zIndex: 100 }} />}

      <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: "520px", backgroundColor: t.surface, zIndex: 101, boxShadow: drawerOpen ? "-8px 0 30px rgba(0,0,0,0.1)" : "none", transform: drawerOpen ? "translateX(0)" : "translateX(100%)", transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)", display: "flex", flexDirection: "column", fontFamily: "Inter, sans-serif" }}>
        <div style={{ padding: "18px 24px", borderBottom: `1px solid ${t.sidebarDivider}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "700", color: t.text900, margin: 0 }}>New monitor</h2>
          <button onClick={closeDrawer} style={{ width: "30px", height: "30px", border: "none", backgroundColor: t.surfaceMuted, borderRadius: "6px", cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center", color: t.text500 }}>×</button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "28px" }}>
            <StepDot num={1} label="Define" />
            <StepLine afterStep={1} />
            <StepDot num={2} label="Schedule" />
            <StepLine afterStep={2} />
            <StepDot num={3} label="Scorecard" />
            <StepLine afterStep={3} />
            <StepDot num={4} label="Review" />
          </div>

          {drawerStep === 1 && (
            <div>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: t.text900, marginBottom: "6px" }}>Monitor name</label>
                <input type="text" placeholder="e.g., High-value order handling" value={monitorName} onChange={(e) => setMonitorName(e.target.value)} style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: `1px solid ${t.sidebarDivider}`, fontSize: "14px", fontFamily: "Inter, sans-serif", boxSizing: "border-box" }} />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: t.text900, marginBottom: "6px" }}>Description</label>
                <textarea placeholder="What should this monitor flag?" style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: `1px solid ${t.sidebarDivider}`, fontSize: "14px", fontFamily: "Inter, sans-serif", minHeight: "80px", boxSizing: "border-box" }} />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: t.text900, marginBottom: "8px" }}>Conversation source</label>
                {["AI agent only", "Human + AI", "All conversations"].map((opt) => (
                  <label key={opt} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", cursor: "pointer" }}>
                    <input type="radio" name="source" value={opt} defaultChecked={opt === "AI agent only"} style={{ cursor: "pointer" }} />
                    <span style={{ fontSize: "14px", color: t.text900 }}>{opt}</span>
                  </label>
                ))}
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: t.text900, marginBottom: "6px" }}>What to flag</label>
                <textarea placeholder="Flag conversations where..." value={flagPrompt} onChange={(e) => setFlagPrompt(e.target.value)} style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: `1px solid ${t.sidebarDivider}`, fontSize: "14px", fontFamily: "Inter, sans-serif", minHeight: "100px", boxSizing: "border-box" }} />
              </div>
            </div>
          )}

          {drawerStep === 2 && (
            <div>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: t.text900, marginBottom: "12px" }}>Monitor cadence</label>
                {[
                  { value: "continuous", label: "Continuous", desc: "Every matching conversation as it happens" },
                  { value: "scheduled", label: "Scheduled", desc: "Random sample on a schedule" },
                  { value: "onetime", label: "One-time backfill", desc: "Sample from a date range" },
                ].map((opt) => (
                  <div key={opt.value} onClick={() => setMonitorType(opt.value)} style={{ border: `2px solid ${monitorType === opt.value ? t.accent : t.surfaceTertiary}`, borderRadius: "8px", padding: "12px", marginBottom: "10px", cursor: "pointer", backgroundColor: monitorType === opt.value ? t.accentLight : t.surface }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "2px" }}>
                      <div style={{ width: "16px", height: "16px", borderRadius: "50%", border: `2px solid ${monitorType === opt.value ? t.accent : t.text300}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {monitorType === opt.value && <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: t.accent }} />}
                      </div>
                      <span style={{ fontSize: "14px", fontWeight: "600", color: t.text900 }}>{opt.label}</span>
                    </div>
                    <div style={{ fontSize: "12px", color: t.text700, marginLeft: "26px" }}>{opt.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {drawerStep === 3 && (
            <div>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: t.text900, marginBottom: "8px" }}>Select scorecard</label>
                <select value={selectedScorecardForMonitor} onChange={(e) => setSelectedScorecardForMonitor(e.target.value)} style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: `1px solid ${t.sidebarDivider}`, fontSize: "14px", fontFamily: "Inter, sans-serif", boxSizing: "border-box" }}>
                  {scorecards.map((sc) => (
                    <option key={sc.id} value={sc.id}>{sc.name}</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <h3 style={{ fontSize: "14px", fontWeight: "600", color: t.text900, marginBottom: "8px" }}>Criteria</h3>
                <div style={{ backgroundColor: t.surfaceMuted, borderRadius: "6px", padding: "12px", fontSize: "12px" }}>
                  {["Empathy & Tone (20%)", "Resolution Accuracy (25%)", "Product Knowledge (20%)"].map((c, i) => (
                    <div key={i} style={{ padding: "4px 0", color: t.text900 }}>• {c}</div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {drawerStep === 4 && (
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: "600", color: t.text900, marginBottom: "12px" }}>Review settings</h3>
              <div style={{ backgroundColor: t.surfaceMuted, borderRadius: "6px", padding: "12px", fontSize: "12px", lineHeight: "1.8" }}>
                <div><strong>Name:</strong> {monitorName || "(Not set)"}</div>
                <div><strong>Type:</strong> {monitorType}</div>
                <div><strong>Scorecard:</strong> {scorecards.find(s => s.id === selectedScorecardForMonitor)?.name}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ padding: "16px 24px", borderTop: `1px solid ${t.sidebarDivider}`, display: "flex", gap: "12px", justifyContent: "flex-end" }}>
          {drawerStep > 1 && (
            <button onClick={prevStep} style={{ backgroundColor: t.surfaceMuted, color: t.text900, border: "none", padding: "8px 16px", borderRadius: "6px", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>
              Back
            </button>
          )}
          <button onClick={nextStep} disabled={!canContinue()} style={{ backgroundColor: canContinue() ? t.green : t.surfaceTertiary, color: canContinue() ? "#fff" : t.text400, border: "none", padding: "8px 16px", borderRadius: "6px", fontSize: "14px", fontWeight: "600", cursor: canContinue() ? "pointer" : "not-allowed" }}>
            {drawerStep === 4 ? "Create" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Campaigns Page ───

const CampaignsPage = () => {
  const [activeTab, setActiveTab] = useState("shopper");
  const [reEngagementSent, setReEngagementSent] = useState(false);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", backgroundColor: t.pageBg, fontFamily: "Inter, sans-serif", minHeight: 0, overflow: "hidden" }}>
      {/* Page Header */}
      <div style={{ backgroundColor: t.surface, borderBottom: `1px solid ${t.sidebarDivider}`, padding: "24px 32px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "700", color: t.text900, margin: 0 }}>Campaigns</h1>
        <div style={{ fontSize: "14px", color: t.text500, marginTop: "4px" }}>Customer journeys · Shopper experience · Performance</div>
      </div>

      {/* Tabs */}
      <div style={{ backgroundColor: t.surface, borderBottom: `1px solid ${t.sidebarDivider}`, padding: "0 40px" }}>
        <div style={{ display: "flex", gap: "0" }}>
          {[
            { id: "shopper", label: "Shopper Experience" },
            { id: "dashboard", label: "Campaign Dashboard" },
          ].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              padding: "12px 16px",
              fontSize: "14px",
              fontWeight: activeTab === tab.id ? "600" : "400",
              color: activeTab === tab.id ? t.accentText : t.text700,
              backgroundColor: "transparent",
              border: "none",
              borderBottom: activeTab === tab.id ? `2px solid ${t.accent}` : "2px solid transparent",
              cursor: "pointer",
              marginBottom: "-1px",
            }}>{tab.label}</button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "24px 32px" }}>
        {activeTab === "shopper" && (
          <div style={{ display: "grid", gridTemplateColumns: "380px 1fr", gap: "24px" }}>
            {/* Phone Mockup */}
            <div style={{
              width: "380px",
              backgroundColor: "#000",
              borderRadius: "40px",
              padding: "12px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
              height: "fit-content",
            }}>
              <div style={{
                backgroundColor: "#fff",
                borderRadius: "32px",
                padding: "12px",
                height: "780px",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}>
                {/* Chat Header */}
                <div style={{
                  backgroundColor: t.surface,
                  borderBottom: `1px solid ${t.sidebarDivider}`,
                  padding: "12px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "14px",
                  fontWeight: "600",
                }}>
                  <div>
                    <div style={{ color: t.text900 }}>UrbanStems</div>
                    <div style={{ fontSize: "12px", color: t.green, fontWeight: "500", display: "flex", alignItems: "center", gap: "4px", marginTop: "2px" }}>
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: t.green }}></span>
                      Online
                    </div>
                  </div>
                  <div style={{ fontSize: "12px", color: t.text500 }}>Shopping Assistant</div>
                </div>

                {/* Chat Messages */}
                <div style={{ flex: 1, overflowY: "auto", padding: "12px", display: "flex", flexDirection: "column", gap: "12px", fontSize: "12px" }}>
                  {/* Message 1 */}
                  <div style={{ backgroundColor: t.accentLight, borderRadius: "12px", padding: "10px", marginLeft: "40px", color: t.text900 }}>
                    Hi! I see you're interested in our Mother's Day bouquets — let me help you find the perfect one.
                  </div>

                  {/* Message 2 */}
                  <div style={{ backgroundColor: t.accentLight, borderRadius: "12px", padding: "10px", marginLeft: "40px", color: t.text900, marginBottom: "8px" }}>
                    Who is this gift for?
                  </div>
                  <div style={{ display: "flex", gap: "6px", marginLeft: "40px", flexWrap: "wrap" }}>
                    {["Mom", "Wife/Partner", "Grandmother", "Friend", "Other"].map((opt, i) => (
                      <button key={i} style={{
                        backgroundColor: opt === "Mom" ? t.accent : t.surfaceMuted,
                        color: opt === "Mom" ? "#fff" : t.text700,
                        border: "none",
                        padding: "6px 10px",
                        borderRadius: "16px",
                        fontSize: "10px",
                        fontWeight: "500",
                        cursor: "pointer",
                      }}>
                        {opt}
                      </button>
                    ))}
                  </div>

                  {/* Message 3 */}
                  <div style={{ backgroundColor: t.accentLight, borderRadius: "12px", padding: "10px", marginLeft: "40px", color: t.text900, marginTop: "8px", marginBottom: "8px" }}>
                    Great choice! What's your budget?
                  </div>
                  <div style={{ display: "flex", gap: "6px", marginLeft: "40px", flexWrap: "wrap" }}>
                    {["$50-75", "$75-100", "$100-150", "$150+"].map((opt, i) => (
                      <button key={i} style={{
                        backgroundColor: opt === "$75-100" ? t.accent : t.surfaceMuted,
                        color: opt === "$75-100" ? "#fff" : t.text700,
                        border: "none",
                        padding: "6px 10px",
                        borderRadius: "16px",
                        fontSize: "10px",
                        fontWeight: "500",
                        cursor: "pointer",
                      }}>
                        {opt}
                      </button>
                    ))}
                  </div>

                  {/* Message 4 */}
                  <div style={{ backgroundColor: t.accentLight, borderRadius: "12px", padding: "10px", marginLeft: "40px", color: t.text900, marginTop: "8px", marginBottom: "8px" }}>
                    Does the recipient have pets?
                  </div>
                  <div style={{ display: "flex", gap: "6px", marginLeft: "40px", flexWrap: "wrap" }}>
                    {["Yes cats", "Yes dogs", "No pets", "Not sure"].map((opt, i) => (
                      <button key={i} style={{
                        backgroundColor: opt === "Yes cats" ? t.accent : t.surfaceMuted,
                        color: opt === "Yes cats" ? "#fff" : t.text700,
                        border: "none",
                        padding: "6px 10px",
                        borderRadius: "16px",
                        fontSize: "10px",
                        fontWeight: "500",
                        cursor: "pointer",
                      }}>
                        {opt}
                      </button>
                    ))}
                  </div>

                  {/* Message 5 */}
                  <div style={{ backgroundColor: t.accentLight, borderRadius: "12px", padding: "10px", marginLeft: "40px", color: t.text900, marginTop: "8px" }}>
                    Here are 3 cat-safe options in your budget:
                  </div>

                  {/* Product cards */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginLeft: "40px" }}>
                    {[
                      { name: "The Botanist", price: "$79", safe: true, img: "#90ee90" },
                      { name: "Garden Party", price: "$89", safe: true, popular: true, img: "#ffb6c1" },
                      { name: "Spring Sunrise", price: "$95", safe: true, img: "#ffffe0", limited: true },
                    ].map((prod, i) => (
                      <div key={i} style={{
                        backgroundColor: t.surface,
                        border: prod.popular ? `2px solid ${t.accent}` : `1px solid ${t.sidebarDivider}`,
                        borderRadius: "8px",
                        overflow: "hidden",
                        fontSize: "12px",
                      }}>
                        <div style={{ height: "40px", backgroundColor: prod.img }}></div>
                        <div style={{ padding: "6px" }}>
                          <div style={{ fontWeight: "600", color: t.text900 }}>{prod.name}</div>
                          <div style={{ color: t.text700 }}>{prod.price}</div>
                          <div style={{ fontSize: "12px", color: t.text500 }}>Roses, orchids</div>
                          <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "4px", color: t.green, fontWeight: "600" }}>
                            ✓ Pet-safe
                          </div>
                          {prod.popular && <div style={{ fontSize: "12px", color: t.text500, fontWeight: "500" }}>Most popular</div>}
                          {prod.limited && <div style={{ fontSize: "12px", color: t.amber, fontWeight: "500" }}>Only 3 left</div>}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bundle message */}
                  <div style={{ backgroundColor: t.accentLight, borderRadius: "12px", padding: "10px", marginLeft: "40px", color: t.text900, marginTop: "8px" }}>
                    Want to make it special? Most customers pair Garden Party with our Artisan Ceramic.
                  </div>

                  {/* Bundle card */}
                  <div style={{ backgroundColor: t.greenBg, border: `1px solid ${t.greenBorder}`, borderRadius: "8px", padding: "8px", marginLeft: "40px", fontSize: "12px" }}>
                    <div style={{ fontWeight: "600", color: t.text900, marginBottom: "4px" }}>Garden Party + Vase + Card</div>
                    <div style={{ color: t.text700 }}>$89 + <span style={{ textDecoration: "line-through" }}>$35</span> $29 + $5 = <span style={{ fontWeight: "600" }}>$123</span> (save $6)</div>
                    <button style={{
                      backgroundColor: t.green,
                      color: "#fff",
                      border: "none",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      fontSize: "12px",
                      fontWeight: "600",
                      cursor: "pointer",
                      marginTop: "4px",
                      width: "100%",
                    }}>
                      Add bundle ✓
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Annotations - Right side */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                "Context from Meta ad",
                "Pet safety filter applied",
                "Premium-first bundle (past order history)",
                "Contact book reduces address drop-off",
                "Full conversion in-conversation",
              ].map((ann, i) => (
                <div key={i} style={{
                  backgroundColor: t.surface,
                  border: `1px solid ${t.sidebarDivider}`,
                  borderLeft: `4px solid ${t.accent}`,
                  borderRadius: "6px",
                  padding: "12px",
                  fontSize: "12px",
                  color: t.text700,
                }}>
                  {ann}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "dashboard" && (
          <div>
            {/* Stats Row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
              {[
                { label: "Messenger conversations", value: "847", delta: "↑23%" },
                { label: "Conversion rate", value: "34%", delta: "vs 12% site" },
                { label: "AOV", value: "$118", delta: "vs $79 site" },
                { label: "Revenue", value: "$33,842", delta: "" },
              ].map((stat, i) => (
                <div key={i} style={{ backgroundColor: t.surface, border: `1px solid ${t.sidebarDivider}`, borderRadius: "8px", padding: "16px" }}>
                  <div style={{ fontSize: "12px", color: t.text500, marginBottom: "8px" }}>{stat.label}</div>
                  <div style={{ fontSize: "24px", fontWeight: "700", color: t.text900, marginBottom: "4px" }}>{stat.value}</div>
                  {stat.delta && <div style={{ fontSize: "12px", color: t.green, fontWeight: "600" }}>{stat.delta}</div>}
                </div>
              ))}
            </div>

            {/* Channel Comparison */}
            <div style={{ backgroundColor: t.surface, border: `1px solid ${t.sidebarDivider}`, borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
              <h3 style={{ fontSize: "14px", fontWeight: "600", color: t.text900, marginBottom: "16px" }}>Channel breakdown</h3>
              <div style={{ display: "flex", gap: "12px", height: "40px" }}>
                {[
                  { name: "Messenger", width: 34, color: "#0084ff" },
                  { name: "Instagram DM", width: 28, color: "#e1306c" },
                  { name: "SMS", width: 22, color: "#25d366" },
                  { name: "Website chat", width: 16, color: "#7c5cfc" },
                ].map((ch, i) => (
                  <div key={i} style={{
                    width: `${ch.width}%`,
                    backgroundColor: ch.color,
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: "12px",
                    fontWeight: "600",
                  }}>
                    {ch.width}%
                  </div>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginTop: "12px" }}>
                {[
                  { name: "Messenger", width: 34 },
                  { name: "Instagram DM", width: 28 },
                  { name: "SMS", width: 22 },
                  { name: "Website chat", width: 16 },
                ].map((ch, i) => (
                  <div key={i} style={{ fontSize: "12px", color: t.text700 }}>
                    <span style={{ fontWeight: "600" }}>{ch.name}</span> {ch.width}%
                  </div>
                ))}
              </div>
            </div>

            {/* Funnel */}
            <div style={{ backgroundColor: t.surface, border: `1px solid ${t.sidebarDivider}`, borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
              <h3 style={{ fontSize: "14px", fontWeight: "600", color: t.text900, marginBottom: "16px" }}>Drop-off funnel</h3>
              {[
                { stage: "Ad click", count: "847", drop: null },
                { stage: "Greeted", count: "810", drop: "4%" },
                { stage: "Product shown", count: "624", drop: "23%" },
                { stage: "Bundle offered", count: "489", drop: "22%" },
                { stage: "Address entered", count: "312", drop: "36%" },
                { stage: "Converted", count: "288", drop: "8%" },
              ].map((f, i) => (
                <div key={i} style={{ marginBottom: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                    <span style={{ fontSize: "12px", fontWeight: "500", color: t.text900 }}>{f.stage}</span>
                    <span style={{ fontSize: "12px", color: t.text700 }}>
                      {f.count} {f.drop && <span style={{ color: f.drop === "36%" ? t.amber : t.text500 }}>-{f.drop}</span>}
                    </span>
                  </div>
                  <div style={{ height: "8px", backgroundColor: t.surfaceInset, borderRadius: "4px", overflow: "hidden" }}>
                    <div style={{
                      height: "100%",
                      width: `${(parseInt(f.count) / 847) * 100}%`,
                      backgroundColor: f.drop === "36%" ? t.amber : t.accent,
                      borderRadius: "4px",
                    }}></div>
                  </div>
                </div>
              ))}
              <div style={{
                backgroundColor: t.amberBg,
                border: `1px solid ${t.amberBorder}`,
                borderRadius: "6px",
                padding: "10px",
                marginTop: "12px",
                fontSize: "12px",
                color: t.text700,
              }}>
                Address step has 36% drop-off — contact book integration reduced this by 18%
              </div>
            </div>

            {/* Re-engagement */}
            <div style={{ backgroundColor: t.surface, border: `1px solid ${t.sidebarDivider}`, borderRadius: "8px", padding: "24px" }}>
              <h3 style={{ fontSize: "14px", fontWeight: "600", color: t.text900, marginBottom: "12px" }}>Lapsed shopper re-engagement</h3>
              <div style={{ fontSize: "12px", color: t.text700, marginBottom: "12px" }}>
                4 customers from last Mother's Day campaign — showing highest repeat potential
              </div>

              <div style={{
                backgroundColor: t.greenBg,
                border: `1px solid ${t.greenBorder}`,
                borderRadius: "6px",
                padding: "12px",
                marginBottom: "12px",
                fontSize: "12px",
              }}>
                <div style={{ color: t.green, fontWeight: "600", marginBottom: "6px" }}>AI-drafted message:</div>
                <div style={{ color: t.text700, lineHeight: "1.6" }}>
                  "Hi Sarah! 🌸 We still have the Garden Party bouquet you loved last Mother's Day — and Father's Day is coming up! Perfect gift idea? Let me know if you'd like to reorder for your dad or someone special. We're offering 15% off loyalty favorites."
                </div>
              </div>

              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={() => setReEngagementSent(!reEngagementSent)} style={{
                  backgroundColor: reEngagementSent ? t.green : t.green,
                  color: "#ffffff",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}>
                  {reEngagementSent ? "✓ Sent via Klaviyo" : "Approve & send via Klaviyo"}
                </button>
                <button style={{
                  backgroundColor: t.surface,
                  border: `1px solid ${t.sidebarDivider}`,
                  padding: "8px 16px",
                  borderRadius: "6px",
                  fontSize: "14px",
                  cursor: "pointer",
                  color: t.text700,
                }}>
                  Edit message
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Logs Page ───

const LogsPage = () => {
  const [filter, setFilter] = useState("all");

  const logs = [
    { id: "T-8842", score: 96, skill: "Order status", channel: "Chat", responseTime: "0.6s", outcome: "Resolved", customer: "Emily R.", summary: "Tracked order #4521 — delivered tomorrow by 2pm", time: "2 min ago" },
    { id: "T-8841", score: 92, skill: "Product recommendations", channel: "Chat", responseTime: "1.2s", outcome: "Resolved", customer: "James K.", summary: "Suggested 3 low-light plants for office, customer added 2 to cart", time: "5 min ago" },
    { id: "T-8840", score: 88, skill: "Order cancellation", channel: "Email", responseTime: "0.4s", outcome: "Resolved", customer: "Sarah M.", summary: "Cancelled order #4519 before shipment, full refund processed", time: "8 min ago" },
    { id: "T-8839", score: 74, skill: "Shipping address", channel: "SMS", responseTime: "0.8s", outcome: "Handover", customer: "Michael P.", summary: "Address change failed — order already in transit, escalated to human", time: "12 min ago" },
    { id: "T-8838", score: 95, skill: "Coupon codes", channel: "Chat", responseTime: "0.3s", outcome: "Resolved", customer: "Lisa T.", summary: "Applied SPRING20 for 20% off, order total updated", time: "15 min ago" },
    { id: "T-8837", score: 62, skill: "Subscription mgmt", channel: "Chat", responseTime: "2.1s", outcome: "Handover", customer: "David W.", summary: "Wanted to pause subscription but skip 2 specific dates — skill only supports full pause", time: "18 min ago" },
    { id: "T-8836", score: 91, skill: "Plant care tips", channel: "Instagram", responseTime: "0.9s", outcome: "Resolved", customer: "Anna C.", summary: "Provided monstera yellowing diagnosis + care adjustment tips", time: "22 min ago" },
    { id: "T-8835", score: 45, skill: "Payment issues", channel: "Email", responseTime: "1.5s", outcome: "Handover", customer: "Robert H.", summary: "Card declined on retry — possible fraud flag, escalated immediately", time: "25 min ago" },
    { id: "T-8834", score: 89, skill: "Order status", channel: "Chat", responseTime: "0.5s", outcome: "Resolved", customer: "Nicole F.", summary: "Confirmed same-day delivery in DC, provided 2-hour window", time: "30 min ago" },
    { id: "T-8833", score: 93, skill: "Product recommendations", channel: "SMS", responseTime: "1.0s", outcome: "Resolved", customer: "Tom B.", summary: "Anniversary bouquet recommendation with personalized card message", time: "35 min ago" },
  ];

  const scoreColor = (s) => s >= 90 ? t.green : s >= 80 ? t.text900 : s >= 70 ? t.amber : t.red;
  const scoreBg = (s) => s >= 90 ? t.greenBg : s >= 80 ? "transparent" : s >= 70 ? t.amberBg : t.redBg;

  const filtered = filter === "all" ? logs : filter === "handover" ? logs.filter(l => l.outcome === "Handover") : logs.filter(l => l.score < 80);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", backgroundColor: t.pageBg, fontFamily: "Inter, sans-serif", minHeight: 0, overflow: "hidden" }}>
      <div style={{ backgroundColor: t.surface, borderBottom: `1px solid ${t.sidebarDivider}`, padding: "24px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "700", color: t.text900, margin: 0 }}>Logs</h1>
          <div style={{ fontSize: "14px", color: t.text500, marginTop: "4px" }}>Real-time observability — every ticket scored</div>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          {[
            { id: "all", label: "All" },
            { id: "handover", label: "Handovers" },
            { id: "low", label: "Low score" },
          ].map((f) => (
            <button key={f.id} onClick={() => setFilter(f.id)} style={{
              backgroundColor: filter === f.id ? t.accentLight : t.surface,
              border: `1px solid ${filter === f.id ? t.accent : t.sidebarDivider}`,
              color: filter === f.id ? t.accentText : t.text700,
              padding: "6px 14px",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: filter === f.id ? "600" : "400",
              cursor: "pointer",
            }}>{f.label}</button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "24px 32px" }}>
        <div style={{ backgroundColor: t.surface, border: `1px solid ${t.sidebarDivider}`, borderRadius: "8px", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${t.sidebarDivider}` }}>
                <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: "500", color: t.text500, width: "70px" }}>Score</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: "500", color: t.text500 }}>Ticket</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: "500", color: t.text500 }}>Summary</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: "500", color: t.text500 }}>Skill</th>
                <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: "500", color: t.text500 }}>Channel</th>
                <th style={{ padding: "12px 16px", textAlign: "right", fontWeight: "500", color: t.text500 }}>Response</th>
                <th style={{ padding: "12px 16px", textAlign: "right", fontWeight: "500", color: t.text500 }}>Outcome</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((log, i) => (
                <tr key={log.id} style={{ borderBottom: i < filtered.length - 1 ? `1px solid ${t.sidebarDivider}` : "none", cursor: "pointer" }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = t.surfaceMuted}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                >
                  <td style={{ padding: "12px 16px", textAlign: "center" }}>
                    <span style={{ backgroundColor: scoreBg(log.score), color: scoreColor(log.score), fontWeight: "700", fontSize: "14px", padding: "4px 10px", borderRadius: "6px", display: "inline-block", minWidth: "36px" }}>{log.score}</span>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ color: t.text900, fontWeight: "500" }}>{log.id}</div>
                    <div style={{ fontSize: "12px", color: t.text500 }}>{log.customer} · {log.time}</div>
                  </td>
                  <td style={{ padding: "12px 16px", color: t.text700, maxWidth: "300px" }}>
                    <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{log.summary}</div>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ backgroundColor: t.surfaceInset, border: `1px solid ${t.sidebarDivider}`, borderRadius: "4px", padding: "2px 8px", fontSize: "12px", color: t.text700 }}>{log.skill}</span>
                  </td>
                  <td style={{ padding: "12px 16px", textAlign: "center", color: t.text700 }}>{log.channel}</td>
                  <td style={{ padding: "12px 16px", textAlign: "right", color: t.text700 }}>{log.responseTime}</td>
                  <td style={{ padding: "12px 16px", textAlign: "right" }}>
                    <span style={{ color: log.outcome === "Resolved" ? t.green : t.amber, fontWeight: "500" }}>{log.outcome}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ─── Main App Component ───

const App = () => {
  const [currentView, setCurrentView] = useState("home");
  const [selectedSkill, setSelectedSkill] = useState(null);

  return (
    <div style={{
      display: "flex",
      height: "100vh",
      backgroundColor: t.pageBg,
      fontFamily: "Inter, sans-serif",
    }}>
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {selectedSkill ? (
          <SkillEditor
            skill={selectedSkill}
            onBack={() => setSelectedSkill(null)}
          />
        ) : currentView === "home" ? (
          <HomePage />
        ) : currentView === "context" ? (
          <ContextPage />
        ) : currentView === "skills" ? (
          <SkillsPage onSelectSkill={setSelectedSkill} />
        ) : currentView === "tools" ? (
          <ToolsPage />
        ) : currentView === "campaigns" ? (
          <CampaignsPage />
        ) : currentView === "evaluations" ? (
          <EvaluationsPage />
        ) : currentView === "monitoring" ? (
          <MonitoringPage />
        ) : currentView === "logs" ? (
          <LogsPage />
        ) : null}
      </div>
    </div>
  );
};

export default App;

// Browser render (for standalone HTML usage)
if (typeof window !== 'undefined') {
  window.__APP__ = App;
}
