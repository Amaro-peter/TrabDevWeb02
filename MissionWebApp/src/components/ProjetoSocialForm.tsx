import { z } from "zod";
import isCategoriaValida from "../util/isCategoriaValida";
import isDataValida from "../util/isDataValida";
import useProjetoSocialStore from "../store/useProjetoSocialStore";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { ProjetoSocial } from "../interface/ProjetoSocial";
import slugify from "slugify";
import type { Categoria } from "../interface/Categoria";
import useAPI from "../hooks/useAPI";

const regexData = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;

const regexImage = /^[a-z]+\.(gif|jpg|png|jpeg|bmp)$/;

const regexContato = /^(\+55\s?)?\(?\d{2}\)?\s?\d{4,5}-\d{4}$/;

const schema = z.object({
    nome: z
        .string()
        .nonempty({message: "O nome é obrigatório"})
        .min(3, {message: "O nome deve ter pelo menos 3 caracteres"}),
    descricao: z
        .string()
        .min(1, {message: "A descrição é obrigatória"}),
    categoria: z
        .number()
        .refine(isCategoriaValida, {message: "Selecione uma categoria válida"}),
    data_inicio: z
        .string()
        .min(1, {message: "A data de início é obrigatória"})
        .regex(regexData, {message: "A data deve estar no formato DD/MM/AAAA"})
        .refine(isDataValida, {message: "Data inválida"}),
    doacao: z
        .coerce
        .number({ invalid_type_error: "A 'imagem' deve ser informada!"})
        .min(0, {message: "O valor da doação deve ser informado"}),
    responsavel: z
        .string()
        .nonempty({message: "O responsável é obrigatório"})
        .min(3, {message: "O responsável deve ter pelo menos 3 caracteres"}),
    contato: z
        .string()
        .min(1, {message: "O contato é obrigatório"})
        .regex(regexContato, {message: "O contato deve estar no formato (XX) XXXXX-XXXX ou (XX) XXXX-XXXX"}),
    imagem: z
        .string()
        .min(1, {message: "A imagem é obrigatória"})
        .regex(regexImage, {message: "A imagem deve estar no formato gif, jpg, png, jpeg ou bmp"}),
    ativo: z
        .boolean()
});

type ProjetoSocialFormData = z.infer<typeof schema>;

