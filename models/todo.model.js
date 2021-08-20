module.exports = mongoose => {
    const Todo = mongoose.model(
        "todo",
        mongoose.Schema(
            {
                title: String,
                isDone: {
                    type: Boolean,
                    default: false
                }
            },
            {timestamp: true}
        )
    )
    return Todo
}
