class AuthorsController < ApplicationController
    def index 
        render json: Quote.all
    end
    def create
        author = Author.new(author_params)

        if author.save
            render json: author, status: :created
        else
            render json: author.errors, status: :unproessable_entity
        end
    end
    def show
        author=Author.find(params[:id])
        render json: author
    end
    def update
        author = Author.find(params[:id])
        if author.update(author_params)
            render json: author, status: :ok
        else
            render json: author.errors, status: :unproessable_entity
        end
    end
    def destroy
        author = Author.find(params[:id])
        author.destroy
        render json: author, status: :see_other
    end
    
    private

    def author_params
        params.require(:author).permit(:name, :last_name, :is_alive)
    end
end
