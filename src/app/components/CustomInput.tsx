import { FormControl, FormField, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {Control, FieldPath} from 'react-hook-form'
import { z } from 'zod'
import { authformSchema } from '@/lib/utils'

interface CustomInputProps{
    label: string,
    name: FieldPath<z.infer<typeof authformSchema>>,
    type: string,
    placeholder: string,
    control: Control<z.infer<typeof authformSchema>>
}

const CustomInput = ({ name, placeholder, label, type, control }:CustomInputProps) => {
  return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <div className='form-item'>
                    <FormLabel className='form-label'>
                        {label}
                    </FormLabel>
                    <div className='flex flex-col w-full'>
                        <FormControl>
                            <Input
                                placeholder={placeholder}
                                className='input-class'
                                {...field}
                                type={type}
                            />
                        </FormControl>
                        <FormMessage className="form-message"/>
                    </div>
                </div>

            )}
        />
    
  )
}

export default CustomInput