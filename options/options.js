var browser = browser || chrome;

function save() {
    var redirect = [];
    $("#accordionRedirect .card").each(function () {
        var object = {};
        object.rfURL = $(this).find("input[name='rfURL']").val();//redirect from
        object.rtURL = $(this).find("input[name='rtURL']").val();//redirect to
        object.types = [];
        if ($(this).find(".redirectTitle").attr('disabled') !== undefined)
            object.disabled = true;
        else
            object.disabled = false;

        $.each($(this).find("input[type='checkbox']:checked"), function () {
            object.types.push($(this).val());
        });

        redirect.push(object);
    });


    var agent = [];
    $("#accordionAgent .card").each(function () {
        var object = {};
        object.aURL = $(this).find("input[name='aURL']").val();
        object.aSet = $(this).find("input[name='aSet']").val();
        if ($(this).find(".agentTitle").attr('disabled') !== undefined)
            object.disabled = true;
        else
            object.disabled = false;

        agent.push(object);
    });


    console.log("save", redirect, agent);
    browser.storage.sync.set({
        redirect: redirect,
        agent: agent
    });

    alert("儲存成功");
}


// Redirect

function setRedirectTitle() {
    var num = $(this).closest(".card-body").children("input[name='num']").val();
    $("#heading" + num).find(".redirectTitle").text($("#rfURL" + num).val() + " => " + $("#rtURL" + num).val());
};

var redirectNum = 0;

function addRedirectRow(expand) {
    if (expand === undefined)
        expand = true;
    if (expand)
        expand = " show";
    else
        expand = "";
    var num = redirectNum + 1;
    redirectNum = num;
    var html = '<div class="card"><div class="card-header" id="heading' + num + '"><h2 class="mb-0"><button class="btn btn-link btn-block text-left redirectTitle" type="button" data-toggle="collapse" data-target="#redirectCollapse' + num + '" aria-expanded="true" aria-controls="redirectCollapse' + num + '">未設定</button><button style="display:none" type="button" class="btn btn-success btn-sm enable_btn">啟用</button><button type="button" class="btn btn-secondary btn-sm disable_btn">禁用</button><button type="button" class="btn btn-danger btn-sm delete_btn">刪除</button></h2></div>';
    html += '<div id="redirectCollapse' + num + '" class="collapse ' + expand + '" aria-labelledby="heading' + num + '" data-parent="#accordionRedirect"><div class="card-body">  <input name="num" type="hidden" value="' + num + '">  <div class="form-group"><label for="rfURL' + num + '">指定網址</label><input name="rfURL" type="text" class="form-control redirect-input" id="rfURL' + num + '"  aria-describedby="rfURL' + num + 'Help" placeholder="https://host1.com/filename;https://host2.com/*" required><small id="rfURL' + num + 'Help" class="form-text text-muted">以「;」區隔多URL</small>  </div>  <div class="form-group"><label for="rtURL' + num + '">重新導向到</label><input name="rtURL" type="text" class="form-control redirect-input" id="rtURL' + num + '"  placeholder="https://redirect.com" required></div><div class="form-group"><label>指定類型</label><div><div class="form-check form-check-inline"><input class="form-check-input" type="checkbox" id="main_frame' + num + '" value="main_frame"><label class="form-check-label" for="main_frame' + num + '">document</label></div><div class="form-check form-check-inline"><input class="form-check-input" type="checkbox" id="script' + num + '" value="script"><label class="form-check-label" for="script' + num + '">script</label></div><div class="form-check form-check-inline"><input class="form-check-input" type="checkbox" id="image' + num + '" value="image"><label class="form-check-label" for="image' + num + '">image</label></div><div class="form-check form-check-inline"><input class="form-check-input" type="checkbox" id="stylesheet' + num + '" value="stylesheet"><label class="form-check-label" for="stylesheet' + num + '">stylesheet</label></div></div></div></div></div></div>';
    var newRow = $(html).appendTo("#accordionRedirect");
    newRow.find(".redirect-input").on('blur', setRedirectTitle);
    newRow.find(".enable_btn").on('click', enableRedirectRow);
    newRow.find(".disable_btn").on('click', disableRedirectRow);
    newRow.find(".delete_btn").on('click', deleteRedirectRow);
    return newRow;
}

function enableRedirectRow() {
    var row = $(this).closest(".card");
    row.find(".redirectTitle").removeAttr('disabled');

    $(this).css('display', 'none');
    row.find(".disable_btn").css('display', '');
};

