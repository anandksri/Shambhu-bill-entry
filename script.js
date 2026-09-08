/* =========================================================
   SHAMBHU JI RXL BILL SYSTEM
========================================================= */


/* =========================================================
   EXPRESSION CALCULATOR

   Examples:

   1040
   71*1.8
   14*1.8+19*1.8
   10*12.140+6*12.315
   25*1.410+1*9.180+15*1.980
========================================================= */

function calculateExpression(value) {

    if (
        value === null ||
        value === undefined
    ) {
        return null;
    }


    let expression =
        String(value).trim();


    if (expression === "") {
        return null;
    }


    /* Remove commas */

    expression =
        expression.replace(/,/g, "");


    /* Allow multiplication/division symbols */

    expression =
        expression
            .replace(/×/g, "*")
            .replace(/÷/g, "/");


    /*
       Only mathematical characters.
    */

    if (
        !/^[0-9+\-*/().\s]+$/.test(
            expression
        )
    ) {

        throw new Error(
            "Invalid calculation"
        );

    }


    /*
       Prevent invalid operators.
    */

    if (
        expression.includes("**") ||
        expression.includes("//") ||
        expression.includes("..")
    ) {

        throw new Error(
            "Invalid calculation"
        );

    }


    let result;


    try {

        result =
            Function(
                '"use strict"; return (' +
                expression +
                ')'
            )();

    } catch {

        throw new Error(
            "Invalid calculation"
        );

    }


    if (
        typeof result !== "number" ||
        !Number.isFinite(result)
    ) {

        throw new Error(
            "Invalid calculation"
        );

    }


    return result;
}


/* =========================================================
   FORMAT
========================================================= */

function formatNumber(value) {

    if (
        value === null ||
        value === undefined ||
        !Number.isFinite(value)
    ) {

        return "";

    }


    return Number(value)
        .toFixed(3)
        .replace(/\.?0+$/, "");
}


/* =========================================================
   GET VALUE FROM INPUT
========================================================= */

function getInputValue(input) {

    if (!input) {
        return null;
    }


    const value =
        input.value.trim();


    if (value === "") {
        return null;
    }


    try {

        return calculateExpression(
            value
        );

    } catch {

        return null;

    }
}


/* =========================================================
   EXPRESSION INPUT
========================================================= */

function createExpressionInput(
    className,
    value = ""
) {

    const wrapper =
        document.createElement("div");


    wrapper.className =
        "expression-wrap";


    const input =
        document.createElement("input");


    input.type =
        "text";


    input.className =
        className;


    input.value =
        value;


    input.autocomplete =
        "off";


    const result =
        document.createElement("div");


    result.className =
        "expression-result";


    wrapper.appendChild(
        input
    );


    wrapper.appendChild(
        result
    );


    input.addEventListener(
        "input",
        function () {

            showResult(
                input,
                result
            );

            calculateTotals();

        }
    );


    return wrapper;
}


/* =========================================================
   SHOW EXPRESSION RESULT
========================================================= */

function showResult(
    input,
    result
) {

    const text =
        input.value.trim();


    if (text === "") {

        result.textContent =
            "";

        input.style.borderColor =
            "";

        return;

    }


    try {

        const value =
            calculateExpression(
                text
            );


        result.textContent =
            "= " +
            formatNumber(value);


        result.classList.remove(
            "error"
        );


        input.style.borderColor =
            "";

    } catch {

        result.textContent =
            "Invalid calculation";


        result.classList.add(
            "error"
        );


        input.style.borderColor =
            "#dc2626";

    }

}


/* =========================================================
   ADD BILL ROW
========================================================= */

