class Api::ProductsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    render json: Product.all
  end

  def show
    render json: Product.find(params[:id])
  end

  def update
    product = Product.find(params[:id])

    product.update(product_params)

    render json: product
  end

private
  def product_params
    params.require(:product).permit(:title, :description, :price)
  end
end
