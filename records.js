const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const csvWriter = createCsvWriter({
  path: './DailyTransactions.csv',
  header: [{
      id: 'sl_no',
      title: 'sl_no'
    },
    {
      id: 'order_id',
      title: 'order_id'
    },
    {
      id: 'payment_id',
      title: 'payment_id'
    },
    {
      id: 'createdAt',
      title: 'createdAt'
    },
    {
      id: 'updatedAt',
      title: 'updatedAt'
    },
    {
      id: 'item_id',
      title: 'item_id'
    },
    {
      id: 'item_name',
      title: 'item_name'
    },
    {
      id: 'coupon',
      title: 'coupon'
    },
    {
      id: 'amount',
      title: 'amount'
    },
    {
      id: 'paid_status',
      title: 'paid_status'
    },
    {
      id: 'phone',
      title: 'phone'
    },
    {
      id: 'email',
      title: 'email'
    },
    {
      id: 'utm_params_source',
      title: 'utm_params_source'
    },
    {
      id: 'utm_params_medium',
      title: 'utm_params_medium'
    },
    {
      id: 'utm_params_campaign',
      title: 'utm_params_campaign'
    },
    {
      id: 'utm_params_term',
      title: 'utm_params_term'
    }
  ]
});

function createRecord(order, serialNo) {
  try {
    let record = {};
    record.sl_no = serialNo;
    record.order_id = "'" + order.order_id;
    record.payment_id = order.payment_id;
    record.createdAt = order.createdAt;
    record.updatedAt = order.updatedAt;
    record.item_id = order.item["_id"];
    record.item_name = order.item["title"];
    record.coupon = order.coupon;
    record.amount = order.amount;
    record.paid_status = order.paid;
    record.phone = order.phone;
    record.email = order.email;
    record.utm_params_source = order.utm_params["source"];
    record.utm_params_medium = order.utm_params["medium"];
    record.utm_params_campaign = order.utm_params["campaign"];
    record.utm_params_term = order.utm_params["term"];
    return record;
  } catch (err) {
    console.log(err);
  }
}

function writeRecords(records) {
  try {
    return csvWriter.writeRecords(records) // returns a promise
      .then(() => {
        console.log('...Done');
      });
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  createRecord,
  writeRecords
}