function addItem(data = {}) {

    const tbody =
        document.getElementById(
            "billBody"
        );


    const row =
        document.createElement(
            "tr"
        );


    /* =====================================================
       AMOUNT
    ====================================================== */

    const amountCell =
        document.createElement("td");


    amountCell.appendChild(

        createExpressionInput(
            "amount-input",
            data.amountExpression || ""
        )

    );


    /* =====================================================
       ITEM
    ====================================================== */

    const itemCell =
        document.createElement("td");


    const itemInput =
        document.createElement("input");


    itemInput.type =
        "text";


    itemInput.className =
        "item-input";


    itemInput.value =
        data.item || "";


    itemInput.addEventListener(
        "input",
        calculateTotals
    );


    itemCell.appendChild(
        itemInput
    );


    /* =====================================================
       WEIGHT
    ====================================================== */

    const weightCell =
        document.createElement("td");


    weightCell.appendChild(

        createExpressionInput(
            "weight-input",
            data.weightExpression || ""
        )

    );


    /* =====================================================
       LESS
    ====================================================== */

    const lessCell =
        document.createElement("td");


    lessCell.appendChild(

        createExpressionInput(
            "less-input",
            data.lessExpression || ""
        )

    );


    /* =====================================================
       NET
    ====================================================== */

    const netCell =
        document.createElement("td");


    netCell.className =
        "net-cell";


    netCell.textContent =
        "";


    /* =====================================================
       TUNCH
    ====================================================== */

    const tunchCell =
        document.createElement("td");


    const tunchInput =
        document.createElement("input");


    tunchInput.type =
        "text";


    tunchInput.className =
        "tunch-input";


    tunchInput.value =
        data.tunchExpression || "";


    tunchInput.addEventListener(
        "input",
        calculateTotals
    );


    tunchCell.appendChild(
        tunchInput
    );


    /* =====================================================
       LAB
    ====================================================== */

    const labCell =
        document.createElement("td");


    labCell.appendChild(

        createExpressionInput(
            "lab-input",
            data.labExpression || ""
        )

    );


    /* =====================================================
       FINE
    ====================================================== */

    const fineCell =
        document.createElement("td");


    fineCell.className =
        "fine-cell";


    fineCell.textContent =
        "";


    /* =====================================================
       DELETE
    ====================================================== */

    const actionCell =
        document.createElement("td");


    actionCell.className =
        "no-print";


    const deleteButton =
        document.createElement("button");


    deleteButton.type =
        "button";


    deleteButton.className =
        "delete-btn";


    deleteButton.textContent =
        "×";


    deleteButton.addEventListener(
        "click",
        function () {

            row.remove();

            calculateTotals();

        }
    );


    actionCell.appendChild(
        deleteButton
    );


    /* =====================================================
       APPEND
    ====================================================== */

    row.appendChild(
        amountCell
    );

    row.appendChild(
        itemCell
    );

    row.appendChild(
        weightCell
    );

    row.appendChild(
        lessCell
    );

    row.appendChild(
        netCell
    );

    row.appendChild(
        tunchCell
    );

    row.appendChild(
        labCell
    );

    row.appendChild(
        fineCell
    );

    row.appendChild(
        actionCell
    );


    tbody.appendChild(
        row
    );


    calculateTotals();
}


/* =========================================================
   ADD 5
========================================================= */

function addFiveItems() {

    for (
        let i = 0;
        i < 5;
        i++
    ) {

        addItem();

    }

}


/* =========================================================
   CALCULATE TOTALS
========================================================= */

