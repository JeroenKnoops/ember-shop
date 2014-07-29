class Api::ReviewsController < ApplicationController
  def index
    render json: Review.find(params[:ids])
  end

  def show
    render json: Review.find(params[:id])
  end
end