function disableRedirectRow() {
    var row = $(this).closest(".card");
    row.find(".collapse").removeClass('show');
    row.find(".redirectTitle").attr('disabled', true);

    $(this).css('display', 'none');
    row.find(".enable_btn").css('display', '');
};

function deleteRedirectRow() {
    $(this).closest(".card").remove();
};

$("#addRedirectRule").on('click', addRedirectRow);



// Agent

function setAgentTitle() {
    var num = $(this).closest(".card-body").children("input[name='num']").val();
    $("#agentHeading" + num).find(".agentTitle").text($("#aURL" + num).val() + " => " + $("#aSet" + num).val());
};

var agentNum = 0;

function addAgentRow(expand) {
    if (expand === undefined)
        expand = true;
    if (expand)
        expand = " show";
    else
        expand = "";
    var num = agentNum + 1;
    agentNum = num;
    var html = '<div class="card"><div class="card-header" id="agentHeading' + num + '"><h2 class="mb-0"><button class="btn btn-link btn-block text-left agentTitle" type="button" data-toggle="collapse" data-target="#agentCollapse' + num + '" aria-expanded="true" aria-controls="agentCollapse' + num + '">未設定</button><button style="display:none" type="button" class="btn btn-success btn-sm enable_btn">啟用</button><button type="button" class="btn btn-secondary btn-sm disable_btn">禁用</button><button type="button" class="btn btn-danger btn-sm delete_btn">刪除</button></h2></div>';
    html += '<div id="agentCollapse' + num + '" class="collapse ' + expand + '" aria-labelledby="agentHeading' + num + '" data-parent="#accordionAgent"><div class="card-body">  <input name="num" type="hidden" value="' + num + '">  <div class="form-group"><label for="aURL' + num + '">指定網址</label><input name="aURL" type="text" class="form-control agent-input" id="aURL' + num + '"  aria-describedby="aURL' + num + 'Help" placeholder="https://host1.com/filename;https://host2.com/*" required><small id="aURL' + num + 'Help" class="form-text text-muted">以「;」區隔多URL</small>  </div>  <div class="form-group"><label for="aSet' + num + '">agent</label><input name="aSet" type="text" class="form-control agent-input" id="aSet' + num + '"  placeholder="Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:86.0) Gecko/20100101 Firefox/86.0" required></div></div></div>';
    var newRow = $(html).appendTo("#accordionAgent");
    newRow.find(".agent-input").on('blur', setAgentTitle);
    newRow.find(".enable_btn").on('click', enableAgentRow);
    newRow.find(".disable_btn").on('click', disableAgentRow);
    newRow.find(".delete_btn").on('click', deleteAgentRow);
    return newRow;
}

function enableAgentRow() {
    var row = $(this).closest(".card");
    row.find(".agentTitle").removeAttr('disabled');

    $(this).css('display', 'none');
    row.find(".disable_btn").css('display', '');
};

function disableAgentRow() {
    var row = $(this).closest(".card");
    row.find(".collapse").removeClass('show');
    row.find(".agentTitle").attr('disabled', true);

    $(this).css('display', 'none');
    row.find(".enable_btn").css('display', '');
};

function deleteAgentRow() {
    $(this).closest(".card").remove();
};

$("#addAgentRule").on('click', addAgentRow);

// initial

$(function () {
    browser.storage.sync.get(['redirect', 'agent'], function (result) {
        $.each(result['redirect'], function () {
            var newRow = addRedirectRow(false);
            newRow.find("input[name='rfURL']").val(this.rfURL).blur();
            newRow.find("input[name='rtURL']").val(this.rtURL).blur();
            $.each(this.types, function () {
                newRow.find("input[type='checkbox'][value='" + this + "']").attr('checked', true);
            });
            if (this.disabled !== undefined && this.disabled === true)
                newRow.find(".disable_btn").click();
        });

        $.each(result['agent'], function () {
            var newRow = addAgentRow(false);
            newRow.find("input[name='aURL']").val(this.aURL).blur();
            newRow.find("input[name='aSet']").val(this.aSet).blur();
            if (this.disabled !== undefined && this.disabled === true)
                newRow.find(".disable_btn").click();
        });
    });
});

$("form button[type=submit]").on('click', function (e) {
    e.preventDefault(); //prevent the default action

    var isValid = $(e.target).parents('form')[0].checkValidity();
    if (!isValid)
        $(e.target).parents('form').find(":invalid").each(function () {
            var collapse = $(this).parents(".collapse");
            if (!collapse.hasClass('show'))
                collapse.addClass('show');
        });
    else
        save();
    $(e.target).parents('form')[0].reportValidity();

});