const ProjetoSocialForm = () => {
    const setMensagem = useProjetoSocialStore((s) => s.setMensagem);
    const setIdRemovido = useProjetoSocialStore((s) => s.setIdRemovido);
    const projetoSelecionado = useProjetoSocialStore((s) => s.projetoSocialSelecionado);

    const setValoresIniciais = () => {
        if(projetoSelecionado.id) {
            setValue("nome", projetoSelecionado.nome);
            setValue("descricao", projetoSelecionado.descricao);
            setValue("categoria", projetoSelecionado.categoria.id);
            setValue("data_inicio", dayjs(projetoSelecionado.dataInicio).format("DD/MM/YYYY"));
            setValue("doacao", projetoSelecionado.doacao);
            setValue("responsavel", projetoSelecionado.responsavel);
            setValue("contato", projetoSelecionado.contato);
            setValue("imagem", projetoSelecionado.imagem);
            setValue("ativo", projetoSelecionado.ativo);
        } else {
            reset();
        }
    };

    useEffect(() => {
        setValoresIniciais();
    }, [projetoSelecionado]);

    const navigate = useNavigate();

    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<ProjetoSocialFormData>({
        defaultValues: {
            nome: "",
            descricao: "",
            categoria: 0,
            data_inicio: "",
            doacao: undefined,
            responsavel: "",
            contato: "",
            imagem: "",
            ativo: false
        },
        resolver: zodResolver(schema)
    });

    const { useCadastrarProjetoSocial, useAlterarProjetoSocial } = useAPI;

    const { mutate: cadastrarProjetoSocial, error: errorCadastrar } = useCadastrarProjetoSocial();

    const { mutate: alterarProjetoSocial, error: errorAlterar } = useAlterarProjetoSocial();
    
    const submit = ({
        nome,
        descricao,
        categoria,
        data_inicio,
        doacao,
        responsavel,
        contato,
        imagem,
        ativo
    }: ProjetoSocialFormData) => {
        const projetoSocial: ProjetoSocial = {
            nome: nome,
            slug: slugify(nome, {
                lower: true,
                strict: true
            }),
            descricao: descricao,
            categoria: {id: categoria} as Categoria,
            dataInicio: new Date(
                data_inicio.substring(6, 10) + "-" + data_inicio.substring(3, 5) + "-" + data_inicio.substring(0, 2)
            ),
            doacao: doacao,
            responsavel: responsavel,
            contato: contato,
            imagem: imagem,
            ativo: ativo
        };

        if(projetoSelecionado.id) {
            projetoSocial.id = projetoSelecionado.id;
            alterarProjetoSocial(projetoSocial, {
                onSuccess: (projetoAlterado: ProjetoSocial) => {
                    setMensagem(`Projeto social ${projetoAlterado.id} alterado com sucesso! `);
                    setIdRemovido(projetoAlterado.id!);
                    navigate("/projetos/" + projetoAlterado.id);
                }
            });
        } else {
            cadastrarProjetoSocial(projetoSocial, {
                onSuccess: (projetoCadastrado: ProjetoSocial) => {
                    setMensagem(`Projeto social ${projetoCadastrado.id} cadastrado com sucesso! `);
                    setIdRemovido(projetoCadastrado.id!);
                    navigate("/projetos/" + projetoCadastrado.id);
                }
            });
        }
    };

    if(errorAlterar) {
        throw errorAlterar;
    }

    if(errorCadastrar) {
        throw errorCadastrar;
    }

    return (
        <>
            <div className='container-fluid py-5 w-100' style={{ backgroundColor: 'antiquewhite', marginTop: '64px' }}>
                <div className='container' style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                    <div className='card shadow-sm' style={{ border: '2px solid black' }}>
                        <form onSubmit={handleSubmit(submit)} autoComplete='off' style={{ padding: '20px', borderRadius: '10px' }}>
                            <div className='row'>
                                <div className='col-xl-6'>
                                    <div className='row mb-2'>
                                        <label htmlFor='nome' className='col-xl-2 fw-bold'>
                                            Nome
                                        </label>
                                        <div className='col-xl-10'>
                                            <input 
                                                {...register("nome")}
                                                type='text'
                                                id='nome'
                                                style={{ width: '100%' }}
                                                className={errors.nome ? 'form-control is-invalid' : 'form-control'}
                                            />
                                            <div className='invalid-feedback'>
                                                {errors.nome?.message}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-xl-6'>
                                    <div className='row mb-2'>
                                        <label htmlFor='descricao' className='col-xl-3 fw-bold'>
                                            Descricao
                                        </label>
                                        <div className='col-xl-9'>
                                            <input 
                                                {...register("descricao")}
                                                type='text'
                                                id='descricao'
                                                style={{ width: '100%' }}
                                                className={errors.descricao ? 'form-control is-invalid' : 'form-control'}
                                            />
                                            <div className='invalid-feedback'>
                                                {errors.descricao?.message}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='row mb-1'>
                                <div className='col-xl-6'>
                                    <div className='row mb-2'>
                                        <label htmlFor='categoria' className='col-xl-2 fw-bold'>
                                            Categoria
                                        </label>
                                        <div className='col-xl-10'>
                                            <select
                                                {...register("categoria", {valueAsNumber: true})}
                                                id='categoria'
                                                style={{ width: '100%' }}
                                                className={errors.categoria ? 'form-control is-invalid' : 'form-control'}
                                            >
                                                <option value="0">Selecione uma categoria</option>
                                                <option value="1">Educacao</option>
                                                <option value="2">Saude</option>
                                                <option value="3">Inclusao</option>
                                            </select>
                                            <div className='invalid-feedback'>
                                                {errors.categoria?.message}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-xl-6'>
                                    <div className='row mb-2'>
                                        <label htmlFor='data_cadastro' className='col-xl-3 fw-bold'>
                                            Data de Inicio
                                        </label>
                                        <div className='col-xl-9'>
                                            <input
                                                {...register("data_inicio")} 
                                                type='text'
                                                id='data_cadastro'
                                                style={{ width: '100%' }}
                                                className={errors.data_inicio ? 'form-control is-invalid' : 'form-control'}
                                            />
                                            <div className='invalid-feedback'>
                                                {errors.data_inicio?.message}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-1">
                                <div className="col-xl-6">
                                    <div className="row mb-2">
                                        <label htmlFor="contato" className="col-xl-2 fw-bold">
                                            Contato
                                        </label>
                                        <div className="col-xl-10">
                                            <input
                                                {...register("contato")}
                                                type="text"
                                                id="contato"
                                                style={{ width: '100%' }}
                                                className={errors.contato ? 'form-control is-invalid' : 'form-control'}
                                            />
                                            <div className="invalid-feedback">
                                                {errors.contato?.message}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-6">
                                    <div className="row mb-2">
                                        <label htmlFor="responsavel" className="col-xl-3 fw-bold">
                                            Responsavel
                                        </label>
                                        <div className="col-xl-9">
                                            <input
                                                {...register("responsavel")}
                                                type="text"
                                                id="responsavel"
                                                style={{ width: '100%' }}
                                                className={errors.responsavel ? 'form-control is-invalid' : 'form-control'}
                                            />
                                            <div className="invalid-feedback">
                                                {errors.responsavel?.message}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-1">
                                <div className="col-xl-6">
                                    <div className="row mb-2">
                                            <label htmlFor="imagem" className="col-xl-2 fw-bold">
                                                Imagem
                                            </label>
                                            <div className="col-xl-10">
                                            <input
                                                {...register("imagem")}
                                                type="text"
                                                id="imagem"
                                                style={{ width: '100%' }}
                                                className={errors.imagem ? 'form-control is-invalid' : 'form-control'}
                                            />
                                            <div className="invalid-feedback">
                                                {errors.imagem?.message}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-6">
                                    <div className="row mb-2">
                                        <label htmlFor="doacao" className="col-xl-3 fw-bold">
                                            Doacao
                                        </label>
                                        <div className="col-xl-9">
                                            <input
                                                {...register("doacao")}
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                id="doacao"
                                                style={{ width: '100%' }}
                                                className={errors.doacao ? 'form-control is-invalid' : 'form-control'}
                                            />
                                            <div className="invalid-feedback">
                                                {errors.doacao?.message}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-1">
                                <div className="col-xl-6">
                                    <div className="row mb-2">
                                        <div className='offset-xl-2 col-xl-8'>
                                            <div className="form-check pl-0 mt-xl-0 mt-2">
                                                <input
                                                    {...register("ativo")}
                                                    type='checkbox'
                                                    id="ativo"
                                                    className='form-check-input'
                                                    style={{ width: '20px', height: '20px', border: '2px solid black' }}
                                                />
                                                <label htmlFor="ativo" className="form-check-label fw-bold">
                                                    Ativo
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-5">
                                <div className="col-xl-6">
                                    <div className="row">
                                        <div className="col-xl-10 offset-xl-2 d-flex">
                                            <button
                                                id="botao"
                                                type="submit"
                                                className="btn btn-primary btn-sm d-fle align-"
                                            >
                                                {projetoSelecionado.id ? "Alterar Projeto" : "Cadastrar Projeto"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProjetoSocialForm