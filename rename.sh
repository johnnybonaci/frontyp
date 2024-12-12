#!/bin/bash

# Verifica si se proporcionó un directorio como argumento
if [ "$#" -ne 1 ]; then
    echo "Uso: $0 <directorio>"
    exit 1
fi

directory="$1"

# Verifica si el argumento es un directorio válido
if [ ! -d "$directory" ]; then
    echo "Error: '$directory' no es un directorio válido."
    exit 1
fi

# Función recursiva para renombrar archivos y carpetas
rename_files_and_dirs() {
    local dir="$1"

    # Renombrar los archivos y carpetas en el directorio actual
    for item in "$dir"/*; do
        # Verifica si el item existe (maneja directorios vacíos)
        [ -e "$item" ] || continue

        # Si el item es un directorio, primero renómbralo recursivamente
        if [ -d "$item" ]; then
            rename_files_and_dirs "$item"
        fi

        # Renombrar el archivo o carpeta si contiene "CallCampaign" o "callCampaign"
        local new_name=$(basename "$item" | sed -e 's/Buyer/User/g' -e 's/buyer/user/g')
        local new_path=$(dirname "$item")/"$new_name"

        if [ "$item" != "$new_path" ]; then
            mv "$item" "$new_path"
        fi
    done
}

# Llama a la función en el directorio proporcionado
rename_files_and_dirs "$directory"

echo "Renombrado completado."
