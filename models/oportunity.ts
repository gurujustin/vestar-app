import mongoose from "mongoose";

/* OpportunitySchema will correspond to a collection in your MongoDB database. */
const OpportunitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 60,
    },
    address: {
      type: String,
    },
    address_url_map: {
      type: String,
    },
    min_investment: {
      type: Number,
      required: true,
    },
    init_date: {
      type: Date,
      required: true,
    },
    expected_delivery_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    profitability: {
      required: true,
      type: Number,
    },
    cub_current: {
      type: Number,
    },
    cub_expected: {
      type: Number,
    },
    description: {
      type: String,
    },
    general_info: {
      type: [String],
      required: true,
    },
    event_ensuing: {
      type: Object,
    },
    neighbor_description: {
      type: String,
      required: true,
    },
    pictures_neighbor: {
      type: Array,
      required: true,
    },
    pictures_enterprise: {
      type: Array,
      required: true,
    },
    token_address: {
      type: String,
    },
    enterprise_type: {
      type: Array,
    },
    description_extra: {
      type: String,
    },
    picture_extra: {
      type: Array,
    },
    enterprise_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Opportunity ||
  mongoose.model("Opportunity", OpportunitySchema);