function calculateTotals() {

    let amountTotal = 0;

    let weightTotal = 0;

    let lessTotal = 0;

    let netTotal = 0;

    let fineTotal = 0;


    let hasAmount = false;

    let hasWeight = false;

    let hasLess = false;

    let hasNet = false;

    let hasFine = false;


    const rows =
        document.querySelectorAll(
            "#billBody tr"
        );


    rows.forEach(
        function (row) {

            const amountInput =
                row.querySelector(
                    ".amount-input"
                );


            const weightInput =
                row.querySelector(
                    ".weight-input"
                );


            const lessInput =
                row.querySelector(
                    ".less-input"
                );


            const tunchInput =
                row.querySelector(
                    ".tunch-input"
                );


            const amount =
                getInputValue(
                    amountInput
                );


            const weight =
                getInputValue(
                    weightInput
                );


            const less =
                getInputValue(
                    lessInput
                );


            const tunch =
                getInputValue(
                    tunchInput
                );


            /* =============================================
               NET WEIGHT
            ============================================== */

            let net = null;


            if (weight !== null) {

                net =
                    weight -
                    (less || 0);

            }


            /* =============================================
               FINE
            ============================================== */

            let fine = null;


            if (
                net !== null &&
                tunch !== null
            ) {

                fine =
                    net *
                    tunch /
                    100;

            }


            /* =============================================
               DISPLAY NET
            ============================================== */

            row.querySelector(
                ".net-cell"
            ).textContent =
                net === null
                    ? ""
                    : formatNumber(net);


            /* =============================================
               DISPLAY FINE
            ============================================== */

            row.querySelector(
                ".fine-cell"
            ).textContent =
                fine === null
                    ? ""
                    : Math.round(fine);


            /* =============================================
               TOTAL AMOUNT
            ============================================== */

            if (amount !== null) {

                amountTotal += amount;

                hasAmount = true;

            }


            /* =============================================
               TOTAL WEIGHT
            ============================================== */

            if (weight !== null) {

                weightTotal += weight;

                hasWeight = true;

            }


            /* =============================================
               TOTAL LESS
            ============================================== */

            if (less !== null) {

                lessTotal += less;

                hasLess = true;

            }


            /* =============================================
               TOTAL NET
            ============================================== */

            if (net !== null) {

                netTotal += net;

                hasNet = true;

            }


            /* =============================================
               TOTAL FINE
            ============================================== */

            if (fine !== null) {

                fineTotal += fine;

                hasFine = true;

            }

        }
    );


    /* =====================================================
       NEW TOTAL
    ====================================================== */

    setText(
        "newAmount",
        hasAmount
            ? formatNumber(amountTotal)
            : ""
    );


    setText(
        "newWeight",
        hasWeight
            ? formatNumber(weightTotal)
            : ""
    );


    setText(
        "newLess",
        hasLess
            ? formatNumber(lessTotal)
            : ""
    );


    setText(
        "newNet",
        hasNet
            ? formatNumber(netTotal)
            : ""
    );


    setText(
        "newFine",
        hasFine
            ? Math.round(fineTotal)
            : ""
    );


    /* =====================================================
       OLD BALANCE
    ====================================================== */

    const oldAmount =
        getInputValue(
            document.getElementById(
                "oldAmount"
            )
        );


    const oldFine =
        getInputValue(
            document.getElementById(
                "oldFine"
            )
        );


    /* =====================================================
       TOTAL
    ====================================================== */

    const totalAmount =
        amountTotal +
        (oldAmount || 0);


    const totalFine =
        fineTotal +
        (oldFine || 0);


    const hasTotalAmount =
        hasAmount ||
        oldAmount !== null;


    const hasTotalFine =
        hasFine ||
        oldFine !== null;


    setText(
        "totalAmount",
        hasTotalAmount
            ? formatNumber(
                totalAmount
            )
            : ""
    );


    setText(
        "totalFine",
        hasTotalFine
            ? Math.round(
                totalFine
            )
            : ""
    );


    /* =====================================================
       JAMA
    ====================================================== */

    const jamaAmount =
        getInputValue(
            document.getElementById(
                "jamaAmount"
            )
        );


    const jamaFine =
        getInputValue(
            document.getElementById(
                "jamaFine"
            )
        );


    /* =====================================================
       FINAL
    ====================================================== */

    let finalAmount =
        null;


    let finalFine =
        null;


    if (hasTotalAmount) {

        finalAmount =
            totalAmount -
            (jamaAmount || 0);

    }


    if (hasTotalFine) {

        finalFine =
            totalFine -
            (jamaFine || 0);

    }


    setText(
        "finalAmount",
        finalAmount === null
            ? ""
            : formatNumber(
                finalAmount
            )
    );


    setText(
        "finalFine",
        finalFine === null
            ? ""
            : Math.round(
                finalFine
            )
    );

}


/* =========================================================
   SET TEXT
========================================================= */

function setText(
    id,
    value
) {

    document.getElementById(
        id
    ).textContent =
        value;

}


/* =========================================================
   DATE + TIME
========================================================= */

function updateDateTime() {

    const now =
        new Date();


    const day =
        String(
            now.getDate()
        ).padStart(
            2,
            "0"
        );


    const month =
        now.toLocaleString(
            "en-US",
            {
                month: "short"
            }
        );


    const year =
        now.getFullYear();


    const date =
        `${day}-${month}-${year}`;


    const time =
        now.toLocaleTimeString(
            "en-US",
            {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true
            }
        );


    document.getElementById(
        "liveDate"
    ).textContent =
        date;


    document.getElementById(
        "liveTime"
    ).textContent =
        time;


    document.getElementById(
        "printDateTime"
    ).textContent =
        `Date: ${date} | Time: ${time}`;

}


/* =========================================================
   CUSTOMER PRINT
========================================================= */

function updateCustomer() {

    const customer =
        document.getElementById(
            "customerName"
        ).value.trim();


    document.getElementById(
        "printCustomer"
    ).textContent =
        customer;

}


/* =========================================================
   SAVE BILL
========================================================= */

function saveBill() {

    const bill =
        collectBill();


    let bills;


    try {

        bills =
            JSON.parse(
                localStorage.getItem(
                    "shambhuBills"
                ) || "[]"
            );

    } catch {

        bills = [];

    }


    bills.push(
        bill
    );


    localStorage.setItem(
        "shambhuBills",
        JSON.stringify(
            bills
        )
    );


    showMessage(
        "✓ Bill saved successfully"
    );

}


