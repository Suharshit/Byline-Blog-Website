import React, { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import appwriteBlogService from '../../appwrite/blogService'
import Input from '../minorComp/Input'
import Button from '../minorComp/Button'
import Select from '../minorComp/Select'
import RTE from '../RTE'
import { useForm } from 'react-hook-form'

const ArticleForm = ({post}) => {
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)
    const { register, handleSubmit, watch, setValue, getValues, control } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
        }
    })

    const submit = async(data) => {
        if(post){
            const file = data.image[0] ? await appwriteBlogService.uploadFile(data.image[0]) : null

            if(file){
                appwriteBlogService.deleteFile(post.featuredImage)
            }
            const dbPost = await appwriteBlogService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined
            })

            if(dbPost){
                navigate(`/article/${dbPost.$id}`)
            }
        } else {
            const file = await appwriteBlogService.uploadFile(data.image[0])

            if(file){
                const fileId = file.$id
                data.featuredImage = fileId
                const dbPost = await appwriteBlogService.createPost({
                    ...data,
                    slug: data.slug,
                    userId: userData.$id
                })
                if(dbPost){
                    navigate(`/article/${dbPost.$id}`)
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if(value && typeof(value) === 'string'){
            return value.trim().toLowerCase().replace(/[^a-zA-z\d\s]+/g, '-').replace(/[\s]/g, '-')
        }
    }, [])

    useEffect(() => {
        const subscription = watch((value, {name}) => {
            if(name === 'title'){
                setValue("slug", slugTransform(value.title), {
                    shouldValidate: true
                })
            }
        })
        return () => subscription.unsubscribe();
    }, [watch, slugTransform,, setValue])
  return (
    <form onSubmit={handleSubmit(submit)} className='min-h-screen w-full flex'>
        <div className='space-y-3 px-8 py-4'>
            <Input
                label="Title:"
                placeholder="Title"
                {...register("title", {required: true})}
            />

            <Input
                label="Slug:"
                placeholder="Slug"
                {...register("slug", {required: true})}
                onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), {
                        shouldValidate: true
                    })
                }}
            />

            <RTE
                label="Content: "
                name="content"
                control={control}
                defaultValue={getValues("content")}
            />
        </div>
        <div className='space-y-5 px-4 py-4'>
            <Input
                label="Featured Image: "
                type="file"
                accept="image/png, image/jpg, image/jpeg"
                {...register("image", {required: !post})}
            />
            {post && (
                <div>
                    <img src={appwriteBlogService.getFilePreview(post.featuredImage)} alt={post.title}
                     className="max-h-72"/>                    
                </div>
            )}
            <Select
                options={["Active", "Inactive"]}
                label="Status:"
                className=" text-black p-1 flex w-[340px] font-semibold rounded-lg"
                {...register("status", {required: true})}
            />
            <div className='flex w-full justify-center h-auto'>
                <Button
                    type="submit"
                    bgColor={post ? "bg-green-500": "bg-blue-600"}
                    className='p-2 rounded-lg w-[370px]'
                >{post ? "Update": "Submit"}</Button>
            </div>
        </div>
    </form>
  )
}

export default ArticleForm