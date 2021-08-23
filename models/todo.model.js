module.exports = mongoose => {
    let schema = mongoose.Schema(
            {
                value: String,
                isDone: {
                    type: Boolean,
                    default: false
                }
            },
            {timestamp: true}
        )

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Todo = mongoose.model("todo", schema);
    return Todo;
};