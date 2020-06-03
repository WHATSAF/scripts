/*
Usage: var tree = $(selector).tree([{
    txt: "", //显示文本
    val: "", //值
    isExpand: false, //是否展开
    isCheckBox: false, //是否复选框
    isChecked: false, //是否已选中
    children: [...] //子节点
}])

tree.getAllChecked() -> [{txt: "", val: ""},...]
*/
$.fn.extend({
    tree: function (data) {
        var that = $(this);
        var html = "";
        var checkedObjs = new Array();

        html = _render(data);

        $(html).appendTo(that);

        $(that).find('a').on('click', function () {
            if ($(this).parent().hasClass('on')) {
                $(this).parent().removeClass('on');
                $(this).find('.toggler').html('+');
            } else {
                $(this).parent().addClass('on');
                $(this).find('.toggler').html('-');
            }
        });

        $(that).find('input[type="checkbox"]').on('click', function () {
            if ($(this).is(":checked")) {
                checkedObjs.push({ txt: $(this).data('txt'), val: $(this).val() });
            } else {
                for (var i = 0; i < checkedObjs.length; i++) {
                    if (checkedObjs[i] && checkedObjs[i].val == $(this).val()) {
                        checkedObjs.splice(i, 1);
                        break;
                    }
                }
            }
        });

        var tree = {
            getAllChecked: function () {
                return checkedObjs;
            }
        };

        function _render(childs) {
            if (childs) {
                html += "<ul class='tree'>";
                for (var i = 0; i < childs.length; i++) {
                    var node = childs[i];
                    html += "<li" + (node.isExpand ? " class='on'" : "") + ">";

                    if (node.isCheckBox) {
                        html += "<label><input value=" + node.val + " type='checkbox'" + (node.isChecked ? " checked" : "") + " data-txt=" + node.txt + " />" + node.txt + "</label>";
                        if (node.isChecked) {
                            checkedObjs.push({ txt: node.txt, val: node.val });
                        }
                    } else {
                        html += "<a href='javascript:void(0)'><span class='toggler'>" + (node.isExpand ? "-" : "+") + "</span>" + node.txt + "</a>";
                    }

                    if (node.children)
                        _render(node.children);

                    html += "</li>";
                }
                html += "</ul>";
            }

            return html;
        }

        return tree;
    }
});
