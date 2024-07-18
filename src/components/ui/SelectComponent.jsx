function SelectComponent({ register, config, errors, name }) {
    const { options, validationSchema } = config;
    
    return (
        <div>
            <label htmlFor="country">کشور خود را انتخاب کنید</label>
            <select  id="country"  className="formControl country" {...register(name, validationSchema)}>
                {options.map((item) => (
                    <option key={item.value} value={item.value}>
                        {item.label}
                    </option>
                ))}
            </select>
            {errors[name] && <span className="error box">{errors[name]?.message}</span>}
        </div>
    );
}
 
export default SelectComponent;