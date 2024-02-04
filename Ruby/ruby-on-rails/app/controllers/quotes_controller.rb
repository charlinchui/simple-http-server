class QuotesController < ApplicationController
    # Read
    def index
        quotes = Quote.all
        quoteJSON = []
        quotes.each do |quote|
            a = Author.find(quote.author)
            q = {'quote' => quote.value, 'author' => a.name + " " + a.last_name}
            quoteJSON << q
        end
        render json: quoteJSON.to_json
    end
    def show 
        @response = Quote.find(params[:id])
        @author = Author.find(@response.author)
        render :json => {:quote => @response.value, :author => @author.name + " " + @author.last_name}
    end
    # Create
    def create
        @quote = Quote.new(quote_params)

        if @quote.save
            render json: @quote, status: :created
        else
            render json: @quote.errors, status: :unproessable_entity
        end
    end
    # Update
    def update
        @quote = Quote.find(params[:id])

        if @quote.update(quote_params)
            render json: @quote, status: :ok
        else
            render json: @quote.errors, status: :unproessable_entity
        end
    end
    #Delete
    def destroy
        @quote = Quote.find(params[:id])
        @quote.destroy
        render json:@quote, status: :see_other
    end

    private

    def quote_params
        params.require(:quote).permit(:value, :author)
    end
end