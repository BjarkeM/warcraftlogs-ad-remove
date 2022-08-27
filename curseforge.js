const fs = require('fs');
const path = require('path');
const asar = require('asar');

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

exports.ad_remove = function (curseforge_asar_path) {
    const src_path = './curseforge_src';
    asar.extractAll(curseforge_asar_path, src_path);

    fs.readFile(src_path + '/dist/desktop/desktop.js', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        const ad_code = `return V?(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)("aside",r({className:function(){var e,n=((e={"curseforge-ad":!0,subscribed:!1})[g.kContentOnlyClassName]=!1,e);return t||(n.subscribed=null==G?void 0:G.active,n[g.kContentOnlyClassName]=B),C.default.ClassNames(n)}()},{children:[te()&&!H&&(0,d.jsxs)("span",r({className:"subscribe-link-large-resolution"},{children:[U&&(0,d.jsx)("span",{children:J("ads.intro")}),(0,d.jsxs)("a",r({className:"subscribe-link",onClick:X,onMouseOver:K,onMouseOut:Q},{children:[J($()),(0,d.jsx)(h.default,{show:i,direction:h.TooltipDirection.top,text:"".concat(J(ee()))})]}))]})),(0,d.jsxs)("div",r({className:"ad-inner"},{children:[(0,d.jsx)(_.default,{}),(0,d.jsx)(x.default,{show:!t&&te()})]})),te()&&H&&(0,d.jsxs)("a",r({className:"subscribe-link subscribe-link-small-resolution",onClick:X,onMouseOver:K,onMouseOut:Q},{children:[J($()),(0,d.jsx)(h.default,{show:i,direction:h.TooltipDirection.left,text:"".concat(J(ee()))})]}))]})),(0,d.jsx)(m.default,{show:M,handleClose:function(){E(!1)}})]}):null`;

        const result = data.replace(RegExp(escapeRegExp(ad_code), 'g'), 'return null');

        fs.writeFile(src_path + '/dist/desktop/desktop.js', result, 'utf8', function (err) {
            if (err) return console.log(err);
            else {
                const new_asar = './app.asar.curseforge';

                asar.createPackage(src_path, new_asar).then(() => {
                    console.log(`Generated ${new_asar} with ads disabled, replace it in "${curseforge_asar_path}"`);
                    fs.rmSync(src_path, { recursive: true, force: true });
                });
            }
        });
    });
};
