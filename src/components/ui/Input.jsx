function Input({ name, label, type = "text", errors, register, validationSchema }) {
    return (
        <div className="formControl">
            <label htmlFor={name}>{label}</label>
            <input
                id={name}
                type={type}
                {...register(name, validationSchema)} 
            />
            {errors[name] && <span className="error box">{errors[name]?.message}</span>}
        </div>
    );
}


export default Input