/* =========================================================
   COLLECT BILL DATA
========================================================= */

function collectBill() {

    const items = [];


    document
        .querySelectorAll(
            "#billBody tr"
        )
        .forEach(
            function (row) {

                const amount =
                    row.querySelector(
                        ".amount-input"
                    );


                const weight =
                    row.querySelector(
                        ".weight-input"
                    );


                const less =
                    row.querySelector(
                        ".less-input"
                    );


                const tunch =
                    row.querySelector(
                        ".tunch-input"
                    );


                const lab =
                    row.querySelector(
                        ".lab-input"
                    );


                items.push({

                    amountExpression:
                        amount.value,

                    item:
                        row.querySelector(
                            ".item-input"
                        ).value,

                    weightExpression:
                        weight.value,

                    lessExpression:
                        less.value,

                    tunchExpression:
                        tunch.value,

                    labExpression:
                        lab.value

                });

            }
        );


    return {

        id:
            Date.now(),

        shopName:
            document.getElementById(
                "shopName"
            ).value,

        slNo:
            document.getElementById(
                "slNo"
            ).value,

        customer:
            document.getElementById(
                "customerName"
            ).value,

        billType:
            document.getElementById(
                "billType"
            ).value,

        date:
            document.getElementById(
                "liveDate"
            ).textContent,

        time:
            document.getElementById(
                "liveTime"
            ).textContent,

        oldAmount:
            document.getElementById(
                "oldAmount"
            ).value,

        oldFine:
            document.getElementById(
                "oldFine"
            ).value,

        oldDate:
            document.getElementById(
                "oldDate"
            ).value,

        jamaAmount:
            document.getElementById(
                "jamaAmount"
            ).value,

        jamaFine:
            document.getElementById(
                "jamaFine"
            ).value,

        dhada:
            document.getElementById(
                "dhada"
            ).value,

        items:
            items

    };

}


/* =========================================================
   PRINT
========================================================= */

function printBill() {

    updateDateTime();

    updateCustomer();

    calculateTotals();


    setTimeout(
        function () {

            window.print();

        },
        150
    );

}


/* =========================================================
   CLEAR
========================================================= */

function clearBill() {

    const confirmed =
        confirm(
            "Clear the current bill?"
        );


    if (!confirmed) {
        return;
    }


    document.getElementById(
        "billBody"
    ).innerHTML =
        "";


    document.getElementById(
        "customerName"
    ).value =
        "";


    document.getElementById(
        "oldAmount"
    ).value =
        "";


    document.getElementById(
        "oldFine"
    ).value =
        "";


    document.getElementById(
        "oldDate"
    ).value =
        "";


    document.getElementById(
        "jamaAmount"
    ).value =
        "";


    document.getElementById(
        "jamaFine"
    ).value =
        "";


    document.getElementById(
        "dhada"
    ).value =
        "";


    updateCustomer();


    addItem();


    calculateTotals();

}


/* =========================================================
   MESSAGE
========================================================= */

function showMessage(text) {

    const message =
        document.getElementById(
            "message"
        );


    message.textContent =
        text;


    setTimeout(
        function () {

            message.textContent =
                "";

        },
        3000
    );

}


/* =========================================================
   EVENTS
========================================================= */

document
    .getElementById(
        "addItemBtn"
    )
    .addEventListener(
        "click",
        function () {

            addItem();

        }
    );


document
    .getElementById(
        "addFiveBtn"
    )
    .addEventListener(
        "click",
        addFiveItems
    );


document
    .getElementById(
        "saveBtn"
    )
    .addEventListener(
        "click",
        saveBill
    );


document
    .getElementById(
        "printBtn"
    )
    .addEventListener(
        "click",
        printBill
    );


document
    .getElementById(
        "clearBtn"
    )
    .addEventListener(
        "click",
        clearBill
    );


document
    .getElementById(
        "customerName"
    )
    .addEventListener(
        "input",
        updateCustomer
    );


[
    "oldAmount",
    "oldFine",
    "jamaAmount",
    "jamaFine"
].forEach(
    function (id) {

        document
            .getElementById(id)
            .addEventListener(
                "input",
                calculateTotals
            );

    }
);


/* =========================================================
   START
========================================================= */

updateDateTime();


setInterval(
    updateDateTime,
    1000
);


/*
   One completely blank row.
*/

addItem();


calculateTotals();