const {useRef, useState, useEffect, createRef} = React;


/*--------------------
Items
--------------------*/
const items = [
    {
        name: "订单管理",
        color: "#f44336",
        href: "http://127.0.0.1/html/order?id=0"
    },

    {
        name: "客户管理",
        color: "#e91e63",
        href: "http://127.0.0.1/html/customer?id=1"
    },

    {
        name: "留言管理",
        color: "#9c27b0",
        href: "http://127.0.0.1/html/message?id=2"
    },

    {
        name: "退出登录",
        color: "#673ab7",
        href: "http://127.0.0.1"
    },
];
const index = window.location.href.lastIndexOf("id=");
let num = window.location.href.slice(index + 3, index + 4);
/*--------------------
Menu
--------------------*/
const Menu = ({items}) => {
    const $root = useRef();
    const $indicator = useRef();
    const $items = useRef(items.map(createRef));
    const [active, setActive] = useState(num);

    const animate = () => {
        const menuOffset = $root.current.getBoundingClientRect();
        const activeItem = $items.current[active].current;
        const {width, height, top, left} = activeItem.getBoundingClientRect();

        gsap.to($indicator.current, {
            x: left - menuOffset.x,
            y: top - menuOffset.y,
            width: width,
            height: height,
            backgroundColor: items[active].color,
            ease: 'elastic.out(0.7, 0.7)',
            duration: 0.8
        });

    };

    useEffect(() => {
        animate();
        window.addEventListener('resize', animate);

        return () => {
            window.removeEventListener('resize', animate);
        };
    }, [active]);

    return /*#__PURE__*/(
        React.createElement("div", {
                ref: $root,
                className: "menu"
            },

            items.map((item, index) => /*#__PURE__*/
                React.createElement("a", {
                        key: item.name,
                        ref: $items.current[index],
                        className: `item ${active === index ? 'active' : ''} ${(index == num) && (active == num) ? 'active' : ''}`,
                        onMouseEnter: () => {
                            setActive(index);
                        },
                        href: item.href
                    },
                    item.name)), /*#__PURE__*/


            React.createElement("div", {
                ref: $indicator,
                className: "indicator"
            })));


};


/*--------------------
App
--------------------*/
const App = () => {
    return /*#__PURE__*/(
        React.createElement("div", {className: "App"}, /*#__PURE__*/
            React.createElement(Menu, {items: items})));


};


/*--------------------
Render
--------------------*/
ReactDOM.render( /*#__PURE__*/React.createElement(App, null),
    document.getElementById("root"));